module.exports = {
  presets: ['babel-preset-expo'],  // Si usas Expo, o 'metro-react-native-babel-preset' si usas React Native puro.
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],  // Define la raíz de tu código (generalmente la carpeta 'src')
        alias: {
          '@': './src',  // Crea el alias '@' para acceder a la carpeta 'src'
        },
      },
    ],
  ],
};
