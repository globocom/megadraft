/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import {mount} from "enzyme";

import icons from "../../../src/icons";
import BlockAction from "../../../src/components/plugin/BlockAction";

describe("BlockAction Component", () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    testContext.crop = jest.fn();

    const item = {key: "crop", icon: icons.CropIcon, action: testContext.crop};

    testContext.wrapper = mount(<BlockAction item={item} key={item.key} />);
  });

  it("renders without problems", () => {
    const blockAction = testContext.wrapper.find(BlockAction);
    expect(blockAction).toHaveLength(1);
  });

  it("is possible to click on the action item", () => {
    const itemDOM = testContext.wrapper.find("li");

    expect(testContext.crop).not.toHaveBeenCalled();

    itemDOM.simulate("click");

    expect(testContext.crop).toHaveBeenCalled();
  });
});
