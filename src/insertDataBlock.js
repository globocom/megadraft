/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule AtomicBlockUtils
 * @typechecks
 * @flow
 */

import Immutable from "immutable";

import {genKey, EditorState, ContentBlock, Modifier, BlockMapBuilder} from "draft-js";

const {
  List,
  Map
} = Immutable;

function insertDataBlock(editorState, data) {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();

  const afterRemoval = Modifier.removeRange(
    contentState,
    selectionState,
    "backward"
  );

  const targetSelection = afterRemoval.getSelectionAfter();
  const afterSplit = Modifier.splitBlock(afterRemoval, targetSelection);
  const insertionTarget = afterSplit.getSelectionAfter();

  const asAtomicBlock = Modifier.setBlockType(
    afterSplit,
    insertionTarget,
    "atomic"
  );

  const block = new ContentBlock({
    key: genKey(),
    type: "atomic",
    text: "",
    characterList: List(),
    data: new Map(data)
  });


  const fragmentArray = [
    block,
    new ContentBlock({
      key: genKey(),
      type: "unstyled",
      text: "",
      characterList: List()
    })
  ];

  const fragment = BlockMapBuilder.createFromArray(fragmentArray);

  const withAtomicBlock = Modifier.replaceWithFragment(
    asAtomicBlock,
    insertionTarget,
    fragment
  );

  const newContent = withAtomicBlock.merge({
    selectionBefore: selectionState,
    selectionAfter: withAtomicBlock.getSelectionAfter().set("hasFocus", true)
  });

  return EditorState.push(editorState, newContent, "insert-fragment");
}

export default insertDataBlock;
