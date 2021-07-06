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
  const actions = [
    {
      key: "delete",
      icon: icons.DeleteIcon,
      action: container.remove
    }
  ];
  const readOnly = blockProps.getInitialReadOnly();

  function _handleCaptionChange(event) {
    event.stopPropagation();
    container.updateData({ caption: event.target.value });
  }

  function _handleRightsHolderChange(event) {
    event.stopPropagation();
    container.updateData({ rightsHolder: event.target.value });
  }

  return (
    <CommonBlock {...props} actions={actions}>
      <BlockContent>
        <img style={ImageBlockStyle.image} src={data.src} alt="" />
      </BlockContent>

      <BlockData>
        <BlockInput
          placeholder="Caption"
          value={data.caption}
          onChange={_handleCaptionChange}
          readOnly={readOnly}
        />

        <BlockInput
          placeholder="Rights Holder"
          value={data.rightsHolder}
          onChange={_handleRightsHolderChange}
          readOnly={readOnly}
        />
      </BlockData>
    </CommonBlock>
  );
}
