var webpack = require("webpack");
var merge = require("merge");


const defaultConfig = {
  entry: [
    "./website/index.js"
  ],
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "website/bundle.js"
  },
  devtool: "source-map",
  devServer: {
    inline: true,
    contentBase: "./website"
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
        loader: 'json'
      }
    ]
  }
};

function makeConfig (extra) {
  var config = merge(defaultConfig, extra || {});

  return config;
}

module.exports = makeConfig;
