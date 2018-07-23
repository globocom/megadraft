/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import { CompositeDecorator } from "draft-js";
import { createTypeStrategy } from "../utils";
import Link from "../components/Link";

const decorator = new CompositeDecorator([
  {
    strategy: createTypeStrategy("LINK"),
    component: Link
  }
]);

export default decorator;
