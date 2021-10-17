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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = function (_Converter) {
	(0, _inherits3.default)(Text, _Converter);

	function Text() {
		(0, _classCallCheck3.default)(this, Text);
		return (0, _possibleConstructorReturn3.default)(this, (Text.__proto__ || (0, _getPrototypeOf2.default)(Text)).apply(this, arguments));
	}

	(0, _createClass3.default)(Text, [{
		key: 'convert',
		value: function convert() {
			this.parent.content.appendChild(this.doc.createTextNode(this.wordModel.getText()));
		}
	}]);
	return Text;
}(_converter2.default);

exports.default = Text;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvdGV4dC5qcyJdLCJuYW1lcyI6WyJUZXh0IiwicGFyZW50IiwiY29udGVudCIsImFwcGVuZENoaWxkIiwiZG9jIiwiY3JlYXRlVGV4dE5vZGUiLCJ3b3JkTW9kZWwiLCJnZXRUZXh0IiwiQ29udmVydGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7NEJBQ1g7QUFDUixRQUFLQyxNQUFMLENBQVlDLE9BQVosQ0FBb0JDLFdBQXBCLENBQWdDLEtBQUtDLEdBQUwsQ0FBU0MsY0FBVCxDQUF3QixLQUFLQyxTQUFMLENBQWVDLE9BQWYsRUFBeEIsQ0FBaEM7QUFDQTs7O0VBSGdDQyxtQjs7a0JBQWJSLEkiLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi9jb252ZXJ0ZXInXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHQgZXh0ZW5kcyBDb252ZXJ0ZXJ7XG5cdGNvbnZlcnQoKXtcblx0XHR0aGlzLnBhcmVudC5jb250ZW50LmFwcGVuZENoaWxkKHRoaXMuZG9jLmNyZWF0ZVRleHROb2RlKHRoaXMud29yZE1vZGVsLmdldFRleHQoKSkpXG5cdH1cbn0iXX0=