/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";


export default @Radium
class MediaWrapper extends Component {

  constructor(props){
    super(props);

    this._handleFocus = ::this._handleFocus;
    this._handleBlur = ::this._handleBlur;
  }

  _handleFocus() {
    this.props.setReadOnly(true);
  }

  _handleBlur() {
    this.props.setReadOnly(false);
  }

  render() {
    return (
      <div onBlur={this._handleBlur} onFocus={this._handleFocus}>
        {this.props.children}
      </div>
    );
  }
};
