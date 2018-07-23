/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

import Example from "../components/example";

export default class Home extends React.Component {
  render() {
    return (
      <div className="content home">
        <Example activeContent={this.props.activeContent} />
      </div>
    );
  }
}
