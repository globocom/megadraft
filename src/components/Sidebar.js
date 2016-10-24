/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import ReactDOM from "react-dom";
import classNames  from "classnames";
import icons from "../icons";

import "setimmediate";


class BlockStyles extends Component {
  constructor(props) {
    super(props);
    this.onChange = ::this.onChange;
  }

  onChange(editorState) {
    this.props.onChange(editorState);
  }

  render() {
    const className = classNames("sidemenu__items", {
      "sidemenu__items--open": this.props.open
    });

    return (
      <ul className={className}>
        {this.props.plugins.map((item) => {
          const Button = item.buttonComponent;
          return (
            <li key={item.type} className="sidemenu__item">
              <Button
                className="sidemenu__button"
                editorState={this.props.editorState}
                onChange={this.onChange}/>
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

    const className = classNames("sidemenu__button", {
      "sidemenu__button--open": this.props.open
    });

    return (
      <button type="button" className={className} onClick={this.props.toggle}>
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
    this.toggle = ::this.toggle;
    this.onChange = ::this.onChange;
  }

  onChange(editorState) {
    this.props.onChange(editorState);
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
          toggle={this.toggle}
          open={this.state.open} />

        <BlockStyles
          editorState={this.props.editorState}
          plugins={this.props.plugins}
          open={this.state.open}
          onChange={this.onChange}/>
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
    this.onChange = ::this.onChange;
  }

  getValidSidebarPlugins() {
    let plugins = [];
    for (let plugin of this.props.plugins) {
      if (!plugin.buttonComponent || typeof plugin.buttonComponent !== "function") {
        continue;
      }
      plugins.push(plugin);
    }
    return plugins;
  }

  onChange(editorState) {
    this.props.onChange(editorState);
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

    if (!element || !container) {
      return;
    }

    const containerTop = container.getBoundingClientRect().top - document.documentElement.clientTop;
    let top = element.getBoundingClientRect().top - 4 - containerTop;
    top = Math.max(0, Math.floor(top));

    if (this.state.top !== top) {
      this.setState({
        top: top
      });
    }
  }

  render() {
    if(this.props.readOnly) {
      return null;
    }
    return (
      <div ref="container" className="sidebar">
        <div style={{top: `${this.state.top}px`}} className="sidebar__menu">
          <ul className="sidebar__sidemenu-wrapper">
            <SideMenu
              editorState={this.props.editorState}
              onChange={this.onChange}
              plugins={this.getValidSidebarPlugins()}/>
          </ul>
        </div>
      </div>
    );
  }
}
