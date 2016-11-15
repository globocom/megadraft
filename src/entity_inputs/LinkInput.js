/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import DeleteIcon from "../icons/delete";

export default class LinkInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props && props.url || ""
    };
    this.onLinkChange = ::this.onLinkChange;
    this.onLinkKeyDown = ::this.onLinkKeyDown;
  }

  setLink() {
    let {url} = this.state;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `http://${url}`;
    }
    this.props.setEntity({url});
  }

  onLinkChange(event) {
    event.stopPropagation();
    this.setState({url: event.target.value});
  }

  onLinkKeyDown(event) {
    if (event.key == "Enter") {
      event.preventDefault();
      this.setLink();
      this.setState({
        url: ""
      });
      this.props.cancelEntity();


    } else if (event.key == "Escape") {
      event.preventDefault();
      this.setState({
        url: ""
      });
      this.props.cancelEntity();

    }
  }

  componentDidMount() {
    this.refs.textInput.focus();
  }

  render() {
    return (
      <div style={{whiteSpace: "nowrap"}}>
        <input
          ref="textInput"
          type="text"
          className="toolbar__input"
          onChange={this.onLinkChange}
          value={this.state.url}
          onKeyDown={this.onLinkKeyDown}
          placeholder="Type the url and press enter"/>
        <button
          onClick={this.props.removeEntity}
          type="button"
          style={{verticalAlign: "bottom"}}
          className="toolbar__button toolbar__item">
          <DeleteIcon />
        </button>

      </div>
    );
  }
}
