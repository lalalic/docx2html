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

var _table = require('./style/table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Td = function (_Converter) {
	(0, _inherits3.default)(Td, _Converter);

	function Td() {
		(0, _classCallCheck3.default)(this, Td);
		return (0, _possibleConstructorReturn3.default)(this, (Td.__proto__ || (0, _getPrototypeOf2.default)(Td)).apply(this, arguments));
	}

	(0, _createClass3.default)(Td, [{
		key: 'convertStyle',
		value: function convertStyle(el) {
			(0, _get3.default)(Td.prototype.__proto__ || (0, _getPrototypeOf2.default)(Td.prototype), 'convertStyle', this).apply(this, arguments);
			var style = this.wordModel.getDirectStyle();
			style && style.parse([new this.constructor.Properties(el.style, this)]);
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'td';
		}
	}]);
	return Td;
}(_converter2.default);

exports.default = Td;

var Properties = function (_Style$CellProperties) {
	(0, _inherits3.default)(Properties, _Style$CellProperties);

	function Properties() {
		(0, _classCallCheck3.default)(this, Properties);
		return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
	}

	(0, _createClass3.default)(Properties, [{
		key: 'tcBorders',
		value: function tcBorders(x) {
			x.left && (this.style.borderLeft = this._border(x.left));
			x.right && (this.style.borderRight = this._border(x.right));
			x.top && (this.style.borderTop = this._border(x.top));
			x.bottom && (this.style.borderBottom = this._border(x.bottom));
		}
	}, {
		key: 'cnfStyle',
		value: function cnfStyle(names) {
			if (names.length == 0) return;

			var PrioritiziedStyles = _table2.default.prototype.PrioritiziedStyles;
			names = names.sort(function (a, b) {
				return PrioritiziedStyles.indexOf(a) - PrioritiziedStyles.indexOf(b);
			});
			var level = PrioritiziedStyles.indexOf(names[names.length - 1]);

			Td.addClass(this.parent.content, names.join(' '));
			for (var i = 0; i < level; i++) {
				this.parent.content.setAttribute('x' + i, 1);
			}
		}
	}]);
	return Properties;
}(_table2.default.CellProperties);

Td.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvdGQuanMiXSwibmFtZXMiOlsiVGQiLCJlbCIsImFyZ3VtZW50cyIsInN0eWxlIiwid29yZE1vZGVsIiwiZ2V0RGlyZWN0U3R5bGUiLCJwYXJzZSIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsIkNvbnZlcnRlciIsIngiLCJsZWZ0IiwiYm9yZGVyTGVmdCIsIl9ib3JkZXIiLCJyaWdodCIsImJvcmRlclJpZ2h0IiwidG9wIiwiYm9yZGVyVG9wIiwiYm90dG9tIiwiYm9yZGVyQm90dG9tIiwibmFtZXMiLCJsZW5ndGgiLCJQcmlvcml0aXppZWRTdHlsZXMiLCJTdHlsZSIsInByb3RvdHlwZSIsInNvcnQiLCJhIiwiYiIsImluZGV4T2YiLCJsZXZlbCIsImFkZENsYXNzIiwicGFyZW50IiwiY29udGVudCIsImpvaW4iLCJpIiwic2V0QXR0cmlidXRlIiwiQ2VsbFByb3BlcnRpZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsRTs7Ozs7Ozs7OzsrQkFHUEMsRSxFQUFHO0FBQ2YsK0hBQXNCQyxTQUF0QjtBQUNBLE9BQUlDLFFBQU0sS0FBS0MsU0FBTCxDQUFlQyxjQUFmLEVBQVY7QUFDQUYsWUFBU0EsTUFBTUcsS0FBTixDQUFZLENBQUMsSUFBSSxLQUFLQyxXQUFMLENBQWlCQyxVQUFyQixDQUFnQ1AsR0FBR0UsS0FBbkMsRUFBeUMsSUFBekMsQ0FBRCxDQUFaLENBQVQ7QUFDQTs7O3NCQU5RO0FBQUMsVUFBTyxJQUFQO0FBQVk7OztFQURTTSxtQjs7a0JBQVhULEU7O0lBV2ZRLFU7Ozs7Ozs7Ozs7NEJBQ0tFLEMsRUFBRTtBQUNYQSxLQUFFQyxJQUFGLEtBQVcsS0FBS1IsS0FBTCxDQUFXUyxVQUFYLEdBQXNCLEtBQUtDLE9BQUwsQ0FBYUgsRUFBRUMsSUFBZixDQUFqQztBQUNBRCxLQUFFSSxLQUFGLEtBQVksS0FBS1gsS0FBTCxDQUFXWSxXQUFYLEdBQXVCLEtBQUtGLE9BQUwsQ0FBYUgsRUFBRUksS0FBZixDQUFuQztBQUNBSixLQUFFTSxHQUFGLEtBQVUsS0FBS2IsS0FBTCxDQUFXYyxTQUFYLEdBQXFCLEtBQUtKLE9BQUwsQ0FBYUgsRUFBRU0sR0FBZixDQUEvQjtBQUNBTixLQUFFUSxNQUFGLEtBQWEsS0FBS2YsS0FBTCxDQUFXZ0IsWUFBWCxHQUF3QixLQUFLTixPQUFMLENBQWFILEVBQUVRLE1BQWYsQ0FBckM7QUFDQTs7OzJCQUNRRSxLLEVBQU07QUFDZCxPQUFHQSxNQUFNQyxNQUFOLElBQWMsQ0FBakIsRUFDQzs7QUFFRCxPQUFNQyxxQkFBbUJDLGdCQUFNQyxTQUFOLENBQWdCRixrQkFBekM7QUFDQUYsV0FBTUEsTUFBTUssSUFBTixDQUFXLFVBQUNDLENBQUQsRUFBR0MsQ0FBSDtBQUFBLFdBQU9MLG1CQUFtQk0sT0FBbkIsQ0FBMkJGLENBQTNCLElBQThCSixtQkFBbUJNLE9BQW5CLENBQTJCRCxDQUEzQixDQUFyQztBQUFBLElBQVgsQ0FBTjtBQUNBLE9BQU1FLFFBQU1QLG1CQUFtQk0sT0FBbkIsQ0FBMkJSLE1BQU1BLE1BQU1DLE1BQU4sR0FBYSxDQUFuQixDQUEzQixDQUFaOztBQUVBckIsTUFBRzhCLFFBQUgsQ0FBWSxLQUFLQyxNQUFMLENBQVlDLE9BQXhCLEVBQWdDWixNQUFNYSxJQUFOLENBQVcsR0FBWCxDQUFoQztBQUNBLFFBQUksSUFBSUMsSUFBRSxDQUFWLEVBQVlBLElBQUVMLEtBQWQsRUFBb0JLLEdBQXBCO0FBQ0MsU0FBS0gsTUFBTCxDQUFZQyxPQUFaLENBQW9CRyxZQUFwQixDQUFpQyxNQUFJRCxDQUFyQyxFQUF1QyxDQUF2QztBQUREO0FBRUE7OztFQWxCdUJYLGdCQUFNYSxjOztBQXFCL0JwQyxHQUFHUSxVQUFILEdBQWNBLFVBQWQiLCJmaWxlIjoidGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJ1xuaW1wb3J0IFN0eWxlIGZyb20gJy4vc3R5bGUvdGFibGUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRkIGV4dGVuZHMgQ29udmVydGVye1xuXHRnZXQgdGFnKCl7cmV0dXJuICd0ZCd9XG5cdFxuXHRjb252ZXJ0U3R5bGUoZWwpe1xuXHRcdHN1cGVyLmNvbnZlcnRTdHlsZSguLi5hcmd1bWVudHMpXG5cdFx0dmFyIHN0eWxlPXRoaXMud29yZE1vZGVsLmdldERpcmVjdFN0eWxlKClcblx0XHRzdHlsZSAmJiBzdHlsZS5wYXJzZShbbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyhlbC5zdHlsZSx0aGlzKV0pXG5cdH1cblxufVxuXG5jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuQ2VsbFByb3BlcnRpZXN7XG5cdHRjQm9yZGVycyh4KXtcblx0XHR4LmxlZnQgJiYgKHRoaXMuc3R5bGUuYm9yZGVyTGVmdD10aGlzLl9ib3JkZXIoeC5sZWZ0KSlcblx0XHR4LnJpZ2h0ICYmICh0aGlzLnN0eWxlLmJvcmRlclJpZ2h0PXRoaXMuX2JvcmRlcih4LnJpZ2h0KSlcblx0XHR4LnRvcCAmJiAodGhpcy5zdHlsZS5ib3JkZXJUb3A9dGhpcy5fYm9yZGVyKHgudG9wKSlcblx0XHR4LmJvdHRvbSAmJiAodGhpcy5zdHlsZS5ib3JkZXJCb3R0b209dGhpcy5fYm9yZGVyKHguYm90dG9tKSlcblx0fVxuXHRjbmZTdHlsZShuYW1lcyl7XG5cdFx0aWYobmFtZXMubGVuZ3RoPT0wKVxuXHRcdFx0cmV0dXJuIFxuXG5cdFx0Y29uc3QgUHJpb3JpdGl6aWVkU3R5bGVzPVN0eWxlLnByb3RvdHlwZS5Qcmlvcml0aXppZWRTdHlsZXNcblx0XHRuYW1lcz1uYW1lcy5zb3J0KChhLGIpPT5Qcmlvcml0aXppZWRTdHlsZXMuaW5kZXhPZihhKS1Qcmlvcml0aXppZWRTdHlsZXMuaW5kZXhPZihiKSlcblx0XHRjb25zdCBsZXZlbD1Qcmlvcml0aXppZWRTdHlsZXMuaW5kZXhPZihuYW1lc1tuYW1lcy5sZW5ndGgtMV0pXG5cdFx0XG5cdFx0VGQuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCxuYW1lcy5qb2luKCcgJykpO1xuXHRcdGZvcih2YXIgaT0wO2k8bGV2ZWw7aSsrKVxuXHRcdFx0dGhpcy5wYXJlbnQuY29udGVudC5zZXRBdHRyaWJ1dGUoJ3gnK2ksMSlcblx0fVxufVxuXG5UZC5Qcm9wZXJ0aWVzPVByb3BlcnRpZXNcblxuXG5cbiJdfQ==