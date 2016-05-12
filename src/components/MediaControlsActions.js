/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";

import Style  from "../styles/components/MediaControlsActionsStyle";


export default @Radium
class MediaControlsActions extends Component {
  renderItem(item) {
    const Icon = item.icon;
    return(
      <li key={item.key} style={Style.actionsGroupItem} onClick={item.action}>
        <Icon style={Style.actionsGroupItemIcon} />
      </li>
    );
  }

  render() {
    return(
      <ul style={Style.actionsGroup}>
        {this.props.items.map(this.renderItem)}
      </ul>
    );
  }
}
