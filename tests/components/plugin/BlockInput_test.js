/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import chai from "chai";
import {mount} from "enzyme";

import {BlockInput} from "../../../src/components/plugin";

let expect = chai.expect;


describe("BlockInput Component", function() {

  beforeEach(function() {
    this.renderComponent = function (props) {
      props = props || {};
      return mount(<BlockInput {...props} />);
    };
  });

  it("uses `empty` class when value is empty", function() {
    const component = this.renderComponent();
    const input = component.find("input");
    expect(input.hasClass("block__input--empty")).to.be.true;
  });

  it("disables `empty` class when there is a value", function() {
    const component = this.renderComponent({value: "non-empty"});
    const input = component.find("input");
    expect(input.hasClass("block__input--empty")).to.be.false;
  });

  it("renders input value", function() {
    const component = this.renderComponent({value: "non-empty"});
    const domInput = component.find("input").get(0);
    expect(domInput.value).to.equal("non-empty");
  });

  it("hides error text when there is no error", function() {
    const component = this.renderComponent({value: "non-empty"});
    const elements = component.find(".block__input__error-text");
    expect(elements.length).to.equal(0);
  });

  it("renders error text when there is an error", function() {
    const component = this.renderComponent({error: "Fake error"});
    const element = component.find(".block__input__error-text").get(0);
    expect(element.textContent).to.equal("Fake error");
  });

  it("toggles `error` class when there is an error", function() {
    const component = this.renderComponent({value: "non-empty"});
    const input = component.find("input");
    expect(input.hasClass("block__input--error")).to.be.false;
  });
});
