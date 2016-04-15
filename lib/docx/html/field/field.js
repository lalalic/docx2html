'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _converter = require('../converter');

var _converter2 = _interopRequireDefault(_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Field = function (_Converter) {
	_inherits(Field, _Converter);

	function Field(wordModel, parent) {
		_classCallCheck(this, Field);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Field).apply(this, arguments));

		_this.elStart = parent.content;
		return _this;
	}

	_createClass(Field, [{
		key: 'convert',
		value: function convert(elEnd) {}
	}, {
		key: 'wordType',
		get: function get() {
			return 'field';
		}
	}]);

	return Field;
}(_converter2.default);

exports.default = Field;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZmllbGQvZmllbGQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7QUFDcEIsVUFEb0IsS0FDcEIsQ0FBWSxTQUFaLEVBQXVCLE1BQXZCLEVBQThCO3dCQURWLE9BQ1U7O3FFQURWLG1CQUVWLFlBRG9COztBQUU3QixRQUFLLE9BQUwsR0FBYSxPQUFPLE9BQVAsQ0FGZ0I7O0VBQTlCOztjQURvQjs7MEJBT1osT0FBTTs7O3NCQUZBO0FBQUMsVUFBTyxPQUFQLENBQUQ7Ozs7UUFMTSIsImZpbGUiOiJmaWVsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi4vY29udmVydGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWVsZCBleHRlbmRzIENvbnZlcnRlcntcblx0Y29uc3RydWN0b3Iod29yZE1vZGVsLCBwYXJlbnQpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLmVsU3RhcnQ9cGFyZW50LmNvbnRlbnQ7XG5cdH1cblx0Z2V0IHdvcmRUeXBlKCl7cmV0dXJuICdmaWVsZCd9XG5cblx0Y29udmVydChlbEVuZCl7fVxufSJdfQ==