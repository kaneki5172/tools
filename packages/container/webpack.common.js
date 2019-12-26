const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const dllManifest = require("@tinytot/dll");
const context = path.join(__dirname, "..", "..");

module.exports = {
  context,
  entry: {
    polyfill: path.join(__dirname, "src", "polyfill"),
    main: path.join(__dirname, "src", "index")
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    symlinks: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "网站",
      template: path.join(__dirname, "src", "index.ejs")
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DllReferencePlugin({
      context,
      manifest: dllManifest
    }),
    new AddAssetHtmlPlugin({
      filepath: require.resolve("@tinytot/dll/dist/dll.js"),
      hash: true
    })
  ]
};
