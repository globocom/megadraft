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
  getVisibleSelectionRect,
  Entity,
  AtomicBlockUtils} from "draft-js";

import decorator from "./decorator";


export function editorStateToJSON(editorState) {
  if (editorState) {
    const content = editorState.getCurrentContent();
    return JSON.stringify(convertToRaw(content), null, 2);
  }
}

export function editorStateFromRaw(rawContent) {
  if (rawContent) {
    const content = convertFromRaw(rawContent);
    return EditorState.createWithContent(content, decorator);
  } else {
    return EditorState.createEmpty(decorator);
  }
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

export function getSelectionCoords(editor, toolbar) {
  const editorBounds = editor.getBoundingClientRect();
  const rangeBounds = getVisibleSelectionRect(window);

  if (!rangeBounds) {
    return null;
  }

  const rangeWidth = rangeBounds.right - rangeBounds.left;

  const toolbarHeight = toolbar.offsetHeight;
  // const rangeHeight = rangeBounds.bottom - rangeBounds.top;
  const offsetLeft = (rangeBounds.left - editorBounds.left)
            + (rangeWidth / 2);
  const offsetTop = rangeBounds.top - editorBounds.top - (toolbarHeight + 14);
  return { offsetLeft, offsetTop };
}

export function insertMediaBlock (editorState, blockType, data) {
  const entityKey = Entity.create(blockType, "IMMUTABLE", data);

  return AtomicBlockUtils.insertAtomicBlock(
    editorState,
    entityKey,
    "🍺"
  );
}
