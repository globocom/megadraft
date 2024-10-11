/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import PropTypes from "prop-types";
import React from "react";

import BlockAction from "./BlockAction";

export default function BlockActionGroup(props) {
  function renderItem(item) {
    return <BlockAction item={item} key={item.key} />;
  }

  return <ul className="block__action-group">{props.items.map(renderItem)}</ul>;
}

BlockActionGroup.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      icon: PropTypes.func.isRequired,
      action: PropTypes.func.isRequired
    })
  )
};
