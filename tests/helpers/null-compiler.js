/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

function noop(module, filename) {
  var compiled = "module.exports = 'svg'";
  return module._compile(compiled, filename);
}

require.extensions[".svg"] = noop;
