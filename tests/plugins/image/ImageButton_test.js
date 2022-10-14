/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import { shallow, mount } from "enzyme";

import ImageButton from "../../../src/plugins/image/ImageButton";
import { editorStateFromRaw } from "../../../src/utils";

describe("ImageButton component", () => {
  let testContext;

  beforeEach(() => {
    const INITIAL_CONTENT = {
      entityMap: {},
      blocks: []
    };

    testContext = {
      onChange: jest.fn(),
      editorState: editorStateFromRaw(INITIAL_CONTENT),
      className: "image-button",
      title: "title image button"
    };

    jest.spyOn(window, "prompt").mockImplementation(() => "Enter an URL");

    testContext.wrapper = mount(<ImageButton {...testContext} />);
  });

  // smoke test
  it("it should render", () => {
    shallow(<ImageButton />);
  });

  it("it should render the expected HTML", () => {
    expect(testContext.wrapper.html()).toMatchSnapshot();
  });

  it("it should render the expected className", () => {
    expect(testContext.wrapper.find("button.image-button")).toHaveLength(1);
  });

  it("it should render the expected attribute title", () => {
    expect(testContext.wrapper.find("button").props()["title"]).toBe(
      "title image button"
    );
  });

  it("it should simulate the click button", () => {
    testContext.wrapper.find("button").simulate("click");
    expect(testContext.onChange.mock.calls.length).toEqual(1);
  });
});
