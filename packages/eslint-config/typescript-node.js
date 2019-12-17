module.exports = {
  extends: ["./typescript.js"],
  env: {
    node: true,
    browser: false
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-require-imports": "off"
  }
};
