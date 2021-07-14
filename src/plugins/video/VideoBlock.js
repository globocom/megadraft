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
  const { updateData, remove } = container;
  const actions = [
    {
      key: "delete",
      icon: icons.DeleteIcon,
      action: remove
    }
  ];

  function handleCaptionChange(event) {
    updateData({ caption: event.target.value });
  }

  function handleVideoClick(event) {
    event.preventDefault();

    const src = window.prompt("Enter an URL");
    if (!src) {
      return;
    }

    updateData({ src });
  }

  return (
    <CommonBlock {...props} actions={actions}>
      <BlockContent>
        <video
          controls
          style={VideoBlockStyle.video}
          src={data.src}
          alt={data.caption}
          onClick={handleVideoClick}
        />
      </BlockContent>

      <BlockData>
        <BlockInput
          placeholder="Caption"
          value={data.caption}
          onChange={handleCaptionChange}
        />
      </BlockData>
    </CommonBlock>
  );
}
