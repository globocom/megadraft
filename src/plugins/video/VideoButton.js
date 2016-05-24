/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {Entity, AtomicBlockUtils} from "draft-js";
import Radium from "radium";

import icons from "../../icons";


export default @Radium
class VideoButton extends Component {
  onClick(e) {
    e.preventDefault();
    const src = window.prompt("Enter a URL");
    if (!src) {
      return;
    }

    const entityKey = Entity.create("video", "IMMUTABLE", {src});

    this.props.onChange(AtomicBlockUtils.insertAtomicBlock(
      this.props.editorState,
      entityKey,
      "🍺"
    ));
  }

  render() {
    return (
      <button style={this.props.style} onClick={::this.onClick}>
        <icons.VideoIcon/>
      </button>
    );
  }
}
