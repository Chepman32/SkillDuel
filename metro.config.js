const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Fix for Supabase modules and SHA-1 issues
    unstable_enableSymlinks: false,
    unstable_enablePackageExports: false,
    sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json'],
    assetExts: [
      'glb',
      'gltf',
      'png',
      'jpg',
      'jpeg',
      'bmp',
      'gif',
      'webp',
      'svg',
    ],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resetCache: true,
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
