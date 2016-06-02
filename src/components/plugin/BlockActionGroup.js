/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component, PropTypes} from "react";

import BlockAction from "./BlockAction";
import BlockActionGroupStyle from "../../styles/components/plugin/BlockActionGroupStyle";


export default @Radium
class BlockActionGroup extends Component {

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
    return(<BlockAction item={item} key={item.key} />);
  }

  render() {
    return(
      <ul style={BlockActionGroupStyle.group}>
        {this.props.items.map(this.renderItem)}
      </ul>
    );
  }
}
