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

var FieldBegin = function (_Converter) {
	_inherits(FieldBegin, _Converter);

	function FieldBegin() {
		_classCallCheck(this, FieldBegin);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(FieldBegin).apply(this, arguments));
	}

	_createClass(FieldBegin, [{
		key: 'wordType',
		get: function get() {
			return 'fieldEnd';
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'span';
		}
	}]);

	return FieldBegin;
}(_converter2.default);

exports.default = FieldBegin;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZmllbGRFbmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OztzQkFDTjtBQUFDLFVBQU8sVUFBUCxDQUFEOzs7O3NCQUVMO0FBQUMsVUFBTyxNQUFQLENBQUQ7Ozs7UUFIVyIsImZpbGUiOiJmaWVsZEVuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi9jb252ZXJ0ZXInXHRcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmllbGRCZWdpbiBleHRlbmRzIENvbnZlcnRlcntcblx0Z2V0IHdvcmRUeXBlKCl7cmV0dXJuICdmaWVsZEVuZCd9XG5cdFxuXHRnZXQgdGFnKCl7cmV0dXJuICdzcGFuJ31cbn0iXX0=