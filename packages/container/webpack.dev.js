const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  output: {
    filename: "[name].js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8088,
    hot: true,
    historyApiFallback: {
      disableDotRule: true
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
