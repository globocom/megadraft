var webpack = require("webpack");

module.exports = {
  entry: [
    './website/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'website/bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]|css-saas|'
    }, {
      test: /\.md$/,
      loader: "html!markdown"
    }]
  }
};
