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
import {editorStateFromRaw} from "../src/utils";

let expect = chai.expect;


export default class ToolbarWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
  }
  render() {
    return (
      <div ref="editor">
        <Toolbar ref="toolbar" editor={this.refs.editor} editorState={this.state.editorState} actions={this.props.actions} />
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
          "inlineStyleRanges": [
            {
              "offset": 0,
              "length": 12,
              "style": "BOLD"
            },
            {
              "offset": 6,
              "length": 6,
              "style": "ITALIC"
            }
          ],
          "entityRanges": []
        }
      ]
    };

    this.actions = [
      {type: "inline", label: "B", style: "BOLD", icon: "svg"}
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
