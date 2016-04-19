/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";
import {Entity} from "draft-js";

import LinkStyles from "../styles/components/LinkStyles";

export default @Radium
class Link extends Component {
  render() {
    const {url} = Entity.get(this.props.entityKey).getData();
    return (
      <a style={LinkStyles} href={url} title={url}>
        {this.props.children}
      </a>
    );
  }
}
