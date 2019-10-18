/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

const BlockWrapper = (...props) => {
  return (
    <div className={props.readOnly ? "block__hover--readonly" : "block__hover"}>
      <div className="block__wrapper">{props.children}</div>
    </div>
  );
};

export default BlockWrapper;
