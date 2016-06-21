/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import chai from "chai";

import MediaMessage from "../../src/components/MediaMessage";


let expect = chai.expect;


describe("MediaMessage Component", function() {

  beforeEach(function() {
    this.renderComponent = function (props) {
      props = props || {};
      return TestUtils.renderIntoDocument(<MediaMessage {...props} />);
    };
  });

  it("renders component when there is a text", function() {
    const component = this.renderComponent({text: "some error", type: "error"});
    const element = TestUtils.findRenderedDOMComponentWithClass(component, "media__message media__message--error");
    expect(element.textContent).to.equal("some error");
  });

  it("hides component when there is no text", function() {
    const component = this.renderComponent({text: "", type: "error"});
    expect(ReactDOM.findDOMNode(component)).to.not.exist;
  });

  it("renders component when there is no type", function() {
    const component = this.renderComponent({text: "some info", type: ""});
    const element = TestUtils.findRenderedDOMComponentWithClass(component, "media__message media__message--info");
    expect(element.textContent).to.equal("some info");
  });

});
