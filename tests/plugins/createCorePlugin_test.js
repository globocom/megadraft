/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import chai from "chai";
import sinon from "sinon";
import {EditorState, SelectionState} from "draft-js";

import createCorePlugin from "../../src/createCorePlugin";
import Media from "../../src/components/Media";
import {editorStateFromRaw} from "../../src/utils";
import image from "../../src/atomicBlocks/image";
import NotFoundAtomicBlock from "../../src/atomicBlocks/not-found";
import DEFAULT_ATOMIC_BLOCKS from "../../src/atomicBlocks/default";


let expect = chai.expect;

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
      "key": "bqjdr",
      "text": "Good usability",
      "type": "ordered-list-item",
      "depth": 0,
      "inlineStyleRanges": [
        {
          "offset": 0,
          "length": 14,
          "style": "BOLD"
        }
      ],
      "entityRanges": [],
      "data": {}
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

function createSelectedState(newSelection, blockKey) {
  const oldState = editorStateFromRaw(INITIAL_CONTENT);
  const selectionState = SelectionState.createEmpty(blockKey);
  const updatedSelection = selectionState.merge(newSelection);
  return EditorState.forceSelection(oldState, updatedSelection);
}

function createPluginFunctions({editorState, ...props}) {
  const PluginFunctions = {
    getProps: () => props,
    setEditorState: sinon.spy(),
    getEditorState: () => editorState,
  };

  return PluginFunctions;
}

function simulateReturn ({initialState, props, event={}}) {
  const corePlugin = createCorePlugin();
  const PluginFunctions = createPluginFunctions({
    editorState: initialState,
    ...props
  });
  const result = corePlugin.handleReturn(event, initialState, PluginFunctions);

  const setEditorStateArgs = PluginFunctions.setEditorState.args[0];
  const editorState = setEditorStateArgs && setEditorStateArgs[0] || null;

  return {result, editorState};
}

describe("createCorePlugin", () => {
  class FakeAtomicBlock {
    constructor(type){
      this.type = type;
    }

    getType(){
      return "atomic";
    }

    getData() {
      return {
        toObject: () => {
          return {type: this.type};
        }
      };
    }
  }

  describe(".handleReturn", function() {
    describe("with resetStyleNewLine=true", function() {
      it("resets block type of the new block", function() {
        const blockKey = "ag6qs";
        const selection = {anchorOffset: 12, focusOffset: 12};
        const props = {resetStyleNewLine: true};

        const initialState = createSelectedState(selection, blockKey);
        const {result, editorState} = simulateReturn({initialState, props});

        const content = editorState.getCurrentContent();
        const newBlock = content.getBlockAfter(blockKey);

        expect(result).to.be.equal("handled");
        expect(newBlock.getType()).to.be.equal("unstyled");
      });

      it("resets inlineStyle of the new block", function() {
        const blockKey = "ag6qs";
        const selection = {anchorOffset: 12, focusOffset: 12};
        const props = {resetStyleNewLine: true};

        const initialState = createSelectedState(selection, blockKey);
        const {result, editorState} = simulateReturn({initialState, props});

        const inlineStyle = editorState.getCurrentInlineStyle();

        expect(result).to.be.equal("handled");
        expect(inlineStyle.count()).to.be.equal(0);
      });

      it("resets inlineStyles of blocks in blocksWithoutStyleReset", function() {
        const blockKey = "bqjdr";
        const selection = {anchorOffset: 14, focusOffset: 14};
        const props = {
          resetStyleNewLine: true,
          blocksWithoutStyleReset: ["ordered-list-item", "unordered-list-item"]
        };

        const initialState = createSelectedState(selection, blockKey);
        const {result, editorState} = simulateReturn({initialState, props});

        const inlineStyle = editorState.getCurrentInlineStyle();

        expect(result).to.be.equal("handled");
        expect(inlineStyle.count()).to.be.equal(0);
      });

      it("resets block type of blocks in blocksWithoutStyleReset", function() {
        const blockKey = "bqjdr";
        const selection = {anchorOffset: 14, focusOffset: 14};
        const props = {
          resetStyleNewLine: true,
          blocksWithoutStyleReset: ["ordered-list-item", "unordered-list-item"]
        };

        const initialState = createSelectedState(selection, blockKey);
        const {editorState} = simulateReturn({initialState, props});

        const content = editorState.getCurrentContent();
        const newBlock = content.getBlockAfter("bqjdr");

        expect(newBlock.type).to.be.equal("ordered-list-item");
      });
    });

    describe("with resetStyleNewLine=false", function() {
      it("should do nothing", function() {
        const blockKey = "ag6qs";
        const selection = {anchorOffset: 12, focusOffset: 12};
        const props = {
          resetStyleNewLine: false,
        };

        const initialState = createSelectedState(selection, blockKey);
        const {result} = simulateReturn({initialState, props});

        expect(result).to.be.equal("not-handled");
      });
    });

    describe("with softNewLines=true", function() {
      it("is capable of inserting soft line breaks", function() {
        const event = {shiftKey: true};
        const props = {
          softNewLines: true,
        };

        const initialState = editorStateFromRaw(INITIAL_CONTENT);
        const {editorState} = simulateReturn({initialState, props, event});
        const content = editorState.getCurrentContent();
        const text = content.getFirstBlock().getText();

        expect(text).to.be.equal("\nHello World!");
      });

      it("is capable of adding a new block when try to add a soft break before an exist one", function() {
        const softBreakOnBeginning = {
          "entityMap": {},
          "blocks": [
            {
              "key": "ag6qs",
              "text": "\nHello World!",
              "type": "unstyled",
              "depth": 0,
              "inlineStyleRanges": [],
              "entityRanges": []
            }
          ]
        };

        const event = {shiftKey: true};
        const props = {
          softNewLines: true,
        };

        const initialState = editorStateFromRaw(softBreakOnBeginning);
        const {result} = simulateReturn({initialState, props, event});

        expect(result).to.be.equal("not-handled");
      });

      it("is capable of adding a new block when try to add a soft break after an exist one", function() {
        const softBreakOnEnd = {
          "entityMap": {},
          "blocks": [
            {
              "key": "ag6qs",
              "text": "Hello World!\n",
              "type": "unstyled",
              "depth": 0,
              "inlineStyleRanges": [],
              "entityRanges": []
            }
          ]
        };

        const event = {shiftKey: true};
        const props = {
          softNewLines: true,
        };
        const initialState = EditorState.moveSelectionToEnd(
          editorStateFromRaw(softBreakOnEnd)
        );

        const {result} = simulateReturn({initialState, props, event});

        expect(result).to.be.equal("not-handled");
      });
    });

    describe("with softNewLines=false", function() {
      it("does not insert soft line breaks if option set to false", function () {
        const props = {softNewLines: false};
        const event = {shiftKey: true};
        const initialState = editorStateFromRaw(INITIAL_CONTENT);

        const {result} = simulateReturn({initialState, props, event});

        expect(result).to.be.equal("not-handled");
      });
    });
  });

  describe("blockRendererFn", function () {
    beforeEach(function () {
      this.corePlugin = createCorePlugin();
      this.editorState = editorStateFromRaw(INITIAL_CONTENT);
      this.createPluginFunctions = (props) => {
        return createPluginFunctions({
          editorState: this.editorState,
          atomicBlocks: DEFAULT_ATOMIC_BLOCKS,
          setReadOnly: () => {},
          getReadOnly: () => {},
          ...props,
        });
      };
      this.expectMediaRendererEqual = (result, PluginFunctions, props) => {
        expect(result).to.deep.equal({
          component: Media,
          editable: false,
          props: {
            onChange: PluginFunctions.setEditorState,
            setEditorState: PluginFunctions.setEditorState,
            getEditorState: PluginFunctions.getEditorState,
            editorState: this.editorState,
            setReadOnly: PluginFunctions.setReadOnly,
            getReadOnly: PluginFunctions.getReadOnly,
            setInitialReadOnly: this.corePlugin.setInitialReadOnly,
            getInitialReadOnly: this.corePlugin.getInitialReadOnly,
            ...props
          }
        });
      };
    });

    it("ignores non-atomic blocks", function() {
      const block = {getType: () => "metal"};
      const result = this.corePlugin.blockRendererFn(block, this.createPluginFunctions());
      expect(result).to.be.null;
    });

    it("returns media renderer for registered atomicBlock", function() {
      const block = new FakeAtomicBlock("image");
      const PluginFunctions = this.createPluginFunctions();
      const result = this.corePlugin.blockRendererFn(block, PluginFunctions);

      this.expectMediaRendererEqual(result, PluginFunctions, {
        atomicBlock: image,
        plugin: image,
      });
    });

    it("returns media renderer with fallback for unregistered atomicBlock", function () {
      const block = new FakeAtomicBlock("unregistered");
      const PluginFunctions = this.createPluginFunctions();
      const result = this.corePlugin.blockRendererFn(block, PluginFunctions);

      this.expectMediaRendererEqual(result, PluginFunctions, {
        atomicBlock: NotFoundAtomicBlock,
        plugin: NotFoundAtomicBlock,
      });
    });

    it("returns media renderer with atomicBlock from custom fallback", function () {
      const customFallbackAtomicBlock = {
        blockComponent: (props) => <pre>{props.data.type}</pre>
      };

      const block = new FakeAtomicBlock("unregistered");
      const PluginFunctions = this.createPluginFunctions({
        handleBlockNotFound: () => customFallbackAtomicBlock
      });
      const result = this.corePlugin.blockRendererFn(block, PluginFunctions);

      this.expectMediaRendererEqual(result, PluginFunctions, {
        atomicBlock: customFallbackAtomicBlock,
        plugin: customFallbackAtomicBlock,
      });
    });

    it("ignores empty atomicBlock from custom fallback", function () {
      const block = new FakeAtomicBlock("unregistered");
      const PluginFunctions = this.createPluginFunctions({
        handleBlockNotFound: () => null
      });
      const result = this.corePlugin.blockRendererFn(block, PluginFunctions);

      expect(result).to.equal(null);
    });
  });

  describe("with keybindings", function () {
    beforeEach(function () {
      this.corePlugin = createCorePlugin();
      this.saveAction = sinon.spy();
      const keyBindings = [
        {name: "save", isKeyBound: e => (e.keyCode === 83 && e.ctrlKey), action: this.saveAction}
      ];
      this.editorState = editorStateFromRaw(INITIAL_CONTENT);
      this.PluginFunctions = createPluginFunctions({editorState: this.editorState, keyBindings});
    });

    describe(".keyBindingFn", function () {
      it("respects default key binding", function() {
        const event = {keyCode: 66, ctrlKey: true};
        const result = this.corePlugin.keyBindingFn(event, this.PluginFunctions);
        expect(result).to.equal("bold");
      });

      it("ignores unknown key binding", function() {
        const event = {keyCode: 70, ctrlKey: true};
        const result = this.corePlugin.keyBindingFn(event, this.PluginFunctions);
        expect(result).to.equal(null);
      });

      it("recognizes custom key binding", function() {
        const event = {keyCode: 83, ctrlKey: true};
        const result = this.corePlugin.keyBindingFn(event, this.PluginFunctions);
        expect(result).to.equal("save");
      });
    });

    describe(".handleKeyCommand", function () {
      it("respects default commands", function() {
        const result = this.corePlugin.handleKeyCommand("bold", this.editorState, this.PluginFunctions);
        expect(result).to.be.equal("handled");
      });

      it("ignores unknown commands", function() {
        const result = this.corePlugin.handleKeyCommand("foo", this.editorState, this.PluginFunctions);
        expect(result).to.be.equal("not-handled");
      });

      it("recognizes custom commands", function() {
        const result = this.corePlugin.handleKeyCommand("save", this.editorState, this.PluginFunctions);
        expect(result).to.be.equal("handled");
        expect(this.saveAction).to.have.been.called;
      });
    });
  });
});
