/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */


import React, { useRef, useState, useEffect } from "react";
import icons from "../icons";

const addHttpPrefix = url => {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `http://${url}`;
  }
  return url;
};

const cancelErrorIfEmptyUrl = (urlEvent, cancelError) => {
  if (urlEvent === "") {
    cancelError();
  }
};

const handleKey = (event, setLink, reset) => {
  if (event.key === "Enter") {
    event.preventDefault();
    setLink(event);
  } else if (event.key === "Escape") {
    event.preventDefault();
    reset();
  }
};

const isValidUrl = url => {
  // https://gist.github.com/dperini/729294
  // Author: Diego Perini
  // License: MIT
  // Updated: 2018/09/12
  const expression = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

  const regex = new RegExp(expression);
  return url.match(regex);
};

export default function LinkInput({
  cancelEntity,
  cancelError,
  entity,
  i18n,
  removeEntity,
  setEntity,
  setError,
  url
}) {
  const textInputRef = useRef();
  const [urlState, setUrlState] = useState(url ?? "");
  const [isFocused, setIsFocused] = useState(false); 

  useEffect(() => {
    setUrlState(url ?? "");
  }, [url]);

  const setLink = event => {
    const urlAux = addHttpPrefix(urlState);

    if (!isValidUrl(urlAux)) {
      const errorMsg = i18n["Invalid Link"];
      setError(errorMsg);
      setIsFocused(true); 
      return;
    }

    setEntity({ url: urlAux });
    reset();
  };

  const reset = () => {
    setUrlState("");
    cancelEntity();
    setIsFocused(false);
  };

  const onLinkChange = event => {
    event.stopPropagation();
    const urlEvent = event.target.value;

    cancelErrorIfEmptyUrl(urlEvent, cancelError);
    setUrlState(urlEvent);
  };

  const onLinkKeyDown = event => {
    handleKey(event, setLink, reset);
  };

  return (
    <div style={{ whiteSpace: "nowrap" }}>
      <input
        autoFocus
        ref={textInputRef}
        type="text"
        className="toolbar__input"
        onChange={onLinkChange}
        value={urlState}
        onKeyDown={onLinkKeyDown}
        placeholder={i18n["Type the link and press enter"]}
        onFocus={() => setIsFocused(true)} 
        onBlur={() => setIsFocused(false)}  
      />
      <span className="toolbar__item" style={{ verticalAlign: "bottom" }}>
        <button
          onClick={removeEntity}
          type="button"
          className="toolbar__button toolbar__input-button"
        >
          {entity ? <icons.UnlinkIcon /> : <icons.CloseIcon />}
        </button>
      </span>
    </div>
  );
}
