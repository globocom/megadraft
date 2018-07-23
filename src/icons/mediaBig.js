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
            d="M3 21h18v-3H3v3zM21.842 8H2.158C1.52 8 1 8.45 1 9v6c0 .55.521 1 1.158 1h19.684C22.48 16 23 15.55 23 15V9c0-.55-.521-1-1.158-1zM3 3v3h18V3H3z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
}
