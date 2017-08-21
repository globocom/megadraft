/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import Scroll from "react-scroll";

import Overview from "../../docs/overview.md";
import Customization from "../../docs/customization.md";
import Plugins from "../../docs/plugins.md";
import Serializing from "../../docs/serializing.md";
import CustomEntities from "../../docs/custom_entities.md";
import ReactMarkdown from "react-markdown";

import {highlightCode} from "./highlightCode";

const scroll = Scroll.animateScroll;

const DOCS = {
  overview: Overview,
  customization: Customization,
  plugins: Plugins,
  "saving-loading": Serializing,
  "custom-entities": CustomEntities
};


export default class Docs extends React.Component {

  componentDidMount() {
    highlightCode(this);
    scroll.scrollToTop({duration: 0});
  }

  componentDidUpdate() {
    highlightCode(this);
    scroll.scrollToTop();
  }

  render() {
    const {doc} = this.props.params;
    return (
      <div className="container--light">
        <div className="page__content docs">
          <ReactMarkdown source={DOCS[doc]} />
        </div>
      </div>
    );
  }
}
