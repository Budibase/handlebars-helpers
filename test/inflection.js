'use strict';

import { equal } from 'assert';
import 'mocha';
import helpers from '../index.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var hbs = require('handlebars').create();
helpers.inflection({handlebars: hbs});

describe('inflection', function() {
  describe('inflect', function() {
    it('should return the plural or singular form of a word based on a value.', function() {
      var template = hbs.compile('{{inflect mail "junk" "mail"}}');
      equal(template({mail: 3}), 'mail');
    });

    it('should return the plural or singular form of a word based on a value and include the count.', function() {
      var template = hbs.compile('{{inflect messages "message" "messages" true}}');
      equal(template({messages: 1}), '1 message');
    });
  });

  describe('ordinalize', function() {
    it('should return an ordinalized string.', function() {
      equal(hbs.compile('{{ordinalize 1}}')(), '1st');
      equal(hbs.compile('{{ordinalize 3}}')(), '3rd');
      equal(hbs.compile('{{ordinalize 11}}')(), '11th');
      equal(hbs.compile('{{ordinalize 21}}')(), '21st');
      equal(hbs.compile('{{ordinalize 29}}')(), '29th');
      equal(hbs.compile('{{ordinalize 22}}')(), '22nd');
    });
  });
});
