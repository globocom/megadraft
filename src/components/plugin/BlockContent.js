/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import classNames from "classnames";

export default function BlockContent(props) {
  const className = classNames("block__content", {
    [`block__content--${props.className}`]: props.className
  });

  return <div className={className}>{props.children}</div>;
}
