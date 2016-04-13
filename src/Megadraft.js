/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {Editor, RichUtils} from "draft-js";

import Icons from "./icons";
import Toolbar from "./toolbar";


export default class Megadraft extends Component {
  constructor(props) {
    super(props);

    this.actions = [
      {type: "inline", label: "B", style: "BOLD", icon: Icons.BoldIcon},
      {type: "inline", label: "I", style: "ITALIC", icon: Icons.ItalicIcon},
      {type: "separator"},
      {type: "block", label: "UL", style: "unordered-list-item", icon: Icons.ULIcon},
      {type: "block", label: "OL", style: "ordered-list-item", icon: Icons.OLIcon},
      {type: "block", label: "H2", style: "header-two", icon: Icons.H2Icon},
      {type: "block", label: "QT", style: "blockquote", icon: Icons.BlockQuoteIcon}
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
