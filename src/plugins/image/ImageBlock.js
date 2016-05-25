/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";
import BlockStyle from "../../styles/plugins/BlockStyle";
import ImageBlockStyle from "./ImageBlockStyle";

export default @Radium
class ImageBlock extends Component {
  constructor(props) {
    super(props);

    this._handleFocus = ::this._handleFocus;
    this._handleBlur = ::this._handleBlur;
    this._handleCaptionChange = ::this._handleCaptionChange;
    this._handleRightsHolderChange = ::this._handleRightsHolderChange;

    this.state = {
      caption: this.props.data.caption,
      rightsHolder: this.props.data.rightsHolder
    };
  }

  _handleFocus() {
    this.props.setReadOnly(true);
  }

  _handleBlur() {
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

  render(){
    return (
      <div style={ImageBlockStyle.wrapper}>
        <div style={ImageBlockStyle.imageWrapper}>
          <img style={ImageBlockStyle.image} src={this.props.data.src} alt=""/>
        </div>
        <div style={BlockStyle.dataBlock}>
          <input type="text"
            placeholder="Caption"
            style={BlockStyle.dataField}
            value={this.state.caption}
            onFocus={this._handleFocus}
            onBlur={this._handleBlur}
            onChange={this._handleCaptionChange} />
          <input type="text"
            placeholder="Rights Holder"
            style={BlockStyle.dataField}
            value={this.state.rightsHolder}
            onFocus={this._handleFocus}
            onBlur={this._handleBlur}
            onChange={this._handleRightsHolderChange} />
        </div>
      </div>
    );
  }
};
