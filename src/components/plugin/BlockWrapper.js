/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";

import BlockWrapperStyle from "../../styles/components/plugin/BlockWrapperStyle";


export default @Radium
class BlockWrapper extends Component {
  render() {
    return (
      <div style={BlockWrapperStyle.blockHover}>
        <div style={BlockWrapperStyle.blockWrapper}>
          {this.props.children}
        </div>
      </div>
    );
  }
};
