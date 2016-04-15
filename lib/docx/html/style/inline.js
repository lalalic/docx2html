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

var Inline = function (_Style) {
	_inherits(Inline, _Style);

	function Inline() {
		_classCallCheck(this, Inline);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Inline).apply(this, arguments));

		_this.style = _this.wordModel.id ? _this.doc.createStyle('.' + _converter2.default.asCssID(_this.wordModel.id)) : _this.doc.createStyle('span');
		_this.inline = new _this.constructor.Properties(_this.style);
		return _this;
	}

	_createClass(Inline, [{
		key: '_getPropertiesConverter',
		value: function _getPropertiesConverter() {
			return this.inline;
		}
	}]);

	return Inline;
}(_converter2.default);

exports.default = Inline;


Inline.Properties = function (_Style$Properties) {
	_inherits(Properties, _Style$Properties);

	function Properties() {
		_classCallCheck(this, Properties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));
	}

	_createClass(Properties, [{
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
			this.style.fontSize = x + 'pt';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvaW5saW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ3BCLFVBRG9CLE1BQ3BCLEdBQWE7d0JBRE8sUUFDUDs7cUVBRE8sb0JBRVYsWUFERzs7QUFFWixRQUFLLEtBQUwsR0FBVyxNQUFLLFNBQUwsQ0FBZSxFQUFmLEdBQW9CLE1BQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsTUFBSSxvQkFBTSxPQUFOLENBQWMsTUFBSyxTQUFMLENBQWUsRUFBZixDQUFsQixDQUF6QyxHQUFpRixNQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLE1BQXJCLENBQWpGLENBRkM7QUFHWixRQUFLLE1BQUwsR0FBWSxJQUFJLE1BQUssV0FBTCxDQUFpQixVQUFqQixDQUE0QixNQUFLLEtBQUwsQ0FBNUMsQ0FIWTs7RUFBYjs7Y0FEb0I7OzRDQU1LO0FBQ3hCLFVBQU8sS0FBSyxNQUFMLENBRGlCOzs7O1FBTkw7Ozs7OztBQVdyQixPQUFPLFVBQVA7V0FBd0I7Ozs7Ozs7Ozs7eUJBQ2hCLEdBQUU7QUFDUixLQUFFLEtBQUYsS0FBWSxLQUFLLEtBQUwsQ0FBVyxVQUFYLEdBQXNCLEVBQUUsS0FBRixDQUFsQyxDQURROzs7O29CQUdQLEdBQUU7QUFDSCxRQUFLLEtBQUwsQ0FBVyxVQUFYLEdBQXNCLEdBQXRCLENBREc7Ozs7cUJBR0QsR0FBRTtBQUNKLFFBQUssS0FBTCxDQUFXLFFBQVgsR0FBb0IsSUFBRSxJQUFGLENBRGhCOzs7O3dCQUdDLEdBQUU7QUFDUCxRQUFLLEtBQUwsQ0FBVyxLQUFYLEdBQWlCLENBQWpCLENBRE87Ozs7b0JBR04sR0FBRTtBQUNILFFBQUssS0FBTCxDQUFXLFNBQVgsR0FBcUIsU0FBckIsQ0FERzs7OztvQkFHRixHQUFFO0FBQ0gsUUFBSyxLQUFMLENBQVcsY0FBWCxHQUEwQixXQUExQixDQURHOzs7O3NCQUdBLEdBQUU7QUFDTCxRQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQWtCLEtBQUssT0FBTCxDQUFhLENBQWIsQ0FBbEIsQ0FESzs7Ozt1QkFHRCxHQUFFOzs7NEJBR0csR0FBRTtBQUNYLFdBQU8sQ0FBUDtBQUNBLFNBQUssYUFBTDtBQUNDLFVBQUssS0FBTCxDQUFXLGFBQVgsR0FBeUIsT0FBekIsQ0FERDtBQUVBLFdBRkE7QUFEQSxTQUlLLFdBQUw7QUFDQyxVQUFLLEtBQUwsQ0FBVyxhQUFYLEdBQXlCLEtBQXpCLENBREQ7QUFFQSxXQUZBO0FBSkEsSUFEVzs7Ozs0QkFVRixHQUFFO0FBQ1gsUUFBSyxLQUFMLENBQVcsZUFBWCxHQUEyQixDQUEzQixDQURXOzs7O1FBbkNXO0VBQW1CLG9CQUFNLFVBQU4sQ0FBM0MiLCJmaWxlIjoiaW5saW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4vY29udmVydGVyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5saW5lIGV4dGVuZHMgU3R5bGV7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMuc3R5bGU9dGhpcy53b3JkTW9kZWwuaWQgPyB0aGlzLmRvYy5jcmVhdGVTdHlsZSgnLicrU3R5bGUuYXNDc3NJRCh0aGlzLndvcmRNb2RlbC5pZCkpIDogdGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3NwYW4nKVxyXG5cdFx0dGhpcy5pbmxpbmU9bmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyh0aGlzLnN0eWxlKVxyXG5cdH1cclxuXHRfZ2V0UHJvcGVydGllc0NvbnZlcnRlcigpe1xyXG5cdFx0cmV0dXJuIHRoaXMuaW5saW5lXHJcblx0fVxyXG59XHJcblxyXG5JbmxpbmUuUHJvcGVydGllcz1jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcclxuXHRyRm9udHMoeCl7XHJcblx0XHR4LmFzY2lpICYmICh0aGlzLnN0eWxlLmZvbnRGYW1pbHk9eC5hc2NpaSlcclxuXHR9XHJcblx0Yih4KXtcclxuXHRcdHRoaXMuc3R5bGUuZm9udFdlaWdodD03MDBcclxuXHR9XHJcblx0c3ooeCl7XHJcblx0XHR0aGlzLnN0eWxlLmZvbnRTaXplPXgrJ3B0J1xyXG5cdH1cclxuXHRjb2xvcih4KXtcclxuXHRcdHRoaXMuc3R5bGUuY29sb3I9eFxyXG5cdH1cclxuXHRpKHgpe1xyXG5cdFx0dGhpcy5zdHlsZS5mb250U3R5bGU9J2l0YWxpY3MnXHJcblx0fVxyXG5cdHUoeCl7XHJcblx0XHR0aGlzLnN0eWxlLnRleHREZWNvcmF0aW9uPSd1bmRlcmxpbmUnXHJcblx0fVxyXG5cdGJkcih4KXtcclxuXHRcdHRoaXMuc3R5bGUuYm9yZGVyPXRoaXMuX2JvcmRlcih4KVxyXG5cdH1cclxuXHRsYW5nKHgpe1xyXG5cdFx0XHJcblx0fVxyXG5cdHZlcnRBbGlnbih4KXtcclxuXHRcdHN3aXRjaCh4KXtcclxuXHRcdGNhc2UgJ3N1cGVyc2NyaXB0JzpcclxuXHRcdFx0dGhpcy5zdHlsZS52ZXJ0aWNhbEFsaWduPSdzdXBlcidcclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlICdzdWJzY3JpcHQnOlxyXG5cdFx0XHR0aGlzLnN0eWxlLnZlcnRpY2FsQWxpZ249J3N1YidcclxuXHRcdGJyZWFrXHJcblx0XHR9XHJcblx0fVxyXG5cdGhpZ2hsaWdodCh4KXtcclxuXHRcdHRoaXMuc3R5bGUuYmFja2dyb3VuZENvbG9yPXhcclxuXHR9XHJcbn0iXX0=