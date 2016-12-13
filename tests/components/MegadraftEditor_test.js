/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import chai from "chai";
import sinon from "sinon";
import {Editor} from "draft-js";
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

    this.onChange = sinon.spy();
    this.editorState = editorStateFromRaw(INITIAL_CONTENT);
    this.wrapper = mount(
      <MegadraftEditor
        editorState={this.editorState}
        onChange={this.onChange}
        keyBindings={keyBindings}/>
    );
    this.component = this.wrapper.get(0);
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
          "setReadOnly": this.component.setReadOnly
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
          "setReadOnly": this.component.setReadOnly
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
          "setReadOnly": this.component.setReadOnly
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
    expect(this.onChange.called).to.be.equal(false);
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
        sidebarRendererFn={renderCustomSidebar} />
    );

    const component = wrapper.get(0);
    const expectedProps = {
      plugins: component.plugins,
      onChange: component.onChange,
      editorState: this.editorState,
      readOnly: false
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
    // editor is undefined :-/
    //expect(toolbar.prop("editor")).to.equal(this.component.refs.editor);
    expect(toolbar.prop("actions")).to.equal(this.component.actions);
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
    expect(toolbar.prop("actions")).to.equal(this.component.actions);
    expect(toolbar.prop("entityInputs")).to.equal(this.component.entityInputs);
    expect(toolbar.prop("editorState")).to.equal(this.editorState);
    expect(toolbar.prop("readOnly")).to.equal(false);
  });
});
