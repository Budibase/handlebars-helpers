import { equal } from 'assert';
import assert from 'assert';
import 'mocha';
import helpers from '../index.js';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const hbs = handlebars.create();
helpers.match({handlebars: hbs});

const testFiles = fs.readdirSync(__dirname);
const rootFiles = fs.readdirSync(path.join(__dirname, '..'));

describe('matching', function() {
  describe('match', function() {
    it('should use the main micromatch function to filter an array', function() {
      var fn = hbs.compile('{{match files "(a|u)*.js"}}');
      equal(fn({files: testFiles}), 'array.js,url.js,utils.js,uuid.js');
    });

    it('should take an array of patterns', function() {
      var ctx = {files: testFiles, patterns: ['(a|u)*.js', 'f*.js']};
      var fn = hbs.compile('{{match files patterns}}');
      equal(fn(ctx), 'array.js,url.js,utils.js,uuid.js');
    });

    it('should take options from the "options[helper name]" object', function() {
      var ctx = {files: testFiles, options: {match: {dot: true}}};
      var fn = hbs.compile('{{match files "*"}}');
      assert(/array\.js/.test(fn(ctx)));
    });

    it('should take options from the hash', function() {
      var ctx = {files: rootFiles};
      assert(/\.gitignore/.test(hbs.compile('{{match files "*" dot=true}}')(ctx)));
      assert(!/\.gitignore/.test(hbs.compile('{{match files "*" dot=false}}')(ctx)));
    });

    it('should use return matching items', function() {
      var fn = hbs.compile('{{match files "(a|u)*.js"}}');
      equal(fn({files: testFiles}), 'array.js,url.js,utils.js,uuid.js');
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
