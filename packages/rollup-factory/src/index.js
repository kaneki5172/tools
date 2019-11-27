const babel = require("rollup-plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");

module.exports.rollupFactory = ({ umdName, plugins = [] }) => ({
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.bundle.js",
      format: "umd",
      name: umdName,
      sourcemap: true
    },
    {
      file: "dist/index.esm.js",
      format: "es",
      sourcemap: true
    }
  ],
  plugins: [
    ...plugins,
    resolve({
      browser: true,
      extensions: [".mjs", ".js", ".jsx", ".json", ".ts", ".tsx"]
    }),
    commonjs(),
    babel({
      configFile: "../../babel.config.js",
      extensions: ["js", "jsx", "ts", "tsx"]
    })
  ]
});
