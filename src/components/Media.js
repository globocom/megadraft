/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";
import {Entity, EditorState, SelectionState, Modifier} from "draft-js";

import icons from "../icons";
import MediaStyle from "../styles/components/MediaStyle";
import MediaControls from "../components/MediaControls";


export default @Radium
class Media extends Component {
  constructor(props) {
    super(props);

    this.remove = ::this.remove;
    this.updateEntity = ::this.updateEntity;
    this.setFeatured = ::this.setFeatured;

    this.onChange = this.props.blockProps.onChange;
    this.block = this.props.block;
    this.entityKey = this.block.getEntityAt(0);

    const entity = Entity.get(this.entityKey);
    this.state = {
      entityData: entity.getData()
    };

    this.dropdownItems = [
      {"key": "small", "icon": icons.MediaSmallIcon, "label": "SMALL"},
      {"key": "medium", "icon": icons.MediaMediumIcon, "label": "MEDIUM"},
      {"key": "big", "icon": icons.MediaBigIcon, "label": "BIG"}
    ];
    this.actionsItems = [
      {"key": "crop", "icon": icons.CropIcon, "action": this.crop},
      {"key": "edit", "icon": icons.EditIcon, "action": this.edit},
      {"key": "delete", "icon": icons.DeleteIcon, "action": this.remove}
    ];
    this.defaultFeatured = "medium";
  }

  edit() {
    return;
  }

  crop() {
    return;
  }

  refresh() {
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

  setFeatured(key) {
    this.updateEntity({featured: key});
  }

  updateEntity(data) {
    // Entity doesn't change editor state
    // We have to merge data, update the local state and refresh the editor state
    const newEntity = Entity.mergeData(this.entityKey, data);
    this.setState({entityData: newEntity.getData()});
    this.refresh();
  }

  render() {
    const entity = Entity.get(this.entityKey);
    const data = this.state.entityData;
    const type = entity.getType();
    const plugins = this.props.blockProps.plugins;
    const setReadOnly = this.props.blockProps.setReadOnly;
    for (let plugin of plugins) {
      if (type === plugin.type) {
        const Block = plugin.blockComponent;
        return (
          <div style={MediaStyle.blockHover}>
            <div style={MediaStyle.blockWrapper}>
              <MediaControls
                dropdownItems={this.dropdownItems}
                actionsItems={this.actionsItems}
                selectedFeatured={data.featured || this.defaultFeatured}
                setFeatured={this.setFeatured} />
              <Block
                data={data}
                setReadOnly={setReadOnly}
                updateEntity={this.updateEntity} />
            </div>
          </div>
        );
      }
    }
  }
}
