/**
 * Prestart script - runs before the server starts
 * 
 * In deployment, this copies next-server-files to .next
 * so the server has all required files
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

console.log('[PRESTART] Running prestart checks...');

const nextServerFiles = 'next-server-files';
const nextDir = '.next';

// If next-server-files exists (from deployment), copy to .next
if (fs.existsSync(nextServerFiles)) {
  console.log('[PRESTART] Found next-server-files, copying to .next...');
  
  // Copy all files from next-server-files to .next
  const files = fs.readdirSync(nextServerFiles);
  files.forEach(file => {
    const src = path.join(nextServerFiles, file);
    const dest = path.join(nextDir, file);
    
    // Don't overwrite static (already there from deployment)
    if (file === 'static' && fs.existsSync(path.join(nextDir, 'static'))) {
      console.log(`[PRESTART] Skipping ${file} (already exists)`);
      return;
    }
    
    console.log(`[PRESTART] Copying ${file}...`);
    copyRecursiveSync(src, dest);
  });
}

// Copy env-file to .env if it exists
const envFile = 'env-file';
if (fs.existsSync(envFile) && !fs.existsSync('.env')) {
  console.log('[PRESTART] Copying env-file to .env...');
  fs.copyFileSync(envFile, '.env');
}

// Ensure font-manifest.json exists
const fontManifest = '.next/server/font-manifest.json';
if (!fs.existsSync(fontManifest)) {
  console.log('[PRESTART] Creating font-manifest.json...');
  fs.mkdirSync('.next/server', { recursive: true });
  fs.writeFileSync(fontManifest, '[]');
}

// Verify BUILD_ID exists
const buildId = '.next/BUILD_ID';
if (!fs.existsSync(buildId)) {
  console.error('[PRESTART] ERROR: BUILD_ID not found!');
  console.log('[PRESTART] .next contents:', fs.existsSync(nextDir) ? fs.readdirSync(nextDir).join(', ') : 'NOT EXISTS');
  process.exit(1);
}

console.log('[PRESTART] All checks passed!');
console.log('[PRESTART] .next contents:', fs.readdirSync(nextDir).join(', '));
