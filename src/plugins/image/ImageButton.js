/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import icons from "../../icons";
import insertDataBlock from "../../insertDataBlock";

export default function BlockButton(props) {
  const { onChange, editorState, className, title } = props;

  function onClick(event) {
    event.preventDefault();
    const src = window.prompt("Enter an URL");
    if (!src) {
      return;
    }

    const data = { src: src, type: "image", display: "medium" };

    onChange(insertDataBlock(editorState, data));
  }

  return (
    <button className={className} type="button" onClick={onClick} title={title}>
      <icons.ImageIcon className="sidemenu__button__icon" />
    </button>
  );
}
