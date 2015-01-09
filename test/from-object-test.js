var SuperError = require('super-error');
var Errio = require('..');

var common = require('./common');

describe('fromObject', function() {
  describe('with registered error class', function() {
    it('deserializes to an instance');
  });

  describe('with option overrides', function() {
    it('sets recursive option');
  });

  describe('with unregistered error class', function() {
    it('returns Error instance with name set');
  });

  describe('without serialized stack', function() {
    it('captures a new stack');
  });

  describe('with built-in error classes', function() {
    it('returns Error instance');
    it('returns EvalError instance');
    it('returns RangeError instance');
    it('returns ReferenceError instance');
    it('returns SyntaxError instance');
    it('returns TypeError instance');
    it('returns URIError instance');
  });
});
