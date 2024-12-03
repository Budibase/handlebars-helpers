'use strict';

import { readdirSync } from 'fs';
import assert, { equal } from 'assert';
import handlebars from 'handlebars';
const hbs = handlebars.create();
import * as helpers from '../index.mjs';
helpers.match({handlebars: hbs});

var testFiles = readdirSync('./test');
var rootFiles = readdirSync('.');

describe('matching', function() {
  describe('match', function() {
    it('should use the main micromatch function to filter an array', function() {
      var fn = hbs.compile('{{match files "(a|u)*.(mjs|js)"}}');
      equal(fn({files: testFiles}), 'array.mjs,url.mjs,utils.mjs,uuid.mjs');
    });

    it('should take an array of patterns', function() {
      var ctx = {files: testFiles, patterns: ['(a|u)*.(mjs|js)', 'f*.js']};
      var fn = hbs.compile('{{match files patterns}}');
      equal(fn(ctx), 'array.mjs,url.mjs,utils.mjs,uuid.mjs');
    });

    it('should take options from the "options[helper name]" object', function() {
      var ctx = {files: testFiles, options: {match: {dot: true}}};
      var fn = hbs.compile('{{match files "*"}}');
      assert(/array\.mjs/.test(fn(ctx)));
    });

    it('should take options from the hash', function() {
      var ctx = {files: rootFiles};
      assert(/\.gitignore/.test(hbs.compile('{{match files "*" dot=true}}')(ctx)));
      assert(!/\.gitignore/.test(hbs.compile('{{match files "*" dot=false}}')(ctx)));
    });

    it('should use return matching items', function() {
      var fn = hbs.compile('{{match files "(a|u)*.(mjs|js)"}}');
      equal(fn({files: testFiles}), 'array.mjs,url.mjs,utils.mjs,uuid.mjs');
    });

    it('should take options from the "options[helper name]" object', function() {
      var ctx = {files: rootFiles, options: {match: {dot: true}}};
      var fn = hbs.compile('{{match files "*"}}');
      assert(/\.gitignore/.test(fn(ctx)));
    });

    it('should take options from the hash', function() {
      var ctx = {files: rootFiles};
      assert(/\.gitignore/.test(hbs.compile('{{match files "*" dot=true}}')(ctx)));
      assert(!/\.gitignore/.test(hbs.compile('{{match files "*" dot=false}}')(ctx)));
    });

    it('should take options passed as the last argument', function() {
      var ctx = {files: rootFiles, options: {dot: true}};
      assert(/\.gitignore/.test(hbs.compile('{{match files "*" options}}')(ctx)));
    });
  });

  describe('isMatch', function() {
    it('should return true if the given value matches the glob', function() {
      equal(hbs.compile('{{isMatch "foo.js" "*.js"}}')(), 'true');
      equal(hbs.compile('{{isMatch "foo.js" "*.json"}}')(), 'false');
    });
  });
});