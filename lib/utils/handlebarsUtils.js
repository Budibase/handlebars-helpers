'use strict';

/**
 * This code was taken directly from handlebars-helpers, (extracting some utils to its own file)
 * https://github.com/helpers/handlebars-utils/blob/master/index.js#L398
 * 
 * that was taken directly from handlebars.
 * https://github.com/wycats/handlebars.js/blob/b55a120e8222785db3dc00096f6afbf91b656e8a/LICENSE
 * Released under the MIT License
 * Copyright (C) 2011-2016 by Yehuda Katz
 */

var util = require('util');
var type = require('typeof-article');

module.exports.extend = extend;
module.exports.escapeExpression = escapeExpression;
module.exports.isEmpty = isEmpty;
module.exports.createFrame = createFrame;
module.exports.blockParams = blockParams;
module.exports.appendContextPath = appendContextPath;

module.exports.isObject = require('./isObject');
module.exports.isOptions = require('./isOptions');
module.exports.isUndefined = require('./isUndefined');
module.exports.result = require('./result');
module.exports.indexOf = require('./indexOf');
module.exports.isBlock = require('./isBlock');
module.exports.fn = require('./fn');
module.exports.inverse = require('./inverse');
module.exports.value = require('./value');
module.exports.options = require('./options');
module.exports.identity = require('./identity');
module.exports.isString = require('./isString');

var escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

var badChars = /[&<>"'`=]/g;
var possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (var i = 1; i < arguments.length; i++) {
    for (var key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

var toString = Object.prototype.toString;

module.exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
var isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  module.exports.isFunction = isFunction = function(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
module.exports.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
var isArray = Array.isArray || function(value) {
  return value && typeof value === 'object'
    ? toString.call(value) === '[object Array]'
    : false;
};

module.exports.isArray = isArray;

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function createFrame(object) {
  var frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}

//
// The code below this line was not sourced from handlebars
// --------------------------------------------------------
//

module.exports.expectedType = function(param, expected, actual) {
  var exp = type.types[expected];
  var val = util.inspect(actual);
  return 'expected ' + param + ' to be ' + exp + ' but received ' + type(actual) + ': ' + val;
};

/**
 * Returns true if an `app` propery is on the context, which means
 * the context was created by [assemble][], [templates][], [verb][],
 * or any other library that follows this convention.
 *
 * ```js
 * Handlebars.registerHelper('example', function(val, options) {
 *   var context = options.hash;
 *   if (module.exports.isApp(this)) {
 *     context = Object.assign({}, this.context, context);
 *   }
 *   // do stuff
 * });
 * ```
 * @param {any} `value`
 * @return {Boolean}
 * @api public
 */

module.exports.isApp = function(thisArg) {
  return module.exports.isObject(thisArg)
    && module.exports.isObject(thisArg.options)
    && module.exports.isObject(thisArg.app);
};

/**
 * Get the context to use for rendering.
 *
 * @param {Object} `thisArg` Optional invocation context `this`
 * @return {Object}
 * @api public
 */

module.exports.context = function(thisArg, locals, options) {
  if (module.exports.isOptions(thisArg)) {
    return module.exports.context({}, locals, thisArg);
  }
  // ensure args are in the correct order
  if (module.exports.isOptions(locals)) {
    return module.exports.context(thisArg, options, locals);
  }
  var appContext = module.exports.isApp(thisArg) ? thisArg.context : {};
  options = options || {};

  // if "options" is not handlebars options, merge it onto locals
  if (!module.exports.isOptions(options)) {
    locals = Object.assign({}, locals, options);
  }
  // merge handlebars root data onto locals if specified on the hash
  if (module.exports.isOptions(options) && options.hash.root === true) {
    locals = Object.assign({}, options.data.root, locals);
  }
  var context = Object.assign({}, appContext, locals, options.hash);
  if (!module.exports.isApp(thisArg)) {
    context = Object.assign({}, thisArg, context);
  }
  if (module.exports.isApp(thisArg) && thisArg.view && thisArg.view.data) {
    context = Object.assign({}, context, thisArg.view.data);
  }
  return context;
};

/**
 * Returns true if the given value is "empty".
 *
 * ```js
 * console.log(module.exports.isEmpty(0));
 * //=> false
 * console.log(module.exports.isEmpty(''));
 * //=> true
 * console.log(module.exports.isEmpty([]));
 * //=> true
 * console.log(module.exports.isEmpty({}));
 * //=> true
 * ```
 * @name .isEmpty
 * @param {any} `value`
 * @return {Boolean}
 * @api public
 */

function isEmpty(val) {
  if (val === 0 || typeof val === 'boolean') {
    return false;
  }
  if (val == null) {
    return true;
  }
  if (module.exports.isObject(val)) {
    val = Object.keys(val);
  }
  if (!val.length) {
    return true;
  }
  return false;
}

/**
 * Cast the given `val` to an array.
 *
 * ```js
 * console.log(module.exports.arrayify(''));
 * //=> []
 * console.log(module.exports.arrayify('foo'));
 * //=> ['foo']
 * console.log(module.exports.arrayify(['foo']));
 * //=> ['foo']
 * ```
 * @param  {any} `val`
 * @return {Array}
 * @api public
 */

module.exports.arrayify = function(val) {
  return val != null ? (Array.isArray(val) ? val : [val]) : [];
};

/**
 * Try to parse the given `string` as JSON. Fails
 * gracefully and always returns an object if the value cannot be parsed.
 *
 * @param {String} `string`
 * @return {Object}
 * @api public
 */

module.exports.tryParse = function(str) {
  try {
    return JSON.parse(str);
  } catch (err) { }
  return {};
};
