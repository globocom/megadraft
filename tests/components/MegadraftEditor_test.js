/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import chai from "chai";
import sinon from "sinon";
import {Editor, EditorState, SelectionState} from "draft-js";
import {mount} from "enzyme";

import MegadraftEditor from "../../src/components/MegadraftEditor";
import Media from "../../src/components/Media";
import Sidebar from "../../src/components/Sidebar";
import Toolbar from "../../src/components/Toolbar";
import {editorStateFromRaw} from "../../src/utils";
import image from "../../src/plugins/image/plugin";
import NotFoundPlugin from "../../src/plugins/not-found/plugin";


let expect = chai.expect;
let kba = function keyBindingAction() {};


function replaceSelection(newSelection, wrapper, blockKey) {
  const selectionState = SelectionState.createEmpty(blockKey);
  const updatedSelection = selectionState.merge(newSelection);
  const oldState = wrapper.state("editorState");
  const editorState = EditorState.forceSelection(oldState, updatedSelection);

  wrapper.setState({editorState: editorState});
}

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
        keyBindings={this.props.keyBindings}
        blocksWithoutStyleReset={this.props.blocksWithoutStyleReset}
        resetStyleNewLine={this.props.resetStyleNewLine}/>
    );
  }
}


describe("MegadraftEditor Component", () => {
  class FakeAtomicBlock {
    constructor(type){
      this.type = type;
    }

    getType(){
      return "atomic";
    }

    getData() {
      return {
        toObject: () => {
          return {type: this.type};
        }
      };
    }
  }

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

    kba = sinon.spy();
    const keyBindings = [
      {name: "save", isKeyBound: (e) => {return e.keyCode === 83 && e.ctrlKey;}, action: kba}
    ];
    const blocksWithoutStyleReset = ["ordered-list-item", "unordered-list-item"];
    const resetStyleOn = true;
    const resetStyleOff = false;

    this.maxSidebarButtons = null;
    this.modalOptions = {width: 500, height: 300};
    this.onChange = sinon.spy();
    this.editorState = editorStateFromRaw(INITIAL_CONTENT);
    this.wrapper = mount(
      <MegadraftEditor
        editorState={this.editorState}
        onChange={this.onChange}
        keyBindings={keyBindings}/>
    );
    this.component = this.wrapper.get(0);

    this.wrapperWithReset = mount(
      <MegadraftEditorWrapper
        editorState={this.editorState}
        onChange={this.onChange}
        keyBindings={keyBindings}
        blocksWithoutStyleReset={blocksWithoutStyleReset}
        resetStyleNewLine={resetStyleOn}/>
    );

    this.wrapperWithoutReset = mount(
      <MegadraftEditorWrapper
        editorState={this.editorState}
        onChange={this.onChange}
        keyBindings={keyBindings}
        blocksWithoutStyleReset={blocksWithoutStyleReset}
        resetStyleNewLine={resetStyleOff}/>
    );
  });

  it("renders without problems", function() {
    expect(this.wrapper).to.have.length(1);
  });

  it("has the initial text", function() {
    expect(this.component.editorEl.textContent).to.have.string("Hello World!");
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
    expect(wrapper.find(Editor).props().handlePastedText).to.equal(handlePastedText);
  });

  it("can't override megadraft props via extra props", function() {
    const blockRendererFn = (text) => { return text; };
    const wrapper = mount(
      <MegadraftEditor
        editorState={this.editorState}
        onChange={this.onChange}
        blockRendererFn={blockRendererFn}
      />
    );
    expect(wrapper.find(Editor).props().blockRendererFn).to.not.equal(blockRendererFn);
  });

  it("allows blockStyleFn to be overridden", function() {
    const blockStyleFn = (text) => { return text; };
    const wrapper = mount(
      <MegadraftEditor
        editorState={this.editorState}
        onChange={this.onChange}
        blockStyleFn={blockStyleFn}
      />
    );
    expect(wrapper.find(Editor).props().blockStyleFn).to.equal(blockStyleFn);
  });

  it("reset blockStyle in new block if resetStyle is true", function() {
    const blockKey = "ag6qs";
    replaceSelection(
      {anchorOffset: 12, focusOffset: 12},
      this.wrapperWithReset,
      blockKey
    );

    const editor = this.wrapperWithReset.find(MegadraftEditor);

    editor.node.handleReturn({shiftKey:false});

    const content = this.onChange.args[0][0].getCurrentContent();
    const newBlock = content.getBlockAfter("ag6qs");

    expect(newBlock.getType()).to.be.equal("unstyled");
  });

  it("reset inlineStyle in new block if resetStyle is true", function() {
    const blockKey = "ag6qs";
    replaceSelection(
      {anchorOffset: 12, focusOffset: 12},
      this.wrapperWithReset,
      blockKey
    );

    const editor = this.wrapperWithReset.find(MegadraftEditor);

    editor.node.handleReturn({shiftKey:false});

    const editorState = this.onChange.args[0][0];
    const inlineStyle = editorState.getCurrentInlineStyle();

    expect(inlineStyle.count()).to.be.equal(0);
  });

  it("reset inlineStyles if in blocksWithoutStyleReset", function() {
    const blockKey = "bqjdr";
    replaceSelection(
      {anchorOffset: 14, focusOffset: 14},
      this.wrapperWithReset,
      blockKey
    );

    const editor = this.wrapperWithReset.find(MegadraftEditor);

    editor.node.handleReturn({shiftKey:false});

    const editorState = this.onChange.args[0][0];
    const inlineStyle = editorState.getCurrentInlineStyle();

    expect(inlineStyle.count()).to.be.equal(0);
  });

  it("reset style should not change list type", function() {
    const blockKey = "bqjdr";
    replaceSelection(
      {anchorOffset: 14, focusOffset: 14},
      this.wrapperWithReset,
      blockKey
    );

    const editor = this.wrapperWithReset.find(MegadraftEditor);

    editor.node.handleReturn({shiftKey:false});

    const content = this.onChange.args[0][0].getCurrentContent();
    const newBlock = content.getBlockAfter("bqjdr");

    expect(newBlock.type).to.be.equal("ordered-list-item");
  });

  it("should not reset style if resetStyle is false", function() {
    const blockKey = "ag6qs";
    replaceSelection(
      {anchorOffset: 12, focusOffset: 12},
      this.wrapperWithoutReset,
      blockKey
    );

    const editor = this.wrapperWithoutReset.find(MegadraftEditor);

    expect(editor.node.handleReturn({shiftKey:false})).to.be.equal(false);
  });

  describe("mediaBlockRenderer", function () {
    it("ignores non-atomic blocks", function() {
      const block = {getType: function() {return "metal";}};
      const result = this.component.mediaBlockRenderer(block);
      expect(result).to.be.null;
    });

    it("returns media renderer for registered plugin", function() {
      const block = new FakeAtomicBlock("image");
      const result = this.component.mediaBlockRenderer(block);

      expect(result).to.deep.equal({
        "component": Media,
        "editable": false,
        "props": {
          "plugin": image,
          "onChange": this.component.onChange,
          "editorState": this.editorState,
          "setReadOnly": this.component.setReadOnly,
          "getReadOnly": this.component.getReadOnly,
          "setInitialReadOnly": this.component.setInitialReadOnly,
          "getInitialReadOnly": this.component.getInitialReadOnly,
        }
      });
    });

    it("returns media renderer with fallback for unregistered plugin", function () {
      const block = new FakeAtomicBlock("unregistered");
      const result = this.component.mediaBlockRenderer(block);

      expect(result).to.deep.equal({
        "component": Media,
        "editable": false,
        "props": {
          "plugin": NotFoundPlugin,
          "onChange": this.component.onChange,
          "editorState": this.editorState,
          "setReadOnly": this.component.setReadOnly,
          "getReadOnly": this.component.getReadOnly,
          "setInitialReadOnly": this.component.setInitialReadOnly,
          "getInitialReadOnly": this.component.getInitialReadOnly,
        }
      });
    });

    it("returns media renderer with plugin from custom fallback", function () {
      const customFallbackPlugin = {
        blockComponent: (props) => <pre>{props.data.type}</pre>
      };
      this.wrapper.setProps({handleBlockNotFound: () => customFallbackPlugin});

      const block = new FakeAtomicBlock("unregistered");
      const result = this.component.mediaBlockRenderer(block);

      expect(result).to.deep.equal({
        "component": Media,
        "editable": false,
        "props": {
          "plugin": customFallbackPlugin,
          "onChange": this.component.onChange,
          "editorState": this.editorState,
          "setReadOnly": this.component.setReadOnly,
          "getReadOnly": this.component.getReadOnly,
          "setInitialReadOnly": this.component.setInitialReadOnly,
          "getInitialReadOnly": this.component.getInitialReadOnly,
        }
      });
    });

    it("ignores empty plugin from custom fallback", function () {
      this.wrapper.setProps({handleBlockNotFound: () => null});

      const block = new FakeAtomicBlock("unregistered");
      const result = this.component.mediaBlockRenderer(block);

      expect(result).to.equal(null);
    });
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

  it("is capable of inserting soft line breaks", function() {
    this.component.handleReturn({shiftKey: true});

    const content = this.onChange.args[0][0].getCurrentContent();

    const text = content.getFirstBlock().getText();

    expect(text).to.be.equal("\nHello World!");
  });

  it("does not insert soft line breaks if option set to false", function () {
    const wrapper = mount(
      <MegadraftEditor
        editorState={this.editorState}
        onChange={this.onChange}
        softNewLines={false} />
    );
    const component = wrapper.get(0);
    expect(component.handleReturn({shiftKey: true})).to.be.equal(false);
  });

  it("is capable of adding a new block when try to add a soft break before an exist one", function() {
    const SOFT_BREAK_ON_BEGINING = {
      "entityMap": {},
      "blocks": [
        {
          "key": "ag6qs",
          "text": "\nHello World!",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": []
        }
      ]
    };

    kba = sinon.spy();
    const keyBindings = [
      {name: "save", isKeyBound: (e) => {return e.keyCode === 83 && e.ctrlKey;}, action: kba}
    ];

    this.editorState = editorStateFromRaw(SOFT_BREAK_ON_BEGINING);

    this.wrapper = mount(
      <MegadraftEditor
        editorState={this.editorState}
        onChange={this.onChange}
        keyBindings={keyBindings}/>
    );
    this.component = this.wrapper.get(0);

    const addedASoftBreak = this.component.handleReturn({shiftKey: true});

    expect(addedASoftBreak).to.be.false;
  });

  it("is capable of adding a new block when try to add a soft break after an exist one", function() {
    const SOFT_BREAK_ON_END = {
      "entityMap": {},
      "blocks": [
        {
          "key": "ag6qs",
          "text": "Hello World!\n",
          "type": "unstyled",
          "depth": 0,
          "inlineStyleRanges": [],
          "entityRanges": []
        }
      ]
    };

    kba = sinon.spy();
    const keyBindings = [
      {name: "save", isKeyBound: (e) => {return e.keyCode === 83 && e.ctrlKey;}, action: kba}
    ];

    this.editorState = EditorState.moveSelectionToEnd(editorStateFromRaw(SOFT_BREAK_ON_END));

    this.wrapper = mount(
      <MegadraftEditor
        editorState={this.editorState}
        onChange={this.onChange}
        keyBindings={keyBindings}/>
    );

    this.component = this.wrapper.get(0);

    const addedASoftBreak = this.component.handleReturn({shiftKey: true});

    expect(addedASoftBreak).to.be.false;
  });

  it("recognizes external key binding", function() {
    const defaultKeyBinding = {keyCode: 66, ctrlKey: true};
    expect(this.component.externalKeyBindings(defaultKeyBinding)).to.equal("bold");

    const unknownKeyBinding = {keyCode: 70, ctrlKey: true};
    expect(this.component.externalKeyBindings(unknownKeyBinding)).to.not.exist;

    const externalKeyBinding = {keyCode: 83, ctrlKey: true};
    expect(this.component.externalKeyBindings(externalKeyBinding)).to.equal("save");
  });

  it("handles external commands", function() {
    const defaultCommand = "bold";
    expect(this.component.handleKeyCommand(defaultCommand)).to.be.true;

    const unknownCommand = "foo";
    expect(this.component.handleKeyCommand(unknownCommand)).to.be.false;

    const externalCommand = "save";
    expect(this.component.handleKeyCommand(externalCommand)).to.be.true;
    expect(kba).to.have.been.called;
  });

  it("renders only valid plugins", function() {
    console.warn = sinon.spy();

    const invalidPlugin = {
      buttonComponent: {},
      blockComponent: {}
    };

    const wrapper = mount(
      <MegadraftEditor
        editorState={this.editorState}
        onChange={this.onChange}
        plugins={[image, invalidPlugin]} />
    );
    const sidebar = wrapper.find(Sidebar);
    expect(sidebar.prop("plugins")).to.have.length(1);
  });

  it("shows warning for missing `type` field", function() {
    console.warn = sinon.spy();

    const plugin = {
      buttonComponent: {},
      blockComponent: {}
    };
    const plugins = [plugin];

    mount(
      <MegadraftEditor
        editorState={this.editorState}
        onChange={this.onChange}
        plugins={plugins} />
    );

    expect(console.warn.getCall(0).args[0]).to.equal(
      "Plugin: Missing `type` field. Details: "
    );
  });

  it("renders default sidebar if sidebarRendererFn not provided", function() {
    const sidebar = this.wrapper.find(Sidebar);
    expect(sidebar).to.have.length(1);
  });

  it("passes required props to default sidebar", function() {
    const sidebar = this.wrapper.find(Sidebar);
    expect(sidebar.prop("plugins")).to.equal(this.component.plugins);
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
      plugins: component.plugins,
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
    const renderCustomSidebar = function(plugins, editorState) {
      return <MyCustomSidebar plugins={plugins} editorState={editorState}/>;
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
