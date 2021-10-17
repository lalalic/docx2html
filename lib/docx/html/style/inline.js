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
			x && x.ascii && (this.style.fontFamily = x.ascii);
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
			this.style.fontStyle = 'italic';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvaW5saW5lLmpzIl0sIm5hbWVzIjpbIklubGluZSIsImFyZ3VtZW50cyIsInN0eWxlIiwid29yZE1vZGVsIiwiaWQiLCJkb2MiLCJjcmVhdGVTdHlsZSIsIlN0eWxlIiwiYXNDc3NJRCIsImlubGluZSIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsIngiLCJhc2NpaSIsImZvbnRGYW1pbHkiLCJmb250V2VpZ2h0IiwiZm9udFNpemUiLCJjb2xvciIsImZvbnRTdHlsZSIsInRleHREZWNvcmF0aW9uIiwiYm9yZGVyIiwiX2JvcmRlciIsInZlcnRpY2FsQWxpZ24iLCJiYWNrZ3JvdW5kQ29sb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsTTs7O0FBQ3BCLG1CQUFhO0FBQUE7O0FBQUEscUlBQ0hDLFNBREc7O0FBRVosUUFBS0MsS0FBTCxHQUFXLE1BQUtDLFNBQUwsQ0FBZUMsRUFBZixHQUFvQixNQUFLQyxHQUFMLENBQVNDLFdBQVQsQ0FBcUIsTUFBSUMsb0JBQU1DLE9BQU4sQ0FBYyxNQUFLTCxTQUFMLENBQWVDLEVBQTdCLENBQXpCLENBQXBCLEdBQWlGLE1BQUtDLEdBQUwsQ0FBU0MsV0FBVCxDQUFxQixNQUFyQixDQUE1RjtBQUNBLFFBQUtHLE1BQUwsR0FBWSxJQUFJLE1BQUtDLFdBQUwsQ0FBaUJDLFVBQXJCLENBQWdDLE1BQUtULEtBQXJDLENBQVo7QUFIWTtBQUlaOzs7OzRDQUN3QjtBQUN4QixVQUFPLEtBQUtPLE1BQVo7QUFDQTs7O0VBUmtDRixtQjs7a0JBQWZQLE07OztBQVdyQkEsT0FBT1csVUFBUDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSx5QkFDUUMsQ0FEUixFQUNVO0FBQ1BBLFFBQUtBLEVBQUVDLEtBQVAsS0FBaUIsS0FBS1gsS0FBTCxDQUFXWSxVQUFYLEdBQXNCRixFQUFFQyxLQUF6QztBQUNEO0FBSEY7QUFBQTtBQUFBLG9CQUlHRCxDQUpILEVBSUs7QUFDSCxRQUFLVixLQUFMLENBQVdhLFVBQVgsR0FBc0IsR0FBdEI7QUFDQTtBQU5GO0FBQUE7QUFBQSxxQkFPSUgsQ0FQSixFQU9NO0FBQ0osUUFBS1YsS0FBTCxDQUFXYyxRQUFYLEdBQW9CSixJQUFFLElBQXRCO0FBQ0E7QUFURjtBQUFBO0FBQUEsd0JBVU9BLENBVlAsRUFVUztBQUNQLFFBQUtWLEtBQUwsQ0FBV2UsS0FBWCxHQUFpQkwsQ0FBakI7QUFDQTtBQVpGO0FBQUE7QUFBQSxvQkFhR0EsQ0FiSCxFQWFLO0FBQ0gsUUFBS1YsS0FBTCxDQUFXZ0IsU0FBWCxHQUFxQixRQUFyQjtBQUNBO0FBZkY7QUFBQTtBQUFBLG9CQWdCR04sQ0FoQkgsRUFnQks7QUFDSCxRQUFLVixLQUFMLENBQVdpQixjQUFYLEdBQTBCLFdBQTFCO0FBQ0E7QUFsQkY7QUFBQTtBQUFBLHNCQW1CS1AsQ0FuQkwsRUFtQk87QUFDTCxRQUFLVixLQUFMLENBQVdrQixNQUFYLEdBQWtCLEtBQUtDLE9BQUwsQ0FBYVQsQ0FBYixDQUFsQjtBQUNBO0FBckJGO0FBQUE7QUFBQSx1QkFzQk1BLENBdEJOLEVBc0JRLENBRU47QUF4QkY7QUFBQTtBQUFBLDRCQXlCV0EsQ0F6QlgsRUF5QmE7QUFDWCxXQUFPQSxDQUFQO0FBQ0EsU0FBSyxhQUFMO0FBQ0MsVUFBS1YsS0FBTCxDQUFXb0IsYUFBWCxHQUF5QixPQUF6QjtBQUNEO0FBQ0EsU0FBSyxXQUFMO0FBQ0MsVUFBS3BCLEtBQUwsQ0FBV29CLGFBQVgsR0FBeUIsS0FBekI7QUFDRDtBQU5BO0FBUUE7QUFsQ0Y7QUFBQTtBQUFBLDRCQW1DV1YsQ0FuQ1gsRUFtQ2E7QUFDWCxRQUFLVixLQUFMLENBQVdxQixlQUFYLEdBQTJCWCxDQUEzQjtBQUNBO0FBckNGO0FBQUE7QUFBQSxFQUEyQ0wsb0JBQU1JLFVBQWpEIiwiZmlsZSI6ImlubGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuL2NvbnZlcnRlcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElubGluZSBleHRlbmRzIFN0eWxle1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLnN0eWxlPXRoaXMud29yZE1vZGVsLmlkID8gdGhpcy5kb2MuY3JlYXRlU3R5bGUoJy4nK1N0eWxlLmFzQ3NzSUQodGhpcy53b3JkTW9kZWwuaWQpKSA6IHRoaXMuZG9jLmNyZWF0ZVN0eWxlKCdzcGFuJylcclxuXHRcdHRoaXMuaW5saW5lPW5ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXModGhpcy5zdHlsZSlcclxuXHR9XHJcblx0X2dldFByb3BlcnRpZXNDb252ZXJ0ZXIoKXtcclxuXHRcdHJldHVybiB0aGlzLmlubGluZVxyXG5cdH1cclxufVxyXG5cclxuSW5saW5lLlByb3BlcnRpZXM9Y2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XHJcblx0ckZvbnRzKHgpe1xyXG5cdFx0IHggJiYgeC5hc2NpaSAmJiAodGhpcy5zdHlsZS5mb250RmFtaWx5PXguYXNjaWkpXHJcblx0fVxyXG5cdGIoeCl7XHJcblx0XHR0aGlzLnN0eWxlLmZvbnRXZWlnaHQ9NzAwXHJcblx0fVxyXG5cdHN6KHgpe1xyXG5cdFx0dGhpcy5zdHlsZS5mb250U2l6ZT14KydweCdcclxuXHR9XHJcblx0Y29sb3IoeCl7XHJcblx0XHR0aGlzLnN0eWxlLmNvbG9yPXhcclxuXHR9XHJcblx0aSh4KXtcclxuXHRcdHRoaXMuc3R5bGUuZm9udFN0eWxlPSdpdGFsaWMnXHJcblx0fVxyXG5cdHUoeCl7XHJcblx0XHR0aGlzLnN0eWxlLnRleHREZWNvcmF0aW9uPSd1bmRlcmxpbmUnXHJcblx0fVxyXG5cdGJkcih4KXtcclxuXHRcdHRoaXMuc3R5bGUuYm9yZGVyPXRoaXMuX2JvcmRlcih4KVxyXG5cdH1cclxuXHRsYW5nKHgpe1xyXG5cdFx0XHJcblx0fVxyXG5cdHZlcnRBbGlnbih4KXtcclxuXHRcdHN3aXRjaCh4KXtcclxuXHRcdGNhc2UgJ3N1cGVyc2NyaXB0JzpcclxuXHRcdFx0dGhpcy5zdHlsZS52ZXJ0aWNhbEFsaWduPSdzdXBlcidcclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlICdzdWJzY3JpcHQnOlxyXG5cdFx0XHR0aGlzLnN0eWxlLnZlcnRpY2FsQWxpZ249J3N1YidcclxuXHRcdGJyZWFrXHJcblx0XHR9XHJcblx0fVxyXG5cdGhpZ2hsaWdodCh4KXtcclxuXHRcdHRoaXMuc3R5bGUuYmFja2dyb3VuZENvbG9yPXhcclxuXHR9XHJcbn0iXX0=