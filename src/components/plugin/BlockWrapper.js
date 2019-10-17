/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from "react";

export default class BlockWrapper extends Component {
  render() {
    const { style, ...propsForward } = this.props.propsForward;
    return (
      <div className="block__hover" {...propsForward}>
        <div className="block__wrapper" style={style}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
