/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import ReactDOM from "react-dom";
import {EditorState} from "draft-js";
import TestUtils from "react-addons-test-utils";
import chai from "chai";

import Toolbar from "../src/toolbar";
import {editorStateFromRaw} from "../src/utils";


let expect = chai.expect;

export default class ToolbarWrapper extends Component {
  render() {
    return (
      <div ref="editor">
        <Toolbar ref="toolbar" editor={this.refs.editor} editorState={this.props.editorState} actions={this.props.actions} />
      </div>
    );
  }
}

describe("Toolbar Component", () => {
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
      {type: "inline", label: "B", style: "BOLD", icon: 'svg'}
    ];

    this.editorState = editorStateFromRaw(INITIAL_CONTENT);
    this.wrapper = TestUtils.renderIntoDocument(
      <ToolbarWrapper editorState={this.editorState} actions={this.actions} />
    );
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.wrapper).parentNode);
  });

  describe("Toolbar", () => {
    it("starts hidden", function() {
      const toolbarNode = this.wrapper.refs.toolbar.refs.toolbar;
      expect(toolbarNode.style.display).to.be.equal('none');
    });
  });
});
