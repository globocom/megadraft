/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from "react";
import classNames from "classnames";

export default class BlockContent extends Component {
  render() {
    let className = classNames("block__content", {
      [`block__content--${this.props.className}`]: this.props.className
    });

    return <div className={className}>{this.props.children}</div>;
  }
}
