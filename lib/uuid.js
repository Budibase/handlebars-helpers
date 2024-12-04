import {v4} from 'uuid';

/**
 * Generates a UUID, using the V4 method (identical to the browser crypto.randomUUID function).
 *
 * @return {String} A newly generated UUID.
 * @api public
 * @example {{ uuid }} -> f34ebc66-93bd-4f7c-b79b-92b5569138bc
 */
export const uuid = function() {
  return v4();
};
