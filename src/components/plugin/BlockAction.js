/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component, PropTypes} from "react";

import BlockActionStyle from "../../styles/components/plugin/BlockActionStyle";


export default @Radium
class BlockAction extends Component {

  static propTypes = {
    item: React.PropTypes.shape({
      key: PropTypes.string.isRequired,
      icon: PropTypes.func.isRequired,
      action: PropTypes.func.isRequired
    })
  }

  render() {
    const Icon = this.props.item.icon;
    return(
      <li style={BlockActionStyle.item} onClick={this.props.item.action}>
        <Icon style={BlockActionStyle.icon} />
      </li>
    );
  }
}
