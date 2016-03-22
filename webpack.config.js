const applyCurrentColorPlugin = {
    type: 'perItem',
    fn: function (item, params) {
        if (item.attrs && item.attrs.fill) {
            if (item.attrs.fill.value != 'none') {
                item.attrs.fill.value = 'currentColor';
            }
            else {
                item.removeAttr('fill');
            }
        }
    }
};

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
    }, {
      test: /\.svg$/,
      loaders: ['babel', 'react-svg', 'svgo-loader?useConfig=svgoConfig']
    }]
  },
  svgoConfig: {
    plugins: [
      {removeTitle: true},
      {transformsWithOnePath: true},
      {applyCurrentColorPlugin: applyCurrentColorPlugin}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    contentBase: './website'
  }
};
