/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import classNames from "classnames";

export default function MediaMessage(props) {
  if (props.text) {
    const errorType = props.type ? props.type : "info";
    const messageClassName = classNames(
      `media__message media__message--${errorType}`
    );
    return (
      <div className={messageClassName}>
        <div className="media__message-text">{props.text}</div>
      </div>
    );
  }

  return null;
}
