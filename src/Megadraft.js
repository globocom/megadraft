/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

export Draft from "draft-js";

export MegadraftIcons from "./icons";
export * as MegadraftPlugin from "./components/plugin";
export Toolbar from "./components/Toolbar";
export Sidebar from "./components/Sidebar";
export Media from "./components/Media";
export DEFAULT_PLUGINS from "./plugins/default";
export DEFAULT_ACTIONS from "./actions/default";
export MediaMessage from "./components/MediaMessage";

import MegadraftEditor from "./components/MegadraftEditor";

export default MegadraftEditor;
