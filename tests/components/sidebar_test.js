/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Entity} from "draft-js";
import TestUtils from "react-addons-test-utils";
import chai from "chai";

import Sidebar,
  {ToggleButton, SideMenu} from "../../src/components/Sidebar";
import image from "../../src/plugins/image/plugin";
import {editorStateFromRaw} from "../../src/utils";
import DEFAULT_PLUGINS from "../../src/plugins/default.js";

let expect = chai.expect;


class SidebarWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
    this.plugins = DEFAULT_PLUGINS;
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
          onChange={::this.onChange} />
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
    this.wrapper = TestUtils.renderIntoDocument(
      <SidebarWrapper editorState={this.editorState}/>
    );
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(
      ReactDOM.findDOMNode(this.wrapper).parentNode);
  });

  it("renders correctly on the page", function() {
    const sidebar = TestUtils.findRenderedComponentWithType(
      this.wrapper, Sidebar);
    expect(ReactDOM.findDOMNode(sidebar)).to.exist;
  });

  it("renders the enabled plugins", function() {
    const button = TestUtils.findRenderedComponentWithType(
      this.wrapper, image.buttonComponent);
    expect(ReactDOM.findDOMNode(button)).to.exist;
  });

  it("has the menu hidden by default", function() {
    const menu = TestUtils.findRenderedComponentWithType(
      this.wrapper, SideMenu);
    const domMenu = TestUtils.findRenderedDOMComponentWithTag(menu, "ul");
    // expect(domMenu.style["max-height"]).to.be.equal("0");
    expect(domMenu.classList.contains("sidemenu__items--open")).to.be.false;
  });

  it("opens the menu on click", function() {
    const toggleButton = TestUtils.findRenderedComponentWithType(
      this.wrapper, ToggleButton);
    const domButton = TestUtils.findRenderedDOMComponentWithTag(
      toggleButton, "button");
    TestUtils.Simulate.click(domButton);
    const menu = TestUtils.findRenderedComponentWithType(
      this.wrapper, SideMenu);
    const domMenu = TestUtils.findRenderedDOMComponentWithTag(menu, "ul");
    expect(domMenu.classList.contains("sidemenu__items--open")).to.be.true;
  });

  it("is possible to click on the button", function() {
    const button = TestUtils.findRenderedComponentWithType(
      this.wrapper, image.buttonComponent);
    const domButton = TestUtils.findRenderedDOMComponentWithTag(
      button, "button");
    window.prompt = () => "http://www.globo.com";
    TestUtils.Simulate.click(domButton);
    const contentState = this.wrapper.state.editorState.getCurrentContent();
    let entityKey = null;
    contentState.getBlockMap().forEach((block) => {
      if (block.getType() === "atomic") {
        entityKey = block.getEntityAt(0);
      }
    });
    const imageEntity = Entity.get(entityKey);
    const {src} = imageEntity.getData();
    expect(src).to.be.equal("http://www.globo.com");
  });
});
