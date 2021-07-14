/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

export default function BlockControls(props) {
  const { children } = props;
  return <div className="block__controls">{children}</div>;
}
