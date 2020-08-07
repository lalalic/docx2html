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

var Header = function (_Converter) {
	(0, _inherits3.default)(Header, _Converter);

	function Header() {
		(0, _classCallCheck3.default)(this, Header);
		return (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || (0, _getPrototypeOf2.default)(Header)).apply(this, arguments));
	}

	(0, _createClass3.default)(Header, [{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvaGVhZGVyLmpzIl0sIm5hbWVzIjpbIkhlYWRlciIsIndvcmRNb2RlbCIsImxvY2F0aW9uIiwiQ29udmVydGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUJBLE07Ozs7Ozs7Ozs7a0NBS0w7QUFDZCxVQUFPLEtBQUtDLFNBQUwsQ0FBZUMsUUFBZixJQUF5QixTQUFoQztBQUNBOzs7c0JBTmE7QUFBQyxVQUFPLFFBQVA7QUFBZ0I7OztzQkFFdEI7QUFBQyxVQUFPLFFBQVA7QUFBZ0I7OztFQUhTQyxtQjs7a0JBQWZILE0iLCJmaWxlIjoiaGVhZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcidcdFxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVhZGVyIGV4dGVuZHMgQ29udmVydGVye1xyXG5cdGdldCB3b3JkVHlwZSgpe3JldHVybiAnaGVhZGVyJ31cclxuXHRcclxuXHRnZXQgdGFnKCl7cmV0dXJuICdoZWFkZXInfVxyXG5cdFxyXG5cdF9zaG91bGRJZ25vcmUoKXtcclxuXHRcdHJldHVybiB0aGlzLndvcmRNb2RlbC5sb2NhdGlvbiE9J2RlZmF1bHQnXHJcblx0fVxyXG59Il19