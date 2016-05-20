/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from "react-dom";

import Overview from "../../docs/overview.md";
import ReactMarkdown from "react-markdown";


const DOCS = {
  overview: Overview
};

export default class Docs extends React.Component {

  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode () {
    const domNode = ReactDOM.findDOMNode(this);
    const nodes = domNode.querySelectorAll('pre code');
    if (nodes.length > 0) {
      for (let i = 0; i < nodes.length; i=i+1) {
        hljs.highlightBlock(nodes[i]);
      }
    }
  }

  render() {
    const {doc} = this.props.params;
    return (
      <div className="content docs">
        <ReactMarkdown source={DOCS[doc]} />
      </div>
    );
  }
}
