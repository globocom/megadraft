/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {EditorState, RichUtils, Entity} from "draft-js";
import classNames from "classnames";
import ToolbarItem from "./ToolbarItem";
import {getSelectionCoords} from "../utils";


export default class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      editingEntity: null,
      link: ""
    };
    this.renderButton = ::this.renderButton;
    this.cancelEntity = ::this.cancelEntity;
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

  toggleEntity(entity) {
    if (this.hasEntity(entity)) {
      this.removeEntity();
    } else {
      this.setState({editingEntity: entity});
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
        const {entity = "LINK"} = item;
        key = "entity-"+entity;
        toggle = () => this.toggleEntity(entity);
        active = this.hasEntity(entity);
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
          editingEntity: null,
          link: ""
        });
      }
    }
  }

  hasEntity(entityType) {
    const selection = this.props.editorState.getSelection();
    const anchorKey = selection.getAnchorKey();
    const contentState = this.props.editorState.getCurrentContent();
    const anchorBlock = contentState.getBlockForKey(anchorKey);
    const offset = selection.anchorOffset;
    const index = selection.isBackward ? offset - 1 : offset;
    const entityKey = anchorBlock.getEntityAt(index);
    if (entityKey !== null) {
      const entity = Entity.get(entityKey);
      if (entity.getType() === entityType) {
        return true;
      }
    }
    return false;
  }

  setEntity(entityType, data) {
    const {editorState} = this.props;
    const entityKey = Entity.create(entityType, "MUTABLE", data);
    const newState = RichUtils.toggleLink(
      editorState,
      editorState.getSelection(),
      entityKey
    );
    this.props.onChange(
      EditorState.forceSelection(
        newState, editorState.getSelection()
      )
    );
  }

  removeEntity() {
    const {editorState} = this.props;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      // toggleLink should be named toggleEntity: https://github.com/facebook/draft-js/issues/737
      this.props.onChange(RichUtils.toggleLink(editorState, selection, null));
    }
  }

  cancelEntity() {
    this.props.editor && this.props.editor.focus();
    this.setState({
      editingEntity: null
    });
  }
  renderEntityInput(entityType) {
    if(!this.props.entityInputs) {
      console.warn("no entityInputs provided");
      return null;
    }
    const Component = this.props.entityInputs[entityType];
    const setEntity = data => this.setEntity(entityType, data);
    if(Component) {
      return (
        <Component
          editorState={this.props.editorState}
          setEntity={setEntity}
          entityType={entityType}
          onChange={this.props.onChange}
          cancelEntity={this.cancelEntity}/>
      );
    } else {
      console.warn("unknown entity type: "+entityType);
      return null;
    }
  }
  renderToolList() {
    return (
      <ul className="toolbar__list" onMouseDown={(x) => {x.preventDefault();}}>
        {this.props.actions.map(this.renderButton)}
      </ul>
    );
  }
  render() {
    if(this.props.readOnly) {
      return null;
    }
    const toolbarClass = classNames("toolbar", {
      "toolbar--open": this.state.show
    });

    return (
      <div className={toolbarClass}
           style={this.state.position}
           ref="toolbarWrapper">
        <div className="toolbar__wrapper" ref="toolbar">
          {
            this.state.editingEntity ?
            this.renderEntityInput(this.state.editingEntity) :
            this.renderToolList()
          }
          <span className="toolbar__arrow" />
        </div>
      </div>
    );
  }
}
