const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ScanCustomElementsPlugin = require("./ScanCustomElementsPlugin");

const getStyleLoaders = cssOptions => [
  {
    loader: "css-loader",
    options: cssOptions
  },
  {
    loader: "postcss-loader",
    options: {
      ident: "postcss",
      plugins: () => [require("postcss-nested")(), require("postcss-preset-env")()]
    }
  }
];

const getImageLoaderOptions = () => ({
  exclude: /node_modules/,
  use: [
    {
      loader: "url-loader",
      options: {
        name: "assets/[name].[hash:8].[ext]",
        limit: 8192,
        esModule: false
      }
    }
  ]
});

module.exports = () => {
  const cwdDirname = process.cwd();
  const appRoot = path.join(cwdDirname, "..", "..");

  const packageJson = require(path.join(cwdDirname, "package.json"));
  const packageName = packageJson.name.split("/")[1];

  return {
    context: appRoot,
    entry: path.join(cwdDirname, "src", "index"),
    output: {
      path: path.join(cwdDirname, "dist")
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      symlinks: false
    },
    module: {
      rules: [
        {
          // Include ts, tsx, js, and jsx files.
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            rootMode: "upward"
          }
        },
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          issuer: {
            test: /\.(ts|js)x?$/
          },
          use: [
            {
              loader: "babel-loader",
              options: {
                rootMode: "upward"
              }
            },
            {
              loader: "@svgr/webpack",
              options: {
                babel: false
              }
            },
            ...getImageLoaderOptions().use
          ]
        },
        {
          test: /\.svg$/,
          issuer: {
            exclude: /\.(ts|js)x?$/
          },
          ...getImageLoaderOptions()
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          ...getImageLoaderOptions()
        },
        {
          test: /\.css$/,
          exclude: /\.(module|shadow)\.css$/,
          sideEffects: true,
          use: ["style-loader", ...getStyleLoaders()]
        },
        {
          test: /\.module\.css$/,
          use: [
            "style-loader",
            ...getStyleLoaders({
              modules: {
                localIdentName: "[local]--[hash:base64:8]"
              }
            })
          ]
        },
        {
          test: /\.shadow\.css$/,
          sideEffects: true,
          use: ["to-string-loader", ...getStyleLoaders()]
        },
        {
          test: /\.less$/,
          sideEffects: true,
          use: [
            "css-loader",
            {
              loader: "less-loader",
              options: {
                sourceMap: true,
                javascriptEnabled: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new ScanCustomElementsPlugin(packageName),
      new webpack.DllReferencePlugin({
        context: appRoot,
        // 解决该包在 `npm link` 下引用到错误的包路径的问题
        manifest: require(require.resolve("@tinytot/dll", {
          paths: [cwdDirname]
        }))
      })
    ]
  };
};
