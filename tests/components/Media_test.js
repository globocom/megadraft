/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import {mount} from "enzyme";

import Media from "../../src/components/Media";
import {editorStateFromRaw} from "../../src/utils";
import DEFAULT_ATOMIC_BLOCKS from "../../src/atomicBlocks/default";


chai.use(sinonChai);
let expect = chai.expect;


describe("Media Component", function() {

  beforeEach(function() {
    const INITIAL_CONTENT = {
      "entityMap": {},
      "blocks": [
        {
          "key": "9vgd",
          "text": "",
          "type": "atomic",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [],
          "data": {
            "type": "image",
            "src": "images/media.jpg",
            "caption": "Picture from StockSnap.io",
            "rightsHolder": "By Tim Marshall",
            "display": "medium"
          }
        }
      ]
    };

    this.editorState = editorStateFromRaw(INITIAL_CONTENT);

    this.blockProps = sinon.spy();
    this.blockProps.editorState = this.editorState;
    this.blockProps.atomicBlock = DEFAULT_ATOMIC_BLOCKS[0];
    this.blockProps.onChange = sinon.spy();
    this.blockProps.setRea = sinon.spy();

    const currentContent = this.blockProps.editorState.getCurrentContent();
    this.block = currentContent.getBlockForKey("9vgd");

    this.wrapper = mount(
      <Media
        blockProps={this.blockProps}
        block={this.block} />
    );
    this.component = this.wrapper.get(0);
  });

  it("renders without problems", function() {
    expect(this.wrapper.length).to.equal(1);
  });

  it("updates data", function() {
    let data = this.block.getData();

    expect(data.get("display")).to.equal("medium");

    this.component.updateData({display: "big"});

    const content = this.blockProps.onChange.args[0][0].toJS().currentContent;

    const nextData = content.blockMap["9vgd"].data;

    expect(nextData.display).to.equal("big");
  });

  it("refreshes editor state", function() {
    this.component.updateData({display: "big"});
    expect(this.blockProps.onChange).to.have.been.called;
  });

  it("removes media component", function() {
    this.component.remove();

    const editorState = this.blockProps.onChange.getCall(0).args[0];
    const currentContent = editorState.getCurrentContent();
    const block = currentContent.getBlockForKey("9vgd");

    expect(block).to.be.undefined;
  });
});
