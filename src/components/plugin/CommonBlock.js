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
} from "../../components/plugin";
import {
  DEFAULT_FEATURED_OPTIONS,
  DEFAULT_FEATURED_KEY
} from "../../components/plugin/defaults";


export default class CommonBlock extends Component {
  constructor(props) {
    super(props);

    this._handleFeaturedChange = ::this._handleFeaturedChange;
  }

  _handleFeaturedChange(newValue) {
    this.props.container.updateData({featured: newValue});
  }

  render(){
    const data = this.props.data;
    const defaults = {
      defaultFeatured: DEFAULT_FEATURED_KEY,
      featuredOptions: DEFAULT_FEATURED_OPTIONS
    };
    let options = this.props.blockProps.plugin.options || {};
    options = {...defaults, ...options};

    return (
      <BlockWrapper>
        <BlockControls>
          <Dropdown
            items={options.featuredOptions}
            selected={data.featured || options.defaultFeatured}
            onChange={this._handleFeaturedChange} />

          <BlockActionGroup items={this.props.actions} />
        </BlockControls>

        {this.props.children}
      </BlockWrapper>
    );
  }
}
