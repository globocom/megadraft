/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";

import icons from "../../icons";
import {insertMediaBlock} from "../../utils";


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

    this.props.onChange(insertMediaBlock(this.props.editorState, "video", {src}));
  }

  render() {
    return (
      <button className={this.props.className} type="button" onClick={this.onClick}>
        <icons.VideoIcon className="sidemenu__button__icon" />
      </button>
    );
  }
}
