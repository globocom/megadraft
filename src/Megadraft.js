/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import DraftJS from "draft-js";

import Media from "./components/Media";
import MegadraftMediaMessage from "./components/MediaMessage";
import MegadraftEditor from "./components/MegadraftEditor";
import * as MegadraftPlugin from "./components/plugin";
import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";
import MegadraftIcons from "./icons";
import insertDataBlock from "./insertDataBlock";
import * as utils from "./utils";

const Megadraft = {
  DraftJS,
  insertDataBlock,
  Media,
  MegadraftEditor,
  MegadraftIcons,
  MegadraftMediaMessage,
  MegadraftPlugin,
  Sidebar,
  Toolbar,
  editorStateFromRaw: utils.editorStateFromRaw,
  editorStateToJSON: utils.editorStateToJSON,
  createTypeStrategy: utils.createTypeStrategy
};

module.exports = Megadraft;
