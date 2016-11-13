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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bookmark = function (_Converter) {
	(0, _inherits3.default)(Bookmark, _Converter);

	function Bookmark() {
		(0, _classCallCheck3.default)(this, Bookmark);
		return (0, _possibleConstructorReturn3.default)(this, (Bookmark.__proto__ || (0, _getPrototypeOf2.default)(Bookmark)).apply(this, arguments));
	}

	(0, _createClass3.default)(Bookmark, [{
		key: 'convert',
		value: function convert() {
			if (this.parent.content.childNodes.length == 0 && !this.parent.content.id) {
				this.parent.content.id = this.wordModel.getName();
			} else {
				(0, _get3.default)(Bookmark.prototype.__proto__ || (0, _getPrototypeOf2.default)(Bookmark.prototype), 'convert', this).apply(this, arguments);
				this.content.id = this.wordModel.getName();
			}
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'i';
		}
	}]);
	return Bookmark;
}(_converter2.default);

exports.default = Bookmark;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvYm9va21hcmsuanMiXSwibmFtZXMiOlsiQm9va21hcmsiLCJwYXJlbnQiLCJjb250ZW50IiwiY2hpbGROb2RlcyIsImxlbmd0aCIsImlkIiwid29yZE1vZGVsIiwiZ2V0TmFtZSIsImFyZ3VtZW50cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsUTs7Ozs7Ozs7Ozs0QkFHWDtBQUNSLE9BQUcsS0FBS0MsTUFBTCxDQUFZQyxPQUFaLENBQW9CQyxVQUFwQixDQUErQkMsTUFBL0IsSUFBdUMsQ0FBdkMsSUFBNEMsQ0FBQyxLQUFLSCxNQUFMLENBQVlDLE9BQVosQ0FBb0JHLEVBQXBFLEVBQXVFO0FBQ3RFLFNBQUtKLE1BQUwsQ0FBWUMsT0FBWixDQUFvQkcsRUFBcEIsR0FBdUIsS0FBS0MsU0FBTCxDQUFlQyxPQUFmLEVBQXZCO0FBQ0EsSUFGRCxNQUVLO0FBQ0osdUlBQWlCQyxTQUFqQjtBQUNBLFNBQUtOLE9BQUwsQ0FBYUcsRUFBYixHQUFnQixLQUFLQyxTQUFMLENBQWVDLE9BQWYsRUFBaEI7QUFDQTtBQUNEOzs7c0JBVFE7QUFBQyxVQUFPLEdBQVA7QUFBVzs7Ozs7a0JBRERQLFEiLCJmaWxlIjoiYm9va21hcmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb29rbWFyayBleHRlbmRzIENvbnZlcnRlcntcblx0Z2V0IHRhZygpe3JldHVybiAnaSd9XG5cblx0Y29udmVydCgpe1xuXHRcdGlmKHRoaXMucGFyZW50LmNvbnRlbnQuY2hpbGROb2Rlcy5sZW5ndGg9PTAgJiYgIXRoaXMucGFyZW50LmNvbnRlbnQuaWQpe1xuXHRcdFx0dGhpcy5wYXJlbnQuY29udGVudC5pZD10aGlzLndvcmRNb2RlbC5nZXROYW1lKClcblx0XHR9ZWxzZXtcblx0XHRcdHN1cGVyLmNvbnZlcnQoLi4uYXJndW1lbnRzKVxuXHRcdFx0dGhpcy5jb250ZW50LmlkPXRoaXMud29yZE1vZGVsLmdldE5hbWUoKVxuXHRcdH1cblx0fVxuXG59Il19