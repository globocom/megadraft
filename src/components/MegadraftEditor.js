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
import Editor from "draft-js-plugins-editor";

import DefaultToolbar from "./Toolbar";
import Sidebar from "./Sidebar";
import DEFAULT_ATOMIC_BLOCKS from "../atomicBlocks/default";
import DEFAULT_ACTIONS from "../actions/default";
import DEFAULT_ENTITY_INPUTS from "../entity_inputs/default";
import createCorePlugin from "../createCorePlugin";

const NO_RESET_STYLE_DEFAULT = ["ordered-list-item", "unordered-list-item"];

const corePlugin = createCorePlugin();

export default class MegadraftEditor extends Component {
  static defaultProps = {
    actions: DEFAULT_ACTIONS,
  }

  constructor(props) {
    super(props);
    this.state = {
      readOnly: this.props.readOnly || false
    };

    this.onChange = ::this.onChange;

    this.setReadOnly = ::this.setReadOnly;
    this.getReadOnly = ::this.getReadOnly;
    this.getInitialReadOnly = ::this.getInitialReadOnly;
    this.setInitialReadOnly = ::this.setInitialReadOnly;

    this.entityInputs = this.props.entityInputs || DEFAULT_ENTITY_INPUTS;
    this.blocksWithoutStyleReset = (this.props.blocksWithoutStyleReset ||
                                    NO_RESET_STYLE_DEFAULT);
  }

  componentWillReceiveProps(nextProps){
    if (this.props.readOnly !== nextProps.readOnly) {
      this.setState({readOnly: nextProps.readOnly});
    }
  }

  onChange(editorState) {
    this.props.onChange(editorState);
  }

  getValidAtomicBlocks(atomicBlocks) {
    return atomicBlocks.filter((atomicBlock) => {
      const isInvalid = (!atomicBlock || typeof atomicBlock.type !== "string");
      if (isInvalid) {
        console.warn("AtomicBlock: Missing `type` field. Details: ", atomicBlock);
      }
      return !isInvalid;
    });
  }

  focus() {
    this.refs.draft.focus();
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
    let {atomicBlocks, ...props} = this.props;
    atomicBlocks = this.getValidAtomicBlocks(atomicBlocks || DEFAULT_ATOMIC_BLOCKS);

    const plugins = this.props.plugins || [];

    return (
      <div className="megadraft">
        <div
          className="megadraft-editor"
          id="megadraft-editor"
          ref="editor">
          {this.renderSidebar({
            atomicBlocks,
            editorState: props.editorState,
            readOnly: this.state.readOnly,
            onChange: this.onChange,
            maxSidebarButtons: props.maxSidebarButtons,
            modalOptions: props.modalOptions,
          })}
          <Editor
            {...props}
            ref="draft"
            readOnly={this.state.readOnly}
            atomicBlocks={atomicBlocks}
            plugins={[corePlugin, ...plugins]}
            onChange={this.onChange}
          />
          {this.renderToolbar({
            editor: this.refs.editor,
            editorState: props.editorState,
            readOnly: this.state.readOnly,
            onChange: this.onChange,
            actions: props.actions,
            entityInputs: this.entityInputs,
            shouldDisplayToolbarFn: this.props.shouldDisplayToolbarFn,
          })}
        </div>
      </div>
    );
  }
}
