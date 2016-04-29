/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";

import Style from "../styles/components/MediaCaptionStyle";


export default @Radium
class Caption extends Component {
  render() {
    return (
      <div style={Style.captionBlock}>
        <p style={Style.captionText}>Ruivas... muitas ruivas</p>
        <p style={Style.captionText}>Fonte: Metal/Google</p>
      </div>
    );
  }
}
