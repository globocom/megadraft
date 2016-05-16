/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";
import ReactDOM from "react-dom";

import DropdownItem from "./DropdownItem";
import DropdownStyle from "../styles/components/DropdownStyle";
import icons from "../icons";


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
          style={DropdownStyle.option}
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
      DropdownStyle.wrapper,
      this.state.isOpen && DropdownStyle.wrapperOpened
    ];

    const dropdownStyle = [
      DropdownStyle.dropdown,
      this.state.isOpen && DropdownStyle.dropdownOpened
    ];

    const arrowStyle = [
      DropdownStyle.arrow,
      this.state.isOpen && DropdownStyle.arrowOpened
    ];

    return(
      <div style={wrapperStyle} onClick={::this.toggleDropDown}>
        <DropdownItem
          item={selectedItem}
          style={DropdownStyle.selectedItem}
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
