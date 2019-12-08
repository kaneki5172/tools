const babel = require("rollup-plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const json = require("@rollup/plugin-json");
const path = require("path");
const packageJson = require(path.join(process.cwd(), "package.json"));

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
  external: Object.keys(packageJson.peerDependencies || {}),
  plugins: [
    ...plugins,
    resolve({
      browser: true,
      extensions: [".mjs", ".js", ".jsx", ".json", ".ts", ".tsx"]
    }),
    json(),
    commonjs(),
    babel({
      configFile: "../../babel.config.js",
      extensions: ["js", "jsx", "ts", "tsx"]
    })
  ]
});
