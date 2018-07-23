/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import { mount } from "enzyme";

import LinkInput from "../../src/entity_inputs/LinkInput";

describe("LinkInput Component", () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    testContext.cancelEntity = jest.fn();
    testContext.setEntity = jest.fn();
    testContext.setError = jest.fn();
    testContext.cancelError = jest.fn();

    testContext.wrapper = mount(
      <LinkInput
        entityType="LINK"
        editor={testContext.editor}
        cancelEntity={testContext.cancelEntity}
        setEntity={testContext.setEntity}
        setError={testContext.setError}
        cancelError={testContext.cancelError}
      />
    );
  });

  it("should set a link entity on keypress and call cancel", () => {
    const input = testContext.wrapper.find(".toolbar__input");
    const inputNode = input.getDOMNode();
    inputNode.blur = jest.fn();

    inputNode.value = "http://www.globo.com";
    input.simulate("change");
    input.simulate("keyDown", { key: "Enter", keyCode: 13, which: 13 });
    expect(testContext.setEntity).toHaveBeenCalledWith({
      url: "http://www.globo.com"
    });
    expect(testContext.cancelEntity).toHaveBeenCalled();
    // Work around Firefox's NS_ERROR_FAILURE
    expect(inputNode.blur).toHaveBeenCalled();
  });

  it("esc key should cancel the link", () => {
    const input = testContext.wrapper.find(".toolbar__input");
    const inputNode = input.getDOMNode();

    inputNode.value = "http://www.globo.com";
    input.simulate("change");
    input.simulate("keyDown", { key: "Escape", keyCode: 27, which: 27 });
    expect(testContext.setEntity).not.toHaveBeenCalled();
    expect(testContext.cancelEntity).toHaveBeenCalled();
  });

  it("should add protocol to links", () => {
    const input = testContext.wrapper.find(".toolbar__input");
    const inputNode = input.getDOMNode();

    inputNode.value = "www.globo.com";
    input.simulate("change");
    input.simulate("keyDown", { key: "Enter", keyCode: 13, which: 13 });
    expect(testContext.setEntity).toHaveBeenCalledWith({
      url: "http://www.globo.com"
    });
  });

  it("should error on invalid link", () => {
    const input = testContext.wrapper.find(".toolbar__input");
    const inputNode = input.getDOMNode();

    inputNode.value = "globo";
    input.simulate("change");
    input.simulate("keyDown", { key: "Enter", keyCode: 13, which: 13 });
    expect(testContext.setError).toHaveBeenCalledWith("Invalid Link");

    inputNode.value = "[12/12/2016] globo.com";
    input.simulate("change");
    input.simulate("keyDown", { key: "Enter", keyCode: 13, which: 13 });
    expect(testContext.setError).toHaveBeenCalledWith("Invalid Link");
  });

  it("should clear error on empty input", () => {
    const input = testContext.wrapper.find(".toolbar__input");
    const inputNode = input.getDOMNode();

    inputNode.value = "globo";
    input.simulate("change");
    input.simulate("keyDown", { key: "Enter", keyCode: 13, which: 13 });

    inputNode.value = "";
    input.simulate("change");
    input.simulate("keyDown", { key: "Enter", keyCode: 13, which: 13 });
    expect(testContext.cancelError).toHaveBeenCalled();
  });
});
