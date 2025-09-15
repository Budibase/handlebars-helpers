'use strict';

import { equal } from 'assert';
import 'mocha';
import * as utils from '../lib/utils/index.js';
import * as HTML from '../lib/utils/html.js';

describe('utils', function() {
  describe('chop', function() {
    it('should return an empty string if undefined', function() {
      equal(utils.chop(), '');
    });
    it('should remove non-word characters from start of string', function() {
      equal(utils.chop('- foo bar baz'), 'foo bar baz');
    });
    it('should remove non-word characters from end of string', function() {
      equal(utils.chop('foo bar baz _- '), 'foo bar baz');
    });
  });

  describe('changecase', function() {
    it('should return an empty string if undefined', function() {
      equal(utils.changecase(), '');
    });
    it('should lowercase a mixed case string', function() {
      equal(utils.changecase('fooBarBazQux'), 'foobarbazqux');
    });
    it('should lowercase a single character', function() {
      equal(utils.changecase('f'), 'f');
      equal(utils.changecase('A'), 'a');
    });
  });

  describe('html', function() {
    describe('condense', function() {
      it('should condense multiple newlines into a single newline', function() {
        equal(HTML.condense('foo\r\n  \r\n  bar\n'), 'foo\n\nbar\n');
      });
    });

    describe('padcomments', function() {
      it('should add newlines around comments', function() {
        equal(HTML.padcomments('<!-- foo -->'), '\n<!-- foo -->');
      });
    });

    describe('parseAttributes', function() {
      it('should parse attributes', function() {
        equal(HTML.parseAttributes({a: 'b', c: 200 }), 'a="b" c="200"');
      });
    });

    describe('toAttributes', function() {
      it('should convert an object hash into html attributes', function() {
        var hash = {disabled: true, display: 'hidden', class: 'fade'};
        equal(HTML.toAttributes(hash), ' disabled display="hidden" class="fade"');
      });
    });
  });
});
