/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

export default ({ wrapper, children }) => (
  <div className="megadraft-block">
    {wrapper ? React.cloneElement(wrapper, [], children) : children}
  </div>
);
