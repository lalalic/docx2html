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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc2VjdGlvbi5qcyJdLCJuYW1lcyI6WyJTZWN0aW9uIiwiZWwiLCJkb2MiLCJzZWN0aW9uIiwic3R5bGUiLCJ3b3JkTW9kZWwiLCJnZXREaXJlY3RTdHlsZSIsInBhcnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsTzs7Ozs7Ozs7OzsrQkFHUEMsRSxFQUFHO0FBQ2YsUUFBS0MsR0FBTCxDQUFTQyxPQUFULEdBQWlCRixFQUFqQjtBQUNBLE9BQUlHLFFBQU0sS0FBS0MsU0FBTCxDQUFlQyxjQUFmLEVBQVY7QUFDQUYsWUFBU0EsTUFBTUcsS0FBTixDQUFZLENBQUMsc0JBQVVOLEdBQUdHLEtBQWIsQ0FBRCxDQUFaLENBQVQ7QUFDQTs7O3NCQU5RO0FBQUMsVUFBTyxTQUFQO0FBQWlCOzs7OztrQkFEUEosTyIsImZpbGUiOiJzZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcidcbmltcG9ydCBTdHlsZSBmcm9tICcuL3N0eWxlL3NlY3Rpb24nXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlY3Rpb24gZXh0ZW5kcyBDb252ZXJ0ZXJ7XG5cdGdldCB0YWcoKXtyZXR1cm4gJ3NlY3Rpb24nfVxuXG5cdGNvbnZlcnRTdHlsZShlbCl7XG5cdFx0dGhpcy5kb2Muc2VjdGlvbj1lbFxuXHRcdHZhciBzdHlsZT10aGlzLndvcmRNb2RlbC5nZXREaXJlY3RTdHlsZSgpXG5cdFx0c3R5bGUgJiYgc3R5bGUucGFyc2UoW25ldyBTdHlsZShlbC5zdHlsZSldKVxuXHR9XG59Il19