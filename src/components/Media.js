/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {Entity, EditorState, SelectionState, Modifier} from "draft-js";

import MediaWrapper from "./MediaWrapper";


export default class Media extends Component {
  constructor(props) {
    super(props);

    this.remove = ::this.remove;
    this.updateEntity = ::this.updateEntity;

    this.onChange = this.props.blockProps.onChange;
    this.block = this.props.block;
    this.entityKey = this.block.getEntityAt(0);

    const entity = Entity.get(this.entityKey);
    this.state = {
      entityData: entity.getData()
    };
  }

  _refreshEditor() {
    const {editorState} = this.props.blockProps;
    this.onChange(editorState);
  }

  remove() {
    const {editorState} = this.props.blockProps;
    const content = editorState.getCurrentContent();
    const targetRange = new SelectionState({
      anchorKey: this.block.key,
      anchorOffset: 0,
      focusKey: this.block.key,
      focusOffset: this.block.getLength()
    });

    const withoutMedia = Modifier.removeRange(content, targetRange, "backward");
    const resetBlock = Modifier.setBlockType(
      withoutMedia,
      withoutMedia.getSelectionAfter(),
      "unstyled"
    );

    const newState = EditorState.push(editorState, resetBlock, "remove-range");
    const newEditorState = EditorState.forceSelection(
      newState, resetBlock.getSelectionAfter()
    );
    this.onChange(newEditorState);
  }

  updateEntity(data) {
    // Entity doesn't change editor state
    // We have to merge data, update the local state and refresh the editor state
    const newEntity = Entity.mergeData(this.entityKey, data);
    this.setState({entityData: newEntity.getData()});
    this._refreshEditor();
  }

  render() {
    const data = this.state.entityData;
    const {plugin, setReadOnly} = this.props.blockProps;
    const Block = plugin.blockComponent;
    return (
      <MediaWrapper setReadOnly={setReadOnly}>
        <Block data={data} container={this} blockProps={this.props.blockProps} />
      </MediaWrapper>
    );
  }
}
