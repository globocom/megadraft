/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component, PropTypes} from "react";

import Style  from "../styles/components/MediaControlsActionsStyle";
import MediaControlsActionsItem from "../components/MediaControlsActionsItem";


export default @Radium
class MediaControlsActions extends Component {

  static propTypes = {
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: PropTypes.string.isRequired,
        icon: PropTypes.func.isRequired,
        action: PropTypes.func.isRequired
      })
    )
  }

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
