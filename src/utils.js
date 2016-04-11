/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * Copyright (c) 2016, Andrew Coelho <info@andrewcoelho.com>
 *
 * License: MIT
 */

import {
  convertToRaw,
  convertFromRaw,
  EditorState,
  ContentState,
  getVisibleSelectionRect} from "draft-js";

export function editorStateToJSON(editorState) {
  if (editorState) {
    const content = editorState.getCurrentContent();
    return JSON.stringify(convertToRaw(content), null, 2);
  }
}

export function editorStateFromRaw(rawContent) {
  const blocks = convertFromRaw(rawContent);
  const content = ContentState.createFromBlockArray(blocks);
  return EditorState.createWithContent(content);
}

export function getSelectionRange() {
  const selection = window.getSelection();
  if (selection.rangeCount === 0) {
    return null;
  }
  return selection.getRangeAt(0);
}

export function getSelectedBlockElement(range) {
  let node = range.startContainer;
  do {
    const nodeIsDataBlock = node.getAttribute
                            ? node.getAttribute("data-block")
                            : null;
    if (nodeIsDataBlock) {
      return node;
    }
    node = node.parentNode;
  } while (node !== null);
  return null;
}

export function getSelectionCoords(selectionRange, editor, toolbar) {
  const editorBounds = editor.getBoundingClientRect();
  const rangeBounds = getVisibleSelectionRect(window);

  const rangeWidth = rangeBounds.right - rangeBounds.left;

  const toolbarWidth = toolbar.offsetWidth;
  const toolbarHeight = toolbar.offsetHeight;
  // const rangeHeight = rangeBounds.bottom - rangeBounds.top;
  const offsetLeft = (rangeBounds.left - editorBounds.left)
            + (rangeWidth / 2)
            - (toolbarWidth / 2);
  const offsetTop = rangeBounds.top - editorBounds.top - (toolbarHeight + 14);
  return { offsetLeft, offsetTop };
}
