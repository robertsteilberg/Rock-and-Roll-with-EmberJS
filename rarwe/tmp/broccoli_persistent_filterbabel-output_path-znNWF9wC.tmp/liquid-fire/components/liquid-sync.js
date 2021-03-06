define('liquid-fire/components/liquid-sync', ['exports', 'ember', 'liquid-fire/templates/components/liquid-sync', 'liquid-fire/mixins/pausable'], function (exports, _ember, _liquidSync, _pausable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _ember.default.Component.extend(_pausable.default, {
    tagName: '',
    layout: _liquidSync.default,
    didInsertElement: function didInsertElement() {
      this.pauseLiquidFire();
    },

    actions: {
      ready: function ready() {
        this.resumeLiquidFire();
      }
    }
  });
});