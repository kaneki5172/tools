const path = require("path");
const webpack = require("webpack");
const isProd = process.env.NODE_ENV === "production";
const packageJson = require("./package.json");

const dist = path.join(__dirname, "dist");

module.exports = {
  devtool: "source-map",
  mode: isProd ? "production" : "development",
  resolve: {
    extensions: [".js", ".ts"],
    symlinks: false
  },
  entry: {
    dll: Object.keys(packageJson.dependencies)
  },
  output: {
    path: dist,
    filename: "[name].js",
    library: "[name]"
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(dist, "[name]-manifest.json"),
      name: "[name]"
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
};
