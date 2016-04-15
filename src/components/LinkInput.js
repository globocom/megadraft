import React, {Component} from "react";
import ReactDOM from "react-dom";
import {EditorState, RichUtils, Entity} from "draft-js";


export default class LinkInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: ""
    };
  }

  setLink() {
    let {link} = this.state;
    const {editorState} = this.props;
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      link = `http://${link}`;
    }
    const entityKey = Entity.create("LINK", "MUTABLE", {url: link});
    let newState = RichUtils.toggleLink(
      editorState,
      editorState.getSelection(),
      entityKey
    );
    newState = EditorState.forceSelection(
      newState, this.props.editorState.getSelection());
    this.props.onChange(newState);
  }

  onLinkChange(event) {
    this.setState({link: event.target.value});
  }

  onLinkKeyDown(event) {
    if (event.key == "Enter") {
      event.preventDefault();
      this.setLink();
      this.props.cancelLink();
      this.setState({
        show: false,
        link: ""
      });
      this.props.editor.focus();
    } else if (event.key == "Escape") {
      event.preventDefault();
      ReactDOM.findDOMNode(this.props.editor.focus());
      this.props.cancelLink();
      this.setState({
        link: ""
      });
      this.props.onChange(
        EditorState.forceSelection(
          this.props.editorState, this.props.editorState.getSelection()));
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.editingLink && !prevProps.editingLink) {
      this.refs.textInput.focus();
    }
  }

  render() {
    return (
      <input
        ref="textInput"
        className="textInput"
        style={this.props.editingLink? {}: {display: "none"}}
        type="text"
        onChange={::this.onLinkChange}
        value={this.state.link}
        onKeyDown={::this.onLinkKeyDown}
        placeholder="Type the link and press enter"/>
    );
  }
}
