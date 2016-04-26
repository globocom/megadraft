var webpack = require("webpack");
var merge = require("merge");

const applyCurrentColorPlugin = {
  type: "perItem",
  fn: function (item, params) {
    if (item.attrs && item.attrs.fill) {
      if (item.attrs.fill.value != "none") {
        item.attrs.fill.value = "currentColor";
      }
      else {
        item.removeAttr("fill");
      }
    }
  }
};


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
        test: /\.s?css$/,
        loaders: [
          "style",
          "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
          "sass"
        ]
      },
      {
        test: /\.md$/,
        loader: "html!markdown"
      },
      {
        test: /\.svg$/,
        loaders: [
          "babel",
          "react-svg",
          "svgo-loader?useConfig=svgoConfig"
        ]
      }
    ]
  },
  svgoConfig: {
    plugins: [
      {removeTitle: true},
      {transformsWithOnePath: true},
      {applyCurrentColorPlugin: applyCurrentColorPlugin}
    ]
  }
};

function makeConfig (extra) {
  var config = merge(defaultConfig, extra || {});

  return config;
}

module.exports = makeConfig;
