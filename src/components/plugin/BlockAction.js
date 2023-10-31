/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import PropTypes from "prop-types";

export default function BlockAction(props) {
  const Icon = props.item.icon;

  return (
    <li className="block__action">
      <button
        className="block__action__btn"
        type="button"
        role="button"
        aria-label={`Button action ${props.item.key} of text editor`}
        onClick={props.item.action}
      >
        <Icon className="block__action__icon" />
      </button>
    </li>
  );
}

BlockAction.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired
  })
};
