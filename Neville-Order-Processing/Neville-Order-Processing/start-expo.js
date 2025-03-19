
// Custom Expo start script with improved network settings
const { execSync } = require('child_process');

console.log('🚀 Starting Expo with enhanced network settings...');

try {
  // Run Expo with specific settings to improve device connectivity
  execSync('npx expo start --clear --web', {
    stdio: 'inherit',
    env: {
      ...process.env,
      EXPO_PACKAGER_PROXY_URL: `https://${process.env.REPLIT_DEV_DOMAIN}`,
      REACT_NATIVE_PACKAGER_HOSTNAME: process.env.REPLIT_DEV_DOMAIN
    }
  });
} catch (error) {
  console.error('❌ Error starting Expo:', error.message);
}
