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
  svgo: {
    loader: {
      test: /\.svg$/,
      loaders: ['babel', 'react-svg', 'svgo-loader?useConfig=svgoConfig']
    },
    config: {
      plugins: [
        {removeTitle: true},
        {transformsWithOnePath: true},
        {applyCurrentColorPlugin: applyCurrentColorPlugin}
      ]
    }
  }
};
