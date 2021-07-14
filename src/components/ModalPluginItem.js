/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from "react";

import { ActionsContext } from "./ActionsProvider";
import { PLUGINS_MODAL_ADD_PLUGIN } from "../constants";

export default class ModalPluginItem extends Component {
  static contextType = ActionsContext;

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  handleClick(e) {
    this.buttonEl.onClick(e);
  }

  closeModal() {
    this.props.toggleModalVisibility();
  }

  renderButton(item) {
    const Button = item.buttonComponent;

    return (
      <li
        key={item.type}
        className="megadraft-modal__item"
        onClick={() => {
          this.context.onAction({
            type: PLUGINS_MODAL_ADD_PLUGIN,
            pluginName: item.title
          });
          this.closeModal();
        }}
      >
        <Button
          ref={el => {
            this.buttonEl = el;
          }}
          className="megadraft-modal__button"
          title={item.title}
          editorState={this.props.editorState}
          onChange={this.props.onChange}
        />
        <p
          className="megadraft-modal__button__label"
          onClick={this.handleClick}
        >
          {item.title}
        </p>
      </li>
    );
  }

  render() {
    return (
      <ul className="megadraft-modal__items">
        {this.props.plugins.map(this.renderButton)}
      </ul>
    );
  }
}
