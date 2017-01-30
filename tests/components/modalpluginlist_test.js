/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import chai from "chai";
import { mount } from "enzyme";
import cp from "utils-copy";

import { ModalBody } from "backstage-modal";
import ModalPluginList from "../../src/components/ModalPluginList";
import DEFAULT_PLUGINS from "../../src/plugins/default.js";

let expect = chai.expect;

class ModalWithPlugins extends Component {
  constructor(props) {
    super(props);
    this.plugins = this.props.plugins || DEFAULT_PLUGINS;
    this.fakeAux = cp(this.plugins.slice(0,2));
    this.fakePlugins = this.fakeAux.concat(this.plugins.slice(0,2));
    for(let i=0; i<3; i++){
      this.fakePlugins[i].title = "plugin" + i;
      this.fakePlugins[i].type = "plugin" + i;
    }
    this.onChange = ::this.onChange;

  }

  onChange(editorState) {
    this.setState({editorState: editorState});
  }

  render() {
    return (
      <div ref="editor">
        <ModalPluginList
              handleModal={this.handleModal}
              plugins={this.fakePlugins}
              onChange={this.onChange}
              editorState={this.props.editorState} />
      </div>
    );
  }
}

describe("Sidebar Component", function() {
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

  it("should has the 4th plugin inside modal", function() {
    const modal = this.wrapper.find(ModalBody);

    const plugin = modal.find("VideoButton");

    expect(plugin.props()).have.deep.property("title", "Video");
  });

  it("should be a real plugin", function() {
    const modal = this.wrapper.find(ModalBody);

    const plugin = modal.find("VideoButton");

    expect(plugin).to.have.length(1);
  });
});
