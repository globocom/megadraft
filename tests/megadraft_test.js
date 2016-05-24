/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import chai from "chai";
import {Editor} from "draft-js";

import Megadraft from "../src/Megadraft";
import Media from "../src/components/Media";
import {editorStateFromRaw} from "../src/utils";


let expect = chai.expect;


describe("Megadraft Component", () => {
  beforeEach(function() {
    const INITIAL_CONTENT = {
      "entityMap": {
        "0": {
          "type": "image",
          "mutability": "IMMUTABLE",
          "data": {
            "src": "images/media.jpg",
            "caption": "Picture from StockSnap.io",
            "rightsHolder": "By Tim Marshall"
          }
        }
      },
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
        },
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
    this.component = TestUtils.renderIntoDocument(
      <Megadraft
        editorState={this.editorState}
        onChange={() => null}/>
    );
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.component).parentNode);
  });

  it("renders without problems", function() {
    expect(this.component).to.exist;
  });

  it("has the initial text", function() {
    expect(this.component.refs.editor.textContent).to.have.string("Hello World!");
  });

  it("renders Media component", function() {
    const items = TestUtils.scryRenderedComponentsWithType(
      this.component, Media
    );

    expect(items).to.have.length(1);
  });

  it("starts with default readOnly status", function() {
    const items = TestUtils.scryRenderedComponentsWithType(
      this.component, Editor
    );

    expect(items[0].props.readOnly).to.be.false;
  });

  it("changes readOnly status", function() {
    const items = TestUtils.scryRenderedComponentsWithType(
      this.component, Editor
    );

    this.component.setReadOnly(true);

    expect(items[0].props.readOnly).to.be.true;
  });
});

