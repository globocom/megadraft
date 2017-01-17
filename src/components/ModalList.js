/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";

import "setimmediate";

import { ModalBody } from "backstage-modal";
import PluginItems from "./PluginItems";


export default class ModalList extends Component {
  constructor(props) {
    super(props);
    this.onChange = ::this.onChange;
    this.modalClose = ::this.modalClose;
  }

  onChange(editorState) {
    this.props.onChange(editorState);
  }

  modalClose() {
    this.props.handleModal();
  }

  render() {

    return (
      <div>
        <ModalBody>
            <PluginItems
              handleModal={this.modalClose}
              plugins={this.props.plugins}
              onChange={this.onChange}
              editorState={this.props.editorState}/>
        </ModalBody>
      </div>
    );
  }
}
