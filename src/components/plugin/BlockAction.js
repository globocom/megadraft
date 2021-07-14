/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import PropTypes from "prop-types";

export default function BlockAction(props) {
  const { item } = props;
  const { icon: Icon, action } = item;

  return (
    <li className="block__action" onClick={action}>
      <Icon className="block__action__icon" />
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
