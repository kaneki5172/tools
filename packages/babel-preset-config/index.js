// Ref https://babeljs.io/docs/en/presets#creating-a-preset
const presetEnv = require("@babel/preset-env");
const presetTypescript = require("@babel/preset-typescript");

module.exports = () => ({
  presets: [
    [
      presetEnv,
      {
        modules: false,
        useBuiltIns: "usage",
        corejs: {
          version: 3
        }
      }
    ],
    [presetTypescript]
  ]
});
