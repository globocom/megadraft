/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";

import "setimmediate";

import Modal from "backstage-modal";
import ModalPluginList from "./ModalPluginList";


export default class PluginsModal extends Component {
  constructor(props) {
    super(props);
    this.onCloseRequest = ::this.onCloseRequest;
    this.onChange = ::this.onChange;
  }

  onChange(editorState) {
    this.props.onChange(editorState);
  }

  onCloseRequest() {
    if(!this.props.isOpen) {
      return;
    }
    document.body.style.overflowY = "auto";
    this.props.handleModal();
  }

  render() {

    return (
      <div>
        <Modal
          className="modal"
          title="Blocos de conteúdo"
          isOpen={this.props.isOpen}
          onCloseRequest={this.onCloseRequest}>
            <ModalPluginList
              handleModal={this.onCloseRequest}
              plugins={this.props.plugins}
              onChange={this.onChange}
              editorState={this.props.editorState} />
        </Modal>
      </div>
    );
  }
}
