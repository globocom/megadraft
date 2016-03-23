import React, {Component} from "react";

import SideBar from "./SideBar";
import {Editor, RichUtils} from "draft-js";


export default class Megadraft extends Component {
  constructor(props) {
    super(props);
    this.onChange = (editorState) => this.props.onChange(editorState);
  }

  handleKeyCommand(command) {
    const {editorState} = this.props;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  render() {
    const {editorState} = this.props;
    return (
      <div className="megadraft">
        <SideBar editorState={editorState} onChange={this.onChange} />
        <div className="megadraft-editor">
          <Editor
            handleKeyCommand={::this.handleKeyCommand}
            editorState={editorState}
            onChange={this.onChange} />
        </div>
      </div>
    );
  }
}
