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
  getVisibleSelectionRect} from "draft-js";

import defaultDecorator from "./decorators/defaultDecorator";


export function editorStateToJSON(editorState) {
  if (editorState) {
    const content = editorState.getCurrentContent();
    return JSON.stringify(convertToRaw(content), null, 2);
  }
}

export function editorStateFromRaw(rawContent, decorator = defaultDecorator) {
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

  if (!rangeBounds || !toolbar) {
    return null;
  }

  const rangeWidth = rangeBounds.right - rangeBounds.left;

  const toolbarHeight = toolbar.offsetHeight;
  // const rangeHeight = rangeBounds.bottom - rangeBounds.top;
  const offsetLeft = (rangeBounds.left - editorBounds.left)
            + (rangeWidth / 2);
  const offsetTop = rangeBounds.top - editorBounds.top - (toolbarHeight + 14);
  const offsetBottom = editorBounds.bottom - rangeBounds.top + 14;
  return {offsetLeft, offsetTop, offsetBottom};
}

export function createTypeStrategy(type) {
  return (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === type
        );
      },
      callback
    );
  };
}

/**
 * Returns a wrapper for the given function which cannot be called
 * more often than the given interval. Every time the wrapper is called
 * a timeout gets reset to the interval's number of ms before calling the fn.
 *
 * Keep attention to bind the correct context to the provided funtion using bind() or '::'!
 *
 * @export
 * @param {function} fn The function to execute after the given interval.
 * @param {number} [interval=100] The interval to wait for before calling the wrapped function.
 * @example
 * ```
 * const delayedLog = delayCall(::console.log, 200);
 * delayedLog('hans');
 * delayedLog('heiri');
 * // logs 'heiri' after 200ms, 'hans' won't be logged at all.
 * ```
 * @returns {void}
 */
export function delayCall(fn, interval = 100) {
  let timeout;
  return function (...args) {
    if (timeout) {
      window.clearTimeout(timeout);
    }
    window.setTimeout(() => fn.apply(window, args), interval);
  };
}
