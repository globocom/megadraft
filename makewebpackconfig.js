const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const defaultConfig = {
  entry: [
    "./website/index.js"
  ],
  output: {
    path: __dirname + "/website/",
    publicPath: "/",
    filename: "./bundle.js"
  },
  devtool: "source-map",
  resolve: {
    modules: [
      path.join(__dirname, "src"),
      "node_modules"
    ]
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.md$/,
        loader: "raw-loader"
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      }
    ]
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      filename: __dirname + "/website/index.html",
      template: __dirname + "/website/index_tpl.html",
    }),
  ]
};

function makeConfig (extra) {
  const config = Object.assign(true, defaultConfig, extra || {});

  return config;
}

module.exports = makeConfig;
