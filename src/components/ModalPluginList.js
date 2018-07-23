/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from "react";

import { ModalBody } from "backstage-modal";
import ModalPluginItem from "./ModalPluginItem";

export default class ModalPluginList extends Component {
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
        <ModalPluginItem
          toggleModalVisibility={this.modalClose}
          plugins={this.props.plugins}
          onChange={this.onChange}
          editorState={this.props.editorState}
        />
      </ModalBody>
    );
  }
}
