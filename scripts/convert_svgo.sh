#!/bin/bash
#
# Copyright (c) 2016, Globo.com (https://github.com/globocom)
#
# License: MIT
##

create_js_file()
{
  cat <<EOF
/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";


export default class extends React.Component {
  render() {
    return (
        $SVG_CONTENT
    );
  }
}
EOF
}

SVG_FILE=`basename $1`;
JS_OUTPUT="src/icons/${SVG_FILE/%svg/js}";

if [ -f "$JS_OUTPUT" ]; then
    echo "Target file $1 already exists";
    exit 1;
fi

eval "node_modules/.bin/svgo -q $1";

SVG_CONTENT=`cat $1`;
create_js_file > $JS_OUTPUT;

if [ ! -f "src/styles/icons/$SVG_FILE" ]; then
    cp $1 src/styles/icons/
fi
