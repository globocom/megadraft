/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import { shallow } from "enzyme";

import ErrorBoundary from "../../src/components/ErrorBoundary";
import i18nConfig from "../../src/i18n";

describe("ErrorBoundary Component", () => {
  let testContext;

  beforeEach(() => {
    testContext = {};

    testContext.renderComponent = props => {
      props = props || {
        i18n: i18nConfig["en-US"],
        container: { remove: jest.fn() },
        data: { type: "foo" }
      };
      return shallow(<ErrorBoundary onChange={jest.fn()} {...props} />);
    };
  });

  it("renders error", () => {
    const component = testContext.renderComponent();
    component.setState({ errorInfo: true, error: "My Error" });
    expect(component).toHaveLength(1);
  });

  it("renders without error", () => {
    const component = testContext.renderComponent();
    expect(component.getElement()).toBe(null);
  });

  it("should return the correct message", () => {
    const wrapper = testContext.renderComponent();
    wrapper.setState({ errorInfo: true, error: "My Error" });
    expect(wrapper.find("MediaMessage").props().text).toEqual(
      "Something went wrong in component 'foo'. My Error"
    );
  });
});
