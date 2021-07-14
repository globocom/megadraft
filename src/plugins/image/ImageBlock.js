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

import ImageBlockStyle from "./ImageBlockStyle";

export default function ImageBlock(props) {
  const { container, blockProps, data } = props;
  const { updateData, remove } = container;
  const { getInitialReadOnly } = blockProps;
  const actions = [
    {
      key: "delete",
      icon: icons.DeleteIcon,
      action: remove
    }
  ];
  const readOnly = getInitialReadOnly();

  function handleCaptionChange(event) {
    event.stopPropagation();
    updateData({ caption: event.target.value });
  }

  function handleRightsHolderChange(event) {
    event.stopPropagation();
    updateData({ rightsHolder: event.target.value });
  }

  function handleImageClick(event) {
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
        <img
          style={ImageBlockStyle.image}
          src={data.src}
          alt={data.caption}
          onClick={handleImageClick}
        />
      </BlockContent>

      <BlockData>
        <BlockInput
          placeholder="Caption"
          value={data.caption}
          onChange={handleCaptionChange}
          readOnly={readOnly}
        />

        <BlockInput
          placeholder="Rights Holder"
          value={data.rightsHolder}
          onChange={handleRightsHolderChange}
          readOnly={readOnly}
        />
      </BlockData>
    </CommonBlock>
  );
}
