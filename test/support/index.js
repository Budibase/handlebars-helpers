'use strict';

var fs = require('fs');

/**
 * Read a file at the given `filepath`
 *
 * @param {String} `fp`
 * @return {String}
 */

module.exports.read = function(fp) {
  return fs.readFileSync(fp, 'utf8');
};

/**
 * Returns a function for reading a test fixture 
 * of the given `type` at the given `filepath`.
 *
 * @param {String} `type`
 * @param {String} `fp`
 * @return {String}
 */

module.exports.fixture = function(type) {
  return function(fp) {
    return module.exports.read('test/fixtures/' + type + '/' + fp);
  };
};

/**
 * Returns a function for reading a file
 * of the given `type` at the given `filepath`.
 *
 * @param {String} `type`
 * @param {String} `fp`
 * @return {String}
 */

module.exports.expected = function(type) {
  return function(fp) {
    return module.exports.read('test/expected/' + type + '/' + fp);
  };
};
