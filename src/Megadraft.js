/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {Editor, RichUtils} from "draft-js";

import icons from "./icons";
import Toolbar from "./Toolbar";


export default class Megadraft extends Component {
  constructor(props) {
    super(props);

    this.actions = [
      {type: "inline", label: "B", style: "BOLD", icon: icons.BoldIcon},
      {type: "inline", label: "I", style: "ITALIC", icon: icons.ItalicIcon},
      {type: "separator"},
      {type: "block", label: "UL", style: "unordered-list-item", icon: icons.ULIcon},
      {type: "block", label: "OL", style: "ordered-list-item", icon: icons.OLIcon},
      {type: "block", label: "H2", style: "header-two", icon: icons.H2Icon},
      {type: "block", label: "QT", style: "blockquote", icon: icons.BlockQuoteIcon}
    ];
  }

  onChange(editorState) {
    this.props.onChange(editorState);
  }

  handleKeyCommand(command) {
    const {editorState} = this.props;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.props.onChange(newState);
      return true;
    }
    return false;
  }

  render() {
    const {editorState} = this.props;
    return (
      <div className="megadraft">
        <div className="megadraft-editor" id="megadraft-editor" ref="editor">
          <Editor
            handleKeyCommand={::this.handleKeyCommand}
            editorState={editorState}
            onChange={::this.onChange} />
          <Toolbar
            editor={this.refs.editor}
            editorState={editorState}
            onChange={::this.onChange}
            actions={this.actions}/>
        </div>
      </div>
    );
  }
}
