'use strict';

require('mocha');
var assert = require('assert');
var isEven = require('../../');

describe('QA Issue #1: Boolean input validation and boundary edge cases', function() {
  describe('Boolean primitives', function() {
    it('should throw a TypeError when true is passed', function() {
      assert.throws(function() {
        isEven(true);
      }, function(err) {
        return (err instanceof TypeError) && /expects a number/.test(err.message);
      });
    });

    it('should throw a TypeError when false is passed', function() {
      assert.throws(function() {
        isEven(false);
      }, function(err) {
        return (err instanceof TypeError) && /expects a number/.test(err.message);
      });
    });

    it('should throw a TypeError with exact message /is-even expects a number\\.$/', function() {
      assert.throws(function() {
        isEven(true);
      }, /is-even expects a number\.$/);
      assert.throws(function() {
        isEven(false);
      }, /is-even expects a number\.$/);
    });

    it('should throw a TypeError when Boolean() function result is passed', function() {
      assert.throws(function() {
        isEven(Boolean(1));
      }, function(err) {
        return (err instanceof TypeError) && /expects a number/.test(err.message);
      });
      assert.throws(function() {
        isEven(Boolean(0));
      }, function(err) {
        return (err instanceof TypeError) && /expects a number/.test(err.message);
      });
    });

    it('should throw a TypeError when new Boolean() object wrapper is passed', function() {
      assert.throws(function() {
        isEven(new Boolean(true));
      }, function(err) {
        return (err instanceof TypeError) && /expects a number/.test(err.message);
      });
      assert.throws(function() {
        isEven(new Boolean(false));
      }, function(err) {
        return (err instanceof TypeError) && /expects a number/.test(err.message);
      });
    });

    it('should throw a TypeError when logical expressions evaluate to boolean', function() {
      assert.throws(function() {
        isEven(!0);
      }, function(err) {
        return (err instanceof TypeError) && /expects a number/.test(err.message);
      });
      assert.throws(function() {
        isEven(!1);
      }, function(err) {
        return (err instanceof TypeError) && /expects a number/.test(err.message);
      });
      assert.throws(function() {
        isEven(2 === 2);
      }, function(err) {
        return (err instanceof TypeError) && /expects a number/.test(err.message);
      });
      assert.throws(function() {
        isEven(1 > 2);
      }, function(err) {
        return (err instanceof TypeError) && /expects a number/.test(err.message);
      });
    });
  });

  describe('Boundary numbers and signs', function() {
    it('should handle zero and negative zero', function() {
      assert.strictEqual(isEven(0), true);
      assert.strictEqual(isEven(-0), true);
      assert.strictEqual(isEven('0'), true);
      assert.strictEqual(isEven('-0'), true);
    });

    it('should handle small positive and negative integers', function() {
      assert.strictEqual(isEven(1), false);
      assert.strictEqual(isEven(-1), false);
      assert.strictEqual(isEven(2), true);
      assert.strictEqual(isEven(-2), true);
      assert.strictEqual(isEven('1'), false);
      assert.strictEqual(isEven('-1'), false);
      assert.strictEqual(isEven('2'), true);
      assert.strictEqual(isEven('-2'), true);
    });

    it('should handle safe integer boundaries', function() {
      assert.strictEqual(isEven(Number.MAX_SAFE_INTEGER), false);
      assert.strictEqual(isEven(Number.MAX_SAFE_INTEGER - 1), true);
      assert.strictEqual(isEven(Number.MIN_SAFE_INTEGER), false);
      assert.strictEqual(isEven(Number.MIN_SAFE_INTEGER + 1), true);
    });
  });

  describe('Invalid and edge-case inputs', function() {
    it('should throw TypeError on non-number falsy and empty values', function() {
      assert.throws(function() {
        isEven();
      }, TypeError);
      assert.throws(function() {
        isEven(undefined);
      }, TypeError);
      assert.throws(function() {
        isEven(null);
      }, TypeError);
      assert.throws(function() {
        isEven('');
      }, TypeError);
      assert.throws(function() {
        isEven('   ');
      }, TypeError);
      assert.throws(function() {
        isEven([]);
      }, TypeError);
    });

    it('should throw TypeError on boolean-like strings, arrays, and objects', function() {
      assert.throws(function() {
        isEven('true');
      }, TypeError);
      assert.throws(function() {
        isEven('false');
      }, TypeError);
      assert.throws(function() {
        isEven([true]);
      }, TypeError);
      assert.throws(function() {
        isEven({ valueOf: function() { return true; } });
      }, TypeError);
      assert.throws(function() {
        isEven(function() { return true; });
      }, TypeError);
    });

    it('should throw TypeError on special numeric values', function() {
      assert.throws(function() {
        isEven(NaN);
      }, TypeError);
      assert.throws(function() {
        isEven(Infinity);
      }, TypeError);
      assert.throws(function() {
        isEven(-Infinity);
      }, TypeError);
    });

    it('should throw RangeError on floating point numbers', function() {
      assert.throws(function() {
        isEven(1.5);
      }, RangeError);
      assert.throws(function() {
        isEven(-2.4);
      }, RangeError);
      assert.throws(function() {
        isEven('1.1e0');
      }, RangeError);
    });
  });
});
