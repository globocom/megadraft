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
      <div>
        <div className="home-title">
          <div className="content">
            <h1>Megadraft</h1>
            <p>Megadraft is a Rich Text editor built on top of Facebook's
            draft.js featuring a nice default base of plugins and extensibility
              </p>
          </div>
        </div>
        <div className="content home">
          <Example />
        </div>
      </div>
    );
  }
}
