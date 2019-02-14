/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { EditorState, RichUtils } from "draft-js";
import classNames from "classnames";
import ToolbarItem from "./ToolbarItem";
import { getSelectionCoords, getSelectedBlocksMap } from "../utils";

export default class Toolbar extends Component {
  static defaultProps = {
    shouldDisplayToolbarFn(props, state) {
      return (
        (props.editorHasFocus || state.editingEntity) &&
        !props.editorState.getSelection().isCollapsed()
      );
    }
  };
  static propTypes = {
    editorHasFocus: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      editingEntity: null,
      link: "",
      error: null
    };
    this.renderButton = ::this.renderButton;
    this.cancelEntity = ::this.cancelEntity;
    this.removeEntity = ::this.removeEntity;
    this.setError = ::this.setError;
    this.cancelError = ::this.cancelError;
  }

  toggleInlineStyle(inlineStyle) {
    const newEditorState = RichUtils.toggleInlineStyle(
      this.props.editorState,
      inlineStyle
    );
    this.props.onChange(newEditorState);
  }

  toggleBlockType(blockType) {
    const { editorState } = this.props;
    const currentContentState = editorState.getCurrentContent();
    const selectedBlockMap = getSelectedBlocksMap(editorState);
    const newBlockMap = selectedBlockMap.map(block => {
      if (block.get("type") !== "atomic") {
        return block.set("type", blockType);
      }
      return block;
    });
    const newContentState = currentContentState.set("blockMap", newBlockMap);
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "change-block-type"
    );

    this.props.onChange(newEditorState);
  }

  toggleEntity(entity) {
    this.setState({ editingEntity: entity });
  }

  renderButton(item, position) {
    let current = null;
    let toggle = null;
    let active = null;
    let key = item.label;

    switch (item.type) {
      case "custom": {
        key = "custom-" + position;
        toggle = () => item.action(this.props.editorState, this.props.onChange);
        break;
      }
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
        toggle = () => this.toggleBlockType(item.style);
        active = item.style === current;
        break;
      }
      case "separator": {
        key = "sep-" + position;
        break;
      }
      case "entity": {
        const { entity = "LINK" } = item;
        key = "entity-" + entity;
        toggle = () => this.toggleEntity(entity);
        active = this.hasEntity(entity) || this.hasStyle(item.style);
        break;
      }
    }

    return (
      <ToolbarItem key={key} active={active} toggle={toggle} item={item} />
    );
  }

  setError(errorMsg) {
    this.setState({ error: errorMsg });
  }

  cancelError() {
    this.setState({ error: null });
  }

  setBarPosition() {
    const editor = this.props.editor;
    const toolbar = this.toolbarEl;
    const selectionCoords = getSelectionCoords(editor, toolbar);

    if (!selectionCoords) {
      return null;
    }

    if (
      (selectionCoords && !this.state.position) ||
      this.state.position.top !== selectionCoords.offsetTop ||
      this.state.position.left !== selectionCoords.offsetLeft ||
      this.state.arrowStyle !== selectionCoords.arrowStyle ||
      !this.state.show
    ) {
      this.setState({
        show: true,
        position: {
          top: selectionCoords.offsetTop,
          left: selectionCoords.offsetLeft
        },
        arrowStyle: selectionCoords.arrowStyle
      });
    }
  }

  handleSetToolbar() {
    if (this.props.shouldDisplayToolbarFn(this.props, this.state)) {
      this.shouldUpdatePos = false;
      return this.setBarPosition();
    } else {
      if (this.state.show) {
        this.setState({
          show: false,
          editingEntity: null,
          link: "",
          error: null
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const currentContentState = this.props.editorState.getCurrentContent();
    const newContentState = nextProps.editorState.getCurrentContent();

    if (currentContentState === newContentState) {
      this.shouldUpdatePos = true;
    }
  }

  componentDidUpdate() {
    if (this.shouldUpdatePos) {
      this.handleSetToolbar();
    }
  }

  getCurrentEntityKey() {
    const selection = this.props.editorState.getSelection();
    const anchorKey = selection.getAnchorKey();
    const contentState = this.props.editorState.getCurrentContent();
    const anchorBlock = contentState.getBlockForKey(anchorKey);
    const offset = selection.anchorOffset;
    const index = selection.isBackward ? offset - 1 : offset;
    return anchorBlock.getEntityAt(index);
  }

  getCurrentEntity() {
    const contentState = this.props.editorState.getCurrentContent();
    const entityKey = this.getCurrentEntityKey();
    if (entityKey) {
      return contentState.getEntity(entityKey);
    }
    return null;
  }

  hasStyle(style) {
    const current = this.props.editorState.getCurrentInlineStyle();
    const withStyle = current.filter((val, key) => key.startsWith(style));
    return withStyle.size > 0;
  }

  hasEntity(entityType) {
    const entity = this.getCurrentEntity();
    if (entity && entity.getType() === entityType) {
      return true;
    }
    return false;
  }

  setEntity(entityType, data, mutability = "MUTABLE") {
    const { editorState } = this.props;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      entityType,
      mutability,
      data
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newState = RichUtils.toggleLink(
      editorState,
      editorState.getSelection(),
      entityKey
    );
    const selectionState = EditorState.forceSelection(
      newState,
      editorState.getSelection()
    );

    this.props.onChange(selectionState);
  }

  removeEntity() {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      // toggleLink should be named toggleEntity: https://github.com/facebook/draft-js/issues/737
      this.props.onChange(RichUtils.toggleLink(editorState, selection, null));
    }
    this.cancelEntity();
  }

  cancelEntity() {
    this.setState(
      {
        editingEntity: null,
        error: null
      },
      () => {
        this.props.draft && this.props.draft.focus();
      }
    );
  }
  renderEntityInput(entityType) {
    if (!this.props.entityInputs) {
      console.warn("no entityInputs provided");
      return null;
    }
    const Component = this.props.entityInputs[entityType];
    const setEntity = (data, mutability) =>
      this.setEntity(entityType, data, mutability);
    let entityData = {};
    let entity = null;
    if (this.hasEntity(entityType)) {
      entity = this.getCurrentEntity();
      if (entity) {
        entityData = entity.getData();
      }
    }
    if (Component) {
      return (
        <Component
          i18n={this.props.i18n}
          editorState={this.props.editorState}
          setEntity={setEntity}
          entityType={entityType}
          onChange={this.props.onChange}
          cancelEntity={this.cancelEntity}
          removeEntity={this.removeEntity}
          setError={this.setError}
          cancelError={this.cancelError}
          entity={entity}
          {...entityData}
        />
      );
    } else {
      console.warn("unknown entity type: " + entityType);
      return null;
    }
  }
  renderToolList() {
    return (
      <ul className="toolbar__list">
        {this.props.actions.map(this.renderButton)}
      </ul>
    );
  }
  render() {
    if (
      this.props.readOnly &&
      !this.props.shouldDisplayToolbarFn(this.props, this.state)
    ) {
      return null;
    }

    const toolbarClass = classNames("toolbar", {
      "toolbar--open": this.state.show,
      "toolbar--error": this.state.error
    });

    return (
      <div
        className={toolbarClass}
        style={this.state.position}
        ref="toolbarWrapper"
      >
        <div style={{ position: "absolute", bottom: 0 }}>
          <div
            className="toolbar__wrapper"
            ref={el => {
              this.toolbarEl = el;
            }}
            onMouseDown={e => {
              if (e.target.localName !== "input") {
                e.preventDefault();
              }
            }}
          >
            {this.state.editingEntity
              ? this.renderEntityInput(this.state.editingEntity)
              : this.renderToolList()}
            <p className="toolbar__error-msg">{this.state.error}</p>
            <span
              className="toolbar__arrow"
              ref={el => {
                this.arrowEl = el;
              }}
              style={this.state.arrowStyle}
            />
          </div>
        </div>
      </div>
    );
  }
}
