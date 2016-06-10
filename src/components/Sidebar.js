/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import ReactDOM from "react-dom";
import icons from "../icons";


class BlockStyles extends Component {
  render() {
    let className = "sidemenu__items";

    if (this.props.open) {
      className += " sidemenu__items--open";
    }

    return (
      <ul className={className}>
        {this.props.plugins.map((item) => {
          const Button = item.buttonComponent;
          return (
            <li key={item.type} className="sidemenu__item">
              <Button
                className="sidemenu__button"
                editorState={this.props.editorState}
                onChange={::this.props.onChange}/>
            </li>
          );
        })}
      </ul>
    );
  }
}

export class ToggleButton extends Component {
  render() {
    const Icon = icons.CrossIcon;

    let className = "sidemenu__button";

    if (this.props.open) {
      className += " sidemenu__button--open";
    }

    return (
      <button className={className} onClick={this.props.toggle}>
        <Icon className="sidemenu__button__icon" />
      </button>
    );
  }
}

export class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    return (
      <li className="sidemenu">
        <ToggleButton
          toggle={::this.toggle}
          open={this.state.open} />

        <BlockStyles
          editorState={this.props.editorState}
          plugins={this.props.plugins}
          open={this.state.open}
          onChange={this.props.onChange}/>
      </li>
    );
  }
}

function getSelectedBlockElement() {
  // Finds the block parent of the current selection
  // https://github.com/facebook/draft-js/issues/45
  const selection = window.getSelection();
  if (selection.rangeCount === 0) {
    return null;
  }
  var node = selection.getRangeAt(0).startContainer;

  do {
    if (node.getAttribute && node.getAttribute("data-block") == "true") {
      return node;
    }
    node = node.parentNode;
  } while (node != null);

}

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {top: 0};
  }

  componentDidUpdate() {
    if (this.updatingPosition) {
      clearImmediate(this.updatingPosition);
    }
    this.updatingPosition = null ;
    this.updatingPosition = setImmediate(() => {
      return this.setBarPosition();
    });
  }

  setBarPosition() {
    const container = ReactDOM.findDOMNode(this.refs.container);

    const element = getSelectedBlockElement();

    if (!element) {
      return;
    }

    const top = Math.floor(
      element.getBoundingClientRect().top - 4 -
      (container.getBoundingClientRect().top -
        document.documentElement.clientTop));

    if (this.state.top !== top) {
      this.setState({
        top: top
      });
    }
  }

  render() {
    return (
      <div ref="container" className="sidebar">
        <div style={{top: `${this.state.top}px`}} className="sidebar__menu">
          <ul className="sidebar__sidemenu-wrapper">
            <SideMenu
              editorState={this.props.editorState}
              onChange={::this.props.onChange}
              plugins={this.props.plugins}/>
          </ul>
        </div>
      </div>
    );
  }
}
