/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {Entity} from "draft-js";


export default class Media extends Component {
  render() {
    const style = {
      maxWidth: "100%"
    };
    const entity = Entity.get(this.props.block.getEntityAt(0));
    const data = entity.getData();
    const type = entity.getType();
    const plugins = this.props.blockProps.plugins;
    for (let plugin of plugins) {
      if (type === plugin.type) {
        const Block = plugin.blockComponent;
        return <Block style={style} data={data} />;
      }
    }
  }
}
