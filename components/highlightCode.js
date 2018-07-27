/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import ReactDOM from "react-dom";

export function highlightCode(element) {
  const domNode = ReactDOM.findDOMNode(element);
  const nodes = domNode.querySelectorAll("pre code");
  if (nodes.length > 0) {
    for (let i = 0; i < nodes.length; i = i + 1) {
      /* global hljs */
      hljs.highlightBlock(nodes[i]);
    }
  }
}
