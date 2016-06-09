/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import TestUtils from "react-addons-test-utils";
import chai from "chai";

import {BlockInput} from "../../../src/components/plugin";

let expect = chai.expect;


describe.only("BlockInput Component", function() {

  beforeEach(function() {
    this.renderComponent = function (props) {
      props = props || {};
      return TestUtils.renderIntoDocument(<BlockInput {...props} />);
    };
  });

  it("uses `empty` class when value is empty", function() {
    const component = this.renderComponent();
    const input = TestUtils.findRenderedDOMComponentWithTag(component, "input");
    expect(input.className).to.contain("block__input--empty");
  });

  it("disables `empty` class when there is a value", function() {
    const component = this.renderComponent({value: "non-empty"});
    const input = TestUtils.findRenderedDOMComponentWithTag(component, "input");
    expect(input.className).to.not.contain("block__input--empty");
  });

  it("renders input value", function() {
    const component = this.renderComponent({value: "non-empty"});
    const input = TestUtils.findRenderedDOMComponentWithTag(component, "input");
    expect(input.value).to.equal("non-empty");
  });

  it("hides error text when there is no error", function() {
    const component = this.renderComponent();
    const elements = TestUtils.scryRenderedDOMComponentsWithClass(component, "block__input__error-text");
    expect(elements.length).to.equal(0);
  });

  it("renders error text when there is an error", function() {
    const component = this.renderComponent({error: "Fake error"});
    const element = TestUtils.findRenderedDOMComponentWithClass(component, "block__input__error-text");
    expect(element.textContent).to.equal("Fake error");
  });

  it("toggles `error` class when there is an error", function() {
    const component = this.renderComponent({value: "non-empty"});
    const input = TestUtils.findRenderedDOMComponentWithTag(component, "input");
    expect(input.className).to.not.contain("block__input--error");
  });
});
