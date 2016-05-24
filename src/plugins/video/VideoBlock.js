/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";


const VideoBlock = (props) => {
  return <video controls style={props.style} src={props.data.src} alt=""/>;
};

export default VideoBlock;
