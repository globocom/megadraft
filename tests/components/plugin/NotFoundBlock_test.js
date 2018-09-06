/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import { shallow } from "enzyme";
import icons from "../../../src/icons";
import NotFoundBlock from "../../../src/plugins/not-found/NotFoundBlock";

describe("NotFoundBlock Component", () => {
  let testContext;

  beforeEach(() => {
    testContext = {};

    testContext.renderComponent = props => {
      props = props || {
        i18n: {
          "Can't show plugin, component {{type}} not found.":
            "Can't show plugin, component {{type}} not found."
        },
        container: { remove: jest.fn() },
        data: { type: "foo" }
      };
      return shallow(<NotFoundBlock onChange={jest.fn()} {...props} />);
    };
  });

  it("should pass the correct prop action to the CommonBlock .'", () => {
    const wrapper = testContext.renderComponent();
    expect(wrapper.find("CommonBlock").props().actions).toEqual([
      {
        key: "delete",
        icon: icons.DeleteIcon,
        action: expect.any(Function)
      }
    ]);
  });
  it("should return the correct message", () => {
    const wrapper = testContext.renderComponent();
    expect(wrapper.find("MediaMessage").props().text).toEqual(
      "Can't show plugin, component foo not found."
    );
  });
});
