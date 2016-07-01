/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";

import {
  BlockContent,
  BlockData,
  BlockInput,
  CommonBlock
} from "../../components/plugin";

import icons from "../../icons";

import ImageBlockStyle from "./ImageBlockStyle";


export default class ImageBlock extends Component {
  constructor(props) {
    super(props);

    this._handleCaptionChange = ::this._handleCaptionChange;
    this._handleRightsHolderChange = ::this._handleRightsHolderChange;

    this.actions = [
      {"key": "crop", "icon": icons.CropIcon, "action": this._handleCrop},
      {"key": "edit", "icon": icons.EditIcon, "action": this._handleEdit},
      {"key": "delete", "icon": icons.DeleteIcon, "action": this.props.container.remove}
    ];
  }

  _handleCrop() {
  }

  _handleEdit() {
  }

  _handleCaptionChange(event) {
    this.props.container.updateEntity({caption: event.target.value});
  }

  _handleRightsHolderChange(event) {
    this.props.container.updateEntity({rightsHolder: event.target.value});
  }

  render(){
    return (
      <CommonBlock {...this.props} actions={this.actions}>
        <BlockContent>
          <img style={ImageBlockStyle.image} src={this.props.data.src} alt=""/>
        </BlockContent>

        <BlockData>
          <BlockInput
            placeholder="Caption"
            value={this.props.data.caption}
            onChange={this._handleCaptionChange} />

          <BlockInput
            placeholder="Rights Holder"
            value={this.props.data.rightsHolder}
            onChange={this._handleRightsHolderChange} />
        </BlockData>
      </CommonBlock>
    );
  }
}
