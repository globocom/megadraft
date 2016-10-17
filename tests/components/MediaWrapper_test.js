/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import chai from "chai";
import sinon from "sinon";
import {mount} from "enzyme";

import MediaWrapper from "../../src/components/MediaWrapper";

let expect = chai.expect;

describe("MediaWrapper", function() {
  beforeEach(function() {
    this.setReadOnly = sinon.spy();

    this.wrapper = mount(
      <MediaWrapper setReadOnly={this.setReadOnly}>
        <input type="text" />
      </MediaWrapper>
    );

    this.input = this.wrapper.find("input");
  });

  it("enables readOnly on input focus", function () {
    this.input.simulate("focus");
    expect(this.setReadOnly.calledWith(true)).to.be.true;
  });

  it("disables readOnly on input blur", function () {
    this.input.simulate("blur");
    expect(this.setReadOnly.calledWith(false)).to.be.true;
  });
});
