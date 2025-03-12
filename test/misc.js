'use strict';

import 'mocha';
import { equal } from 'assert';
import handlebars from 'handlebars';
const hbs = handlebars.create();
import { misc } from '../index.js';

describe('misc', function() {
  beforeEach(function() {
    misc({handlebars: hbs});
  });

  describe('noop', function() {
    it('should be a noop', function() {
      var fn = hbs.compile('{{#noop}}{{message}}{{/noop}}');
      equal(fn({message: 'This is a test'}), 'This is a test');
    });
  });

  describe('option', function() {
    it('should get an option', function() {
      var fn = hbs.compile('{{option "a"}}');
      equal(fn({options: {a: 'bbb'}}), 'bbb');
    });
    it('should return an empty string when no options are found', function() {
      equal(hbs.compile('{{option "a"}}')(), '');
    });
    it('should get a nested option', function() {
      var fn = hbs.compile('{{option "a.b.c"}}');
      equal(fn({options: {a: {b: {c: 'ddd'}}}}), 'ddd');
    });
    it('should work as a subexpression', function() {
      var fn = hbs.compile('{{option "a.b.c"}}');
      equal(fn({options: {a: {b: {c: 'ddd'}}}}), 'ddd');
    });
  });

  describe('withHash', function() {
    it('should return an empty sting', function() {
      var fn = hbs.compile('{{#withHash}}{{message}}{{/withHash}}');
      var actual = fn({message: 'This is a test'});
      equal(typeof actual, 'string');
      equal(actual, '');
    });
    it('should not blow up when no hash is defined.', function() {
      var fn = hbs.compile('{{#withHash}}{{/withHash}}');
      equal(fn(), '');
    });
    it('should return the inverse hash when defined and the value is falsy.', function() {
      var fn = hbs.compile('{{#withHash}}foo{{else}}bar{{/withHash}}');
      equal(fn(), 'bar');
    });
    it('should return string from the newly created context', function() {
      var fn = hbs.compile('{{#withHash message="test"}}{{message}}{{/withHash}}');
      equal(fn({message: 'This is a test'}), 'test');
    });
    it('should return string from the parent context', function() {
      var fn = hbs.compile('{{#withHash message=this.message}}{{message}}{{/withHash}}');
      equal(fn({message: 'This is a test'}), 'This is a test');
    });
    it('should add two attributes to the new context', function() {
      var fn = hbs.compile('{{#withHash subject="Feedback" message="Hello!"}}{{subject}} - {{message}}{{/withHash}}');
      equal(fn({}), 'Feedback - Hello!');
    });
  });
});
