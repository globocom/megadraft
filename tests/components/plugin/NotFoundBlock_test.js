/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import { shallow } from "enzyme";
import icons from "../../../src/icons";
import NotFoundBlock from "../../../src/plugins/not-found/NotFoundBlock";
import i18nConfig from "../../../src/i18n";

describe("NotFoundBlock Component", () => {
  let testContext;

  beforeEach(() => {
    testContext = {};

    testContext.renderComponent = props => {
      props = props || {
        i18n: i18nConfig["en-US"],
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
  it("should render message even without a type", () => {
    const props = {
      i18n: i18nConfig["en-US"],
      container: { remove: jest.fn() },
      data: {}
    };
    const wrapper = testContext.renderComponent(props);
    expect(wrapper.find("MediaMessage").props().text).toEqual(
      "Can't show plugin, component not found."
    );
  });
});
