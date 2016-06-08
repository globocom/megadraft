/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";


export default class BlockContent extends Component {
  render() {
    return (
      <div className="block__content">
        {this.props.children}
      </div>
    );
  }
};
