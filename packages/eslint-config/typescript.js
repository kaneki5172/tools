module.exports = {
  extends: ["alloy", "alloy/typescript"],
  env: {
    es6: true,
    browser: true,
    node: true
  },
  rules: {
    "no-console": "error",
    "max-params": ["error", 4],
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-parameter-properties": "off"
  }
};
