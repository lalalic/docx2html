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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZHJhd2luZy5qcyJdLCJuYW1lcyI6WyJEcmF3aW5nIiwiZWwiLCJhcmd1bWVudHMiLCJzdHlsZSIsIndvcmRNb2RlbCIsImdldERpcmVjdFN0eWxlIiwicGFyc2UiLCJjb25zdHJ1Y3RvciIsIlByb3BlcnRpZXMiLCJ4Iiwid29ybGQiLCJ3aWR0aCIsImhlaWdodCIsIm1hcmdpbkxlZnQiLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJtYXJnaW5SaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7OytCQUNQQyxFLEVBQUc7QUFDZix5SUFBc0JDLFNBQXRCO0FBQ0EsT0FBSUMsUUFBTSxLQUFLQyxTQUFMLENBQWVDLGNBQWYsRUFBVjtBQUNBRixZQUFTQSxNQUFNRyxLQUFOLENBQVksQ0FBQyxJQUFJLEtBQUtDLFdBQUwsQ0FBaUJDLFVBQXJCLENBQWdDUCxHQUFHRSxLQUFuQyxFQUF5QyxJQUF6QyxDQUFELENBQVosQ0FBVDtBQUNBOzs7OztrQkFMbUJILE87O0lBU2ZRLFU7Ozs7Ozs7Ozs7eUJBQ0VDLEMsRUFBRTtBQUNSLFFBQUtDLEtBQUwsR0FBV0QsQ0FBWDtBQUNBLFFBQUtOLEtBQUwsQ0FBV1EsS0FBWCxHQUFpQkYsRUFBRUUsS0FBRixHQUFRLElBQXpCO0FBQ0EsUUFBS1IsS0FBTCxDQUFXUyxNQUFYLEdBQWtCSCxFQUFFRyxNQUFGLEdBQVMsSUFBM0I7QUFDQTs7O3dCQUNLSCxDLEVBQUU7QUFDUEEsU0FBTSxLQUFLTixLQUFMLENBQVdVLFVBQVgsR0FBc0JKLElBQUUsSUFBOUI7QUFDQTs7O3dCQUNLQSxDLEVBQUU7QUFDUEEsU0FBTSxLQUFLTixLQUFMLENBQVdXLFNBQVgsR0FBcUJMLElBQUUsSUFBN0I7QUFDQTs7O3dCQUNLQSxDLEVBQUU7QUFDUEEsU0FBTSxLQUFLTixLQUFMLENBQVdZLFlBQVgsR0FBd0JOLElBQUUsSUFBaEM7QUFDQTs7O3dCQUNLQSxDLEVBQUU7QUFDUEEsU0FBTSxLQUFLTixLQUFMLENBQVdhLFdBQVgsR0FBdUJQLElBQUUsSUFBL0I7QUFDQTs7O0VBakJ1QixvQkFBTUQsVTs7QUFvQi9CUixRQUFRUSxVQUFSLEdBQW1CQSxVQUFuQiIsImZpbGUiOiJkcmF3aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcidcbmltcG9ydCBTdHlsZSBmcm9tICcuL3N0eWxlL2NvbnZlcnRlcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhd2luZyBleHRlbmRzIENvbnZlcnRlcntcblx0Y29udmVydFN0eWxlKGVsKXtcblx0XHRzdXBlci5jb252ZXJ0U3R5bGUoLi4uYXJndW1lbnRzKVxuXHRcdHZhciBzdHlsZT10aGlzLndvcmRNb2RlbC5nZXREaXJlY3RTdHlsZSgpXG5cdFx0c3R5bGUgJiYgc3R5bGUucGFyc2UoW25ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXMoZWwuc3R5bGUsdGhpcyldKVxuXHR9XG5cbn1cblxuY2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdGV4dGVudCh4KXtcblx0XHR0aGlzLndvcmxkPXhcblx0XHR0aGlzLnN0eWxlLndpZHRoPXgud2lkdGgrJ3B4J1xuXHRcdHRoaXMuc3R5bGUuaGVpZ2h0PXguaGVpZ2h0KydweCdcblx0fVxuXHRkaXN0TCh4KXtcblx0XHR4ICYmICh0aGlzLnN0eWxlLm1hcmdpbkxlZnQ9eCsncHgnKVxuXHR9XG5cdGRpc3RUKHgpe1xuXHRcdHggJiYgKHRoaXMuc3R5bGUubWFyZ2luVG9wPXgrJ3B4Jylcblx0fVxuXHRkaXN0Qih4KXtcblx0XHR4ICYmICh0aGlzLnN0eWxlLm1hcmdpbkJvdHRvbT14KydweCcpXG5cdH1cblx0ZGlzdFIoeCl7XG5cdFx0eCAmJiAodGhpcy5zdHlsZS5tYXJnaW5SaWdodD14KydweCcpXG5cdH1cbn1cblxuRHJhd2luZy5Qcm9wZXJ0aWVzPVByb3BlcnRpZXMiXX0=