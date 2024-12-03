'use strict';

const inverse = require('./inverse');
const identity = require('./identity');
const isBlock = require('./isBlock');
const isOptions = require('./isOptions');

/**
 * This code was taken directly from handlebars-helpers,
 * https://github.com/helpers/handlebars-utils/blob/master/index.js#L398
 * 
 * that was taken directly from handlebars.
 * https://github.com/wycats/handlebars.js/blob/b55a120e8222785db3dc00096f6afbf91b656e8a/LICENSE
 * Released under the MIT License
 * Copyright (C) 2011-2016 by Yehuda Katz
 */

/**
 * Returns the given value or renders the inverse block if it's a block helper.
 *
 * ```js
 * Handlebars.registerHelper('example', function(val, locals, options) {
 *   return utils.inverse(val, locals, options);
 * });
 * ```
 * @param {any} `val`
 * @param {Object} `options`
 * @param {Object} `context`
 * @return {String} Either returns the value, or renders the inverse block.
 * @api public
 */

module.exports = function(val, context, options) {
  if (isOptions(val)) {
    return identity('', val, options);
  }
  if (isOptions(context)) {
    return inverse(val, {}, context);
  }
  return isBlock(options) ? options.inverse(context) : val;
};