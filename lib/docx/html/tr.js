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

var Tr = function (_Converter) {
	(0, _inherits3.default)(Tr, _Converter);

	function Tr() {
		(0, _classCallCheck3.default)(this, Tr);
		return (0, _possibleConstructorReturn3.default)(this, (Tr.__proto__ || (0, _getPrototypeOf2.default)(Tr)).apply(this, arguments));
	}

	(0, _createClass3.default)(Tr, [{
		key: 'convertStyle',
		value: function convertStyle(el) {
			(0, _get3.default)(Tr.prototype.__proto__ || (0, _getPrototypeOf2.default)(Tr.prototype), 'convertStyle', this).apply(this, arguments);
			var style = this.wordModel.getDirectStyle();
			style && style.parse([new this.constructor.Properties(el.style, this)]);
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'tr';
		}
	}]);
	return Tr;
}(_converter2.default);

exports.default = Tr;

var Properties = function (_Style$RowProperties) {
	(0, _inherits3.default)(Properties, _Style$RowProperties);

	function Properties() {
		(0, _classCallCheck3.default)(this, Properties);
		return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
	}

	(0, _createClass3.default)(Properties, [{
		key: 'cnfStyle',
		value: function cnfStyle(names) {
			if (names.length == 0) return;

			var PrioritiziedStyles = _table2.default.prototype.PrioritiziedStyles;
			names = names.sort(function (a, b) {
				return PrioritiziedStyles.indexOf(a) - PrioritiziedStyles.indexOf(b);
			});
			var level = PrioritiziedStyles.indexOf(names[names.length - 1]);

			Tr.addClass(this.parent.content, names.join(' '));
			for (var i = 0; i < level; i++) {
				this.parent.content.setAttribute('x' + i, 1);
			}
		}
	}]);
	return Properties;
}(_table2.default.RowProperties);

Tr.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvdHIuanMiXSwibmFtZXMiOlsiVHIiLCJlbCIsImFyZ3VtZW50cyIsInN0eWxlIiwid29yZE1vZGVsIiwiZ2V0RGlyZWN0U3R5bGUiLCJwYXJzZSIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsIkNvbnZlcnRlciIsIm5hbWVzIiwibGVuZ3RoIiwiUHJpb3JpdGl6aWVkU3R5bGVzIiwiU3R5bGUiLCJwcm90b3R5cGUiLCJzb3J0IiwiYSIsImIiLCJpbmRleE9mIiwibGV2ZWwiLCJhZGRDbGFzcyIsInBhcmVudCIsImNvbnRlbnQiLCJqb2luIiwiaSIsInNldEF0dHJpYnV0ZSIsIlJvd1Byb3BlcnRpZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsRTs7Ozs7Ozs7OzsrQkFHUEMsRSxFQUFHO0FBQ2YsK0hBQXNCQyxTQUF0QjtBQUNBLE9BQUlDLFFBQU0sS0FBS0MsU0FBTCxDQUFlQyxjQUFmLEVBQVY7QUFDQUYsWUFBU0EsTUFBTUcsS0FBTixDQUFZLENBQUMsSUFBSSxLQUFLQyxXQUFMLENBQWlCQyxVQUFyQixDQUFnQ1AsR0FBR0UsS0FBbkMsRUFBMEMsSUFBMUMsQ0FBRCxDQUFaLENBQVQ7QUFDQTs7O3NCQU5RO0FBQUMsVUFBTyxJQUFQO0FBQVk7OztFQURTTSxtQjs7a0JBQVhULEU7O0lBVWZRLFU7Ozs7Ozs7Ozs7MkJBQ0lFLEssRUFBTTtBQUNkLE9BQUdBLE1BQU1DLE1BQU4sSUFBYyxDQUFqQixFQUNDOztBQUVELE9BQU1DLHFCQUFtQkMsZ0JBQU1DLFNBQU4sQ0FBZ0JGLGtCQUF6QztBQUNBRixXQUFNQSxNQUFNSyxJQUFOLENBQVcsVUFBQ0MsQ0FBRCxFQUFHQyxDQUFIO0FBQUEsV0FBT0wsbUJBQW1CTSxPQUFuQixDQUEyQkYsQ0FBM0IsSUFBOEJKLG1CQUFtQk0sT0FBbkIsQ0FBMkJELENBQTNCLENBQXJDO0FBQUEsSUFBWCxDQUFOO0FBQ0EsT0FBTUUsUUFBTVAsbUJBQW1CTSxPQUFuQixDQUEyQlIsTUFBTUEsTUFBTUMsTUFBTixHQUFhLENBQW5CLENBQTNCLENBQVo7O0FBRUFYLE1BQUdvQixRQUFILENBQVksS0FBS0MsTUFBTCxDQUFZQyxPQUF4QixFQUFnQ1osTUFBTWEsSUFBTixDQUFXLEdBQVgsQ0FBaEM7QUFDQSxRQUFJLElBQUlDLElBQUUsQ0FBVixFQUFZQSxJQUFFTCxLQUFkLEVBQW9CSyxHQUFwQjtBQUNDLFNBQUtILE1BQUwsQ0FBWUMsT0FBWixDQUFvQkcsWUFBcEIsQ0FBaUMsTUFBSUQsQ0FBckMsRUFBdUMsQ0FBdkM7QUFERDtBQUVBOzs7RUFadUJYLGdCQUFNYSxhOztBQWUvQjFCLEdBQUdRLFVBQUgsR0FBY0EsVUFBZCIsImZpbGUiOiJ0ci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi9jb252ZXJ0ZXInXG5pbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZS90YWJsZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHIgZXh0ZW5kcyBDb252ZXJ0ZXJ7XG5cdGdldCB0YWcoKXtyZXR1cm4gJ3RyJ31cblxuXHRjb252ZXJ0U3R5bGUoZWwpe1xuXHRcdHN1cGVyLmNvbnZlcnRTdHlsZSguLi5hcmd1bWVudHMpXG5cdFx0dmFyIHN0eWxlPXRoaXMud29yZE1vZGVsLmdldERpcmVjdFN0eWxlKClcblx0XHRzdHlsZSAmJiBzdHlsZS5wYXJzZShbbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyhlbC5zdHlsZSwgdGhpcyldKVxuXHR9XG59XG5cbmNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Sb3dQcm9wZXJ0aWVze1xuXHRjbmZTdHlsZShuYW1lcyl7XG5cdFx0aWYobmFtZXMubGVuZ3RoPT0wKVxuXHRcdFx0cmV0dXJuIFxuXG5cdFx0Y29uc3QgUHJpb3JpdGl6aWVkU3R5bGVzPVN0eWxlLnByb3RvdHlwZS5Qcmlvcml0aXppZWRTdHlsZXNcblx0XHRuYW1lcz1uYW1lcy5zb3J0KChhLGIpPT5Qcmlvcml0aXppZWRTdHlsZXMuaW5kZXhPZihhKS1Qcmlvcml0aXppZWRTdHlsZXMuaW5kZXhPZihiKSlcblx0XHRjb25zdCBsZXZlbD1Qcmlvcml0aXppZWRTdHlsZXMuaW5kZXhPZihuYW1lc1tuYW1lcy5sZW5ndGgtMV0pXG5cdFx0XG5cdFx0VHIuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCxuYW1lcy5qb2luKCcgJykpO1xuXHRcdGZvcih2YXIgaT0wO2k8bGV2ZWw7aSsrKVxuXHRcdFx0dGhpcy5wYXJlbnQuY29udGVudC5zZXRBdHRyaWJ1dGUoJ3gnK2ksMSlcblx0fVxufVxuXG5Uci5Qcm9wZXJ0aWVzPVByb3BlcnRpZXMiXX0=