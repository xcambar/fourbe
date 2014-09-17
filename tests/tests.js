var assert = require('assert');
var fourbe = require('..');


assert.throws(fourbe, Error, 'current require must be passed as the first argument');

assert.equal(fourbe(require).require, require, 'it returns the local require');
assert.deepEqual(fourbe(require).require('..'), require('..'), 'it returns a __correct__ local require');

var _f = fourbe(require);
assert.deepEqual(_f.with(), _f, 'Chaining is allowed by `with`');
assert.deepEqual(_f.with().with().require, require, 'require still here');

//Module Mocks
var _f = fourbe(require);
var mocks = {};
var mockedModulePath = './mocks/replaced';
mocks[mockedModulePath] = './mocks/replacement';

_f.with(mocks);
assert(_f._mocks[require.resolve(mockedModulePath)], 'Paths are resolved locally to the tests');
assert.equal(_f._mocks[require.resolve(mockedModulePath)], require.resolve(mocks[mockedModulePath]), 'Paths are resolved locally to the tests for the mocks too');

// Mocks can be accumulated
assert(_f.with({fs: './mocks/replaced'}));
assert(_f._mocks[require.resolve(mockedModulePath)], 'Former mocks are still defined');
assert(_f._mocks.fs, 'New mocked modules are added...');
assert.equal(_f._mocks.fs, require.resolve(mockedModulePath), '...and well defined');

//Rewriting
