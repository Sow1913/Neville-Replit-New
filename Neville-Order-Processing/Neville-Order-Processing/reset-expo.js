
// Script to reset Expo caches and temp files
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning Expo cache and temporary files...');

try {
  // Clean various caches
  console.log('Clearing watchman watches...');
  try { execSync('watchman watch-del-all', { stdio: 'inherit' }); } catch (e) { console.log('Watchman not available, skipping...'); }
  
  console.log('Clearing Metro cache...');
  try { 
    const tempDir = path.join(__dirname, 'node_modules', '.cache');
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  } catch (e) { console.log('Error clearing node_modules/.cache:', e.message); }

  console.log('Clearing Expo cache...');
  try { execSync('npx expo start --clear-cache --no-dev', { stdio: 'inherit' }); } catch (e) { /* Ignore errors here */ }

  console.log('✅ Clean completed successfully!');
  console.log('Run "npm run start-mobile" to restart your app with a fresh environment.');
} catch (error) {
  console.error('❌ Error during cleanup:', error.message);
}
