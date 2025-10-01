#!/usr/bin/env node

/**
 * Asset Setup Script
 * Copies WASM files and AI models from the package to your public folder
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function copyDir(src, dest) {
  // Create destination if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      log(`  ✓ ${entry.name}`, 'green');
    }
  }
}

function main() {
  log('\n🎬 GameBuddies Webcam Kit - Asset Setup\n', 'blue');

  // Find the package root (where this script is located)
  const packageRoot = path.resolve(__dirname, '..');

  // Find the project root (where the user's package.json is)
  let projectRoot = process.cwd();

  // Check if we're being run from inside node_modules
  if (packageRoot.includes('node_modules')) {
    // We're installed as a package
    projectRoot = packageRoot.split('node_modules')[0];
  }

  const publicDir = path.join(projectRoot, 'public');
  const wasmSource = path.join(packageRoot, 'public', 'wasm');
  const modelsSource = path.join(packageRoot, 'public', 'models');
  const wasmDest = path.join(publicDir, 'wasm');
  const modelsDest = path.join(publicDir, 'models');

  // Check if public directory exists
  if (!fs.existsSync(publicDir)) {
    log('Creating public directory...', 'yellow');
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Copy WASM files
  if (fs.existsSync(wasmSource)) {
    log('\n📦 Copying WASM files...', 'blue');
    copyDir(wasmSource, wasmDest);
  } else {
    log('⚠ WASM source not found', 'yellow');
  }

  // Copy AI models
  if (fs.existsSync(modelsSource)) {
    log('\n📦 Copying AI models...', 'blue');
    copyDir(modelsSource, modelsDest);
  } else {
    log('⚠ Models source not found', 'yellow');
  }

  log('\n✅ Setup complete!\n', 'green');
  log('Assets copied to:', 'blue');
  log(`  • ${wasmDest}`, 'reset');
  log(`  • ${modelsDest}\n`, 'reset');
  log('You can now use virtual backgrounds and face avatars! 🎉\n', 'green');
}

main();
