/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";

import Style  from "../styles/components/MediaControlsActionsStyle";
import MediaControlsActionsItem from "../components/MediaControlsActionsItem";


export default @Radium
class MediaControlsActions extends Component {
  renderItem(item) {
    return(<MediaControlsActionsItem item={item} key={item.key} />);
  }

  render() {
    return(
      <ul style={Style.actionsGroup}>
        {this.props.items.map(this.renderItem)}
      </ul>
    );
  }
}
