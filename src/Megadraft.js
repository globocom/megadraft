/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import Draft, {Editor, RichUtils} from "draft-js";

import icons from "./icons";
import * as plugin from "./components/plugin";
import Toolbar from "./components/Toolbar";
import Sidebar from "./components/Sidebar";
import Media from "./components/Media";
import DEFAULT_PLUGINS from "./plugins/default";


export default class Megadraft extends Component {
  constructor(props) {
    super(props);

    this.state = {
      readOnly: false
    };

    this.setReadOnly = ::this.setReadOnly;

    this.actions = [
      {type: "inline", label: "B", style: "BOLD", icon: icons.BoldIcon},
      {type: "inline", label: "I", style: "ITALIC", icon: icons.ItalicIcon},
      {type: "entity", label: "Link", style: "link", icon: icons.LinkIcon},
      {type: "separator"},
      {type: "block", label: "UL", style: "unordered-list-item", icon: icons.ULIcon},
      {type: "block", label: "OL", style: "ordered-list-item", icon: icons.OLIcon},
      {type: "block", label: "H2", style: "header-two", icon: icons.H2Icon},
      {type: "block", label: "QT", style: "blockquote", icon: icons.BlockQuoteIcon}
    ];

    this.plugins = this.props.plugins || DEFAULT_PLUGINS;
  }

  onChange(editorState) {
    this.props.onChange(editorState);
  }

  handleKeyCommand(command) {
    const {editorState} = this.props;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.props.onChange(newState);
      return true;
    }
    return false;
  }

  setReadOnly(readOnly) {
    this.setState({readOnly});
  }

  mediaBlockRenderer(block) {
    if (block.getType() === "atomic") {
      return {
        component: Media,
        editable: false,
        props: {
          plugins: this.plugins,
          onChange: ::this.onChange,
          editorState: this.props.editorState,
          setReadOnly: this.setReadOnly
        }
      };
    }

    return null;
  }

  blockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === "unstyled") {
      return "paragraph";
    }
  }

  render() {
    const {editorState} = this.props;
    const plugins = this.plugins;

    return (
      <div className="megadraft">
        <div
          className="megadraft-editor"
          id="megadraft-editor"
          ref="editor">
          <Sidebar
            plugins={plugins}
            editorState={editorState}
            onChange={::this.onChange}/>
          <Editor
            readOnly={this.state.readOnly}
            plugins={plugins}
            blockRendererFn={::this.mediaBlockRenderer}
            blockStyleFn={this.blockStyleFn}
            handleKeyCommand={::this.handleKeyCommand}
            editorState={editorState}
            onChange={::this.onChange} />
          <Toolbar
            editor={this.refs.editor}
            editorState={editorState}
            onChange={::this.onChange}
            actions={this.actions}/>
        </div>
      </div>
    );
  }
}

export const DraftJS = Draft;
export const MegadraftIcons = icons;
export const MegadraftPlugin = plugin;
