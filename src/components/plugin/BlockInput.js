/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";

import BlockInputStyle from "../../styles/components/plugin/BlockInputStyle";


export default @Radium
class BlockInput extends Component {
  render(){
    return (
      <input {...this.props} type="text" style={BlockInputStyle.field} />
    );
  }
};
