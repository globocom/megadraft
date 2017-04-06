/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import DraftJS from "draft-js";

import insertDataBlock from "./insertDataBlock";
import Media from "./components/Media";
import MegadraftEditor from "./components/MegadraftEditor";
import MegadraftIcons from "./icons";
import MegadraftMediaMessage from "./components/MediaMessage";
import * as MegadraftAtomicBlock from "./components/atomicBlock";
import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";
import * as utils from "./utils";

const Megadraft = {
  DraftJS,
  insertDataBlock,
  Media,
  MegadraftAtomicBlock,
  MegadraftEditor,
  MegadraftIcons,
  MegadraftMediaMessage,
  Sidebar,
  Toolbar,
  editorStateFromRaw: utils.editorStateFromRaw,
  editorStateToJSON: utils.editorStateToJSON,
  createTypeStrategy: utils.createTypeStrategy
};

module.exports = Megadraft;
