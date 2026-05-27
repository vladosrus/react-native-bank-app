module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@/components': './src/components',
          '@/screens': './src/screens',
          '@/services': './src/services',
          '@/store': './src/store',
          '@/hooks': './src/hooks',
          '@/utils': './src/utils',
          '@/constants': './src/constants',
          '@/navigation': './src/navigation',
        },
      },
    ],
  ],
};
