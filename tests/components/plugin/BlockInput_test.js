/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import { mount } from "enzyme";

import { BlockInput } from "../../../src/components/plugin";

describe("BlockInput Component", () => {
  let testContext;

  beforeEach(() => {
    testContext = {};

    testContext.renderComponent = props => {
      props = props || {};
      return mount(<BlockInput onChange={jest.fn()} {...props} />);
    };
  });

  it("uses `empty` class when value is empty", () => {
    const component = testContext.renderComponent();
    const input = component.find("input");
    expect(input.hasClass("block__input--empty")).toBeTruthy();
  });

  it("disables `empty` class when there is a value", () => {
    const component = testContext.renderComponent({ value: "non-empty" });
    const input = component.find("input");
    expect(input.hasClass("block__input--empty")).toBeFalsy();
  });

  it("renders input value", () => {
    const component = testContext.renderComponent({ value: "non-empty" });
    const domInput = component.find("input").getDOMNode();
    expect(domInput.value).toEqual("non-empty");
  });

  it("renders input as default type attribute", () => {
    const component = testContext.renderComponent({});
    const input = component.find("input");
    expect(input.prop("type")).toEqual("text");
  });

  it("renders input as custom type attribute", () => {
    const component = testContext.renderComponent({ type: "url" });
    const input = component.find("input");
    expect(input.prop("type")).toEqual("url");
  });

  it("hides error text when there is no error", () => {
    const component = testContext.renderComponent({ value: "non-empty" });
    const elements = component.find(".block__input__error-text");
    expect(elements).toHaveLength(0);
  });

  it("renders error text when there is an error", () => {
    const component = testContext.renderComponent({ error: "Fake error" });
    const element = component.find(".block__input__error-text").getDOMNode();
    expect(element.textContent).toEqual("Fake error");
  });

  it("toggles `error` class when there is an error", () => {
    const component = testContext.renderComponent({ value: "non-empty" });
    const input = component.find("input");
    expect(input.hasClass("block__input--error")).toBeFalsy();
  });
});
