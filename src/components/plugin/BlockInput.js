/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";


export default class BlockInput extends Component {
  render(){
    const {value, ...props} = this.props;
    return (
      <input {...props} defaultValue={value} type="text" className="block__input" />
    );
  }
}
