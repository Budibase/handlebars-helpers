'use strict';

import 'mocha';
import assert from 'assert';
import helpers from '@budibase/handlebars-helpers';
import * as math from '@budibase/handlebars-helpers/lib/math';
import * as comparison from '@budibase/handlebars-helpers/lib/comparison.js';

describe('package exports', function() {
  it('should export the root module', function() {
    assert.strictEqual(typeof helpers, 'function');
  });

  it('should export extensionless helper collections', function() {
    assert.strictEqual(math.add(1, 2), 3);
  });

  it('should export helper collections with a file extension', function() {
    assert.strictEqual(comparison.eq(1, 1, { hash: {} }), true);
    assert.strictEqual(typeof comparison.default, 'function');
  });
});
