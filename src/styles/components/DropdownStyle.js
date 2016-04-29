/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

export default {
  wrapperDropdown: {
    position: "absolute",
    background: "#fff",
    color: "#999",
    outline: "none",
    cursor: "pointer",
    fontSize: "12px",
    width: "170px",
    ":hover": {
      color: "#000"
    }
  },
  wrapperDropdownOpened: {
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.5)"
  },
  dropdown: {
    listStyle: "none",
    borderRadius: "2px",
    backgroundColor: "#fff",
    padding: 0,
    margin: 0,
    borderTop: "1px solid #ddd"
  },
  dropdownInactive: {
    display: "none"
  },
  dropdownImage: {
    display: "inline-block",
    verticalAlign: "middle",
    margin: "5px",
    fontSize: 0
  },
  dropdownOption: {
    color: "#999",
    ":hover": {
      backgroundColor: "#0669de",
      color: "#fff"
    }
  },
  selectedContainerOpened: {
    color: "#000"
  },
  selectedContainer: {
  }
};
