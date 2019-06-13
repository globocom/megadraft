/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

export function highlightCode() {
  const nodes = document.querySelectorAll("pre code");
  if (nodes.length > 0) {
    for (let i = 0; i < nodes.length; i = i + 1) {
      /* global hljs */
      hljs.highlightBlock(nodes[i]);
    }
  }
}
