/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, { useRef } from "react";

import { useActions } from "./ActionsProvider";
import { PLUGINS_MODAL_ADD_PLUGIN } from "../constants";

const ModalPluginItem = ({
  toggleModalVisibility,
  editorState,
  onChange,
  plugins
}) => {
  const listEl = useRef([]);

  const { onAction } = useActions();

  const handleClick = (e, type) => listEl.current[type].children[0].onClick(e);

  const closeModal = () => toggleModalVisibility();

  const renderButton = item => {
    const Button = item.buttonComponent;

    return (
      <li
        key={item.type}
        ref={el => {
          listEl.current[item.type] = el;
        }}
        className="megadraft-modal__item"
        onClick={() => {
          onAction({
            type: PLUGINS_MODAL_ADD_PLUGIN,
            pluginName: item.title
          });
          closeModal();
        }}
      >
        <Button
          className="megadraft-modal__button"
          title={item.title}
          editorState={editorState}
          onChange={onChange}
        />
        <p
          className="megadraft-modal__button__label"
          onClick={e => handleClick(e, item.type)}
        >
          {item.title}
        </p>
      </li>
    );
  };

  return (
    <ul className="megadraft-modal__items">{plugins.map(renderButton)}</ul>
  );
};

export default ModalPluginItem;
