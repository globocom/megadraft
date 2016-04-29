/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";

import Dropdown from "../components/Dropdown";
import Style from "../styles/components/MediaControlsStyle";
import MediaControlsActions from "../components/MediaControlsActions";


export default @Radium
class MediaControls extends Component {
  render() {
    return (
      <div style={Style.controls}>
        <Dropdown
          items={this.props.dropdownItems}
          selected={this.props.selectedFeatured}
          onChange={this.props.setFeatured} />
        <MediaControlsActions items={this.props.actionsItems} />
      </div>
    );
  }
}
