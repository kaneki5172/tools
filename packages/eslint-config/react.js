module.exports = {
  extends: ["./typescript.js", "alloy/react"],
  plugins: ["react-hooks"],
  env: {
    es6: true,
    browser: true,
    node: false
  }
};
