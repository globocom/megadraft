/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";

import BlockControlsStyle from "../../styles/components/plugin/BlockControlsStyle";


export default @Radium
class BlockControls extends Component {
  render() {
    return (
      <div style={BlockControlsStyle.controls}>
        {this.props.children}
      </div>
    );
  }
}
