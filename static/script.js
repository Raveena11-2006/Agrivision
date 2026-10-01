/**
 * AgriVision - AI-Powered Crop Disease Detection
 * Intelligent Precision Agriculture Platform
 * Modular Vanilla JavaScript • Zero Framework Dependencies
 */

document.addEventListener("DOMContentLoaded", () => {
  // ---------------------------------------------------------------------------
  // 1. CLASS REGISTRY & HUMAN-FRIENDLY MAPPINGS (15 PlantVillage Classes)
  // ---------------------------------------------------------------------------
  const DISEASE_DIRECTORY = {
    "Pepper__bell___Bacterial_spot": {
      name: "Bell Pepper – Bacterial Spot",
      crop: "Bell Pepper",
      condition: "Bacterial Spot (Xanthomonas campestris)",
      type: "Bacterial Infection",
      badgeClass: "bacterial-badge",
      status: "Disease Detected",
      statusBadge: "badge-danger",
      advisory: "Apply copper-based bactericides early in the vegetative cycle. Avoid overhead irrigation and sanitize pruning shears.",
      symptoms: [
        "Small, yellow-green circular lesions on leaves turning dark brown.",
        "Water-soaked margins around lesions in humid conditions.",
        "Severe premature leaf defoliation exposing fruit to sunscald."
      ],
      management: "Spray preventative copper hydroxide or fixed copper fungicides before rainy periods. Practice 2-year crop rotation with non-solanaceous crops."
    },
    "Pepper__bell___healthy": {
      name: "Bell Pepper – Healthy",
      crop: "Bell Pepper",
      condition: "Healthy Foliage",
      type: "Healthy Crop",
      badgeClass: "healthy-badge",
      status: "Healthy Crop",
      statusBadge: "badge-success",
      advisory: "No disease symptoms identified. Maintain standard nitrogen-phosphorus-potassium fertigation and routine scouting.",
      symptoms: [
        "Lush uniform green foliage with smooth, turgid leaf surfaces.",
        "Well-developed central and lateral venation without discoloration.",
        "Zero signs of necrosis, stippling, or chlorotic halos."
      ],
      management: "Maintain balanced soil pH (6.2 - 6.8) and consistent drip irrigation. Scout weekly for early signs of thrips and aphid vectors."
    },
    "Potato___Early_blight": {
      name: "Potato – Early Blight",
      crop: "Potato",
      condition: "Early Blight (Alternaria solani)",
      type: "Fungal Infection",
      badgeClass: "fungal-badge",
      status: "Disease Detected",
      statusBadge: "badge-danger",
      advisory: "Characterized by concentric brown 'target' rings. Apply chlorothalonil or azoxystrobin fungicides and rotate Solanaceae crops.",
      symptoms: [
        "Dark brown to black necrotic spots with concentric circular rings.",
        "Lesions initiate on older, lower foliage near the soil line.",
        "Yellow chlorotic halos surrounding expanding necrotic patches."
      ],
      management: "Ensure adequate nitrogen fertilization as stressed plants are more susceptible. Apply protective protectant fungicides (mancozeb, chlorothalonil)."
    },
    "Potato___Late_blight": {
      name: "Potato – Late Blight",
      crop: "Potato",
      condition: "Late Blight (Phytophthora infestans)",
      type: "Oomycete / Water Mold",
      badgeClass: "fungal-badge",
      status: "Disease Detected",
      statusBadge: "badge-danger",
      advisory: "Highly contagious destructive pathogen. Destroy infected vines immediately and spray mancozeb or metalaxyl under cool, damp conditions.",
      symptoms: [
        "Large, irregular water-soaked spots turning rapidly dark brown/black.",
        "Delicate white fungal-like sporulation on the underside of leaves during high humidity.",
        "Sudden collapse and blight of entire foliage canopy."
      ],
      management: "Destroy infected plant cull piles. Apply systemic fungicides like metalaxyl-M or cymoxanil upon first regional weather warning."
    },
    "Potato___healthy": {
      name: "Potato – Healthy",
      crop: "Potato",
      condition: "Healthy Foliage",
      type: "Healthy Crop",
      badgeClass: "healthy-badge",
      status: "Healthy Crop",
      statusBadge: "badge-success",
      advisory: "Leaf tissue exhibits optimal turgidity and chlorophyll index. Continue preventive monitoring against aphid vectors.",
      symptoms: [
        "Vigorous compound leaves with rich green pigmentation.",
        "Unblemished leaf margins and healthy growing tips.",
        "Normal cellular expansion with no leaf curling or blistering."
      ],
      management: "Maintain regular hilling and soil moisture consistency. Prevent weed competition and implement preventative scouting protocols."
    },
    "Tomato_Bacterial_spot": {
      name: "Tomato – Bacterial Spot",
      crop: "Tomato",
      condition: "Bacterial Spot (Xanthomonas)",
      type: "Bacterial Infection",
      badgeClass: "bacterial-badge",
      status: "Disease Detected",
      statusBadge: "badge-danger",
      advisory: "Small water-soaked lesions that brown over time. Treat with copper hydroxide sprays and avoid working on damp plants.",
      symptoms: [
        "Small (<3mm) dark circular lesions with greasy or water-soaked borders.",
        "Centres of spots often dry out and tear, creating a shot-hole appearance.",
        "Severe leaf yellowing and blighting under warm, humid conditions."
      ],
      management: "Use certified pathogen-free seed. Avoid overhead sprinkler irrigation and apply copper + mancozeb tank mixtures protectively."
    },
    "Tomato_Early_blight": {
      name: "Tomato – Early Blight",
      crop: "Tomato",
      condition: "Early Blight (Alternaria linariae)",
      type: "Fungal Infection",
      badgeClass: "fungal-badge",
      status: "Disease Detected",
      statusBadge: "badge-danger",
      advisory: "Remove lower infected foliage touching the soil bed. Mulch the base of the plant to inhibit spore splash from soil.",
      symptoms: [
        "Distinctive concentric 'bullseye' rings within brown necrotic lesions.",
        "Yellowing of leaf tissue surrounding the spots leading to drop.",
        "Progresses from the bottom of the canopy upward."
      ],
      management: "Mulch plants with straw or plastic to prevent soil splash. Prune lower leaves up to 12 inches from ground level once plants mature."
    },
    "Tomato_Late_blight": {
      name: "Tomato – Late Blight",
      crop: "Tomato",
      condition: "Late Blight (Phytophthora infestans)",
      type: "Oomycete / Water Mold",
      badgeClass: "fungal-badge",
      status: "Disease Detected",
      statusBadge: "badge-danger",
      advisory: "Rapidly spreading greasy dark lesions. Isolate the crop area and apply registered contact/systemic fungicides promptly.",
      symptoms: [
        "Rapidly enlarging dark brown lesions with pale yellow borders.",
        "Leaves shrivel and die rapidly as if damaged by early frost.",
        "White downy spore growth evident on leaf undersides in humid mornings."
      ],
      management: "Remove and bag infected foliage immediately. Spray preventive contact fungicides before wet weather intervals."
    },
    "Tomato_Leaf_Mold": {
      name: "Tomato – Leaf Mold",
      crop: "Tomato",
      condition: "Leaf Mold (Passalora fulva)",
      type: "Fungal Infection",
      badgeClass: "fungal-badge",
      status: "Disease Detected",
      statusBadge: "badge-danger",
      advisory: "Common in high humidity environments. Improve greenhouse ventilation and spacing to lower relative humidity below 85%.",
      symptoms: [
        "Pale green or yellowish chlorotic blotches on the upper leaf surface.",
        "Velvety olive-green to grayish fungal spore coating directly beneath spots.",
        "Leaves curl, wither, and drop prematurely."
      ],
      management: "Increase airflow through high tunnel/greenhouse structures. Water at soil level early in the morning so foliage dries rapidly."
    },
    "Tomato_Septoria_leaf_spot": {
      name: "Tomato – Septoria Leaf Spot",
      crop: "Tomato",
      condition: "Septoria Leaf Spot (Septoria lycopersici)",
      type: "Fungal Infection",
      badgeClass: "fungal-badge",
      status: "Disease Detected",
      statusBadge: "badge-danger",
      advisory: "Circular spots with dark borders and grey centres. Practice 2-3 year crop rotation and eradicate weed hosts (horsenettle).",
      symptoms: [
        "Numerous small circular spots (1.5-3mm) with dark borders and grey/tan centres.",
        "Tiny black fruiting bodies (pycnidia) visible inside mature spots.",
        "Severe defoliation leading to exposed fruit and sunscald."
      ],
      management: "Remove infected plant debris after harvest. Space plants adequately for rapid canopy drying and apply chlorothalonil."
    },
    "Tomato_Spider_mites_Two_spotted_spider_mite": {
      name: "Tomato – Two-Spotted Spider Mite",
      crop: "Tomato",
      condition: "Two-Spotted Spider Mite (Tetranychus urticae)",
      type: "Pest Infestation",
      badgeClass: "pest-badge",
      status: "Pest Infestation",
      statusBadge: "badge-warning",
      advisory: "Fine stippling accompanied by silky webbing on undersides. Apply horticultural neem oil or introduce predatory mites (Phytoseiulus).",
      symptoms: [
        "Fine yellow or white stippling (speckling) across leaf surfaces.",
        "Leaves take on a bronze or bleached cast.",
        "Silky webbing strung across the undersides of leaves and leaf stems."
      ],
      management: "Keep soil moisture consistent; mites thrive in hot, dusty dry conditions. Spray insecticidal soap or release predatory beneficial mites."
    },
    "Tomato__Target_Spot": {
      name: "Tomato – Target Spot",
      crop: "Tomato",
      condition: "Target Spot (Corynespora cassiicola)",
      type: "Fungal Infection",
      badgeClass: "fungal-badge",
      status: "Disease Detected",
      statusBadge: "badge-danger",
      advisory: "Brown spots with concentric zonation. Prune dense canopies to promote rapid morning drying of leaves.",
      symptoms: [
        "Pinpoint brown spots expanding into circular lesions with light brown centres.",
        "Dark concentric rings resembling a target board.",
        "Extensive leaf blighting and defoliation during prolonged warm, wet periods."
      ],
      management: "Maintain good plant spacing and stake tomatoes to improve airflow. Apply registered strobilurin or carboxamide fungicides."
    },
    "Tomato__Tomato_YellowLeaf__Curl_Virus": {
      name: "Tomato – Yellow Leaf Curl Virus",
      crop: "Tomato",
      condition: "Yellow Leaf Curl Virus (TYLCV)",
      type: "Viral Infection (Begomovirus)",
      badgeClass: "viral-badge",
      status: "Severe Viral Infection",
      statusBadge: "badge-danger",
      advisory: "Transmitted by Bemisia tabaci whiteflies. Rogue and destroy infected plants immediately and deploy yellow sticky vector traps.",
      symptoms: [
        "Severe upward curling and cupping of leaflet margins.",
        "Marked marginal and interveinal yellowing (chlorosis).",
        "Extreme stunting of plant internodes with a bushy, bunchy appearance."
      ],
      management: "Eradicate whitefly vectors using fine insect netting (50 mesh) and reflective silver mulches. Rogue symptomatic plants immediately."
    },
    "Tomato__Tomato_mosaic_virus": {
      name: "Tomato – Mosaic Virus",
      crop: "Tomato",
      condition: "Mosaic Virus (ToMV)",
      type: "Viral Infection (Tobamovirus)",
      badgeClass: "viral-badge",
      status: "Viral Infection",
      statusBadge: "badge-danger",
      advisory: "Mechanically transmitted virus. Disinfect tools in 20% non-fat dry milk solution and wash hands thoroughly after handling.",
      symptoms: [
        "Mottled alternating light green and dark green mosaic patterns on leaves.",
        "Leaf distortion, blistered areas, and 'shoestring' leaflet narrowing.",
        "Overall stunted growth and poor fruit set."
      ],
      management: "Do not smoke or use tobacco products near plants. Disinfect pruners and stakes between plants. Choose virus-resistant cultivars."
    },
    "Tomato_healthy": {
      name: "Tomato – Healthy",
      crop: "Tomato",
      condition: "Healthy Foliage",
      type: "Healthy Crop",
      badgeClass: "healthy-badge",
      status: "Healthy Crop",
      statusBadge: "badge-success",
      advisory: "Optimal leaf morphology with strong cellular turgor. Continue standard IPM (Integrated Pest Management) protocol.",
      symptoms: [
        "Crisp, vibrant deep green foliage with uniform chlorophyll distribution.",
        "Strong, upright petioles with regular leaflet serration.",
        "Zero signs of viral mottling, fungal lesions, or mite webbing."
      ],
      management: "Maintain consistent fertilization schedule with balanced calcium to prevent blossom end rot. Support vines with stakes or cages."
    }
  };

  // Helper to format class names
  function formatClassName(rawName) {
    if (!rawName) return "Unknown Classification";
    if (DISEASE_DIRECTORY[rawName]) {
      return DISEASE_DIRECTORY[rawName].name;
    }
    return rawName
      .replace(/___/g, " – ")
      .replace(/__/g, " ")
      .replace(/_/g, " ")
      .trim();
  }

  // Helper to format bytes
  function formatBytes(bytes, decimals = 1) {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  // ---------------------------------------------------------------------------
  // 2. DOM ELEMENTS
  // ---------------------------------------------------------------------------
  const fileInput = document.getElementById("leaf-file-input");
  const dropzone = document.getElementById("dropzone");
  const dropzoneEmpty = document.getElementById("dropzone-empty-state");
  const btnBrowse = document.getElementById("btn-browse-file");
  const btnCameraTrigger = document.getElementById("btn-camera-trigger");
  
  const previewContainer = document.getElementById("preview-container");
  const previewViewport = document.getElementById("preview-viewport");
  const previewImage = document.getElementById("preview-image");
  const previewScannerLine = document.getElementById("preview-scanner-line");
  const btnPreviewZoom = document.getElementById("btn-preview-zoom");
  const fileNameDisplay = document.getElementById("file-name");
  const fileSizeDisplay = document.getElementById("file-size");
  const btnRemoveImage = document.getElementById("btn-remove-image");

  const btnAnalyze = document.getElementById("btn-analyze");
  const btnAnalyzeText = document.getElementById("btn-analyze-text");
  const analyzingState = document.getElementById("analyzing-state");

  const alertError = document.getElementById("alert-error");
  const alertErrorTitle = document.getElementById("alert-error-title");
  const alertErrorMsg = document.getElementById("alert-error-msg");

  const alertOffline = document.getElementById("alert-backend-offline");
  const alertOfflineMsg = document.getElementById("alert-backend-msg");

  // Prediction Result elements
  const resultCard = document.getElementById("result-card");
  const resultPreviewImage = document.getElementById("result-preview-image");
  const resultDiseaseName = document.getElementById("result-disease-name");
  const resultRawCode = document.getElementById("result-raw-code");
  const resultStatusBadge = document.getElementById("result-status-badge");
  const resultConfidenceVal = document.getElementById("result-confidence-val");
  const resultConfidenceFill = document.getElementById("result-confidence-fill");
  const resultAdvisoryTitle = document.getElementById("result-advisory-title");
  const resultAdvisoryDesc = document.getElementById("result-advisory-desc");
  const resultTimestamp = document.getElementById("result-timestamp");
  const btnResetAnalysis = document.getElementById("btn-reset-analysis");
  const btnCopyDiagnosis = document.getElementById("btn-copy-diagnosis");
  const btnDownloadReport = document.getElementById("btn-download-report");

  // Navigation elements
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Taxonomy Search & Filter elements
  const diseaseSearch = document.getElementById("disease-search");
  const btnClearSearch = document.getElementById("btn-clear-search");
  const diseaseResultsCount = document.getElementById("disease-results-count");
  const filterChips = document.querySelectorAll(".filter-chip");
  const diseaseCards = document.querySelectorAll(".disease-card");
  const noDiseasesMsg = document.getElementById("no-diseases-msg");

  // Modals & Camera elements
  const cameraModal = document.getElementById("camera-modal");
  const cameraVideo = document.getElementById("camera-video");
  const cameraCanvas = document.getElementById("camera-canvas");
  const btnCloseCamera = document.getElementById("btn-close-camera");
  const btnCancelCamera = document.getElementById("btn-cancel-camera");
  const btnSnapPhoto = document.getElementById("btn-snap-photo");

  const diseaseDetailModal = document.getElementById("disease-detail-modal");
  const btnCloseDetailModal = document.getElementById("btn-close-detail-modal");
  const btnCloseDetailBottom = document.getElementById("btn-close-detail-bottom");
  const btnLoadSampleFromModal = document.getElementById("btn-load-sample-from-modal");
  const modalCropTag = document.getElementById("modal-crop-tag");
  const modalPathogenBadge = document.getElementById("modal-pathogen-badge");
  const detailDiseaseTitle = document.getElementById("detail-disease-title");
  const detailRawCode = document.getElementById("detail-raw-code");
  const detailSymptomsList = document.getElementById("detail-symptoms-list");
  const detailManagementText = document.getElementById("detail-management-text");

  const quickSampleButtons = document.querySelectorAll(".sample-chip");
  const toastContainer = document.getElementById("toast-container");

  // State tracker
  let selectedFile = null;
  let previewUrl = null;
  let isAnalyzing = false;
  let cameraStream = null;
  let currentResultData = null;
  let activeModalClass = null;

  // ---------------------------------------------------------------------------
  // 3. TOAST NOTIFICATION UTILITY
  // ---------------------------------------------------------------------------
  function showToast(message, type = "success") {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("toast-hide");
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // ---------------------------------------------------------------------------
  // 4. INTERACTIVE SAMPLE LEAF GENERATOR (Vector to File Blob)
  // ---------------------------------------------------------------------------
  const SAMPLE_DEFINITIONS = {
    tomato_early_blight: {
      name: "sample_tomato_early_blight.jpg",
      label: "Tomato Early Blight",
      targetClass: "Tomato_Early_blight",
      bgGrad: ["#16a34a", "#14532d"],
      spots: [
        { cx: 160, cy: 120, r: 24, rings: true },
        { cx: 90, cy: 155, r: 16, rings: true },
        { cx: 130, cy: 190, r: 12, rings: false }
      ]
    },
    potato_late_blight: {
      name: "sample_potato_late_blight.jpg",
      label: "Potato Late Blight",
      targetClass: "Potato___Late_blight",
      bgGrad: ["#15803d", "#0f391b"],
      spots: [
        { cx: 140, cy: 110, r: 35, irregular: true },
        { cx: 80, cy: 170, r: 20, irregular: true }
      ]
    },
    pepper_healthy: {
      name: "sample_bell_pepper_healthy.jpg",
      label: "Bell Pepper Healthy",
      targetClass: "Pepper__bell___healthy",
      bgGrad: ["#22c55e", "#15803d"],
      spots: []
    },
    tomato_curl_virus: {
      name: "sample_tomato_yellow_curl.jpg",
      label: "Tomato Yellow Leaf Curl",
      targetClass: "Tomato__Tomato_YellowLeaf__Curl_Virus",
      bgGrad: ["#84cc16", "#15803d"],
      curled: true,
      spots: [
        { cx: 120, cy: 80, r: 28, chlorosis: true },
        { cx: 170, cy: 140, r: 22, chlorosis: true }
      ]
    }
  };

  function generateSampleImageFile(sampleKey) {
    const def = SAMPLE_DEFINITIONS[sampleKey] || SAMPLE_DEFINITIONS.tomato_early_blight;
    const canvas = document.createElement("canvas");
    canvas.width = 448;
    canvas.height = 448;
    const ctx = canvas.getContext("2d");

    // Natural leaf background
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, 448, 448);

    // Leaf Shadow
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.12)";
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 12;

    // Leaf Shape Path
    ctx.beginPath();
    ctx.moveTo(224, 40);
    ctx.bezierCurveTo(340, 110, 390, 260, 224, 390);
    ctx.bezierCurveTo(58, 260, 108, 110, 224, 40);
    ctx.closePath();

    // Leaf Gradient
    const grad = ctx.createLinearGradient(100, 40, 300, 400);
    grad.addColorStop(0, def.bgGrad[0]);
    grad.addColorStop(1, def.bgGrad[1]);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    // Central Venation
    ctx.strokeStyle = "rgba(187, 247, 208, 0.65)";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(224, 40);
    ctx.lineTo(224, 390);
    ctx.stroke();

    // Lateral Veins
    for (let y = 100; y <= 320; y += 45) {
      ctx.beginPath();
      ctx.moveTo(224, y);
      ctx.quadraticCurveTo(280, y + 20, 320, y + 35);
      ctx.moveTo(224, y);
      ctx.quadraticCurveTo(168, y + 20, 128, y + 35);
      ctx.stroke();
    }

    // Spots & Pathologies
    if (def.spots && def.spots.length > 0) {
      def.spots.forEach((spot) => {
        const sx = spot.cx * (448 / 240);
        const sy = spot.cy * (448 / 240);
        const sr = spot.r * 1.5;

        // Halo
        const haloGrad = ctx.createRadialGradient(sx, sy, sr * 0.2, sx, sy, sr * 1.4);
        haloGrad.addColorStop(0, "rgba(234, 179, 8, 0.8)");
        haloGrad.addColorStop(1, "rgba(234, 179, 8, 0)");
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(sx, sy, sr * 1.4, 0, Math.PI * 2);
        ctx.fill();

        // Necrotic Spot
        const spotGrad = ctx.createRadialGradient(sx, sy, 2, sx, sy, sr);
        spotGrad.addColorStop(0, "#451a03");
        spotGrad.addColorStop(0.7, "#78350f");
        spotGrad.addColorStop(1, "#b45309");
        ctx.fillStyle = spotGrad;
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();

        // Concentric Rings for Early Blight
        if (spot.rings) {
          ctx.strokeStyle = "rgba(254, 215, 170, 0.45)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(sx, sy, sr * 0.5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(sx, sy, sr * 0.8, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
    }

    // Convert canvas to Blob & File
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const file = new File([blob], def.name, { type: "image/jpeg" });
        resolve({ file, label: def.label });
      }, "image/jpeg", 0.95);
    });
  }

  // Quick sample buttons click handler
  quickSampleButtons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const sampleKey = btn.getAttribute("data-sample");
      const { file, label } = await generateSampleImageFile(sampleKey);
      handleFileSelected(file);
      showToast(`Loaded test sample: ${label}`);
      dropzone.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  // ---------------------------------------------------------------------------
  // 5. CAMERA CAPTURE (Webcam Support)
  // ---------------------------------------------------------------------------
  async function startCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showError("Camera Not Supported", "Your browser does not support camera capture. Please upload an image file instead.");
      return;
    }

    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      cameraVideo.srcObject = cameraStream;
      cameraModal.style.display = "flex";
    } catch (err) {
      console.warn("Camera access denied or unavailable:", err);
      showError("Camera Access Denied", "Unable to access your camera. Please allow camera permissions or upload an image.");
    }
  }

  function stopCamera() {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      cameraStream = null;
    }
    cameraModal.style.display = "none";
  }

  if (btnCameraTrigger) {
    btnCameraTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      startCamera();
    });
  }

  if (btnCloseCamera) btnCloseCamera.addEventListener("click", stopCamera);
  if (btnCancelCamera) btnCancelCamera.addEventListener("click", stopCamera);

  if (btnSnapPhoto) {
    btnSnapPhoto.addEventListener("click", () => {
      if (!cameraStream) return;
      const width = cameraVideo.videoWidth || 640;
      const height = cameraVideo.videoHeight || 480;
      cameraCanvas.width = width;
      cameraCanvas.height = height;

      const ctx = cameraCanvas.getContext("2d");
      ctx.drawImage(cameraVideo, 0, 0, width, height);

      cameraCanvas.toBlob((blob) => {
        const filename = `camera_leaf_${Date.now()}.jpg`;
        const file = new File([blob], filename, { type: "image/jpeg" });
        stopCamera();
        handleFileSelected(file);
        showToast("Photo captured successfully!");
      }, "image/jpeg", 0.95);
    });
  }

  // ---------------------------------------------------------------------------
  // 6. ZOOM INSPECTION ON PREVIEW
  // ---------------------------------------------------------------------------
  function toggleZoom() {
    if (previewViewport) {
      previewViewport.classList.toggle("zoomed");
    }
  }

  if (btnPreviewZoom) {
    btnPreviewZoom.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleZoom();
    });
  }

  if (previewViewport) {
    previewViewport.addEventListener("click", (e) => {
      if (e.target.closest("#btn-preview-zoom")) return;
      toggleZoom();
    });
  }

  // ---------------------------------------------------------------------------
  // 7. FILE SELECTION & VALIDATION
  // ---------------------------------------------------------------------------
  const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/jpg"];
  const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

  function handleFileSelected(file) {
    hideAlerts();
    if (!file) return;

    const extension = file.name.split(".").pop().toLowerCase();
    const isValidExtension = ["jpg", "jpeg", "png"].includes(extension);
    const isValidMime = ALLOWED_MIME_TYPES.includes(file.type);

    if (!isValidExtension && !isValidMime) {
      showError("Invalid file format.", "Please select a JPG, JPEG, or PNG crop leaf image.");
      resetFileInputOnly();
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      showError("File too large.", `Maximum allowed size is 10 MB. Selected file is ${formatBytes(file.size)}.`);
      resetFileInputOnly();
      return;
    }

    selectedFile = file;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    previewUrl = URL.createObjectURL(file);

    previewImage.src = previewUrl;
    fileNameDisplay.textContent = file.name;
    fileSizeDisplay.textContent = formatBytes(file.size);

    dropzoneEmpty.style.display = "none";
    previewContainer.style.display = "block";
    btnAnalyze.disabled = false;
    resultCard.style.display = "none";
  }

  function resetFileInputOnly() {
    fileInput.value = "";
    selectedFile = null;
    btnAnalyze.disabled = true;
  }

  function removeImage() {
    hideAlerts();
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      previewUrl = null;
    }
    selectedFile = null;
    fileInput.value = "";

    dropzoneEmpty.style.display = "block";
    previewContainer.style.display = "none";
    previewViewport.classList.remove("zoomed");
    previewScannerLine.classList.remove("scanning");
    btnAnalyze.disabled = true;
    analyzingState.style.display = "none";
    resultCard.style.display = "none";
  }

  // Dropzone click & drag handlers
  if (btnBrowse) {
    btnBrowse.addEventListener("click", (e) => {
      e.stopPropagation();
      fileInput.click();
    });
  }

  if (dropzone) {
    dropzone.addEventListener("click", (e) => {
      if (e.target.closest("#btn-remove-image") || e.target.closest(".sample-chip") || e.target.closest("#btn-camera-trigger") || selectedFile) {
        return;
      }
      fileInput.click();
    });

    dropzone.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && !selectedFile) {
        e.preventDefault();
        fileInput.click();
      }
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add("drag-over");
      });
    });

    ["dragleave", "dragend"].forEach((eventName) => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove("drag-over");
      });
    });

    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove("drag-over");
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileSelected(e.dataTransfer.files[0]);
      }
    });
  }

  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFileSelected(e.target.files[0]);
      }
    });
  }

  if (btnRemoveImage) {
    btnRemoveImage.addEventListener("click", (e) => {
      e.stopPropagation();
      removeImage();
    });
  }

  // ---------------------------------------------------------------------------
  // 8. ALERT / ERROR STATE HELPERS
  // ---------------------------------------------------------------------------
  function hideAlerts() {
    alertError.style.display = "none";
    alertOffline.style.display = "none";
  }

  function showError(title, message) {
    alertOffline.style.display = "none";
    alertErrorTitle.textContent = title || "Unable to analyze image. Please try again.";
    alertErrorMsg.textContent = message || "Please verify the image is clear and try again.";
    alertError.style.display = "flex";
  }

  function showOfflineAlert(message) {
    alertError.style.display = "none";
    alertOfflineMsg.textContent = message || "Prediction service is currently unavailable. Backend model weights are not loaded or server is offline.";
    alertOffline.style.display = "flex";
  }

  // ---------------------------------------------------------------------------
  // 9. FLASK /PREDICT API INTEGRATION
  // ---------------------------------------------------------------------------
  if (btnAnalyze) {
    btnAnalyze.addEventListener("click", async () => {
      if (!selectedFile || isAnalyzing) return;

      hideAlerts();
      resultCard.style.display = "none";

      isAnalyzing = true;
      btnAnalyze.disabled = true;
      btnAnalyzeText.textContent = "Analyzing...";
      analyzingState.style.display = "block";
      previewScannerLine.classList.add("scanning");

      dropzone.scrollIntoView({ behavior: "smooth", block: "center" });

      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await fetch("/predict", {
          method: "POST",
          body: formData
        });

        const data = await response.json().catch(() => null);

        if (response.ok && data) {
          renderPredictionResult(data);
        } else if (response.status === 503) {
          const msg = data && data.message ? data.message : "Prediction service is currently unavailable. Backend model weights are not loaded.";
          showOfflineAlert(msg);
        } else if (response.status === 400) {
          const msg = data && data.message ? data.message : "Invalid image upload. Please choose a valid crop leaf image.";
          showError("Invalid Input", msg);
        } else {
          const msg = data && data.message ? data.message : "Unable to analyze image. Please try again.";
          showError("Analysis Failed", msg);
        }
      } catch (err) {
        console.error("Fetch error contacting /predict endpoint:", err);
        showOfflineAlert("Prediction service is currently unavailable. Unable to reach Flask backend at /predict.");
      } finally {
        isAnalyzing = false;
        btnAnalyze.disabled = false;
        btnAnalyzeText.textContent = "Analyze Disease";
        analyzingState.style.display = "none";
        previewScannerLine.classList.remove("scanning");
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 10. RENDER PREDICTION RESULT
  // ---------------------------------------------------------------------------
  function renderPredictionResult(data) {
    const rawClass = typeof data.disease === "string" ? data.disease.trim() : "Unknown_Disease";
    let confidence = 0;

    if (typeof data.confidence === "number" && !isNaN(data.confidence)) {
      confidence = Math.min(100, Math.max(0, data.confidence));
    } else if (typeof data.confidence === "string") {
      const parsed = parseFloat(data.confidence);
      confidence = !isNaN(parsed) ? Math.min(100, Math.max(0, parsed)) : 0;
    }

    const details = DISEASE_DIRECTORY[rawClass] || {
      name: formatClassName(rawClass),
      crop: "Crop Leaf",
      condition: "Disease Indication",
      type: "Pathology Observation",
      badgeClass: "fungal-badge",
      status: "Disease Detected",
      statusBadge: "badge-danger",
      advisory: "Preliminary neural classification completed. Conduct secondary physical inspection before chemical intervention."
    };

    currentResultData = {
      rawClass,
      name: details.name,
      crop: details.crop,
      condition: details.condition,
      type: details.type,
      confidence: confidence.toFixed(1),
      status: details.status,
      advisory: details.advisory,
      timestamp: new Date().toLocaleString()
    };

    resultPreviewImage.src = previewUrl || "";
    resultDiseaseName.textContent = details.name;
    resultRawCode.textContent = rawClass;
    
    resultStatusBadge.textContent = details.status;
    resultStatusBadge.className = `badge ${details.badgeClass}`;

    resultConfidenceVal.textContent = `${confidence.toFixed(1)}%`;
    resultAdvisoryTitle.textContent = `${details.crop} – ${details.type}`;
    resultAdvisoryDesc.textContent = details.advisory;

    const now = new Date();
    resultTimestamp.textContent = `Analyzed at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    resultCard.style.display = "block";
    resultConfidenceFill.style.width = "0%";
    setTimeout(() => {
      resultConfidenceFill.style.width = `${confidence.toFixed(1)}%`;
    }, 100);

    resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ---------------------------------------------------------------------------
  // 11. INTERACTIVE RESULT ACTIONS (Copy Diagnosis & Download Report)
  // ---------------------------------------------------------------------------
  if (btnCopyDiagnosis) {
    btnCopyDiagnosis.addEventListener("click", () => {
      if (!currentResultData) return;
      const textToCopy = `AgriVision Plant Pathology Report
----------------------------------------
Crop: ${currentResultData.crop}
Condition: ${currentResultData.condition}
Type: ${currentResultData.type}
Confidence: ${currentResultData.confidence}%
Status: ${currentResultData.status}
Advisory: ${currentResultData.advisory}
Timestamp: ${currentResultData.timestamp}
----------------------------------------
Analyzed with MobileNetV2 Deep Learning`;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast("Diagnostic summary copied to clipboard!");
      }).catch(() => {
        showToast("Unable to copy to clipboard.");
      });
    });
  }

  if (btnDownloadReport) {
    btnDownloadReport.addEventListener("click", () => {
      if (!currentResultData) return;
      const reportContent = `======================================================
 AGRIVISION - CROP DISEASE DIAGNOSTIC REPORT
======================================================

Date / Time: ${currentResultData.timestamp}
File Analyzed: ${selectedFile ? selectedFile.name : "leaf_photo.jpg"}

DIAGNOSTIC FINDINGS:
------------------------------------------------------
Detected Condition:  ${currentResultData.name}
Raw Taxonomy Class:  ${currentResultData.rawClass}
Crop Category:       ${currentResultData.crop}
Pathogen Type:       ${currentResultData.type}
Classification Conf: ${currentResultData.confidence}%
Diagnostic Status:   ${currentResultData.status}

RECOMMENDED AGRICULTURAL ADVISORY:
------------------------------------------------------
${currentResultData.advisory}

AI ARCHITECTURE SPECS:
------------------------------------------------------
Model: MobileNetV2 Deep Convolutional Neural Network
Resolution: 224 x 224 RGB Tensor
Trained Taxonomy: PlantVillage 15 Calibrated Classes

======================================================
Notice: Preliminary AI diagnostic indication. Confirm with local extension services before applying commercial treatments.
======================================================`;

      const blob = new Blob([reportContent], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `AgriVision_Diagnosis_${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("Diagnostic report downloaded!");
    });
  }

  if (btnResetAnalysis) {
    btnResetAnalysis.addEventListener("click", () => {
      removeImage();
      dropzone.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  // ---------------------------------------------------------------------------
  // 12. INTERACTIVE DISEASE DETAIL MODAL (Card Click)
  // ---------------------------------------------------------------------------
  function openDiseaseDetail(rawCode) {
    const details = DISEASE_DIRECTORY[rawCode];
    if (!details) return;

    activeModalClass = rawCode;
    detailDiseaseTitle.textContent = details.condition;
    detailRawCode.textContent = rawCode;
    modalCropTag.textContent = details.crop;
    modalCropTag.className = `crop-tag ${details.crop.toLowerCase().replace(/\s+/g, "")}-tag`;
    modalPathogenBadge.textContent = details.type;
    modalPathogenBadge.className = `pathogen-badge ${details.badgeClass}`;

    // Populate symptoms list
    detailSymptomsList.innerHTML = "";
    if (details.symptoms) {
      details.symptoms.forEach((symptom) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${symptom}</span>
        `;
        detailSymptomsList.appendChild(li);
      });
    }

    detailManagementText.textContent = details.management || details.advisory;
    diseaseDetailModal.style.display = "flex";
  }

  function closeDiseaseDetail() {
    diseaseDetailModal.style.display = "none";
    activeModalClass = null;
  }

  diseaseCards.forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View details for ${card.querySelector(".disease-card-title")?.textContent || "disease"}`);

    const rawCode = card.querySelector(".raw-class-tag")?.textContent.trim();

    card.addEventListener("click", () => {
      if (rawCode) openDiseaseDetail(rawCode);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (rawCode) openDiseaseDetail(rawCode);
      }
    });
  });

  if (btnCloseDetailModal) btnCloseDetailModal.addEventListener("click", closeDiseaseDetail);
  if (btnCloseDetailBottom) btnCloseDetailBottom.addEventListener("click", closeDiseaseDetail);

  if (btnLoadSampleFromModal) {
    btnLoadSampleFromModal.addEventListener("click", async () => {
      let sampleKey = "tomato_early_blight";
      if (activeModalClass) {
        if (activeModalClass.includes("Potato")) sampleKey = "potato_late_blight";
        else if (activeModalClass.includes("Pepper") && activeModalClass.includes("healthy")) sampleKey = "pepper_healthy";
        else if (activeModalClass.includes("YellowLeaf")) sampleKey = "tomato_curl_virus";
      }

      closeDiseaseDetail();
      const { file, label } = await generateSampleImageFile(sampleKey);
      handleFileSelected(file);
      showToast(`Loaded test sample: ${label}`);
      dropzone.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  // Close modals on clicking backdrop or Escape
  [cameraModal, diseaseDetailModal].forEach((modal) => {
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          if (modal === cameraModal) stopCamera();
          if (modal === diseaseDetailModal) closeDiseaseDetail();
        }
      });
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (cameraModal.style.display === "flex") stopCamera();
      if (diseaseDetailModal.style.display === "flex") closeDiseaseDetail();
    }
  });

  // ---------------------------------------------------------------------------
  // 13. SUPPORTED DISEASES SEARCH & FILTERING (with Clear button & Count)
  // ---------------------------------------------------------------------------
  let activeFilter = "all";
  let searchQuery = "";

  function applyDiseaseFilters() {
    let visibleCount = 0;
    const query = searchQuery.trim().toLowerCase();

    diseaseCards.forEach((card) => {
      const crop = (card.getAttribute("data-crop") || "").toLowerCase();
      const type = (card.getAttribute("data-type") || "").toLowerCase();
      const name = (card.getAttribute("data-name") || "").toLowerCase();
      const raw = card.querySelector(".raw-class-tag")?.textContent.toLowerCase() || "";
      const text = card.textContent.toLowerCase();

      let matchesCategory = false;
      if (activeFilter === "all") matchesCategory = true;
      else if (activeFilter === "tomato" && crop === "tomato") matchesCategory = true;
      else if (activeFilter === "potato" && crop === "potato") matchesCategory = true;
      else if (activeFilter === "pepper" && crop === "pepper") matchesCategory = true;
      else if (activeFilter === "healthy" && type === "healthy") matchesCategory = true;
      else if (activeFilter === "disease" && type === "disease") matchesCategory = true;

      let matchesSearch = true;
      if (query.length > 0) {
        matchesSearch = text.includes(query) || name.includes(query) || raw.includes(query);
      }

      if (matchesCategory && matchesSearch) {
        card.style.display = "flex";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    if (noDiseasesMsg) {
      noDiseasesMsg.style.display = visibleCount === 0 ? "flex" : "none";
    }

    if (diseaseResultsCount) {
      diseaseResultsCount.textContent = `${visibleCount} of 15 classes`;
    }

    if (btnClearSearch) {
      btnClearSearch.style.display = query.length > 0 ? "flex" : "none";
    }
  }

  if (diseaseSearch) {
    diseaseSearch.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      applyDiseaseFilters();
    });
  }

  if (btnClearSearch) {
    btnClearSearch.addEventListener("click", () => {
      diseaseSearch.value = "";
      searchQuery = "";
      applyDiseaseFilters();
      diseaseSearch.focus();
    });
  }

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      filterChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      activeFilter = chip.getAttribute("data-filter") || "all";
      applyDiseaseFilters();
    });
  });

  // ---------------------------------------------------------------------------
  // 14. NAVBAR SCROLLSPY & MOBILE MENU
  // ---------------------------------------------------------------------------
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const sections = document.querySelectorAll("section[id], footer[id]");
  window.addEventListener("scroll", () => {
    let currentId = "";
    const scrollPosition = window.pageYOffset + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  }, { passive: true });
});
