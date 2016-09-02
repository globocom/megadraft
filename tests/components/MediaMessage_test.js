/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import chai from "chai";
import {mount} from "enzyme";

import MediaMessage from "../../src/components/MediaMessage";


let expect = chai.expect;


describe("MediaMessage Component", function() {

  beforeEach(function() {
    this.renderComponent = function (props) {
      props = props || {};
      return mount(<MediaMessage {...props} />);
    };
  });

  it("renders component when there is a text", function() {
    const component = this.renderComponent({text: "some error", type: "error"});
    const element = component.find(".media__message--error");
    expect(element.text()).to.equal("some error");
  });

  it("hides component when there is no text", function() {
    const component = this.renderComponent({text: "", type: "error"});
    expect(component.children().length).to.equal(0);
  });

  it("renders component when there is no type", function() {
    const component = this.renderComponent({text: "some info", type: ""});
    const element = component.find(".media__message--info");
    expect(element.text()).to.equal("some info");
  });
});
