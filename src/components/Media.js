/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { useMemo, useCallback } from "react";
import { EditorState, SelectionState, Modifier } from "draft-js";

import ErrorBoundary from "./ErrorBoundary";
import MediaWrapper from "./MediaWrapper";

const Media = ({ blockProps, block, ...rest }) => {
  const { plugin, setInitialReadOnly, setReadOnly, i18n } = blockProps;

  const Block = useMemo(() => {
    return plugin.blockComponent;
  }, [plugin]);

  const data = useMemo(() => {
    return block.getData().toJS();
  }, [block]);

  const remove = useCallback(() => {
    const editorState = blockProps.getEditorState();
    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const keyAfter = content.getKeyAfter(block.key);
    const blockMap = content.getBlockMap().delete(block.key);
    const withoutAtomicBlock = content.merge({
      blockMap,
      selectionAfter: selection
    });

    const newState = EditorState.push(
      editorState,
      withoutAtomicBlock,
      "remove-range"
    );

    // if this is not the last block
    if (keyAfter) {
      const newSelection = new SelectionState({
        anchorKey: keyAfter,
        anchorOffset: 0,
        focusKey: keyAfter,
        focusOffset: block.getLength()
      });
      const newEditorState = EditorState.forceSelection(newState, newSelection);
      blockProps.onChange(newEditorState);
    } else {
      blockProps.onChange(newState);
    }
  }, [blockProps, block]);

  const updateData = useCallback(
    data => {
      const editorState = blockProps.getEditorState();
      const content = editorState.getCurrentContent();
      const selection = new SelectionState({
        anchorKey: block.key,
        anchorOffset: 0,
        focusKey: block.key,
        focusOffset: block.getLength()
      });

      const newContentState = Modifier.mergeBlockData(content, selection, data);
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "change-block-data"
      );

      blockProps.onChange(newEditorState);
    },
    [block, blockProps]
  );

  return (
    <ErrorBoundary
      {...{ blockProps, block, ...rest }}
      i18n={i18n}
      data={data}
      container={{ updateData, remove }}
    >
      <MediaWrapper
        i18n={i18n}
        setInitialReadOnly={setInitialReadOnly}
        setReadOnly={setReadOnly}
      >
        <Block
          i18n={i18n}
          data={data}
          container={{ updateData, remove }}
          blockProps={blockProps}
        />
      </MediaWrapper>
    </ErrorBoundary>
  );
};

export default Media;
