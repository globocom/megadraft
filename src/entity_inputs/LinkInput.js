/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import ReactDOM from "react-dom";
import {EditorState, RichUtils, Entity} from "draft-js";


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
    const {editorState} = this.props;
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      link = `http://${link}`;
    }
    const entityKey = Entity.create("LINK", "MUTABLE", {url: link});
    let newState = RichUtils.toggleLink(
      editorState,
      editorState.getSelection(),
      entityKey
    );
    newState = EditorState.forceSelection(
      newState, this.props.editorState.getSelection());
    this.props.onChange(newState);
  }

  onLinkChange(event) {
    event.stopPropagation();
    this.setState({link: event.target.value});
  }

  onLinkKeyDown(event) {
    if (event.key == "Enter") {
      event.preventDefault();
      this.setLink();
      this.props.cancelEntity();
      this.setState({
        show: false,
        link: ""
      });
      this.props.editor.focus();
    } else if (event.key == "Escape") {
      event.preventDefault();
      ReactDOM.findDOMNode(this.props.editor.focus());
      this.props.cancelEntity();
      this.setState({
        link: ""
      });
      this.props.onChange(
        EditorState.forceSelection(
          this.props.editorState, this.props.editorState.getSelection()));
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
