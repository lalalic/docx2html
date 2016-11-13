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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvdGV4dC5qcyJdLCJuYW1lcyI6WyJUZXh0IiwicGFyZW50IiwiY29udGVudCIsImFwcGVuZENoaWxkIiwiZG9jIiwiY3JlYXRlVGV4dE5vZGUiLCJ3b3JkTW9kZWwiLCJnZXRUZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7NEJBQ1g7QUFDUixRQUFLQyxNQUFMLENBQVlDLE9BQVosQ0FBb0JDLFdBQXBCLENBQWdDLEtBQUtDLEdBQUwsQ0FBU0MsY0FBVCxDQUF3QixLQUFLQyxTQUFMLENBQWVDLE9BQWYsRUFBeEIsQ0FBaEM7QUFDQTs7Ozs7a0JBSG1CUCxJIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0IGV4dGVuZHMgQ29udmVydGVye1xuXHRjb252ZXJ0KCl7XG5cdFx0dGhpcy5wYXJlbnQuY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLmRvYy5jcmVhdGVUZXh0Tm9kZSh0aGlzLndvcmRNb2RlbC5nZXRUZXh0KCkpKVxuXHR9XG59Il19