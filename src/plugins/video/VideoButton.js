/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from "react";

import icons from "../../icons";
import insertDataBlock from "../../insertDataBlock";

export default class VideoButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = ::this.onClick;
  }

  onClick(e) {
    e.preventDefault();
    const src = window.prompt("Enter a URL");
    if (!src) {
      return;
    }

    const data = { src: src, type: "video", display: "small" };

    this.props.onChange(insertDataBlock(this.props.editorState, data));
  }

  render() {
    return (
      <button
        className={this.props.className}
        type="button"
        onClick={this.onClick}
        title={this.props.title}
      >
        <icons.VideoIcon className="sidemenu__button__icon" />
      </button>
    );
  }
}
