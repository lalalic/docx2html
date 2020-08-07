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

var _section = require('./style/section');

var _section2 = _interopRequireDefault(_section);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Section = function (_Converter) {
	(0, _inherits3.default)(Section, _Converter);

	function Section() {
		(0, _classCallCheck3.default)(this, Section);
		return (0, _possibleConstructorReturn3.default)(this, (Section.__proto__ || (0, _getPrototypeOf2.default)(Section)).apply(this, arguments));
	}

	(0, _createClass3.default)(Section, [{
		key: 'convertStyle',
		value: function convertStyle(el) {
			this.doc.section = el;
			var style = this.wordModel.getDirectStyle();
			style && style.parse([new _section2.default(el.style)]);
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'section';
		}
	}]);
	return Section;
}(_converter2.default);

exports.default = Section;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc2VjdGlvbi5qcyJdLCJuYW1lcyI6WyJTZWN0aW9uIiwiZWwiLCJkb2MiLCJzZWN0aW9uIiwic3R5bGUiLCJ3b3JkTW9kZWwiLCJnZXREaXJlY3RTdHlsZSIsInBhcnNlIiwiU3R5bGUiLCJDb252ZXJ0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7OytCQUdQQyxFLEVBQUc7QUFDZixRQUFLQyxHQUFMLENBQVNDLE9BQVQsR0FBaUJGLEVBQWpCO0FBQ0EsT0FBSUcsUUFBTSxLQUFLQyxTQUFMLENBQWVDLGNBQWYsRUFBVjtBQUNBRixZQUFTQSxNQUFNRyxLQUFOLENBQVksQ0FBQyxJQUFJQyxpQkFBSixDQUFVUCxHQUFHRyxLQUFiLENBQUQsQ0FBWixDQUFUO0FBQ0E7OztzQkFOUTtBQUFDLFVBQU8sU0FBUDtBQUFpQjs7O0VBRFNLLG1COztrQkFBaEJULE8iLCJmaWxlIjoic2VjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi9jb252ZXJ0ZXInXG5pbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZS9zZWN0aW9uJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIGV4dGVuZHMgQ29udmVydGVye1xuXHRnZXQgdGFnKCl7cmV0dXJuICdzZWN0aW9uJ31cblxuXHRjb252ZXJ0U3R5bGUoZWwpe1xuXHRcdHRoaXMuZG9jLnNlY3Rpb249ZWxcblx0XHR2YXIgc3R5bGU9dGhpcy53b3JkTW9kZWwuZ2V0RGlyZWN0U3R5bGUoKVxuXHRcdHN0eWxlICYmIHN0eWxlLnBhcnNlKFtuZXcgU3R5bGUoZWwuc3R5bGUpXSlcblx0fVxufSJdfQ==