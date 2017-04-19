/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import chai from "chai";
import {mount} from "enzyme";
import cp from "utils-copy";

import Sidebar,
  {ToggleButton, SideMenu} from "../../src/components/Sidebar";
import PluginsModal from "../../src/components/PluginsModal";
import image from "../../src/plugins/image/plugin";
import {editorStateFromRaw} from "../../src/utils";
import DEFAULT_PLUGINS from "../../src/plugins/default.js";
import ImageButton from "../../src/plugins/image/ImageButton";

let expect = chai.expect;


class SidebarWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
    this.plugins = this.props.plugins || DEFAULT_PLUGINS;
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
          onChange={this.onChange} />
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
          modalOptions={this.modalOptions}/>
      </div>
    );
  }
}

describe("Sidebar Component", function() {
  beforeEach(function() {
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

    this.editorState = editorStateFromRaw(INITIAL_CONTENT);
    this.wrapper = mount(
      <SidebarWrapper editorState={this.editorState}/>
    );
    this.wrapperSidebarModal = mount(
      <SidebarWithModalWrapper editorState={this.editorState}/>
    );
  });

  it("renders correctly on the page", function() {
    const sidebar = this.wrapper.find(Sidebar);
    expect(sidebar).to.have.length(1);
    expect(sidebar.html()).not.to.be.null;
  });

  it("renders as null when readOnly is set", function() {
    const wrapper = mount(
      <SidebarWrapper readOnly editorState={this.editorState}/>
    );
    const sidebar = wrapper.find(Sidebar);
    expect(sidebar.html()).to.be.null;
  });

  it("renders enabled plugins", function() {
    const button = this.wrapper.find(image.buttonComponent);
    expect(button).to.have.length(1);
  });

  it("renders only valid plugins", function() {
    const invalidPlugin = {
      type: "invalid-plugin",
      blockComponent: {}
    };
    const plugins = [image, invalidPlugin];
    const wrapper = mount(
      <SidebarWrapper editorState={this.editorState} plugins={plugins} />
    );
    const sidemenu = wrapper.find(SideMenu);
    expect(sidemenu.prop("plugins")).to.have.length(1);
  });

  it("has the menu hidden by default", function() {
    const menu = this.wrapper.find(SideMenu);
    const domMenu = menu.find("button").at(0);
    expect(domMenu.hasClass("sidemenu__items--open")).to.be.false;
  });

  it("opens the menu on click", function() {
    const toggleButton = this.wrapper.find(ToggleButton);
    const domButton = toggleButton.find("button");

    domButton.simulate("click");

    const menu = this.wrapper.find(SideMenu);
    const domMenu = menu.find("button").at(0);
    expect(domMenu.hasClass("sidemenu__button--open")).to.be.true;
  });

  it("is possible to click on the button", function() {
    const toggleButton = this.wrapper.find(ImageButton);
    const domButton = toggleButton.find("button");

    window.prompt = () => "http://www.globo.com";
    domButton.simulate("click");

    const contentState = this.wrapper.state("editorState").getCurrentContent();
    let data = null;
    contentState.getBlockMap().forEach((block) => {
      if (block.getType() === "atomic") {
        data = block.getData();
      }
    });
    expect(data.get("src")).to.be.equal("http://www.globo.com");
  });

  it("should has a modal button when there is 4 plugins", function() {
    const toggleButton = this.wrapperSidebarModal.find(ToggleButton);
    const domButton = toggleButton.find("button");

    domButton.simulate("click");

    const menu = this.wrapperSidebarModal.find(SideMenu);
    const domMenu = menu.find("button");
    const domModalButton = domMenu.at(4);
    domModalButton.simulate("click");

    const modal = this.wrapperSidebarModal.find(PluginsModal);
    const domModal = modal.find("Modal");
    expect(domModal.prop("className")).to.be.equal("megadraft-modal");
  });

  it("should not have a modal button with less than 4 plugins", function() {
    const toggleButton = this.wrapper.find(ToggleButton);
    const domButton = toggleButton.find("button");

    domButton.simulate("click");

    const menu = this.wrapper.find(SideMenu);
    const domMenu = menu.find("button");
    const domModalButton = domMenu.at(4);

    expect(domModalButton.component).to.be.equal(null);
  });

  it("should has plugins in modal if it's avaiable", function() {
    const toggleButton = this.wrapperSidebarModal.find(ToggleButton);
    const domButton = toggleButton.find("button");

    domButton.simulate("click");

    const menu = this.wrapperSidebarModal.find(SideMenu);
    const domMenu = menu.find("button");
    const domModalButton = domMenu.at(4);

    domModalButton.simulate("click");

    const modal = this.wrapperSidebarModal.find(PluginsModal);
    const items = modal.prop("plugins").length;
    expect(items).to.be.at.least(1);
  });

  it("should has modal with props width", function() {
    const toggleButton = this.wrapperSidebarModal.find(ToggleButton);
    const domButton = toggleButton.find("button");
    domButton.simulate("click");

    const menu = this.wrapperSidebarModal.find(SideMenu);
    const domMenu = menu.find("button");
    const domModalButton = domMenu.at(4);

    domModalButton.simulate("click");
    const modal = this.wrapperSidebarModal.find(PluginsModal);
    const domModal = modal.find("Modal");

    expect(domModal.prop("width")).to.be.exist;
  });

  it("should has modal with props width", function() {
    const toggleButton = this.wrapperSidebarModal.find(ToggleButton);
    const domButton = toggleButton.find("button");
    domButton.simulate("click");

    const menu = this.wrapperSidebarModal.find(SideMenu);
    const domMenu = menu.find("button");
    const domModalButton = domMenu.at(4);
    domModalButton.simulate("click");

    const modal = this.wrapperSidebarModal.find(PluginsModal);
    const domModal = modal.find("Modal");

    expect(domModal.prop("height")).to.be.exist;
  });

});
