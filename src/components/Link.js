/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

const Link = ({ contentState, entityKey, children }) => {
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a className="editor__link" href={url} title={url}>
      {children}
    </a>
  );
};

export default Link;
