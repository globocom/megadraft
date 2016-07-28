/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import TestUtils from "react-addons-test-utils";
import chai from "chai";
import sinon from "sinon";

import ImageBlock from "../../../src/plugins/image/ImageBlock";
import icons from "../../../src/icons";


let expect = chai.expect;


describe("ImageBlock", function() {
  beforeEach(function() {
    this.data = {
      caption: "media caption",
      rightsHolder: "media rights"
    };

    this.setReadOnly = sinon.spy();
    this.updateData = sinon.spy();
    this.remove = sinon.spy();

    const displayOptions = [
      {key: "small", icon: icons.MediaSmallIcon, label: "SMALL"},
      {key: "medium", icon: icons.MediaMediumIcon, label: "MEDIUM"}
    ];
    const defaultDisplay = "medium";
    const blockProps = {plugin: {options: {displayOptions, defaultDisplay}}};

    this.wrapper = TestUtils.renderIntoDocument(
      <ImageBlock container={this} blockProps={blockProps} data={this.data} />
    );

    this.caption = TestUtils.scryRenderedDOMComponentsWithTag(this.wrapper, "input")[0];
    this.rights = TestUtils.scryRenderedDOMComponentsWithTag(this.wrapper, "input")[1];
  });

  it("renders caption from data", function() {
    expect(this.caption.value).to.be.equal(this.data.caption);
  });

  it("renders rightsHolder from data", function() {
    expect(this.rights.value).to.be.equal(this.data.rightsHolder);
  });

  it("updates entity on caption change", function () {
    this.caption.value = "new caption";
    TestUtils.Simulate.change(this.caption);
    expect(this.updateData.calledWith({caption: "new caption"})).to.be.true;
  });

  it("updates entity on rightsHolder change", function () {
    this.rights.value = "new rights";
    TestUtils.Simulate.change(this.rights);
    expect(this.updateData.calledWith({rightsHolder: "new rights"})).to.be.true;
  });
});
