/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {Entity, AtomicBlockUtils} from "draft-js";

import icons from "../../icons";


export default class BlockButton extends Component {
  onClick(e) {
    e.preventDefault();
    const src = window.prompt("Enter a URL");
    if (!src) {
      return;
    }

    const entityKey = Entity.create("image", "IMMUTABLE", {src});

    this.props.onChange(AtomicBlockUtils.insertAtomicBlock(
      this.props.editorState,
      entityKey,
      "🍺"
    ));
  }

  render() {
    return (
      <button className={this.props.className} onClick={::this.onClick}>
        <icons.ImageIcon className="sidemenu__button__icon" />
      </button>
    );
  }
}
