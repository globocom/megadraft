/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

// i18n shim! I feel bad for doing this =(
// https://github.com/megawac/async/blob/d2dd36b4558f483682f3c672630fdcb36a96d4d2/lib/async.js#L16
(
  (typeof self === "object" && self.self === self && self) ||
  (typeof global === "object" && global.global === global && global) ||
  this
).__ = x => {
  console.warn(
    "__() has been deprecated and will be removed soon. " +
      "You can move this code to your app, instead. __() code can be found at " +
      "https://gist.github.com/marcelometal/768454831c0c10ee03b939187b7bebbf"
  );
  return x;
};

import React, { Component } from "react";
import {
  Editor,
  RichUtils,
  getDefaultKeyBinding,
  EditorState,
  genKey,
  ContentBlock,
  SelectionState,
  DefaultDraftBlockRenderMap
} from "draft-js";
import Immutable from "immutable";

import DefaultToolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import Media from "./Media";
import MoveControl from "./MoveControl";
import MegadraftBlock from "./MegadraftBlock";
import { swapDataUp, swapDataDown } from "../swapDataBlock";
import i18nConfig from "../i18n";
import notFoundPlugin from "../plugins/not-found/plugin";
import DEFAULT_PLUGINS from "../plugins/default";
import DEFAULT_ACTIONS from "../actions/default";
import DEFAULT_ENTITY_INPUTS from "../entity_inputs/default";
import ActionsProvider, { defaultAction } from "./ActionsProvider";

const NO_RESET_STYLE_DEFAULT = ["ordered-list-item", "unordered-list-item"];

export default class MegadraftEditor extends Component {
  static defaultProps = {
    actions: DEFAULT_ACTIONS,
    blockRendererFn: () => {},
    i18n: i18nConfig,
    language: "en-US"
  };

  constructor(props) {
    super(props);
    this.state = {
      readOnly: this.props.readOnly || false,
      hasFocus: false,
      scrollRef: "",
      swapUp: false,
      swapDown: false,
      didSwap: false
    };

    this.onChange = ::this.onChange;
    this.onTab = ::this.onTab;

    this.mediaBlockRenderer = ::this.mediaBlockRenderer;

    this.handleKeyCommand = ::this.handleKeyCommand;
    this.handleReturn = ::this.handleReturn;
    this.handleFocus = ::this.handleFocus;
    this.handleBlur = ::this.handleBlur;

    this.setReadOnly = ::this.setReadOnly;
    this.getReadOnly = ::this.getReadOnly;
    this.getInitialReadOnly = ::this.getInitialReadOnly;
    this.setInitialReadOnly = ::this.setInitialReadOnly;

    this.externalKeyBindings = ::this.externalKeyBindings;

    this.plugins = this.getValidPlugins();
    this.entityInputs = this.props.entityInputs || DEFAULT_ENTITY_INPUTS;
    this.blocksWithoutStyleReset =
      this.props.blocksWithoutStyleReset || NO_RESET_STYLE_DEFAULT;

    this.pluginsByType = this.getPluginsByType();

    this.keyBindings = this.props.keyBindings || [];

    this.onAction = this.props.onAction || defaultAction;

    this.extendedBlockRenderMap = Immutable.OrderedMap().withMutations(r => {
      for (let [blockType, data] of DefaultDraftBlockRenderMap.entrySeq()) {
        r.set(blockType, {
          ...data,
          wrapper: this.props.movableBlocks ? (
            <MoveControl
              wrapper={data.wrapper}
              swapUp={this.swapUp}
              swapDown={this.swapDown}
              isFirstBlock={this.isFirstBlock}
              isLastBlock={this.isLastBlock}
              onAction={this.onAction}
              isAtomic={blockType === "atomic"}
            />
          ) : (
            <MegadraftBlock wrapper={data.wrapper} />
          )
        });
      }
    });
  }

  getValidPlugins() {
    let plugins = [];
    for (let plugin of this.props.plugins || DEFAULT_PLUGINS) {
      if (!plugin || typeof plugin.type !== "string") {
        console.warn("Plugin: Missing `type` field. Details: ", plugin);
        continue;
      }
      plugins.push(plugin);
    }
    return plugins;
  }

  getPluginsByType() {
    let pluginsByType = {};

    for (let plugin of this.plugins) {
      pluginsByType[plugin.type] = plugin;
    }

    return pluginsByType;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.readOnly !== nextProps.readOnly) {
      this.setState({ readOnly: nextProps.readOnly });
    }
  }

  onChange(editorState) {
    this.props.onChange(editorState);
  }

  externalKeyBindings(e): string {
    for (const kb of this.keyBindings) {
      if (kb.isKeyBound(e)) {
        return kb.name;
      }
    }
    return getDefaultKeyBinding(e);
  }

  onTab(event) {
    if (this.props.onTab) {
      this.props.onTab(event);
    }
  }

  handleKeyCommand(command) {
    // external key bindings
    if (this.keyBindings.length) {
      const extKb = this.keyBindings.find(kb => kb.name === command);
      if (extKb) {
        extKb.action();
        return true;
      }
    }

    const { editorState } = this.props;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.props.onChange(newState);
      return true;
    }
    return false;
  }

  /*
   * Copyright (c) 2016 Icelab
   *
   * License: MIT
   */
  //Based on https://github.com/icelab/draft-js-block-breakout-plugin
  resetBlockStyle(
    editorState,
    selection,
    contentState,
    currentBlock,
    blockType
  ) {
    const { List } = Immutable;
    const emptyBlockKey = genKey();

    const emptyBlock = new ContentBlock({
      key: emptyBlockKey,
      text: "",
      type: blockType,
      depth: 0,
      characterList: List(),
      inlineStyleRanges: []
    });
    const blockMap = contentState.getBlockMap();

    const blocksBefore = blockMap.toSeq().takeUntil(function(v) {
      return v === currentBlock;
    });
    const blocksAfter = blockMap
      .toSeq()
      .skipUntil(function(v) {
        return v === currentBlock;
      })
      .rest();

    const augmentedBlocks = [
      [currentBlock.getKey(), currentBlock],
      [emptyBlockKey, emptyBlock]
    ];

    const focusKey = emptyBlockKey;
    const newBlocks = blocksBefore
      .concat(augmentedBlocks, blocksAfter)
      .toOrderedMap();
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
    const resetState = EditorState.push(
      editorState,
      newContentState,
      "split-block"
    );
    const emptySelection = SelectionState.createEmpty(emptyBlockKey);
    const editorSelected = EditorState.forceSelection(
      resetState,
      emptySelection
    );
    const noStyleState = EditorState.setInlineStyleOverride(
      editorSelected,
      noStyle
    );
    this.props.onChange(noStyleState);
  }

  handleReturn(event) {
    if (this.props.softNewLines === false) {
      return false;
    }

    if (!event.shiftKey) {
      const { editorState } = this.props;
      const selection = editorState.getSelection();
      const contentState = editorState.getCurrentContent();
      const currentBlock = contentState.getBlockForKey(selection.getEndKey());
      const endOffset = selection.getEndOffset();
      const atEndOfBlock = endOffset === currentBlock.getLength();
      const resetStyleNewLine = this.props.resetStyleNewLine;
      const noReset = this.blocksWithoutStyleReset.includes(currentBlock.type);

      if (atEndOfBlock && resetStyleNewLine) {
        const blockType = noReset ? currentBlock.type : "unstyled";
        this.resetBlockStyle(
          editorState,
          selection,
          contentState,
          currentBlock,
          blockType
        );
        return true;
      }
      return false;
    }

    const { editorState } = this.props;

    const currentContent = editorState.getCurrentContent();
    const currentSelection = editorState.getSelection();
    const contentBlock = currentContent
      .getBlockMap()
      .get(currentSelection.getFocusKey());
    const contentText = contentBlock.getText();

    if (
      contentText.charAt(currentSelection.focusOffset - 1) == "\n" ||
      contentText.charAt(currentSelection.focusOffset) == "\n"
    ) {
      return false;
    }

    const newState = RichUtils.insertSoftNewline(editorState);
    this.props.onChange(newState);
    return true;
  }

  focus() {
    this.draftEl.focus();
  }

  setReadOnly(readOnly) {
    this.setState({ readOnly });
  }

  getReadOnly() {
    return this.state.readOnly;
  }

  getInitialReadOnly() {
    return this.props.readOnly || false;
  }

  setInitialReadOnly() {
    let readOnly = this.props.readOnly || false;
    this.setState({ readOnly });
  }

  handleBlockNotFound(block) {
    if (this.props.handleBlockNotFound) {
      return this.props.handleBlockNotFound(block);
    }
    return notFoundPlugin;
  }

  handleFocus() {
    clearTimeout(this.blurTimeoutID);

    if (!this.state.hasFocus) {
      this.setState({
        hasFocus: true
      });
    }
  }

  handleBlur() {
    this.blurTimeoutID = setTimeout(() => {
      if (this.state.hasFocus) {
        this.setState({
          hasFocus: false
        });
      }
    }, 200);
  }

  handleClassEditor(identifier) {
    let classEditor = this.props.movableBlocks
      ? `${identifier} movable`
      : identifier;
    let contentState = this.props.editorState.getCurrentContent();
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it.
    // Class with styling to spacing placeholder.
    if (!contentState.hasText()) {
      switch (
        contentState
          .getBlockMap()
          .first()
          .getType()
      ) {
        case "ordered-list-item":
        case "unordered-list-item":
          classEditor += " placeholder-list";
          break;
        case "header-two":
          classEditor += " placeholder-header-two";
          break;
        case "blockquote":
          classEditor += " placeholder-blockquote";
          break;
      }
    }
    return classEditor;
  }

  componentWillUnmount() {
    clearTimeout(this.blurTimeoutID);
  }

  componentDidUpdate() {
    if (this.state.swapUp || this.state.swapDown) {
      const swapFunction = this.state.swapUp ? swapDataUp : swapDataDown;

      const newEditorState = swapFunction({
        editorState: this.props.editorState,
        currentKey: this.state.scrollRef
      });

      this.onChange(newEditorState);
      this.setState({
        didSwap: true,
        swapUp: false,
        swapDown: false
      });
    } else if (this.state.didSwap) {
      const control = document.querySelector(`[id*="${this.state.scrollRef}"]`);

      if (control) {
        const options = control.querySelector(".options");
        const swapEffect = () => {
          options.classList.toggle("options--swapped");
          control.classList.toggle("move-control--swapped");
        };

        const input = control.querySelector("[type=text]");
        input && input.focus();

        control.scrollIntoView({ block: "center" });
        window.scroll(0, window.pageYOffset - control.clientHeight / 2);

        swapEffect();

        setTimeout(() => {
          swapEffect();
        }, 300);

        this.setState({
          didSwap: false,
          scrollRef: ""
        });
      }
    }
  }

  mediaBlockRenderer(block) {
    const handled = this.props.blockRendererFn(block);
    if (handled) {
      return handled;
    }

    if (block.getType() !== "atomic") {
      return null;
    }

    const type = block.getData().toObject().type;

    let plugin = this.pluginsByType[type] || this.handleBlockNotFound(block);
    if (!plugin) {
      return null;
    }

    return {
      component: Media,
      editable: false,
      props: {
        i18n: this.props.i18n[this.props.language],
        plugin: plugin,
        onChange: this.onChange,
        editorState: this.props.editorState,
        getEditorState: this.getEditorState,
        setReadOnly: this.setReadOnly,
        getReadOnly: this.getReadOnly,
        getInitialReadOnly: this.getInitialReadOnly,
        setInitialReadOnly: this.setInitialReadOnly
      }
    };
  }

  getEditorState = () => {
    return this.props.editorState;
  };

  blockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === "unstyled") {
      return "paragraph";
    }
  }

  renderSidebar(props) {
    const { sidebarRendererFn } = this.props;
    if (typeof sidebarRendererFn === "function") {
      return sidebarRendererFn(props);
    }
    return <Sidebar {...props} />;
  }

  renderToolbar(props) {
    const { Toolbar = DefaultToolbar } = this.props;
    return <Toolbar {...props} />;
  }

  swapUp = currentKey => {
    document.activeElement.blur();

    this.forceUpdate(() => {
      this.setState({
        swapUp: true,
        swapDown: false,
        scrollRef: currentKey
      });
    });
  };

  swapDown = currentKey => {
    document.activeElement.blur();

    this.forceUpdate(() => {
      this.setState({
        swapUp: false,
        swapDown: true,
        scrollRef: currentKey
      });
    });
  };

  isFirstBlock = currentKey => {
    const contentState = this.props.editorState.getCurrentContent();
    return contentState.getFirstBlock().getKey() === currentKey;
  };

  isLastBlock = currentKey => {
    const contentState = this.props.editorState.getCurrentContent();
    return contentState.getLastBlock().getKey() === currentKey;
  };

  render() {
    const hideSidebarOnBlur = this.props.hideSidebarOnBlur || false;
    const i18n = this.props.i18n[this.props.language];
    const classEditor = "megadraft";
    const identifierEditor = `${classEditor}-editor`;

    return (
      <div className={classEditor}>
        <ActionsProvider onAction={this.onAction}>
          <div
            className={this.handleClassEditor(identifierEditor)}
            id={this.props.id || identifierEditor}
            ref={el => {
              this.editorEl = el;
            }}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          >
            {this.renderSidebar({
              i18n: i18n,
              plugins: this.plugins,
              editorState: this.props.editorState,
              readOnly: this.state.readOnly,
              onChange: this.onChange,
              maxSidebarButtons: this.props.maxSidebarButtons,
              modalOptions: this.props.modalOptions,
              editorHasFocus: this.state.hasFocus,
              hideSidebarOnBlur: hideSidebarOnBlur
            })}
            <Editor
              {...this.props}
              ref={el => {
                this.draftEl = el;
              }}
              readOnly={this.state.readOnly}
              blockRendererFn={this.mediaBlockRenderer}
              blockStyleFn={this.props.blockStyleFn || this.blockStyleFn}
              onTab={this.onTab}
              handleKeyCommand={this.handleKeyCommand}
              handleReturn={this.props.handleReturn || this.handleReturn}
              keyBindingFn={this.externalKeyBindings}
              onChange={this.onChange}
              blockRenderMap={this.extendedBlockRenderMap}
            />
            {this.renderToolbar({
              i18n: i18n,
              editor: this.editorEl,
              draft: this.draftEl,
              editorState: this.props.editorState,
              editorHasFocus: this.state.hasFocus,
              readOnly: this.state.readOnly,
              onChange: this.onChange,
              actions: this.props.actions,
              entityInputs: this.entityInputs,
              shouldDisplayToolbarFn: this.props.shouldDisplayToolbarFn
            })}
          </div>
        </ActionsProvider>
      </div>
    );
  }
}
