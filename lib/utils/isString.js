
/**
 * Return true if `val` is a non-empty string.
 *
 * @param  {any} `val` The value to check
 * @return {Boolean}
 * @api public
 */

export function isString(val) {
  return typeof val === 'string' && val !== '';
}
