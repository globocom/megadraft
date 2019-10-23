/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import { mount } from "enzyme";

import icons from "../../../src/icons";
import Dropdown from "../../../src/components/Dropdown";
import CommonBlock from "../../../src/components/plugin/CommonBlock";

describe("CommonBlock Component", () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    testContext.crop = jest.fn();

    const actions = [
      { key: "crop", icon: icons.CropIcon, action: testContext.crop }
    ];
    const displayOptions = [
      { key: "small", icon: icons.MediaSmallIcon, label: "SMALL" },
      { key: "medium", icon: icons.MediaMediumIcon, label: "MEDIUM" }
    ];
    const defaultDisplay = "medium";
    const blockProps = {
      plugin: { options: { displayOptions, defaultDisplay } },
      getInitialReadOnly: jest.fn()
    };

    testContext.container = {
      updateData: jest.fn()
    };

    testContext.renderComponent = data => {
      return mount(
        <CommonBlock
          blockProps={blockProps}
          actions={actions}
          container={testContext.container}
          data={data}
        />
      );
    };
  });

  it("renders default display option when it is empty", () => {
    testContext.component = testContext.renderComponent({});
    const dropdown = testContext.component.find(Dropdown);
    expect(dropdown.prop("selected")).toEqual("medium");
  });

  it("renders selected display option when it is present", () => {
    const data = { display: "small" };
    testContext.component = testContext.renderComponent(data);

    const dropdown = testContext.component.find(Dropdown);
    expect(dropdown.prop("selected")).toEqual("small");
  });

  it("updates selected display option on change", () => {
    testContext.component = testContext.renderComponent({});
    const dropdown = testContext.component.find(Dropdown);

    dropdown.prop("onChange")("small");

    expect(testContext.container.updateData).toHaveBeenCalledWith({
      display: "small"
    });
  });
});
