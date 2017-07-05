/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

// i18n shim! I feel bad for doing this =(
// https://github.com/megawac/async/blob/d2dd36b4558f483682f3c672630fdcb36a96d4d2/lib/async.js#L16
((typeof self === "object" && self.self === self && self) ||
  (typeof global === "object" && global.global === global && global) ||
  this).__ = (x) => x;

import React, {Component} from "react";
import {
  Editor,
  RichUtils,
  getDefaultKeyBinding,
  EditorState,
  genKey,
  ContentBlock,
  SelectionState
} from "draft-js";
import Immutable from "immutable";


import DefaultToolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import Media from "./Media";
import notFoundPlugin from "../plugins/not-found/plugin";
import DEFAULT_PLUGINS from "../plugins/default";
import DEFAULT_ACTIONS from "../actions/default";
import DEFAULT_ENTITY_INPUTS from "../entity_inputs/default";

const NO_RESET_STYLE_DEFAULT = ["ordered-list-item", "unordered-list-item"];


export default class MegadraftEditor extends Component {
  static defaultProps = {
    actions: DEFAULT_ACTIONS,
  }

  constructor(props) {
    super(props);
    this.state = {
      readOnly: this.props.readOnly || false,
      hasFocus: false
    };

    this.onChange = ::this.onChange;

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
    this.blocksWithoutStyleReset = (this.props.blocksWithoutStyleReset ||
                                    NO_RESET_STYLE_DEFAULT);

    this.pluginsByType = this.getPluginsByType();

    this.keyBindings = this.props.keyBindings || [];

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

  componentWillReceiveProps(nextProps){
    if (this.props.readOnly !== nextProps.readOnly) {
      this.setState({readOnly: nextProps.readOnly});
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
    event.preventDefault();
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

    const {editorState} = this.props;
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
  resetBlockStyle(editorState, selection, contentState, currentBlock, blockType) {
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
    this.props.onChange(noStyleState);
  }

  handleReturn(event) {
    if (this.props.softNewLines === false) {
      return false;
    }

    if (!event.shiftKey) {
      const {editorState} = this.props;
      const selection = editorState.getSelection();
      const contentState = editorState.getCurrentContent();
      const currentBlock = contentState.getBlockForKey(selection.getEndKey());
      const endOffset = selection.getEndOffset();
      const atEndOfBlock = (endOffset === currentBlock.getLength());
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

    const {editorState} = this.props;

    const currentContent = editorState.getCurrentContent();
    const currentSelection = editorState.getSelection();
    const contentBlock = currentContent.getBlockMap().get(currentSelection.getFocusKey());
    const contentText = contentBlock.getText();

    if (contentText.charAt(currentSelection.focusOffset -1) == "\n" ||
        contentText.charAt(currentSelection.focusOffset) == "\n"){
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
    this.setState({readOnly});
  }

  getReadOnly() {
    return this.state.readOnly;
  }

  getInitialReadOnly() {
    return this.props.readOnly || false;
  }

  setInitialReadOnly() {
    let readOnly = this.props.readOnly || false;
    this.setState({readOnly});
  }

  handleBlockNotFound(block) {
    if (this.props.handleBlockNotFound) {
      return this.props.handleBlockNotFound(block);
    }
    return notFoundPlugin;
  }

  handleFocus() {
    this.setState({
      hasFocus: true
    });
  }

  handleBlur() {
    this.setState({
      hasFocus: false
    });
  }

  mediaBlockRenderer(block) {
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
        plugin: plugin,
        onChange: this.onChange,
        editorState: this.props.editorState,
        setReadOnly: this.setReadOnly,
        getReadOnly: this.getReadOnly,
        getInitialReadOnly: this.getInitialReadOnly,
        setInitialReadOnly: this.setInitialReadOnly
      }
    };
  }

  blockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === "unstyled") {
      return "paragraph";
    }
  }

  renderSidebar(props) {
    const {sidebarRendererFn} = this.props;
    if(typeof sidebarRendererFn === "function") {
      return sidebarRendererFn(props);
    }
    return <Sidebar {...props} />;
  }

  renderToolbar(props) {
    const {Toolbar = DefaultToolbar} = this.props;
    return <Toolbar {...props} />;
  }

  render() {
    return (
      <div className="megadraft">
        <div
          className="megadraft-editor"
          id="megadraft-editor"
          ref={(el) => { this.editorEl = el; }}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        >
          {this.renderSidebar({
            plugins: this.plugins,
            editorState: this.props.editorState,
            readOnly: this.state.readOnly,
            onChange: this.onChange,
            maxSidebarButtons: this.props.maxSidebarButtons,
            modalOptions: this.props.modalOptions,
          })}
          <Editor
            {...this.props}
            ref={(el) => { this.draftEl = el; }}
            readOnly={this.state.readOnly}
            plugins={this.plugins}
            blockRendererFn={this.mediaBlockRenderer}
            blockStyleFn={this.props.blockStyleFn || this.blockStyleFn}
            onTab={this.onTab}
            handleKeyCommand={this.handleKeyCommand}
            handleReturn={this.props.handleReturn || this.handleReturn}
            keyBindingFn={this.externalKeyBindings}
            onChange={this.onChange}
          />
          {this.renderToolbar({
            editor: this.editorEl,
            draft: this.refs.draft,
            editorState: this.props.editorState,
            editorHasFocus: this.state.hasFocus,
            readOnly: this.state.readOnly,
            onChange: this.onChange,
            actions: this.props.actions,
            entityInputs: this.entityInputs,
            shouldDisplayToolbarFn: this.props.shouldDisplayToolbarFn,
          })}
        </div>
      </div>
    );
  }
}
