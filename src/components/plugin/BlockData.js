/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";

import BlockDataStyle from "../../styles/components/plugin/BlockDataStyle";


export default @Radium
class BlockData extends Component {
  render() {
    return (
      <div style={BlockDataStyle.dataBlock}>
        {this.props.children}
      </div>
    );
  }
};
