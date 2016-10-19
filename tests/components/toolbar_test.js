/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {EditorState, SelectionState, Entity} from "draft-js";
import chai from "chai";
import {mount} from "enzyme";

import Toolbar from "../../src/components/Toolbar";
import ToolbarItem from "../../src/components/ToolbarItem";
import LinkInput from "../../src/components/LinkInput";
import {editorStateFromRaw} from "../../src/utils";
import Separator from "../../src/components/Separator";

let expect = chai.expect;


export default class ToolbarWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
    this.onChange = ::this.onChange;
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
          readOnly={this.props.readOnly}
          onChange={this.onChange} />
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
  const oldState = wrapper.state("editorState");

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
      {type: "separator"},
      {type: "block", label: "H2", style: "header-two", icon: "svg"},
      {type: "entity", label: "Link", style: "link", icon: "svg"}
    ];

    this.editorState = editorStateFromRaw(INITIAL_CONTENT);
    this.wrapper = mount(
      <ToolbarWrapper editorState={this.editorState} actions={this.actions} />
    );
  });

  describe("Toolbar", function() {
    it("renders toolbar items from actions", function() {
      const items = this.wrapper.find(ToolbarItem);
      expect(items).to.have.length(this.actions.length);
    });

    it("renders separator", function() {
      const items = this.wrapper.find(Separator);
      expect(items).to.have.length(1);
    });

    it("renders as null when readOnly is set", function() {
      const wrapper = mount(
        <ToolbarWrapper readOnly editorState={this.editorState} actions={this.actions} />
      );
      const toolbar = wrapper.find(Toolbar);
      expect(toolbar.html()).to.be.null;
    });

    describe("actions", function () {
      it("toggles inline style", function() {
        const items = this.wrapper.find(ToolbarItem);
        const boldItem = items.at(0);
        const button = boldItem.find("button");

        button.simulate("click");

        const current = this.wrapper.state("editorState").getCurrentInlineStyle();
        expect(current.has("BOLD")).to.be.true;
      });

      it("toggles block style", function() {
        const items = this.wrapper.find(ToolbarItem);
        const titleItem = items.at(2);
        const button = titleItem.find("button");

        button.simulate("click");

        const editorState = this.wrapper.state("editorState");
        const selection = editorState.getSelection();
        const current = editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType();

        expect(current).to.be.equal("header-two");
      });
    });

    it("starts hidden", function() {
      const toolbarWrapper = this.wrapper.find(".toolbar");
      expect(toolbarWrapper.hasClass("toolbar--open")).to.be.false;
    });

    it("shows after selection", function() {
      replaceSelection({
        focusOffset: 0,
        anchorOffset: 5
      }, this.wrapper);

      const toolbarWrapper = this.wrapper.find(".toolbar");
      expect(toolbarWrapper.hasClass("toolbar--open")).to.be.true;
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

      const toolbarWrapper = this.wrapper.find(".toolbar");
      expect(toolbarWrapper.hasClass("toolbar--open")).to.be.false;
    });

    it("should center toolbar above the selection", function() {
      replaceSelection({focusOffset: 0, anchorOffset: 5}, this.wrapper);

      const toolbarWrapper = this.wrapper.find(".toolbar");
      const toolbarWrapperNode = toolbarWrapper.get(0);

      expect(toolbarWrapperNode.style.top).to.be.equal("-14px");
      expect(toolbarWrapperNode.style.left).to.be.equal("0.5px");
    });

    describe("Link", function() {
      beforeEach(function() {
        replaceSelection({
          anchorOffset: 0,
          focusOffset: 5
        }, this.wrapper);

        const items = this.wrapper.find(ToolbarItem);
        const titleItem = items.at(3); // Link
        this.button = titleItem.find("button");
      });

      it("starts with the link input hidden", function() {
        const toolbarWrapper = this.wrapper.find(".toolbar");
        expect(toolbarWrapper.hasClass("toolbar--editing-link")).to.be.false;
      });

      it("shows the link input on click", function() {
        this.button.simulate("click");
        const toolbarWrapper = this.wrapper.find(".toolbar");
        expect(toolbarWrapper.hasClass("toolbar--editing-link")).to.be.true;
      });

      it("should add a link to the selection", function() {
        this.button.simulate("click");

        const input = this.wrapper.find(LinkInput).find("input");
        const inputNode = input.get(0);

        inputNode.value = "http://www.globo.com";
        input.simulate("change");
        input.simulate("keyDown", {key: "Enter", keyCode: 13, which: 13});

        const contentState = this.wrapper.state("editorState").getCurrentContent();

        const blockWithLinkAtBeginning = contentState.getBlockForKey("ag6qs");
        const linkKey = blockWithLinkAtBeginning.getEntityAt(0);
        const linkInstance = Entity.get(linkKey);
        const {url} = linkInstance.getData();

        expect(url).to.be.equal("http://www.globo.com");
      });

      it("esc key should cancel the link", function() {
        this.button.simulate("click");

        const input = this.wrapper.find(LinkInput).find("input");
        const inputNode = input.get(0);

        inputNode.value = "http://www.globo.com";
        input.simulate("change");
        input.simulate("keyDown", {key: "Escape", keyCode: 27, which: 27});

        const toolbarWrapper = this.wrapper.find(".toolbar");

        expect(toolbarWrapper.hasClass("toolbar--editing-link")).to.be.false;
      });

      it("should remove a link", function() {
        this.button.simulate("click");

        const input = this.wrapper.find(LinkInput).find("input");
        const inputNode = input.get(0);

        inputNode.value = "http://www.globo.com";
        input.simulate("change");
        input.simulate("keyDown", {key: "Enter", keyCode: 13, which: 13});

        this.button.simulate("click");
        const contentState = this.wrapper.state("editorState").getCurrentContent();

        const blockWithLinkAtBeginning = contentState.getBlockForKey("ag6qs");
        const linkKey = blockWithLinkAtBeginning.getEntityAt(0);

        expect(linkKey).to.be.null;
      });

      it("should add protocol to links", function() {
        this.button.simulate("click");

        const input = this.wrapper.find(LinkInput).find("input");
        const inputNode = input.get(0);

        inputNode.value = "www.globo.com";
        input.simulate("change");
        input.simulate("keyDown", {key: "Enter", keyCode: 13, which: 13});

        const contentState = this.wrapper.state("editorState").getCurrentContent();

        const blockWithLinkAtBeginning = contentState.getBlockForKey("ag6qs");
        const linkKey = blockWithLinkAtBeginning.getEntityAt(0);
        const linkInstance = Entity.get(linkKey);
        const {url} = linkInstance.getData();

        expect(url).to.be.equal("http://www.globo.com");
      });

      it("should remove a link backwards", function() {
        this.button.simulate("click");

        const input = this.wrapper.find(LinkInput).find("input");
        const inputNode = input.get(0);

        inputNode.value = "www.globo.com";
        input.simulate("change");
        input.simulate("keyDown", {key: "Enter", keyCode: 13, which: 13});

        replaceSelection({
          anchorOffset: 5,
          focusOffset: 0,
          isBackward: true
        }, this.wrapper);

        this.button.simulate("click");
        const contentState = this.wrapper.state("editorState").getCurrentContent();

        const blockWithLinkAtBeginning = contentState.getBlockForKey("ag6qs");
        const linkKey = blockWithLinkAtBeginning.getEntityAt(0);

        expect(linkKey).to.be.null;
      });
    });
  });
});
