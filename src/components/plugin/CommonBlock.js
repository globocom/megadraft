/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

import Dropdown from "../../components/Dropdown";
import {
  BlockActionGroup,
  BlockControls,
  BlockWrapper
} from "../../components/plugin";
import {
  DEFAULT_DISPLAY_KEY,
  DEFAULT_DISPLAY_OPTIONS
} from "../../components/plugin/defaults";

export default function CommonBlock(props) {
  function _handleDisplayChange(newValue) {
    props.container.updateData({ display: newValue });
  }

  const data = props.data;
  const defaults = {
    defaultDisplay: DEFAULT_DISPLAY_KEY,
    displayOptions: DEFAULT_DISPLAY_OPTIONS
  };

  let options = props.blockProps.plugin.options || {};
  options = { ...defaults, ...options };

  const readOnly = props.blockProps.getInitialReadOnly();

  return (
    <BlockWrapper readOnly={readOnly}>
      {!readOnly && (
        <BlockControls>
          <Dropdown
            items={options.displayOptions}
            selected={data.display || options.defaultDisplay}
            onChange={_handleDisplayChange}
          />

          <BlockActionGroup items={props.actions} />
        </BlockControls>
      )}

      {props.children}
    </BlockWrapper>
  );
}
