/*
 * Copyright (c) 2019, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { useContext } from "react";
import PropTypes from "prop-types";

export const defaultAction = () => {};

export const ActionsContext = React.createContext({ onAction: defaultAction });

export const useActions = () => useContext(ActionsContext);

const ActionsProvider = ({ onAction = defaultAction, children }) => (
  <ActionsContext.Provider value={{ onAction }}>
    {children}
  </ActionsContext.Provider>
);

ActionsProvider.propTypes = {
  onAction: PropTypes.func
};

export default ActionsProvider;
