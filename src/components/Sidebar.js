/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */
import React, { useState, useEffect, useRef, useContext } from "react";
import classNames from "classnames";
import icons from "../icons";

import {
  SIDEBAR_ADD_PLUGIN,
  SIDEBAR_EXPAND,
  SIDEBAR_SHRINK,
  SIDEBAR_CLICK_MORE
} from "../constants";

import { ActionsContext } from "./ActionsProvider";

import "setimmediate";

import PluginsModal from "./PluginsModal";
import { getSelectedBlockElement } from "../utils";


const BlockStyles = ({ i18n, plugins, editorState, onChange, open, modalOptions, onClose }) => {
  const context = useContext(ActionsContext); 
  const [isOpen, setIsOpen] = useState(false); 

  const onModalOpenClick = (e) => {
    e.preventDefault();
    document.body.classList.add("megadraft-modal--open");
    setIsOpen(true); 
  };

  const toggleModalVisibility = () => {
    setIsOpen(!isOpen); 
  };

  const renderModal = () => (
    <PluginsModal
      i18n={i18n}
      toggleModalVisibility={toggleModalVisibility}
      isOpen={isOpen}
      plugins={plugins}
      onCloseRequest={onClose}
      onChange={onChange}
      editorState={editorState}
      modalOptions={modalOptions}
    />
  );

  const renderModalButton = () => (
    <button
      className="sidemenu__button"
      onClick={(e) => {
        context.onAction({ type: SIDEBAR_CLICK_MORE });
        onModalOpenClick(e);
      }}
    >
      <icons.MoreIcon className="sidemenu__button__icon" />
    </button>
  );

  const renderButton = (item) => {
    const Button = item.buttonComponent;

    return (
      <li
        key={item.type}
        className="sidemenu__item"
        onClick={() => {
          context.onAction({
            type: SIDEBAR_ADD_PLUGIN,
            pluginName: item.title
          });
        }}
      >
        <Button
          className="sidemenu__button"
          title={item.title}
          editorState={editorState}
          onChange={onChange}
        />
      </li>
    );
  };

  const maxSidebarButtons = open ? plugins.length : 0; 
  const sidemenuMaxHeight = { maxHeight: open ? `${(maxSidebarButtons + 1) * 48}px` : 0 };
  const hasModal = plugins.length > maxSidebarButtons;
  const className = classNames("sidemenu__items", { "sidemenu__items--open": open });

  return (
    <div>
      <ul style={sidemenuMaxHeight} className={className}>
        {plugins.slice(0, maxSidebarButtons).map(renderButton)}
        {hasModal ? renderModalButton() : null}
      </ul>
      {hasModal ? renderModal() : null}
    </div>
  );
};



const ToggleButton = ({ toggle, hideSidebarOnBlur, hasFocus, open }) => {
  const Icon = icons.CrossIcon;
  const className = classNames("sidemenu__button", { "sidemenu__button--open": open });
  const buttonRef = useRef(null); // Cria a referência com useRef

  if (hideSidebarOnBlur && !hasFocus) {
    return null; 
  }

  return (
    <button
      type="button"
      ref={buttonRef} 
      className={className}
      onClick={() => {
        buttonRef.current.focus(); 
        toggle();
      }}
    >
      <Icon className="sidemenu__button__icon" />
    </button>
  );
};




const SideMenu = ({ editorHasFocus, hideSidebarOnBlur, maxSidebarButtons, i18n, editorState, plugins, onChange }) => {
  const context = useContext(ActionsContext); 
  const [open, setOpen] = useState(false); 

  const toggle = () => {
    context.onAction({
      type: open ? SIDEBAR_SHRINK : SIDEBAR_EXPAND
    });
    setOpen(!open); 
  };

  return (
    <li className={classNames("sidemenu", { "sidemenu--open": open })}>
      <ToggleButton
        toggle={toggle}
        hasFocus={editorHasFocus || open} 
        hideSidebarOnBlur={hideSidebarOnBlur}
        open={open}
      />
      <BlockStyles
        i18n={i18n}
        editorState={editorState}
        plugins={plugins}
        open={open}
        onChange={onChange}
        maxSidebarButtons={maxSidebarButtons}
      />
    </li>
  );
};




const SideBar = ({ readOnly, i18n, editorState, onChange, maxSidebarButtons, editorHasFocus, hideSidebarOnBlur, modalOptions, plugins }) => {
  const [top, setTop] = useState(0); 
  const containerEl = useRef(null); 

  const getValidSidebarPlugins = () => {
    return plugins.filter(plugin => plugin.buttonComponent && typeof plugin.buttonComponent === "function");
  };

  const handleChange = (editorState) => {
    onChange(editorState); 
  };

  useEffect(() => {
    const updatePosition = () => {
      const container = containerEl.current; // Acesso ao container
      const editor = container ? container.parentElement : null;

      const selection = window.getSelection();
      if (selection.rangeCount === 0) {
        return null;
      }

      const element = getSelectedBlockElement(selection.getRangeAt(0)); 

      if (!element || !container || !editor || !editor.contains(element)) {
        return;
      }

      const containerTop = container.getBoundingClientRect().top - document.documentElement.clientTop;
      let newTop = element.getBoundingClientRect().top - 4 - containerTop;
      newTop = Math.max(0, Math.floor(newTop)); 

      if (top !== newTop) {
        setTop(newTop); 
      }
    };

    const positionUpdater = setImmediate(updatePosition); 

    return () => {
      clearImmediate(positionUpdater); 
    };
  }, [top]); 

  if (readOnly) {
    return null; 
  }

  return (
    <div ref={containerEl} className="sidebar">
      <div style={{ top: `${top}px` }} className="sidebar__menu">
        <ul className="sidebar__sidemenu-wrapper">
          <SideMenu
            i18n={i18n}
            editorState={editorState}
            onChange={handleChange}
            plugins={getValidSidebarPlugins()}
            maxSidebarButtons={maxSidebarButtons}
            editorHasFocus={editorHasFocus}
            hideSidebarOnBlur={hideSidebarOnBlur}
            modalOptions={modalOptions}
          />
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
