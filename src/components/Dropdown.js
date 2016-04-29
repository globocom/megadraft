/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";
import ReactDOM from "react-dom";

import Style  from "../styles/components/DropdownStyle";


@Radium
export class DropdownItem extends Component {
  render() {
    const Icon = this.props.item.icon;
    return(
      <li onClick={() => this.props.onChange(this.props.item.key)} style={Style.dropdownOption}>
        <div style={Style.dropdownImage}><Icon /></div>
        <span>{this.props.item.label}</span>
      </li>
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
    if (item.key == this.props.selected) {
      return;
    }
    return(
      <DropdownItem key={item.key} item={item} onChange={::this.onChange} />
    );
  }

  toggleDropDown() {
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
    const selected = this.props.items.filter(
      (obj) => {return obj.key === this.props.selected;}
    )[0];

    const Icon = selected.icon;

    let dropdownOpened = null;
    let showOptionsStyle = Style.dropdownInactive;
    if (this.state.isOpen) {
      dropdownOpened = [Style.wrapperDropdownOpened, Style.selectedContainerOpened];
      showOptionsStyle = null;
    }

    return(
      <div style={[Style.wrapperDropdown, dropdownOpened]} onClick={::this.toggleDropDown}>
        <div style={Style.selectedContainer}>
          <div style={Style.dropdownImage}><Icon /></div>
          <span style={Style.selectedText}>{selected.label}</span>
        </div>
        <ul style={[Style.dropdown, showOptionsStyle]}>
          {this.props.items.map(::this.renderItem)}
        </ul>
      </div>
    );
  }
}
