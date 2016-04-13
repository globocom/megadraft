/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import ReactDOM from "react-dom";
import {EditorState, SelectionState} from "draft-js";
import TestUtils from "react-addons-test-utils";
import chai from "chai";

import Toolbar from "../src/toolbar";
import ToolbarItem from "../src/toolbar_item";
import {editorStateFromRaw} from "../src/utils";

let expect = chai.expect;


export default class ToolbarWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
  }

  onChange(editorState) {
    this.setState({editorState: editorState});
  }

  render() {
    return (
      <div ref="editor">
        <Toolbar
          ref="toolbar"
          editor={this.refs.editor}
          editorState={this.state.editorState}
          actions={this.props.actions}
          onChange={::this.onChange} />
      </div>
    );
  }
}


var draft = require("draft-js");

draft.getVisibleSelectionRect = () => {
  return {
    top: 0,
    left: 0,
    right: 1
  };
};


function replaceSelection(newSelection, wrapper) {
  const selectionState = SelectionState.createEmpty("ag6qs");
  const updatedSelection = selectionState.merge(newSelection);
  const oldState = wrapper.state.editorState;

  const editorState = EditorState.forceSelection(oldState, updatedSelection);

  wrapper.setState({editorState: editorState});
}


describe("Toolbar Component", function() {
  beforeEach(function() {
    const INITIAL_CONTENT = {
      "entityMap": {},
      "blocks": [
        {
          "key": "ag6qs",
          "text": "Hello World!",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": []
        }
      ]
    };

    this.actions = [
      {type: "inline", label: "B", style: "BOLD", icon: "svg"},
      {type: "block", label: "H2", style: "header-two", icon: "svg"}
    ];

    this.editorState = editorStateFromRaw(INITIAL_CONTENT);
    this.wrapper = TestUtils.renderIntoDocument(
      <ToolbarWrapper editorState={this.editorState} actions={this.actions} />
    );
  });

  describe("Toolbar", function() {
    afterEach(function() {
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.wrapper).parentNode);
    });

    it("renders toolbar items from actions", function() {
      const items = TestUtils.scryRenderedComponentsWithType(this.wrapper, ToolbarItem);
      expect(items).to.have.length(2);
    });

    describe("actions", function () {
      it("toggles inline style", function() {
        const items = TestUtils.scryRenderedComponentsWithType(this.wrapper, ToolbarItem);
        const boldItem = items[0];
        const button = TestUtils.findRenderedDOMComponentWithTag(boldItem, 'button');

        TestUtils.Simulate.click(button);

        const current = this.wrapper.state.editorState.getCurrentInlineStyle();
        expect(current.has('BOLD')).to.be.true;
      });

      it("toggles block style", function() {
        const items = TestUtils.scryRenderedComponentsWithType(this.wrapper, ToolbarItem);
        const titleItem = items[1];
        const button = TestUtils.findRenderedDOMComponentWithTag(titleItem, 'button');

        TestUtils.Simulate.click(button);

        const selection = this.wrapper.state.editorState.getSelection();
        const current = this.wrapper.state.editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType();

        expect(current).to.be.equal('header-two');
      });
    });

    it("starts hidden", function() {
      const toolbarNode = this.wrapper.refs.toolbar.refs.toolbar;
      expect(toolbarNode.style.display).to.be.equal("none");
    });

    it("shows after selection", function() {
      replaceSelection({
        focusOffset: 0,
        anchorOffset: 5
      }, this.wrapper);

      const toolbarNode = this.wrapper.refs.toolbar.refs.toolbar;
      expect(toolbarNode.style.display).to.be.equal("");
    });

    it("should hide after deselection", function() {
      replaceSelection({
        focusOffset: 0,
        anchorOffset: 5
      }, this.wrapper);

      replaceSelection({
        focusOffset: 0,
        anchorOffset: 0
      }, this.wrapper);

      const toolbarNode = this.wrapper.refs.toolbar.refs.toolbar;
      expect(toolbarNode.style.display).to.be.equal("none");
    });

    it("should center toolbar above the selection", function() {
      replaceSelection({focusOffset: 0, anchorOffset: 5}, this.wrapper);

      const toolbarNode = this.wrapper.refs.toolbar.refs.toolbar;

      expect(toolbarNode.style.top).to.be.equal("-64px");
      expect(toolbarNode.style.left).to.be.equal("-24.5px");
    });
  });
});
