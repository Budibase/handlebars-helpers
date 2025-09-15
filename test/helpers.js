'use strict';

import { ok } from 'assert';
import 'mocha';
import helpers from '../index.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var hbs = require('handlebars');

describe('helpers', function() {
  it('should should return all helpers:', function() {
    ok(Object.keys(helpers()).length > 100);
  });

  it('should return all helpers when options are passed:', function() {
    ok(Object.keys(helpers({})).length > 100);
  });

  it('should register helpers with handlebars:', function() {
    helpers({handlebars: hbs});
    ok(hbs.helpers.hasOwnProperty('contains'));
    ok(hbs.helpers.hasOwnProperty('default'));
  });

  it('should get the specified collections', function() {
    var res = helpers(['string', 'array'], {handlebars: hbs.create()});
    ok(res.hasOwnProperty('replace'));
    ok(res.hasOwnProperty('reverse'));
    ok(res.hasOwnProperty('some'));
    ok(res.hasOwnProperty('last'));
    ok(!res.hasOwnProperty('dirname'));
    ok(!res.hasOwnProperty('embed'));
  });

  it('should get only the specified collection', function() {
    var res = helpers('string', {handlebars: hbs.create()});

    ok(res.hasOwnProperty('replace'));
    ok(res.hasOwnProperty('reverse'));
    ok(res.hasOwnProperty('prepend'));
    ok(!res.hasOwnProperty('some'));
    ok(!res.hasOwnProperty('last'));
    ok(!res.hasOwnProperty('dirname'));
  });

  it('should support passing an instance of handlebars:', function() {
    helpers({handlebars: hbs});
    hbs.registerHelper('foo', function() {});
    ok(hbs.helpers.hasOwnProperty('foo'));
  });

  it('should return a single collection:', function() {
    var res = helpers.math();
    ok(res.hasOwnProperty('add'));
    ok(res.hasOwnProperty('subtract'));
    ok(res.hasOwnProperty('divide'));
  });

  it('should register collection helpers with handlebars:', function() {
    helpers.math();
    ok(hbs.helpers.hasOwnProperty('add'));
    ok(hbs.helpers.hasOwnProperty('subtract'));
    ok(hbs.helpers.hasOwnProperty('divide'));
  });
});
