/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

export default class extends React.Component {
  render() {
    return (
      <svg {...this.props} width="24" height="24" viewBox="0 0 24 24">
        <title>Artboard 1</title>
        <g fill="none" fillRule="evenodd">
          <path d="M0 0h24v24H0z" />
          <path
            d="M3 21h18v-3H3v3zM20.053 8H3.947C3.427 8 3 8.45 3 9v6c0 .55.426 1 .947 1h16.106c.52 0 .947-.45.947-1V9c0-.55-.426-1-.947-1zM3 3v3h18V3H3z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
}
