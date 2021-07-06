/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

import {
  BlockContent,
  BlockData,
  BlockInput,
  CommonBlock
} from "../../components/plugin";

import icons from "../../icons";

import VideoBlockStyle from "./VideoBlockStyle";

export default function VideoBlock(props) {
  const { container, data } = props;
  const actions = [
    {
      key: "delete",
      icon: icons.DeleteIcon,
      action: container.remove
    }
  ];

  function _handleCaptionChange(event) {
    container.updateData({ caption: event.target.value });
  }

  return (
    <CommonBlock {...props} actions={actions}>
      <BlockContent>
        <video controls style={VideoBlockStyle.video} src={data.src} alt="" />
      </BlockContent>

      <BlockData>
        <BlockInput
          placeholder="Caption"
          value={data.caption}
          onChange={_handleCaptionChange}
        />
      </BlockData>
    </CommonBlock>
  );
}
