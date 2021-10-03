/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from "react";
import icons from "../icons";

class LinkInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: (props && props.url) || ""
    };
    this.onLinkChange = this.onLinkChange.bind(this);
    this.onLinkKeyDown = this.onLinkKeyDown.bind(this);
  }

  setLink(event) {
    let { url } = this.state;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `http://${url}`;
    }

    // https://gist.github.com/dperini/729294
    // Author: Diego Perini
    // License: MIT
    // Updated: 2018/09/12
    const expression = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

    const regex = new RegExp(expression);
    const { i18n } = this.props;

    if (!url.match(regex)) {
      const errorMsg = i18n["Invalid Link"];

      this.props.setError(errorMsg);
      this.textInput.focus();
      return;
    }

    this.props.setEntity({ url });

    this.reset();

    // Force blur to work around Firefox's NS_ERROR_FAILURE
    event.target.blur();
  }

  reset() {
    this.setState({
      url: ""
    });

    this.props.cancelEntity();
  }

  onLinkChange(event) {
    event.stopPropagation();
    const url = event.target.value;

    if (url === "") {
      this.props.cancelError();
    }

    this.setState({ url: url });
  }

  onLinkKeyDown(event) {
    if (event.key == "Enter") {
      event.preventDefault();
      this.setLink(event);
    } else if (event.key == "Escape") {
      event.preventDefault();
      this.reset();
    }
  }

  componentDidMount() {
    this.textInput.focus();
  }

  render() {
    const { i18n } = this.props;
    const msg = i18n["Type the link and press enter"];

    return (
      <div style={{ whiteSpace: "nowrap" }}>
        <input
          ref={el => {
            this.textInput = el;
          }}
          type="text"
          className="toolbar__input"
          onChange={this.onLinkChange}
          value={this.state.url}
          onKeyDown={this.onLinkKeyDown}
          placeholder={msg}
        />
        <span className="toolbar__item" style={{ verticalAlign: "bottom" }}>
          <button
            onClick={this.props.removeEntity}
            type="button"
            className="toolbar__button toolbar__input-button"
          >
            {this.props.entity ? <icons.UnlinkIcon /> : <icons.CloseIcon />}
          </button>
        </span>
      </div>
    );
  }
}

export default LinkInput;
