/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import TestUtils from "react-addons-test-utils";
import chai from "chai";
import sinon from "sinon";

import MediaCaption from "../../src/components/MediaCaption";

let expect = chai.expect;

describe("MediaCaption", function() {
  beforeEach(function() {
    this.data = {
      caption: "media caption",
      rightsHolder: "media rights"
    };

    this.setReadOnly = sinon.spy();
    this.updateEntity = sinon.spy();

    this.wrapper = TestUtils.renderIntoDocument(
      <MediaCaption
        setReadOnly={this.setReadOnly}
        updateEntity={this.updateEntity}
        data={this.data} />
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

  it("enables readOnly on caption focus", function () {
    const caption = TestUtils.scryRenderedDOMComponentsWithTag(this.wrapper, "input")[0];
    TestUtils.Simulate.focus(caption);
    expect(this.setReadOnly.calledWith(true)).to.be.true;
  });

  it("enables readOnly on rightsHolder focus", function () {
    TestUtils.Simulate.focus(this.rights);
    expect(this.setReadOnly.calledWith(true)).to.be.true;
  });

  it("disables readOnly on caption blur", function () {
    TestUtils.Simulate.blur(this.caption);
    expect(this.setReadOnly.calledWith(false)).to.be.true;
  });

  it("disables readOnly on rightsHolder blur", function () {
    TestUtils.Simulate.blur(this.rights);
    expect(this.setReadOnly.calledWith(false)).to.be.true;
  });

  it("updates state on caption change", function () {
    this.caption.value = "new caption";
    TestUtils.Simulate.change(this.caption);
    expect(this.wrapper.state.caption).to.be.equal("new caption");
  });

  it("updates entity on caption change", function () {
    this.caption.value = "new caption";
    TestUtils.Simulate.change(this.caption);
    expect(this.updateEntity.calledWith({caption: "new caption"})).to.be.true;
  });

  it("updates state on rightsHolder change", function () {
    this.rights.value = "new rights";
    TestUtils.Simulate.change(this.rights);
    expect(this.wrapper.state.rightsHolder).to.be.equal("new rights");
  });

  it("updates entity on rightsHolder change", function () {
    this.rights.value = "new rights";
    TestUtils.Simulate.change(this.rights);
    expect(this.updateEntity.calledWith({rightsHolder: "new rights"})).to.be.true;
  });
});
