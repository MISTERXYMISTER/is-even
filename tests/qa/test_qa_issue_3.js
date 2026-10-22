'use strict';

require('mocha');
var assert = require('assert');
var isEven = require('../../');

describe('QA Issue #3 - Safe Integer Boundaries & Edge Cases', function() {
  it('should throw RangeError for values strictly greater than Number.MAX_SAFE_INTEGER', function() {
    assert.throws(function() {
      isEven(Number.MAX_SAFE_INTEGER + 1);
    }, /^RangeError: value exceeds maximum safe integer$/);

    assert.throws(function() {
      isEven('9007199254740992');
    }, /^RangeError: value exceeds maximum safe integer$/);
  });

  it('should throw RangeError for values strictly less than -Number.MAX_SAFE_INTEGER', function() {
    assert.throws(function() {
      isEven(-(Number.MAX_SAFE_INTEGER + 1));
    }, /^RangeError: value exceeds maximum safe integer$/);

    assert.throws(function() {
      isEven('-9007199254740992');
    }, /^RangeError: value exceeds maximum safe integer$/);
  });

  it('should correctly handle Number.MAX_SAFE_INTEGER without throwing', function() {
    assert.strictEqual(isEven(Number.MAX_SAFE_INTEGER), false);
    assert.strictEqual(isEven(String(Number.MAX_SAFE_INTEGER)), false);
  });

  it('should correctly handle -Number.MAX_SAFE_INTEGER without throwing', function() {
    assert.strictEqual(isEven(-Number.MAX_SAFE_INTEGER), false);
    assert.strictEqual(isEven(String(-Number.MAX_SAFE_INTEGER)), false);
  });

  it('should correctly handle Number.MAX_SAFE_INTEGER - 1 without throwing', function() {
    assert.strictEqual(isEven(Number.MAX_SAFE_INTEGER - 1), true);
    assert.strictEqual(isEven(String(Number.MAX_SAFE_INTEGER - 1)), true);
  });

  it('should correctly handle -(Number.MAX_SAFE_INTEGER - 1) without throwing', function() {
    assert.strictEqual(isEven(-(Number.MAX_SAFE_INTEGER - 1)), true);
    assert.strictEqual(isEven(String(-(Number.MAX_SAFE_INTEGER - 1))), true);
  });

  it('should throw RangeError for Infinity and -Infinity', function() {
    assert.throws(function() {
      isEven(Infinity);
    }, /^RangeError: value exceeds maximum safe integer$/);

    assert.throws(function() {
      isEven(-Infinity);
    }, /^RangeError: value exceeds maximum safe integer$/);
  });
});
