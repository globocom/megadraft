/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { useContext, useRef } from "react";

import { ActionsContext } from "./ActionsProvider";
import { PLUGINS_MODAL_ADD_PLUGIN } from "../constants";

const ModalPluginItem = props => {
  const buttonEl = useRef(null);
  const actionsContext = useContext(ActionsContext);

  const handleClick = e => {
    if (buttonEl.current) {
      buttonEl.current.onClick(e);
    }
  };

  const closeModal = () => {
    props.toggleModalVisibility();
  };

  const renderButton = item => {
    const Button = item.buttonComponent;

    return (
      <li
        key={item.type}
        className="megadraft-modal__item"
        onClick={() => {
          actionsContext.onAction({
            type: PLUGINS_MODAL_ADD_PLUGIN,
            pluginName: item.title
          });
          closeModal();
        }}
      >
        <Button
          ref={buttonEl}
          className="megadraft-modal__button"
          title={item.title}
          editorState={props.editorState}
          onChange={props.onChange}
        />
        <p className="megadraft-modal__button__label" onClick={handleClick}>
          {item.title}
        </p>
      </li>
    );
  };

  return (
    <ul className="megadraft-modal__items">
      {props.plugins.map(renderButton)}
    </ul>
  );
};

export default ModalPluginItem;
