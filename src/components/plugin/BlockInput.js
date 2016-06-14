/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";

import icons from "../../icons";


export default class BlockInput extends Component {
  renderError(error) {
    if (!error) {
      return;
    }
    return (
      <div className="block__input__error-text">{error}</div>
    );
  }

  render(){
    const {value, error, ...props} = this.props;
    let className = "block__input";
    if (!value) {
      className += " block__input--empty";
    }
    if (error) {
      className += " block__input--error";
    }

    return (
      <div className="block__input__row">
        <div className="block__input__wrapper">
          <input {...props} defaultValue={value} type="text" className={className} />
          <icons.EditIcon className="block__input__icon" />
        </div>
        {this.renderError(error)}
      </div>
    );
  }
}
