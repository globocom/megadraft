/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import classNames from "classnames";

const BlockContent = (...props) => {
  let className = classNames("block__content", {
    [`block__content--${props.className}`]: props.className
  });

  return <div className={className}>{props.children}</div>;
};

export default BlockContent;
