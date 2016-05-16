/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import chai from "chai";

import icons from "../../src/icons";
import Dropdown from "../../src/components/Dropdown";
import DropdownItem from "../../src/components/DropdownItem";


let expect = chai.expect;


describe("Dropdown Component", function() {

  beforeEach(function() {
    const onChange = () => {console.log("changed");};
    const dropdownItems = [
      {"key": "metal", "icon": icons.MediaBigIcon, "label": "Metal"},
      {"key": "pagode", "icon": icons.MediaMediumIcon, "label": "Pagode"},
      {"key": "samba", "icon": icons.MediaSmallIcon, "label": "Samba"}
    ];

    this.component = TestUtils.renderIntoDocument(
      <Dropdown
        items={dropdownItems}
        selected="metal"
        onChange={onChange} />
    );
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(
      ReactDOM.findDOMNode(this.component).parentNode
    );
  });

  it("renders without problems", function() {
    expect(this.component).to.exist;
  });

  it("renders dropdown items", function() {
    const items = TestUtils.scryRenderedComponentsWithType(
      this.component, DropdownItem
    );
    expect(items).to.have.length(4);
  });

  it("toggles `isOpen` on click", function () {
    const wrapper = TestUtils.scryRenderedDOMComponentsWithTag(
      this.component, "div"
    )[0];

    TestUtils.Simulate.click(wrapper);
    expect(this.component.state.isOpen).to.be.true;

    TestUtils.Simulate.click(wrapper);
    expect(this.component.state.isOpen).to.be.false;
  });
});
