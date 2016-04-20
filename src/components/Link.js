/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import {Entity} from "draft-js";

import React, {Component} from "react";

export default class Link extends Component {
  _onClick() {

  }
  render() {
    const style = {
      color: "#3192e7",
      textDecoration: "none",
      cursor: "pointer"
    };
    const {url} = Entity.get(this.props.entityKey).getData();
    return (
      <a
        href={url}
        title={url}
        style={style}>
        {this.props.children}
      </a>
    );
  }
}
