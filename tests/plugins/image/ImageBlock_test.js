/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import {mount} from "enzyme";

import ImageBlock from "../../../src/plugins/image/ImageBlock";
import icons from "../../../src/icons";

describe("ImageBlock", () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    testContext.data = {
      caption: "media caption",
      rightsHolder: "media rights"
    };

    testContext.setReadOnly = jest.fn();
    testContext.updateData = jest.fn();
    testContext.remove = jest.fn();

    const displayOptions = [
      {key: "small", icon: icons.MediaSmallIcon, label: "SMALL"},
      {key: "medium", icon: icons.MediaMediumIcon, label: "MEDIUM"}
    ];
    const defaultDisplay = "medium";
    const blockProps = {plugin: {options: {displayOptions, defaultDisplay}}};

    testContext.wrapper = mount(
      <ImageBlock
        container={testContext}
        blockProps={blockProps}
        data={testContext.data}
      />
    );

    testContext.caption = testContext.wrapper.find("input").at(0);
    testContext.rights = testContext.wrapper.find("input").at(1);
  });

  it("renders caption from data", () => {
    expect(testContext.caption.getDOMNode().value).toEqual(
      testContext.data.caption
    );
  });

  it("renders rightsHolder from data", () => {
    expect(testContext.rights.getDOMNode().value).toEqual(
      testContext.data.rightsHolder
    );
  });

  it("updates entity on caption change", () => {
    testContext.caption.getDOMNode().value = "new caption";
    testContext.caption.simulate("change");
    expect(testContext.updateData).toBeCalledWith({caption: "new caption"});
  });

  it("updates entity on rightsHolder change", () => {
    testContext.rights.getDOMNode().value = "new rights";
    testContext.rights.simulate("change");
    expect(testContext.updateData).toBeCalledWith({rightsHolder: "new rights"});
  });
});
