/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import chai from "chai";
import sinon from "sinon";
import {mount} from "enzyme";

import {ModalBody} from "backstage-modal";
import AtomicBlocksModalList from "../../src/components/AtomicBlocksModalList";
import DEFAULT_ATOMIC_BLOCKS from "../../src/atomicBlocks/default.js";

let expect = chai.expect;

const baseAtomicBlock = DEFAULT_ATOMIC_BLOCKS[0];

class ModalWithAtomicBlocks extends Component {
  generateAtomicBlocks() {
    let atomicBlocks = [];
    for (let i=0; i<4; i++) {
      atomicBlocks.push(Object.assign({}, baseAtomicBlock, {
        title: "atomicBlock" + i,
        type: "atomicBlock" + i
      }));
    }
    return atomicBlocks;
  }

  onChange = (editorState) => {
    this.props.onChange(editorState);
    this.setState({editorState: editorState});
  }

  render() {
    const atomicBlocks = this.generateAtomicBlocks();
    return (
      <div ref="editor">
        <AtomicBlocksModalList
          handleModal={this.handleModal}
          atomicBlocks={atomicBlocks}
          onChange={this.onChange}
          toggleModalVisibility={this.props.toggleModalVisibility}
          editorState={this.props.editorState} />
      </div>
    );
  }
}

describe("Sidebar Modal Component", function() {
  beforeEach(function() {
    this.onChangeSpy = sinon.spy();
    this.toggleModalVisibilitySpy = sinon.spy();

    this.wrapper = mount(
      <ModalWithAtomicBlocks onChange={this.onChangeSpy} toggleModalVisibility={this.toggleModalVisibilitySpy}/>
    );
  });

  it("should has atomicBlocks inside modal", function() {
    const modal = this.wrapper.find(ModalBody);

    const atomicBlock = modal.find("li");

    expect(atomicBlock.length).to.be.at.least(1);
  });

  it("should has the all atomicBlocks inside modal", function() {
    const modal = this.wrapper.find(ModalBody);

    const atomicBlock = modal.find(".megadraft-modal__item");

    expect(atomicBlock).to.have.length(4);
  });

  it("should be a real atomicBlock", function() {
    const modal = this.wrapper.find(ModalBody);

    const atomicBlock = modal.find(baseAtomicBlock.buttonComponent);

    expect(atomicBlock.length).to.be.at.least(1);
  });

  it("should callback a function received when receives onChange call", function() {
    const newEditorState = {};
    const modal = this.wrapper.find(AtomicBlocksModalList);
    modal.node.onChange(newEditorState);
    expect(this.onChangeSpy).to.be.calledWith(newEditorState);
  });

  it("should toggle visibility when receives onChange call", function() {
    const newEditorState = {};
    const modal = this.wrapper.find(AtomicBlocksModalList);
    modal.node.onChange(newEditorState);
    expect(this.toggleModalVisibilitySpy).to.be.called;
  });
});
