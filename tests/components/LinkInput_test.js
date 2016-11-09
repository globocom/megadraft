/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {EditorState, SelectionState, Entity} from "draft-js";
import chai from "chai";
import sinon from "sinon";
import {mount} from "enzyme";

import LinkInput from "../../src/entity_inputs/LinkInput";
import {editorStateFromRaw} from "../../src/utils";

let expect = chai.expect;
/*
export default class LinkInputWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
    this.onChange = ::this.onChange;
  }

  onChange(editorState) {
    this.setState({editorState: editorState});
  }

  render() {
    return (
      <div ref="editor">
        <LinkInput
          editor={this.props.editor}
          editorState={this.state.editorState}
          cancelEntity={this.props.cancelEntity}
          setEntity={this.setEntity} />
      </div>
    );
  }
}


function replaceSelection(newSelection, wrapper) {
  const selectionState = SelectionState.createEmpty("ag6qs");
  const updatedSelection = selectionState.merge(newSelection);
  const oldState = wrapper.state("editorState");

  const editorState = EditorState.forceSelection(oldState, updatedSelection);

  wrapper.setState({editorState: editorState});
}
*/

describe("LinkInput Component", function() {

  beforeEach(function() {

    this.cancelEntity = sinon.spy();
    this.setEntity = sinon.spy();

    this.wrapper = mount(
      <LinkInput
        entityType="LINK"
        editor={this.editor}
        cancelEntity={this.cancelEntity}
        setEntity={this.setEntity}
        //editorState={this.editorState}
        />
    );

  });

  it("should set a link entity on keypress and call cancel", function() {

    const input = this.wrapper.find("input");
    const inputNode = input.get(0);

    inputNode.value = "http://www.globo.com";
    input.simulate("change");
    input.simulate("keyDown", {key: "Enter", keyCode: 13, which: 13});
    expect(this.setEntity).to.have.been.calledWith({url: "http://www.globo.com"});
    expect(this.cancelEntity).to.have.been.called;
  });

  it("esc key should cancel the link", function() {

    const input = this.wrapper.find("input");
    const inputNode = input.get(0);

    inputNode.value = "http://www.globo.com";
    input.simulate("change");
    input.simulate("keyDown", {key: "Escape", keyCode: 27, which: 27});
    expect(this.setEntity).to.not.have.been.called;
    expect(this.cancelEntity).to.have.been.called;
  });

  it("should add protocol to links", function() {

    const input = this.wrapper.find("input");
    const inputNode = input.get(0);

    inputNode.value = "www.globo.com";
    input.simulate("change");
    input.simulate("keyDown", {key: "Enter", keyCode: 13, which: 13});
    expect(this.setEntity).to.have.been.calledWith({url: "http://www.globo.com"});
  });

});
