/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import Radium from "radium";

import ToolbarItemStyles from "./styles/ToolbarItemStyles";
import SeparatorStyles from "./styles/SeparatorStyles";

export default @Radium
class Separator extends Component {
  render() {
    return (
      <li style={[ToolbarItemStyles.base, SeparatorStyles]}></li>
    );
  }
}
