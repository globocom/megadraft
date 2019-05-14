/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import { Component } from "react";

export default class ErrorBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    /*global functionError*/
    /*eslint no-undef: "error"*/
    functionError("test");

    return "metal";
  }
}
