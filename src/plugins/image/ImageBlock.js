/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";

import Dropdown from "../../components/Dropdown";
import {
  BlockActionGroup,
  BlockContent,
  BlockControls,
  BlockData,
  BlockInput,
  BlockWrapper
} from "../../components/plugin";

import icons from "../../icons";

import ImageBlockStyle from "./ImageBlockStyle";


const DEFAULT_FEATURED = "medium";


export default @Radium
class ImageBlock extends Component {
  constructor(props) {
    super(props);

    this._handleCaptionChange = ::this._handleCaptionChange;
    this._handleRightsHolderChange = ::this._handleRightsHolderChange;
    this._handleFeaturedChange = ::this._handleFeaturedChange;

    this.dropdownItems = [
      {"key": "small", "icon": icons.MediaSmallIcon, "label": "SMALL"},
      {"key": "medium", "icon": icons.MediaMediumIcon, "label": "MEDIUM"},
      {"key": "big", "icon": icons.MediaBigIcon, "label": "BIG"}
    ];
    this.actionsItems = [
      {"key": "crop", "icon": icons.CropIcon, "action": this._handleCrop},
      {"key": "edit", "icon": icons.EditIcon, "action": this._handleEdit},
      {"key": "delete", "icon": icons.DeleteIcon, "action": this.props.container.remove}
    ];
  }

  _handleCrop() {
  }

  _handleEdit() {
  }

  _handleDataChange(key, event) {
    const newState = {};
    newState[key] = event.target.value;
    this.props.container.updateEntity(newState);
  }

  _handleFeaturedChange(newValue) {
    this.props.container.updateEntity({featured: newValue});
  }

  _handleCaptionChange(event) {
    this._handleDataChange("caption", event);
  }

  _handleRightsHolderChange(event) {
    this._handleDataChange("rightsHolder", event);
  }

  render(){
    const data = this.props.data;

    return (
      <BlockWrapper>
        <BlockControls>
          <Dropdown
            items={this.dropdownItems}
            selected={data.featured || DEFAULT_FEATURED}
            onChange={this._handleFeaturedChange} />

          <BlockActionGroup items={this.actionsItems} />
        </BlockControls>

        <BlockContent>
          <img style={ImageBlockStyle.image} src={data.src} alt=""/>
        </BlockContent>

        <BlockData>
          <BlockInput
            placeholder="Caption"
            value={data.caption}
            onChange={this._handleCaptionChange} />

          <BlockInput
            placeholder="Rights Holder"
            value={data.rightsHolder}
            onChange={this._handleRightsHolderChange} />
        </BlockData>
      </BlockWrapper>
    );
  }
};
