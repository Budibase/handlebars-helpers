'use strict';

import * as utils from './utils/index.js';

import micromatch from 'micromatch';

/**
 * Returns an array of strings that match the given glob pattern(s).
 * Options may be passed on the options hash or locals.
 *
 * ```handlebars
 * {{match (readdir 'foo') '*.js'}}
 * {{match (readdir 'foo') (toRegex '\\.js$')}}
 * ```
 * @param {Array|String} `files`
 * @param {Array|String} `patterns` One or more glob patterns.
 * @param {Object} `locals`
 * @param {Object} `options`
 * @return {Array} Array of matches
 * @api public
 */

export function match(files, patterns, locals, options) {
  var opts = utils.options(this, locals, options);
  if (typeof patterns === 'string') {
    patterns = patterns.split(/, */);
  }
  return micromatch(files, patterns, opts);
}

/**
 * Returns true if a filepath contains the given pattern.
 * Options may be passed on the options hash or locals.
 *
 * ```handlebars
 * {{isMatch 'foo.md' '*.md'}}
 * <!-- results in: true -->
 * ```
 *
 * @param {String} `filepath`
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {Boolean}
 * @api public
 */

export function isMatch(files, patterns, locals, options) {
  var opts = utils.options(this, locals, options);
  return micromatch.isMatch(files, patterns, opts);
}

/**
 * Alias for micromatch helper. Deprecated in v0.9.0.
 */

export function mm() {
  console.log('the {{mm}} helper is depcrecated and will be removed');
  console.log('in handlebars-helpers v1.0.0, please use the {{match}}');
  console.log('helper instead.');
  return match.apply(this, arguments);
}
