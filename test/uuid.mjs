'use strict';

import 'mocha';
import { match } from 'assert';
import { uuid } from '../lib/uuid.mjs';

describe('uuid', function() {
  describe('generate', function() {
    it('should generate a valid uuid', function() {
      match(
        uuid(),
        /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
      );
    });
  });
});
