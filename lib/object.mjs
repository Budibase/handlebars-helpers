'use strict';

var hasOwn = Object.hasOwnProperty;

import isOptions from './utils/isOptions.js';
import isObject from './utils/isObject.js';
var util = {
  isOptions,
  isObject
};
import { arrayify } from './array.mjs';

import getValue from 'get-value';
import getObject from 'get-object';
import createFrame from './utils/createFrame.js';

/**
 * Extend the context with the properties of other objects.
 * A shallow merge is performed to avoid mutating the context.
 *
 * @param {Object} `objects` One or more objects to extend.
 * @return {Object}
 * @api public
 */

export function extend(/*objects*/) {
  var args = [].slice.call(arguments);
  var opts = {};

  if (util.isOptions(args[args.length - 1])) {
    // remove handlebars options object
    opts = args.pop().hash;
    // re-add handlebars options.hash object
    args.push(opts);
  }

  var context = {};
  for (var i = 0; i < args.length; i++) {
    var obj = args[i];
    if (util.isObject(obj)) {
      var keys = Object.keys(obj);
      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        context[key] = obj[key];
      }
    }
  }

  return context;
}

/**
 * Block helper that iterates over the properties of
 * an object, exposing each key and value on the context.
 *
 * @param {Object} `context`
 * @param {Object} `options`
 * @return {String}
 * @block
 * @api public
 */

export function forIn(obj, options) {
  if (!util.isOptions(options)) {
    return obj.inverse(this);
  }

  var data = createFrame(options, options.hash);
  var result = '';

  for (var key in obj) {
    data.key = key;
    result += options.fn(obj[key], { data: data });
  }
  return result;
}

/**
 * Block helper that iterates over the **own** properties of
 * an object, exposing each key and value on the context.
 *
 * @param {Object} `obj` The object to iterate over.
 * @param {Object} `options`
 * @return {String}
 * @block
 * @api public
 */

export function forOwn(obj, options) {
  if (!util.isOptions(options)) {
    return obj.inverse(this);
  }

  var data = createFrame(options, options.hash);
  var result = '';

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      data.key = key;
      result += options.fn(obj[key], { data: data });
    }
  }
  return result;
}

/**
 * Take arguments and, if they are string or number, convert them to a dot-delineated object property path.
 *
 * @param {String|Number} `prop` The property segments to assemble (can be multiple).
 * @return {String}
 * @api public
 */

export function toPath(/*prop*/) {
  var prop = [];
  for (var i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] === 'string' || typeof arguments[i] === 'number') {
      prop.push(arguments[i]);
    }
  }
  return prop.join('.');
}

/**
 * Use property paths (`a.b.c`) to get a value or nested value from
 * the context. Works as a regular helper or block helper.
 *
 * @param {String} `prop` The property to get, optionally using dot notation for nested properties.
 * @param {Object} `context` The context object
 * @param {Object} `options` The handlebars options object, if used as a block helper.
 * @return {String}
 * @block
 * @api public
 */

export function get(prop, context, options) {
  var val = getValue(context, prop);
  if (options && options.fn) {
    return val ? options.fn(val) : options.inverse(context);
  }
  return val;
}

/**
 * Use property paths (`a.b.c`) to get an object from
 * the context. Differs from the `get` helper in that this
 * helper will return the actual object, including the
 * given property key. Also, this helper does not work as a
 * block helper.
 *
 * @param {String} `prop` The property to get, optionally using dot notation for nested properties.
 * @param {Object} `context` The context object
 * @return {String}
 * @api public
 */

const _getObject = function(prop, context) {
  return getObject(context, prop);
};
export { _getObject as getObject };

/**
 * Return true if `key` is an own, enumerable property
 * of the given `context` object.
 *
 * ```handlebars
 * {{hasOwn context key}}
 * ```
 *
 * @param {String} `key`
 * @param {Object} `context` The context object.
 * @return {Boolean}
 * @api public
 */

const _hasOwn = function(context, key) {
  return hasOwn.call(context, key);
};
export { _hasOwn as hasOwn };

/**
 * Return true if `value` is an object.
 *
 * ```handlebars
 * {{isObject 'foo'}}
 * //=> false
 * ```
 * @param {String} `value`
 * @return {Boolean}
 * @api public
 */

const _isObject = function(value) {
  return typeof value === 'object';
};
export { _isObject as isObject };

/**
 * Parses the given string using `JSON.parse`.
 *
 * ```handlebars
 * <!-- string: '{'foo': 'bar'}' -->
 * {{JSONparse string}}
 * <!-- results in: { foo: 'bar' } -->
 * ```
 * @param {String} `string` The string to parse
 * @contributor github.com/keeganstreet
 * @block
 * @api public
 */

export function JSONparse(str, options) {
  return JSON.parse(str);
}

/**
 * Stringify an object using `JSON.stringify`.
 *
 * ```handlebars
 * <!-- object: { foo: 'bar' } -->
 * {{JSONstringify object}}
 * <!-- results in: '{'foo': 'bar'}' -->
 * ```
 * @param {Object} `obj` Object to stringify
 * @return {String}
 * @api public
 */

export function JSONstringify(obj, indent) {
  if (isNaN(indent)) {
    indent = 0;
  }
  return JSON.stringify(obj, null, indent);
}

/**
 * Deeply merge the properties of the given `objects` with the
 * context object.
 *
 * @param {Object} `object` The target object. Pass an empty object to shallow clone.
 * @param {Object} `objects`
 * @return {Object}
 * @api public
 */

export function merge(context/*, objects, options*/) {
  var args = [].slice.call(arguments);
  var opts = {};

  if (util.isOptions(args[args.length - 1])) {
    // remove handlebars options object
    opts = args.pop().hash;
    // re-add options.hash
    args.push(opts);
  }

  return Object.assign.apply(null, args);
}

export const parseJSON = JSONparse;

/**
 * Pick properties from the context object.
 *
 * @param {Array|String} `properties` One or more properties to pick.
 * @param {Object} `context`
 * @param {Object} `options` Handlebars options object.
 * @return {Object} Returns an object with the picked values. If used as a block helper, the values are passed as context to the inner block. If no values are found, the context is passed to the inverse block.
 * @block
 * @api public
 */

export function pick(props, context, options) {
  var keys = arrayify(props);
  var len = keys.length, i = -1;
  var result = {};

  while (++i < len) {
    result = extend({}, result, getObject(context, keys[i]));
  }

  if (options.fn) {
    if (Object.keys(result).length) {
      return options.fn(result);
    }
    return options.inverse(context);
  }
  return result;
}

export const stringify = JSONstringify;