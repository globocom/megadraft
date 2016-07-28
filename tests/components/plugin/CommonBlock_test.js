/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import chai from "chai";
import sinon from "sinon";

import icons from "../../../src/icons";
import Dropdown from "../../../src/components/Dropdown";
import CommonBlock from "../../../src/components/plugin/CommonBlock";

let expect = chai.expect;


describe("CommonBlock Component", function() {

  beforeEach(function() {
    this.crop = sinon.spy();

    const actions = [{key: "crop", icon: icons.CropIcon, action: this.crop}];
    const displayOptions = [
      {key: "small", icon: icons.MediaSmallIcon, label: "SMALL"},
      {key: "medium", icon: icons.MediaMediumIcon, label: "MEDIUM"}
    ];
    const defaultDisplay = "medium";
    const blockProps = {plugin: {options: {displayOptions, defaultDisplay}}};

    this.container = {
      updateData: sinon.spy()
    };

    this.renderComponent = function (data) {
      return TestUtils.renderIntoDocument(
        <CommonBlock
          blockProps={blockProps}
          actions={actions}
          container={this.container}
          data={data} />
      );
    };
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(
      ReactDOM.findDOMNode(this.component).parentNode
    );
  });

  it("renders default display option when it is empty", function() {
    this.component = this.renderComponent({});
    const dropdown = TestUtils.findRenderedComponentWithType(this.component, Dropdown);
    expect(dropdown.props.selected).to.equal("medium");
  });

  it("renders selected display option when it is present", function() {
    const data = {display: "small"};
    this.component = this.renderComponent(data);

    const dropdown = TestUtils.findRenderedComponentWithType(this.component, Dropdown);
    expect(dropdown.props.selected).to.equal("small");
  });

  it("updates selected display option on change", function () {
    this.component = this.renderComponent({});
    const dropdown = TestUtils.findRenderedComponentWithType(this.component, Dropdown);

    dropdown.onChange("small");

    expect(this.container.updateData).to.have.been.calledWith({display: "small"});
  });
});

