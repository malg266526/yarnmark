const Module = require('module');

process.env.NODE_ENV = 'test';

const SVG_REGEX = /^[./a-zA-Z0-9$_-]+\.svg$/;

Module.require = function (a) {
  console.info('ffd');
  return () => {};
};

// const defaultResolve = require.resolve;
// require.resolve.paths = function (request, options) {
//   console.info('ffd');
//   if (SVG_REGEX.test(request.url)) {
//     return () => {};
//   }
//   return defaultResolve(request, options);
// };
//
// module.exports = function (request, options) {
//   console.info('ffd');
//   if (SVG_REGEX.test(request.url)) {
//     return () => {};
//   }
//   return defaultResolve(request, options);
// };

// const noop = () => 1;
//
// require.extensions['.svg'] = noop;
