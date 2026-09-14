/**
 * Penggaris Online Engine (penggarisonlinehp.com)
 * High-precision calibration, multi-tool physics (1D, 2D, Circle, Protractor/Angle), touch handling, and live measurement engine
 */

export const CARD_STANDARD = {
  name: 'Kartu ATM / e-KTP (Standar ISO/IEC 7810 ID-1)',
  widthMm: 85.60,
  heightMm: 53.98,
  widthInch: 85.60 / 25.4, // 3.37007874
  heightInch: 53.98 / 25.4 // 2.12519685
};

export const COIN_PRESETS = [
  { name: 'Koin Rp 1.000 (Aluminium/Angklung)', diameterMm: 24.15 },
  { name: 'Koin Rp 500 (Aluminium 2016)', diameterMm: 27.00 },
  { name: 'Koin Rp 200 (Aluminium 2016)', diameterMm: 25.00 },
  { name: 'Koin Rp 100 (Aluminium 2016)', diameterMm: 23.00 },
  { name: 'Cincin Ukuran Standar 17 (Diameter ~18.1 mm)', diameterMm: 18.10 },
  { name: 'Tutup Botol Air Mineral Standar (~30 mm)', diameterMm: 30.00 }
];

export const DEVICE_PRESETS = [
  { id: 'auto', name: 'Deteksi Otomatis Browser', ppi: null, category: 'Otomatis' },
  // Smartphone Populer di Indonesia
  { id: 'iphone-pro', name: 'Apple iPhone 13/14/15/16 Pro / Pro Max', ppi: 460, category: 'iPhone' },
  { id: 'iphone-base', name: 'Apple iPhone 12/13/14/15/16', ppi: 460, category: 'iPhone' },
  { id: 'iphone-11', name: 'Apple iPhone 11 / XR (6.1")', ppi: 326, category: 'iPhone' },
  { id: 'samsung-s24u', name: 'Samsung Galaxy S24 Ultra (6.8")', ppi: 505, category: 'Samsung' },
  { id: 'samsung-s24', name: 'Samsung Galaxy S23 / S24 (6.2")', ppi: 416, category: 'Samsung' },
  { id: 'samsung-a55', name: 'Samsung Galaxy A54 / A55 5G (6.6")', ppi: 390, category: 'Samsung' },
  { id: 'samsung-a15', name: 'Samsung Galaxy A14 / A15 / A05s (6.5")', ppi: 399, category: 'Samsung' },
  { id: 'xiaomi-redmi13', name: 'Xiaomi Redmi Note 12 / 13 (6.67")', ppi: 395, category: 'Xiaomi / Poco' },
  { id: 'poco-x6', name: 'Poco X6 / X6 Pro / F5 (6.67")', ppi: 446, category: 'Xiaomi / Poco' },
  { id: 'oppo-reno', name: 'Oppo Reno 10 / 11 / 12 (6.7")', ppi: 394, category: 'Oppo' },
  { id: 'vivo-v30', name: 'Vivo V27 / V29 / V30 (6.78")', ppi: 453, category: 'Vivo' },
  { id: 'infinix-note', name: 'Infinix Note 30 / 40 / Hot 40 Pro (6.78")', ppi: 396, category: 'Infinix' },
  // Tablet
  { id: 'ipad-10', name: 'Apple iPad 10.2" / 10.9"', ppi: 264, category: 'Tablet' },
  { id: 'ipad-mini', name: 'Apple iPad mini (6th Gen)', ppi: 326, category: 'Tablet' },
  { id: 'samsung-tab-s9', name: 'Samsung Galaxy Tab S9 (11")', ppi: 274, category: 'Tablet' },
  // Laptop & PC Monitor
  { id: 'macbook-air-13', name: 'Apple MacBook Air 13.3" / 13.6" (Retina)', ppi: 224, category: 'Laptop' },
  { id: 'macbook-pro-14', name: 'Apple MacBook Pro 14.2" (Liquid Retina)', ppi: 254, category: 'Laptop' },
  { id: 'laptop-14-fhd', name: 'Laptop 14.0" Full HD (1920x1080) - Standar', ppi: 157.4, category: 'Laptop' },
  { id: 'laptop-156-fhd', name: 'Laptop 15.6" Full HD (1920x1080) - Standar', ppi: 141.2, category: 'Laptop' },
  { id: 'laptop-14-hd', name: 'Laptop 14.0" HD (1366x768)', ppi: 111.9, category: 'Laptop' },
  { id: 'monitor-24-fhd', name: 'Monitor PC 24" Full HD (1920x1080)', ppi: 91.8, category: 'Monitor' },
  { id: 'monitor-27-qhd', name: 'Monitor PC 27" 2K QHD (2560x1440)', ppi: 108.8, category: 'Monitor' },
  { id: 'monitor-27-4k', name: 'Monitor PC 27" 4K UHD (3840x2160)', ppi: 163.2, category: 'Monitor' }
];

export const STORAGE_KEYS = {
  PPI: 'penggaris_online_ppi_v2',
  UNIT: 'penggaris_online_unit',
  METHOD: 'penggaris_online_calib_method',
  ORIENTATION: 'penggaris_online_orientation',
  SCALE_MODE: 'penggaris_online_scale_mode',
  ACTIVE_TOOL: 'penggaris_online_tool',
  THEME: 'penggaris_theme'
};

class RulerEngine {
  constructor() {
    this.ppi = 96;
    this.unit = 'cm'; // 'cm', 'mm', 'inch'
    this.orientation = 'horizontal'; // 'horizontal', 'vertical'
    this.scaleMode = 'dual'; // 'single', 'dual'
    this.activeTool = '1d'; // '1d', '2d', 'circle', 'angle'
    this.isLocked = false; // Caliper Lock feature

    // 1D Linear Caliper state (px)
    this.caliperStart = 40;
    this.caliperEnd = 230;

    // 2D Caliper Box state (px)
    this.caliper2D = {
      x1: 40,
      y1: 40,
      x2: 240,
      y2: 180
    };

    // Circle Caliper state (radius in px)
    this.circleRadius = 50;

    // Angle / Protractor state (degrees 0 - 360)
    this.angleArm1 = 0;
    this.angleArm2 = 45;

    this.flipZero = false;
    this.isCalibrated = false;
    this.calibrationMethod = 'auto';
    this.listeners = new Set();
  }

  init() {
    if (typeof window === 'undefined') return;

    // Load saved preferences
    const savedPpi = localStorage.getItem(STORAGE_KEYS.PPI);
    const savedUnit = localStorage.getItem(STORAGE_KEYS.UNIT);
    const savedMethod = localStorage.getItem(STORAGE_KEYS.METHOD);
    const savedOrientation = localStorage.getItem(STORAGE_KEYS.ORIENTATION);
    const savedScale = localStorage.getItem(STORAGE_KEYS.SCALE_MODE);
    const savedTool = localStorage.getItem(STORAGE_KEYS.ACTIVE_TOOL);

    if (savedUnit && ['cm', 'mm', 'inch'].includes(savedUnit)) {
      this.unit = savedUnit;
    }
    if (savedOrientation && ['horizontal', 'vertical'].includes(savedOrientation)) {
      this.orientation = savedOrientation;
    }
    if (savedScale && ['single', 'dual'].includes(savedScale)) {
      this.scaleMode = savedScale;
    }
    if (savedTool && ['1d', '2d', 'circle', 'angle'].includes(savedTool)) {
      this.activeTool = savedTool;
    }

    if (savedPpi && !isNaN(parseFloat(savedPpi))) {
      this.ppi = parseFloat(savedPpi);
      this.isCalibrated = true;
      this.calibrationMethod = savedMethod || 'manual';
    } else {
      this.autoDetectPpi();
    }

    // Set initial caliper positions (approx 5 cm)
    const initial5CmPx = (5 / 2.54) * this.ppi;
    this.caliperStart = 40;
    this.caliperEnd = this.caliperStart + initial5CmPx;

    // Set 2D initial box (5cm x 3.5cm)
    const initial3_5CmPx = (3.5 / 2.54) * this.ppi;
    this.caliper2D = {
      x1: 40,
      y1: 40,
      x2: 40 + initial5CmPx,
      y2: 40 + initial3_5CmPx
    };

    // Initial circle radius (~ 1.5 cm)
    this.circleRadius = Math.round((1.5 / 2.54) * this.ppi);

    // Listen to window resize / zoom change
    window.addEventListener('resize', () => {
      this.checkZoomWarning();
      this.notify();
    });

    this.checkZoomWarning();
  }

  autoDetectPpi() {
    if (typeof window === 'undefined') return 96;

    const dpr = window.devicePixelRatio || 1;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouch && Math.min(window.screen.width, window.screen.height) < 500) {
      this.ppi = Math.round(412 / dpr) * dpr;
      this.calibrationMethod = 'auto-mobile';
    } else if (isTouch && Math.min(window.screen.width, window.screen.height) < 900) {
      this.ppi = Math.round(264 / dpr) * dpr;
      this.calibrationMethod = 'auto-tablet';
    } else {
      if (dpr > 1.25) {
        this.ppi = 141.2;
      } else {
        this.ppi = 96;
      }
      this.calibrationMethod = 'auto-desktop';
    }

    this.isCalibrated = false;
    return this.ppi;
  }

  checkZoomWarning() {
    if (typeof window === 'undefined') return false;
    const zoomLevel = Math.round((window.outerWidth / window.innerWidth) * 100);
    const isZoomed = Math.abs(zoomLevel - 100) > 4;
    
    const warningEl = document.getElementById('zoom-alert');
    if (warningEl) {
      if (isZoomed) {
        warningEl.classList.remove('hidden');
        const zoomText = document.getElementById('zoom-percentage');
        if (zoomText) zoomText.textContent = `${zoomLevel}%`;
      } else {
        warningEl.classList.add('hidden');
      }
    }
    return isZoomed;
  }

  setPpi(newPpi, method = 'manual') {
    const val = parseFloat(newPpi);
    if (!isNaN(val) && val > 20 && val < 1000) {
      this.ppi = Math.round(val * 10) / 10;
      this.isCalibrated = true;
      this.calibrationMethod = method;
      localStorage.setItem(STORAGE_KEYS.PPI, this.ppi.toString());
      localStorage.setItem(STORAGE_KEYS.METHOD, method);
      this.notify();
    }
  }

  resetCalibration() {
    localStorage.removeItem(STORAGE_KEYS.PPI);
    localStorage.removeItem(STORAGE_KEYS.METHOD);
    this.autoDetectPpi();
    this.notify();
  }

  setUnit(unit) {
    if (['cm', 'mm', 'inch'].includes(unit)) {
      this.unit = unit;
      localStorage.setItem(STORAGE_KEYS.UNIT, unit);
      this.notify();
    }
  }

  setTool(tool) {
    if (['1d', '2d', 'circle', 'angle'].includes(tool)) {
      this.activeTool = tool;
      localStorage.setItem(STORAGE_KEYS.ACTIVE_TOOL, tool);
      this.notify();
    }
  }

  toggleLock() {
    this.isLocked = !this.isLocked;
    this.notify();
    return this.isLocked;
  }

  setOrientation(orient) {
    if (['horizontal', 'vertical'].includes(orient)) {
      this.orientation = orient;
      localStorage.setItem(STORAGE_KEYS.ORIENTATION, orient);
      this.notify();
    }
  }

  setScaleMode(mode) {
    if (['single', 'dual'].includes(mode)) {
      this.scaleMode = mode;
      localStorage.setItem(STORAGE_KEYS.SCALE_MODE, mode);
      this.notify();
    }
  }

  toggleFlipZero() {
    this.flipZero = !this.flipZero;
    this.notify();
  }

  // 1D Measurement Calculations
  getMeasuredPixels() {
    return Math.abs(this.caliperEnd - this.caliperStart);
  }

  getMeasuredInches() {
    return this.getMeasuredPixels() / this.ppi;
  }

  getMeasuredCm() {
    return this.getMeasuredInches() * 2.54;
  }

  getMeasuredMm() {
    return this.getMeasuredCm() * 10;
  }

  // 2D Measurements (Width, Height, Area, Diagonal)
  get2DMeasurements() {
    const widthPx = Math.abs(this.caliper2D.x2 - this.caliper2D.x1);
    const heightPx = Math.abs(this.caliper2D.y2 - this.caliper2D.y1);
    const diagPx = Math.sqrt(widthPx * widthPx + heightPx * heightPx);

    const widthCm = (widthPx / this.ppi) * 2.54;
    const heightCm = (heightPx / this.ppi) * 2.54;
    const diagCm = (diagPx / this.ppi) * 2.54;

    const widthMm = widthCm * 10;
    const heightMm = heightCm * 10;
    const diagMm = diagCm * 10;

    const widthIn = widthPx / this.ppi;
    const heightIn = heightPx / this.ppi;
    const diagIn = diagPx / this.ppi;

    const areaCm2 = widthCm * heightCm;
    const areaIn2 = widthIn * heightIn;

    return {
      widthPx: Math.round(widthPx),
      heightPx: Math.round(heightPx),
      widthCm: widthCm.toFixed(2),
      heightCm: heightCm.toFixed(2),
      widthMm: widthMm.toFixed(1),
      heightMm: heightMm.toFixed(1),
      widthIn: widthIn.toFixed(2),
      heightIn: heightIn.toFixed(2),
      diagCm: diagCm.toFixed(2),
      diagIn: diagIn.toFixed(2),
      areaCm2: areaCm2.toFixed(2),
      areaIn2: areaIn2.toFixed(2)
    };
  }

  // Circle Measurements
  getCircleMeasurements() {
    const radiusPx = Math.max(5, this.circleRadius);
    const diameterPx = radiusPx * 2;

    const radiusCm = (radiusPx / this.ppi) * 2.54;
    const diameterCm = (diameterPx / this.ppi) * 2.54;
    const diameterMm = diameterCm * 10;
    const diameterIn = diameterPx / this.ppi;

    const circumferenceCm = Math.PI * diameterCm;
    const circumferenceMm = circumferenceCm * 10;
    const circumferenceIn = Math.PI * diameterIn;

    const areaCm2 = Math.PI * radiusCm * radiusCm;

    return {
      radiusPx: Math.round(radiusPx),
      diameterPx: Math.round(diameterPx),
      diameterCm: diameterCm.toFixed(2),
      diameterMm: diameterMm.toFixed(1),
      diameterIn: diameterIn.toFixed(2),
      fractionIn: this.getFractionalInch(diameterIn),
      circumferenceCm: circumferenceCm.toFixed(2),
      circumferenceMm: circumferenceMm.toFixed(1),
      circumferenceIn: circumferenceIn.toFixed(2),
      areaCm2: areaCm2.toFixed(2)
    };
  }

  setCircleDiameterMm(mm) {
    const radiusMm = Math.max(1, mm / 2);
    const pxPerMm = this.ppi / 25.4;
    this.circleRadius = Math.max(5, Math.round(radiusMm * pxPerMm));
    this.notify();
  }

  stepCircleDiameterMm(deltaMm) {
    const circ = this.getCircleMeasurements();
    const nextMm = Math.max(2, parseFloat(circ.diameterMm) + deltaMm);
    this.setCircleDiameterMm(nextMm);
  }

  // 1D Length Control Methods
  set1DLengthMm(mm, maxLimit = Infinity) {
    const px = (Math.max(0.5, mm) / 25.4) * this.ppi;
    let start = Math.min(this.caliperStart, this.caliperEnd);
    let end = start + px;
    if (end > maxLimit && maxLimit < Infinity) {
      const overflow = end - maxLimit;
      start = Math.max(0, start - overflow);
      end = Math.min(maxLimit, start + px);
    }
    this.caliperStart = start;
    this.caliperEnd = end;
    this.notify();
  }

  step1DLengthMm(deltaMm, maxLimit = Infinity) {
    const currentMm = this.getMeasuredMm();
    const nextMm = Math.max(0.5, currentMm + deltaMm);
    this.set1DLengthMm(nextMm, maxLimit);
  }

  // 2D Dimension Control Methods
  set2DWidthMm(widthMm, maxLimit = Infinity) {
    const px = (Math.max(1, widthMm) / 25.4) * this.ppi;
    let x1 = this.caliper2D.x1;
    let x2 = x1 + px;
    if (x2 > maxLimit && maxLimit < Infinity) {
      const overflow = x2 - maxLimit;
      x1 = Math.max(30, x1 - overflow);
      x2 = Math.min(maxLimit, x1 + px);
    }
    this.caliper2D.x1 = x1;
    this.caliper2D.x2 = x2;
    this.notify();
  }

  set2DHeightMm(heightMm, maxLimit = Infinity) {
    const px = (Math.max(1, heightMm) / 25.4) * this.ppi;
    let y1 = this.caliper2D.y1;
    let y2 = y1 + px;
    if (y2 > maxLimit && maxLimit < Infinity) {
      const overflow = y2 - maxLimit;
      y1 = Math.max(30, y1 - overflow);
      y2 = Math.min(maxLimit, y1 + px);
    }
    this.caliper2D.y1 = y1;
    this.caliper2D.y2 = y2;
    this.notify();
  }

  step2DWidthMm(deltaMm, maxLimit = Infinity) {
    const m2d = this.get2DMeasurements();
    const nextMm = Math.max(1, parseFloat(m2d.widthMm) + deltaMm);
    this.set2DWidthMm(nextMm, maxLimit);
  }

  step2DHeightMm(deltaMm, maxLimit = Infinity) {
    const m2d = this.get2DMeasurements();
    const nextMm = Math.max(1, parseFloat(m2d.heightMm) + deltaMm);
    this.set2DHeightMm(nextMm, maxLimit);
  }

  // Angle Measurements (Protractor)
  getAngleMeasurements() {
    // Normalizing angles 0-360
    let diff = (this.angleArm2 - this.angleArm1) % 360;
    if (diff < 0) diff += 360;

    const rad = (diff * Math.PI) / 180;

    let classification = 'Sudut Lancip';
    if (Math.abs(diff - 90) < 0.5) classification = 'Sudut Siku-Siku (90°)';
    else if (diff < 90) classification = 'Sudut Lancip (< 90°)';
    else if (Math.abs(diff - 180) < 0.5) classification = 'Sudut Lurus (180°)';
    else if (diff < 180) classification = 'Sudut Tumpul (> 90°)';
    else classification = 'Sudut Refleks (> 180°)';

    return {
      degrees: diff.toFixed(1),
      radians: rad.toFixed(3),
      classification,
      arm1: this.angleArm1.toFixed(1),
      arm2: this.angleArm2.toFixed(1)
    };
  }

  setAngleDegrees(deg) {
    let targetDeg = ((deg % 360) + 360) % 360;
    this.angleArm2 = (this.angleArm1 + targetDeg) % 360;
    this.notify();
  }

  stepAngleDegrees(deltaDeg) {
    const currentDeg = parseFloat(this.getAngleMeasurements().degrees);
    let nextDeg = Math.round((currentDeg + deltaDeg) * 10) / 10;
    while (nextDeg < 0) nextDeg += 360;
    while (nextDeg >= 360) nextDeg -= 360;
    this.setAngleDegrees(nextDeg);
  }

  getFractionalInch(inches) {
    const whole = Math.floor(inches);
    const remainder = inches - whole;
    const sixteenths = Math.round(remainder * 16);

    if (sixteenths === 0) return `${whole}"`;
    if (sixteenths === 16) return `${whole + 1}"`;

    let num = sixteenths;
    let den = 16;
    while (num % 2 === 0 && den % 2 === 0) {
      num /= 2;
      den /= 2;
    }

    if (whole === 0) {
      return `${num}/${den}"`;
    }
    return `${whole} ${num}/${den}"`;
  }

  getLiveMeasurement() {
    const px = this.getMeasuredPixels();
    const cm = this.getMeasuredCm();
    const mm = this.getMeasuredMm();
    const inch = this.getMeasuredInches();
    const fraction = this.getFractionalInch(inch);

    return {
      px: Math.round(px),
      cm: cm.toFixed(2),
      mm: mm.toFixed(1),
      inch: inch.toFixed(3),
      fraction,
      formattedPrimary: this.getFormattedValue(this.unit)
    };
  }

  getFormattedValue(unit = this.unit) {
    if (unit === 'cm') {
      return `${this.getMeasuredCm().toFixed(2)} cm`;
    } else if (unit === 'mm') {
      return `${this.getMeasuredMm().toFixed(1)} mm`;
    } else {
      return `${this.getMeasuredInches().toFixed(3)} in (${this.getFractionalInch(this.getMeasuredInches())})`;
    }
  }

  triggerHaptic() {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(8);
      } catch (e) {}
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this);
    }
  }
}

export const rulerEngine = new RulerEngine();
