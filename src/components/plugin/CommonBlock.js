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
  DEFAULT_DISPLAY_OPTIONS,
  DEFAULT_DISPLAY_KEY
} from "../../components/plugin/defaults";

const DEFAULT_OPTIONS = {
  defaultDisplay: DEFAULT_DISPLAY_KEY,
  displayOptions: DEFAULT_DISPLAY_OPTIONS
};

export default function CommonBlock(props) {
  const { container, data, blockProps, actions, children } = props;
  const { plugin, getInitialReadOnly } = blockProps;
  const { options: pluginOptions = {} } = plugin;
  const options = { ...DEFAULT_OPTIONS, ...pluginOptions };
  const readOnly = getInitialReadOnly();

  function handleDisplayChange(display) {
    container.updateData({ display });
  }

  return (
    <BlockWrapper readOnly={readOnly}>
      {!readOnly && (
        <BlockControls>
          <Dropdown
            items={options.displayOptions}
            selected={data.display || options.defaultDisplay}
            onChange={handleDisplayChange}
          />
          <BlockActionGroup items={actions} />
        </BlockControls>
      )}

      {children}
    </BlockWrapper>
  );
}
