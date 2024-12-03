'use strict';

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { isOptions } from './utils/handlebarsUtils';
import { bytes } from './number';

import kindOf from 'kind-of';
import isGlob from 'is-glob';
import { matcher } from 'micromatch';

export const fileSize = bytes;

/**
 * Read a file from the file system. This is useful in composing
 * 'include'-style helpers using sub-expressions.
 *
 * ```handlebars
 * {{read 'a/b/c.js'}}
 * {{someHelper (read 'a/b/c.md')}}
 * ```
 * @param {String} `filepath`
 * @return {String}
 * @api public
 */

export function read(filepath, options) {
  return readFileSync(filepath, 'utf8');
}

/**
 * Return an array of files from the given
 * directory.
 *
 * @param {String} `directory`
 * @return {Array}
 * @api public
 */

export function readdir(dir, filter) {
  var files = readdirSync(dir);
  files = files.map(function(fp) {
    return join(dir, fp);
  });
  if (isOptions(filter)) {
    return files;
  }
  if (typeof filter === 'function') {
    return filter(files);
  }
  if (kindOf(filter) === 'regexp') {
    return files.filter(function(fp) {
      return filter.test(fp);
    });
  }
  if (isGlob(filter)) {
    return files.filter(matcher(filter));
  }
  if (['isFile', 'isDirectory'].indexOf(filter) !== -1) {
    return files.filter(function(fp) {
      var stat = statSync(fp);
      return stat[filter]();
    });
  }
  return files;
}
