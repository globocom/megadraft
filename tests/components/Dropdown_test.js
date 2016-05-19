/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import chai from "chai";
import sinon from "sinon";

import icons from "../../src/icons";
import Dropdown from "../../src/components/Dropdown";
import DropdownItem from "../../src/components/DropdownItem";


let expect = chai.expect;


describe("Dropdown Component", function() {

  beforeEach(function() {
    this.selected = "metal";
    this.onChange = sinon.spy();
    const dropdownItems = [
      {"key": "pagode", "icon": icons.MediaMediumIcon, "label": "Pagode"},
      {"key": "metal", "icon": icons.MediaBigIcon, "label": "Metal"},
      {"key": "samba", "icon": icons.MediaSmallIcon, "label": "Samba"}
    ];

    this.component = TestUtils.renderIntoDocument(
      <Dropdown
        items={dropdownItems}
        selected={this.selected}
        onChange={this.onChange} />
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

  it("renders default selected dropdown item", function() {
    const selected = TestUtils.scryRenderedComponentsWithType(
      this.component, DropdownItem
    )[0];

    const text = TestUtils.findRenderedDOMComponentWithTag(selected, "span");
    expect(text.innerHTML).to.equal("Metal");
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
