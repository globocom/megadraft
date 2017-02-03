/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";


export default class ModalPluginItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = ::this.handleClick;
    this.closeModal = ::this.closeModal;
  }

  handleClick(e) {
    this.myButton.onClick(e);
  }

  closeModal() {
    this.props.toggleModalVisibility();
  }

  render() {
    return (
    <ul className="megadraft-modal__items">
      {this.props.plugins.map((item) => {
        const Button = item.buttonComponent;
        return (
        <li
          key={item.type}
          className="megadraft-modal__item"
          onClick={this.closeModal} >
          <Button
            ref={(button)=>{this.myButton = button;}}
            className="megadraft-modal__button"
            title={item.title}
            editorState={this.props.editorState}
            onChange={this.props.onChange} />
          <p
            className="megadraft-modal__button__label"
            onClick={this.handleClick} >
            {item.title}
          </p>
        </li>
        );
      })}
    </ul>
    );
  }
}
