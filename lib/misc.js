'use strict';

import {options as _options} from './utils/index.js';

import getValue from 'get-value';
import createFrame from './utils/createFrame.js';

/**
 * Block helper for exposing private `@` variables on the context
 */

export function frame(context, options) {
  if (typeof(context) === 'object' && context.hash) {
    options = context;
    context = options.data;
  }

  var frame = createFrame(context);
  if (typeof(options) !== 'object') {
    options = {};
  }

  // extend the frame with hash arguments
  frame.extend(options.hash);
  return options.fn(this, { data: frame });
}

/**
 * Return the given value of `prop` from `this.options`.
 *
 * ```handlebars
 * <!-- context = {options: {a: {b: {c: 'ddd'}}}} -->
 * {{option 'a.b.c'}}
 * <!-- results => `ddd` -->
 * ```
 * @param {String} `prop`
 * @return {any}
 * @api public
 */

export function option(prop, locals, options) {
  return getValue(_options(this, locals, options), prop);
}

/**
 * Block helper that renders the block without taking any arguments.
 *
 * @param {Object} `options`
 * @return {String}
 * @block
 * @api public
 */

export function noop(options) {
  return options.fn(this);
}

/**
 * Get the native type of the given `value`
 *
 * ```handlebars
 * {{typeOf 1}}
 * //=> 'number'
 * {{typeOf '1'}}
 * //=> 'string'
 * {{typeOf 'foo'}}
 * //=> 'string'
 * ```
 * @param {any} `value`
 * @return {String} Returns the type of value.
 * @api public
 */

export function typeOf(val) { return typeof val; }

/**
 * Block helper that builds the context for the block
 * from the options hash.
 *
 * @param {Object} `options` Handlebars provided options object.
 * @contributor Vladimir Kuznetsov <https://github.com/mistakster>
 * @block
 * @api public
 */

export function withHash(options) {
  if (options.hash && Object.keys(options.hash).length) {
    return options.fn(options.hash);
  } else {
    return options.inverse(this);
  }
}
