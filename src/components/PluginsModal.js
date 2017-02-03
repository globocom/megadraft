/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";

import Modal from "backstage-modal";
import ModalPluginList from "./ModalPluginList";


export default class PluginsModal extends Component {
  constructor(props) {
    super(props);
    this.onCloseRequest = ::this.onCloseRequest;
  }

  onCloseRequest() {
    if(!this.props.isOpen) {
      return;
    }
    document.body.classList.remove("megadraft-modal--open");
    this.props.toggleModalVisibility();
  }

  render() {

    return (
      <Modal
        className="megadraft-modal"
        title="Blocos de conteúdo"
        isOpen={this.props.isOpen}
        onCloseRequest={this.onCloseRequest}
        width={528}
        height={393} >
        <ModalPluginList
          toggleModalVisibility={this.onCloseRequest}
          plugins={this.props.plugins}
          onChange={this.props.onChange}
          editorState={this.props.editorState}
        />
      </Modal>
    );
  }
}
