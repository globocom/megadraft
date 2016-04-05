/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from "react-dom";
import {EditorState} from 'draft-js';
import TestUtils from "react-addons-test-utils";
import chai from "chai";

import Megadraft from "../src/Megadraft";
import {editorStateFromRaw} from "../src/utils";


let expect = chai.expect;


describe("Megadraft Component", () => {
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
    this.editorState = editorStateFromRaw(INITIAL_CONTENT);
    this.component = TestUtils.renderIntoDocument(<Megadraft editorState={this.editorState} />);
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.component).parentNode);
  });

  it("renders without problems", function() {
    expect(this.component).to.exist;
  });

  describe("Toolbar", () => {
    it("is collapsed", function() {
      expect(this.editorState.getSelection().isCollapsed(), true);
      /*
      getSelection SelectionState {
      "anchorKey": "ag6qs",
      "anchorOffset": 0,
      "focusKey": "ag6qs",
      "focusOffset": 0,
      "isBackward": false,
      "hasFocus": false }
      */
    });

    it("is not collapsed", function() {

      expect(this.editorStat.getSelection().isCollapsed(), true);

      /*
      var selectionState = new SelectionState({
         anchorKey: 'ag6qs',
         anchorOffset: 6,
         focusKey: 'ag6qs',
         focusOffset: 11,
         isBackward: false,
         hasFocus: false,
         length: 6
      });
      */
      var selectionState = this.editorState.getSelection();
      const targetSelection = selectionState.merge({
         anchorKey: 'ag6qs',
         anchorOffset: 6,
         focusKey: 'ag6qs',
         focusOffset: 11,
      });
      const targetEditor = EditorState.forceSelection(
        this.editorState,
        targetSelection
      );

      expect(targetEditor.getSelection().isCollapsed(), false);

    });
  });

});

