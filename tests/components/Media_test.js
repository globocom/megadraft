/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import {mount} from "enzyme";

import Media from "../../src/components/Media";
import {editorStateFromRaw} from "../../src/utils";
import DEFAULT_PLUGINS from "../../src/plugins/default";

describe("Media Component", () => {
  let testContext;

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
    testContext.blockProps.getEditorState = () => testContext.editorState;

    const currentContent = testContext.blockProps.editorState.getCurrentContent();
    testContext.block = currentContent.getBlockForKey("9vgd");

    testContext.wrapper = mount(
      <Media blockProps={testContext.blockProps} block={testContext.block} />
    );
    testContext.component = testContext.wrapper.instance();
  });

  it("renders without problems", () => {
    expect(testContext.wrapper).toHaveLength(1);
  });

  it("updates data and correct change-type enum", () => {
    let data = testContext.block.getData();

    expect(data.get("display")).toEqual("medium");

    testContext.component.updateData({display: "big"});

    const editor = testContext.blockProps.onChange.mock.calls[0][0].toJS();
    const lastChangeType = editor.lastChangeType;
    // checking if the last change type is the correct enum
    expect(lastChangeType).toEqual("change-block-data");

    const content = editor.currentContent;
    const nextData = content.blockMap["9vgd"].data;
    expect(nextData.display).toEqual("big");
  });

  it("refreshes editor state", () => {
    testContext.component.updateData({display: "big"});
    expect(testContext.blockProps.onChange).toHaveBeenCalled();
  });

  it("removes media component", () => {
    testContext.component.remove();

    const editorState = testContext.blockProps.onChange.mock.calls[0][0];
    const currentContent = editorState.getCurrentContent();
    const block = currentContent.getBlockForKey("9vgd");

    expect(block).toBeUndefined();
  });
});
