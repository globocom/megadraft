/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import { useCallback } from "react";

import Modal from "backstage-modal";
import ModalPluginList from "./ModalPluginList";

import { PLUGINS_MODAL_CLOSE } from "../constants";

import { useActions } from "./ActionsProvider";

const PluginsModal = ({
  i18n,
  isOpen,
  toggleModalVisibility,
  plugins,
  onChange,
  editorState,
  modalOptions = {}
}) => {
  const { onAction } = useActions();
  const { width: modalWidth = 528, height: modalHeight = 394 } = modalOptions;

  const onCloseRequest = useCallback(() => {
    if (!isOpen) {
      return;
    }
    document.body.classList.remove("megadraft-modal--open");
    onAction({ type: PLUGINS_MODAL_CLOSE });
    toggleModalVisibility();
  }, [onAction, toggleModalVisibility, isOpen]);

  return (
    <Modal
      className="megadraft-modal"
      title={i18n["Block List"]}
      isOpen={isOpen}
      onCloseRequest={onCloseRequest}
      width={modalWidth}
      height={modalHeight}
    >
      <ModalPluginList
        toggleModalVisibility={onCloseRequest}
        plugins={plugins}
        onChange={onChange}
        editorState={editorState}
      />
    </Modal>
  );
};

export default PluginsModal;
