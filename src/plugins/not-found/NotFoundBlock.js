/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import {translate} from "react-i18next";

import {
  BlockContent,
  CommonBlock
} from "../../components/plugin";
import MediaMessage from "../../components/MediaMessage";
import icons from "../../icons";


class NotFoundBlock extends Component {
  constructor(props) {
    super(props);

    this.actions = [
      {"key": "delete", "icon": icons.DeleteIcon, "action": this.props.container.remove}
    ];
  }

  render(){
    const {t} = this.props;
    const message = t(
      "Can't show plugin, component \"{{type}}\" not found.",
      {type: this.props.data.type}
    );
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

export default translate("translations")(NotFoundBlock);
