/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import {Entity} from "draft-js";
import chai from "chai";

import {insertMediaBlock, editorStateFromRaw} from "../../src/utils";

let expect = chai.expect;


describe("insertMediaBlock", function() {
  beforeEach(function () {
    this.state = editorStateFromRaw(null);
    this.data = {
      url: "media.jpg"
    };

    this.blockType = "plugin-media-type";
    this.newState = insertMediaBlock(this.state, this.blockType, this.data);
    this.block = this.newState.getCurrentContent().getBlockMap().find(block => block.type === "atomic");
  });

  it("returns state with new block", function () {
    expect(this.block).to.be.truthy;
    expect(this.block.text).to.equal("🍺");
  });

  it("applies entity to block", function () {
    const entityKey = this.block.getEntityAt(0);
    const entity = Entity.get(entityKey);

    expect(entity.type).to.equal(this.blockType);
    expect(entity.getData()).to.equal(this.data);
  });
});
