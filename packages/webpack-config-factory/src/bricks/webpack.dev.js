const commonFactory = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = () => {
  return merge(commonFactory(), {
    mode: "development",
    devtool: "source-map",
    output: {
      filename: "index.bundle.js"
    }
  });
};
