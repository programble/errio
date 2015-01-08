var assert = require('assert');
var SuperError = require('super-error');
var Errio = require('..');

// Each of these tests is required to set the option back to its factory
// default in order to not interfere with other tests. This is the reason for
// the inconsistent order of true/false option tests.

describe('setDefaults', function() {
  it('sets recursive option', function() {
    var TestError = SuperError.subclass('SetDefaultsRecursiveOptionTestError');

    var error = new TestError('test').causedBy(new TestError('cause'));

    Errio.setDefaults({ recursive: false });

    var object = Errio.toObject(error);
    assert(!object.hasOwnProperty('cause'), 'does not contain nested error');

    Errio.setDefaults({ recursive: true });

    var recursiveObject = Errio.toObject(error);
    assert.equal(typeof recursiveObject.cause, 'object', 'contains nested error');

    Errio.setDefaults({ recursive: false });

    error = Errio.fromObject(recursiveObject);
    assert.equal(typeof error.cause, 'object', 'contains nested object');
    assert(!(error.cause instanceof Error), 'nested object is not an Error');

    Errio.setDefaults({ recursive: true });

    error = Errio.fromObject(recursiveObject);
    assert(error.cause instanceof Error, 'contains nested Error');
  });

  it('sets inherited option', function() {
    var ParentError = SuperError.subclass('SetDefaultsInheritedOptionParentError');
    ParentError.prototype.parentProperty = 'inherited';
    var TestError = ParentError.subclass('SetDefaultsInheritedOptionTestError');

    var error = new TestError('test');

    Errio.setDefaults({ inherited: false });

    var object = Errio.toObject(error);
    assert(!object.hasOwnProperty('parentProperty'), 'does not contain inherited property');

    Errio.setDefaults({ inherited: true });

    object = Errio.toObject(error);
    assert.equal(object.parentProperty, 'inherited', 'contains inherited property');
  });

  it('sets stack option', function() {
    var TestError = SuperError.subclass('SetDefaultsStackOptionTestError');

    var error = new TestError('test');

    Errio.setDefaults({ stack: true });

    var object = Errio.toObject(error);
    assert.equal(typeof object.stack, 'string', 'contains stack property');

    Errio.setDefaults({ stack: false });

    object = Errio.toObject(error);
    assert(!object.hasOwnProperty('stack'), 'does not contain stack property');
  });

  it('sets private option', function() {
    var TestError = SuperError.subclass('SetDefaultsPrivateOptionTestError');

    var error = new TestError('test', {
      _leading: 'private',
      trailing_: 'private'
    });

    Errio.setDefaults({ private: true });

    var object = Errio.toObject(error);
    assert.equal(object._leading, 'private', 'contains leading underscore property');
    assert.equal(object.trailing_, 'private', 'contains trailing underscore property');

    Errio.setDefaults({ private: false });

    object = Errio.toObject(error);
    assert(!object.hasOwnProperty('_leading'), 'does not contain leading underscore property');
    assert(!object.hasOwnProperty('trailing_'), 'does not contain trailing underscore property');
  });

  it('sets exclude option', function() {
    var TestError = SuperError.subclass('SetDefaultsExcludeOptionTestError');

    var error = new TestError('test', { excluded: 'value' });

    Errio.setDefaults({ exclude: [ 'excluded' ] });

    var object = Errio.toObject(error);
    assert(!object.hasOwnProperty('excluded'), 'does not contain excluded property');

    Errio.setDefaults({ exclude: [] });

    var object = Errio.toObject(error);
    assert.equal(object.excluded, 'value', 'contains excluded property');
  });

  it('sets include option', function() {
    var TestError = SuperError.subclass('SetDefaultsIncludeOptionTestError');

    var error = new TestError('test', { included: 'value' });

    Errio.setDefaults({ exclude: [ 'included' ], include: [ 'included' ] });

    var object = Errio.toObject(error);
    assert.equal(object.included, 'value', 'contains included property');

    Errio.setDefaults({ include: [] });

    object = Errio.toObject(error);
    assert(!object.hasOwnProperty('included'), 'does not contain included property');

    Errio.setDefaults({ exclude: [] });
  });
});
