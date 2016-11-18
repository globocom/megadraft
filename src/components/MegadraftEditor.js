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
import {Editor, RichUtils, getDefaultKeyBinding} from "draft-js";

import DefaultToolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import Media from "./Media";
import notFoundPlugin from "../plugins/not-found/plugin";
import DEFAULT_PLUGINS from "../plugins/default";
import DEFAULT_ACTIONS from "../actions/default";
import DEFAULT_ENTITY_INPUTS from "../entity_inputs/default";

export default class MegadraftEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      readOnly: this.props.readOnly || false
    };

    this.onChange = ::this.onChange;

    this.mediaBlockRenderer = ::this.mediaBlockRenderer;

    this.handleKeyCommand = ::this.handleKeyCommand;
    this.handleReturn = ::this.handleReturn;

    this.setReadOnly = ::this.setReadOnly;

    this.externalKeyBindings = ::this.externalKeyBindings;

    this.actions = this.props.actions || DEFAULT_ACTIONS;
    this.plugins = this.getValidPlugins();
    this.entityInputs = this.props.entityInputs || DEFAULT_ENTITY_INPUTS;

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

  handleReturn(event) {
    if (!event.shiftKey) {
      return false;
    }

    const {editorState} = this.props;
    const newState = RichUtils.insertSoftNewline(editorState);
    this.props.onChange(newState);
    return true;
  }

  setReadOnly(readOnly) {
    this.setState({readOnly});
  }

  handleBlockNotFound(block) {
    if (this.props.handleBlockNotFound) {
      return this.props.handleBlockNotFound(block);
    }
    return notFoundPlugin;
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
        setReadOnly: this.setReadOnly
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
    const { sidebarRendererFn } = this.props;
    if(typeof sidebarRendererFn === "function") {
      return sidebarRendererFn(props);
    }
    return <Sidebar {...props} />;
  }

  renderToolbar(props) {
    const { Toolbar = DefaultToolbar } = this.props;
    return <Toolbar {...props} />;
  }

  render() {
    const {editorState, stripPastedStyles, spellCheck} = this.props;
    const plugins = this.plugins;

    return (
      <div className="megadraft">
        <div
          className="megadraft-editor"
          id="megadraft-editor"
          ref="editor">
          {this.renderSidebar({
            plugins,
            editorState,
            readOnly: this.state.readOnly,
            onChange: this.onChange
          })}
          <Editor
            readOnly={this.state.readOnly}
            plugins={plugins}
            blockRenderMap={this.props.blockRenderMap}
            blockRendererFn={this.mediaBlockRenderer}
            blockStyleFn={this.blockStyleFn}
            onTab={this.onTab}
            handleKeyCommand={this.handleKeyCommand}
            handleReturn={this.handleReturn}
            stripPastedStyles={stripPastedStyles}
            spellCheck={spellCheck}
            keyBindingFn={this.externalKeyBindings}
            editorState={editorState}
            placeholder={this.props.placeholder}
            onChange={this.onChange} />
          {this.renderToolbar({
            editor: this.refs.editor,
            editorState,
            readOnly: this.state.readOnly,
            onChange: this.onChange,
            actions: this.actions,
            entityInputs: this.entityInputs
          })}
        </div>
      </div>
    );
  }
}
