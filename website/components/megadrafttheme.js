/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

// import Spacing from "material-ui/styles/spacing";
// import zIndex from "material-ui/styles/zIndex";
import { grey } from "@material-ui/core/colors";

import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  //   spacing: Spacing,
  //   zIndex: zIndex,
  palette: {
    primary1Color: grey[900],
    accent1Color: grey[900]
  }
});

export default theme;
