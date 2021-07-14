/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

export default function BlockWrapper(props) {
  const { readOnly, children } = props;

  return (
    <div className={readOnly ? "block__hover--readonly" : "block__hover"}>
      <div className="block__wrapper">{children}</div>
    </div>
  );
}
