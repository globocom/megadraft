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
        <g fill="none" fillRule="evenodd">
          <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" />
          <path
            d="M16 14h2V8a2 2 0 0 0-2-2h-6v2h6v6zm-8 2V4H6v2H4v2h2v8a2 2 0 0 0 2 2h8v2h2v-2h2v-2H8zm8 4h2v1h-2v-1zM6 3h2v1H6V3zm14 13h1v2h-1v-2zM3 6h1v2H3V6z"
            fill="currentColor"
          />
        </g>
      </svg>
    );
  }
}
