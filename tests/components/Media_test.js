/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from "react-dom";
import {Entity} from "draft-js";
import TestUtils from "react-addons-test-utils";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import Media from "../../src/components/Media";
import {editorStateFromRaw} from "../../src/utils";
import DEFAULT_PLUGINS from "../../src/plugins/default";


chai.use(sinonChai);
let expect = chai.expect;


describe("Media Component", function() {

  beforeEach(function() {
    const INITIAL_CONTENT = {
      "entityMap": {
        "0": {
          "type": "image",
          "mutability": "IMMUTABLE",
          "data": {
            "src": "images/media.jpg",
            "caption": "Picture from StockSnap.io",
            "rightsHolder": "By Tim Marshall",
            "featured": "medium"
          }
        }
      },
      "blocks": [
        {
          "key": "9vgd",
          "text": "🍺",
          "type": "atomic",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": [
            {
              "offset": 0,
              "length": 1,
              "key": 0
            }
          ]
        }
      ]
    };

    this.editorState = editorStateFromRaw(INITIAL_CONTENT);

    this.blockProps = sinon.spy();
    this.blockProps.editorState = this.editorState;
    this.blockProps.plugins = DEFAULT_PLUGINS;
    this.blockProps.onChange = sinon.spy();
    this.blockProps.setRea = sinon.spy();

    const currentContent = this.blockProps.editorState.getCurrentContent();
    this.block = currentContent.getBlockForKey("9vgd");

    this.component = TestUtils.renderIntoDocument(
      <Media
        blockProps={this.blockProps}
        block={this.block} />
    );
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(
      ReactDOM.findDOMNode(this.component).parentNode
    );
  });

  it("renders without problems", function() {
    expect(this.component).to.exist;
  });

  it("updates entity data", function() {
    let entityKey = this.block.getEntityAt(0);
    let entity = Entity.get(entityKey);
    let data = entity.getData();

    expect(data.featured).to.equal("medium");

    this.component.updateEntity({featured: "big"});

    entityKey = this.block.getEntityAt(0);
    entity = Entity.get(entityKey);
    data = entity.getData();

    expect(data.featured).to.equal("big");
  });

  it("refreshes editor state", function() {
    this.component.updateEntity({featured: "big"});
    expect(this.blockProps.onChange).to.have.been.called;
  });

  it("removes media component", function() {
    this.component.remove();

    const editorState = this.blockProps.onChange.getCall(0).args[0];
    const currentContent = editorState.getCurrentContent();
    const block = currentContent.getBlockForKey("9vgd");

    expect(block.type).to.equal("unstyled");
  });
});
