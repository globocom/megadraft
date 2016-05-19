/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import chai from "chai";
import sinon from "sinon";

import icons from "../../src/icons";
import MediaControlsActions from "../../src/components/MediaControlsActions";
import MediaControlsActionsItem from "../../src/components/MediaControlsActionsItem";

let expect = chai.expect;


describe("MediaControlsActions Component", function() {

  beforeEach(function() {
    this.crop = sinon.spy();
    this.edit = sinon.spy();
    this.delete = sinon.spy();

    const actionsItems = [
      {"key": "crop", "icon": icons.CropIcon, "action": this.crop},
      {"key": "edit", "icon": icons.EditIcon, "action": this.edit},
      {"key": "delete", "icon": icons.DeleteIcon, "action": this.delete}
    ];

    this.component = TestUtils.renderIntoDocument(
      <MediaControlsActions items={actionsItems} />
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

  it("renders actions items", function() {
    const items = TestUtils.scryRenderedComponentsWithType(
      this.component, MediaControlsActionsItem
    );

    expect(items).to.have.length(3);
  });

  it("is possible to click on the action item", function() {
    const deleteItem = TestUtils.scryRenderedComponentsWithType(
      this.component, MediaControlsActionsItem
    )[2];

    const itemDOM = TestUtils.findRenderedDOMComponentWithTag(deleteItem, "li");

    expect(this.delete).to.not.have.been.called;

    TestUtils.Simulate.click(itemDOM);

    expect(this.delete).to.have.been.called;
  });
});
