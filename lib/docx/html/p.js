'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

var _paragraph = require('./style/paragraph');

var _paragraph2 = _interopRequireDefault(_paragraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Paragraph = function (_Converter) {
	_inherits(Paragraph, _Converter);

	function Paragraph() {
		_classCallCheck(this, Paragraph);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Paragraph).apply(this, arguments));
	}

	_createClass(Paragraph, [{
		key: 'convertStyle',
		value: function convertStyle(el) {
			_get(Object.getPrototypeOf(Paragraph.prototype), 'convertStyle', this).apply(this, arguments);
			var style = this.wordModel.getDirectStyle();
			style && style.parse([new _paragraph2.default.Properties(el.style)]);
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'p';
		}
	}]);

	return Paragraph;
}(_converter2.default);

exports.default = Paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OzsrQkFHUCxJQUFHO0FBQ2YsOEJBSm1CLHdEQUlHLFVBQXRCLENBRGU7QUFFZixPQUFJLFFBQU0sS0FBSyxTQUFMLENBQWUsY0FBZixFQUFOLENBRlc7QUFHZixZQUFTLE1BQU0sS0FBTixDQUFZLENBQUMsSUFBSSxvQkFBTSxVQUFOLENBQWlCLEdBQUcsS0FBSCxDQUF0QixDQUFaLENBQVQsQ0FIZTs7OztzQkFGUDtBQUFDLFVBQU8sR0FBUCxDQUFEOzs7O1FBRFciLCJmaWxlIjoicC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi9jb252ZXJ0ZXInXG5pbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZS9wYXJhZ3JhcGgnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcmFncmFwaCBleHRlbmRzIENvbnZlcnRlcntcblx0Z2V0IHRhZygpe3JldHVybiAncCd9XG5cdFxuXHRjb252ZXJ0U3R5bGUoZWwpe1xuXHRcdHN1cGVyLmNvbnZlcnRTdHlsZSguLi5hcmd1bWVudHMpXG5cdFx0dmFyIHN0eWxlPXRoaXMud29yZE1vZGVsLmdldERpcmVjdFN0eWxlKClcblx0XHRzdHlsZSAmJiBzdHlsZS5wYXJzZShbbmV3IFN0eWxlLlByb3BlcnRpZXMoZWwuc3R5bGUpXSlcblx0fVxufSJdfQ==