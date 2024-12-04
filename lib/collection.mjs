'use strict';

import handlebarsUtils from './utils/handlebarsUtils.js';
import { forOwn } from './object.mjs';
import { forEach } from './array.mjs';
import value from './utils/value.mjs';

const { isOptions, fn, isObject } = handlebarsUtils;

/**
 * Inline, subexpression, or block helper that returns true (or the block)
 * if the given collection is empty, or false (or the inverse block, if
 * supplied) if the colleciton is not empty.
 *
 * ```handlebars
 * <!-- array: [] -->
 * {{#isEmpty array}}AAA{{else}}BBB{{/isEmpty}}
 * <!-- results in: 'AAA' -->
 *
 * <!-- array: [] -->
 * {{isEmpty array}}
 * <!-- results in: true -->
 * ```
 * @param {Object} `collection`
 * @param {Object} `options`
 * @return {String}
 * @block
 * @api public
 */

export function isEmpty(collection, options) {
  if (!isOptions(options)) {
    options = collection;
    return fn(true, this, options);
  }

  if (Array.isArray(collection) && !collection.length) {
    return fn(true, this, options);
  }

  var keys = Object.keys(collection);
  var isEmpty = typeof collection === 'object' && !keys.length;
  return value(isEmpty, this, options);
}

/**
 * Block helper that iterates over an array or object. If
 * an array is given, `.forEach` is called, or if an object
 * is given, `.forOwn` is called, otherwise the inverse block
 * is returned.
 *
 * @param {Object|Array} `collection` The collection to iterate over
 * @param {Object} `options`
 * @return {String}
 * @block
 * @api public
 */

export function iterate(collection, options) {
  if (Array.isArray(collection)) {
    return forEach.apply(null, arguments);
  }
  if (isObject(collection)) {
    return forOwn.apply(null, arguments);
  }
  return options.inverse(this);
}
