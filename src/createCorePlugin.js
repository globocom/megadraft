/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Immutable from "immutable";
import {
  RichUtils,
  EditorState,
  genKey,
  ContentBlock,
  SelectionState,
  getDefaultKeyBinding,
} from "draft-js";

import notFoundAtomicBlock from "./atomicBlocks/not-found";
import Media from "./components/Media";
import {warnOnce} from "./utils";


const NO_RESET_STYLE_DEFAULT = ["ordered-list-item", "unordered-list-item"];

export default function createCorePlugin (config = {}) {
  return {
    getAtomicBlocksByType(atomicBlocks) {
      return atomicBlocks.reduce((atomicBlocksByType, atomicBlock) => {
        atomicBlocksByType[atomicBlock.type] = atomicBlock;
        return atomicBlocksByType;
      }, {});
    },

    blockRendererFn(contentBlock, PluginFunctions) {
      const {
        setEditorState,
        getEditorState,
        getReadOnly,
        setReadOnly,
        getProps
      } = PluginFunctions;

      if (contentBlock.getType() !== "atomic") {
        return null;
      }

      const type = contentBlock.getData().toObject().type;

      const {atomicBlocks} = getProps();
      const atomicBlocksByType = this.getAtomicBlocksByType(atomicBlocks);
      let atomicBlock = atomicBlocksByType[type] || this.handleBlockNotFound(contentBlock, PluginFunctions);
      if (!atomicBlock) {
        return null;
      }

      return {
        component: Media,
        editable: false,
        props: {
          atomicBlock,
          get plugin() {
            warnOnce("Megadraft will remove `blockProps.plugin` prop in future versions, please use `blockProps.atomicBlock` instead");
            return atomicBlock;
          },
          get editorState() {
            warnOnce("Megadraft will remove `blockProps.editorState` prop in future versions, please use `blockProps.getEditorState` instead");
            return getEditorState();
          },
          getEditorState,
          setEditorState,
          // TODO: make atomicBlocks use setEditorState instead of onChange
          onChange: setEditorState,
          setReadOnly,
          getReadOnly,
          // TODO: check support for setInitialReadOnly
          getInitialReadOnly: this.getInitialReadOnly,
          setInitialReadOnly: this.setInitialReadOnly
        }
      };
    },

    handleBlockNotFound(contentBlock, {getProps}) {
      const {handleBlockNotFound} = getProps();
      if (handleBlockNotFound) {
        return handleBlockNotFound(contentBlock);
      }
      return notFoundAtomicBlock;
    },

    blockStyleFn(contentBlock) {
      const type = contentBlock.getType();
      if (type === "unstyled") {
        return "paragraph";
      }
    },

    keyBindingFn(event, {getProps}) {
      const {keyBindings = []} = getProps();

      for (const kb of keyBindings) {
        if (kb.isKeyBound(event)) {
          return kb.name;
        }
      }

      return getDefaultKeyBinding(event);
    },

    handleKeyCommand(command, editorState, {getProps, setEditorState}) {
      const {keyBindings = []} = getProps();

      // external key bindings
      if (keyBindings.length) {
        const extKb = keyBindings.find(kb => kb.name === command);
        if (extKb) {
          extKb.action();
          return "handled";
        }
      }

      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        setEditorState(newState);
        return "handled";
      }

      return "not-handled";
    },

    /*
    * Copyright (c) 2016 Icelab
    *
    * License: MIT
    */
    //Based on https://github.com/icelab/draft-js-block-breakout-plugin
    resetBlockStyle(editorState, selection, contentState, currentBlock, blockType, setEditorState) {
      const {List} = Immutable;
      const emptyBlockKey = genKey();

      const emptyBlock = new ContentBlock({
        key: emptyBlockKey,
        text: "",
        type: blockType,
        depth: 0,
        characterList: List(),
        inlineStyleRanges: [],
      });
      const blockMap = contentState.getBlockMap();

      const blocksBefore = blockMap.toSeq().takeUntil(function (v) {
        return v === currentBlock;
      });
      const blocksAfter = blockMap.toSeq().skipUntil(function (v) {
        return v === currentBlock;
      }).rest();

      const augmentedBlocks = [
        [currentBlock.getKey(), currentBlock],
        [emptyBlockKey, emptyBlock],
      ];

      const focusKey = emptyBlockKey;
      const newBlocks = blocksBefore.concat(augmentedBlocks, blocksAfter).toOrderedMap();
      const newContentState = contentState.merge({
        blockMap: newBlocks,
        selectionBefore: selection,
        selectionAfter: selection.merge({
          anchorKey: focusKey,
          anchorOffset: 0,
          focusKey: focusKey,
          focusOffset: 0,
          isBackward: false
        })
      });

      const noStyle = Immutable.OrderedSet([]);
      const resetState = EditorState.push(editorState, newContentState, "split-block");
      const emptySelection = SelectionState.createEmpty(emptyBlockKey);
      const editorSelected = EditorState.forceSelection(resetState, emptySelection);
      const noStyleState = EditorState.setInlineStyleOverride(editorSelected, noStyle);
      setEditorState(noStyleState);
    },

    handleReturn(event, editorState, PluginFunctions) {
      const {
        setEditorState,
        getProps
      } = PluginFunctions;

      const props = getProps();

      if (props.softNewLines === false) {
        return "not-handled";
      }

      if (!event.shiftKey) {
        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();
        const currentBlock = contentState.getBlockForKey(selection.getEndKey());
        const endOffset = selection.getEndOffset();
        const atEndOfBlock = (endOffset === currentBlock.getLength());
        const resetStyleNewLine = props.resetStyleNewLine;
        const blocksWithoutStyleReset = (props.blocksWithoutStyleReset || NO_RESET_STYLE_DEFAULT);
        const noReset = blocksWithoutStyleReset.includes(currentBlock.type);

        if (atEndOfBlock && resetStyleNewLine) {
          const blockType = noReset ? currentBlock.type : "unstyled";
          this.resetBlockStyle(
            editorState,
            selection,
            contentState,
            currentBlock,
            blockType,
            setEditorState
          );
          return "handled";
        }
        return "not-handled";
      }

      const currentContent = editorState.getCurrentContent();
      const currentSelection = editorState.getSelection();
      const contentBlock = currentContent.getBlockMap().get(currentSelection.getFocusKey());
      const contentText = contentBlock.getText();

      if (contentText.charAt(currentSelection.focusOffset -1) == "\n" ||
          contentText.charAt(currentSelection.focusOffset) == "\n"){
        return "not-handled";
      }

      const newState = RichUtils.insertSoftNewline(editorState);
      setEditorState(newState);
      return "handled";
    },

    onTab(event) {
      event.preventDefault();
    }
  };
}
