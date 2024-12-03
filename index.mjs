/*!
 * handlebars-helpers <https://github.com/helpers/handlebars-helpers>
 *
 * Copyright (c) 2013-2017, Jon Schlinkert, Brian Woodward.
 * Released under the MIT License.
 */

'use strict';

import lib from './lib/index.mjs';
// TODO: import only when required
import Handlebars from 'handlebars';

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
  var hbs = options.handlebars || options.hbs || Handlebars;

  if (groups) {
    groups.forEach(function(key) {
      hbs.registerHelper({...lib[key]});
    });
  } else {
    for (const key in lib) {
      const group = lib[key];
      hbs.registerHelper({...group});
    }
  }

  return hbs.helpers;
};

/**
 * Expose helper groups
 */
function exportGroup(group) {
  return function(options) {
    options = options || {};
    var hbs = options.handlebars || options.hbs || Handlebars;
    hbs.registerHelper({...group});
    return group;
  }; 
};

export const array = exportGroup(lib.array);
export const code = exportGroup(lib.code);
export const collection = exportGroup(lib.collection);
export const comparison = exportGroup(lib.comparison);
export const html = exportGroup(lib.html);
export const i18n = exportGroup(lib.i18n);
export const inflection = exportGroup(lib.inflection);
export const match = exportGroup(lib.match);
export const math = exportGroup(lib.math);
export const misc = exportGroup(lib.misc);
export const number = exportGroup(lib.number);
export const object = exportGroup(lib.object);
export const path = exportGroup(lib.path);
export const regex = exportGroup(lib.regex);
export const string = exportGroup(lib.string);
export const url = exportGroup(lib.url);
export const uuid = exportGroup(lib.uuid);

import * as _utils from './lib/utils/index.js';
export const utils = _utils;
