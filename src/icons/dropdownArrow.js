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
          <path d="M0 0h24v24H0z" />
          <path fill="currentColor" d="M8 10l4 4 4-4z" />
        </g>
      </svg>
    );
  }
}
