/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {Entity, AtomicBlockUtils} from "draft-js";
import Radium from "radium";

import icons from "../../icons";


@Radium
class BlockButton extends Component {
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

const Video = (props) => {
  return <video controls style={props.style} src={props.data.src} alt=""/>;
};

const video = {
  type: "video",
  buttonComponent: BlockButton,
  blockComponent: Video
};

export default video;
