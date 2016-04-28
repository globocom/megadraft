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
        test: /\.css$/,
        loaders: [
          "style",
          "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
        ]
      },
      {
        test: /\.md$/,
        loader: "html!markdown"
      }
    ]
  }
};

function makeConfig (extra) {
  var config = merge(defaultConfig, extra || {});

  return config;
}

module.exports = makeConfig;
