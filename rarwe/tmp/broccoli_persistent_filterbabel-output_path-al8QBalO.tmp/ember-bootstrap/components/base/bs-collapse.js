define('ember-bootstrap/components/base/bs-collapse', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var computed = _ember.default.computed,
      observer = _ember.default.observer,
      _Ember$run = _ember.default.run,
      bind = _Ember$run.bind,
      next = _Ember$run.next,
      htmlSafe = _ember.default.String.htmlSafe;
  exports.default = _ember.default.Component.extend({

    classNameBindings: ['collapse', 'collapsing'],
    attributeBindings: ['style'],

    /**
     * Collapsed/expanded state
     *
     * @property collapsed
     * @type boolean
     * @default true
     * @public
     */
    collapsed: true,

    /**
     * True if this item is expanded
     *
     * @property active
     * @private
     */
    active: false,

    collapse: computed.not('transitioning'),
    collapsing: computed.alias('transitioning'),
    showContent: computed.and('collapse', 'active'),

    /**
     * true if the component is currently transitioning
     *
     * @property transitioning
     * @type boolean
     * @private
     */
    transitioning: false,

    /**
     * @property collapseSize
     * @type number
     * @private
     */
    collapseSize: null,

    /**
     * The size of the element when collapsed. Defaults to 0.
     *
     * @property collapsedSize
     * @type number
     * @default 0
     * @public
     */
    collapsedSize: 0,

    /**
     * The size of the element when expanded. When null the value is calculated automatically to fit the containing elements.
     *
     * @property expandedSize
     * @type number
     * @default null
     * @public
     */
    expandedSize: null,

    /**
     * Usually the size (height) of the element is only set while transitioning, and reseted afterwards. Set to true to always set a size.
     *
     * @property resetSizeWhenNotCollapsing
     * @type boolean
     * @default true
     * @private
     */
    resetSizeWhenNotCollapsing: true,

    /**
     * The direction (height/width) of the collapse animation.
     * When setting this to 'width' you should also define custom CSS transitions for the width property, as the Bootstrap
     * CSS does only support collapsible elements for the height direction.
     *
     * @property collapseDimension
     * @type string
     * @default 'height'
     * @public
     */
    collapseDimension: 'height',

    style: computed('collapseSize', function () {
      var size = this.get('collapseSize');
      var dimension = this.get('collapseDimension');
      if (_ember.default.isEmpty(size)) {
        return htmlSafe('');
      }
      return htmlSafe(dimension + ': ' + size + 'px');
    }),

    /**
     * The action to be sent when the element is about to be hidden.
     *
     * @property onHide
     * @type function
     * @public
     */
    onHide: function onHide() {},


    /**
     * The action to be sent after the element has been completely hidden (including the CSS transition).
     *
     * @property onHidden
     * @type function
     * @default null
     * @public
     */
    onHidden: function onHidden() {},


    /**
     * The action to be sent when the element is about to be shown.
     *
     * @property onShow
     * @type function
     * @default null
     * @public
     */
    onShow: function onShow() {},


    /**
     * The action to be sent after the element has been completely shown (including the CSS transition).
     *
     * @property onShown
     * @type function
     * @public
     */
    onShown: function onShown() {},


    /**
     * Triggers the show transition
     *
     * @method show
     * @protected
     */
    show: function show() {
      var complete = function complete() {
        if (this.get('isDestroyed')) {
          return;
        }
        this.set('transitioning', false);
        if (this.get('resetSizeWhenNotCollapsing')) {
          this.set('collapseSize', null);
        }
        this.get('onShown')();
      };

      this.get('onShow')();

      this.setProperties({
        transitioning: true,
        collapseSize: this.get('collapsedSize'),
        active: true
      });

      if (!_ember.default.$.support.transition) {
        return complete.call(this);
      }

      this.$().one('bsTransitionEnd', bind(this, complete))
      // @todo: make duration configurable
      .emulateTransitionEnd(350);

      next(this, function () {
        if (!this.get('isDestroyed')) {
          this.set('collapseSize', this.getExpandedSize('show'));
        }
      });
    },


    /**
     * Get the size of the element when expanded
     *
     * @method getExpandedSize
     * @param $action
     * @return {Number}
     * @private
     */
    getExpandedSize: function getExpandedSize($action) {
      var expandedSize = this.get('expandedSize');
      if (_ember.default.isPresent(expandedSize)) {
        return expandedSize;
      }

      var collapseElement = this.$();
      var prefix = $action === 'show' ? 'scroll' : 'offset';
      var measureProperty = _ember.default.String.camelize(prefix + '-' + this.get('collapseDimension'));
      return collapseElement[0][measureProperty];
    },


    /**
     * Triggers the hide transition
     *
     * @method hide
     * @protected
     */
    hide: function hide() {

      var complete = function complete() {
        if (this.get('isDestroyed')) {
          return;
        }
        this.set('transitioning', false);
        if (this.get('resetSizeWhenNotCollapsing')) {
          this.set('collapseSize', null);
        }
        this.get('onHidden')();
      };

      this.get('onHide')();

      this.setProperties({
        transitioning: true,
        collapseSize: this.getExpandedSize('hide'),
        active: false
      });

      if (!_ember.default.$.support.transition) {
        return complete.call(this);
      }

      this.$().one('bsTransitionEnd', bind(this, complete))
      // @todo: make duration configurable
      .emulateTransitionEnd(350);

      next(this, function () {
        if (!this.get('isDestroyed')) {
          this.set('collapseSize', this.get('collapsedSize'));
        }
      });
    },


    _onCollapsedChange: observer('collapsed', function () {
      var collapsed = this.get('collapsed');
      var active = this.get('active');
      if (collapsed !== active) {
        return;
      }
      if (collapsed === false) {
        this.show();
      } else {
        this.hide();
      }
    }),

    init: function init() {
      this._super.apply(this, arguments);
      this.set('active', !this.get('collapsed'));
    },


    _updateCollapsedSize: observer('collapsedSize', function () {
      if (!this.get('resetSizeWhenNotCollapsing') && this.get('collapsed') && !this.get('collapsing')) {
        this.set('collapseSize', this.get('collapsedSize'));
      }
    }),

    _updateExpandedSize: observer('expandedSize', function () {
      if (!this.get('resetSizeWhenNotCollapsing') && !this.get('collapsed') && !this.get('collapsing')) {
        this.set('collapseSize', this.get('expandedSize'));
      }
    })
  });
});