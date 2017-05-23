/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import chai from "chai";
import sinon from "sinon";
import {mount} from "enzyme";


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

    this.component = mount(
      <Dropdown
        items={dropdownItems}
        selected={this.selected}
        onChange={this.onChange} />
    );
  });

  it("renders without problems", function() {
    expect(this.component).to.exist;
  });

  it("renders dropdown items", function() {
    const items = this.component.find(DropdownItem);
    expect(items).to.have.length(4);
  });

  it("renders default selected dropdown item", function() {
    const selected = this.component.find(DropdownItem).first();

    const text = selected.find("span");
    expect(text.text()).to.equal("Metal");
  });

  it("is possible to click on the dropdrown item", function() {
    const item = this.component.find(DropdownItem).at(1);

    expect(this.onChange).to.not.have.been.called;

    item.find("div").simulate("click");

    expect(this.onChange).to.have.been.called;
  });

  it("toggles `isOpen` on click", function () {
    const wrapper = this.component.find("div").first();

    wrapper.simulate("click");
    expect(this.component.state("isOpen")).to.be.true;

    wrapper.simulate("click");
    expect(this.component.state("isOpen")).to.be.false;
  });

  it("does not display a dropdown arrow for a single item when disableForSingleItem is true", function () {

    const selected = "jazz";
    const onChange = sinon.spy();
    const dropdownItems = [
      {"key": "jazz", "icon": icons.MediaBigIcon, "label": "Jazz"}
    ];

    this.disabledDropdownComponent = mount(
      <Dropdown
        items={dropdownItems}
        selected={selected}
        onChange={onChange}
        disableForSingleItem={true} />
    );

    const wrapper = this.disabledDropdownComponent.find("div").first();
    wrapper.simulate("click");
    expect(this.disabledDropdownComponent.state("isOpen")).to.be.false;

  });
});