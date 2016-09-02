/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import chai from "chai";
import sinon from "sinon";
import {mount} from "enzyme";

import icons from "../../../src/icons";
import BlockAction from "../../../src/components/plugin/BlockAction";

let expect = chai.expect;


describe("BlockAction Component", function() {

  beforeEach(function() {
    this.crop = sinon.spy();

    const item = {"key": "crop", "icon": icons.CropIcon, "action": this.crop};

    this.wrapper = mount(
      <BlockAction item={item} key={item.key} />
    );
  });

  it("renders without problems", function() {
    const blockAction = this.wrapper.find(BlockAction);
    expect(blockAction).to.have.length(1);
  });

  it("is possible to click on the action item", function() {
    const itemDOM = this.wrapper.find("li");

    expect(this.crop).to.not.have.been.called;

    itemDOM.simulate("click");

    expect(this.crop).to.have.been.called;
  });
});
