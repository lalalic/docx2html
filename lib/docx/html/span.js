'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

var _inline = require('./style/inline');

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Span = function (_Converter) {
	_inherits(Span, _Converter);

	function Span() {
		_classCallCheck(this, Span);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Span).apply(this, arguments));
	}

	_createClass(Span, [{
		key: 'convertStyle',
		value: function convertStyle(el) {
			_get(Object.getPrototypeOf(Span.prototype), 'convertStyle', this).apply(this, arguments);
			var style = this.wordModel.getDirectStyle();
			style && style.parse([new _inline2.default.Properties(el.style)]);
		}
	}, {
		key: '_shouldIgnore',
		value: function _shouldIgnore() {
			return this.wordModel.isWebHidden() || this.wordModel.isHidden();
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'span';
		}
	}]);

	return Span;
}(_converter2.default);

exports.default = Span;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3Bhbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OzsrQkFHUCxJQUFHO0FBQ2YsOEJBSm1CLG1EQUlHLFVBQXRCLENBRGU7QUFFZixPQUFJLFFBQU0sS0FBSyxTQUFMLENBQWUsY0FBZixFQUFOLENBRlc7QUFHZixZQUFTLE1BQU0sS0FBTixDQUFZLENBQUMsSUFBSSxpQkFBTSxVQUFOLENBQWlCLEdBQUcsS0FBSCxDQUF0QixDQUFaLENBQVQsQ0FIZTs7OztrQ0FLRDtBQUNkLFVBQU8sS0FBSyxTQUFMLENBQWUsV0FBZixNQUFnQyxLQUFLLFNBQUwsQ0FBZSxRQUFmLEVBQWhDLENBRE87Ozs7c0JBUE47QUFBQyxVQUFPLE1BQVAsQ0FBRDs7OztRQURXIiwiZmlsZSI6InNwYW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJ1xuaW1wb3J0IFN0eWxlIGZyb20gJy4vc3R5bGUvaW5saW5lJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcGFuIGV4dGVuZHMgQ29udmVydGVye1xuXHRnZXQgdGFnKCl7cmV0dXJuICdzcGFuJ31cblx0XG5cdGNvbnZlcnRTdHlsZShlbCl7XG5cdFx0c3VwZXIuY29udmVydFN0eWxlKC4uLmFyZ3VtZW50cylcblx0XHR2YXIgc3R5bGU9dGhpcy53b3JkTW9kZWwuZ2V0RGlyZWN0U3R5bGUoKVxuXHRcdHN0eWxlICYmIHN0eWxlLnBhcnNlKFtuZXcgU3R5bGUuUHJvcGVydGllcyhlbC5zdHlsZSldKVxuXHR9XG5cdF9zaG91bGRJZ25vcmUoKXtcblx0XHRyZXR1cm4gdGhpcy53b3JkTW9kZWwuaXNXZWJIaWRkZW4oKSB8fCB0aGlzLndvcmRNb2RlbC5pc0hpZGRlbigpXG5cdH1cbn0iXX0=