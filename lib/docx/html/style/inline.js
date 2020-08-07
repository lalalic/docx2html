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

var Inline = function (_Style) {
	(0, _inherits3.default)(Inline, _Style);

	function Inline() {
		(0, _classCallCheck3.default)(this, Inline);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Inline.__proto__ || (0, _getPrototypeOf2.default)(Inline)).apply(this, arguments));

		_this.style = _this.wordModel.id ? _this.doc.createStyle('.' + _converter2.default.asCssID(_this.wordModel.id)) : _this.doc.createStyle('span');
		_this.inline = new _this.constructor.Properties(_this.style);
		return _this;
	}

	(0, _createClass3.default)(Inline, [{
		key: '_getPropertiesConverter',
		value: function _getPropertiesConverter() {
			return this.inline;
		}
	}]);
	return Inline;
}(_converter2.default);

exports.default = Inline;


Inline.Properties = function (_Style$Properties) {
	(0, _inherits3.default)(Properties, _Style$Properties);

	function Properties() {
		(0, _classCallCheck3.default)(this, Properties);
		return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
	}

	(0, _createClass3.default)(Properties, [{
		key: 'rFonts',
		value: function rFonts(x) {
			x.ascii && (this.style.fontFamily = x.ascii);
		}
	}, {
		key: 'b',
		value: function b(x) {
			this.style.fontWeight = 700;
		}
	}, {
		key: 'sz',
		value: function sz(x) {
			this.style.fontSize = x + 'px';
		}
	}, {
		key: 'color',
		value: function color(x) {
			this.style.color = x;
		}
	}, {
		key: 'i',
		value: function i(x) {
			this.style.fontStyle = 'italics';
		}
	}, {
		key: 'u',
		value: function u(x) {
			this.style.textDecoration = 'underline';
		}
	}, {
		key: 'bdr',
		value: function bdr(x) {
			this.style.border = this._border(x);
		}
	}, {
		key: 'lang',
		value: function lang(x) {}
	}, {
		key: 'vertAlign',
		value: function vertAlign(x) {
			switch (x) {
				case 'superscript':
					this.style.verticalAlign = 'super';
					break;
				case 'subscript':
					this.style.verticalAlign = 'sub';
					break;
			}
		}
	}, {
		key: 'highlight',
		value: function highlight(x) {
			this.style.backgroundColor = x;
		}
	}]);
	return Properties;
}(_converter2.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvaW5saW5lLmpzIl0sIm5hbWVzIjpbIklubGluZSIsImFyZ3VtZW50cyIsInN0eWxlIiwid29yZE1vZGVsIiwiaWQiLCJkb2MiLCJjcmVhdGVTdHlsZSIsIlN0eWxlIiwiYXNDc3NJRCIsImlubGluZSIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsIngiLCJhc2NpaSIsImZvbnRGYW1pbHkiLCJmb250V2VpZ2h0IiwiZm9udFNpemUiLCJjb2xvciIsImZvbnRTdHlsZSIsInRleHREZWNvcmF0aW9uIiwiYm9yZGVyIiwiX2JvcmRlciIsInZlcnRpY2FsQWxpZ24iLCJiYWNrZ3JvdW5kQ29sb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsTTs7O0FBQ3BCLG1CQUFhO0FBQUE7O0FBQUEscUlBQ0hDLFNBREc7O0FBRVosUUFBS0MsS0FBTCxHQUFXLE1BQUtDLFNBQUwsQ0FBZUMsRUFBZixHQUFvQixNQUFLQyxHQUFMLENBQVNDLFdBQVQsQ0FBcUIsTUFBSUMsb0JBQU1DLE9BQU4sQ0FBYyxNQUFLTCxTQUFMLENBQWVDLEVBQTdCLENBQXpCLENBQXBCLEdBQWlGLE1BQUtDLEdBQUwsQ0FBU0MsV0FBVCxDQUFxQixNQUFyQixDQUE1RjtBQUNBLFFBQUtHLE1BQUwsR0FBWSxJQUFJLE1BQUtDLFdBQUwsQ0FBaUJDLFVBQXJCLENBQWdDLE1BQUtULEtBQXJDLENBQVo7QUFIWTtBQUlaOzs7OzRDQUN3QjtBQUN4QixVQUFPLEtBQUtPLE1BQVo7QUFDQTs7O0VBUmtDRixtQjs7a0JBQWZQLE07OztBQVdyQkEsT0FBT1csVUFBUDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSx5QkFDUUMsQ0FEUixFQUNVO0FBQ1JBLEtBQUVDLEtBQUYsS0FBWSxLQUFLWCxLQUFMLENBQVdZLFVBQVgsR0FBc0JGLEVBQUVDLEtBQXBDO0FBQ0E7QUFIRjtBQUFBO0FBQUEsb0JBSUdELENBSkgsRUFJSztBQUNILFFBQUtWLEtBQUwsQ0FBV2EsVUFBWCxHQUFzQixHQUF0QjtBQUNBO0FBTkY7QUFBQTtBQUFBLHFCQU9JSCxDQVBKLEVBT007QUFDSixRQUFLVixLQUFMLENBQVdjLFFBQVgsR0FBb0JKLElBQUUsSUFBdEI7QUFDQTtBQVRGO0FBQUE7QUFBQSx3QkFVT0EsQ0FWUCxFQVVTO0FBQ1AsUUFBS1YsS0FBTCxDQUFXZSxLQUFYLEdBQWlCTCxDQUFqQjtBQUNBO0FBWkY7QUFBQTtBQUFBLG9CQWFHQSxDQWJILEVBYUs7QUFDSCxRQUFLVixLQUFMLENBQVdnQixTQUFYLEdBQXFCLFNBQXJCO0FBQ0E7QUFmRjtBQUFBO0FBQUEsb0JBZ0JHTixDQWhCSCxFQWdCSztBQUNILFFBQUtWLEtBQUwsQ0FBV2lCLGNBQVgsR0FBMEIsV0FBMUI7QUFDQTtBQWxCRjtBQUFBO0FBQUEsc0JBbUJLUCxDQW5CTCxFQW1CTztBQUNMLFFBQUtWLEtBQUwsQ0FBV2tCLE1BQVgsR0FBa0IsS0FBS0MsT0FBTCxDQUFhVCxDQUFiLENBQWxCO0FBQ0E7QUFyQkY7QUFBQTtBQUFBLHVCQXNCTUEsQ0F0Qk4sRUFzQlEsQ0FFTjtBQXhCRjtBQUFBO0FBQUEsNEJBeUJXQSxDQXpCWCxFQXlCYTtBQUNYLFdBQU9BLENBQVA7QUFDQSxTQUFLLGFBQUw7QUFDQyxVQUFLVixLQUFMLENBQVdvQixhQUFYLEdBQXlCLE9BQXpCO0FBQ0Q7QUFDQSxTQUFLLFdBQUw7QUFDQyxVQUFLcEIsS0FBTCxDQUFXb0IsYUFBWCxHQUF5QixLQUF6QjtBQUNEO0FBTkE7QUFRQTtBQWxDRjtBQUFBO0FBQUEsNEJBbUNXVixDQW5DWCxFQW1DYTtBQUNYLFFBQUtWLEtBQUwsQ0FBV3FCLGVBQVgsR0FBMkJYLENBQTNCO0FBQ0E7QUFyQ0Y7QUFBQTtBQUFBLEVBQTJDTCxvQkFBTUksVUFBakQiLCJmaWxlIjoiaW5saW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4vY29udmVydGVyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5saW5lIGV4dGVuZHMgU3R5bGV7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMuc3R5bGU9dGhpcy53b3JkTW9kZWwuaWQgPyB0aGlzLmRvYy5jcmVhdGVTdHlsZSgnLicrU3R5bGUuYXNDc3NJRCh0aGlzLndvcmRNb2RlbC5pZCkpIDogdGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3NwYW4nKVxyXG5cdFx0dGhpcy5pbmxpbmU9bmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyh0aGlzLnN0eWxlKVxyXG5cdH1cclxuXHRfZ2V0UHJvcGVydGllc0NvbnZlcnRlcigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuaW5saW5lXHJcblx0fVxyXG59XHJcblxyXG5JbmxpbmUuUHJvcGVydGllcz1jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcclxuXHRyRm9udHMoeCl7XHJcblx0XHR4LmFzY2lpICYmICh0aGlzLnN0eWxlLmZvbnRGYW1pbHk9eC5hc2NpaSlcclxuXHR9XHJcblx0Yih4KXtcclxuXHRcdHRoaXMuc3R5bGUuZm9udFdlaWdodD03MDBcclxuXHR9XHJcblx0c3ooeCl7XHJcblx0XHR0aGlzLnN0eWxlLmZvbnRTaXplPXgrJ3B4J1xyXG5cdH1cclxuXHRjb2xvcih4KXtcclxuXHRcdHRoaXMuc3R5bGUuY29sb3I9eFxyXG5cdH1cclxuXHRpKHgpe1xyXG5cdFx0dGhpcy5zdHlsZS5mb250U3R5bGU9J2l0YWxpY3MnXHJcblx0fVxyXG5cdHUoeCl7XHJcblx0XHR0aGlzLnN0eWxlLnRleHREZWNvcmF0aW9uPSd1bmRlcmxpbmUnXHJcblx0fVxyXG5cdGJkcih4KXtcclxuXHRcdHRoaXMuc3R5bGUuYm9yZGVyPXRoaXMuX2JvcmRlcih4KVxyXG5cdH1cclxuXHRsYW5nKHgpe1xyXG5cdFx0XHJcblx0fVxyXG5cdHZlcnRBbGlnbih4KXtcclxuXHRcdHN3aXRjaCh4KXtcclxuXHRcdGNhc2UgJ3N1cGVyc2NyaXB0JzpcclxuXHRcdFx0dGhpcy5zdHlsZS52ZXJ0aWNhbEFsaWduPSdzdXBlcidcclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlICdzdWJzY3JpcHQnOlxyXG5cdFx0XHR0aGlzLnN0eWxlLnZlcnRpY2FsQWxpZ249J3N1YidcclxuXHRcdGJyZWFrXHJcblx0XHR9XHJcblx0fVxyXG5cdGhpZ2hsaWdodCh4KXtcclxuXHRcdHRoaXMuc3R5bGUuYmFja2dyb3VuZENvbG9yPXhcclxuXHR9XHJcbn0iXX0=