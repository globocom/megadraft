/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import Scroll from "react-scroll";
import { StickyContainer } from "react-sticky";

import ReactMarkdown from "react-markdown";
import CustomEntities from "../../docs/custom_entities.md";
import Customization from "../../docs/customization.md";
import Overview from "../../docs/overview.md";
import Plugins from "../../docs/plugins.md";
import Serializing from "../../docs/serializing.md";
import MenuBar from "./menubar";

import { highlightCode } from "./highlightCode";

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
    scroll.scrollToTop({ duration: 0 });
  }

  componentDidUpdate() {
    highlightCode(this);
    scroll.scrollToTop();
  }

  render() {
    const { match } = this.props;
    const { doc } = match.params;
    return (
      <div>
        <StickyContainer>
          <MenuBar showLeft={true} />
          <div className="container--light">
            <div className="page__content docs">
              <div className="docs__content">
                <ReactMarkdown source={DOCS[doc]} />
              </div>
            </div>
          </div>
        </StickyContainer>
      </div>
    );
  }
}
