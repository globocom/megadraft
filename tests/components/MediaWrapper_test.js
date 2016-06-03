/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import TestUtils from "react-addons-test-utils";
import chai from "chai";
import sinon from "sinon";

import MediaWrapper from "../../src/components/MediaWrapper";

let expect = chai.expect;

describe("MediaWrapper", function() {
  beforeEach(function() {
    this.setReadOnly = sinon.spy();

    this.wrapper = TestUtils.renderIntoDocument(
      <MediaWrapper setReadOnly={this.setReadOnly}>
        <input type="text" />
      </MediaWrapper>
    );

    this.input = TestUtils.findRenderedDOMComponentWithTag(this.wrapper, "input");
  });

  it("enables readOnly on input focus", function () {
    TestUtils.Simulate.focus(this.input);
    expect(this.setReadOnly.calledWith(true)).to.be.true;
  });

  it("disables readOnly on input blur", function () {
    TestUtils.Simulate.blur(this.input);
    expect(this.setReadOnly.calledWith(false)).to.be.true;
  });
});
