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

import icons from "../../../src/icons";
import BlockAction from "../../../src/components/plugin/BlockAction";

let expect = chai.expect;


describe("BlockAction Component", function() {

  beforeEach(function() {
    this.crop = sinon.spy();

    const item = {"key": "crop", "icon": icons.CropIcon, "action": this.crop};

    this.component = TestUtils.renderIntoDocument(
      <BlockAction item={item} key={item.key} />
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

  it("is possible to click on the action item", function() {
    const itemDOM = TestUtils.findRenderedDOMComponentWithTag(this.component, "li");

    expect(this.crop).to.not.have.been.called;

    TestUtils.Simulate.click(itemDOM);

    expect(this.crop).to.have.been.called;
  });
});

