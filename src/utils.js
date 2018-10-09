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
  getVisibleSelectionRect
} from "draft-js";

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
    try {
      const nodeIsDataBlock = node.getAttribute
        ? node.getAttribute("data-block")
        : null;
      if (nodeIsDataBlock) {
        return node;
      }
      node = node.parentNode;
    } catch (error) {
      return null;
    }
  } while (node !== null);
  return null;
}

export function getSelectionCoords(editor, toolbar) {
  const editorBounds = editor.getBoundingClientRect();
  const win = editor.ownerDocument.defaultView || window;
  const rangeBounds = getVisibleSelectionRect(win);
  if (!rangeBounds || !toolbar) {
    return null;
  }
  const toolbarHeight = toolbar.offsetHeight;
  const toolbarWidth = toolbar.offsetWidth;

  const minOffsetLeft = 5;
  const minOffsetRight = 5;
  const minOffsetTop = 5;

  const rangeWidth = rangeBounds.right - rangeBounds.left;
  const arrowStyle = {};

  let offsetLeft = rangeBounds.left - editorBounds.left + rangeWidth / 2;
  arrowStyle.left = "50%";
  if (offsetLeft - toolbarWidth / 2 + editorBounds.left < minOffsetLeft) {
    offsetLeft = toolbarWidth / 2 - editorBounds.left + minOffsetLeft;
    arrowStyle.left =
      (rangeBounds.left + rangeBounds.right) / 2 - minOffsetLeft;
  }
  if (
    offsetLeft + toolbarWidth / 2 + editorBounds.left >
    win.innerWidth - minOffsetRight
  ) {
    arrowStyle.left =
      rangeBounds.left -
      (win.innerWidth - minOffsetRight - toolbarWidth) +
      (rangeBounds.right - rangeBounds.left) / 2;
    offsetLeft =
      win.innerWidth - editorBounds.left - toolbarWidth / 2 - minOffsetRight;
  }
  let offsetTop = rangeBounds.top - editorBounds.top - 14;
  arrowStyle.top = "100%";
  if (offsetTop - minOffsetTop - toolbarHeight + editorBounds.top < 0) {
    //Always make sure that, if the range bounds does not fully exists, we keep the current coordinates
    if (rangeBounds.bottom && !Number.isNaN(rangeBounds.bottom)) {
      offsetTop = rangeBounds.bottom - editorBounds.top + toolbarHeight + 14;
      arrowStyle.top = "-14px";
      arrowStyle.transform = "rotate(180deg)";
    }
  }

  return { offsetLeft, offsetTop, arrowStyle };
}

export function createTypeStrategy(type) {
  return (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(character => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === type
      );
    }, callback);
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
  return function(...args) {
    if (timeout) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => fn.apply(window, args), interval);
  };
}
