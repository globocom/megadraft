function noop(module, filename) {
  var compiled = "module.exports = 'svg'";
  return module._compile(compiled, filename);
}

require.extensions[".svg"] = noop;
