/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { Component } from "react";

import { BlockContent, CommonBlock } from "./plugin";
import MediaMessage from "./MediaMessage";
import icons from "../icons";
import { replaceData } from "../i18n";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
    this.actions = [
      {
        key: "delete",
        icon: icons.DeleteIcon,
        action: this.props.container.remove
      }
    ];
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      const {
        i18n,
        data: { type }
      } = this.props;
      const errorMsg = type
        ? "Something went wrong in component '{{type}}'. {{error}}"
        : "Something went wrong with the component type.";
      const text = replaceData(i18n[errorMsg], {
        type: type && type.toString(),
        error: this.state.error && this.state.error.toString()
      });
      return (
        <CommonBlock {...this.props} actions={this.actions}>
          <BlockContent className="block__error">
            <MediaMessage text={text} type="error" />
            <icons.ErrorIcon className="block__notfound__icon" />
          </BlockContent>
        </CommonBlock>
      );
    }
    // Render children if there's no error
    return this.props.children;
  }
}

export default ErrorBoundary;
