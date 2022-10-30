const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const defaultConfig = {
  mode: process.env.NODE_ENV || "production",
  entry: path.resolve("./website/index.js"),
  output: {
    path: path.resolve(__dirname, "website"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devtool: "source-map",
  resolve: {
    modules: [path.resolve(__dirname, "src"), path.resolve("./node_modules")],
    alias: {
      megadraft: path.resolve(__dirname, "src/Megadraft.js")
    }
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.md$/,
        loader: "raw-loader"
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            minimize: {
              caseSensitive: false
            }
          }
        }
      }
    ]
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      filename: __dirname + "/website/index.html",
      template: __dirname + "/website/index_tpl.html"
    })
  ]
};

function makeConfig(extra) {
  const config = Object.assign(true, defaultConfig, extra || {});

  return config;
}

module.exports = makeConfig;
