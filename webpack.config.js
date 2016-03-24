var commonConfig = require("./webpack.common.js");

module.exports = {
  devtool: 'source-map',
  entry: [
    './website/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'website/bundle.js'
  },
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
    },
    commonConfig.svgo.loader]
  },
  svgoConfig: commonConfig.svgo.config,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: './website'
  }
};
