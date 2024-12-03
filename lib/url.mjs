'use strict';

import { resolve, parse } from 'url';
import util from './utils/index.js';
import * as qs from 'querystring';

/**
 * Encodes a Uniform Resource Identifier (URI) component
 * by replacing each instance of certain characters by
 * one, two, three, or four escape sequences representing
 * the UTF-8 encoding of the character.
 *
 * @param {String} `str` The un-encoded string
 * @return {String} The endcoded string
 * @api public
 * @example {{ encodeURI 'https://myurl?Hello There' }} -> https%3A%2F%2Fmyurl%3FHello%20There
 */

export function encodeURI(str) {
  if (util.isString(str)) {
    return encodeURIComponent(str);
  }
}

/**
 * Escape the given string by replacing characters with escape sequences.
 * Useful for allowing the string to be used in a URL, etc.
 *
 * @param {String} `str`
 * @return {String} Escaped string.
 * @api public
 * @example {{ escape 'https://myurl?Hello+There' }} -> https%3A%2F%2Fmyurl%3FHello%2BThere
 */

export function escape(str) {
  if (util.isString(str)) {
    return qs.escape(str);
  }
}

/**
 * Decode a Uniform Resource Identifier (URI) component.
 *
 * @param {String} `str`
 * @return {String}
 * @api public
 * @example {{ decodeURI 'https://myurl?Hello%20There' }} -> https://myurl?Hello There
 */

export function decodeURI(str) {
  if (util.isString(str)) {
    return decodeURIComponent(str);
  }
}

/**
 * Take a base URL, and a href URL, and resolve them as a
 * browser would for an anchor tag.
 *
 * @param {String} `base`
 * @param {String} `href`
 * @return {String}
 * @api public
 * @example {{ urlResolve 'https://myurl' '/api/test' }} -> https://myurl/api/test
 */

export function urlResolve(base, href) {
  return resolve(base, href);
}

/**
 * Parses a `url` string into an object.
 *
 * @param {String} `str` URL string
 * @return {String} Returns stringified JSON
 * @api public
 * @example {{ urlParse 'https://myurl/api/test' }} 
 */

export function urlParse(str) {
  return parse(str);
}

/**
 * Strip the query string from the given `url`.
 *
 * @param {String} `url`
 * @return {String} the url without the queryString
 * @api public
 * @example {{ stripQuerystring 'https://myurl/api/test?foo=bar' }} -> 'https://myurl/api/test'
 */

export function stripQuerystring(str) {
  if (util.isString(str)) {
    return str.split('?')[0];
  }
}

/**
 * Strip protocol from a `url`. Useful for displaying media that
 * may have an 'http' protocol on secure connections.
 *
 * ```handlebars
 * <!-- url = 'http://foo.bar' -->
 * {{stripProtocol url}}
 * <!-- results in: '//foo.bar' -->
 * ```
 * @param {String} `str`
 * @return {String} the url with http protocol stripped
 * @api public
 * @example {{ stripProtocol 'https://myurl/api/test' }} -> '//myurl/api/test'
 */

export function stripProtocol(str) {
  if (util.isString(str)) {
    var parsed = parse(str);
    parsed.protocol = '';
    return parsed.format();
  }
}
