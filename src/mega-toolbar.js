/*
 * Copyright (c) 2016, bkniffler (https://github.com/bkniffler)
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {RichUtils} from "draft-js";
import Toolbar from "./toolbar";


export default class MegaToolbar extends Component {
  constructor(props) {
    super(props);

    this.inlineStyles = [
      {label: 'Bold', button: <b>B</b>, style: 'BOLD'},
      {label: 'Italic', button: <i>I</i>, style: 'ITALIC'},
      {label: 'Underline', button: <u>U</u>, style: 'UNDERLINE'}
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
      ...this.inlineStyles.map(x => ({
        button: x.button,
        label: x.label,
        active: currentStyle.has(x.style),
        toggle: () => this.toggleInlineStyle(x.style)
      })),
    ];

    return (
      <div>
        <style>{`
          .draft-toolbar .item button {
              background-color: transparent;
              border: 0;
              color: #ccc;
              box-sizing: border-box;
              cursor: pointer;
              display: block;
              font-size: 14px;
              line-height: 1.33;
              margin: 0;
              padding: 15px;
              text-decoration: none;
          }
          .draft-toolbar {
              background-color: #181818;
              border: none;
              border-radius: 50px;
              font-size: 16px;
          }
          .draft-toolbar .item {
              float: left;
              list-style: none;
              margin: 0;
              padding: 0;
              background-color: #181818;
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
          }
          .draft-toolbar .item:first-child {
              border-bottom-left-radius: 4px;
              border-top-left-radius: 4px;
              padding-left: 6px;
          }
          .draft-toolbar .item:last-child {
              border-bottom-right-radius: 4px;
              border-top-right-radius: 4px;
              padding-right: 6px;
          }

          .draft-toolbar .item.active button:hover,
          .draft-toolbar .item.active button {
              color: #3192e7;
          }

          .draft-toolbar .item button:hover {
            color: #fff;
          }
          `}
        </style>
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
