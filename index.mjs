/*!
 * handlebars-helpers <https://github.com/helpers/handlebars-helpers>
 *
 * Copyright (c) 2013-2017, Jon Schlinkert, Brian Woodward.
 * Released under the MIT License.
 */

'use strict';

import lib from './lib/index.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);


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
function exportGroup(group){
  return  function(options) {
  options = options || {};
  var hbs = options.handlebars || options.hbs || require('handlebars');
  hbs.registerHelper(group);
  return group;
}};

export const array = exportGroup(lib.array)
export const code = exportGroup(lib.code)
export const collection = exportGroup(lib.collection)
export const comparison = exportGroup(lib.comparison)
export const html = exportGroup(lib.html)
export const i18n = exportGroup(lib.i18n)
export const inflection = exportGroup(lib.inflection)
export const match = exportGroup(lib.match)
export const math = exportGroup(lib.math)
export const misc = exportGroup(lib.misc)
export const number = exportGroup(lib.number)
export const object = exportGroup(lib.object)
export const path = exportGroup(lib.path)
export const regex = exportGroup(lib.regex)
export const string = exportGroup(lib.string)
export const url = exportGroup(lib.url)
export const uuid = exportGroup(lib.uuid)


export * as utils from './lib/utils/index.js'
