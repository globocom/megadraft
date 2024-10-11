/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import { mount } from "enzyme";
import React from "react";

import Media from "../../src/components/Media";
import i18nConfig from "../../src/i18n";
import DEFAULT_PLUGINS from "../../src/plugins/default";
import { editorStateFromRaw } from "../../src/utils";
import errorPlugin from "../../tests/plugins/error/plugin";

describe("Media Component", () => {
  let testContext;
  let pluginComponent;

  beforeEach(() => {
    const INITIAL_CONTENT = {
      entityMap: {},
      blocks: [
        {
          key: "9vgd",
          text: "",
          type: "atomic",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {
            type: "image",
            src: "images/media.jpg",
            caption: "Picture from StockSnap.io",
            rightsHolder: "By Tim Marshall",
            display: "medium"
          }
        }
      ]
    };

    testContext = {};
    testContext.editorState = editorStateFromRaw(INITIAL_CONTENT);

    testContext.blockProps = {};
    testContext.blockProps.editorState = testContext.editorState;
    testContext.blockProps.plugin = DEFAULT_PLUGINS[0];
    testContext.blockProps.onChange = jest.fn();
    testContext.blockProps.setRea = jest.fn();
    testContext.blockProps.getInitialReadOnly = jest.fn();
    testContext.blockProps.getEditorState = () => testContext.editorState;

    const currentContent = testContext.blockProps.editorState.getCurrentContent();
    testContext.block = currentContent.getBlockForKey("9vgd");

    testContext.renderComponent = props => {
      props = {
        blockProps: testContext.blockProps,
        block: testContext.block
      };
      return mount(<Media {...props} />);
    };

    pluginComponent = testContext.blockProps.plugin.blockComponent;
  });

  it("renders without problems", () => {
    const component = testContext.renderComponent();
    expect(component).toHaveLength(1);
  });

  it("updates data and correct change-type enum", () => {
    const component = testContext.renderComponent();

    const { updateData } = component.find(pluginComponent).props().container;

    let data = testContext.block.getData();

    expect(data.get("display")).toEqual("medium");

    updateData({ display: "big" });

    const editor = testContext.blockProps.onChange.mock.calls[0][0].toJS();
    const lastChangeType = editor.lastChangeType;
    // checking if the last change type is the correct enum
    expect(lastChangeType).toEqual("change-block-data");

    const content = editor.currentContent;
    const nextData = content.blockMap["9vgd"].data;
    expect(nextData.display).toEqual("big");
  });

  it("refreshes editor state", () => {
    const component = testContext.renderComponent();
    const { updateData } = component.find(pluginComponent).props().container;
    updateData({ display: "big" });
    expect(testContext.blockProps.onChange).toHaveBeenCalled();
  });

  it("removes media component", () => {
    const component = testContext.renderComponent();
    const { remove } = component.find(pluginComponent).props().container;
    remove();

    const editorState = testContext.blockProps.onChange.mock.calls[0][0];
    const currentContent = editorState.getCurrentContent();
    const block = currentContent.getBlockForKey("9vgd");

    expect(block).toBeUndefined();
  });

  describe("ErrorBoundary", () => {
    it("renders with problems", () => {
      const blockProps = {};
      blockProps.editorState = testContext.editorState;
      blockProps.plugin = errorPlugin;
      blockProps.i18n = i18nConfig["en-US"];
      blockProps.onChange = jest.fn();
      blockProps.getEditorState = () => testContext.editorState;

      const component = testContext.renderComponent({ blockProps });
      expect(component.find("ErrorBoundary")).toHaveLength(1);
    });
  });
});
