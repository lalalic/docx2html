'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _drawing = require('./drawing');

var _drawing2 = _interopRequireDefault(_drawing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unit = /[a-zA-Z]+$/g;
function asNum(a) {
  return parseFloat(a.replace(unit, ''));
}

var Anchor = function (_Drawing) {
  (0, _inherits3.default)(Anchor, _Drawing);

  function Anchor() {
    (0, _classCallCheck3.default)(this, Anchor);
    return (0, _possibleConstructorReturn3.default)(this, (Anchor.__proto__ || (0, _getPrototypeOf2.default)(Anchor)).apply(this, arguments));
  }

  (0, _createClass3.default)(Anchor, [{
    key: 'convertStyle',
    value: function convertStyle(el) {
      el.style.display = 'inline-block';
      el.style.position = 'relative';

      (0, _get3.default)(Anchor.prototype.__proto__ || (0, _getPrototypeOf2.default)(Anchor.prototype), 'convertStyle', this).apply(this, arguments);
    }
  }, {
    key: 'tag',
    get: function get() {
      return 'div';
    }
  }]);
  return Anchor;
}(_drawing2.default);

exports.default = Anchor;


var PositionH = {
  page: function page(x) {
    var style = this.style,
        t;
    switch (x.align) {
      case 'left':
        if ((t = this.world.width - asNum(this.doc.section.style.paddingLeft)) >= 0) style.left = 0;else style.left = -t + 'px';
        break;
      case 'center':
        style.left = (asNum(this.doc.section.style.width) - this.world.width) / 2 + 'px';
        break;
      case 'right':
        if ((t = this.world.width - asNum(this.doc.section.style.paddingRight)) >= 0) style.right = 0;else style.right = -t + 'px';
        break;
      case 'inside':
        style.left = 0;
        break;
      case 'outside':
        style.right = 0;
        break;
      default:
        style.left = x.posOffset + 'px';
        break;
    }
  },
  margin: function margin(x) {
    var sect = this.doc.section.style;
    switch (x.align) {
      case 'inside':
      case 'left':
        this.style.left = sect.paddingLeft;
        break;
      case 'center':
        this.style.left = (asNum(sect.width) - asNum(sect.paddingRight) + asNum(sect.paddingLeft) - this.world.width) / 2 + 'px';
        break;
      case 'outside':
      case 'right':
        this.style.right = sect.paddingRight;
        break;
      default:
        this.style.left = x.posOffset + asNum(sect.paddingLeft) + 'px';
        break;
    }
  },
  column: function column(x) {
    Anchor.addClass(this.parent.content, 'warning warning-positionH-column');
    PositionH.margin.call(this, x);
  },
  character: function character(x) {
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionH-character');
  },
  leftMargin: function leftMargin(x) {
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionH-leftMargin');
  },
  rightMargin: function rightMargin(x) {
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionH-rightMargin');
  },
  insideMargin: function insideMargin(x) {
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionH-insideMargin');
  },
  outsideMargin: function outsideMargin(x) {
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionH-outsideMargin');
  }
};
var PositionV = {
  page: function page(x) {
    var style = this.style,
        sect = this.doc.section.style;
    switch (x.align) {
      case 'top':
        style.top = 0;
        break;
      case 'bottom':
        style.bottom = 0;
        break;
      case 'center':
      case 'outside':
      case 'inside':
        Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-page-' + x.align);
        break;
      default:
        style.top = x.posOffset + 'px';
        break;
    }
  },
  margin: function margin(x) {
    var style = this.style,
        sect = this.doc.section.style;
    switch (x.align) {
      case 'top':
        style.top = sect.paddingTop;
        break;
      case 'bottom':
        style.bottom = sect.paddingBottom;
        break;
      case 'center':
      case 'outside':
      case 'inside':
        Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-margin-' + x.align);
        break;
      default:
        style.top = asNum(sect.paddingTop) + x.posOffset + 'px';
        break;
    }
  },
  line: function line(x) {
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-line');
  },
  topMargin: function topMargin(x) {
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-topMargin');
  },
  bottomMargin: function bottomMargin(x) {
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-bottomMargin');
  },
  insideMargin: function insideMargin(x) {
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-insideMargin');
  },
  outsideMargin: function outsideMargin(x) {
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-outsideMargin');
  },
  paragraph: function paragraph(x) {
    //only offset
    Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-paragraph');
  }
};

//only support absolute page offset

var Properties = function (_Drawing$Properties) {
  (0, _inherits3.default)(Properties, _Drawing$Properties);

  function Properties() {
    (0, _classCallCheck3.default)(this, Properties);
    return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
  }

  (0, _createClass3.default)(Properties, [{
    key: 'getParagraphPaddingLeft',
    value: function getParagraphPaddingLeft() {
      return '0pt';
    }
  }, {
    key: 'positionH',
    value: function positionH(x) {
      PositionH[x.relativeFrom].call(this, x);
    }
  }, {
    key: 'positionV',
    value: function positionV(x) {
      PositionV[x.relativeFrom].call(this, x);
    }
  }, {
    key: 'wrap',
    value: function wrap(x) {
      switch (x) {
        case 'tight':
        case 'through':
        case 'square':
        case 'topAndBottom':
          Anchor.addClass(this.parent.content, 'unsupported unsupported-wrap-' + x);
          break;
        default:
          this.style.position = 'absolute';
      }
    }
  }, {
    key: 'behindDoc',
    value: function behindDoc(x) {
      this.style.zIndex = -1;
    }
  }]);
  return Properties;
}(_drawing2.default.Properties);

Anchor.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZHJhd2luZ0FuY2hvci5qcyJdLCJuYW1lcyI6WyJ1bml0IiwiYXNOdW0iLCJhIiwicGFyc2VGbG9hdCIsInJlcGxhY2UiLCJBbmNob3IiLCJlbCIsInN0eWxlIiwiZGlzcGxheSIsInBvc2l0aW9uIiwiYXJndW1lbnRzIiwiRHJhd2luZyIsIlBvc2l0aW9uSCIsInBhZ2UiLCJ4IiwidCIsImFsaWduIiwid29ybGQiLCJ3aWR0aCIsImRvYyIsInNlY3Rpb24iLCJwYWRkaW5nTGVmdCIsImxlZnQiLCJwYWRkaW5nUmlnaHQiLCJyaWdodCIsInBvc09mZnNldCIsIm1hcmdpbiIsInNlY3QiLCJjb2x1bW4iLCJhZGRDbGFzcyIsInBhcmVudCIsImNvbnRlbnQiLCJjYWxsIiwiY2hhcmFjdGVyIiwibGVmdE1hcmdpbiIsInJpZ2h0TWFyZ2luIiwiaW5zaWRlTWFyZ2luIiwib3V0c2lkZU1hcmdpbiIsIlBvc2l0aW9uViIsInRvcCIsImJvdHRvbSIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwibGluZSIsInRvcE1hcmdpbiIsImJvdHRvbU1hcmdpbiIsInBhcmFncmFwaCIsIlByb3BlcnRpZXMiLCJyZWxhdGl2ZUZyb20iLCJ6SW5kZXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFJQSxPQUFLLGFBQVQ7QUFDQSxTQUFTQyxLQUFULENBQWVDLENBQWYsRUFBaUI7QUFDZixTQUFPQyxXQUFXRCxFQUFFRSxPQUFGLENBQVVKLElBQVYsRUFBZSxFQUFmLENBQVgsQ0FBUDtBQUNEOztJQUVvQkssTTs7Ozs7Ozs7OztpQ0FHTkMsRSxFQUFHO0FBQ2RBLFNBQUdDLEtBQUgsQ0FBU0MsT0FBVCxHQUFpQixjQUFqQjtBQUNBRixTQUFHQyxLQUFILENBQVNFLFFBQVQsR0FBa0IsVUFBbEI7O0FBRUEsMElBQXNCQyxTQUF0QjtBQUNEOzs7d0JBUFE7QUFBQyxh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T0FBNUIsRUFBb0MsaURBQXBDO0FBQ0QsR0FyRFc7QUFzRFplLFdBdERZLHFCQXNERmhDLENBdERFLEVBc0RBO0FBQUM7QUFDWFQsV0FBT3dCLFFBQVAsQ0FBZ0IsS0FBS0MsTUFBTCxDQUFZQyxPQUE1QixFQUFvQyw2Q0FBcEM7QUFDRDtBQXhEVyxDQUFkOztBQTJEQTs7SUFDTWdCLFU7Ozs7Ozs7Ozs7OENBQ3FCO0FBQ3ZCLGFBQU8sS0FBUDtBQUNEOzs7OEJBQ1NqQyxDLEVBQUU7QUFDVkYsZ0JBQVVFLEVBQUVrQyxZQUFaLEVBQTBCaEIsSUFBMUIsQ0FBK0IsSUFBL0IsRUFBb0NsQixDQUFwQztBQUNEOzs7OEJBQ1NBLEMsRUFBRTtBQUNWd0IsZ0JBQVV4QixFQUFFa0MsWUFBWixFQUEwQmhCLElBQTFCLENBQStCLElBQS9CLEVBQW9DbEIsQ0FBcEM7QUFDRDs7O3lCQUNJQSxDLEVBQUU7QUFDTCxjQUFPQSxDQUFQO0FBQ0EsYUFBSyxPQUFMO0FBQ0EsYUFBSyxTQUFMO0FBQ0EsYUFBSyxRQUFMO0FBQ0EsYUFBSyxjQUFMO0FBQ0VULGlCQUFPd0IsUUFBUCxDQUFnQixLQUFLQyxNQUFMLENBQVlDLE9BQTVCLEVBQW9DLGtDQUFnQ2pCLENBQXBFO0FBQ0E7QUFDRjtBQUNFLGVBQUtQLEtBQUwsQ0FBV0UsUUFBWCxHQUFvQixVQUFwQjtBQVJGO0FBVUQ7Ozs4QkFDU0ssQyxFQUFFO0FBQ1YsV0FBS1AsS0FBTCxDQUFXMEMsTUFBWCxHQUFrQixDQUFDLENBQW5CO0FBQ0Q7OztFQXhCc0J0QyxrQkFBUW9DLFU7O0FBMkJqQzFDLE9BQU8wQyxVQUFQLEdBQWtCQSxVQUFsQiIsImZpbGUiOiJkcmF3aW5nQW5jaG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERyYXdpbmcgZnJvbSAnLi9kcmF3aW5nJ1xuXG52YXIgdW5pdD0vW2EtekEtWl0rJC9nXG5mdW5jdGlvbiBhc051bShhKXtcbiAgcmV0dXJuIHBhcnNlRmxvYXQoYS5yZXBsYWNlKHVuaXQsJycpKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbmNob3IgZXh0ZW5kcyBEcmF3aW5ne1xuICBnZXQgdGFnKCl7cmV0dXJuICdkaXYnfVxuICBcbiAgY29udmVydFN0eWxlKGVsKXtcbiAgICBlbC5zdHlsZS5kaXNwbGF5PSdpbmxpbmUtYmxvY2snXG4gICAgZWwuc3R5bGUucG9zaXRpb249J3JlbGF0aXZlJ1xuICAgIFxuICAgIHN1cGVyLmNvbnZlcnRTdHlsZSguLi5hcmd1bWVudHMpXG4gIH1cblxufVxuXG52YXIgUG9zaXRpb25IPXtcbiAgcGFnZSh4KXtcbiAgICB2YXIgc3R5bGU9dGhpcy5zdHlsZSwgdDtcbiAgICBzd2l0Y2goeC5hbGlnbil7XG4gICAgY2FzZSAnbGVmdCc6XG4gICAgICBpZigodD10aGlzLndvcmxkLndpZHRoLWFzTnVtKHRoaXMuZG9jLnNlY3Rpb24uc3R5bGUucGFkZGluZ0xlZnQpKT49MClcbiAgICAgICAgc3R5bGUubGVmdD0wXG4gICAgICBlbHNlXG4gICAgICAgIHN0eWxlLmxlZnQ9LXQrJ3B4J1xuICAgICAgYnJlYWtcbiAgICBjYXNlICdjZW50ZXInOlxuICAgICAgc3R5bGUubGVmdD0oYXNOdW0odGhpcy5kb2Muc2VjdGlvbi5zdHlsZS53aWR0aCktdGhpcy53b3JsZC53aWR0aCkvMisncHgnXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3JpZ2h0JzogXG4gICAgICBpZigodD10aGlzLndvcmxkLndpZHRoLWFzTnVtKHRoaXMuZG9jLnNlY3Rpb24uc3R5bGUucGFkZGluZ1JpZ2h0KSk+PTApXG4gICAgICAgIHN0eWxlLnJpZ2h0PTBcbiAgICAgIGVsc2VcbiAgICAgICAgc3R5bGUucmlnaHQ9LXQrJ3B4J1xuICAgICAgYnJlYWtcbiAgICBjYXNlICdpbnNpZGUnOiBcbiAgICAgIHN0eWxlLmxlZnQ9MFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdvdXRzaWRlJzogXG4gICAgICBzdHlsZS5yaWdodD0wXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBzdHlsZS5sZWZ0PXgucG9zT2Zmc2V0KydweCdcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9LFxuICBtYXJnaW4oeCl7XG4gICAgdmFyIHNlY3Q9dGhpcy5kb2Muc2VjdGlvbi5zdHlsZVxuICAgIHN3aXRjaCh4LmFsaWduKXtcbiAgICBjYXNlICdpbnNpZGUnOiBcbiAgICBjYXNlICdsZWZ0JzpcbiAgICAgIHRoaXMuc3R5bGUubGVmdD1zZWN0LnBhZGRpbmdMZWZ0XG4gICAgICBicmVha1xuICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICB0aGlzLnN0eWxlLmxlZnQ9KGFzTnVtKHNlY3Qud2lkdGgpLWFzTnVtKHNlY3QucGFkZGluZ1JpZ2h0KSthc051bShzZWN0LnBhZGRpbmdMZWZ0KS10aGlzLndvcmxkLndpZHRoKS8yKydweCdcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnb3V0c2lkZSc6IFxuICAgIGNhc2UgJ3JpZ2h0JzogXG4gICAgICB0aGlzLnN0eWxlLnJpZ2h0PXNlY3QucGFkZGluZ1JpZ2h0XG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aGlzLnN0eWxlLmxlZnQ9KHgucG9zT2Zmc2V0K2FzTnVtKHNlY3QucGFkZGluZ0xlZnQpKSsncHgnXG4gICAgICBicmVha1xuICAgIH1cbiAgfSxcbiAgY29sdW1uKHgpe1xuICAgIEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCd3YXJuaW5nIHdhcm5pbmctcG9zaXRpb25ILWNvbHVtbicpXG4gICAgUG9zaXRpb25ILm1hcmdpbi5jYWxsKHRoaXMseClcbiAgfSxcbiAgY2hhcmFjdGVyKHgpe1xuICAgIEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvbkgtY2hhcmFjdGVyJylcbiAgfSxcbiAgbGVmdE1hcmdpbih4KXtcbiAgICBBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25ILWxlZnRNYXJnaW4nKVxuICB9LFxuICByaWdodE1hcmdpbih4KXtcbiAgICBBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25ILXJpZ2h0TWFyZ2luJylcbiAgfSxcbiAgaW5zaWRlTWFyZ2luKHgpe1xuICAgIEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvbkgtaW5zaWRlTWFyZ2luJylcbiAgfSxcbiAgb3V0c2lkZU1hcmdpbih4KXtcbiAgICBBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25ILW91dHNpZGVNYXJnaW4nKVxuICB9XG59XG52YXIgUG9zaXRpb25WPXtcbiAgcGFnZSh4KXtcbiAgICB2YXIgc3R5bGU9dGhpcy5zdHlsZSwgc2VjdD10aGlzLmRvYy5zZWN0aW9uLnN0eWxlO1xuICAgIHN3aXRjaCh4LmFsaWduKXtcbiAgICBjYXNlICd0b3AnOlxuICAgICAgc3R5bGUudG9wPTBcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnYm90dG9tJzpcbiAgICAgIHN0eWxlLmJvdHRvbT0wXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgY2FzZSAnb3V0c2lkZSc6XG4gICAgY2FzZSAnaW5zaWRlJzpcbiAgICAgIEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvblYtcGFnZS0nK3guYWxpZ24pXG4gICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgc3R5bGUudG9wPXgucG9zT2Zmc2V0KydweCdcbiAgICBicmVha1xuICAgIH1cbiAgfSxcbiAgbWFyZ2luKHgpe1xuICAgIHZhciBzdHlsZT10aGlzLnN0eWxlLHNlY3Q9dGhpcy5kb2Muc2VjdGlvbi5zdHlsZVxuICAgIHN3aXRjaCh4LmFsaWduKXtcbiAgICBjYXNlICd0b3AnOlxuICAgICAgc3R5bGUudG9wPXNlY3QucGFkZGluZ1RvcFxuICAgIGJyZWFrXG4gICAgY2FzZSAnYm90dG9tJzpcbiAgICAgIHN0eWxlLmJvdHRvbT1zZWN0LnBhZGRpbmdCb3R0b21cbiAgICBicmVha1xuICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgY2FzZSAnb3V0c2lkZSc6XG4gICAgY2FzZSAnaW5zaWRlJzpcbiAgICAgIEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvblYtbWFyZ2luLScreC5hbGlnbilcbiAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBzdHlsZS50b3A9YXNOdW0oc2VjdC5wYWRkaW5nVG9wKSt4LnBvc09mZnNldCsncHgnXG4gICAgYnJlYWtcbiAgICB9XG4gIH0sXG4gIGxpbmUoeCl7XG4gICAgQW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uVi1saW5lJylcbiAgfSxcbiAgdG9wTWFyZ2luKHgpe1xuICAgIEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvblYtdG9wTWFyZ2luJylcbiAgfSxcbiAgYm90dG9tTWFyZ2luKHgpe1xuICAgIEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvblYtYm90dG9tTWFyZ2luJylcbiAgfSxcbiAgaW5zaWRlTWFyZ2luKHgpe1xuICAgIEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvblYtaW5zaWRlTWFyZ2luJylcbiAgfSxcbiAgb3V0c2lkZU1hcmdpbih4KXtcbiAgICBBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25WLW91dHNpZGVNYXJnaW4nKVxuICB9LFxuICBwYXJhZ3JhcGgoeCl7Ly9vbmx5IG9mZnNldFxuICAgIEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvblYtcGFyYWdyYXBoJylcbiAgfVxufVxuICBcbi8vb25seSBzdXBwb3J0IGFic29sdXRlIHBhZ2Ugb2Zmc2V0XG5jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgRHJhd2luZy5Qcm9wZXJ0aWVze1xuICBnZXRQYXJhZ3JhcGhQYWRkaW5nTGVmdCgpe1xuICAgIHJldHVybiAnMHB0J1xuICB9XG4gIHBvc2l0aW9uSCh4KXtcbiAgICBQb3NpdGlvbkhbeC5yZWxhdGl2ZUZyb21dLmNhbGwodGhpcyx4KVxuICB9XG4gIHBvc2l0aW9uVih4KXtcbiAgICBQb3NpdGlvblZbeC5yZWxhdGl2ZUZyb21dLmNhbGwodGhpcyx4KVxuICB9XG4gIHdyYXAoeCl7XG4gICAgc3dpdGNoKHgpe1xuICAgIGNhc2UgJ3RpZ2h0JzpcbiAgICBjYXNlICd0aHJvdWdoJzpcbiAgICBjYXNlICdzcXVhcmUnOlxuICAgIGNhc2UgJ3RvcEFuZEJvdHRvbSc6XG4gICAgICBBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtd3JhcC0nK3gpXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aGlzLnN0eWxlLnBvc2l0aW9uPSdhYnNvbHV0ZSdcbiAgICB9XG4gIH1cbiAgYmVoaW5kRG9jKHgpe1xuICAgIHRoaXMuc3R5bGUuekluZGV4PS0xXG4gIH1cbn1cblxuQW5jaG9yLlByb3BlcnRpZXM9UHJvcGVydGllc1xuIl19