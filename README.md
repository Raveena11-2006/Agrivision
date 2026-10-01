# 🌱 AgriVision --- AI-Powered Crop Disease Detection

AgriVision is a deep-learning-based web application that detects
possible crop leaf diseases from uploaded images. The project combines a
**MobileNetV2 transfer-learning model**, **TensorFlow/Keras**, and a
**Flask backend** with an interactive HTML/CSS/JavaScript frontend.

> **Project status:** End-to-end image upload → preprocessing → AI
> prediction → confidence → frontend result is working locally.

------------------------------------------------------------------------

## ✨ Features

-   📷 Upload crop/leaf images in JPG, JPEG, or PNG format
-   🔍 Automatic image preprocessing to **224 × 224**
-   🤖 MobileNetV2-based disease classification
-   🌿 Supports **15 PlantVillage classes**
-   📊 Displays predicted disease and confidence score
-   ⚡ Flask API for real-time local inference
-   🎨 Responsive and interactive AgriVision frontend
-   📋 Copy diagnosis and report-related UI
-   🔄 Analyze multiple images
-   🛡️ File-type and upload-size validation
-   📡 Backend health/status endpoint

------------------------------------------------------------------------

## 🧠 Machine Learning

The project uses **MobileNetV2 with transfer learning**.

### Model pipeline

``` text
Leaf Image
    ↓
Resize to 224 × 224
    ↓
RGB Conversion
    ↓
MobileNetV2 Preprocessing
    ↓
MobileNetV2 Feature Extraction
    ↓
Global Average Pooling
    ↓
Dropout
    ↓
Dense Layer
    ↓
15-Class Softmax Prediction
```

The trained model is stored as:

``` text
model/best_crop_disease_model.keras
```

During training, the MobileNetV2 base was initially frozen and a
classification head was trained for the 15 target classes.

------------------------------------------------------------------------

## 🌿 Supported Classes

The model supports these 15 classes:

1.  Pepper Bell --- Bacterial Spot
2.  Pepper Bell --- Healthy
3.  Potato --- Early Blight
4.  Potato --- Late Blight
5.  Potato --- Healthy
6.  Tomato --- Bacterial Spot
7.  Tomato --- Early Blight
8.  Tomato --- Late Blight
9.  Tomato --- Leaf Mold
10. Tomato --- Septoria Leaf Spot
11. Tomato --- Spider Mites
12. Tomato --- Target Spot
13. Tomato --- Yellow Leaf Curl Virus
14. Tomato --- Mosaic Virus
15. Tomato --- Healthy

------------------------------------------------------------------------

## 🏗️ Project Structure

``` text
agrivision/
│
├── app.py
│
├── model/
│   └── best_crop_disease_model.keras
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
└── README.md
```

------------------------------------------------------------------------

## ⚙️ Technologies Used

### Machine Learning

-   Python
-   TensorFlow
-   Keras
-   MobileNetV2
-   NumPy
-   Pillow

### Backend

-   Flask
-   Python
-   REST-style prediction endpoint

### Frontend

-   HTML5
-   CSS3
-   JavaScript
-   Flask/Jinja templates

### Dataset

-   PlantVillage dataset
-   15 crop/disease classes
-   Approximately 20K images in the source dataset

------------------------------------------------------------------------

## 🔄 Application Workflow

``` text
User
 │
 ▼
Upload Leaf Image
 │
 ▼
Frontend Validation
 │
 ▼
POST /predict
 │
 ▼
Flask Backend
 │
 ▼
Image Preprocessing
 │
 ├── RGB conversion
 ├── Resize 224 × 224
 └── MobileNetV2 preprocessing
 │
 ▼
Trained MobileNetV2 Model
 │
 ▼
15-Class Prediction
 │
 ▼
Disease + Confidence
 │
 ▼
Interactive Frontend Result
```

------------------------------------------------------------------------

## 🚀 Installation

### 1. Clone or open the project

``` bash
cd agrivision
```

### 2. Install dependencies

``` bash
pip install flask tensorflow numpy pillow
```

### 3. Verify the model

Make sure this file exists:

``` text
model/best_crop_disease_model.keras
```

### 4. Run the Flask application

``` bash
python app.py
```

The application will run at:

``` text
http://127.0.0.1:5000
```

Open that address in your browser.

------------------------------------------------------------------------

## 🔌 API

### `GET /`

Loads the AgriVision web interface.

### `GET /api/status`

Returns backend and model status.

Example:

``` json
{
  "status": "online",
  "model_loaded": true,
  "tensorflow_available": true,
  "classes_supported": 15
}
```

### `POST /predict`

Accepts an image using multipart form data.

Request field:

``` text
image
```

Example response:

``` json
{
  "success": true,
  "disease": "Tomato_Late_blight",
  "confidence": 99.8
}
```

------------------------------------------------------------------------

## 📈 Model Training

The training pipeline included:

1.  Dataset collection
2.  Image validation/cleaning
3.  Train/validation/test split
4.  Image augmentation
5.  MobileNetV2 transfer learning
6.  Classification-head training
7.  Early stopping
8.  Learning-rate reduction
9.  Model checkpointing
10. Saved `.keras` model for Flask inference

The best observed validation accuracy during the completed training run
was approximately **90.41%**.

> Validation accuracy is not the same as real-world diagnostic accuracy.
> Final evaluation should also consider the held-out test set,
> precision, recall, F1-score, and confusion matrix.

------------------------------------------------------------------------

## ⚠️ Limitations

-   The model only predicts classes represented in its training dataset.
-   PlantVillage images are relatively controlled compared with many
    real field photographs.
-   Lighting, background, camera quality, leaf orientation, and image
    quality can affect predictions.
-   A high model confidence score does not guarantee a correct
    real-world diagnosis.
-   The application should be treated as an AI-assisted
    screening/educational tool, not as a definitive agricultural
    diagnosis.
-   Soil properties such as pH, NPK, moisture, or temperature are not
    inferred from a leaf image.

------------------------------------------------------------------------

## 🔮 Future Enhancements

-   Add more crop and disease classes
-   Include real-world field images
-   Add treatment and prevention recommendations
-   Support regional/local languages
-   Add farmer-friendly mobile UI
-   Add model performance dashboards
-   Add image history and prediction records
-   Add sensor-based soil information as a separate module
-   Deploy the application to a cloud platform

------------------------------------------------------------------------

## 🎯 Project Objective

The objective of AgriVision is to demonstrate how **computer vision and
deep learning can assist in early crop disease identification** through
a simple web interface.

The project connects the complete AI pipeline:

``` text
Dataset → Training → Model → Flask API → Web UI → Prediction
```

------------------------------------------------------------------------

## 👩‍💻 Project Note

AgriVision is developed as an academic/HCL project to demonstrate
practical implementation of machine learning, transfer learning,
computer vision, backend API development, and frontend integration.
