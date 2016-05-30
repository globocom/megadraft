/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

import VideoBlockStyle from "./VideoBlockStyle";


const VideoBlock = (props) => {
  return (
    <div style={VideoBlockStyle.videoWrapper}>
      <video controls style={VideoBlockStyle.video} src={props.data.src} alt=""/>
    </div>
  );
};

export default VideoBlock;
