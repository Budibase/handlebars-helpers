/*!
 * handlebars-helpers <https://github.com/helpers/handlebars-helpers>
 *
 * Copyright (c) 2013-2017, Jon Schlinkert, Brian Woodward.
 * Released under the MIT License.
 */

import lib from './lib/index.js';
import * as utils from './lib/utils/index.js';

/**
 * Expose helpers
 */

function helpers(groups, options) {
  if (typeof groups === 'string') {
    groups = [groups];
  } else if (!Array.isArray(groups)) {
    options = groups;
    groups = null;
  }

  options = options || {};
  var hbs = options.handlebars || options.hbs;

  if (hbs) {
    helpers.handlebars = hbs;

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
  }

  if (hbs && hbs.helpers) {
    return hbs.helpers;
  }

  // Return raw helper functions when no handlebars is provided
  const allHelpers = {};
  for (const key in lib) {
    Object.assign(allHelpers, lib[key]);
  }
  return allHelpers;
}

/**
 * Expose helper groups
 */
for (const key in lib) {
  const group = lib[key];

  helpers[key] = function(options) {
    options = options || {};
    var hbs = options.handlebars || options.hbs;

    if (hbs) {
      helpers.handlebars = hbs;
      hbs.registerHelper(group);
    }
    return group;
  };
}

/**
 * Expose `utils`
 */
helpers.utils = utils;

export default helpers;
