/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import chai from "chai";
import sinon from "sinon";
import {mount} from "enzyme";

import LinkInput from "../../src/entity_inputs/LinkInput";

let expect = chai.expect;

describe("LinkInput Component", function() {

  beforeEach(function() {

    this.cancelEntity = sinon.spy();
    this.setEntity = sinon.spy();

    this.wrapper = mount(
      <LinkInput
        entityType="LINK"
        editor={this.editor}
        cancelEntity={this.cancelEntity}
        setEntity={this.setEntity}
        />
    );

  });

  it("should set a link entity on keypress and call cancel", function() {

    const input = this.wrapper.find("input");
    const inputNode = input.get(0);

    inputNode.value = "http://www.globo.com";
    input.simulate("change");
    input.simulate("keyDown", {key: "Enter", keyCode: 13, which: 13});
    expect(this.setEntity).to.have.been.calledWith({url: "http://www.globo.com"});
    expect(this.cancelEntity).to.have.been.called;
  });

  it("esc key should cancel the link", function() {

    const input = this.wrapper.find("input");
    const inputNode = input.get(0);

    inputNode.value = "http://www.globo.com";
    input.simulate("change");
    input.simulate("keyDown", {key: "Escape", keyCode: 27, which: 27});
    expect(this.setEntity).to.not.have.been.called;
    expect(this.cancelEntity).to.have.been.called;
  });

  it("should add protocol to links", function() {

    const input = this.wrapper.find("input");
    const inputNode = input.get(0);

    inputNode.value = "www.globo.com";
    input.simulate("change");
    input.simulate("keyDown", {key: "Enter", keyCode: 13, which: 13});
    expect(this.setEntity).to.have.been.calledWith({url: "http://www.globo.com"});
  });

});
