/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import chai from "chai";
import sinon from "sinon";
import {mount} from "enzyme";
import cp from "utils-copy";

import {ModalBody} from "backstage-modal";
import ModalPluginList from "../../src/components/ModalPluginList";
import DEFAULT_PLUGINS from "../../src/plugins/default.js";

let expect = chai.expect;

class ModalWithPlugins extends Component {
  constructor(props) {
    super(props);
    this.plugins = this.props.plugins || DEFAULT_PLUGINS;
    this.fakeAux = cp(this.plugins.slice(0,2));
    this.fakePlugins = this.fakeAux.concat(this.plugins.slice(0,2));
    for(let i=0; i<4; i++){
      this.fakePlugins[i].title = "plugin" + i;
      this.fakePlugins[i].type = "plugin" + i;
    }
    this.onChange = ::this.onChange;

  }

  onChange(editorState) {
    this.setState({editorState: editorState});
  }

  render() {
    let onChange = this.onChange;
    if (this.props.onChange) {
      onChange = this.props.onChange;
    }

    let toggleModalVisibility = sinon.spy();
    if (this.props.toggleModalVisibility) {
      toggleModalVisibility = this.props.toggleModalVisibility;
    }

    return (
      <div ref="editor">
        <ModalPluginList
          handleModal={this.handleModal}
          plugins={this.fakePlugins}
          onChange={onChange}
          toggleModalVisibility={toggleModalVisibility}
          editorState={this.props.editorState} />
      </div>
    );
  }
}

describe("Sidebar Modal Component", function() {
  beforeEach(function() {
    this.wrapper = mount(
      <ModalWithPlugins />
    );
  });


  it("should has plugins inside modal", function() {
    const modal = this.wrapper.find(ModalBody);

    const plugin = modal.find("li");

    expect(plugin.length).to.be.at.least(1);
  });

  it("should has the all plugins inside modal", function() {
    const modal = this.wrapper.find(ModalBody);

    const plugin = modal.find(".megadraft-modal__item");

    expect(plugin).to.have.length(4);
  });

  it("should be a real plugin", function() {
    const modal = this.wrapper.find(ModalBody);

    const plugin = modal.find("VideoButton");

    expect(plugin.length).to.be.at.least(1);
  });

  it("should callback a function received when receives onChange call", function() {
    const onChangeSpy = sinon.spy();
    this.wrapper = mount(
      <ModalWithPlugins onChange={onChangeSpy} />
    );
    const newEditorState = {};
    const modal = this.wrapper.find(ModalPluginList);
    modal.getNode().onChange(newEditorState);
    expect(onChangeSpy).to.be.calledWith(newEditorState);
  });

  it("should toggle visibility when receives onChange call", function() {
    const toggleModalVisibility = sinon.spy();
    this.wrapper = mount(
      <ModalWithPlugins toggleModalVisibility={toggleModalVisibility} />
    );
    const newEditorState = {};
    const modal = this.wrapper.find(ModalPluginList);
    modal.getNode().onChange(newEditorState);
    expect(toggleModalVisibility).to.be.called;
  });
});
