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
      <div className="home">
        <p>
          Megadraft is a Rich Text editor built on top of Facebook's
          draft.js featuring a nice default base of plugins and
          extensibility
        </p>
        <Example />
      </div>
    );
  }
}
