/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import { BlockContent, CommonBlock } from "../../components/plugin";
import MediaMessage from "../../components/MediaMessage";
import icons from "../../icons";
import { replaceData } from "../../i18n";

export default function NotFoundBlock(props) {
  const {
    container,
    i18n,
    data: { type }
  } = props;
  const actions = [
    {
      key: "delete",
      icon: icons.DeleteIcon,
      action: container.remove
    }
  ];

  const errorMsg = type
    ? "Can't show plugin, component {{type}} not found."
    : "Can't show plugin, component not found.";
  const text = replaceData(i18n[errorMsg], { type: type && type.toString() });

  return (
    <CommonBlock {...props} actions={actions}>
      <BlockContent className="block__notfound">
        <MediaMessage text={text} type="warning" />
        <icons.ErrorIcon className="block__notfound__icon" />
      </BlockContent>
    </CommonBlock>
  );
}
