/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

export DraftJS from "draft-js";

export * from "./utils";
export * as MegadraftPlugin from "./components/plugin";

export Media from "./components/Media";
export MegadraftIcons from "./icons";
export MegadraftMediaMessage from "./components/MediaMessage";
export Sidebar from "./components/Sidebar";
export Toolbar from "./components/Toolbar";

import MegadraftEditor from "./components/MegadraftEditor";

export default MegadraftEditor;
