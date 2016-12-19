const merge = require("merge");
const path = require("path");

const defaultConfig = {
  entry: [
    "./website/index.js"
  ],
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "./website/bundle.js"
  },
  devtool: "source-map",
  devServer: {
    inline: true,
    contentBase: "./"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    fallback: path.join(__dirname, "node_modules")
  },
  resolveLoader: {
    root: path.join(__dirname, "node_modules")
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.md$/,
        loader: "raw"
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  }
};

function makeConfig (extra) {
  const config = merge.recursive(true, defaultConfig, extra || {});

  return config;
}

module.exports = makeConfig;
