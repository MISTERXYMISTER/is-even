/*!
 * is-even <https://github.com/jonschlinkert/is-even>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var isOdd = require('is-odd');

module.exports = function isEven(i) {
  var n = Math.abs(i);
  if (n > Number.MAX_SAFE_INTEGER) {
    throw new RangeError('value exceeds maximum safe integer');
  }
  return !isOdd(i);
};
