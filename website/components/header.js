/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

export default function Header() {
  return (
    <div className="page__header">
      <div className="hero__container">
        <div className="hero__logo">
          <img
            className="hero__logo-svg"
            src="images/megadraft_white_version.svg"
            alt="Logo Megadraft"
          />
        </div>
        <h1 className="hero__title">
          The <br />
          most rock n’ roll <br />
          text editor ever.
        </h1>
        <div className="hero__description">
          Megadraft is a Rich Text editor built on top of
          <br />
          Facebook's draft.js featuring a nice default
          <br />
          base of plugins and extensibility.
        </div>
      </div>
    </div>
  );
}
