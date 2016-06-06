/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import icons from "../icons";
import SidebarStyle  from "../styles/components/SidebarStyle";


@Radium
class BlockStyles extends Component {
  render() {
    const style = [
      SidebarStyle.block,
      {maxHeight: this.props.open? "100px": 0}
    ];
    return (
      <ul style={style}>
        {this.props.plugins.map((item) => {
          const Button = item.buttonComponent;
          return (
            <li key={item.type} style={SidebarStyle.listItem}>
              <Button
                style={SidebarStyle.button}
                editorState={this.props.editorState}
                onChange={::this.props.onChange}/>
            </li>
          );
        })}
      </ul>
    );
  }
}

@Radium
export class ToggleButton extends Component {
  render() {
    const Icon = icons.CrossIcon;

    let style = [SidebarStyle.button];

    if (this.props.open) {
      style.push(SidebarStyle.toggleClose);
    }

    return (
      <button style={style} onClick={this.props.toggle}>
        <Icon/>
      </button>
    );
  }
}

@Radium
export class PopOverMenu extends Component {
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
      <li style={SidebarStyle.menu}>
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

export default @Radium
class SideBar extends Component {
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
      <div ref="container" style={SidebarStyle.container}>
        <div style={[SidebarStyle.popover, {top: `${this.state.top}px`}]}>
          <ul style={SidebarStyle.dropdown}>
            <PopOverMenu
              editorState={this.props.editorState}
              onChange={::this.props.onChange}
              plugins={this.props.plugins}/>
          </ul>
        </div>
      </div>
    );
  }
}
