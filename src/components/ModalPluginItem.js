/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";

import "setimmediate";


export default class ModalPluginItem extends Component {
  constructor(props) {
    super(props);
    this.onChange = ::this.onChange;
    this.modalClose = ::this.modalClose;
    this.handleClick = ::this.handleClick;
  }

  onChange(editorState) {
    this.props.onChange(editorState);
  }

  modalClose(e) {
    this.props.handleModal();
  }

  handleClick(e) {
    this.refs.myButton.onClick(e);
  }

  render() {
    return (
    <ul className="modal__items">
    {this.props.plugins.slice(3).map((item) => {
      const Button = item.buttonComponent;
      return (
    <li
      key={item.type}
      className="modal__item"
      onClick={this.modalClose}>
        <Button
          className="modal__button"
          title={item.title}
          editorState={this.props.editorState}
          onChange={this.onChange} />
        <p
          onClick={this.handleClick}
          className="modal__button__label">
          {item.title}
        </p>
    </li>
      );
    })}
    </ul>
    );
  }
}
