/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import { CompositeDecorator } from "draft-js";
import Link from "../components/Link";
import { createTypeStrategy } from "../utils";

const decorator = new CompositeDecorator([
  {
    strategy: createTypeStrategy("LINK"),
    component: Link
  }
]);

export default decorator;
