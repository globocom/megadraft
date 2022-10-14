/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import classNames from "classnames";

import Separator from "./Separator";

const ToolbarItem = props => {
  const toggleAction = action => {
    if (action.toggle) {
      action.toggle(!action.active);
    }
  };

  const Icon = props.item.icon;

  if (props.item.type == "separator") {
    return <Separator />;
  }

  const className = classNames("toolbar__item", {
    "toolbar__item--active": props.active
  });

  return (
    <li className={className}>
      <button
        onClick={() => {
          toggleAction(props);
        }}
        type="button"
        className="toolbar__button"
      >
        <Icon />
      </button>
    </li>
  );
};

export default ToolbarItem;
