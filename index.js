/*!
 * is-even <https://github.com/jonschlinkert/is-even>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var isOdd = require('is-odd');

module.exports = function isEven(i) {
  if (typeof i === 'boolean') {
    throw new TypeError('is-even expects a number.');
  }
  return !isOdd(i);
};
