/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";


export default class MediaWrapper extends Component {

  constructor(props){
    super(props);

    this._handleFocus = ::this._handleFocus;
    this._handleBlur = ::this._handleBlur;
  }

  _handleFocus() {
    // temporarily set the editor to readonly
    this.props.setReadOnly(true);
  }

  _handleBlur() {
    // restore readonly to its original state
    this.props.setInitialReadOnly();
  }

  render() {
    return (
      <div onBlur={this._handleBlur} onFocus={this._handleFocus}>
        {this.props.children}
      </div>
    );
  }
}
