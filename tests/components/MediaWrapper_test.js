/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import {mount} from "enzyme";

import MediaWrapper from "../../src/components/MediaWrapper";

describe("MediaWrapper", () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    testContext.setReadOnly = jest.fn();
    testContext.setInitialReadOnly = jest.fn();

    testContext.wrapper = mount(
      <MediaWrapper
        setReadOnly={testContext.setReadOnly}
        setInitialReadOnly={testContext.setInitialReadOnly}
      >
        <input type="text" />
      </MediaWrapper>
    );

    testContext.input = testContext.wrapper.find("input");
  });

  it("enables readOnly on input focus", () => {
    testContext.input.simulate("focus");
    expect(testContext.setReadOnly).toBeCalledWith(true);
  });

  it("restores readOnly on input blur", () => {
    testContext.input.simulate("blur");
    expect(testContext.setInitialReadOnly).toBeCalled();
  });
});
