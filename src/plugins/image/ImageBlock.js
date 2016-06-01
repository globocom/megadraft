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
  BlockWrapper
} from "../../components/plugin";

import icons from "../../icons";

import BlockDataStyle from "../../styles/components/plugin/BlockDataStyle";
import ImageBlockStyle from "./ImageBlockStyle";


const DEFAULT_FEATURED = "medium";


export default @Radium
class ImageBlock extends Component {
  constructor(props) {
    super(props);

    this._handleFocus = ::this._handleFocus;
    this._handleBlur = ::this._handleBlur;
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

  _handleFocus() {
    this.props.blockProps.setReadOnly(true);
  }

  _handleBlur() {
    this.props.blockProps.setReadOnly(false);
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
          <input type="text"
            placeholder="Caption"
            style={BlockDataStyle.dataField}
            value={data.caption}
            onFocus={this._handleFocus}
            onBlur={this._handleBlur}
            onChange={this._handleCaptionChange} />
          <input type="text"
            placeholder="Rights Holder"
            style={BlockDataStyle.dataField}
            value={data.rightsHolder}
            onFocus={this._handleFocus}
            onBlur={this._handleBlur}
            onChange={this._handleRightsHolderChange} />
        </BlockData>
      </BlockWrapper>
    );
  }
};
