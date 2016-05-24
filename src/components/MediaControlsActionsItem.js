/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component, PropTypes} from "react";

import Style  from "../styles/components/MediaControlsActionsStyle";


export default @Radium
class MediaControlsActionsItem extends Component {

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
      <li style={Style.actionsGroupItem} onClick={this.props.item.action}>
        <Icon style={Style.actionsGroupItemIcon} />
      </li>
    );
  }
}
