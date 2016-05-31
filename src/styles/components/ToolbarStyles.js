/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

export default {
  wrapper: {
    background: "yellow",
    height: 0,
    position: "absolute"
  },

  base: {
    backgroundColor: "#181818",
    borderRadius: "4px",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.4)",
    left: "-50%",
    position: "relative"
  },

  arrow: {
    display: "inline-block",
    top: "100%",
    left: "50%",
    height: 0,
    width: 0,
    position: "absolute",
    pointerEvents: "none",
    borderWidth: "8px",
    borderStyle: "solid",
    borderColor: "#181818 transparent transparent",
    marginLeft: "-8px"
  },

  list: {
    padding: "0 8px",
    margin: 0,
    whiteSpace: "nowrap"
  }
};
