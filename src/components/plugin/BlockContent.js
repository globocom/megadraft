/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";

import BlockContentStyle from "../../styles/components/plugin/BlockContentStyle";


export default @Radium
class BlockContent extends Component {
  render() {
    return (
      <div style={BlockContentStyle.wrapper}>
        <div style={BlockContentStyle.imageWrapper}>
          {this.props.children}
        </div>
      </div>
    );
  }
};
