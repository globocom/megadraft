/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from "react";

export default class BlockControls extends Component {
  render() {
    return <div className="block__controls">{this.props.children}</div>;
  }
}
