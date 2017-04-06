/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";

import {ModalBody} from "backstage-modal";
import AtomicBlocksModalItem from "./AtomicBlocksModalItem";


export default class AtomicBlocksModalList extends Component {
  constructor(props) {
    super(props);
    this.modalClose = ::this.modalClose;
    this.onChange = ::this.onChange;
  }

  modalClose() {
    this.props.toggleModalVisibility();
  }

  onChange() {
    this.props.toggleModalVisibility();
    this.props.onChange(...arguments);
  }

  render() {

    return (
      <ModalBody>
        <AtomicBlocksModalItem
          toggleModalVisibility={this.modalClose}
          atomicBlocks={this.props.atomicBlocks}
          onChange={this.onChange}
          editorState={this.props.editorState}
        />
      </ModalBody>
    );
  }
}
