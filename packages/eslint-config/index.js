module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  env: {
    es6: true,
    browser: true,
    node: true
  },
  rules: {
    "no-console": "off",
    "@typescript-eslint/explicit-function-return-type": ["warn", { allowExpressions: true }]
  }
};
