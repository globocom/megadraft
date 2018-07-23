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
        <g fill="currentColor" fillRule="evenodd">
          <path d="M11 6h2v12h-2z" />
          <path d="M18 11v2H6v-2z" />
        </g>
      </svg>
    );
  }
}
