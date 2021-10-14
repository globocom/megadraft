/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { useState } from "react";

import icons from "../../icons";
import { DialogMedia } from "../../components/DialogMedia";

export default function BlockButton(props) {
  const { onChange, editorState, className, title } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);

  function onClickButton() {
    isOpenModal ? setIsOpenModal(false) : setIsOpenModal(true);
  }

  return (
    <>
      <button
        className={className}
        type="button"
        onClick={onClickButton}
        title={title}
      >
        <icons.ImageIcon className="sidemenu__button__icon" />
      </button>
      <DialogMedia
        typeMedia="image"
        onChange={onChange}
        editorState={editorState}
        onClose={onClickButton}
        isOpen={isOpenModal}
      />
    </>
  );
}
