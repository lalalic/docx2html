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

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

var _converter3 = require('./style/converter');

var _converter4 = _interopRequireDefault(_converter3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Drawing = function (_Converter) {
  (0, _inherits3.default)(Drawing, _Converter);

  function Drawing() {
    (0, _classCallCheck3.default)(this, Drawing);
    return (0, _possibleConstructorReturn3.default)(this, (Drawing.__proto__ || (0, _getPrototypeOf2.default)(Drawing)).apply(this, arguments));
  }

  (0, _createClass3.default)(Drawing, [{
    key: 'convertStyle',
    value: function convertStyle(el) {
      (0, _get3.default)(Drawing.prototype.__proto__ || (0, _getPrototypeOf2.default)(Drawing.prototype), 'convertStyle', this).apply(this, arguments);
      var style = this.wordModel.getDirectStyle();
      style && style.parse([new this.constructor.Properties(el.style, this)]);
    }
  }]);
  return Drawing;
}(_converter2.default);

exports.default = Drawing;

var Properties = function (_Style$Properties) {
  (0, _inherits3.default)(Properties, _Style$Properties);

  function Properties() {
    (0, _classCallCheck3.default)(this, Properties);
    return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
  }

  (0, _createClass3.default)(Properties, [{
    key: 'extent',
    value: function extent(x) {
      this.world = x;
      this.style.width = x.width + 'px';
      this.style.height = x.height + 'px';
    }
  }, {
    key: 'distL',
    value: function distL(x) {
      x && (this.style.marginLeft = x + 'px');
    }
  }, {
    key: 'distT',
    value: function distT(x) {
      x && (this.style.marginTop = x + 'px');
    }
  }, {
    key: 'distB',
    value: function distB(x) {
      x && (this.style.marginBottom = x + 'px');
    }
  }, {
    key: 'distR',
    value: function distR(x) {
      x && (this.style.marginRight = x + 'px');
    }
  }]);
  return Properties;
}(_converter4.default.Properties);

Drawing.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZHJhd2luZy5qcyJdLCJuYW1lcyI6WyJEcmF3aW5nIiwiZWwiLCJhcmd1bWVudHMiLCJzdHlsZSIsIndvcmRNb2RlbCIsImdldERpcmVjdFN0eWxlIiwicGFyc2UiLCJjb25zdHJ1Y3RvciIsIlByb3BlcnRpZXMiLCJDb252ZXJ0ZXIiLCJ4Iiwid29ybGQiLCJ3aWR0aCIsImhlaWdodCIsIm1hcmdpbkxlZnQiLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJtYXJnaW5SaWdodCIsIlN0eWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7aUNBQ05DLEUsRUFBRztBQUNkLDRJQUFzQkMsU0FBdEI7QUFDQSxVQUFJQyxRQUFNLEtBQUtDLFNBQUwsQ0FBZUMsY0FBZixFQUFWO0FBQ0FGLGVBQVNBLE1BQU1HLEtBQU4sQ0FBWSxDQUFDLElBQUksS0FBS0MsV0FBTCxDQUFpQkMsVUFBckIsQ0FBZ0NQLEdBQUdFLEtBQW5DLEVBQXlDLElBQXpDLENBQUQsQ0FBWixDQUFUO0FBQ0Q7OztFQUxrQ00sbUI7O2tCQUFoQlQsTzs7SUFTZlEsVTs7Ozs7Ozs7OzsyQkFDR0UsQyxFQUFFO0FBQ1AsV0FBS0MsS0FBTCxHQUFXRCxDQUFYO0FBQ0EsV0FBS1AsS0FBTCxDQUFXUyxLQUFYLEdBQWlCRixFQUFFRSxLQUFGLEdBQVEsSUFBekI7QUFDQSxXQUFLVCxLQUFMLENBQVdVLE1BQVgsR0FBa0JILEVBQUVHLE1BQUYsR0FBUyxJQUEzQjtBQUNEOzs7MEJBQ0tILEMsRUFBRTtBQUNOQSxZQUFNLEtBQUtQLEtBQUwsQ0FBV1csVUFBWCxHQUFzQkosSUFBRSxJQUE5QjtBQUNEOzs7MEJBQ0tBLEMsRUFBRTtBQUNOQSxZQUFNLEtBQUtQLEtBQUwsQ0FBV1ksU0FBWCxHQUFxQkwsSUFBRSxJQUE3QjtBQUNEOzs7MEJBQ0tBLEMsRUFBRTtBQUNOQSxZQUFNLEtBQUtQLEtBQUwsQ0FBV2EsWUFBWCxHQUF3Qk4sSUFBRSxJQUFoQztBQUNEOzs7MEJBQ0tBLEMsRUFBRTtBQUNOQSxZQUFNLEtBQUtQLEtBQUwsQ0FBV2MsV0FBWCxHQUF1QlAsSUFBRSxJQUEvQjtBQUNEOzs7RUFqQnNCUSxvQkFBTVYsVTs7QUFvQi9CUixRQUFRUSxVQUFSLEdBQW1CQSxVQUFuQiIsImZpbGUiOiJkcmF3aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcidcbmltcG9ydCBTdHlsZSBmcm9tICcuL3N0eWxlL2NvbnZlcnRlcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhd2luZyBleHRlbmRzIENvbnZlcnRlcntcbiAgY29udmVydFN0eWxlKGVsKXtcbiAgICBzdXBlci5jb252ZXJ0U3R5bGUoLi4uYXJndW1lbnRzKVxuICAgIHZhciBzdHlsZT10aGlzLndvcmRNb2RlbC5nZXREaXJlY3RTdHlsZSgpXG4gICAgc3R5bGUgJiYgc3R5bGUucGFyc2UoW25ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXMoZWwuc3R5bGUsdGhpcyldKVxuICB9XG5cbn1cblxuY2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG4gIGV4dGVudCh4KXtcbiAgICB0aGlzLndvcmxkPXhcbiAgICB0aGlzLnN0eWxlLndpZHRoPXgud2lkdGgrJ3B4J1xuICAgIHRoaXMuc3R5bGUuaGVpZ2h0PXguaGVpZ2h0KydweCdcbiAgfVxuICBkaXN0TCh4KXtcbiAgICB4ICYmICh0aGlzLnN0eWxlLm1hcmdpbkxlZnQ9eCsncHgnKVxuICB9XG4gIGRpc3RUKHgpe1xuICAgIHggJiYgKHRoaXMuc3R5bGUubWFyZ2luVG9wPXgrJ3B4JylcbiAgfVxuICBkaXN0Qih4KXtcbiAgICB4ICYmICh0aGlzLnN0eWxlLm1hcmdpbkJvdHRvbT14KydweCcpXG4gIH1cbiAgZGlzdFIoeCl7XG4gICAgeCAmJiAodGhpcy5zdHlsZS5tYXJnaW5SaWdodD14KydweCcpXG4gIH1cbn1cblxuRHJhd2luZy5Qcm9wZXJ0aWVzPVByb3BlcnRpZXMiXX0=