/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {RichUtils, Entity} from "draft-js";
import ToolbarItem from "./ToolbarItem";

import {getSelectionCoords} from "./utils";
import LinkInput from "./components/LinkInput";

export default class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      editingLink: false,
      link: ""
    };
  }

  toggleInlineStyle(inlineStyle) {
    const newEditorState = RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle);
    this.props.onChange(newEditorState);
  }

  toggleBlockStyle(blockType) {
    this.props.onChange(
      RichUtils.toggleBlockType(this.props.editorState, blockType)
    );
  }

  toggleLink() {
    if (this.hasLink()) {
      this.unlink();
    } else {
      this.setState({editingLink: true});
    }
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
        padding: 0 8px;
        margin: 0;
      }
      .draft-toolbar .item {
        display: inline-block;
      }
      .draft-toolbar .item button {
        padding: 0;
        color: #ccc;
        cursor: pointer;
        border: 0;
        height: 56px;
        width: 40px;
        background: transparent;
      }
      .draft-toolbar .item.active button:hover,
      .draft-toolbar .item.active button {
        color: #3192e7;
      }
      .draft-toolbar .item button:hover {
        color: #fff;
      }
      .draft-toolbar .separator {
        border-right: 1px solid #333;
        height: 20px;
        margin: 0 8px;
      }
      .textInput::placeholder {
        color: #ccc;
      }
      .textInput {
        background-color: transparent;
        border: none;
        font-size: 14px;
        color: #fafafa;
        width: 250px;
        margin: 20px;
        padding: 0;
      }
      .textInput:focus {
        outline: none;
      }
      `
    };
  }

  renderButton(item, position) {
    let current = null;
    let toggle = null;
    let active = null;
    let key = item.label;

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
      case "separator": {
        key = "sep-" + position;
        break;
      }
      case "entity": {
        toggle = () => this.toggleLink();
        active = this.hasLink();
        break;
      }
    }

    return (
      <ToolbarItem key={key} active={active} toggle={toggle} item={item} />
    );
  }

  setBarPosition() {
    const editor = this.props.editor;
    const toolbar = this.refs.toolbar;
    const selectionCoords = getSelectionCoords(editor, toolbar);

    if (!selectionCoords) {
      return null;
    }

    if (selectionCoords &&
        !this.state.position ||
        this.state.position.top !== selectionCoords.offsetTop ||
        this.state.position.left !== selectionCoords.offsetLeft) {
      this.setState({
        show: true,
        position: {
          top: selectionCoords.offsetTop,
          left: selectionCoords.offsetLeft
        }
      });
    }
  }

  componentDidUpdate() {
    if (!this.props.editorState.getSelection().isCollapsed()) {
      return this.setBarPosition();
    } else {
      if (this.state.show) {
        this.setState({
          show: false,
          editingLink: false,
          link: ""
        });
      }
    }
  }

  hasLink() {
    const selection = this.props.editorState.getSelection();
    const anchorKey = selection.getAnchorKey();
    const contentState = this.props.editorState.getCurrentContent();
    const anchorBlock = contentState.getBlockForKey(anchorKey);
    const entityKey = anchorBlock.getEntityAt(selection.anchorOffset);
    if (entityKey) {
      const entity = Entity.get(entityKey);
      if (entity.getType() === "LINK") {
        return true;
      }
    }
    return false;
  }

  unlink() {
    const {editorState} = this.props;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.props.onChange(RichUtils.toggleLink(editorState, selection, null));
    }
  }

  cancelLink() {
    this.setState({
      editingLink: false
    });
  }

  render() {
    var style = this.state.position || {};

    if (!this.state.show) {
      style = {...style, display: "none"};
    }

    return (
      <div
        className="draft-toolbar"
        style={style}
        ref="toolbar">
        <style dangerouslySetInnerHTML={this.rawStyle()}></style>
        <ul style={this.state.editingLink? {display: "none"}: {}}
            onMouseDown={(x) => {x.preventDefault();}}>
          {this.props.actions.map(::this.renderButton)}
        </ul>
        <LinkInput
          ref="textInput"
          editorState={this.props.editorState}
          onChange={this.props.onChange}
          editingLink={this.state.editingLink}
          editor={this.props.editor}
          cancelLink={::this.cancelLink}/>
      </div>
    );
  }
}
