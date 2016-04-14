var webpack = require("webpack");
var commonConfig = require("./webpack.common.js");

module.exports = {
  cache: true,
  context: __dirname + "/src",
  entry: "./megadraft.js",
  output: {
    path: "./dist",
    publicPath: "/dist/",
    filename: "Megadraft.js",
    library: "megadraft",
    libraryTarget: "umd"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["babel"],
        exclude: ["node_modules"]
      },
      commonConfig.svgo.loader
    ]
  },
  svgoConfig: commonConfig.svgo.config,

  externals: {
      "react": "React",
      "react-dom": "ReactDOM"
  }
};
