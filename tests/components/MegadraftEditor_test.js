/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import chai from "chai";
import sinon from "sinon";
import {Editor} from "draft-js";
import {mount} from "enzyme";

import MegadraftEditor from "../../src/components/MegadraftEditor";
import Media from "../../src/components/Media";
import Sidebar from "../../src/components/Sidebar";
import Toolbar from "../../src/components/Toolbar";
import {editorStateFromRaw} from "../../src/utils";
import image from "../../src/atomicBlocks/image";
import DEFAULT_ATOMIC_BLOCKS from "../../src/atomicBlocks/default";


let expect = chai.expect;

class MegadraftEditorWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
  }

  render() {
    return (
      <MegadraftEditor
        editorState={this.state.editorState}
        onChange={this.props.onChange}
        blocksWithoutStyleReset={this.props.blocksWithoutStyleReset}
        resetStyleNewLine={this.props.resetStyleNewLine}/>
    );
  }
}


describe("MegadraftEditor Component", () => {
  beforeEach(function() {
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

    const blocksWithoutStyleReset = ["ordered-list-item", "unordered-list-item"];
    const resetStyleOn = true;
    const resetStyleOff = false;

    this.maxSidebarButtons = null;
    this.modalOptions = {width: 500, height: 300};
    this.onChange = sinon.spy();
    this.editorState = editorStateFromRaw(INITIAL_CONTENT);
    this.wrapper = mount(
      <MegadraftEditor editorState={this.editorState} onChange={this.onChange} />
    );
    this.component = this.wrapper.get(0);

    this.wrapperWithReset = mount(
      <MegadraftEditorWrapper
        editorState={this.editorState}
        onChange={this.onChange}
        blocksWithoutStyleReset={blocksWithoutStyleReset}
        resetStyleNewLine={resetStyleOn}/>
    );

    this.wrapperWithoutReset = mount(
      <MegadraftEditorWrapper
        editorState={this.editorState}
        onChange={this.onChange}
        blocksWithoutStyleReset={blocksWithoutStyleReset}
        resetStyleNewLine={resetStyleOff}/>
    );
  });

  it("renders without problems", function() {
    expect(this.wrapper).to.have.length(1);
  });

  it("has the initial text", function() {
    expect(this.component.refs.editor.textContent).to.have.string("Hello World!");
  });

  it("renders Media component", function() {
    const items = this.wrapper.find(Media);
    expect(items).to.have.length(1);
  });

  it("passes extra props to the draft-js editor", function() {
    const handlePastedText = (text) => { return text; };
    const wrapper = mount(
      <MegadraftEditor
        editorState={this.editorState}
        onChange={this.onChange}
        handlePastedText={handlePastedText}
      />
    );
    expect(wrapper.ref("draft").props().handlePastedText).to.equal(handlePastedText);
  });

  it("passes extra plugins to the draft-js editor", function() {
    const fakePlugin = {fake: "plugin"};
    const wrapper = mount(
      <MegadraftEditor
        editorState={this.editorState}
        onChange={this.onChange}
        plugins={[fakePlugin]}
      />
    );
    const plugins = wrapper.ref("draft").props().plugins;
    expect(plugins.length).to.equal(2);
    expect(plugins[1]).to.deep.equal(fakePlugin);
  });

  it("starts with default readOnly status", function() {
    const items = this.wrapper.find(Editor);
    expect(items.get(0).props.readOnly).to.be.false;
  });

  it("changes readOnly status", function() {
    const items = this.wrapper.find(Editor);
    this.component.setReadOnly(true);
    expect(items.get(0).props.readOnly).to.be.true;
  });

  it("renders only valid atomicBlocks", function() {
    console.warn = sinon.spy();

    const invalidAtomicBlock = {
      buttonComponent: {},
      blockComponent: {}
    };

    const wrapper = mount(
      <MegadraftEditor
        editorState={this.editorState}
        onChange={this.onChange}
        atomicBlocks={[image, invalidAtomicBlock]} />
    );
    const sidebar = wrapper.find(Sidebar);
    expect(sidebar.prop("atomicBlocks")).to.have.length(1);
  });

  it("shows warning for missing `type` field", function() {
    console.warn = sinon.spy();

    const atomicBlock = {
      buttonComponent: {},
      blockComponent: {}
    };
    const atomicBlocks = [atomicBlock];

    mount(
      <MegadraftEditor
        editorState={this.editorState}
        onChange={this.onChange}
        atomicBlocks={atomicBlocks} />
    );

    expect(console.warn.getCall(0).args[0]).to.equal(
      "AtomicBlock: Missing `type` field. Details: "
    );
  });

  it("renders default sidebar if sidebarRendererFn not provided", function() {
    const sidebar = this.wrapper.find(Sidebar);
    expect(sidebar).to.have.length(1);
  });

  it("passes required props to default sidebar", function() {
    const sidebar = this.wrapper.find(Sidebar);
    expect(sidebar.prop("atomicBlocks")).to.deep.equal(DEFAULT_ATOMIC_BLOCKS);
    expect(sidebar.prop("onChange")).to.equal(this.component.onChange);
    expect(sidebar.prop("editorState")).to.equal(this.editorState);
    expect(sidebar.prop("readOnly")).to.equal(false);
  });

  it("calls sidebarRendererFn if it's provided", function() {
    const renderCustomSidebar = sinon.spy();
    const wrapper = mount(
      <MegadraftEditor
        editorState={this.editorState}
        onChange={this.onChange}
        maxSidebarButtons= {this.maxSidebarButtons}
        sidebarRendererFn={renderCustomSidebar}
        modalOptions={this.modalOptions} />
    );

    const component = wrapper.get(0);
    const expectedProps = {
      atomicBlocks: DEFAULT_ATOMIC_BLOCKS,
      onChange: component.onChange,
      editorState: this.editorState,
      readOnly: false,
      maxSidebarButtons: this.maxSidebarButtons,
      modalOptions: this.modalOptions
    };
    expect(renderCustomSidebar.calledWith(expectedProps)).to.be.true;
  });

  it("renders custom sidebar if sidebarRendererFn is provided", function() {
    class MyCustomSidebar extends React.Component {
      render() {
        return (
          <div>
            <span>My custom Sidebar</span>
          </div>
        );
      }
    }
    const renderCustomSidebar = function(atomicBlocks, editorState) {
      return <MyCustomSidebar atomicBlocks={atomicBlocks} editorState={editorState}/>;
    };
    const wrapper = mount(
      <MegadraftEditor
        editorState={this.editorState}
        onChange={this.onChange}
        sidebarRendererFn={renderCustomSidebar} />
    );
    const sidebar = wrapper.find(MyCustomSidebar);
    expect(sidebar).to.have.length(1);
  });

  it("renders default toolbar if Tooolbar not provided", function() {
    const toolbar = this.wrapper.find(Toolbar);
    expect(toolbar).to.have.length(1);
  });

  it("passes required props to default toolbar", function() {
    const toolbar = this.wrapper.find(Toolbar);
    // editor is undefined :-/
    //expect(toolbar.prop("editor")).to.equal(this.component.refs.editor);
    expect(toolbar.prop("actions")).to.equal(this.component.props.actions);
    expect(toolbar.prop("entityInputs")).to.equal(this.component.entityInputs);
    expect(toolbar.prop("onChange")).to.equal(this.component.onChange);
    expect(toolbar.prop("editorState")).to.equal(this.editorState);
    expect(toolbar.prop("readOnly")).to.equal(false);
  });

  it("renders custom toolbar if Toolbar is provided", function() {
    class MyCustomToolbar extends React.Component {
      render() {
        return (
          <div>
            <span>My custom Toolbar</span>
          </div>
        );
      }
    }

    const wrapper = mount(
      <MegadraftEditor
        editorState={this.editorState}
        onChange={this.component.onChange}
        Toolbar={MyCustomToolbar} />
    );
    const toolbar = wrapper.find(MyCustomToolbar);
    expect(toolbar).to.have.length(1);
    expect(toolbar.prop("actions")).to.equal(this.component.props.actions);
    expect(toolbar.prop("entityInputs")).to.equal(this.component.entityInputs);
    expect(toolbar.prop("editorState")).to.equal(this.editorState);
    expect(toolbar.prop("readOnly")).to.equal(false);
  });
});
