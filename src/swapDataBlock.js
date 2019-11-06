/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import { EditorState } from "draft-js";

const swapBlocks = ({ currentKey, targetKey, editorState }) => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const blockMap = contentState.getBlockMap();
  const keySeq = blockMap.keySeq();
  const getIndex = key => keySeq.findIndex(k => k === key);
  const insertBlock = (target, key, val) => {
    const swapEntries = (map, targetKey, key, val) =>
      map.mapEntries(([k, v]) =>
        k === targetKey
          ? [key, val]
          : k === key
          ? [targetKey, map.get(targetKey)]
          : [k, v]
      );

    const getListItemKeys = startItemKey => {
      const listItemKeys = [];
      const startIndex = getIndex(startItemKey);
      const currentIndex = getIndex(key);
      const modifier = currentIndex < startIndex ? 1 : -1;

      for (
        let i = startIndex, itemKey = target;
        itemKey &&
        blockMap
          .get(itemKey)
          .get("type")
          .includes("-list-item");
        i += modifier, itemKey = keySeq.get(i)
      ) {
        listItemKeys.push(itemKey);
      }

      return listItemKeys;
    };

    if (target) {
      if (val.get("type").includes("-list-item")) {
        const temp = key;
        key = target;
        val = blockMap.get(target);
        target = temp;
      }

      const targets = blockMap
        .get(target)
        .get("type")
        .includes("-list-item")
        ? getListItemKeys(target)
        : [target];

      return targets.reduce(
        (newBlockMap, targetKey) =>
          swapEntries(newBlockMap, targetKey, key, val),
        blockMap
      );
    }

    return blockMap;
  };

  const newBlocks = insertBlock(
    targetKey,
    currentKey,
    contentState.getBlockForKey(currentKey)
  );
  const newContentState = contentState.merge({
    blockMap: newBlocks,
    selectionAfter: selectionState.merge({
      hasFocus: true
    })
  });

  return EditorState.push(editorState, newContentState, "move-block");
};

const swap = ({ getTargetKeyFn, editorState, currentKey }) => {
  const contentState = editorState.getCurrentContent();
  const targetKey = contentState[getTargetKeyFn](currentKey);

  return swapBlocks({ currentKey, targetKey, editorState });
};

export const swapDataUp = ({ editorState, currentKey }) =>
  swap({
    getTargetKeyFn: "getKeyBefore",
    editorState,
    currentKey
  });

export const swapDataDown = ({ editorState, currentKey }) =>
  swap({
    getTargetKeyFn: "getKeyAfter",
    editorState,
    currentKey
  });
