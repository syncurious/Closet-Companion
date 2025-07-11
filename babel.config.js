module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@': './src', // This means '@' will refer to the 'src' folder
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
