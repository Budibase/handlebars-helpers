'use strict';

import 'mocha';
import { homedir } from 'os';
import { equal } from 'assert';
import { resolve, join } from 'path';
import handlebars from 'handlebars'
const hbs = handlebars.create();
import gm from 'global-modules';
import { path as _path } from '../index.mjs';
_path({handlebars: hbs});

describe('assemble', function() {
  describe('absolute', function() {
    it('should create an absolute file path', function() {
      equal(hbs.compile('{{absolute "a/b/c/package.json"}}')(), resolve('a/b/c/package.json'));
      equal(hbs.compile('{{absolute "a/b/c/docs/toc.md"}}')(), resolve('a/b/c/docs/toc.md'));
    });

    it('should use the cwd on locals', function() {
      equal(hbs.compile('{{absolute "a/b/c/package.json"}}')({cwd: homedir()}), resolve(homedir(), 'a/b/c/package.json'));
      equal(hbs.compile('{{absolute "a/b/c/docs/toc.md"}}')({cwd: gm}), resolve(gm, 'a/b/c/docs/toc.md'));
    });
  });

  describe('dirname', function() {
    it('should get the dirname of a file path', function() {
      equal(hbs.compile('{{dirname "a/b/c/package.json"}}')(), 'a/b/c');
      equal(hbs.compile('{{dirname "a/b/c/docs/toc.md"}}')(), 'a/b/c/docs');
    });
  });

  describe('relative', function() {
    it('should return the relative path from file A to file B', function() {
      var fn = hbs.compile('{{relative "dist/docs.html" "index.html"}}');
      equal(fn(), join('..', 'index.html'));
    });
    it('should return the relative path from file A to folder B', function() {
      var fn = hbs.compile('{{relative "examples/result/md/path.md" "examples/assets"}}');
      equal(fn(), join('..', '..', 'assets'));
    });
    it('should use the cwd passed on options', function() {
      var fn = hbs.compile('{{relative "examples/result/md/path.md" "examples/assets"}}');
      equal(fn({cwd: gm}), join('..', '..', 'assets'));
    });
  });

  describe('basename', function() {
    it('should get the basename of a file path', function() {
      equal(hbs.compile('{{basename "a/b/c/package.json"}}')(), 'package.json');
      equal(hbs.compile('{{basename "a/b/c/docs/toc.md"}}')(), 'toc.md');
    });
    it('should get the basename when a path has no extension', function() {
      var fn = hbs.compile('{{basename "a/b/c/CHANGELOG"}}');
      equal(fn(), 'CHANGELOG');
    });
  });

  describe('stem', function() {
    it('should get the stem of a file path', function() {
      equal(hbs.compile('{{stem "a/b/c/package.json"}}')(), 'package');
      equal(hbs.compile('{{stem "a/b/c/docs/toc.md"}}')(), 'toc');
    });
    it('should get the stem when a path has no extension', function() {
      var fn = hbs.compile('{{stem "CHANGELOG"}}');
      equal(fn(), 'CHANGELOG');
    });
  });

  describe('extname', function() {
    it('should get the extname of a file path', function() {
      equal(hbs.compile('{{extname "a/b/c/package.json"}}')(), '.json');
      equal(hbs.compile('{{extname "a/b/c/docs/toc.md"}}')(), '.md');
    });
    it('should not blow up when a path has no extension', function() {
      var fn = hbs.compile('{{extname "a/b/c/CHANGELOG"}}');
      equal(fn(), '');
    });
  });

  describe('segments', function() {
    it('should return specified path segments:', function() {
      equal(hbs.compile('{{segments "a/b/c/e.js" 1 3}}')(), 'b/c');
      equal(hbs.compile('{{segments "a/b/c/e.js" 1 2}}')(), 'b');
      equal(hbs.compile('{{segments "a/b/c/e.js" 0 3}}')(), 'a/b/c');
      equal(hbs.compile('{{segments "a/b/c/e.js" 2 3}}')(), 'c');
      equal(hbs.compile('{{segments "a/b/c/e.js" 0 3}}')(), 'a/b/c');
    });
  });
});
