const { defineConfig } = require("cypress");

// cypress/config.js
module.exports = {
  ...(on, config) => {
    config.viewportHeight = 880;
    config.viewportWidth = 1280;
    config.pluginsFile = false;

    // Você pode adicionar outras configurações aqui, se necessário

    return config;
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
