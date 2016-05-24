/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component, PropTypes} from "react";

import Dropdown from "../components/Dropdown";
import Style from "../styles/components/MediaControlsStyle";
import MediaControlsActions from "../components/MediaControlsActions";


export default @Radium
class MediaControls extends Component {

  static propTypes = {
    dropdownItems: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: PropTypes.string.isRequired,
        icon: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired
      })
    ),
    actionsItems: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: PropTypes.string.isRequired,
        icon: PropTypes.func.isRequired,
        action: PropTypes.func.isRequired
      })
    ),
    selectedFeatured: PropTypes.string.isRequired,
    setFeatured: PropTypes.func.isRequired
  }

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
