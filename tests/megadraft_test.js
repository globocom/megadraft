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
import {Editor} from "draft-js";

import {MegadraftEditor} from "../src/Megadraft";
import Media from "../src/components/Media";
import {editorStateFromRaw} from "../src/utils";
import DEFAULT_PLUGINS from "../src/plugins/default";


let expect = chai.expect;
let kba = function keyBindingAction() {};


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
        },
        {
          "key": "9vgd",
          "text": "🍺",
          "type": "atomic",
          "depth": 0,
          "inlineStyleRanges": [],
          "data": {
            "type": "image",
            "src": "images/media.jpg",
            "caption": "Picture from StockSnap.io",
            "rightsHolder": "By Tim Marshall"
          },
          "entityRanges": []
        }
      ]
    };

    kba = sinon.spy();
    const keyBindings = [
      {name: "save", isKeyBound: (e) => {return e.keyCode === 83 && e.ctrlKey;}, action: kba}
    ];

    this.onChange = sinon.spy();
    this.editorState = editorStateFromRaw(INITIAL_CONTENT);
    this.component = TestUtils.renderIntoDocument(
      <MegadraftEditor
        editorState={this.editorState}
        onChange={this.onChange}
        keyBindings={keyBindings}/>
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

  it("runs mediaBlockRenderer with non-atomic block", function() {
    const block = {getType: function() {return "metal";}};
    const result = this.component.mediaBlockRenderer(block);
    expect(result).to.be.null;
  });

  it("runs mediaBlockRenderer with atomic block", function() {
    function atomic() {}
    atomic.prototype.getType = function() {return "atomic";};
    atomic.prototype.getData = function(position) {
      return {
        toObject: function(){
          return {type: "image"};
        }
      };
    };

    const block = new atomic();
    const result = this.component.mediaBlockRenderer(block);
    const plugin = DEFAULT_PLUGINS[0];

    expect(result).to.deep.equal({
      "component": Media,
      "editable": false,
      "props": {
        "plugin": plugin,
        "onChange": this.component.onChange,
        "editorState": this.editorState,
        "setReadOnly": this.component.setReadOnly
      }
    });

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

  it("is capable of inserting soft line breaks", function() {
    this.component.handleReturn({shiftKey: true});

    const content = this.onChange.args[0][0].getCurrentContent();

    const text = content.getFirstBlock().getText();

    expect(text).to.be.equal("\nHello World!");
  });

  it("recognizes external key binding", function() {
    const defaultKeyBinding = {keyCode: 66, ctrlKey: true};
    expect(this.component.externalKeyBindings(defaultKeyBinding)).to.equal("bold");

    const unknownKeyBinding = {keyCode: 70, ctrlKey: true};
    expect(this.component.externalKeyBindings(unknownKeyBinding)).to.not.exist;

    const externalKeyBinding = {keyCode: 83, ctrlKey: true};
    expect(this.component.externalKeyBindings(externalKeyBinding)).to.equal("save");
  });

  it("handles external commands", function() {
    const defaultCommand = "bold";
    expect(this.component.handleKeyCommand(defaultCommand)).to.be.true;

    const unknownCommand = "foo";
    expect(this.component.handleKeyCommand(unknownCommand)).to.be.false;

    const externalCommand = "save";
    expect(this.component.handleKeyCommand(externalCommand)).to.be.true;
    expect(kba).to.have.been.called;
  });
});
