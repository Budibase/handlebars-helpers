'use strict';

import 'mocha';
import { equal } from 'assert';
import handlebars from 'handlebars'
const hbs = handlebars.create();
import { array, string } from '../index.mjs';
array({handlebars: hbs});
string({handlebars: hbs});

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
