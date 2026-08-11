'use strict';

import { readFileSync } from 'fs';

/**
 * Read a file at the given `filepath`
 *
 * @param {String} `fp`
 * @return {String}
 */

export function read(fp) {
  return readFileSync(fp, 'utf8');
}

/**
 * Returns a function for reading a test fixture 
 * of the given `type` at the given `filepath`.
 *
 * @param {String} `type`
 * @param {String} `fp`
 * @return {String}
 */

export function fixture(type) {
  return function(fp) {
    return read('test/fixtures/' + type + '/' + fp);
  };
}

/**
 * Returns a function for reading a file
 * of the given `type` at the given `filepath`.
 *
 * @param {String} `type`
 * @param {String} `fp`
 * @return {String}
 */

export function expected(type) {
  return function(fp) {
    return read('test/expected/' + type + '/' + fp);
  };
}
