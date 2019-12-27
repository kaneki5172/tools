const commonFactory = require("./webpack.common");
const merge = require("webpack-merge");
module.exports = () => {
  return merge(commonFactory(), {
    mode: "production",
    devtool: "source-map",
    output: {
      filename: "index.[contenthash].js"
    }
  });
};
