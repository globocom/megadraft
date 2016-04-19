/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

function dummySvg(module, filename) {
  var compiled = "module.exports = 'svg'";
  return module._compile(compiled, filename);
}

function dummyScss (module, filename) {
  var classname = filename.split("/").pop().replace(".scss", "");
  var compiled = "module.exports = '" + classname + "'";
  return module._compile(compiled, filename);
}

require.extensions[".svg"] = dummySvg;
require.extensions[".scss"] = dummyScss;
