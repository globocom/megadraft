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
import {getSelectedBlockElement} from "../utils";

class BlockStyles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.onModalOpenClick = ::this.onModalOpenClick;
    this.onChange = ::this.onChange;
    this.toggleModalVisibility = ::this.toggleModalVisibility;
    this.renderButton = ::this.renderButton;
  }

  onChange(editorState) {
    this.props.onChange(editorState);
  }

  onModalOpenClick(e){
    e.preventDefault();
    document.body.classList.add("megadraft-modal--open");
    this.setState({isOpen: true});
  }

  toggleModalVisibility() {
    this.setState({isOpen: !this.state.isOpen});
  }

  renderModal() {
    return (
      <PluginsModal
        toggleModalVisibility={this.toggleModalVisibility}
        isOpen={this.state.isOpen}
        plugins={this.props.plugins}
        onCloseRequest={this.props.onClose}
        onChange={this.onChange}
        editorState={this.props.editorState}
        modalOptions={this.props.modalOptions}/>
    );
  }

  renderModalButton() {
    return (
      <button className="sidemenu__button" onClick={this.onModalOpenClick}>
        <icons.MoreIcon className="sidemenu__button__icon" />
      </button>
    );
  }

  renderButton(item){
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
  }

  render() {
    const maxSidebarButtons = this.props.maxSidebarButtons ? this.props.maxSidebarButtons : this.props.plugins.length;

    const sidemenuMaxHeight = {
      maxHeight: this.props.open? `${(maxSidebarButtons + 1) * 48}px`: 0,
    };

    // We should hide the modal if the number of plugins < max
    const hasModal = this.props.plugins.length > maxSidebarButtons;
    const className = classNames("sidemenu__items", {
      "sidemenu__items--open": this.props.open
    });
    return (
      <div>
        <ul style={sidemenuMaxHeight} className={className}>
          {this.props.plugins.slice(0, maxSidebarButtons).map(this.renderButton)}
          {hasModal ? this.renderModalButton() : null}
        </ul>
        {hasModal ? this.renderModal() : null }
      </div>
    );
  }
}

export class ToggleButton extends Component {
  render() {
    if (!this.props.hasFocus) {
      return null;
    }

    const Icon = icons.CrossIcon;

    const className = classNames("sidemenu__button", {
      "sidemenu__button--open": this.props.open
    });

    return (
      <button type="button"
        ref={(el) => {this.button = el;}}
        className={className}
        onClick={() => {
          this.button.focus();
          this.props.toggle();
        }}
      >
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
    const className = classNames("sidemenu", {
      "sidemenu--open": this.state.open
    });
    return (
      <li className={className}>
        <ToggleButton
          toggle={this.toggle}
          hasFocus={this.props.editorHasFocus || this.state.open}
          open={this.state.open} />

        <BlockStyles
          editorState={this.props.editorState}
          plugins={this.props.plugins}
          open={this.state.open}
          onChange={this.onChange}
          maxSidebarButtons={this.props.maxSidebarButtons}
          modalOptions={this.props.modalOptions} />
      </li>
    );
  }
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
    const container = ReactDOM.findDOMNode(this.containerEl);
    const editor = container ? container.parentElement : null;

    const selection = window.getSelection();
    if (selection.rangeCount === 0) {
      return null;
    }

    const element = getSelectedBlockElement(selection.getRangeAt(0));

    if (!element || !container || !editor || !editor.contains(element)) {
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
      <div ref={(el) => { this.containerEl = el; }} className="sidebar">
        <div style={{top: `${this.state.top}px`}} className="sidebar__menu">
          <ul className="sidebar__sidemenu-wrapper">
            <SideMenu
              editorState={this.props.editorState}
              onChange={this.onChange}
              plugins={this.getValidSidebarPlugins()}
              maxSidebarButtons={this.props.maxSidebarButtons}
              editorHasFocus={this.props.editorHasFocus}
              modalOptions={this.props.modalOptions} />
          </ul>
        </div>
      </div>
    );
  }
}
