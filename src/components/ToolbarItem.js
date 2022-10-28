/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Separator from "./Separator";

export default function ToolbarItem({ item, active, toggle }) {
  const Icon = item.icon;
  const className = classNames("toolbar__item", {
    "toolbar__item--active": active
  });

  function toggleAction() {
    if (toggle) {
      toggle(!active);
    }
  }

  if (item.type == "separator") {
    return <Separator />;
  }

  return (
    <li className={className}>
      <button
        onClick={() => toggleAction()}
        type="button"
        className="toolbar__button"
      >
        <Icon />
      </button>
    </li>
  );
}

ToolbarItem.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    icon: PropTypes.func.isRequired,
    style: PropTypes.string
  }),
  active: PropTypes.bool,
  toggle: PropTypes.func
};
