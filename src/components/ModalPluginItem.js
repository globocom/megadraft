/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";


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
    this.props.toggleModalVisibility();
  }

  handleClick(e) {
    this.refs.myButton.onClick(e);
  }

  render() {
    return (
    <ul className="megadraft-modal__items">
      {this.props.plugins.slice(3).map((item) => {
        const Button = item.buttonComponent;
        return (
        <li
          key={item.type}
          className="megadraft-modal__item"
          onClick={this.modalClose}>
          <Button
            ref="myButton"
            className="megadraft-modal__button"
            title={item.title}
            editorState={this.props.editorState}
            onChange={this.onChange} />
          <p
            onClick={this.handleClick}
            className="megadraft-modal__button__label">
            {item.title}
          </p>
        </li>
        );
      })}
    </ul>
    );
  }
}
