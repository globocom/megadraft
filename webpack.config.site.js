const webpack = require("webpack");
const makeConfig = require("./makewebpackconfig.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = makeConfig({
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      filename: __dirname + "/website/index.html",
      template: __dirname + "/website/index_tpl.html"
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  output: {
    path: __dirname,
    filename: "./bundle.[chunkhash:8].js"
  },
  optimization: {
    minimize: true
  }
});
