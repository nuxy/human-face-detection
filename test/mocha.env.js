// Global shorthand.
global.PACKAGE_ROOT = process.cwd();

// Environment overrides.
process.env.HUMAN_DEBUG      = false;
process.env.HUMAN_MODELS_DIR = 'node_modules/@vladmandic/human/models';

// TensorFlow logging
process.env.TF_CPP_MIN_LOG_LEVEL = 3;
