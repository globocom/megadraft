/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import jsdom from "jsdom";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

const {JSDOM} = jsdom;
const dom = new JSDOM("<!doctype html><html><body></body></html>");
global.document = dom.window.document;
global.window = dom.window;
global.self = global;
global.performance = {};

configure({adapter: new Adapter()});

window.__ = arg => arg;

const node = {
  getAttribute: arg => true,
  parentNode: null
};

window.getSelection = () => ({
  rangeCount: 1,
  getRangeAt: index => ({startContainer: [node]})
});
