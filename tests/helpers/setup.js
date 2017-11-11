/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import jsdom from "jsdom";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

// set globals for mocha that make access to document and window feel
// natural in the test environment
global.document = jsdom.jsdom("<!doctype html><html><body></body></html>");
global.window = global.document.defaultView;
global.self = global;

configure({adapter: new Adapter()});

/**
 * Take all the properties of the window object and attach them to the mocha
 * global object. This is to prevent 'undefined' errors which sometime occur.
 * Gotten from: http://jaketrent.com/post/testing-react-with-jsdom/
 * @param  {object} window: The fake window, build by jsdom
 */
((window) => {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) {
      continue;
    }

    if (key in global) {
      continue;
    }

    global[key] = window[key];
  }
})(global.window);


Object.defineProperties(global.window.HTMLElement.prototype, {
  offsetLeft: {
    get: function() { return 0; }
  },
  offsetTop: {
    get: function() { return 0; }
  },
  offsetHeight: {
    get: function() { return 0; }
  },
  offsetWidth: {
    get: function() { return 0; }
  }
});
