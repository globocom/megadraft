/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import PropTypes from "prop-types";

const noop = () => {};

export const ActionsContext = React.createContext({ onAction: noop });

const ActionsProvider = ({ onAction = noop, children }) => (
  <ActionsContext.Provider value={{ onAction }}>
    {children}
  </ActionsContext.Provider>
);

ActionsProvider.propTypes = {
  onAction: PropTypes.func
};

export default ActionsProvider;
