'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Converter) {
	_inherits(Header, _Converter);

	function Header() {
		_classCallCheck(this, Header);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).apply(this, arguments));
	}

	_createClass(Header, [{
		key: '_shouldIgnore',
		value: function _shouldIgnore() {
			return this.wordModel.location != 'default';
		}
	}, {
		key: 'wordType',
		get: function get() {
			return 'header';
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'header';
		}
	}]);

	return Header;
}(_converter2.default);

exports.default = Header;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvaGVhZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7a0NBS0w7QUFDZCxVQUFPLEtBQUssU0FBTCxDQUFlLFFBQWYsSUFBeUIsU0FBekIsQ0FETzs7OztzQkFKRDtBQUFDLFVBQU8sUUFBUCxDQUFEOzs7O3NCQUVMO0FBQUMsVUFBTyxRQUFQLENBQUQ7Ozs7UUFIVyIsImZpbGUiOiJoZWFkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJ1x0XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXIgZXh0ZW5kcyBDb252ZXJ0ZXJ7XHJcblx0Z2V0IHdvcmRUeXBlKCl7cmV0dXJuICdoZWFkZXInfVxyXG5cdFxyXG5cdGdldCB0YWcoKXtyZXR1cm4gJ2hlYWRlcid9XHJcblx0XHJcblx0X3Nob3VsZElnbm9yZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMud29yZE1vZGVsLmxvY2F0aW9uIT0nZGVmYXVsdCdcclxuXHR9XHJcbn0iXX0=