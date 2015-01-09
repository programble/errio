var SuperError = require('super-error');
var Errio = require('..');

var common = require('./common');

describe('register', function() {
  describe('with option overrides', function() {
    it('sets recursive option');
    it('sets inherited option');
    it('sets stack option');
    it('sets private option');
    it('sets exclude option');
    it('sets include option');
  });

  describe('with explicit error name', function() {
    it('does not call constructor');
    it('applies options based on name');
  });

  describe('with already registered error class', function() {
    it('replaces option overrides');
  });
});
