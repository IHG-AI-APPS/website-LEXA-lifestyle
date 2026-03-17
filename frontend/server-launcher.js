#!/usr/bin/env node
/**
 * LEXA Frontend Server Launcher
 * Ensures all Next.js files are in place before starting
 */

// Force sync console output
const log = (msg) => {
  process.stdout.write('[LEXA] ' + msg + '\n');
};

log('Server launcher v2 starting...');
log('CWD: ' + process.cwd());
log('DIR: ' + __dirname);

const fs = require('fs');
const path = require('path');

// Copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return false;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    entry.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
  }
  return true;
}

const nextServerFiles = path.join(__dirname, 'next-server-files');
const nextDir = path.join(__dirname, '.next');

// Copy server files if needed
if (fs.existsSync(nextServerFiles)) {
  log('Found next-server-files, copying...');
  fs.mkdirSync(nextDir, { recursive: true });
  
  for (const file of fs.readdirSync(nextServerFiles)) {
    const src = path.join(nextServerFiles, file);
    const dest = path.join(nextDir, file);
    
    if (file === 'static' && fs.existsSync(dest)) continue;
    
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
      copyDir(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
    log('Copied: ' + file);
  }
}

// Ensure font-manifest.json
const fontManifest = path.join(nextDir, 'server', 'font-manifest.json');
if (!fs.existsSync(fontManifest)) {
  log('Creating font-manifest.json');
  fs.mkdirSync(path.dirname(fontManifest), { recursive: true });
  fs.writeFileSync(fontManifest, '[]');
}

// Check BUILD_ID
const buildId = path.join(nextDir, 'BUILD_ID');
if (!fs.existsSync(buildId)) {
  log('ERROR: BUILD_ID not found!');
  log('.next contents: ' + (fs.existsSync(nextDir) ? fs.readdirSync(nextDir).join(', ') : 'DIR NOT FOUND'));
  process.exit(1);
}

log('BUILD_ID: ' + fs.readFileSync(buildId, 'utf8').trim());
log('.next ready: ' + fs.readdirSync(nextDir).join(', '));

// Set environment
process.env.PORT = process.env.PORT || '3000';
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';

log('Starting Next.js on port ' + process.env.PORT);

// Load and run the original server
require('./server.original.js');
