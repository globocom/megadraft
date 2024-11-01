/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import { mount } from "enzyme";
import React from "react";

import LinkInput from "../../src/entity_inputs/LinkInput";
import i18nConfig from "../../src/i18n";

describe("LinkInput Component", () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    testContext.cancelEntity = jest.fn();
    testContext.cancelError = jest.fn();
    testContext.setEntity = jest.fn();
    testContext.setError = jest.fn();

    testContext.wrapper = mount(
      <LinkInput
        cancelEntity={testContext.cancelEntity}
        cancelError={testContext.cancelError}
        editor={testContext.editor}
        entityType="LINK"
        i18n={i18nConfig["en-US"]}
        setEntity={testContext.setEntity}
        setError={testContext.setError}
        url={"globo.io"}
      />
    );
  });

  it("url received by props should be in the input value", () => {
    const input = testContext.wrapper.find(".toolbar__input");
    const inputNode = input.getDOMNode();

    expect(inputNode.value).toEqual("globo.io");
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

  it("should support underscored subdomains links", () => {
    const input = testContext.wrapper.find(".toolbar__input");
    const inputNode = input.getDOMNode();

    inputNode.value = "https://has_underscore.example.com/";
    input.simulate("change");
    input.simulate("keyDown", { key: "Enter", keyCode: 13, which: 13 });
    expect(testContext.setEntity).toHaveBeenCalledWith({
      url: "https://has_underscore.example.com/"
    });
  });

  it("should return 'Invalid Link' with a empty i18n object", () => {
    testContext.wrapper.setProps({ i18n: {} });

    const input = testContext.wrapper.find(".toolbar__input");
    const inputNode = input.getDOMNode();
    inputNode.value = "";
    input.simulate("change");
    input.simulate("keyDown", { key: "Enter", keyCode: 13, which: 13 });
    expect(testContext.cancelError).toHaveBeenCalled();
  });

  it("should show translated error message when i18n is changed", () => {
    testContext.wrapper.setProps({ i18n: i18nConfig["pt-BR"] });

    const input = testContext.wrapper.find(".toolbar__input");
    const inputNode = input.getDOMNode();

    inputNode.value = "globo";
    input.simulate("change");
    input.simulate("keyDown", { key: "Enter", keyCode: 13, which: 13 });

    expect(testContext.setError).toHaveBeenCalledWith("Link inválido");
  });

  it("should have the default message in english", () => {
    testContext.wrapper.setProps({ i18n: i18nConfig["en-US"] });

    const input = testContext.wrapper.find(".toolbar__input");

    expect(input.prop("placeholder")).toEqual("Type the link and press enter");
  });

  it("should use the placeholder message in portuguese if i18n is on", () => {
    testContext.wrapper.setProps({ i18n: i18nConfig["pt-BR"] });

    const input = testContext.wrapper.find(".toolbar__input");

    expect(input.prop("placeholder")).toEqual(
      "Digite o link e pressione enter"
    );
  });
});
