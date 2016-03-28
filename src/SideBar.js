/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import ReactDOM from 'react-dom';
import {RichUtils} from "draft-js";


const BLOCK_TYPES = [{
  "name": "H2",
  "style": "header-two"
}, {
  "name": "OL",
  "style": "ordered-list-item"
}, {
  "name": "UL",
  "style": "unordered-list-item"
}, {
  "name": "QT",
  "style": "blockquote"
}];

class BlockButton extends Component {
  onMouseDown(e) {
    e.preventDefault();
    this.props.onToggle(this.props.blockType.style);
  }

  render() {
    var style = {
      cursor: "pointer",
      display: "inline-block",
      padding: "5px"
    }
    if (this.props.active) {
      style.color = "blue";
    }
    return (
      <li style={style} onMouseDown={::this.onMouseDown}>
        {this.props.blockType.name}
      </li>
    )
  }
}

class BlockStyles extends Component {
  render() {
    const style = {
      listStyle: "none",
      display: this.props.open? "block": "none",
      position: "absolute",
      padding: 0,
      border: "1px solid #CCC",
      top: "-33px",
      backgroundColor: "#FCFCFC",
      fontSize: "14px",
      boxShadow: "1px 1px 2px 0px #CCC"
    }
    return (
      <ul style={style}>
        {BLOCK_TYPES.map((item) => {
          const active = item.style === this.props.currentBlockType;
          return (
            <BlockButton
              active={active}
              key={item.style}
              onToggle={::this.props.onToggle}
              blockType={item} />
          )
        })}
      </ul>
    )
  }
}

class PopOverMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleMouseOver() {
    this.setState({
      open: true
    })
  }

  handleMouseOut() {
    this.setState({
      open: false
    })
  }

  render() {
    return (
      <li
        style={{position: "relative"}}
        onMouseOver={::this.handleMouseOver}
        onMouseOut={::this.handleMouseOut}>
        Select Block
        <BlockStyles
          open={this.state.open}
          onToggle={this.props.onToggle}
          currentBlockType={this.props.currentBlockType} />
      </li>
    );
  }
}

function getSelectedBlockElement() {
  // Finds the block parent of the current selection
  // https://github.com/facebook/draft-js/issues/45
  const selection = window.getSelection();
  if (selection.rangeCount === 0) return null;
  var node = selection.getRangeAt(0).startContainer;

  do {
    if (node.getAttribute && node.getAttribute('data-block') == 'true')
      return node
    node = node.parentNode
  } while (node != null)

}

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {top: 0}
  }

  onToggle(blockType) {
    this.props.onChange(
      RichUtils.toggleBlockType(
        this.props.editorState,
        blockType
      )
    );
  }

  componentDidUpdate() {
    if (this.updatingPosition)
      clearImmediate(this.updatingPosition);
    this.updatingPosition = null ;
    this.updatingPosition = setImmediate(() => {
      return this.setBarPosition();
    });
  }

  setBarPosition() {
    const container = ReactDOM.findDOMNode(this.refs.container);

    const element = getSelectedBlockElement();

    if (!element) return;

    const top = Math.floor(
      element.getBoundingClientRect().top - 21 -
      (container.getBoundingClientRect().top -
        document.documentElement.clientTop))

    if (this.state.top !== top)
      this.setState({
        top: top
      });
  }

  render() {
    const style = {
      container: {
        cursor: "pointer",
        position: "relative"
      },
      popover: {
        position: "absolute",
        left: "-160px",
        float: "left",
        width: "160px",
        backgroundColor: "#FAFAFA",
        top: `${this.state.top}px`
      }
    };
    const {editorState} = this.props;
    const selection = editorState.getSelection();
    const currentBlockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div ref="container" style={style.container}>
        <div style={style.popover}>
          <ul style={{listStyle: "none"}}>
            <PopOverMenu
              onToggle={::this.onToggle}
              currentBlockType={currentBlockType} />
          </ul>
        </div>
      </div>
    )
  }
}
