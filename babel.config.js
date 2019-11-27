module.exports = {
  babelrcRoots: [
    // Keep the root as a root
    ".",
    // Also consider monorepo packages "root" and load their .babelrc files.
    "./packages/*"
  ],
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        useBuiltIns: "usage",
        corejs: {
          version: 3
        }
      }
    ],
    [
      "@babel/preset-typescript"
    ]
  ]
}