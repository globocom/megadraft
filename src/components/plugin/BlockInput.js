/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import classNames from "classnames";

import icons from "../../icons";

export default function BlockInput(props) {
  function renderError(error) {
    if (!error) {
      return;
    }
    return <div className="block__input__error-text">{error}</div>;
  }

  function _handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  let { value, error, styles: { padding, text } = {}, readOnly } = props;

  let className = classNames({
    block__input: true,
    "block__input--empty": !value,
    "block__input--error": error,
    [`block__input--${padding}-padding`]: padding,
    [`block__input--${text}-text`]: text,
    "block__input--readonly": readOnly
  });

  return (
    <div className="block__input__row">
      <div className="block__input__wrapper">
        <input
          {...props}
          value={value}
          type={props.type || "text"}
          className={className}
          onDrop={_handleDrop}
          readOnly={readOnly}
        />
        <icons.EditIcon className="block__input__icon" />
      </div>
      {renderError(error)}
    </div>
  );
}
