/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import classNames from "classnames";

const MediaMessage = ({ text, type }) => {
  if (text) {
    const errorType = type || "info";
    const messageClassName = classNames(
      `media__message media__message--${errorType}`
    );
    return (
      <div className={messageClassName}>
        <div className="media__message-text">{text}</div>
      </div>
    );
  }

  return null;
};

export default MediaMessage;
