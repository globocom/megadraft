/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

/*
 * MediaWrapper component avoids Draft JS bugs when a custom block component
 * is being updated by setting the editor's readOnly flag to true
 *
 * https://draftjs.org/docs/advanced-topics-block-components/#recommendations-and-other-notes
 */
const MediaWrapper = ({ setReadOnly, setInitialReadOnly, children }) => {
  const handleFocus = () => {
    setReadOnly(true);
  };

  const handleBlur = () => {
    setInitialReadOnly();
  };

  return (
    <div onBlur={handleBlur} onFocus={handleFocus}>
      {children}
    </div>
  );
};

export default MediaWrapper;
