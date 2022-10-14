/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import { mount } from "enzyme";

import icons from "../../../src/icons";

import BlockActionGroup from "../../../src/components/plugin/BlockActionGroup";
import BlockAction from "../../../src/components/plugin/BlockAction";

describe("BlockActionGroup Component", () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    testContext.crop = jest.fn();
    testContext.edit = jest.fn();
    testContext.delete = jest.fn();

    const actionsItems = [
      { key: "crop", icon: icons.CropIcon, action: testContext.crop },
      { key: "edit", icon: icons.EditIcon, action: testContext.edit },
      { key: "delete", icon: icons.DeleteIcon, action: testContext.delete }
    ];

    testContext.component = mount(<BlockActionGroup items={actionsItems} />);
  });

  it("renders without problems", () => {
    expect(testContext.component).toHaveLength(1);
  });

  it("renders actions items", () => {
    const items = testContext.component.find(BlockAction);
    expect(items).toHaveLength(3);
  });
});
