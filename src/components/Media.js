/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {EditorState, SelectionState, Modifier} from "draft-js";

import MediaWrapper from "./MediaWrapper";


export default class Media extends Component {
  constructor(props) {
    super(props);

    this.remove = ::this.remove;
    this.updateData = ::this.updateData;

    this.onChange = this.props.blockProps.onChange;
  }

  remove() {
    const {editorState} = this.props.blockProps;
    const content = editorState.getCurrentContent();
    const targetRange = new SelectionState({
      anchorKey: this.props.block.key,
      anchorOffset: 0,
      focusKey: this.props.block.key,
      focusOffset: this.props.block.getLength()
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

  updateData(data) {
    const {editorState} = this.props.blockProps;
    const content = editorState.getCurrentContent();
    const selection = new SelectionState({
      anchorKey: this.props.block.key,
      anchorOffset: 0,
      focusKey: this.props.block.key,
      focusOffset: this.props.block.getLength()
    });

    const newContentState = Modifier.mergeBlockData(content, selection, data);
    const newEditorState =  EditorState.push(editorState, newContentState);

    this.onChange(newEditorState);
  }

  render() {
    // Should we use immutables?
    const data = this.props.block.getData().toJS();
    const {plugin, setReadOnly} = this.props.blockProps;
    const Block = plugin.blockComponent;
    return (
      <MediaWrapper setReadOnly={setReadOnly}>
        <Block data={data} container={this} blockProps={this.props.blockProps} />
      </MediaWrapper>
    );
  }
}
