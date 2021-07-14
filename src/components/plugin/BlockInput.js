/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import classNames from "classnames";

import icons from "../../icons";

function InputError(props) {
  const { error } = props;

  return error ? <div className="block__input__error-text">{error}</div> : null;
}

export default function BlockInput(props) {
  const { value, error, styles, readOnly, type, ...inputProps } = props;
  const { padding, text } = styles;

  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  let inputClassName = classNames({
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
          {...inputProps}
          value={value}
          type={type || "text"}
          className={inputClassName}
          onDrop={handleDrop}
          readOnly={readOnly}
        />
        <icons.EditIcon className="block__input__icon" />
      </div>
      <InputError error={error} />
    </div>
  );
}

BlockInput.defaultProps = {
  styles: {}
};
