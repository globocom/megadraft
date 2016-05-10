/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Radium from "radium";
import React, {Component} from "react";
import Draft, {Editor, RichUtils, EditorState} from "draft-js";

import icons from "./icons";
import Toolbar from "./Toolbar";
import Sidebar from "./components/Sidebar";
import {getDefaultPlugins} from "./utils";
import Media from "./components/Media";
import EditorStyle from "./styles/EditorStyle";


export default @Radium
class Megadraft extends Component {
  constructor(props) {
    super(props);

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

  mediaBlockRenderer(block) {
    if (block.getType() === "atomic") {
      return {
        component: Media,
        editable: false,
        props: {
          plugins: this.props.plugins || getDefaultPlugins(),
          onChange: ::this.onChange,
          editorState: this.props.editorState
        }
      };
    }

    return null;
  }

  render() {
    let {editorState} = this.props;
    if (!editorState) {
      editorState = EditorState.createEmpty();
    }

    const plugins = this.props.plugins || getDefaultPlugins();

    return (
      <div className="megadraft">
        <div
          className="megadraft-editor"
          style={EditorStyle.editor}
          id="megadraft-editor"
          ref="editor">
          <Sidebar
            plugins={plugins}
            editorState={editorState}
            onChange={::this.onChange}/>
          <Editor
            plugins={plugins}
            blockRendererFn={::this.mediaBlockRenderer}
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
