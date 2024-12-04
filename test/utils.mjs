'use strict';

import 'mocha';
import { equal } from 'assert';
import { chop, changecase } from '../lib/utils/index.mjs';
import { condense, padcomments, parseAttributes, toAttributes } from '../lib/utils/html.mjs';

describe('utils', function() {
  describe('chop', function() {
    it('should return an empty string if undefined', function() {
      equal(chop(), '');
    });
    it('should remove non-word characters from start of string', function() {
      equal(chop('- foo bar baz'), 'foo bar baz');
    });
    it('should remove non-word characters from end of string', function() {
      equal(chop('foo bar baz _- '), 'foo bar baz');
    });
  });

  describe('changecase', function() {
    it('should return an empty string if undefined', function() {
      equal(changecase(), '');
    });
    it('should lowercase a mixed case string', function() {
      equal(changecase('fooBarBazQux'), 'foobarbazqux');
    });
    it('should lowercase a single character', function() {
      equal(changecase('f'), 'f');
      equal(changecase('A'), 'a');
    });
  });

  describe('html', function() {
    describe('condense', function() {
      it('should condense multiple newlines into a single newline', function() {
        equal(condense('foo\r\n  \r\n  bar\n'), 'foo\n\nbar\n');
      });
    });

    describe('padcomments', function() {
      it('should add newlines around comments', function() {
        equal(padcomments('<!-- foo -->'), '\n<!-- foo -->');
      });
    });

    describe('parseAttributes', function() {
      it('should parse attributes', function() {
        equal(parseAttributes({a: 'b', c: 200 }), 'a="b" c="200"');
      });
    });

    describe('toAttributes', function() {
      it('should convert an object hash into html attributes', function() {
        var hash = {disabled: true, display: 'hidden', class: 'fade'};
        equal(toAttributes(hash), ' disabled display="hidden" class="fade"');
      });
    });
  });
});
