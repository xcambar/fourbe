#Fourbe

    Fourbe: French for "sneaky"


Fourbe will fool your code. It is a mocking library for Node and Browserify.

Fourbe mocks module dependencies in your code, replacing a `require`d
module by another one, for the sake of a true isolated testing.

## Install

``sh
npm install --save-dev fourbe
``

## Usage

### In your tests

#### src/index.js
``js
var ext = require('./lib/foo.js');
module.exports = function () {
  return ext;
};
``

#### src/lib/foo.js
``js
module.exports = {
  yay: "I'm foo"
};

#### test/index.js
``js
var fourbe = require('fourbe');
var \_require = fourbe(require);

\_require.with({
  '../src/lib/foo': './mocks/foo'
})

var mod = \_require.require('../src');

assert.strictEqual(mod(), require('./mocks/foo')); // true, of course
assert.deepEqual(mod(), { nope: "I'm bar" }); // same, in other words
``

#### test/mocks/foo.js
``js
module.exports = { nope: "I'm bar" };
``

### In Browserify

TODO

## Motivation

The best mocking library so far in Node-land is [mockery](), but alas, it doesn't
export properly to the browser with Browserify.

Two good alternatives exist:
* [rewire](), but it only mocks private vars. It's a decent workaround for
    dependency mocking.
* [proxyquire]() and [proxyquireify]() (its Browserified fork) mock `require`
    calls, but I couldn't get `proxyquireify` to work properly.

The main pain point for these 2 libraries is that they kill code coverage
because the original module is nonetheless `require`'d.

Moreover, I've seen too many projects rely on crappy code coverage analysis
(most of them I was involved with) and wanted to try another, hopefully less
invasive and destructive way.

## How does it work

Module reconstruction. Build the AST of the code and replace the paths of the
mocked libraries by the path to their mocks.

## License

MIT
