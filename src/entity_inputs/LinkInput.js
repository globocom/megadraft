/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from "react";
import icons from "../icons";
import { translate } from "react-i18next";

class LinkInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: (props && props.url) || ""
    };
    this.onLinkChange = ::this.onLinkChange;
    this.onLinkKeyDown = ::this.onLinkKeyDown;
  }

  setLink(event) {
    let { url } = this.state;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `http://${url}`;
    }

    // https://gist.github.com/dperini/729294
    // Author: Diego Perini
    // License: MIT
    const expression = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/gi;

    const regex = new RegExp(expression);
    const { t } = this.props;

    if (!url.match(regex)) {
      this.props.setError(t("Invalid Link"));
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
    const { t } = this.props;
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
          placeholder={t("Type the link and press enter")}
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

export default translate("translations")(LinkInput);
