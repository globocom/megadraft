/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {RichUtils} from "draft-js";
import ToolbarItem from "./toolbar_item";


export default class Toolbar extends Component {
  constructor(props) {
    super(props);
  }

  toggleInlineStyle(inlineStyle) {
    this.props.onChange(
      RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle)
    );
  }

  toggleBlockStyle(blockType) {
    this.props.onChange(
      RichUtils.toggleBlockType(this.props.editorState, blockType)
    );
  }

  rawStyle() {
    return {__html: `
      .draft-toolbar {
        background-color: #181818;
        border-radius: 4px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
        position: absolute;
        white-space: nowrap;
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
        margin: 0;
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

  renderButton(item) {
    let current = null;
    let toggle = null;
    let active = null;

    switch(item.type) {
      case "inline": {
        current = this.props.editorState.getCurrentInlineStyle();
        toggle = () => this.toggleInlineStyle(item.style);
        active = current.has(item.style);
        break;
      }
      case "block": {
        const selection = this.props.editorState.getSelection();
        current = this.props.editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType();
        toggle = () => this.toggleBlockStyle(item.style);
        active = item.style === current;
        break;
      }
    }

    return (
      <ToolbarItem key={item.label} active={active} toggle={toggle} item={item} />
    );
  }

  render() {
    const style = this.props.toolbar.position || {};

    if (!this.props.toolbar.show) {
      style.display = "none"
    }

    return (
      <div
        className="draft-toolbar"
        style={style}
        ref="toolbar"
        onMouseDown={(x) => {x.preventDefault();}}>
        <style dangerouslySetInnerHTML={this.rawStyle()}></style>
        <ul>
          {this.props.actions.map(::this.renderButton)}
        </ul>
      </div>
    );
  }
}
