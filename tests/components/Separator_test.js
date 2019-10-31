/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import { mount } from "enzyme";

import Separator from "../../src/components/Separator";

describe("Separator Component", () => {
  let separatorWrapper;

  separatorWrapper = mount(<Separator />);

  it("should render correctly", () => {
    expect(separatorWrapper.length).toEqual(1);

    expect(
      separatorWrapper.find("li").hasClass("toolbar__item--separator")
    ).toEqual(true);
  });
});
