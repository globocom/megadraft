/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";

import {
  BlockContent,
  CommonBlock
} from "../../components/plugin";
import MediaMessage from "../../components/MediaMessage";
import icons from "../../icons";


export default class NotFoundBlock extends Component {
  constructor(props) {
    super(props);

    this.actions = [
      {"key": "delete", "icon": icons.DeleteIcon, "action": this.props.container.remove}
    ];
  }

  render(){
    /* global __ */
    const message = __(
      "Can't show plugin, component \"{type}\" not found.").replace(
        "{type}", this.props.data.type);
    return (
      <CommonBlock {...this.props} actions={this.actions}>
        <BlockContent className="block__notfound">
          <MediaMessage text={message} type="warning" />
          <icons.ErrorIcon className="block__notfound__icon" />
        </BlockContent>
      </CommonBlock>
    );
  }
}
