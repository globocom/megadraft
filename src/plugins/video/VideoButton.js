/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { useState } from "react";

import icons from "../../icons";
import { DialogMedia } from "../../components/DialogMedia";

export default function VideoButton(props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { onChange, editorState, className, title } = props;

  function handleOnDialogOpen() {
    setIsDialogOpen(true);
  }

  function handleOnDialogClose() {
    isDialogOpen && setIsDialogOpen(false);
  }

  return (
    <>
      <button
        className={className}
        type="button"
        onClick={handleOnDialogOpen}
        title={title}
      >
        <icons.VideoIcon className="sidemenu__button__icon" />
      </button>
      <DialogMedia
        typeMedia="video"
        onChange={onChange}
        editorState={editorState}
        onClose={handleOnDialogClose}
        isOpen={isDialogOpen}
      />
    </>
  );
}
