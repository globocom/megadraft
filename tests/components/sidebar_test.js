/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from "react";
import { mount } from "enzyme";
import cp from "utils-copy";
import i18nConfig from "../../src/i18n";
import Sidebar, { ToggleButton, SideMenu } from "../../src/components/Sidebar";
import ActionsProvider from "../../src/components/ActionsProvider";
import PluginsModal from "../../src/components/PluginsModal";
import image from "../../src/plugins/image/plugin";
import { editorStateFromRaw } from "../../src/utils";
import DEFAULT_PLUGINS from "../../src/plugins/default.js";
import ImageButton from "../../src/plugins/image/ImageButton";
import {
  SIDEBAR_EXPAND,
  SIDEBAR_SHRINK,
  SIDEBAR_CLICK_MORE,
  SIDEBAR_ADD_PLUGIN
} from "../../src/constants";

class SidebarWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
    this.plugins = this.props.plugins || DEFAULT_PLUGINS;
    this.editorHasFocus = true;
    this.onChange = this.onChange.bind(this);
    this.onAction = jest.fn();
  }

  onChange(editorState) {
    this.setState({ editorState: editorState });
  }

  render() {
    return (
      <div ref="editor">
        <ActionsProvider onAction={this.onAction}>
          <Sidebar
            i18n={this.props.i18n}
            ref="sidebar"
            plugins={this.plugins}
            editorState={this.state.editorState}
            readOnly={this.props.readOnly}
            onChange={this.onChange}
            editorHasFocus={this.editorHasFocus}
          />
        </ActionsProvider>
      </div>
    );
  }
}

class SidebarWithModalWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
    this.plugins = this.props.plugins || DEFAULT_PLUGINS;
    this.fakeAux = cp(this.plugins.slice(0, 2));
    this.fakePlugins = this.fakeAux.concat(this.plugins.slice(0, 2));
    for (let i = 0; i < 4; i++) {
      this.fakePlugins[i].type = "plugin" + i;
    }
    this.maxSidebarButtons = 3;
    this.modalOptions = { width: 500, height: 300 };
    this.editorHasFocus = true;
    this.onChange = this.onChange.bind(this);
    this.onAction = jest.fn();
  }

  onChange(editorState) {
    this.setState({ editorState: editorState });
  }

  render() {
    return (
      <div ref="editor">
        <ActionsProvider onAction={this.onAction}>
          <Sidebar
            i18n={this.props.i18n}
            ref="sidebar"
            plugins={this.fakePlugins}
            editorState={this.state.editorState}
            readOnly={this.props.readOnly}
            onChange={this.onChange}
            maxSidebarButtons={this.maxSidebarButtons}
            modalOptions={this.modalOptions}
            editorHasFocus={this.editorHasFocus}
          />
        </ActionsProvider>
      </div>
    );
  }
}

describe("Sidebar Component", () => {
  let editorState, wrapper, wrapperSidebarModal;
  beforeEach(() => {
    const INITIAL_CONTENT = {
      entityMap: {},
      blocks: [
        {
          key: "ag6qs",
          text: "Hello World!",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: []
        }
      ]
    };

    editorState = editorStateFromRaw(INITIAL_CONTENT);
    wrapper = mount(
      <SidebarWrapper editorState={editorState} i18n={i18nConfig["en-US"]} />
    );
    wrapperSidebarModal = mount(
      <SidebarWithModalWrapper
        editorState={editorState}
        i18n={i18nConfig["en-US"]}
      />
    );
  });

  it("renders correctly on the page", () => {
    const sidebar = wrapper.find(Sidebar);
    expect(sidebar).toHaveLength(1);
    expect(sidebar.html()).not.toBeNull();
  });

  it("renders as null when readOnly is set", () => {
    const wrapper = mount(
      <SidebarWrapper
        readOnly
        editorState={editorState}
        i18n={i18nConfig["en-US"]}
      />
    );
    const sidebar = wrapper.find(Sidebar);
    expect(sidebar.html()).toBeNull();
  });

  it("renders enabled plugins", () => {
    const button = wrapper.find(image.buttonComponent);
    expect(button).toHaveLength(1);
  });

  it("renders only valid plugins", () => {
    const invalidPlugin = {
      type: "invalid-plugin",
      blockComponent: {}
    };
    const plugins = [image, invalidPlugin];
    const wrapper = mount(
      <SidebarWrapper editorState={editorState} plugins={plugins} />
    );
    const sidemenu = wrapper.find(SideMenu);
    expect(sidemenu.prop("plugins")).toHaveLength(1);
  });

  it("has the menu hidden by default", () => {
    const menu = wrapper.find(SideMenu);
    const domMenu = menu.find("button").at(0);
    expect(domMenu.hasClass("sidemenu__items--open")).toBeFalsy();
  });

  it("opens the menu on click", () => {
    const toggleButton = wrapper.find(ToggleButton);
    const domButton = toggleButton.find("button");

    domButton.simulate("click");

    const menu = wrapper.find(SideMenu);
    const domMenu = menu.find("button").at(0);
    expect(domMenu.hasClass("sidemenu__button--open")).toBeTruthy();
  });

  it("should call onAction prop on the menu on click", () => {
    const toggleButton = wrapper.find(ToggleButton);
    const domButton = toggleButton.find("button");
    const onActionCall = wrapper.instance().onAction.mock.calls;

    domButton.simulate("click");

    const expectedOpenCall = { type: SIDEBAR_EXPAND };
    expect(onActionCall[0][0]).toEqual(expectedOpenCall);

    domButton.simulate("click");

    const expectedCloseCall = { type: SIDEBAR_SHRINK };
    expect(onActionCall[1][0]).toEqual(expectedCloseCall);
  });

  it("is possible to click on the button", () => {
    const toggleButton = wrapper.find(ImageButton);
    const domButton = toggleButton.find("button");

    window.prompt = () => "http://www.globo.com";
    domButton.simulate("click");

    const contentState = wrapper.state("editorState").getCurrentContent();
    let data = null;
    contentState.getBlockMap().forEach(block => {
      if (block.getType() === "atomic") {
        data = block.getData();
      }
    });
    expect(data.get("src")).toEqual("http://www.globo.com");
  });

  it("should have a modal button when there is 4 plugins", () => {
    const toggleButton = wrapperSidebarModal.find(ToggleButton);
    const domButton = toggleButton.find("button");

    domButton.simulate("click");

    const menu = wrapperSidebarModal.find(SideMenu);
    const domMenu = menu.find("button");
    const domModalButton = domMenu.at(4);
    domModalButton.simulate("click");

    const modal = wrapperSidebarModal.find(PluginsModal);
    const domModal = modal.find("Modal");
    expect(domModal.prop("className")).toEqual("megadraft-modal");
  });

  it("should call onAction prop on add plugin click", () => {
    const toggleButton = wrapper.find(ToggleButton);
    const domButton = toggleButton.find("button");
    const onActionCall = wrapper.instance().onAction.mock.calls;

    domButton.simulate("click");

    const domPluginButton = wrapper
      .find(SideMenu)
      .find("li ul li")
      .first();

    domPluginButton.simulate("click", { target: { name: 0 } });

    const expectedCall = {
      type: SIDEBAR_ADD_PLUGIN,
      pluginName: "Image"
    };
    expect(onActionCall[1][0]).toEqual(expectedCall);
  });

  it("should call onAction prop on show all plugins button click", () => {
    const toggleButton = wrapperSidebarModal.find(ToggleButton);
    const domButton = toggleButton.find("button");
    const onActionCall = wrapperSidebarModal.instance().onAction.mock.calls;

    domButton.simulate("click");

    const menu = wrapperSidebarModal.find(SideMenu);
    const domMenu = menu.find("button");
    const domModalButton = domMenu.at(4);
    domModalButton.simulate("click");

    const expectedOpenCall = { type: SIDEBAR_CLICK_MORE };
    expect(onActionCall[1][0]).toEqual(expectedOpenCall);
  });

  it("should not have a modal button with less than 4 plugins", () => {
    const toggleButton = wrapper.find(ToggleButton);
    const domButton = toggleButton.find("button");

    domButton.simulate("click");

    const menu = wrapper.find(SideMenu);
    const domMenu = menu.find("button");
    const domModalButton = domMenu.at(4);

    expect(domModalButton.exists()).toBeFalsy();
  });

  it("should have plugins in modal if it's avaiable", () => {
    const toggleButton = wrapperSidebarModal.find(ToggleButton);
    const domButton = toggleButton.find("button");

    domButton.simulate("click");

    const menu = wrapperSidebarModal.find(SideMenu);
    const domMenu = menu.find("button");
    const domModalButton = domMenu.at(4);

    domModalButton.simulate("click");

    const modal = wrapperSidebarModal.find(PluginsModal);
    const items = modal.prop("plugins").length;
    expect(items).toBeGreaterThanOrEqual(1);
  });

  it("should have modal with props width", () => {
    const toggleButton = wrapperSidebarModal.find(ToggleButton);
    const domButton = toggleButton.find("button");
    domButton.simulate("click");

    const menu = wrapperSidebarModal.find(SideMenu);
    const domMenu = menu.find("button");
    const domModalButton = domMenu.at(4);

    domModalButton.simulate("click");
    const modal = wrapperSidebarModal.find(PluginsModal);
    const domModal = modal.find("Modal");

    expect(domModal.prop("width")).toBeDefined();
  });

  it("should have modal with props height", () => {
    const toggleButton = wrapperSidebarModal.find(ToggleButton);
    const domButton = toggleButton.find("button");
    domButton.simulate("click");

    const menu = wrapperSidebarModal.find(SideMenu);
    const domMenu = menu.find("button");
    const domModalButton = domMenu.at(4);

    domModalButton.simulate("click");
    const modal = wrapperSidebarModal.find(PluginsModal);
    const domModal = modal.find("Modal");

    expect(domModal.prop("height")).toBeDefined();
  });

  it("should have modal with props title equals to 'Block List' by default", () => {
    const modal = wrapperSidebarModal.find(PluginsModal);
    const domModal = modal.find("Modal");

    expect(domModal.prop("title")).toEqual("Block List");
  });

  it("should be able to change the modal title via i18n", () => {
    wrapperSidebarModal.setProps({ i18n: i18nConfig["pt-BR"] });
    const modal = wrapperSidebarModal.find(PluginsModal);
    const domModal = modal.find("Modal");

    expect(domModal.prop("title")).toEqual("Lista de Blocos");
  });
});
