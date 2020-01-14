module.exports = {
  extends: ["./typescript.js", "alloy/react"],
  plugins: ["react-hooks"],
  env: {
    es6: true,
    browser: true,
    node: false
  },
  rules: {
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
  }
};
