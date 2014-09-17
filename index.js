'use strict';

var path = require('path');

module.exports = function (_require) {
  if (!(typeof _require === 'function')) {
    throw new Error('Require must be passed');
  }
  var _mocks = {};
  var _fourbe =  {
    with: function (mocks) {
      mocks = mocks || {};
      Object.keys(mocks).forEach(function (original) {
        var path = _require.resolve(original);
        var destination = _require.resolve(mocks[original]);
        _mocks[path] = destination;
      });
      return _fourbe;
    },
    require: _require,
    _mocks: _mocks
  };
  return _fourbe;
};

