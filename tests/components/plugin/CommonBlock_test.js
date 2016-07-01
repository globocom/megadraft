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
    const featuredOptions = [
      {key: "small", icon: icons.MediaSmallIcon, label: "SMALL"},
      {key: "medium", icon: icons.MediaMediumIcon, label: "MEDIUM"}
    ];
    const defaultFeatured = "medium";
    const blockProps = {plugin: {options: {featuredOptions, defaultFeatured}}};

    this.container = {
      updateEntity: sinon.spy()
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

  it("renders default featured option when it is empty", function() {
    this.component = this.renderComponent({});
    const dropdown = TestUtils.findRenderedComponentWithType(this.component, Dropdown);
    expect(dropdown.props.selected).to.equal("medium");
  });

  it("renders selected featured option when it is present", function() {
    const data = {featured: "small"};
    this.component = this.renderComponent(data);

    const dropdown = TestUtils.findRenderedComponentWithType(this.component, Dropdown);
    expect(dropdown.props.selected).to.equal("small");
  });

  it("updates selected featured option on change", function () {
    this.component = this.renderComponent({});
    const dropdown = TestUtils.findRenderedComponentWithType(this.component, Dropdown);

    dropdown.onChange("small");

    expect(this.container.updateEntity).to.have.been.calledWith({featured: "small"});
  });
});

