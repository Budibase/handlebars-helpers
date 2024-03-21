'use strict';

import { isString, isObject, options as _options } from 'handlebars-utils';
import { changecase, chop } from './utils';

/**
 * Append the specified `suffix` to the given string.
 *
 * ```handlebars
 * <!-- given that 'item.stem' is 'foo' -->
 * {{append item.stem '.html'}}
 * <!-- results in:  'foo.html' -->
 * ```
 * @param {String} `str`
 * @param {String} `suffix`
 * @return {String}
 * @api public
 * @example {{append 'index' '.html'}} -> index.html
 */

export function append(str, suffix) {
  if (typeof str === 'string' && typeof suffix === 'string') {
    return str + suffix;
  }
  return str;
}

/**
 * camelCase the characters in the given `string`.
 *
 * ```handlebars
 * {{camelcase 'foo bar baz'}};
 * <!-- results in:  'fooBarBaz' -->
 * ```
 * @param {String} `string` The string to camelcase.
 * @return {String}
 * @api public
 * @example {{camelcase 'foo bar baz'}} ->  fooBarBaz
 */

export function camelcase(str) {
  if (typeof (str) !== 'string') return '';
  return changecase(str, function (ch) {
    return ch.toUpperCase();
  });
}

/**
 * Capitalize the first word in a sentence.
 *
 * ```handlebars
 * {{capitalize 'foo bar baz'}}
 * <!-- results in:  'Foo bar baz' -->
 * ```
 * @param {String} `str`
 * @return {String}
 * @api public
 * @example {{capitalize 'foo bar baz'}} ->  Foo bar baz
 */

export function capitalize(str) {
  if (typeof (str) !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Capitalize all words in a string.
 *
 * ```handlebars
 * {{capitalizeAll 'foo bar baz'}}
 * <!-- results in:  'Foo Bar Baz' -->
 * ```
 * @param {String} `str`
 * @return {String}
 * @api public
 * @example {{ capitalizeAll 'foo bar baz'}} ->  Foo Bar Baz
 */

export function capitalizeAll(str) {
  if (typeof (str) !== 'string') return '';
  if (isString(str)) {
    return str.replace(/\w\S*/g, function (word) {
      return capitalize(word);
    });
  }
}

/**
 * Center a string using non-breaking spaces
 *
 * @param {String} `str`
 * @param {String} `spaces`
 * @return {String}
 * @api public
 * @example {{ center 'test' 1}} -> ' test '
 */

export function center(str, spaces) {
  if (typeof (str) !== 'string') return '';
  var space = '';
  var i = 0;
  while (i < spaces) {
    space += '&nbsp;';
    i++;
  }
  return space + str + space;
}

/**
 * Like trim, but removes both extraneous whitespace **and
 * non-word characters** from the beginning and end of a string.
 *
 * ```handlebars
 * {{chop '_ABC_'}}
 * <!-- results in:  'ABC' -->
 *
 * {{chop '-ABC-'}}
 * <!-- results in:  'ABC' -->
 *
 * {{chop ' ABC '}}
 * <!-- results in:  'ABC' -->
 * ```
 * @param {String} `string` The string to chop.
 * @return {String}
 * @api public
 * @example {{ chop ' ABC '}} -> ABC
 */

export function chop(str) {
  if (typeof (str) !== 'string') return '';
  return chop(str);
}

/**
 * dash-case the characters in `string`. Replaces non-word
 * characters and periods with hyphens.
 *
 * ```handlebars
 * {{dashcase 'a-b-c d_e'}}
 * <!-- results in:  'a-b-c-d-e' -->
 * ```
 * @param {String} `string`
 * @return {String}
 * @api public
 * @example {{dashcase 'a-b-c d_e'}} -> a-b-c-d-e
 */

export function dashcase(str) {
  if (typeof (str) !== 'string') return '';
  return changecase(str, function (ch) {
    return '-' + ch;
  });
}

/**
 * dot.case the characters in `string`.
 *
 * ```handlebars
 * {{dotcase 'a-b-c d_e'}}
 * <!-- results in:  'a.b.c.d.e' -->
 * ```
 * @param {String} `string`
 * @return {String}
 * @api public
 * @example {{dotcase 'a-b-c d_e'}} -> a.b.c.d.e
 */

export function dotcase(str) {
  if (typeof (str) !== 'string') return '';
  return changecase(str, function (ch) {
    return '.' + ch;
  });
}

/**
 * Lowercase all of the characters in the given string. Alias for [lowercase](#lowercase).
 *
 * ```handlebars
 * {{downcase 'aBcDeF'}}
 * <!-- results in:  'abcdef' -->
 * ```
 * @param {String} `string`
 * @return {String}
 * @alias lowercase
 * @api public
 * @example {{downcase 'aBcDeF'}} -> abcdef

 */

export function downcase() {
  return lowercase.apply(this, arguments);
}

/**
 * Truncates a string to the specified `length`, and appends
 * it with an elipsis, `…`.
 *
 * ```handlebars
 * {{ellipsis (sanitize '<span>foo bar baz</span>'), 7}}
 * <!-- results in:  'foo bar…' -->
 * {{ellipsis 'foo bar baz', 7}}
 * <!-- results in:  'foo bar…' -->
 * ```
 * @param {String} `str`
 * @param {Number} `length` The desired length of the returned string.
 * @return {String} The truncated string.
 * @api public
 * @example {{ellipsis 'foo bar baz' 7}} -> foo bar…
 */

export function ellipsis(str, limit) {
  if (isString(str)) {
    if (str.length <= limit) {
      return str;
    }
    return truncate(str, limit) + '…';
  }
}

/**
 * Replace spaces in a string with hyphens.
 *
 * ```handlebars
 * {{hyphenate 'foo bar baz qux'}}
 * <!-- results in:  'foo-bar-baz-qux' -->
 * ```
 * @param {String} `str`
 * @return {String}
 * @api public
 * @example {{hyphenate 'foo bar baz qux'}} -> foo-bar-baz-qux
 */

export function hyphenate(str) {
  if (typeof (str) !== 'string') return '';
  return str.split(' ').join('-');
}

/**
 * Return true if `value` is a string.
 *
 * ```handlebars
 * {{isString 'foo'}}
 * <!-- results in:  'true' -->
 * ```
 * @param {String} `value`
 * @return {Boolean}
 * @api public
 * @example {{isString 'foo'}} -> true
 */

export function isString(value) {
  return typeof value === 'string';
}

/**
 * Lowercase all characters in the given string.
 *
 * ```handlebars
 * {{lowercase 'Foo BAR baZ'}}
 * <!-- results in:  'foo bar baz' -->
 * ```
 * @param {String} `str`
 * @return {String}
 * @api public
 * @example {{lowercase 'Foo BAR baZ'}} -> foo bar baz
 */

export function lowercase(str) {
  if (isObject(str) && str.fn) {
    return str.fn(this).toLowerCase();
  }
  if (typeof (str) !== 'string') return '';
  return str.toLowerCase();
}

/**
 * Return the number of occurrences of `substring` within the
 * given `string`.
 *
 * ```handlebars
 * {{occurrences 'foo bar foo bar baz' 'foo'}}
 * <!-- results in:  2 -->
 * ```
 * @param {String} `str`
 * @param {String} `substring`
 * @return {Number} Number of occurrences
 * @api public
 * @example {{occurrences 'foo bar foo bar baz' 'foo'}} -> 2
 */

export function occurrences(str, substring) {
  if (typeof (str) !== 'string') return '';
  var len = substring.length;
  var pos = 0;
  var n = 0;

  while ((pos = str.indexOf(substring, pos)) > -1) {
    n++;
    pos += len;
  }
  return n;
}

/**
 * PascalCase the characters in `string`.
 *
 * ```handlebars
 * {{pascalcase 'foo bar baz'}}
 * <!-- results in:  'FooBarBaz' -->
 * ```
 * @param {String} `string`
 * @return {String}
 * @api public
 * @example {{pascalcase 'foo bar baz'}} -> FooBarBaz
 */

export function pascalcase(str) {
  if (typeof (str) !== 'string') return '';
  str = changecase(str, function (ch) {
    return ch.toUpperCase();
  });
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * path/case the characters in `string`.
 *
 * ```handlebars
 * {{pathcase 'a-b-c d_e'}}
 * <!-- results in:  'a/b/c/d/e' -->
 * ```
 * @param {String} `string`
 * @return {String}
 * @api public
 * @example {{pathcase 'a-b-c d_e'}} -> a/b/c/d/e
 */

export function pathcase(str) {
  if (typeof (str) !== 'string') return '';
  return changecase(str, function (ch) {
    return '/' + ch;
  });
}

/**
 * Replace spaces in the given string with pluses.
 *
 * ```handlebars
 * {{plusify 'foo bar baz'}}
 * <!-- results in:  'foo+bar+baz' -->
 * ```
 * @param {String} `str` The input string
 * @return {String} Input string with spaces replaced by plus signs
 * @source Stephen Way <https://github.com/stephenway>
 * @api public
 * @example {{plusify 'foo bar baz'}} -> foo+bar+baz
 */

export function plusify(str, ch) {
  if (typeof (str) !== 'string') return '';
  if (!isString(ch)) ch = ' ';
  return str.split(ch).join('+');
}

/**
 * Prepends the given `string` with the specified `prefix`.
 *
 * ```handlebars
 * <!-- given that 'val' is 'bar' -->
 * {{prepend val 'foo-'}}
 * <!-- results in:  'foo-bar' -->
 * ```
 * @param {String} `str`
 * @param {String} `prefix`
 * @return {String}
 * @api public
 * @example {{prepend 'bar' 'foo-'}} -> foo-bar
 */

export function prepend(str, prefix) {
  return typeof str === 'string' && typeof prefix === 'string'
    ? (prefix + str)
    : str;
}

/**
 * Render a block without processing mustache templates inside the block.
 *
 * ```handlebars
 * {{{{raw}}}}
 * {{foo}}
 * {{{{/raw}}}}
 * <!-- results in:  '{{foo}}' -->
 * ```
 *
 * @param {Object} `options`
 * @return {String}
 * @block
 * @api public
 * @example {{{{raw}}}}{{foo}}{{{{/raw}}}} -> \{{foo}}
 */

export function raw(options) {
  var str = options.fn();
  var opts = _options(this, options);
  if (opts.escape !== false) {
    var idx = 0;
    while (((idx = str.indexOf('{{', idx)) !== -1)) {
      if (str[idx - 1] !== '\\') {
        str = str.slice(0, idx) + '\\' + str.slice(idx);
      }
      idx += 3;
    }
  }
  return str;
}

/**
 * Remove all occurrences of `substring` from the given `str`.
 *
 * ```handlebars
 * {{remove 'a b a b a b' 'a '}}
 * <!-- results in:  'b b b' -->
 * ```
 * @param {String} `str`
 * @param {String} `substring`
 * @return {String}
 * @api public
 * @example {{remove 'a b a b a b' 'a '}} -> b b b
 */

export function remove(str, ch) {
  if (typeof (str) !== 'string') return '';
  if (!isString(ch)) return str;
  return str.split(ch).join('');
}

/**
 * Remove the first occurrence of `substring` from the given `str`.
 *
 * ```handlebars
 * {{remove 'a b a b a b' 'a'}}
 * <!-- results in:  ' b a b a b' -->
 * ```
 * @param {String} `str`
 * @param {String} `substring`
 * @return {String}
 * @api public
 * @example {{removeFirst 'a b a b a b' 'a'}} -> ' b a b a b'
 */

export function removeFirst(str, ch) {
  if (typeof (str) !== 'string') return '';
  if (!isString(ch)) return str;
  return str.replace(ch, '');
}

/**
 * Replace all occurrences of substring `a` with substring `b`.
 *
 * ```handlebars
 * {{replace 'a b a b a b' 'a' 'z'}}
 * <!-- results in:  'z b z b z b' -->
 * ```
 * @param {String} `str`
 * @param {String} `a`
 * @param {String} `b`
 * @return {String}
 * @api public
 * @example {{replace 'a b a b a b' 'a' 'z'}} -> z b z b z b
 */

export function replace(str, a, b) {
  if (typeof (str) !== 'string') return '';
  if (!isString(a)) return str;
  if (!isString(b)) b = '';
  return str.split(a).join(b);
}

/**
 * Replace the first occurrence of substring `a` with substring `b`.
 *
 * ```handlebars
 * {{replace 'a b a b a b' 'a' 'z'}}
 * <!-- results in:  'z b a b a b' -->
 * ```
 * @param {String} `str`
 * @param {String} `a`
 * @param {String} `b`
 * @return {String}
 * @api public
 * @example {{replaceFirst 'a b a b a b' 'a' 'z'}} -> z b a b a b
 */

export function replaceFirst(str, a, b) {
  if (typeof (str) !== 'string') return '';
  if (!isString(a)) return str;
  if (!isString(b)) b = '';
  return str.replace(a, b);
}

export { reverse } from './array'

/**
 * Sentence case the given string
 *
 * ```handlebars
 * {{sentence 'hello world. goodbye world.'}}
 * <!-- results in:  'Hello world. Goodbye world.' -->
 * ```
 * @param {String} `str`
 * @return {String}
 * @api public
 * @example {{sentence 'hello world. goodbye world.'}} -> Hello world. Goodbye world.
 */

export function sentence(str) {
  if (typeof (str) !== 'string') return '';
  return str.replace(/((?:\S[^\.\?\!]*)[\.\?\!]*)/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

/**
 * snake_case the characters in the given `string`.
 *
 * ```handlebars
 * {{snakecase 'a-b-c d_e'}}
 * <!-- results in:  'a_b_c_d_e' -->
 * ```
 * @param {String} `string`
 * @return {String}
 * @api public
 * @example {{snakecase 'a-b-c d_e'}} -> a_b_c_d_e
 */

export function snakecase(str) {
  if (typeof (str) !== 'string') return '';
  return changecase(str, function (ch) {
    return '_' + ch;
  });
}

/**
 * Split `string` by the given `character`.
 *
 * ```handlebars
 * {{split 'a,b,c' ','}}
 * <!-- results in:  ['a', 'b', 'c'] -->
 * ```
 * @param {String} `string` The string to split.
 * @return {String} `character` Default is an empty string.
 * @api public
 * @example {{split 'a,b,c'}} -> ['a', 'b', 'c']
 */

export function split(str, ch) {
  if (typeof (str) !== 'string') return '';
  if (!isString(ch)) ch = ',';
  return str.split(ch);
}

/**
 * Tests whether a string begins with the given prefix.
 *
 * ```handlebars
 * {{#startsWith 'Goodbye' 'Hello, world!'}}
 *   Whoops
 * {{else}}
 *   Bro, do you even hello world?
 * {{/startsWith}}
 * ```
 * @contributor Dan Fox <http://github.com/iamdanfox>
 * @param {String} `prefix`
 * @param {String} `testString`
 * @param {String} `options`
 * @return {String}
 * @block
 * @api public
 * @example {{#startsWith 'Goodbye' 'Hello, world!'}}Yep{{else}}Nope{{/startsWith}} -> Nope
 */

export function startsWith(prefix, str, options) {
  var args = [].slice.call(arguments);
  options = args.pop();
  if (isString(str) && str.indexOf(prefix) === 0) {
    return options.fn(this);
  }
  if (typeof options.inverse === 'function') {
    return options.inverse(this);
  }
  return '';
}

/**
 * Title case the given string.
 *
 * ```handlebars
 * {{titleize 'this is title case'}}
 * <!-- results in:  'This Is Title Case' -->
 * ```
 * @param {String} `str`
 * @return {String}
 * @api public
 * @example {{titleize 'this is title case' }} -> This Is Title Case
 */

export function titleize(str) {
  if (typeof (str) !== 'string') return '';
  var title = str.replace(/[- _]+/g, ' ');
  var words = title.split(' ');
  var len = words.length;
  var res = [];
  var i = 0;
  while (len--) {
    var word = words[i++];
    res.push(capitalize(word));
  }
  return res.join(' ');
}

/**
 * Removes extraneous whitespace from the beginning and end
 * of a string.
 *
 * ```handlebars
 * {{trim ' ABC '}}
 * <!-- results in:  'ABC' -->
 * ```
 * @param {String} `string` The string to trim.
 * @return {String}
 * @api public
 * @example {{trim '  ABC  ' }} -> ABC
 */

export function trim(str) {
  return typeof str === 'string' ? str.trim() : '';
}

/**
 * Removes extraneous whitespace from the beginning of a string.
 *
 * ```handlebars
 * {{trim ' ABC '}}
 * <!-- results in:  'ABC ' -->
 * ```
 * @param {String} `string` The string to trim.
 * @return {String}
 * @api public
 * @example {{trimLeft '  ABC ' }} -> 'ABC '
 */

export function trimLeft(str) {
  if (isString(str)) {
    return str.replace(/^\s+/, '');
  }
}

/**
 * Removes extraneous whitespace from the end of a string.
 *
 * ```handlebars
 * {{trimRight ' ABC '}}
 * <!-- results in:  ' ABC' -->
 * ```
 * @param {String} `string` The string to trim.
 * @return {String}
 * @api public
 * @example {{trimRight '  ABC ' }} ->  '  ABC'
 */

export function trimRight(str) {
  if (isString(str)) {
    return str.replace(/\s+$/, '');
  }
}

/**
 * Truncate a string to the specified `length`. Also see [ellipsis](#ellipsis).
 *
 * ```handlebars
 * truncate('foo bar baz', 7);
 * <!-- results in:  'foo bar' -->
 * truncate(sanitize('<span>foo bar baz</span>', 7));
 * <!-- results in:  'foo bar' -->
 * ```
 * @param {String} `str`
 * @param {Number} `limit` The desired length of the returned string.
 * @param {String} `suffix` Optionally supply a string to use as a suffix to
 * denote when the string has been truncated. Otherwise an ellipsis (`…`) will be used.
 * @return {String} The truncated string.
 * @api public
 * @example {{truncate 'foo bar baz' 7 }} -> foo bar
 */

export function truncate(str, limit, suffix) {
  if (isString(str)) {
    if (typeof suffix !== 'string') {
      suffix = '';
    }
    if (str.length > limit) {
      return str.slice(0, limit - suffix.length) + suffix;
    }
    return str;
  }
}

/**
 * Truncate a string to have the specified number of words.
 * Also see [truncate](#truncate).
 *
 * ```handlebars
 * truncateWords('foo bar baz', 1);
 * <!-- results in:  'foo…' -->
 * truncateWords('foo bar baz', 2);
 * <!-- results in:  'foo bar…' -->
 * truncateWords('foo bar baz', 3);
 * <!-- results in:  'foo bar baz' -->
 * ```
 * @param {String} `str`
 * @param {Number} `limit` The desired length of the returned string.
 * @param {String} `suffix` Optionally supply a string to use as a suffix to
 * denote when the string has been truncated.
 * @return {String} The truncated string.
 * @api public
 * @example {{truncateWords 'foo bar baz' 1 }} -> foo…
 */

export function truncateWords(str, count, suffix) {
  if (isString(str) && !isNaN(count)) {
    if (typeof suffix !== 'string') {
      suffix = '…';
    }

    var num = Number(count);
    var arr = str.split(/[ \t]/);
    if (num >= arr.length) {
      return str;
    }

    arr = arr.slice(0, num);
    var val = arr.join(' ').trim();
    return val + suffix;
  }
}

/**
 * Uppercase all of the characters in the given string. Alias for [uppercase](#uppercase).
 *
 * ```handlebars
 * {{upcase 'aBcDeF'}}
 * <!-- results in:  'ABCDEF' -->
 * ```
 * @param {String} `string`
 * @return {String}
 * @alias uppercase
 * @api public
 * @example {{upcase 'aBcDef'}} -> ABCDEF
 */

export function upcase() {
  return uppercase.apply(this, arguments);
}

/**
 * Uppercase all of the characters in the given string. If used as a
 * block helper it will uppercase the entire block. This helper
 * does not support inverse blocks.
 *
 * ```handlebars
 * {{uppercase 'aBcDeF'}}
 * <!-- results in:  'ABCDEF' -->
 * ```
 * @related capitalize capitalizeAll
 * @param {String} `str` The string to uppercase
 * @param {Object} `options` Handlebars options object
 * @return {String}
 * @block
 * @inline
 * @api public
 * @example {{uppercase 'aBcDef'}} -> ABCDEF
 */

export function uppercase(str) {
  if (isObject(str) && str.fn) {
    return str.fn(this).toUpperCase();
  }
  if (typeof (str) !== 'string') return '';
  return str.toUpperCase();
}
