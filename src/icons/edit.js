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
        <path fill="none" d="M-1-1h26v26H-1z" />
        <g fillRule="evenodd" fill="none">
          <path
            fill="currentColor"
            d="M3.125 17.375v3.75h3.75l11.06-11.06-3.75-3.75-11.06 11.06zm17.71-10.21a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
          />
          <path d="M.125.125h24v24h-24v-24z" />
        </g>
      </svg>
    );
  }
}
