'use strict';

import 'mocha';
import { equal } from 'assert';
import handlebars from 'handlebars';
const hbs = handlebars.create();
import { array as _array, collection, string } from '../index.js';
_array({handlebars: hbs});
collection({handlebars: hbs});
string({handlebars: hbs});

var context = {array: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']};

describe('collection', function() {
  describe('isEmpty block helper', function() {
    it('should render the first block when an array is empty', function() {
      var fn = hbs.compile('{{#isEmpty array}}AAA{{else}}BBB{{/isEmpty}}');
      equal(fn({array: []}), 'AAA');
    });

    it('should render the first block when the value is null', function() {
      var fn = hbs.compile('{{#isEmpty}}AAA{{else}}BBB{{/isEmpty}}');
      equal(fn({array: []}), 'AAA');
    });

    it('should render the second block when an array is not empty', function() {
      var fn = hbs.compile('{{#isEmpty array}}AAA{{else}}BBB{{/isEmpty}}');
      equal(fn(context), 'BBB');
    });

    it('should render the second block when an object is not empty', function() {
      var fn = hbs.compile('{{#isEmpty object}}AAA{{else}}BBB{{/isEmpty}}');
      equal(fn({object: {foo: 'bar'}}), 'BBB');
    });

    it('should render the first block when an object is empty', function() {
      var fn = hbs.compile('{{#isEmpty object}}AAA{{else}}BBB{{/isEmpty}}');
      equal(fn({object: {}}), 'AAA');
    });
  });

  describe('isEmpty inline helper', function() {
    it('should render the first block when an array is empty', function() {
      var fn = hbs.compile('{{isEmpty array}}');
      equal(fn({array: []}), 'true');
    });

    it('should render the first block when the value is null', function() {
      var fn = hbs.compile('{{isEmpty}}');
      equal(fn({array: []}), 'true');
    });

    it('should render the second block when an array is not empty', function() {
      var fn = hbs.compile('{{isEmpty array}}');
      equal(fn(context), 'false');
    });

    it('should render the second block when an object is not empty', function() {
      var fn = hbs.compile('{{isEmpty object}}');
      equal(fn({object: {foo: 'bar'}}), 'false');
    });

    it('should render the first block when an object is empty', function() {
      var fn = hbs.compile('{{isEmpty object}}');
      equal(fn({object: {}}), 'true');
    });
  });

  describe('iterate', function() {
    describe('object', function() {
      it('should iterate over a plain object:', function() {
        var obj = {a: 'aaa', b: 'bbb', c: 'ccc'};

        var fn = hbs.compile('{{#iterate obj}}{{.}}{{/iterate}}');
        equal(fn({obj: obj}), 'aaabbbccc');
      });

      it('should expose `@key`:', function() {
        var obj = {a: 'aaa', b: 'bbb', c: 'ccc'};

        var fn = hbs.compile('{{#iterate obj}}{{@key}}{{/iterate}}');
        equal(fn({obj: obj}), 'abc');
      });

      it('should render the inverse block when falsey:', function() {
        var fn = hbs.compile('{{#iterate obj}}A{{else}}B{{/iterate}}');
        equal(fn(), 'B');
      });
    });

    describe('array', function() {
      it('should iterate over an array:', function() {
        var arr = [{name: 'a'}, {name: 'b'}, {name: 'c'}];

        var fn = hbs.compile('{{#iterate arr}}{{name}}{{/iterate}}');
        equal(fn({arr: arr}), 'abc');
      });

      it('should expose `@index`:', function() {
        var arr = [{name: 'a'}, {name: 'b'}, {name: 'c'}];

        var fn = hbs.compile('{{#iterate arr}}{{@index}}{{/iterate}}');
        equal(fn({arr: arr}), '012');
      });
    });
  });

  describe('length', function() {
    it('should return the length of the array', function() {
      var fn = hbs.compile('{{length array}}');
      equal(fn(context), '8');
    });

    it('should return zero when undefined', function() {
      equal(hbs.compile('{{length}}')(), '0');
    });

    it('should return the length of a string', function() {
      var fn = hbs.compile('{{length "foo"}}');
      equal(fn(context), '3');
    });

    it('should work with arrays passed via subexpression', function() {
      var fn = hbs.compile('{{length (split "b,c,a")}}');
      equal(fn(context), '3');
    });

    it('should return 0 when the array is invalid:', function() {
      var fn = hbs.compile('{{length foo}}');
      equal(fn(context), '0');
    });

    it('should return 0 when the value is not an array:', function() {
      var fn = hbs.compile('{{length foo}}');
      equal(fn({foo: {}}), '0');
    });
  });
});
