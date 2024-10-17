/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import { mount } from "enzyme";

import image from "../../src/plugins/image/plugin";
import PluginsModal from "../../src/components/PluginsModal";
import { ActionsContext } from "../../src/components/ActionsProvider";

describe("PluginsModal", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const mountComponent = (params = {}, onAction = jest.fn()) => {
    const props = {
      i18n: {},
      isOpen: false,
      toggleModalVisibility: jest.fn(),
      plugins: [image],
      onChange: jest.fn(),
      editorState: {},
      modalOptions: {},
      ...params
    };

    return mount(
      <ActionsContext.Provider value={{ onAction }}>
        <PluginsModal {...props} />
      </ActionsContext.Provider>
    );
  };

  it("should be able to render component", () => {
    const component = mountComponent();
    expect(component.find("Modal")).toBeTruthy();
  });

  it("should be able to render modal with different size options", () => {
    const component = mountComponent({
      modalOptions: {
        width: 900,
        height: 900
      }
    });

    const { width, height } = component.find("Modal").props();
    expect(width).toEqual(900);
    expect(height).toEqual(900);
  });

  it("should be able to execute onCloseRequest function", () => {
    const toggleModalVisibility = jest.fn();
    const onAction = jest.fn();

    const component = mountComponent(
      {
        isOpen: true,
        toggleModalVisibility
      },
      onAction
    );
    
  it("should not render modal when isOpen is false", () => {
    const component = mountComponent({
      isOpen: false
    });
  
    // Check if the Modal has not been rendered
    expect(component.find("Modal").exists()).toBe(false);
  });
  
    const { onCloseRequest } = component.find("Modal").props();
    onCloseRequest();
    expect(toggleModalVisibility).toHaveBeenCalled();
    expect(onAction).toHaveBeenCalled();
  });
});
