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
		value: function cnfStyle(x) {
			var names = [],
			    PrioritiziedStyles = _table2.default.prototype.PrioritiziedStyles,
			    level = -1,
			    t;
			for (var i = 0; i < 12; i++) {
				if (x.charAt(i) == '1') {
					names.push(t = _table2.default.TableStyles[i]);
					if ((t = PrioritiziedStyles.indexOf(t)) > level) level = t;
				}
			}
			names.length && Td.addClass(this.parent.content, names.join(' '));
			for (var i = 0; i < level; i++) {
				this.parent.content.setAttribute('x' + i, 1);
			}
		}
	}]);
	return Properties;
}(_table2.default.CellProperties);

Td.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvdGQuanMiXSwibmFtZXMiOlsiVGQiLCJlbCIsImFyZ3VtZW50cyIsInN0eWxlIiwid29yZE1vZGVsIiwiZ2V0RGlyZWN0U3R5bGUiLCJwYXJzZSIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsIngiLCJsZWZ0IiwiYm9yZGVyTGVmdCIsIl9ib3JkZXIiLCJyaWdodCIsImJvcmRlclJpZ2h0IiwidG9wIiwiYm9yZGVyVG9wIiwiYm90dG9tIiwiYm9yZGVyQm90dG9tIiwibmFtZXMiLCJQcmlvcml0aXppZWRTdHlsZXMiLCJwcm90b3R5cGUiLCJsZXZlbCIsInQiLCJpIiwiY2hhckF0IiwicHVzaCIsIlRhYmxlU3R5bGVzIiwiaW5kZXhPZiIsImxlbmd0aCIsImFkZENsYXNzIiwicGFyZW50IiwiY29udGVudCIsImpvaW4iLCJzZXRBdHRyaWJ1dGUiLCJDZWxsUHJvcGVydGllcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxFOzs7Ozs7Ozs7OytCQUdQQyxFLEVBQUc7QUFDZiwrSEFBc0JDLFNBQXRCO0FBQ0EsT0FBSUMsUUFBTSxLQUFLQyxTQUFMLENBQWVDLGNBQWYsRUFBVjtBQUNBRixZQUFTQSxNQUFNRyxLQUFOLENBQVksQ0FBQyxJQUFJLEtBQUtDLFdBQUwsQ0FBaUJDLFVBQXJCLENBQWdDUCxHQUFHRSxLQUFuQyxFQUF5QyxJQUF6QyxDQUFELENBQVosQ0FBVDtBQUNBOzs7c0JBTlE7QUFBQyxVQUFPLElBQVA7QUFBWTs7Ozs7a0JBREZILEU7O0lBV2ZRLFU7Ozs7Ozs7Ozs7NEJBQ0tDLEMsRUFBRTtBQUNYQSxLQUFFQyxJQUFGLEtBQVcsS0FBS1AsS0FBTCxDQUFXUSxVQUFYLEdBQXNCLEtBQUtDLE9BQUwsQ0FBYUgsRUFBRUMsSUFBZixDQUFqQztBQUNBRCxLQUFFSSxLQUFGLEtBQVksS0FBS1YsS0FBTCxDQUFXVyxXQUFYLEdBQXVCLEtBQUtGLE9BQUwsQ0FBYUgsRUFBRUksS0FBZixDQUFuQztBQUNBSixLQUFFTSxHQUFGLEtBQVUsS0FBS1osS0FBTCxDQUFXYSxTQUFYLEdBQXFCLEtBQUtKLE9BQUwsQ0FBYUgsRUFBRU0sR0FBZixDQUEvQjtBQUNBTixLQUFFUSxNQUFGLEtBQWEsS0FBS2QsS0FBTCxDQUFXZSxZQUFYLEdBQXdCLEtBQUtOLE9BQUwsQ0FBYUgsRUFBRVEsTUFBZixDQUFyQztBQUNBOzs7MkJBQ1FSLEMsRUFBRTtBQUNWLE9BQUlVLFFBQU0sRUFBVjtBQUFBLE9BQWNDLHFCQUFtQixnQkFBTUMsU0FBTixDQUFnQkQsa0JBQWpEO0FBQUEsT0FBcUVFLFFBQU0sQ0FBQyxDQUE1RTtBQUFBLE9BQStFQyxDQUEvRTtBQUNBLFFBQUksSUFBSUMsSUFBRSxDQUFWLEVBQVlBLElBQUUsRUFBZCxFQUFpQkEsR0FBakIsRUFBcUI7QUFDcEIsUUFBR2YsRUFBRWdCLE1BQUYsQ0FBU0QsQ0FBVCxLQUFhLEdBQWhCLEVBQW9CO0FBQ25CTCxXQUFNTyxJQUFOLENBQVdILElBQUUsZ0JBQU1JLFdBQU4sQ0FBa0JILENBQWxCLENBQWI7QUFDQSxTQUFHLENBQUNELElBQUVILG1CQUFtQlEsT0FBbkIsQ0FBMkJMLENBQTNCLENBQUgsSUFBa0NELEtBQXJDLEVBQ0NBLFFBQU1DLENBQU47QUFDRDtBQUNEO0FBQ0RKLFNBQU1VLE1BQU4sSUFBZ0I3QixHQUFHOEIsUUFBSCxDQUFZLEtBQUtDLE1BQUwsQ0FBWUMsT0FBeEIsRUFBZ0NiLE1BQU1jLElBQU4sQ0FBVyxHQUFYLENBQWhDLENBQWhCO0FBQ0EsUUFBSSxJQUFJVCxJQUFFLENBQVYsRUFBWUEsSUFBRUYsS0FBZCxFQUFvQkUsR0FBcEI7QUFDQyxTQUFLTyxNQUFMLENBQVlDLE9BQVosQ0FBb0JFLFlBQXBCLENBQWlDLE1BQUlWLENBQXJDLEVBQXVDLENBQXZDO0FBREQ7QUFFQTs7O0VBbkJ1QixnQkFBTVcsYzs7QUFzQi9CbkMsR0FBR1EsVUFBSCxHQUFjQSxVQUFkIiwiZmlsZSI6InRkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcidcbmltcG9ydCBTdHlsZSBmcm9tICcuL3N0eWxlL3RhYmxlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZCBleHRlbmRzIENvbnZlcnRlcntcblx0Z2V0IHRhZygpe3JldHVybiAndGQnfVxuXHRcblx0Y29udmVydFN0eWxlKGVsKXtcblx0XHRzdXBlci5jb252ZXJ0U3R5bGUoLi4uYXJndW1lbnRzKVxuXHRcdHZhciBzdHlsZT10aGlzLndvcmRNb2RlbC5nZXREaXJlY3RTdHlsZSgpXG5cdFx0c3R5bGUgJiYgc3R5bGUucGFyc2UoW25ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXMoZWwuc3R5bGUsdGhpcyldKVxuXHR9XG5cbn1cblxuY2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLkNlbGxQcm9wZXJ0aWVze1xuXHR0Y0JvcmRlcnMoeCl7XG5cdFx0eC5sZWZ0ICYmICh0aGlzLnN0eWxlLmJvcmRlckxlZnQ9dGhpcy5fYm9yZGVyKHgubGVmdCkpXG5cdFx0eC5yaWdodCAmJiAodGhpcy5zdHlsZS5ib3JkZXJSaWdodD10aGlzLl9ib3JkZXIoeC5yaWdodCkpXG5cdFx0eC50b3AgJiYgKHRoaXMuc3R5bGUuYm9yZGVyVG9wPXRoaXMuX2JvcmRlcih4LnRvcCkpXG5cdFx0eC5ib3R0b20gJiYgKHRoaXMuc3R5bGUuYm9yZGVyQm90dG9tPXRoaXMuX2JvcmRlcih4LmJvdHRvbSkpXG5cdH1cblx0Y25mU3R5bGUoeCl7XG5cdFx0dmFyIG5hbWVzPVtdLCBQcmlvcml0aXppZWRTdHlsZXM9U3R5bGUucHJvdG90eXBlLlByaW9yaXRpemllZFN0eWxlcywgbGV2ZWw9LTEsIHRcblx0XHRmb3IodmFyIGk9MDtpPDEyO2krKyl7XG5cdFx0XHRpZih4LmNoYXJBdChpKT09JzEnKXtcblx0XHRcdFx0bmFtZXMucHVzaCh0PVN0eWxlLlRhYmxlU3R5bGVzW2ldKVxuXHRcdFx0XHRpZigodD1Qcmlvcml0aXppZWRTdHlsZXMuaW5kZXhPZih0KSk+bGV2ZWwpXG5cdFx0XHRcdFx0bGV2ZWw9dFxuXHRcdFx0fVxuXHRcdH1cblx0XHRuYW1lcy5sZW5ndGggJiYgVGQuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCxuYW1lcy5qb2luKCcgJykpO1xuXHRcdGZvcih2YXIgaT0wO2k8bGV2ZWw7aSsrKVxuXHRcdFx0dGhpcy5wYXJlbnQuY29udGVudC5zZXRBdHRyaWJ1dGUoJ3gnK2ksMSlcblx0fVxufVxuXG5UZC5Qcm9wZXJ0aWVzPVByb3BlcnRpZXNcblxuXG5cbiJdfQ==