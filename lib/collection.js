import util from './utils/handlebarsUtils.js';
import object from './object.js';
import array from './array.js';

const { forEach } = array;
const { forOwn } = object;
const helpers = {};

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

helpers.isEmpty = function(collection, options) {
  if (!util.isOptions(options)) {
    options = collection;
    return util.fn(true, this, options);
  }

  if (Array.isArray(collection) && !collection.length) {
    return util.fn(true, this, options);
  }

  var keys = Object.keys(collection);
  var isEmpty = typeof collection === 'object' && !keys.length;
  return util.value(isEmpty, this, options);
};

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

helpers.iterate = function(collection, options) {
  if (Array.isArray(collection)) {
    return forEach.apply(null, arguments);
  }
  if (util.isObject(collection)) {
    return forOwn.apply(null, arguments);
  }
  return options.inverse(this);
};

export default helpers;
