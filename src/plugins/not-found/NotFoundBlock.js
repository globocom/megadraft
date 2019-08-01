/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from "react";

import { BlockContent, CommonBlock } from "../../components/plugin";
import MediaMessage from "../../components/MediaMessage";
import icons from "../../icons";
import { replaceData } from "../../i18n";

class NotFoundBlock extends Component {
  constructor(props) {
    super(props);

    this.actions = [
      {
        key: "delete",
        icon: icons.DeleteIcon,
        action: this.props.container.remove
      }
    ];
  }

  render() {
    const {
      i18n,
      data: { type }
    } = this.props;
    const errorMsg = type
      ? "Can't show plugin, component {{type}} not found."
      : "Can't show plugin, component not found.";
    const text = replaceData(i18n[errorMsg], { type: type && type.toString() });
    return (
      <CommonBlock {...this.props} actions={this.actions}>
        <BlockContent className="block__notfound">
          <MediaMessage text={text} type="warning" />
          <icons.ErrorIcon className="block__notfound__icon" />
        </BlockContent>
      </CommonBlock>
    );
  }
}

export default NotFoundBlock;
