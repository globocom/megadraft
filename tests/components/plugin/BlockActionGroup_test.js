/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import chai from "chai";
import sinon from "sinon";
import {mount} from "enzyme";

import icons from "../../../src/icons";

import BlockActionGroup from "../../../src/components/plugin/BlockActionGroup";
import BlockAction from "../../../src/components/plugin/BlockAction";

let expect = chai.expect;


describe("BlockActionGroup Component", function() {

  beforeEach(function() {
    this.crop = sinon.spy();
    this.edit = sinon.spy();
    this.delete = sinon.spy();

    const actionsItems = [
      {"key": "crop", "icon": icons.CropIcon, "action": this.crop},
      {"key": "edit", "icon": icons.EditIcon, "action": this.edit},
      {"key": "delete", "icon": icons.DeleteIcon, "action": this.delete}
    ];

    this.component = mount(
      <BlockActionGroup items={actionsItems} />
    );
  });

  it("renders without problems", function() {
    expect(this.component).to.have.length(1);
  });

  it("renders actions items", function() {
    const items = this.component.find(BlockAction);
    expect(items).to.have.length(3);
  });
});
