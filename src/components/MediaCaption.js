/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";

import Style from "../styles/components/MediaCaptionStyle";


export default @Radium
class MediaCaption extends Component {
  constructor(props) {
    super(props);

    this.onFocus = ::this.onFocus;
    this.onBlur = ::this.onBlur;
    this._handleCaptionChange = ::this._handleCaptionChange;
    this._handleRightsHolderChange = ::this._handleRightsHolderChange;

    this.state = {
      caption: this.props.data.caption,
      rightsHolder: this.props.data.rightsHolder
    };
  }

  onFocus() {
    this.props.setReadOnly(true);
  }

  onBlur() {
    this.props.setReadOnly(false);
  }

  _handleDataChange(key, event) {
    const newState = {};
    newState[key] = event.target.value;
    this.setState(newState);
    this.props.updateEntity(newState);
  }

  _handleCaptionChange(event) {
    this._handleDataChange("caption", event);
  }

  _handleRightsHolderChange(event) {
    this._handleDataChange("rightsHolder", event);
  }

  render() {
    return (
      <div style={Style.dataBlock}>
        <input type="text"
          placeholder="Legenda"
          style={Style.field}
          value={this.state.caption}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this._handleCaptionChange} />
        <input type="text"
          placeholder="Créditos"
          style={Style.field}
          value={this.state.rightsHolder}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this._handleRightsHolderChange} />
      </div>
    );
  }
}
