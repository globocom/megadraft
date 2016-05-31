/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import Radium from "radium";

import Separator from "./Separator";

import ToolbarItemStyles from "../styles/components/ToolbarItemStyles";


export default @Radium
class ToolbarItem extends Component {
  constructor(props) {
    super(props);
  }

  toggleAction(action) {
    if (action.toggle) {
      action.toggle(!action.active);
    }
  }

  render() {
    const Icon = this.props.item.icon;

    if (this.props.item.type == "separator") {
      return (
        <Separator />
      );
    }

    const style = [
      ToolbarItemStyles.base,
      this.props.active && ToolbarItemStyles.active
    ];

    return (
      <li style={style}>
        <button onClick={() => this.toggleAction(this.props)} style={ToolbarItemStyles.button}>
          <Icon />
        </button>
      </li>
    );
  }
}
