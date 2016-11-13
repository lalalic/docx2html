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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Section = function (_Style$Properties) {
	(0, _inherits3.default)(Section, _Style$Properties);

	function Section() {
		(0, _classCallCheck3.default)(this, Section);
		return (0, _possibleConstructorReturn3.default)(this, (Section.__proto__ || (0, _getPrototypeOf2.default)(Section)).apply(this, arguments));
	}

	(0, _createClass3.default)(Section, [{
		key: 'size',
		value: function size(x) {
			this.style.width = x.width + 'px';
			this.style.minHeight = x.height + 'px';
		}
	}, {
		key: 'margin',
		value: function margin(x) {
			this.style.paddingLeft = x.left + 'px';
			this.style.paddingRight = x.right + 'px';
			this.style.paddingTop = x.top + 'px';
			this.style.paddingBottom = x.bottom + 'px';

			x.gutter && (this.style['padding' + (x.gutterAtRight ? 'Right' : 'Left')] = x[x.gutterAtRight ? 'right' : 'left'] + x.gutter + 'px');
		}
	}, {
		key: 'cols',
		value: function cols(x) {
			this.styless('column-count', x.num);
			x.space && this.styless('column-gap', x.space + 'px');
			x.sep && this.styless('column-rule', '1px solid black');
		}
	}]);
	return Section;
}(_converter2.default.Properties);

exports.default = Section;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvc2VjdGlvbi5qcyJdLCJuYW1lcyI6WyJTZWN0aW9uIiwieCIsInN0eWxlIiwid2lkdGgiLCJtaW5IZWlnaHQiLCJoZWlnaHQiLCJwYWRkaW5nTGVmdCIsImxlZnQiLCJwYWRkaW5nUmlnaHQiLCJyaWdodCIsInBhZGRpbmdUb3AiLCJ0b3AiLCJwYWRkaW5nQm90dG9tIiwiYm90dG9tIiwiZ3V0dGVyIiwiZ3V0dGVyQXRSaWdodCIsInN0eWxlc3MiLCJudW0iLCJzcGFjZSIsInNlcCIsIlByb3BlcnRpZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7Ozt1QkFDZkMsQyxFQUFFO0FBQ04sUUFBS0MsS0FBTCxDQUFXQyxLQUFYLEdBQWlCRixFQUFFRSxLQUFGLEdBQVEsSUFBekI7QUFDQSxRQUFLRCxLQUFMLENBQVdFLFNBQVgsR0FBcUJILEVBQUVJLE1BQUYsR0FBUyxJQUE5QjtBQUNBOzs7eUJBQ01KLEMsRUFBRTtBQUNSLFFBQUtDLEtBQUwsQ0FBV0ksV0FBWCxHQUF1QkwsRUFBRU0sSUFBRixHQUFPLElBQTlCO0FBQ0EsUUFBS0wsS0FBTCxDQUFXTSxZQUFYLEdBQXdCUCxFQUFFUSxLQUFGLEdBQVEsSUFBaEM7QUFDQSxRQUFLUCxLQUFMLENBQVdRLFVBQVgsR0FBc0JULEVBQUVVLEdBQUYsR0FBTSxJQUE1QjtBQUNBLFFBQUtULEtBQUwsQ0FBV1UsYUFBWCxHQUF5QlgsRUFBRVksTUFBRixHQUFTLElBQWxDOztBQUVBWixLQUFFYSxNQUFGLEtBQWEsS0FBS1osS0FBTCxDQUFXLGFBQVdELEVBQUVjLGFBQUYsR0FBa0IsT0FBbEIsR0FBNEIsTUFBdkMsQ0FBWCxJQUEyRGQsRUFBR0EsRUFBRWMsYUFBRixHQUFrQixPQUFsQixHQUE0QixNQUEvQixJQUF3Q2QsRUFBRWEsTUFBMUMsR0FBaUQsSUFBekg7QUFDQTs7O3VCQUNJYixDLEVBQUU7QUFDTixRQUFLZSxPQUFMLENBQWEsY0FBYixFQUE0QmYsRUFBRWdCLEdBQTlCO0FBQ0FoQixLQUFFaUIsS0FBRixJQUFXLEtBQUtGLE9BQUwsQ0FBYSxZQUFiLEVBQTBCZixFQUFFaUIsS0FBRixHQUFRLElBQWxDLENBQVg7QUFDQWpCLEtBQUVrQixHQUFGLElBQVMsS0FBS0gsT0FBTCxDQUFhLGFBQWIsRUFBMkIsaUJBQTNCLENBQVQ7QUFDQTs7O0VBakJtQyxvQkFBTUksVTs7a0JBQXRCcEIsTyIsImZpbGUiOiJzZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4vY29udmVydGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcblx0c2l6ZSh4KXtcblx0XHR0aGlzLnN0eWxlLndpZHRoPXgud2lkdGgrJ3B4J1xuXHRcdHRoaXMuc3R5bGUubWluSGVpZ2h0PXguaGVpZ2h0KydweCdcblx0fVxuXHRtYXJnaW4oeCl7XG5cdFx0dGhpcy5zdHlsZS5wYWRkaW5nTGVmdD14LmxlZnQrJ3B4J1xuXHRcdHRoaXMuc3R5bGUucGFkZGluZ1JpZ2h0PXgucmlnaHQrJ3B4J1xuXHRcdHRoaXMuc3R5bGUucGFkZGluZ1RvcD14LnRvcCsncHgnXG5cdFx0dGhpcy5zdHlsZS5wYWRkaW5nQm90dG9tPXguYm90dG9tKydweCdcblx0XHRcblx0XHR4Lmd1dHRlciAmJiAodGhpcy5zdHlsZVsncGFkZGluZycrKHguZ3V0dGVyQXRSaWdodCA/ICdSaWdodCcgOiAnTGVmdCcpXT14Wyh4Lmd1dHRlckF0UmlnaHQgPyAncmlnaHQnIDogJ2xlZnQnKV0reC5ndXR0ZXIrJ3B4Jylcblx0fVxuXHRjb2xzKHgpe1xuXHRcdHRoaXMuc3R5bGVzcygnY29sdW1uLWNvdW50Jyx4Lm51bSlcblx0XHR4LnNwYWNlICYmIHRoaXMuc3R5bGVzcygnY29sdW1uLWdhcCcseC5zcGFjZSsncHgnKTtcblx0XHR4LnNlcCAmJiB0aGlzLnN0eWxlc3MoJ2NvbHVtbi1ydWxlJywnMXB4IHNvbGlkIGJsYWNrJyk7XG5cdH1cbn0iXX0=