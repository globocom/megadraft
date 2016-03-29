/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

var path = require('path');

var webpack = require('webpack');

var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};
webpackConfig.module.postLoaders = [{
  test: /\.js$/,
  include: path.resolve('src'),
  loader: 'istanbul-instrumenter'
}];


module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],

    singleRun: true,

    autoWatch: false,

    frameworks: ['es6-shim', 'mocha'],

    files: ['tests.webpack.js'],

    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },

    reporters: ['mocha', 'coverage'],

    webpack: webpackConfig,

    webpackServer: {
      noInfo: true
    },

    coverageReporter: {
      reporters: [
        {type: 'html', dir: 'coverage/'},
        {type: 'text', dir: 'coverage/'}
      ]
    },

    phantomjsLauncher: {
      exitOnResourceError: true
    }
  });
};
