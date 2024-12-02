'use strict';

import { readFileSync } from 'fs';
import { extname } from 'path';
import codeBlock from 'to-gfm-code-block';
import htmlTag from 'html-tag';

/**
 * Embed code from an external file as preformatted text.
 *
 * ```handlebars
 * {{embed 'path/to/file.js'}}
 * <!-- optionally specify the language to use -->
 * {{embed 'path/to/file.hbs' 'html')}}
 * ```
 *
 * @param {String} `filepath` filepath to the file to embed.
 * @param {String} `language` Optionally specify the language to use for syntax highlighting.
 * @return {String}
 * @api public
 */

export function embed(filepath, ext) {
  ext = typeof ext !== 'string' ? extname(filepath).slice(1) : ext;
  var code = readFileSync(filepath, 'utf8');
  if (ext === 'markdown' || ext === 'md') {
    ext = 'markdown';
    // if the string is markdown, escape backticks
    code = code.split('`').join('&#x60');
  }
  return codeBlock(code, ext).trim() + '\n';
}

/**
 * Embed a GitHub Gist using only the id of the Gist
 *
 * ```handlebars
 * {{gist '12345'}}
 * ```
 * @param {String} `id`
 * @return {String}
 * @api public
 */

export function gist(id) {
  return htmlTag('script', { src: 'https://gist.github.com/' + id + '.js' });
}

export const jsfiddle = function jsFiddle(options) {
  var attr = Object.assign({}, options && options.hash);

  if (typeof attr.id === 'undefined') {
    throw new Error('jsfiddle helper expects an `id`');
  }

  attr.id = 'http://jsfiddle.net/' + attr.id;
  attr.width = attr.width || '100%';
  attr.height = attr.height || '300';
  attr.skin = attr.skin || '/presentation/';
  attr.tabs = (attr.tabs || 'result,js,html,css') + attr.skin;
  attr.src = attr.id + '/embedded/' + attr.tabs;
  attr.allowfullscreen = attr.allowfullscreen || 'allowfullscreen';
  attr.frameborder = attr.frameborder || '0';

  delete attr.tabs;
  delete attr.skin;
  delete attr.id;
  return htmlTag('iframe', attr);
};
