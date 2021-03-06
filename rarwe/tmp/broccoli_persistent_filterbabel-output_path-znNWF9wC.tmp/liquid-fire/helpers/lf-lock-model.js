define('liquid-fire/helpers/lf-lock-model', ['exports', 'ember', 'liquid-fire/ember-internals'], function (exports, _ember, _emberInternals) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.lfLockModel = lfLockModel;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  function lfLockModel(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        routeInfo = _ref2[0],
        outletName = _ref2[1];

    // ensures that the name is locked, see implementation of `routeModel`
    (0, _emberInternals.routeModel)((0, _emberInternals.childRoute)(routeInfo, outletName));
    return routeInfo;
  }

  exports.default = _ember.default.Helper.helper(lfLockModel);
});