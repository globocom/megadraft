/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import classNames from "classnames";

import Separator from "./Separator";

export default function ToolbarItem({ active, item, toggle }) {
  const toggleAction = toggle => {
    if (toggle) {
      toggle(!active);
    }
  };

  const Icon = item.icon;

  if (item.type == "separator") {
    return <Separator />;
  }

  const className = classNames("toolbar__item", {
    "toolbar__item--active": active
  });

  return (
    <li className={className}>
      <button
        onClick={() => {
          toggleAction(toggle);
        }}
        type="button"
        className="toolbar__button"
      >
        <Icon />
      </button>
    </li>
  );
}
