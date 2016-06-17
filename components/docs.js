/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

import Overview from "../../docs/overview.md";
import Plugins from "../../docs/plugins.md";
import Serializing from "../../docs/serializing.md";
import ReactMarkdown from "react-markdown";

import {highlightCode} from "./highlightCode";


const DOCS = {
  overview: Overview,
  plugins: Plugins,
  "saving-loading": Serializing
};


export default class Docs extends React.Component {

  componentDidMount() {
    highlightCode(this);
  }

  componentDidUpdate() {
    highlightCode(this);
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
