'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _p = require('./p');

var _p2 = _interopRequireDefault(_p);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var H = function (_Paragraph) {
	_inherits(H, _Paragraph);

	function H() {
		_classCallCheck(this, H);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(H).apply(this, arguments));
	}

	_createClass(H, [{
		key: 'tag',
		get: function get() {
			return 'h' + (this.wordModel.getOutlineLevel() + 1);
		}
	}]);

	return H;
}(_p2.default);

exports.default = H;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O3NCQUNYO0FBQ1IsaUJBQVcsS0FBSyxTQUFMLENBQWUsZUFBZixLQUFpQyxDQUFqQyxDQUFYLENBRFE7Ozs7UUFEVyIsImZpbGUiOiJoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhcmFncmFwaCBmcm9tICcuL3AnXHRcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSCBleHRlbmRzIFBhcmFncmFwaHtcblx0Z2V0IHRhZygpe1xuXHRcdHJldHVybiBgaCR7dGhpcy53b3JkTW9kZWwuZ2V0T3V0bGluZUxldmVsKCkrMX1gXG5cdH1cbn0iXX0=