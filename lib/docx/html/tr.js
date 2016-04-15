'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

var _table = require('./style/table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tr = function (_Converter) {
	_inherits(Tr, _Converter);

	function Tr() {
		_classCallCheck(this, Tr);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Tr).apply(this, arguments));
	}

	_createClass(Tr, [{
		key: 'convertStyle',
		value: function convertStyle(el) {
			_get(Object.getPrototypeOf(Tr.prototype), 'convertStyle', this).apply(this, arguments);
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
	_inherits(Properties, _Style$RowProperties);

	function Properties() {
		_classCallCheck(this, Properties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));
	}

	_createClass(Properties, [{
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
}(_table2.default.RowProperties);

Tr.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvdHIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7K0JBR1AsSUFBRztBQUNmLDhCQUptQixpREFJRyxVQUF0QixDQURlO0FBRWYsT0FBSSxRQUFNLEtBQUssU0FBTCxDQUFlLGNBQWYsRUFBTixDQUZXO0FBR2YsWUFBUyxNQUFNLEtBQU4sQ0FBWSxDQUFDLElBQUksS0FBSyxXQUFMLENBQWlCLFVBQWpCLENBQTRCLEdBQUcsS0FBSCxFQUFVLElBQTFDLENBQUQsQ0FBWixDQUFULENBSGU7Ozs7c0JBRlA7QUFBQyxVQUFPLElBQVAsQ0FBRDs7OztRQURXOzs7OztJQVVmOzs7Ozs7Ozs7OzsyQkFDSSxHQUFFO0FBQ1YsT0FBSSxRQUFNLEVBQU47T0FBVSxxQkFBbUIsZ0JBQU0sU0FBTixDQUFnQixrQkFBaEI7T0FBb0MsUUFBTSxDQUFDLENBQUQ7T0FBSSxDQUEvRSxDQURVO0FBRVYsUUFBSSxJQUFJLElBQUUsQ0FBRixFQUFJLElBQUUsRUFBRixFQUFLLEdBQWpCLEVBQXFCO0FBQ3BCLFFBQUcsRUFBRSxNQUFGLENBQVMsQ0FBVCxLQUFhLEdBQWIsRUFBaUI7QUFDbkIsV0FBTSxJQUFOLENBQVcsSUFBRSxnQkFBTSxXQUFOLENBQWtCLENBQWxCLENBQUYsQ0FBWCxDQURtQjtBQUVuQixTQUFHLENBQUMsSUFBRSxtQkFBbUIsT0FBbkIsQ0FBMkIsQ0FBM0IsQ0FBRixDQUFELEdBQWtDLEtBQWxDLEVBQ0YsUUFBTSxDQUFOLENBREQ7S0FGRDtJQUREO0FBT0EsU0FBTSxNQUFOLElBQWdCLEdBQUcsUUFBSCxDQUFZLEtBQUssTUFBTCxDQUFZLE9BQVosRUFBb0IsTUFBTSxJQUFOLENBQVcsR0FBWCxDQUFoQyxDQUFoQixDQVRVO0FBVVYsUUFBSSxJQUFJLElBQUUsQ0FBRixFQUFJLElBQUUsS0FBRixFQUFRLEdBQXBCO0FBQ0MsU0FBSyxNQUFMLENBQVksT0FBWixDQUFvQixZQUFwQixDQUFpQyxNQUFJLENBQUosRUFBTSxDQUF2QztJQUREOzs7O1FBWEk7RUFBbUIsZ0JBQU0sYUFBTjs7QUFnQnpCLEdBQUcsVUFBSCxHQUFjLFVBQWQiLCJmaWxlIjoidHIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJ1xuaW1wb3J0IFN0eWxlIGZyb20gJy4vc3R5bGUvdGFibGUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyIGV4dGVuZHMgQ29udmVydGVye1xuXHRnZXQgdGFnKCl7cmV0dXJuICd0cid9XG5cblx0Y29udmVydFN0eWxlKGVsKXtcblx0XHRzdXBlci5jb252ZXJ0U3R5bGUoLi4uYXJndW1lbnRzKVxuXHRcdHZhciBzdHlsZT10aGlzLndvcmRNb2RlbC5nZXREaXJlY3RTdHlsZSgpXG5cdFx0c3R5bGUgJiYgc3R5bGUucGFyc2UoW25ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXMoZWwuc3R5bGUsIHRoaXMpXSlcblx0fVxufVxuXG5jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUm93UHJvcGVydGllc3tcblx0Y25mU3R5bGUoeCl7XG5cdFx0dmFyIG5hbWVzPVtdLCBQcmlvcml0aXppZWRTdHlsZXM9U3R5bGUucHJvdG90eXBlLlByaW9yaXRpemllZFN0eWxlcywgbGV2ZWw9LTEsIHRcblx0XHRmb3IodmFyIGk9MDtpPDEyO2krKyl7XG5cdFx0XHRpZih4LmNoYXJBdChpKT09JzEnKXtcblx0XHRcdFx0bmFtZXMucHVzaCh0PVN0eWxlLlRhYmxlU3R5bGVzW2ldKVxuXHRcdFx0XHRpZigodD1Qcmlvcml0aXppZWRTdHlsZXMuaW5kZXhPZih0KSk+bGV2ZWwpXG5cdFx0XHRcdFx0bGV2ZWw9dFxuXHRcdFx0fVxuXHRcdH1cblx0XHRuYW1lcy5sZW5ndGggJiYgVGQuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCxuYW1lcy5qb2luKCcgJykpO1xuXHRcdGZvcih2YXIgaT0wO2k8bGV2ZWw7aSsrKVxuXHRcdFx0dGhpcy5wYXJlbnQuY29udGVudC5zZXRBdHRyaWJ1dGUoJ3gnK2ksMSlcblx0fVxufVxuXG5Uci5Qcm9wZXJ0aWVzPVByb3BlcnRpZXMiXX0=