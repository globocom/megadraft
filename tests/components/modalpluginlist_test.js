/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from "react";
import { mount } from "enzyme";
import cp from "utils-copy";

import { ModalBody } from "backstage-modal";
import ModalPluginList from "../../src/components/ModalPluginList";
import DEFAULT_PLUGINS from "../../src/plugins/default.js";

class ModalWithPlugins extends Component {
  constructor(props) {
    super(props);
    this.plugins = this.props.plugins || DEFAULT_PLUGINS;
    this.fakeAux = cp(this.plugins.slice(0, 2));
    this.fakePlugins = this.fakeAux.concat(this.plugins.slice(0, 2));
    for (let i = 0; i < 4; i++) {
      this.fakePlugins[i].title = "plugin" + i;
      this.fakePlugins[i].type = "plugin" + i;
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(editorState) {
    this.props.onChange(editorState);
    this.setState({ editorState: editorState });
  }

  render() {
    return (
      <div ref="editor">
        <ModalPluginList
          handleModal={this.handleModal}
          plugins={this.fakePlugins}
          onChange={this.onChange}
          toggleModalVisibility={this.props.toggleModalVisibility}
          editorState={this.props.editorState}
        />
      </div>
    );
  }
}

describe("Sidebar Modal Component", () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    testContext.onChangeSpy = jest.fn();
    testContext.toggleModalVisibilitySpy = jest.fn();

    testContext.wrapper = mount(
      <ModalWithPlugins
        onChange={testContext.onChangeSpy}
        toggleModalVisibility={testContext.toggleModalVisibilitySpy}
      />
    );
  });

  it("should have plugins inside modal", () => {
    const modal = testContext.wrapper.find(ModalBody);

    const plugin = modal.find("li");

    expect(plugin.length).toBeGreaterThanOrEqual(1);
  });

  it("should have the all plugins inside modal", () => {
    const modal = testContext.wrapper.find(ModalBody);

    const plugin = modal.find(".megadraft-modal__item");

    expect(plugin).toHaveLength(4);
  });

  it("should be a real plugin", () => {
    const modal = testContext.wrapper.find(ModalBody);

    const plugin = modal.find("VideoButton");

    expect(plugin.length).toBeGreaterThanOrEqual(1);
  });

  it("should callback a function received when receives onChange call", () => {
    const newEditorState = {};
    const modal = testContext.wrapper.find(ModalPluginList);
    modal.instance().onChange(newEditorState);
    expect(testContext.onChangeSpy).toHaveBeenCalledWith(newEditorState);
  });

  it("should toggle visibility when receives onChange call", () => {
    const newEditorState = {};
    const modal = testContext.wrapper.find(ModalPluginList);
    modal.instance().onChange(newEditorState);
    expect(testContext.toggleModalVisibilitySpy).toHaveBeenCalled();
  });
});
