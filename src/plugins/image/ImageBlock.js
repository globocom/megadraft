/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import MediaCaption from "../../components/MediaCaption";


const ImageBlock = (props) => {
  return (
    <div>
      <img style={props.style} src={props.data.src} alt=""/>
      <MediaCaption
        setReadOnly={props.setReadOnly}
        updateEntity={props.updateEntity}
        data={props.data} />
    </div>
  );
};

export default ImageBlock;
