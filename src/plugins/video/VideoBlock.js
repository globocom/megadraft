/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from "react";

import {
  BlockContent,
  BlockData,
  BlockInput,
  CommonBlock
} from "../../components/plugin";

import icons from "../../icons";

import VideoBlockStyle from "./VideoBlockStyle";

export default class VideoBlock extends Component {
  constructor(props) {
    super(props);

    this._handleCaptionChange = this._handleCaptionChange.bind(this);

    this.actions = [
      {
        key: "delete",
        icon: icons.DeleteIcon,
        action: this.props.container.remove
      }
    ];
  }

  _handleCaptionChange(event) {
    this.props.container.updateData({ caption: event.target.value });
  }

  render() {
    return (
      <CommonBlock {...this.props} actions={this.actions}>
        <BlockContent>
          <video
            controls
            style={VideoBlockStyle.video}
            src={this.props.data.src}
            alt=""
          />
        </BlockContent>

        <BlockData>
          <BlockInput
            placeholder="Caption"
            value={this.props.data.caption}
            onChange={this._handleCaptionChange}
          />
        </BlockData>
      </CommonBlock>
    );
  }
}
