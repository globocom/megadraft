/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import chai from "chai";
import sinon from "sinon";
import {mount} from "enzyme";

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
      return mount(
        <CommonBlock
          blockProps={blockProps}
          actions={actions}
          container={this.container}
          data={data} />
      );
    };
  });

  it("renders default display option when it is empty", function() {
    this.component = this.renderComponent({});
    const dropdown = this.component.find(Dropdown);
    expect(dropdown.prop("selected")).to.equal("medium");
  });

  it("renders selected display option when it is present", function() {
    const data = {display: "small"};
    this.component = this.renderComponent(data);

    const dropdown = this.component.find(Dropdown);
    expect(dropdown.prop("selected")).to.equal("small");
  });

  it("updates selected display option on change", function () {
    this.component = this.renderComponent({});
    const dropdown = this.component.find(Dropdown);

    dropdown.prop("onChange")("small");

    expect(this.container.updateData).to.have.been.calledWith({display: "small"});
  });
});

