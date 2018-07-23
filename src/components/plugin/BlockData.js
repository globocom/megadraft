/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from "react";

export default class BlockData extends Component {
  render() {
    return <div className="block__data">{this.props.children}</div>;
  }
}
