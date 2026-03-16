#!/usr/bin/env node
/**
 * LEXA Frontend Server Launcher
 * 
 * This script is the entrypoint for the Next.js standalone server.
 * It ensures all required files are in place before starting.
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(f => 
      copyRecursiveSync(path.join(src, f), path.join(dest, f))
    );
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

console.log('[LEXA] Frontend server starting...');

// Check if next-server-files exists (deployment mode)
const nextServerFiles = path.join(__dirname, 'next-server-files');
const nextDir = path.join(__dirname, '.next');

if (fs.existsSync(nextServerFiles)) {
  console.log('[LEXA] Deployment mode - copying server files...');
  
  // Ensure .next directory exists
  fs.mkdirSync(nextDir, { recursive: true });
  
  // Copy all files from next-server-files to .next
  const files = fs.readdirSync(nextServerFiles);
  files.forEach(file => {
    const src = path.join(nextServerFiles, file);
    const dest = path.join(nextDir, file);
    
    // Skip static if it already exists
    if (file === 'static' && fs.existsSync(dest)) {
      console.log(`[LEXA] Skipping ${file} (already exists)`);
      return;
    }
    
    console.log(`[LEXA] Copying ${file}...`);
    copyRecursiveSync(src, dest);
  });
  
  console.log('[LEXA] Server files copied successfully');
}

// Ensure font-manifest.json exists
const fontManifest = path.join(nextDir, 'server', 'font-manifest.json');
if (!fs.existsSync(fontManifest)) {
  console.log('[LEXA] Creating font-manifest.json...');
  fs.mkdirSync(path.dirname(fontManifest), { recursive: true });
  fs.writeFileSync(fontManifest, '[]');
}

// Verify BUILD_ID exists
const buildId = path.join(nextDir, 'BUILD_ID');
if (!fs.existsSync(buildId)) {
  console.error('[LEXA] ERROR: BUILD_ID not found!');
  console.log('[LEXA] .next contents:', fs.existsSync(nextDir) ? fs.readdirSync(nextDir).join(', ') : 'NOT EXISTS');
  process.exit(1);
}

console.log('[LEXA] BUILD_ID:', fs.readFileSync(buildId, 'utf8').trim());
console.log('[LEXA] .next contents:', fs.readdirSync(nextDir).join(', '));

// Now load and run the original server
console.log('[LEXA] Starting Next.js server...');

// Set environment variables
process.env.PORT = process.env.PORT || '3000';
process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';

// Load the original server
require('./server.original.js');
