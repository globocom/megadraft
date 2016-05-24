/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component, PropTypes} from "react";

import DropdownItemStyle from "../styles/components/DropdownItemStyle";


export default @Radium
class DropdownItem extends Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    style: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    onClick: PropTypes.func
  }

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
