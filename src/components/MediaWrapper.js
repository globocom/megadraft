/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

/*
 * MediaWrapper component avoids Draft JS bugs when a custom block component
 * is being updated by setting the editor's readOnly flag to true
 *
 * https://draftjs.org/docs/advanced-topics-block-components/#recommendations-and-other-notes
 */
export default function MediaWrapper(props) {
  const { setReadOnly, setInitialReadOnly, children } = props;

  function handleFocus() {
    setReadOnly(true);
  }

  function handleBlur() {
    setInitialReadOnly();
  }

  return (
    <div onBlur={handleBlur} onFocus={handleFocus}>
      {children}
    </div>
  );
}
