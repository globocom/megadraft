/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import { Component } from "react";
import { EditorState, SelectionState } from "draft-js";
import { mount } from "enzyme";

import Toolbar from "../../src/components/Toolbar";
import ToolbarItem from "../../src/components/ToolbarItem";

import { editorStateFromRaw } from "../../src/utils";
import Separator from "../../src/components/Separator";
import LinkInput from "../../src/entity_inputs/LinkInput";
import i18nConfig from "../../src/i18n";

export default class ToolbarWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
    this.onChange = this.onChange.bind(this);
  }

  onChange(editorState) {
    this.setState({ editorState: editorState });
  }

  render() {
    return (
      <div ref="editor">
        <Toolbar
          i18n={i18nConfig["en-US"]}
          ref="toolbar"
          editor={this.refs.editor}
          editorState={this.state.editorState}
          actions={this.props.actions}
          readOnly={this.props.readOnly}
          entityInputs={this.props.entityInputs}
          onChange={this.onChange}
          editorHasFocus={true}
          shouldDisplayToolbarFn={this.props.shouldDisplayToolbarFn}
        />
      </div>
    );
  }
}

const draft = require("draft-js");

draft.getVisibleSelectionRect = () => {
  return {
    top: 0,
    left: 100,
    right: 100
  };
};

const replaceSelection = (newSelection, wrapper) => {
  const selectionState = SelectionState.createEmpty("ag6qs");
  const updatedSelection = selectionState.merge(newSelection);
  const oldState = wrapper.state("editorState");

  const editorState = EditorState.forceSelection(oldState, updatedSelection);

  wrapper.setState({ editorState: editorState });
};

const FileEntityInput = props => <LinkInput {...props} />;
const LinkEntityInput = props => <LinkInput {...props} />;

describe("Toolbar Component", () => {
  let testContext;

  beforeEach(() => {
    const INITIAL_CONTENT = {
      entityMap: {},
      blocks: [
        {
          key: "ag6qs",
          text:
            "Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World! Hello World!",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: []
        }
      ]
    };

    testContext = {};
    testContext.clock = jest.useFakeTimers();
    testContext.actions = [
      { type: "inline", label: "B", style: "BOLD", icon: "svg" },
      { type: "separator" },
      { type: "block", label: "H2", style: "header-two", icon: "svg" },
      {
        type: "entity",
        label: "Link",
        style: "link",
        entity: "LINK",
        icon: "svg"
      },
      {
        type: "entity",
        label: "File",
        style: "link",
        entity: "FILE_LINK",
        icon: "svg"
      },
      { type: "custom", icon: "svg", action: jest.fn() },
      { type: "custom", icon: "svg", action: jest.fn(), active: () => true },
      { type: "custom", icon: "svg", action: jest.fn(), active: () => false }
    ];

    testContext.entityInputs = {
      LINK: LinkEntityInput,
      FILE_LINK: FileEntityInput
    };

    testContext.editorState = editorStateFromRaw(INITIAL_CONTENT);
    testContext.wrapper = mount(
      <ToolbarWrapper
        editorState={testContext.editorState}
        actions={testContext.actions}
        entityInputs={testContext.entityInputs}
        shouldDisplayToolbarFn={() => true}
      />
    );
  });

  afterEach(() => {
    testContext.clock.clearAllTimers();
  });

  describe("Toolbar", () => {
    it("renders toolbar items from actions", () => {
      const items = testContext.wrapper.find(ToolbarItem);
      expect(items).toHaveLength(testContext.actions.length);
    });

    it("renders separator", () => {
      const items = testContext.wrapper.find(Separator);
      expect(items).toHaveLength(1);
    });

    it("renders null when readOnly is set and shouldDisplayToolbarFn returns true", () => {
      const wrapper = mount(
        <ToolbarWrapper
          readOnly
          editorState={testContext.editorState}
          actions={testContext.actions}
          shouldDisplayToolbarFn={() => true}
        />
      );
      const toolbar = wrapper.find(Toolbar);
      expect(toolbar.html()).toBeNull();
    });

    it("renders as null when readOnly is not set and shouldDisplayToolbarFn returns false", () => {
      const wrapper = mount(
        <ToolbarWrapper
          editorState={testContext.editorState}
          actions={testContext.actions}
          shouldDisplayToolbarFn={() => false}
        />
      );
      const toolbar = wrapper.find(Toolbar);
      expect(toolbar.html()).toBeNull();
    });

    describe("actions", () => {
      it("toggles inline style", () => {
        const items = testContext.wrapper.find(ToolbarItem);
        const boldItem = items.at(0);
        const button = boldItem.find("button");

        button.simulate("click");

        const current = testContext.wrapper
          .state("editorState")
          .getCurrentInlineStyle();
        expect(current.has("BOLD")).toBeTruthy();
      });

      it("toggles block style", () => {
        const items = testContext.wrapper.find(ToolbarItem);
        const titleItem = items.at(2);
        const button = titleItem.find("button");

        button.simulate("click");

        const editorState = testContext.wrapper.state("editorState");
        const selection = editorState.getSelection();
        const current = editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType();

        expect(current).toEqual("header-two");
      });

      it("triggers custom action", () => {
        const items = testContext.wrapper.find(ToolbarItem);
        const customItem = items.at(5);
        const button = customItem.find("button");
        const editorState = testContext.wrapper.state("editorState");

        button.simulate("click");

        expect(testContext.actions[5].action).toHaveBeenCalledWith(
          editorState,
          testContext.wrapper.find(Toolbar).props().onChange
        );
      });

      it("should not hide toolbar when state changes", () => {
        const wrapper = mount(
          <ToolbarWrapper
            editorState={testContext.editorState}
            actions={testContext.actions}
            entityInputs={testContext.entityInputs}
          />
        );
        replaceSelection(
          {
            focusOffset: 0,
            anchorOffset: 5
          },
          wrapper
        );
        wrapper.update();

        const toolbar = wrapper.find(Toolbar);
        const nextProps = { editorState: { getCurrentContent: () => "blah" } };
        toolbar.instance().UNSAFE_componentWillReceiveProps(nextProps);
        expect(toolbar.instance().state.show).toBeTruthy();
      });

      it("should call preventDefault when active a state", () => {
        const event = {
          preventDefault: () => { },
          target: { localName: "blah" }
        };
        jest.spyOn(event, "preventDefault");

        const wrapper = testContext.wrapper.find(".toolbar__wrapper");
        wrapper.simulate("mouseDown", Object.assign(jest.fn(), event));
        expect(event.preventDefault).toHaveBeenCalled();
      });

      it("should change icon color to blue when active state is true", () => {
        const items = testContext.wrapper.find(ToolbarItem);
        const toolbarItem = items.at(5).find("li");
        expect(toolbarItem.hasClass("toolbar__item--active")).toBeFalsy();
      });

      it("should not change icon color when there is no active handle", () => {
        const items = testContext.wrapper.find(ToolbarItem);
        const toolbarItem = items.at(6).find("li");
        expect(toolbarItem.hasClass("toolbar__item--active")).toBeTruthy();
      });

      it("should not change icon color to blue when active state is false", () => {
        const items = testContext.wrapper.find(ToolbarItem);
        const toolbarItem = items.at(7).find("li");
        expect(toolbarItem.hasClass("toolbar__item--active")).toBeFalsy();
      });
    });

    it("starts hidden when using default shouldDisplayToolbarFn", () => {
      const wrapper = mount(
        <ToolbarWrapper
          editorState={testContext.editorState}
          actions={testContext.actions}
          entityInputs={testContext.entityInputs}
        />
      );
      const toolbar = wrapper.find(Toolbar);
      expect(toolbar.html()).toBeNull();
    });

    it("shows after selection when using default shouldDisplayToolbarFn", () => {
      const wrapper = mount(
        <ToolbarWrapper
          editorState={testContext.editorState}
          actions={testContext.actions}
          entityInputs={testContext.entityInputs}
        />
      );

      replaceSelection(
        {
          focusOffset: 0,
          anchorOffset: 5
        },
        wrapper
      );

      wrapper.update();

      const toolbar = wrapper.find(Toolbar);
      const toolbarWrapper = wrapper.find(".toolbar");
      expect(toolbar.html()).not.toBeNull();
      expect(toolbarWrapper.hasClass("toolbar--open")).toBeTruthy();
    });

    it("should hide after deselection when using default shouldDisplayToolbarFn", () => {
      const wrapper = mount(
        <ToolbarWrapper
          editorState={testContext.editorState}
          actions={testContext.actions}
          entityInputs={testContext.entityInputs}
        />
      );

      replaceSelection(
        {
          focusOffset: 0,
          anchorOffset: 5
        },
        wrapper
      );

      wrapper.update();

      replaceSelection(
        {
          focusOffset: 0,
          anchorOffset: 0
        },
        wrapper
      );

      wrapper.update();

      const toolbar = wrapper.find(Toolbar);
      expect(toolbar.html()).toBeNull();
    });

    it("should center toolbar above the selection", () => {
      replaceSelection(
        {
          focusOffset: 20,
          anchorOffset: 10
        },
        testContext.wrapper
      );

      testContext.wrapper.update();

      const toolbarWrapper = testContext.wrapper.find(".toolbar");
      const toolbarWrapperNode = toolbarWrapper.getDOMNode();
      testContext.clock.advanceTimersByTime(32);

      expect(toolbarWrapperNode.style.top).toEqual("-14px");
      expect(toolbarWrapperNode.style.left).toEqual("100px");
    });

    it("should not throw an exception if readOnly = true while there is an exception", () => {
      replaceSelection(
        {
          focusOffset: 0,
          anchorOffset: 5
        },
        testContext.wrapper
      );

      testContext.wrapper.update();
      testContext.wrapper.setProps({ readOnly: true });
    });

    describe("entity inputs", () => {
      beforeEach(() => {
        testContext.linkButton = () =>
          testContext.wrapper
            .find(ToolbarItem)
            .at(3)
            .find("button");
        testContext.fileButton = () =>
          testContext.wrapper
            .find(ToolbarItem)
            .at(4)
            .find("button");
        // select
        replaceSelection(
          {
            anchorOffset: 0,
            focusOffset: 5
          },
          testContext.wrapper
        );
      });

      it("starts with showing no entity input", () => {
        const toolbarWrapper = testContext.wrapper.find(".toolbar");
        expect(toolbarWrapper.find(LinkEntityInput)).toHaveLength(0);
        expect(toolbarWrapper.find(FileEntityInput)).toHaveLength(0);
      });

      it("shows the first entity input on click on the corresponding button", () => {
        testContext.linkButton().simulate("click");
        const toolbarWrapper = testContext.wrapper.find(".toolbar");
        expect(toolbarWrapper.find(LinkEntityInput)).toHaveLength(1);
        expect(toolbarWrapper.find(FileEntityInput)).toHaveLength(0);
      });

      it("shows second entity input on click on the corresponding button", () => {
        testContext.fileButton().simulate("click");
        const toolbarWrapper = testContext.wrapper.find(".toolbar");
        expect(toolbarWrapper.find(LinkEntityInput)).toHaveLength(0);
        expect(toolbarWrapper.find(FileEntityInput)).toHaveLength(1);
      });

      it("(integration) LinkInput sets a entity on the current selection ", () => {
        testContext.linkButton().simulate("click");
        const input = testContext.wrapper
          .find(LinkEntityInput)
          .find(".toolbar__input");
        const inputNode = input.getDOMNode();
        inputNode.value = "http://www.globo.com";
        input.simulate("change");
        input.simulate("keyDown", { key: "Enter", keyCode: 13, which: 13 });

        const contentState = testContext.wrapper
          .state("editorState")
          .getCurrentContent();
        const blockWithLinkAtBeginning = contentState.getBlockForKey("ag6qs");
        const linkKey = blockWithLinkAtBeginning.getEntityAt(0);
        const linkInstance = contentState.getEntity(linkKey);
        const { url } = linkInstance.getData();

        expect(url).toEqual("http://www.globo.com");
      });

      it("(integration) Should not call preventDefault when is a input", () => {
        const event = {
          preventDefault: () => { },
          target: { localName: "input" }
        };
        jest.spyOn(event, "preventDefault");

        const wrapper = testContext.wrapper.find(".toolbar__wrapper");
        wrapper.simulate("mouseDown", Object.assign(jest.fn(), event));
        expect(event.preventDefault).not.toHaveBeenCalled();
      });

      it("(integration) Should not call preventDefault when is a select", () => {
        const event = {
          preventDefault: () => { },
          target: { localName: "select" }
        };
        jest.spyOn(event, "preventDefault");

        const wrapper = testContext.wrapper.find(".toolbar__wrapper");
        wrapper.simulate("mouseDown", Object.assign(jest.fn(), event));
        expect(event.preventDefault).not.toHaveBeenCalled();
      });

      it("(integration) LinkInput should remove an entity when ", () => {
        testContext.linkButton().simulate("click");

        const input = testContext.wrapper
          .find(LinkEntityInput)
          .find(".toolbar__input");
        const inputNode = input.getDOMNode();

        inputNode.value = "http://www.globo.com";
        input.simulate("change");
        input.simulate("keyDown", { key: "Enter", keyCode: 13, which: 13 });
        // show dialog again
        testContext.linkButton().simulate("click");
        // click on remove
        const removeButton = testContext.wrapper
          .find(LinkEntityInput)
          .find("button");
        removeButton.simulate("click");

        const contentState = testContext.wrapper
          .state("editorState")
          .getCurrentContent();
        const blockWithLinkAtBeginning = contentState.getBlockForKey("ag6qs");
        const linkKey = blockWithLinkAtBeginning.getEntityAt(0);

        expect(linkKey).toBeNull();
      });

      it("(integration) LinkInput should remove a link backwards", () => {
        testContext.linkButton().simulate("click");
        const input = testContext.wrapper
          .find(LinkEntityInput)
          .find(".toolbar__input");
        const inputNode = input.getDOMNode();

        inputNode.value = "www.globo.com";
        input.simulate("change");
        input.simulate("keyDown", { key: "Enter", keyCode: 13, which: 13 });
        // show dialog again
        testContext.linkButton().simulate("click");
        // click on remove
        const removeButton = testContext.wrapper
          .find(LinkEntityInput)
          .find("button");
        removeButton.simulate("click");

        replaceSelection(
          {
            anchorOffset: 5,
            focusOffset: 0,
            isBackward: true
          },
          testContext.wrapper
        );

        testContext.linkButton().simulate("click");
        const contentState = testContext.wrapper
          .state("editorState")
          .getCurrentContent();

        const blockWithLinkAtBeginning = contentState.getBlockForKey("ag6qs");
        const linkKey = blockWithLinkAtBeginning.getEntityAt(0);

        expect(linkKey).toBeNull();
      });
    });
  });
});
