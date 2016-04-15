'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

var _section = require('./style/section');

var _section2 = _interopRequireDefault(_section);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Section = function (_Converter) {
	_inherits(Section, _Converter);

	function Section() {
		_classCallCheck(this, Section);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Section).apply(this, arguments));
	}

	_createClass(Section, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc2VjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7K0JBR1AsSUFBRztBQUNmLFFBQUssR0FBTCxDQUFTLE9BQVQsR0FBaUIsRUFBakIsQ0FEZTtBQUVmLE9BQUksUUFBTSxLQUFLLFNBQUwsQ0FBZSxjQUFmLEVBQU4sQ0FGVztBQUdmLFlBQVMsTUFBTSxLQUFOLENBQVksQ0FBQyxzQkFBVSxHQUFHLEtBQUgsQ0FBWCxDQUFaLENBQVQsQ0FIZTs7OztzQkFGUDtBQUFDLFVBQU8sU0FBUCxDQUFEOzs7O1FBRFciLCJmaWxlIjoic2VjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi9jb252ZXJ0ZXInXG5pbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZS9zZWN0aW9uJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIGV4dGVuZHMgQ29udmVydGVye1xuXHRnZXQgdGFnKCl7cmV0dXJuICdzZWN0aW9uJ31cblxuXHRjb252ZXJ0U3R5bGUoZWwpe1xuXHRcdHRoaXMuZG9jLnNlY3Rpb249ZWxcblx0XHR2YXIgc3R5bGU9dGhpcy53b3JkTW9kZWwuZ2V0RGlyZWN0U3R5bGUoKVxuXHRcdHN0eWxlICYmIHN0eWxlLnBhcnNlKFtuZXcgU3R5bGUoZWwuc3R5bGUpXSlcblx0fVxufSJdfQ==