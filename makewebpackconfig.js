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
      }
    ]
  }
};

function makeConfig (extra) {
  const config = Object.assign(true, defaultConfig, extra || {});

  return config;
}

module.exports = makeConfig;
