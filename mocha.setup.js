// const Module = require('module');

import Module from 'module';

process.env.NODE_ENV = 'test';

Module._extensions['.svg'] = function () {};
Module._extensions['.jpg'] = function () {};
Module._extensions['.webp'] = function () {};
Module._extensions['.avif'] = function () {};

import jsdom from 'jsdom';
// var jsdom = require('jsdom').jsdom;

const { window } = new jsdom.JSDOM('<!DOCTYPE html> <body></body>');

global.window = window;
global.document = window.document;

export const mochaHooks = () => {
  // const result = await checkSomething();
  // only use a root hook if `result` is truthy
  // if (result) {
  // root hooks object
  return {
    beforeEach() {
      console.error('BEFORE_EACH');
      // something
    }
  };
};

/*Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});*/

/*global.navigator = {
  userAgent: 'node.js'
};*/
