/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import { ModalBody } from "backstage-modal";
import ModalPluginItem from "./ModalPluginItem";

const ModalPluginList = ({
  toggleModalVisibility,
  plugins,
  onChange,
  editorState
}) => {
  const modalClose = () => {
    toggleModalVisibility();
  };

  const handleChange = (...args) => {
    toggleModalVisibility();
    onChange(...args);
  };

  return (
    <ModalBody>
      <ModalPluginItem
        toggleModalVisibility={modalClose}
        plugins={plugins}
        onChange={handleChange}
        editorState={editorState}
      />
    </ModalBody>
  );
};

export default ModalPluginList;
