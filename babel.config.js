module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-react'],
    plugins: ["nativewind/babel", ["module:react-native-dotenv", {
      moduleName: "@env",
      path: ".local.env"
    }]],
  };
};
