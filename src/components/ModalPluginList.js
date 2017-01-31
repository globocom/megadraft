/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";

import { ModalBody } from "backstage-modal";
import ModalPluginItem from "./ModalPluginItem";


export default class ModalPluginList extends Component {
  constructor(props) {
    super(props);
    this.onChange = ::this.onChange;
    this.modalClose = ::this.modalClose;
  }

  onChange(editorState) {
    this.props.onChange(editorState);
  }

  modalClose() {
    this.props.toggleModalVisibility();
  }

  render() {

    return (
      <div>
        <ModalBody>
          <ModalPluginItem
            toggleModalVisibility={this.modalClose}
            plugins={this.props.plugins}
            onChange={this.onChange}
            editorState={this.props.editorState}
          />
        </ModalBody>
      </div>
    );
  }
}
