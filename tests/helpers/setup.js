/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { configure } from "enzyme";
import jsdom from "jsdom";

const { JSDOM } = jsdom;
const dom = new JSDOM("<!doctype html><html><body></body></html>");
global.document = dom.window.document;
global.window = dom.window;
global.self = global;
global.performance = {};

configure({ adapter: new Adapter() });

const node = {
  getAttribute: arg => true,
  parentNode: null
};

window.getSelection = () => ({
  rangeCount: 1,
  getRangeAt: index => ({ startContainer: [node] })
});
