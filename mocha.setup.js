// const Module = require('module');

import Module from 'module';

process.env.NODE_ENV = 'test';

Module._extensions['.svg'] = function () {};
Module._extensions['.jpg'] = function () {};
Module._extensions['.webp'] = function () {};
Module._extensions['.avif'] = function () {};
