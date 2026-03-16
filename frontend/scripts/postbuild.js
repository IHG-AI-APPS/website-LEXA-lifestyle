/**
 * Postbuild script for Next.js standalone deployment
 * 
 * Problem: Emergent deployment uses `cp -r .next/standalone/*` which doesn't copy
 * hidden directories (like .next). Then it creates a NEW .next and only copies static.
 * 
 * Solution: 
 * 1. Copy the standalone .next contents to a non-hidden directory (next-server-files)
 * 2. Replace server.js with our launcher that copies files before starting
 */

const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

const standaloneNextDir = '.next/standalone/.next';
const standaloneDir = '.next/standalone';
const nextServerDir = '.next/standalone/next-server-files';

console.log('[POSTBUILD] Starting postbuild process...');

// Check if standalone build exists
if (!fs.existsSync(standaloneNextDir)) {
  console.log('[POSTBUILD] No standalone build found, skipping...');
  process.exit(0);
}

// Step 1: Copy .next from standalone to next-server-files (visible, will be copied)
console.log('[POSTBUILD] Copying standalone/.next to standalone/next-server-files...');

if (fs.existsSync(nextServerDir)) {
  fs.rmSync(nextServerDir, { recursive: true });
}

copyRecursiveSync(standaloneNextDir, nextServerDir);

// Step 2: Replace server.js with our launcher
const originalServer = path.join(standaloneDir, 'server.js');
const renamedServer = path.join(standaloneDir, 'server.original.js');
const launcherSrc = 'server-launcher.js';
const launcherDest = path.join(standaloneDir, 'server.js');

if (fs.existsSync(originalServer)) {
  console.log('[POSTBUILD] Renaming server.js to server.original.js...');
  fs.renameSync(originalServer, renamedServer);
  
  console.log('[POSTBUILD] Copying server-launcher.js as server.js...');
  fs.copyFileSync(launcherSrc, launcherDest);
}

// Step 3: Copy .env to env-file
const envSrc = '.next/standalone/.env';
const envDest = '.next/standalone/env-file';
if (fs.existsSync(envSrc)) {
  console.log('[POSTBUILD] Copying .env to env-file...');
  fs.copyFileSync(envSrc, envDest);
}

// Step 4: Ensure font-manifest.json exists
const fontManifest = '.next/server/font-manifest.json';
const fontManifestStandalone = nextServerDir + '/server/font-manifest.json';

if (!fs.existsSync(fontManifest)) {
  console.log('[POSTBUILD] Creating font-manifest.json in root...');
  fs.mkdirSync('.next/server', { recursive: true });
  fs.writeFileSync(fontManifest, '[]');
}

if (!fs.existsSync(fontManifestStandalone)) {
  console.log('[POSTBUILD] Creating font-manifest.json in standalone...');
  fs.mkdirSync(path.dirname(fontManifestStandalone), { recursive: true });
  fs.writeFileSync(fontManifestStandalone, '[]');
}

console.log('[POSTBUILD] Done!');
console.log('[POSTBUILD] Standalone contents:', fs.readdirSync(standaloneDir).join(', '));
