/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {Editor, RichUtils} from "draft-js";

import Icons from "./icons";
import Toolbar from "./toolbar";
import {getSelectionRange, getSelectedBlockElement, getSelectionCoords} from "./utils";


export default class Megadraft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolbar: {show: false}
    };

    this.actions = [
      {type: "inline", label: "B", style: "BOLD", icon: Icons.BoldIcon},
      {type: "inline", label: "I", style: "ITALIC", icon: Icons.ItalicIcon},
      {type: "separator", label: null, style: null, icon: Icons.SeparatorIcon},
      {type: "block", label: "UL", style: "unordered-list-item", icon: Icons.ULIcon},
      {type: "block", label: "OL", style: "ordered-list-item", icon: Icons.OLIcon},
      {type: "block", label: "H2", style: "header-two", icon: Icons.H2Icon},
      {type: "block", label: "QT", style: "blockquote", icon: Icons.BlockQuoteIcon}
    ];
  }

  onChange(editorState) {
    if (!editorState.getSelection().isCollapsed()) {
      const selectionRange = getSelectionRange();
      const selectionCoords = getSelectionCoords(selectionRange);
      this.setState({
        toolbar: {
          show: true,
          position: {
            top: selectionCoords.offsetTop,
            left: selectionCoords.offsetLeft
          }
        }
      });
    } else {
      this.setState({toolbar: {show: false}});
    }

    const selectionRange = getSelectionRange();
    let selectedBlock;
    if (selectionRange) {
      selectedBlock = getSelectedBlockElement(selectionRange);
    }

    this.setState({selectedBlock, selectionRange});
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

  showToolbar(editorState) {
    if (this.state.toolbar.show) {
      return (
        <Toolbar
          editorState={editorState}
          onChange={::this.onChange}
          toolbar={this.state.toolbar}
          actions={this.actions}/>
      );
    } else {
      return null;
    }
  }

  render() {
    const {editorState} = this.props;
    return (
      <div className="megadraft">
        <div className="megadraft-editor" id="megadraft-editor">
          <Editor
            handleKeyCommand={::this.handleKeyCommand}
            editorState={editorState}
            onChange={::this.onChange} />
          {::this.showToolbar(editorState)}
        </div>
      </div>
    );
  }
}
