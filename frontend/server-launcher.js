#!/usr/bin/env node
/**
 * LEXA Frontend Server Launcher
 * This wraps the Next.js standalone server.js to ensure all files are in place
 */

const fs = require('fs');
const path = require('path');

console.log('[LEXA] Server launcher starting...');
console.log('[LEXA] Working directory:', process.cwd());
console.log('[LEXA] __dirname:', __dirname);

// Helper to copy files recursively
function copyDir(src, dest) {
  try {
    if (!fs.existsSync(src)) return false;
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
    return true;
  } catch (e) {
    console.error('[LEXA] Copy error:', e.message);
    return false;
  }
}

// Check for next-server-files (created by postbuild, copied by deployment)
const nextServerFiles = path.join(__dirname, 'next-server-files');
const nextDir = path.join(__dirname, '.next');

if (fs.existsSync(nextServerFiles)) {
  console.log('[LEXA] Found next-server-files, setting up .next directory...');
  
  // Ensure .next exists
  fs.mkdirSync(nextDir, { recursive: true });
  
  // Copy everything from next-server-files to .next
  const files = fs.readdirSync(nextServerFiles);
  for (const file of files) {
    const src = path.join(nextServerFiles, file);
    const dest = path.join(nextDir, file);
    
    // Skip static if already exists (deployed separately)
    if (file === 'static' && fs.existsSync(dest)) {
      console.log('[LEXA] Skipping static (exists)');
      continue;
    }
    
    const stats = fs.statSync(src);
    if (stats.isDirectory()) {
      console.log('[LEXA] Copying dir:', file);
      copyDir(src, dest);
    } else {
      console.log('[LEXA] Copying file:', file);
      fs.copyFileSync(src, dest);
    }
  }
} else {
  console.log('[LEXA] No next-server-files found, using existing .next');
}

// Ensure font-manifest.json exists (CRITICAL for Next.js)
const serverDir = path.join(nextDir, 'server');
const fontManifest = path.join(serverDir, 'font-manifest.json');
if (!fs.existsSync(fontManifest)) {
  console.log('[LEXA] Creating font-manifest.json...');
  fs.mkdirSync(serverDir, { recursive: true });
  fs.writeFileSync(fontManifest, '[]');
}

// Check BUILD_ID
const buildId = path.join(nextDir, 'BUILD_ID');
if (fs.existsSync(buildId)) {
  console.log('[LEXA] BUILD_ID:', fs.readFileSync(buildId, 'utf8').trim());
} else {
  console.error('[LEXA] ERROR: No BUILD_ID found!');
  console.log('[LEXA] .next contents:', fs.existsSync(nextDir) ? fs.readdirSync(nextDir) : 'DIR NOT EXISTS');
  process.exit(1);
}

// List .next contents
console.log('[LEXA] .next contents:', fs.readdirSync(nextDir).join(', '));

// Set env vars for the server
process.env.PORT = process.env.PORT || '3000';
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';

console.log('[LEXA] Starting server on port', process.env.PORT);

// Load the original server
try {
  require('./server.original.js');
} catch (e) {
  console.error('[LEXA] Failed to load server.original.js:', e.message);
  console.error(e.stack);
  process.exit(1);
}
