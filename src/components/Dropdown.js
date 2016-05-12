/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";
import ReactDOM from "react-dom";

import Style from "../styles/components/DropdownStyle";
import icons from "../icons";


@Radium
export class DropdownItem extends Component {
  render() {
    const Icon = this.props.item.icon;
    return(
      <div
        style={[Style.item, this.props.style]}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseDown}
        >

        <Icon style={Style.itemIcon} />
        <span style={Style.itemText}>{this.props.item.label}</span>

        {this.props.children}
      </div>
    );
  }
}

export default @Radium
class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleDocumentClick = ::this.handleDocumentClick;
  }

  onChange(selected) {
    this.props.onChange(selected);
  }

  renderItem(item) {
    return(
      <li key={item.key}>
        <DropdownItem item={item}
          style={Style.option}
          onClick={() => this.onChange(item.key)} />
      </li>
    );
  }

  preventSelection(event) {
    event.preventDefault();
  }

  toggleDropDown(event) {
    this.setState({isOpen: !this.state.isOpen});
  }

  handleDocumentClick(event) {
    if (!ReactDOM.findDOMNode(this).contains(event.target)) {
      this.setState({isOpen: false});
    }
  }

  componentDidMount () {
    document.addEventListener("click", this.handleDocumentClick, false);
  }

  componentWillUnmount () {
    document.removeEventListener("click", this.handleDocumentClick, false);
  }

  render() {
    const selectedItem = this.props.items.filter(
      (obj) => {return obj.key === this.props.selected;}
    )[0];

    const wrapperStyle = [
      Style.wrapper,
      this.state.isOpen && Style.wrapperOpened
    ];

    const dropdownStyle = [
      Style.dropdown,
      this.state.isOpen && Style.dropdownOpened
    ];

    const arrowStyle = [
      Style.itemIcon,
      Style.arrow,
      this.state.isOpen && Style.arrowOpened
    ];

    return(
      <div style={wrapperStyle} onClick={::this.toggleDropDown}>
        <DropdownItem
          item={selectedItem}
          style={Style.selectedItem}
          onMouseDown={::this.preventSelection}>

          <icons.DropdownArrow style={arrowStyle} />
        </DropdownItem>

        <ul style={dropdownStyle}>
          {this.props.items.map(::this.renderItem)}
        </ul>
      </div>
    );
  }
}
