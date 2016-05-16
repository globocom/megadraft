/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

export default {
  wrapper: {
    borderRadius: "2px",
    position: "absolute",
    background: "#fff",
    color: "#999",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold"
  },
  wrapperOpened: {
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.5)",
    color: "#333"
  },

  dropdown: {
    display: "none",
    listStyle: "none",
    margin: 0,
    borderTop: "1px solid #ddd",
    padding: "8px 0"
  },
  dropdownOpened: {
    display: "block"
  },

  option: {
    color: "#999",
    ":hover": {
      backgroundColor: "#0669de",
      color: "#fff"
    }
  },

  selectedItem: {
    ":hover": {
      color: "#333"
    }
  },
  arrow: {
    marginLeft: "5px",
    verticalAlign: "middle"
  },
  arrowOpened: {
    transform: "rotate(180deg)"
  }
};
