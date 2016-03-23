import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";

import chai from "chai";

import Megadraft from "../src/Megadraft";


let expect = chai.expect


describe("Megadraft Component", () => {
  beforeEach(function() {
    this.component = TestUtils.renderIntoDocument(<Megadraft />);
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.component).parentNode);
  });

  it("renders without problems", function() {
    expect(this.component).to.exist;
  });

  it("should have click on bold button", function() {
    let buttons = TestUtils.findRenderedDOMComponentWithTag(this.component, "button");
    expect(buttons.textContent).to.equal("Bold");

  });


});

