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

var _field = require('./field');

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function uptrim(el) {
	var parent = el.parentNode;
	parent.removeChild(el);
	if (parent.childNodes.length == 0) uptrim(parent);
}

var Hyperlink = function (_Field) {
	(0, _inherits3.default)(Hyperlink, _Field);

	function Hyperlink() {
		(0, _classCallCheck3.default)(this, Hyperlink);
		return (0, _possibleConstructorReturn3.default)(this, (Hyperlink.__proto__ || (0, _getPrototypeOf2.default)(Hyperlink)).apply(this, arguments));
	}

	(0, _createClass3.default)(Hyperlink, [{
		key: 'convert',
		value: function convert(elEnd) {
			var a = this.doc.createElement('a');
			a.href = this.wordModel.getLink();
			elEnd.id = this.doc.uid();

			var current = this.elStart,
			    parent = current.parentNode;
			while (!parent.querySelector('#' + elEnd.id)) {
				current = parent;
				parent = current.parentNode;
			}
			parent.insertBefore(a, current);
			while (a.nextSibling) {
				a.appendChild(a.nextSibling);
			}uptrim(this.elStart);
			uptrim(elEnd);
		}
	}]);
	return Hyperlink;
}(_field2.default);

exports.default = Hyperlink;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZmllbGQvaHlwZXJsaW5rLmpzIl0sIm5hbWVzIjpbInVwdHJpbSIsImVsIiwicGFyZW50IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiY2hpbGROb2RlcyIsImxlbmd0aCIsIkh5cGVybGluayIsImVsRW5kIiwiYSIsImRvYyIsImNyZWF0ZUVsZW1lbnQiLCJocmVmIiwid29yZE1vZGVsIiwiZ2V0TGluayIsImlkIiwidWlkIiwiY3VycmVudCIsImVsU3RhcnQiLCJxdWVyeVNlbGVjdG9yIiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCJhcHBlbmRDaGlsZCIsIkZpZWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxTQUFTQSxNQUFULENBQWdCQyxFQUFoQixFQUFtQjtBQUNsQixLQUFJQyxTQUFPRCxHQUFHRSxVQUFkO0FBQ0FELFFBQU9FLFdBQVAsQ0FBbUJILEVBQW5CO0FBQ0EsS0FBR0MsT0FBT0csVUFBUCxDQUFrQkMsTUFBbEIsSUFBMEIsQ0FBN0IsRUFDQ04sT0FBT0UsTUFBUDtBQUNEOztJQUNvQkssUzs7Ozs7Ozs7OzswQkFDWkMsSyxFQUFNO0FBQ2IsT0FBSUMsSUFBRSxLQUFLQyxHQUFMLENBQVNDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBTjtBQUNBRixLQUFFRyxJQUFGLEdBQU8sS0FBS0MsU0FBTCxDQUFlQyxPQUFmLEVBQVA7QUFDQU4sU0FBTU8sRUFBTixHQUFTLEtBQUtMLEdBQUwsQ0FBU00sR0FBVCxFQUFUOztBQUVBLE9BQUlDLFVBQVEsS0FBS0MsT0FBakI7QUFBQSxPQUEwQmhCLFNBQU9lLFFBQVFkLFVBQXpDO0FBQ0EsVUFBTSxDQUFDRCxPQUFPaUIsYUFBUCxDQUFxQixNQUFJWCxNQUFNTyxFQUEvQixDQUFQLEVBQTBDO0FBQ3pDRSxjQUFRZixNQUFSO0FBQ0FBLGFBQU9lLFFBQVFkLFVBQWY7QUFDQTtBQUNERCxVQUFPa0IsWUFBUCxDQUFvQlgsQ0FBcEIsRUFBdUJRLE9BQXZCO0FBQ0EsVUFBTVIsRUFBRVksV0FBUjtBQUNDWixNQUFFYSxXQUFGLENBQWNiLEVBQUVZLFdBQWhCO0FBREQsSUFHQXJCLE9BQU8sS0FBS2tCLE9BQVo7QUFDQWxCLFVBQU9RLEtBQVA7QUFDQTs7O0VBakJxQ2UsZTs7a0JBQWxCaEIsUyIsImZpbGUiOiJoeXBlcmxpbmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRmllbGQgZnJvbSAnLi9maWVsZCdcblxuZnVuY3Rpb24gdXB0cmltKGVsKXtcblx0dmFyIHBhcmVudD1lbC5wYXJlbnROb2RlXG5cdHBhcmVudC5yZW1vdmVDaGlsZChlbClcblx0aWYocGFyZW50LmNoaWxkTm9kZXMubGVuZ3RoPT0wKVxuXHRcdHVwdHJpbShwYXJlbnQpXG59XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIeXBlcmxpbmsgZXh0ZW5kcyBGaWVsZHtcblx0Y29udmVydChlbEVuZCl7XG5cdFx0dmFyIGE9dGhpcy5kb2MuY3JlYXRlRWxlbWVudCgnYScpXG5cdFx0YS5ocmVmPXRoaXMud29yZE1vZGVsLmdldExpbmsoKVxuXHRcdGVsRW5kLmlkPXRoaXMuZG9jLnVpZCgpXG5cdFx0XG5cdFx0dmFyIGN1cnJlbnQ9dGhpcy5lbFN0YXJ0LCBwYXJlbnQ9Y3VycmVudC5wYXJlbnROb2RlXG5cdFx0d2hpbGUoIXBhcmVudC5xdWVyeVNlbGVjdG9yKCcjJytlbEVuZC5pZCkpe1xuXHRcdFx0Y3VycmVudD1wYXJlbnRcblx0XHRcdHBhcmVudD1jdXJyZW50LnBhcmVudE5vZGVcblx0XHR9XG5cdFx0cGFyZW50Lmluc2VydEJlZm9yZShhLCBjdXJyZW50KVxuXHRcdHdoaWxlKGEubmV4dFNpYmxpbmcpXG5cdFx0XHRhLmFwcGVuZENoaWxkKGEubmV4dFNpYmxpbmcpXG5cdFx0XG5cdFx0dXB0cmltKHRoaXMuZWxTdGFydClcblx0XHR1cHRyaW0oZWxFbmQpXG5cdH1cbn0iXX0=