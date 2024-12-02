/*!
 * handlebars-helpers <https://github.com/helpers/handlebars-helpers>
 *
 * Copyright (c) 2013-2017, Jon Schlinkert, Brian Woodward.
 * Released under the MIT License.
 */

'use strict';

import lib from './lib/';

/**
 * Expose helpers
 */

export default function helpers(groups, options) {
  if (typeof groups === 'string') {
    groups = [groups];
  } else if (!Array.isArray(groups)) {
    options = groups;
    groups = null;
  }

  options = options || {};
  var hbs = options.handlebars || options.hbs || require('handlebars');
  module.exports.handlebars = hbs;

  if (groups) {
    groups.forEach(function(key) {
      hbs.registerHelper(lib[key]);
    });
  } else {
    for (const key in lib) {
      const group = lib[key];
      hbs.registerHelper(group);
    }
  }

  return hbs.helpers;
};

/**
 * Expose helper groups
 */
for (const key in lib) {
  const group = lib[key];

  module.exports[key] = function(options) {
    options = options || {};
    var hbs = options.handlebars || options.hbs || require('handlebars');
    module.exports.handlebars = hbs;
    hbs.registerHelper(group);
    return group;
  };
}

export const utils = require('./lib/utils');
