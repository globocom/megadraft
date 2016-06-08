/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {RichUtils, Entity} from "draft-js";

import LinkInput from "./LinkInput";
import ToolbarItem from "./ToolbarItem";
import {getSelectionCoords} from "../utils";


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
    let toolbarClass = "toolbar";

    if (this.state.show) {
      toolbarClass += " toolbar--open";
    }

    if (this.state.editingLink) {
      toolbarClass += " toolbar--editing-link";
    }

    return (
      <div className={toolbarClass}
           style={this.state.position}
           ref="toolbarWrapper">
        <div className="toolbar__wrapper" ref="toolbar">
          <ul className="toolbar__list" onMouseDown={(x) => {x.preventDefault();}}>
            {this.props.actions.map(::this.renderButton)}
          </ul>
          <LinkInput
            ref="textInput"
            editorState={this.props.editorState}
            onChange={this.props.onChange}
            editingLink={this.state.editingLink}
            editor={this.props.editor}
            cancelLink={::this.cancelLink}/>
          <span className="toolbar__arrow" />
        </div>
      </div>
    );
  }
}
