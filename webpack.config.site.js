const webpack = require("webpack");
const makeConfig = require("./makewebpackconfig.js");

module.exports = makeConfig({
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  output: {
    filename: "./bundle.js"
  }
});
