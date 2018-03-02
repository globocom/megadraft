/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import {mount} from "enzyme";

import MediaMessage from "../../src/components/MediaMessage";

describe("MediaMessage Component", () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    testContext.renderComponent = props => {
      props = props || {};
      return mount(<MediaMessage {...props} />);
    };
  });

  it("renders component when there is a text", () => {
    const component = testContext.renderComponent({
      text: "some error",
      type: "error"
    });
    const element = component.find(".media__message--error");
    expect(element.text()).toEqual("some error");
  });

  it("hides component when there is no text", () => {
    const component = testContext.renderComponent({text: "", type: "error"});
    expect(component.children()).toHaveLength(0);
  });

  it("renders component when there is no type", () => {
    const component = testContext.renderComponent({
      text: "some info",
      type: ""
    });
    const element = component.find(".media__message--info");
    expect(element.text()).toEqual("some info");
  });
});
