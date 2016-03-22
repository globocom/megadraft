/*
 * Copyright (c) 2016, bkniffler (https://github.com/bkniffler)
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {RichUtils} from "draft-js";
import Toolbar from "./toolbar";
import BoldIcon from "./icons/bold.svg";
import ItalicIcon from "./icons/italic.svg";


export default class MegaToolbar extends Component {
  constructor(props) {
    super(props);

    this.inlineStyles = [
      {label: 'Bold', style: 'BOLD', icon: BoldIcon},
      {label: 'Italic', style: 'ITALIC', icon: ItalicIcon},
    ];
  }

  getSelected() {
    let t = '';
    if (window.getSelection) {
      t = window.getSelection();
    } else if (document.getSelection) {
      t = document.getSelection();
    } else if (document.selection) {
      t = document.selection.createRange().text;
    }
    return t;
  }

  getSelectionRect(selected) {
    const _rect = selected.getRangeAt(0).getBoundingClientRect();
    let rect = _rect && _rect.top ? _rect : selected.getRangeAt(0).getClientRects()[0];
    if (!rect) {
      if (selected.anchorNode && selected.anchorNode.getBoundingClientRect) {
        rect = selected.anchorNode.getBoundingClientRect();
        rect.isEmptyline = true;
      }
      else {
        return null;
      }
    }
    return rect;
  }

  toggleInlineStyle(inlineStyle) {
    this.props.onChange(
      RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle)
    )
  }

  rawStyle() {
    return {__html: `
      .draft-toolbar {
        background-color: #181818;
        position: relative;
        border-radius: 4px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
      }
      .draft-toolbar:after {
        display: inline-block;
        top: 100%;
        left: 50%;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border: solid transparent;
        border-top-color: #181818;
        border-width: 8px;
        margin-left: -8px;
      }

      .draft-toolbar ul {
        padding: 0;
      }

      .draft-toolbar .item {
        display: inline-block;
      }

      .draft-toolbar .item button {
        color: #ccc;
        cursor: pointer;
        font-size: 18px;
        border: 0;
        height: 56px;
        width: 56px;
        background: transparent;
      }
      .draft-toolbar .item.active button:hover,
      .draft-toolbar .item.active button {
        color: #3192e7;
      }
      .draft-toolbar .item button:hover {
        color: #fff;
      }
      `
    };
  }

  render() {
    const {editorState} = this.props;

    const selected = this.getSelected();
    if (!selected.rangeCount) {
      return null;
    }

    const selectionState = editorState.getSelection();
    if (selectionState.isCollapsed()) {
      return null;
    }

    const rect = this.getSelectionRect(selected);
    const info = {left: rect.left, top: rect.top, width: rect.width};
    const currentStyle = editorState.getCurrentInlineStyle();
    const items = [
      ...this.inlineStyles.map(inlineStyle => ({
        style: inlineStyle,
        active: currentStyle.has(inlineStyle.style),
        toggle: () => this.toggleInlineStyle(inlineStyle.style)
      })),
    ];

    return (
      <div>
        <style dangerouslySetInnerHTML={this.rawStyle()}></style>
        <Toolbar
          {...info}
          actions={items}
          editorState={editorState}
          selectionState={selectionState}
          onChange={this.props.onChange} />
      </div>
    );
  }
}
