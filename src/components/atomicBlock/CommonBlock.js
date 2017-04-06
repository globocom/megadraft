/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";

import Dropdown from "../../components/Dropdown";
import {
  BlockActionGroup,
  BlockControls,
  BlockWrapper
} from "../../components/atomicBlock";
import {
  DEFAULT_DISPLAY_OPTIONS,
  DEFAULT_DISPLAY_KEY
} from "../../components/atomicBlock/defaults";


export default class CommonBlock extends Component {
  constructor(props) {
    super(props);

    this._handleDisplayChange = ::this._handleDisplayChange;
  }

  _handleDisplayChange(newValue) {
    this.props.container.updateData({display: newValue});
  }

  render(){
    const data = this.props.data;
    const defaults = {
      defaultDisplay: DEFAULT_DISPLAY_KEY,
      displayOptions: DEFAULT_DISPLAY_OPTIONS
    };
    let options = this.props.blockProps.atomicBlock.options || {};
    options = {...defaults, ...options};

    return (
      <BlockWrapper>
        <BlockControls>
          <Dropdown
            items={options.displayOptions}
            selected={data.display || options.defaultDisplay}
            onChange={this._handleDisplayChange} />

          <BlockActionGroup items={this.props.actions} />
        </BlockControls>

        {this.props.children}
      </BlockWrapper>
    );
  }
}
