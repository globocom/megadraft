/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import classNames from "classnames";

function BEMClassName(block, element, modifier) {
  return classNames(`${block}__${element}`, {
    [`${block}__${element}--${modifier}`]: modifier
  });
}

export default function BlockContent(props) {
  const { className, children } = props;

  return (
    <div className={BEMClassName("block", "content", className)}>
      {children}
    </div>
  );
}
