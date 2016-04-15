'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var A = function (_Converter) {
	_inherits(A, _Converter);

	function A() {
		_classCallCheck(this, A);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(A).apply(this, arguments));
	}

	_createClass(A, [{
		key: 'convert',
		value: function convert() {
			_get(Object.getPrototypeOf(A.prototype), 'convert', this).apply(this, arguments);
			var link = this.wordModel.getLink();
			link && (this.content.href = link);
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'a';
		}
	}]);

	return A;
}(_converter2.default);

exports.default = A;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7NEJBR1g7QUFDUiw4QkFKbUIsMkNBSUYsVUFBakIsQ0FEUTtBQUVSLE9BQUksT0FBSyxLQUFLLFNBQUwsQ0FBZSxPQUFmLEVBQUwsQ0FGSTtBQUdSLFlBQVMsS0FBSyxPQUFMLENBQWEsSUFBYixHQUFrQixJQUFsQixDQUFULENBSFE7Ozs7c0JBRkE7QUFBQyxVQUFPLEdBQVAsQ0FBRDs7OztRQURXIiwiZmlsZSI6ImEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBIGV4dGVuZHMgQ29udmVydGVye1xuXHRnZXQgdGFnKCl7cmV0dXJuICdhJ31cblx0XG5cdGNvbnZlcnQoKXtcblx0XHRzdXBlci5jb252ZXJ0KC4uLmFyZ3VtZW50cylcblx0XHR2YXIgbGluaz10aGlzLndvcmRNb2RlbC5nZXRMaW5rKCk7XG5cdFx0bGluayAmJiAodGhpcy5jb250ZW50LmhyZWY9bGluaylcblx0fVxuXG59Il19