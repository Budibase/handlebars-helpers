'use strict';

import { equal } from 'assert';
import 'mocha';
import helpers from '../index.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var hbs = require('handlebars').create();
helpers.array({handlebars: hbs});
helpers.string({handlebars: hbs});

var context = {
  one: ['A', 'B', 'C', 'D', 'E', 'F'],
  two: ['a', 'b', 'c', 'd', 'e', 'f']
};

describe('subexpressions', function() {
  describe('collections', function() {
    describe('strings', function() {
      it('Should return the first item in a collection, all lowercase.', function() {
        var fn = hbs.compile('{{lowercase (first one)}}');
        equal(fn(context), 'a');
      });
      it('Should return the last item in a collection, all uppercase.', function() {
        var fn = hbs.compile('{{uppercase (last two)}}');
        equal(fn(context), 'F');
      });
    });
  });
});
