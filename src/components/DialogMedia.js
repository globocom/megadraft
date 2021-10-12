import React, { useState } from "react";
import ReactDOM from "react-dom";

import icons from "../icons";
import insertDataBlock from "../insertDataBlock";

export const DialogMedia = ({
  isOpen,
  typeMedia,
  onClose,
  editorState,
  onChange
}) => {
  const [value, setValue] = useState();

  function handleInsertMedia() {
    if (!value) {
      onClose();
      return;
    }

    const data = { src: value, type: typeMedia, display: "medium" };

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
            <button className="dialog-media__header__close" onClick={onClose}>
              <icons.CloseIcon className="dialog-media__header__close__icon" />
            </button>
          </div>
          <div className="dialog-media__body">
            <input
              className="dialog-media-body__input"
              placeholder={`Paste the ${typeMedia} link...`}
              onChange={e => setValue(e.target.value)}
            />
            <button
              onClick={handleInsertMedia}
              className="dialog-media-body__button"
            >
              Embed {typeMedia}
            </button>
            <span className="dialog-media-body__info">
              Works with any {typeMedia} from the web
            </span>
          </div>
        </div>
      </div>,
      document.body
    )
  );
};
