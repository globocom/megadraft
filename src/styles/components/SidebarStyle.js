/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */


export default {
  container: {
    position: "relative"
  },
  popover: {
    position: "absolute",
    left: "-57px",
    float: "left"
  },
  block: {
    listStyle: "none",
    padding: 0,
    margin: "8px 0px",
    overflow: "hidden",
    transition: "max-height 0.5s ease"
  },
  menu: {
    position: "relative"
  },
  dropdown: {
    padding: 0,
    listStyle: "none"
  },
  listItem: {
    marginTop: "6px"
  },
  button: {
    backgroundColor: "#181818",
    border: 0,
    borderRadius: "32px",
    color: "#fff",
    cursor: "pointer",
    height: "32px",
    padding: "1px 0 0 0",
    width: "32px",
    transition: "all 0.5s ease",
    ":hover":{
      backgroundColor: "#333333"
    }
  },
  toggleClose: {
    transform: "rotate(45deg)",
    backgroundColor: "#0669de",
    ":hover": {
      backgroundColor: "#0669de"
    }
  }
};
