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
import * as MegadraftPlugin from "./components/plugin";
import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";
import * as utils from "./utils";

const Megadraft = {
  DraftJS: DraftJS,
  editorStateFromRaw: utils.editorStateFromRaw,
  editorStateToJSON: utils.editorStateToJSON,
  insertDataBlock: insertDataBlock,
  Media: Media,
  MegadraftEditor: MegadraftEditor,
  MegadraftIcons: MegadraftIcons,
  MegadraftMediaMessage: MegadraftMediaMessage,
  MegadraftPlugin: MegadraftPlugin,
  Sidebar: Sidebar,
  Toolbar: Toolbar
};

module.exports = Megadraft;
