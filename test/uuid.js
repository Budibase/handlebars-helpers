'use strict';

import { match } from 'assert';
import 'mocha';
import uuid from '../lib/uuid.js';

describe('uuid', function() {
  describe('generate', function() {
    it('should generate a valid uuid', function() {
      match(uuid.uuid(), /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    });
  });
});
