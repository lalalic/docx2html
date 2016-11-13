'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _drawing = require('./drawing');

var _drawing2 = _interopRequireDefault(_drawing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Graphic = function (_Drawing) {
	(0, _inherits3.default)(Graphic, _Drawing);

	function Graphic() {
		(0, _classCallCheck3.default)(this, Graphic);
		return (0, _possibleConstructorReturn3.default)(this, (Graphic.__proto__ || (0, _getPrototypeOf2.default)(Graphic)).apply(this, arguments));
	}

	(0, _createClass3.default)(Graphic, [{
		key: 'tag',
		get: function get() {
			return 'span';
		}
	}]);
	return Graphic;
}(_drawing2.default);

exports.default = Graphic;

var Properties = function (_Drawing$Properties) {
	(0, _inherits3.default)(Properties, _Drawing$Properties);

	function Properties() {
		(0, _classCallCheck3.default)(this, Properties);
		return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
	}

	(0, _createClass3.default)(Properties, [{
		key: 'solidFill',
		value: function solidFill(x) {
			this.style.backgroundColor = x;
		}
	}, {
		key: 'gradFill',
		value: function gradFill(x) {}
	}, {
		key: 'noFill',
		value: function noFill(x) {
			this.style.background = 'transparent';
		}
	}, {
		key: 'fillRef',
		value: function fillRef(x) {
			switch (typeof x === 'undefined' ? 'undefined' : (0, _typeof3.default)(x)) {
				case 'string':
					return this.solidFill(x);
				case 'object':
					return this.gradFill(x);
				case 'number':
					return this.noFill(x);
			}
		}
	}, {
		key: 'ln',
		value: function ln(x) {
			x.color && (this.style.borderColor = x.color);
			x.width && (this.style.borderWidth = x.width + 'px', this.style.borderStyle = 'solid');
			x.dash && (this.style.borderStyle = this.lineStyle(x.dash));
			x.cap === 'rnd' && (this.style.borderRadius = x.width * 2 + 'px');
		}
	}, {
		key: 'xfrm',
		value: function xfrm(x) {
			this.style.width = x.width + 'px';
			this.style.height = x.height + 'px';
			x.x && (this.style.left = x.x + 'px');
			x.y && (this.style.top = x.y + 'px');
		}
	}]);
	return Properties;
}(_drawing2.default.Properties);

Graphic.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZ3JhcGhpYy5qcyJdLCJuYW1lcyI6WyJHcmFwaGljIiwiUHJvcGVydGllcyIsIngiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsImJhY2tncm91bmQiLCJzb2xpZEZpbGwiLCJncmFkRmlsbCIsIm5vRmlsbCIsImNvbG9yIiwiYm9yZGVyQ29sb3IiLCJ3aWR0aCIsImJvcmRlcldpZHRoIiwiYm9yZGVyU3R5bGUiLCJkYXNoIiwibGluZVN0eWxlIiwiY2FwIiwiYm9yZGVyUmFkaXVzIiwiaGVpZ2h0IiwibGVmdCIsInkiLCJ0b3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7c0JBQ1g7QUFBQyxVQUFPLE1BQVA7QUFBYzs7Ozs7a0JBREpBLE87O0lBSWZDLFU7Ozs7Ozs7Ozs7NEJBQ0tDLEMsRUFBRTtBQUNYLFFBQUtDLEtBQUwsQ0FBV0MsZUFBWCxHQUEyQkYsQ0FBM0I7QUFDQTs7OzJCQUNRQSxDLEVBQUUsQ0FFVjs7O3lCQUNNQSxDLEVBQUU7QUFDUixRQUFLQyxLQUFMLENBQVdFLFVBQVgsR0FBc0IsYUFBdEI7QUFDQTs7OzBCQUNPSCxDLEVBQUU7QUFDVCxrQkFBY0EsQ0FBZCx1REFBY0EsQ0FBZDtBQUNBLFNBQUssUUFBTDtBQUNDLFlBQU8sS0FBS0ksU0FBTCxDQUFlSixDQUFmLENBQVA7QUFDRCxTQUFLLFFBQUw7QUFDQyxZQUFPLEtBQUtLLFFBQUwsQ0FBY0wsQ0FBZCxDQUFQO0FBQ0QsU0FBSyxRQUFMO0FBQ0MsWUFBTyxLQUFLTSxNQUFMLENBQVlOLENBQVosQ0FBUDtBQU5EO0FBUUE7OztxQkFDRUEsQyxFQUFFO0FBQ0pBLEtBQUVPLEtBQUYsS0FBWSxLQUFLTixLQUFMLENBQVdPLFdBQVgsR0FBdUJSLEVBQUVPLEtBQXJDO0FBQ0FQLEtBQUVTLEtBQUYsS0FBWSxLQUFLUixLQUFMLENBQVdTLFdBQVgsR0FBdUJWLEVBQUVTLEtBQUYsR0FBUSxJQUEvQixFQUFxQyxLQUFLUixLQUFMLENBQVdVLFdBQVgsR0FBdUIsT0FBeEU7QUFDQVgsS0FBRVksSUFBRixLQUFXLEtBQUtYLEtBQUwsQ0FBV1UsV0FBWCxHQUF1QixLQUFLRSxTQUFMLENBQWViLEVBQUVZLElBQWpCLENBQWxDO0FBQ0FaLEtBQUVjLEdBQUYsS0FBUSxLQUFSLEtBQWtCLEtBQUtiLEtBQUwsQ0FBV2MsWUFBWCxHQUF3QmYsRUFBRVMsS0FBRixHQUFRLENBQVIsR0FBVSxJQUFwRDtBQUNBOzs7dUJBQ0lULEMsRUFBRTtBQUNOLFFBQUtDLEtBQUwsQ0FBV1EsS0FBWCxHQUFpQlQsRUFBRVMsS0FBRixHQUFRLElBQXpCO0FBQ0EsUUFBS1IsS0FBTCxDQUFXZSxNQUFYLEdBQWtCaEIsRUFBRWdCLE1BQUYsR0FBUyxJQUEzQjtBQUNBaEIsS0FBRUEsQ0FBRixLQUFRLEtBQUtDLEtBQUwsQ0FBV2dCLElBQVgsR0FBZ0JqQixFQUFFQSxDQUFGLEdBQUksSUFBNUI7QUFDQUEsS0FBRWtCLENBQUYsS0FBUSxLQUFLakIsS0FBTCxDQUFXa0IsR0FBWCxHQUFlbkIsRUFBRWtCLENBQUYsR0FBSSxJQUEzQjtBQUNBOzs7RUEvQnVCLGtCQUFRbkIsVTs7QUFrQ2pDRCxRQUFRQyxVQUFSLEdBQW1CQSxVQUFuQiIsImZpbGUiOiJncmFwaGljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERyYXdpbmcgZnJvbSAnLi9kcmF3aW5nJ1x0XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoaWMgZXh0ZW5kcyBEcmF3aW5ne1xuXHRnZXQgdGFnKCl7cmV0dXJuICdzcGFuJ31cbn1cblxuY2xhc3MgUHJvcGVydGllcyBleHRlbmRzIERyYXdpbmcuUHJvcGVydGllc3tcblx0c29saWRGaWxsKHgpe1xuXHRcdHRoaXMuc3R5bGUuYmFja2dyb3VuZENvbG9yPXhcblx0fVxuXHRncmFkRmlsbCh4KXtcblx0XHRcblx0fVxuXHRub0ZpbGwoeCl7XG5cdFx0dGhpcy5zdHlsZS5iYWNrZ3JvdW5kPSd0cmFuc3BhcmVudCdcblx0fVxuXHRmaWxsUmVmKHgpe1xuXHRcdHN3aXRjaCh0eXBlb2YoeCkpe1xuXHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRyZXR1cm4gdGhpcy5zb2xpZEZpbGwoeClcblx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0cmV0dXJuIHRoaXMuZ3JhZEZpbGwoeClcblx0XHRjYXNlICdudW1iZXInOlxuXHRcdFx0cmV0dXJuIHRoaXMubm9GaWxsKHgpXG5cdFx0fVxuXHR9XG5cdGxuKHgpe1xuXHRcdHguY29sb3IgJiYgKHRoaXMuc3R5bGUuYm9yZGVyQ29sb3I9eC5jb2xvcik7XG5cdFx0eC53aWR0aCAmJiAodGhpcy5zdHlsZS5ib3JkZXJXaWR0aD14LndpZHRoKydweCcsIHRoaXMuc3R5bGUuYm9yZGVyU3R5bGU9J3NvbGlkJyk7XG5cdFx0eC5kYXNoICYmICh0aGlzLnN0eWxlLmJvcmRlclN0eWxlPXRoaXMubGluZVN0eWxlKHguZGFzaCkpO1xuXHRcdHguY2FwPT09J3JuZCcgJiYgKHRoaXMuc3R5bGUuYm9yZGVyUmFkaXVzPXgud2lkdGgqMisncHgnKVxuXHR9XG5cdHhmcm0oeCl7XG5cdFx0dGhpcy5zdHlsZS53aWR0aD14LndpZHRoKydweCdcblx0XHR0aGlzLnN0eWxlLmhlaWdodD14LmhlaWdodCsncHgnXG5cdFx0eC54ICYmICh0aGlzLnN0eWxlLmxlZnQ9eC54KydweCcpXG5cdFx0eC55ICYmICh0aGlzLnN0eWxlLnRvcD14LnkrJ3B4Jylcblx0fVxufVxuXG5HcmFwaGljLlByb3BlcnRpZXM9UHJvcGVydGllcyJdfQ==