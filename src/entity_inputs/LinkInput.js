/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";


export default class LinkInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: ""
    };
    this.onLinkChange = ::this.onLinkChange;
    this.onLinkKeyDown = ::this.onLinkKeyDown;
  }

  setLink() {
    let {link} = this.state;
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      link = `http://${link}`;
    }
    this.props.setEntity({url: link});
  }

  onLinkChange(event) {
    event.stopPropagation();
    this.setState({link: event.target.value});
  }

  onLinkKeyDown(event) {
    if (event.key == "Enter") {
      event.preventDefault();
      this.setLink();
      this.setState({
        link: ""
      });
      this.props.cancelEntity();


    } else if (event.key == "Escape") {
      event.preventDefault();
      this.setState({
        link: ""
      });
      this.props.cancelEntity();

    }
  }

  render() {
    return (
      <input
        ref="textInput"
        type="text"
        className="toolbar__input"
        onChange={this.onLinkChange}
        value={this.state.link}
        onKeyDown={this.onLinkKeyDown}
        placeholder="Type the link and press enter"/>
    );
  }
}
