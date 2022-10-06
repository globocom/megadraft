/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";

import Example from "../components/example";

export default function Home({ activeContent }) {
  return (
    <div className="content home">
      <Example activeContent={activeContent} />
    </div>
  );
}
