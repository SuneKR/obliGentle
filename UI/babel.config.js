module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            asserts: './assets',
            config: './config',
            components: './components',
            controllers: './controllers',
            designs: './designs',          
            screens: './screens'
          },
        },
      ],
    ],
  };
};
