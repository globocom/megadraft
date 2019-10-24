/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import PropTypes from "prop-types";

export default class ActionsProvider extends React.Component {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      onAction: this.props.onAction
    };
  }

  render() {
    return this.props.children;
  }
}

ActionsProvider.childContextTypes = {
  onAction: PropTypes.func
};

export function withActions(WrappedComponent) {
  class WithActionsHOC extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <WrappedComponent onAction={this.context.onAction} {...this.props} />
      );
    }
  }

  WithActionsHOC.contextTypes = {
    onAction: PropTypes.func
  };

  return WithActionsHOC;
}
