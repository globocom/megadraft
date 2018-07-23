/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from "react";

export default class BlockWrapper extends Component {
  render() {
    return (
      <div className="block__hover">
        <div className="block__wrapper">{this.props.children}</div>
      </div>
    );
  }
}
