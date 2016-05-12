/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import Radium from "radium";


export default @Radium
class extends React.Component {
  render() {
    return (
        <svg style={this.props.style} width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fill-rule="evenodd">
            <path d="M0 14.25V18h3.75L14.81 6.94l-3.75-3.75L0 14.25zM17.71 4.04a.996.996 0 0 0 0-1.41L15.37.29a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="currentColor"/>
            <path d="M-3-3h24v24H-3z"/>
          </g>
        </svg>
    );
  }
}
