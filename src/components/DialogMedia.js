import React, { useState } from "react";
import ReactDOM from "react-dom";

import insertDataBlock from "../insertDataBlock";

export const DialogMedia = ({ isOpen, onClose, editorState, onChange }) => {
  const [value, setValue] = useState();

  function handleInsertMedia() {
    if (!value) {
      onClose();
      return;
    }

    const data = { src: value, type: "image", display: "medium" };

    onChange(insertDataBlock(editorState, data));
    setValue(null);
    onClose();
  }

  return (
    isOpen &&
    ReactDOM.createPortal(
      <div tabIndex="0" className="dialog-media-wrapper">
        <div className="dialog-media">
          <div className="dialog-media__header">
            <span className="dialog-media-header__title">Embed link</span>
          </div>
          <div className="dialog-media__body">
            <input
              className="dialog-media-body__input"
              placeholder="Paste the image link..."
              onChange={e => setValue(e.target.value)}
            />
            <button
              onClick={handleInsertMedia}
              className="dialog-media-body__button"
            >
              Embed image
            </button>
            <span className="dialog-media-body__info">
              Works with any image from the web
            </span>
          </div>
        </div>
      </div>,
      document.body
    )
  );
};
