/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";

export default function DropdownItem(props) {
  const Icon = props.item.icon;
  const className = classNames("dropdown__item ", props.className);

  return (
    <button
      className={className}
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseDown}
      {...props.attr}
      type="button"
    >
      <Icon className="dropdown__item__icon" />
      <span className="dropdown__item__text">{props.item.label}</span>

      {props.children}
    </button>
  );
}

DropdownItem.propTypes = {
  item: PropTypes.object.isRequired,
  attr: PropTypes.object,
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onClick: PropTypes.func
};
