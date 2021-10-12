/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

import icons from "../../icons";
import { DialogMedia } from "../../components/DialogMedia";
import { useDialogMedia } from "../../hooks/useDialogMedia";

export default function VideoButton(props) {
  const { onChange, editorState, className, title } = props;
  const {
    isDialogOpen,
    handleOnDialogOpen,
    handleOnDialogClose
  } = useDialogMedia();

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
