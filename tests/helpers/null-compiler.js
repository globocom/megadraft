function noop() {
  return null;
}

require.extensions[".svg"] = noop;
