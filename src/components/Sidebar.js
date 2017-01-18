/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import icons from "../icons";

import "setimmediate";

import PluginsModal from "./PluginsModal";


class BlockStyles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.onOpenClick = ::this.onOpenClick;
    this.onChange = ::this.onChange;
    this.handleModal = :: this.handleModal;
  }

  onChange(editorState) {
    this.props.onChange(editorState);
  }

  onOpenClick(e){
    e.preventDefault();
    document.body.style.overflowY = "hidden";
    this.setState({isOpen: true});
  }

  handleModal() {
    this.setState({ isOpen: !this.state.isOpen});
  }

  render() {
    const className = classNames("sidemenu__items", {
      "sidemenu__items--open": this.props.open
    });

    return (
      <div>
      <ul className={className}>
        {this.props.plugins.slice(0,3).map((item) => {
          const Button = item.buttonComponent;
          return (
            <li key={item.type} className="sidemenu__item">
              <Button
                className="sidemenu__button"
                title={item.title}
                editorState={this.props.editorState}
                onChange={this.onChange}/>
            </li>
          );
        })}
        {this.props.plugins.length > 3 ?
        <button className="sidemenu__button" onClick={this.onOpenClick}>
        <icons.MoreIcon className="sidemenu__button__icon" />
        </button>
        : null}
      </ul>

      {this.props.plugins.length > 3 ?
      <PluginsModal
        handleModal={this.handleModal}
        isOpen={this.state.isOpen}
        plugins={this.props.plugins}
        onCloseRequest={this.props.onClose}
        onChange={this.onChange}
        editorState={this.props.editorState} />
        : null }
      </div>
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
  let node = selection.getRangeAt(0).startContainer;

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
