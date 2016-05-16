/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";
import ReactDOM from "react-dom";

import DropdownItemStyle from "../styles/components/DropdownItemStyle";
import icons from "../icons";


export default @Radium
class DropdownItem extends Component {
  render() {
    const Icon = this.props.item.icon;
    return(
      <div
        style={[DropdownItemStyle.base, this.props.style]}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseDown}>

        <Icon style={DropdownItemStyle.icon} />
        <span style={DropdownItemStyle.text}>{this.props.item.label}</span>

        {this.props.children}
      </div>
    );
  }
}
