/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from "react";
import classNames from "classnames";

export default class MediaMessage extends Component {
  render() {
    if (this.props.text) {
      const errorType = this.props.type ? this.props.type : "info";
      const messageClassName = classNames(
        `media__message media__message--${errorType}`
      );
      return (
        <div className={messageClassName}>
          <div className="media__message-text">{this.props.text}</div>
        </div>
      );
    } else {
      return null;
    }
  }
}
