/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

const context = require.context("./tests", true, /^.*\_test.js$/);
context.keys().forEach(context);
