/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

const Link = (...props) => {
  const contentState = props.contentState;
  const { url } = contentState
    ? contentState.getEntity(props.entityKey).getData()
    : {};
  return (
    <a className="editor__link" href={url} title={url}>
      {props.children}
    </a>
  );
};

export default Link;
