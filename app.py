import os
import io
import logging

from flask import Flask, render_template, request, jsonify


# =========================================================
# FLASK APP
# =========================================================

app = Flask(__name__)

# Maximum image upload size = 16 MB
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024


# =========================================================
# LOGGING
# =========================================================

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)

logger = logging.getLogger("AgriVision")


# =========================================================
# SUPPORTED FILE TYPES
# =========================================================

ALLOWED_EXTENSIONS = {
    "jpg",
    "jpeg",
    "png"
}


# =========================================================
# 15 MODEL CLASS NAMES
# IMPORTANT:
# Keep this order exactly the same as train_ds.class_names
# =========================================================

CLASS_NAMES = [
    "Pepper__bell___Bacterial_spot",
    "Pepper__bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy",
    "Tomato_Bacterial_spot",
    "Tomato_Early_blight",
    "Tomato_Late_blight",
    "Tomato_Leaf_Mold",
    "Tomato_Septoria_leaf_spot",
    "Tomato_Spider_mites_Two_spotted_spider_mite",
    "Tomato__Target_Spot",
    "Tomato__Tomato_YellowLeaf__Curl_Virus",
    "Tomato__Tomato_mosaic_virus",
    "Tomato_healthy"
]


# =========================================================
# IMPORT TENSORFLOW
# =========================================================

MODEL = None
TF_AVAILABLE = False
PIL_AVAILABLE = False

try:
    import tensorflow as tf
    import numpy as np

    TF_AVAILABLE = True

    logger.info("TensorFlow is available.")

except ImportError:
    logger.error(
        "TensorFlow is not installed."
    )


# =========================================================
# IMPORT PIL
# =========================================================

try:
    from PIL import Image

    PIL_AVAILABLE = True

    logger.info("Pillow is available.")

except ImportError:
    logger.error(
        "Pillow is not installed."
    )


# =========================================================
# MODEL PATH
# =========================================================

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "best_crop_disease_model.keras"
)


# =========================================================
# LOAD MODEL
# =========================================================

def load_ai_model():

    global MODEL

    if not TF_AVAILABLE:

        logger.error(
            "TensorFlow is unavailable. Model cannot be loaded."
        )

        return None

    if not os.path.exists(MODEL_PATH):

        logger.error(
            f"Model file not found: {MODEL_PATH}"
        )

        return None

    try:

        logger.info(
            f"Loading model from: {MODEL_PATH}"
        )

        MODEL = tf.keras.models.load_model(
            MODEL_PATH
        )

        logger.info(
            "MobileNetV2 model successfully loaded."
        )

        logger.info(
            f"Model input shape: {MODEL.input_shape}"
        )

        logger.info(
            f"Model output shape: {MODEL.output_shape}"
        )

        return MODEL

    except Exception as e:

        logger.exception(
            f"Error loading model: {e}"
        )

        MODEL = None

        return None


# =========================================================
# LOAD MODEL WHEN FLASK STARTS
# =========================================================

load_ai_model()


# =========================================================
# CHECK FILE EXTENSION
# =========================================================

def allowed_file(filename):

    return (
        "." in filename
        and
        filename.rsplit(".", 1)[1].lower()
        in ALLOWED_EXTENSIONS
    )


# =========================================================
# HOME PAGE
# =========================================================

@app.route("/")
def index():

    return render_template(
        "index.html"
    )


# =========================================================
# API STATUS
# =========================================================

@app.route(
    "/api/status",
    methods=["GET"]
)
def api_status():

    return jsonify({

        "status": "online",

        "service":
            "AgriVision AI Crop Disease Detection",

        "model_loaded":
            MODEL is not None,

        "tensorflow_available":
            TF_AVAILABLE,

        "pillow_available":
            PIL_AVAILABLE,

        "classes_supported":
            len(CLASS_NAMES)

    })


# =========================================================
# PREDICTION API
# =========================================================

@app.route(
    "/predict",
    methods=["POST"]
)
def predict():

    # -----------------------------------------------------
    # 1. Check image
    # -----------------------------------------------------

    if "image" not in request.files:

        return jsonify({

            "success": False,

            "error":
                "No image file provided.",

            "message":
                "Please select a crop leaf image."

        }), 400


    file = request.files["image"]


    # -----------------------------------------------------
    # 2. Check filename
    # -----------------------------------------------------

    if file.filename == "":

        return jsonify({

            "success": False,

            "error":
                "No image selected.",

            "message":
                "Please choose an image file."

        }), 400


    # -----------------------------------------------------
    # 3. Check extension
    # -----------------------------------------------------

    if not allowed_file(file.filename):

        return jsonify({

            "success": False,

            "error":
                "Unsupported file format.",

            "message":
                "Only JPG, JPEG and PNG images are supported."

        }), 400


    # -----------------------------------------------------
    # 4. Check model
    # -----------------------------------------------------

    if MODEL is None:

        return jsonify({

            "success": False,

            "error":
                "Prediction service is unavailable.",

            "message":
                "The trained model could not be loaded.",

            "connected":
                False

        }), 503


    # -----------------------------------------------------
    # 5. Check PIL
    # -----------------------------------------------------

    if not PIL_AVAILABLE:

        return jsonify({

            "success": False,

            "error":
                "Pillow is not available.",

            "message":
                "Please install Pillow."

        }), 500


    # =====================================================
    # IMAGE PROCESSING + PREDICTION
    # =====================================================

    try:

        # -------------------------------------------------
        # Read uploaded image
        # -------------------------------------------------

        img_bytes = file.read()


        # -------------------------------------------------
        # Open image
        # -------------------------------------------------

        img = Image.open(
            io.BytesIO(img_bytes)
        )


        # -------------------------------------------------
        # Convert to RGB
        # -------------------------------------------------

        img = img.convert("RGB")


        # -------------------------------------------------
        # Resize exactly as training
        # -------------------------------------------------

        img = img.resize(
            (224, 224)
        )


        # -------------------------------------------------
        # Convert image to NumPy array
        # -------------------------------------------------

        img_array = np.array(
            img,
            dtype=np.float32
        )


        # -------------------------------------------------
        # Add batch dimension
        #
        # Before:
        # (224, 224, 3)
        #
        # After:
        # (1, 224, 224, 3)
        # -------------------------------------------------

        img_array = np.expand_dims(
            img_array,
            axis=0
        )


        # -------------------------------------------------
        # MobileNetV2 PREPROCESSING
        # -------------------------------------------------

        img_array = (
            tf.keras
            .applications
            .mobilenet_v2
            .preprocess_input(
                img_array
            )
        )


        # -------------------------------------------------
        # MODEL PREDICTION
        # -------------------------------------------------

        predictions = MODEL.predict(
            img_array,
            verbose=0
        )


        # =================================================
        # NEW: TOP 5 PREDICTIONS
        # =================================================

        top_indices = np.argsort(
            predictions[0]
        )[-5:][::-1]


        print("\n")
        print("=======================================================")
        print("              TOP 5 MODEL PREDICTIONS")
        print("=======================================================")

        for rank, index in enumerate(
            top_indices,
            start=1
        ):

            class_name = CLASS_NAMES[index]

            probability = (
                float(predictions[0][index])
                * 100
            )

            print(
                f"{rank}. "
                f"{class_name} "
                f"=> {probability:.2f}%"
            )

        print("=======================================================")
        print("\n")


        # -------------------------------------------------
        # FIND HIGHEST PROBABILITY
        # -------------------------------------------------

        predicted_index = int(
            np.argmax(
                predictions[0]
            )
        )


        # -------------------------------------------------
        # CONFIDENCE
        # -------------------------------------------------

        confidence = float(
            predictions[0][predicted_index]
            * 100
        )


        # -------------------------------------------------
        # DISEASE NAME
        # -------------------------------------------------

        predicted_class = CLASS_NAMES[
            predicted_index
        ]


        # -------------------------------------------------
        # LOG FINAL PREDICTION
        # -------------------------------------------------

        logger.info(
            f"Prediction: {predicted_class} "
            f"({confidence:.2f}%)"
        )


        # =================================================
        # SEND RESULT TO FRONTEND
        # =================================================

        return jsonify({

            "success":
                True,

            "disease":
                predicted_class,

            "confidence":
                round(
                    confidence,
                    2
                ),

            # Extra information for debugging
            "top_predictions": [

                {
                    "class":
                        CLASS_NAMES[index],

                    "confidence":
                        round(
                            float(
                                predictions[0][index]
                            ) * 100,
                            2
                        )
                }

                for index in top_indices

            ]

        }), 200


    # =====================================================
    # ERROR DURING PREDICTION
    # =====================================================

    except Exception as e:

        logger.exception(
            f"Inference error: {e}"
        )

        return jsonify({

            "success":
                False,

            "error":
                "Model inference failed.",

            "message":
                str(e)

        }), 500


# =========================================================
# RUN FLASK SERVER
# =========================================================

if __name__ == "__main__":

    print(
        "\n"
        "=======================================================\n"
        " AgriVision - AI-Powered Crop Disease Detection\n"
        "=======================================================\n"
    )

    print(
        f"Model Path:\n{MODEL_PATH}\n"
    )

    print(
        f"Model Loaded: "
        f"{'YES' if MODEL is not None else 'NO'}"
    )

    print(
        f"TensorFlow Available: "
        f"{'YES' if TF_AVAILABLE else 'NO'}"
    )

    print(
        f"Classes Supported: "
        f"{len(CLASS_NAMES)}"
    )

    print(
        "=======================================================\n"
    )

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )