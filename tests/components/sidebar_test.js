/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {mount} from "enzyme";
import cp from "utils-copy";

import Sidebar, {ToggleButton, SideMenu} from "../../src/components/Sidebar";
import PluginsModal from "../../src/components/PluginsModal";
import image from "../../src/plugins/image/plugin";
import {editorStateFromRaw} from "../../src/utils";
import DEFAULT_PLUGINS from "../../src/plugins/default.js";
import ImageButton from "../../src/plugins/image/ImageButton";

class SidebarWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
    this.plugins = this.props.plugins || DEFAULT_PLUGINS;
    this.editorHasFocus = true;
    this.onChange = ::this.onChange;
  }

  onChange(editorState) {
    this.setState({editorState: editorState});
  }

  render() {
    return (
      <div ref="editor">
        <Sidebar
          ref="sidebar"
          plugins={this.plugins}
          editorState={this.state.editorState}
          readOnly={this.props.readOnly}
          onChange={this.onChange}
          editorHasFocus={this.editorHasFocus} />
      </div>
    );
  }
}


class SidebarWithModalWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
    this.plugins = this.props.plugins || DEFAULT_PLUGINS;
    this.fakeAux = cp(this.plugins.slice(0,2));
    this.fakePlugins = this.fakeAux.concat(this.plugins.slice(0,2));
    for(let i=0; i<4; i++){
      this.fakePlugins[i].type = "plugin" + i;
    }
    this.maxSidebarButtons = 3;
    this.modalOptions = {width: 500, height: 300};
    this.editorHasFocus = true;
    this.onChange = ::this.onChange;
  }

  onChange(editorState) {
    this.setState({editorState: editorState});
  }

  render() {
    return (
      <div ref="editor">
        <Sidebar
          ref="sidebar"
          plugins={this.fakePlugins}
          editorState={this.state.editorState}
          readOnly={this.props.readOnly}
          onChange={this.onChange}
          maxSidebarButtons={this.maxSidebarButtons}
          modalOptions={this.modalOptions}
          editorHasFocus={this.editorHasFocus} />
      </div>
    );
  }
}

describe("Sidebar Component", () => {
  let editorState, wrapper, wrapperSidebarModal;
  beforeEach(() => {
    const INITIAL_CONTENT = {
      "entityMap": {},
      "blocks": [
        {
          "key": "ag6qs",
          "text": "Hello World!",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": []
        }
      ]
    };

    editorState = editorStateFromRaw(INITIAL_CONTENT);
    wrapper = mount(
      <SidebarWrapper editorState={editorState}/>
    );
    wrapperSidebarModal = mount(
      <SidebarWithModalWrapper editorState={editorState}/>
    );
  });

  it("renders correctly on the page", () => {
    const sidebar = wrapper.find(Sidebar);
    expect(sidebar).toHaveLength(1);
    expect(sidebar.html()).not.toBeNull();
  });

  it("renders as null when readOnly is set", () => {
    const wrapper = mount(
      <SidebarWrapper readOnly editorState={editorState}/>
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

  it("is possible to click on the button", () => {
    const toggleButton = wrapper.find(ImageButton);
    const domButton = toggleButton.find("button");

    window.prompt = () => "http://www.globo.com";
    domButton.simulate("click");

    const contentState = wrapper.state("editorState").getCurrentContent();
    let data = null;
    contentState.getBlockMap().forEach((block) => {
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

  it("should not have a modal button with less than 4 plugins", () => {
    const toggleButton = wrapper.find(ToggleButton);
    const domButton = toggleButton.find("button");

    domButton.simulate("click");

    const menu = wrapper.find(SideMenu);
    const domMenu = menu.find("button");
    const domModalButton = domMenu.at(4);

    expect(domModalButton.exists()).toBeFalsy();
  });

  it("should has plugins in modal if it's avaiable", () => {
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

  it("should has modal with props width", () => {
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

  it("should has modal with props height", () => {
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
});
