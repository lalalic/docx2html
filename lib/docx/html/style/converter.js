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

var Lines = 'dotted,dashed,inset,outset,solid'.split();
var browsers = ',-webkit-,-moz-'.split(','),
    cssID = _converter2.default.asCssID;

var StyleConverter = function (_Converter) {
	_inherits(StyleConverter, _Converter);

	function StyleConverter() {
		_classCallCheck(this, StyleConverter);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StyleConverter).apply(this, arguments));

		var parentStyle = _this.wordModel.getParentStyle();
		parentStyle && _this.doc.stylePath(cssID(_this.wordModel.id), cssID(parentStyle.id));
		return _this;
	}

	_createClass(StyleConverter, [{
		key: 'convert',
		value: function convert(value, name, category) {
			var converter = this._getPropertiesConverter(category);
			converter && converter[name] && converter[name](value);
		}
	}, {
		key: '_getPropertiesConverter',
		value: function _getPropertiesConverter() {}
	}]);

	return StyleConverter;
}(_converter2.default);

exports.default = StyleConverter;


StyleConverter.Properties = function () {
	function Properties(style, parent) {
		_classCallCheck(this, Properties);

		this.style = style;
		this.parent = parent;
		parent && (this.doc = parent.doc);
	}

	_createClass(Properties, [{
		key: 'visit',
		value: function visit() {
			this.convert.apply(this, arguments);
		}
	}, {
		key: 'convert',
		value: function convert(value, name) {
			this[name] && this[name](value);
		}
	}, {
		key: '_border',
		value: function _border(border) {
			if (border.val == 'none' || border.val == 'nil') return '0';else return (border.sz < 1 && border.sz > 0 ? 1 : border.sz) + 'pt ' + (Lines.indexOf(border.val.toLowerCase()) != -1 ? border.val : 'solid') + ' ' + (border.color || '');
		}
	}, {
		key: 'equalObj',
		value: function equalObj(a, b) {
			var keys = Object.keys(a);
			if (!b || keys.length != Object.keys(b).length) return false;
			if (keys.length != 0) {
				for (var i = 0, len = keys.length; i < len; i++) {
					if (a[keys[i]] != b[keys[i]]) return false;
				}
			}

			for (var i = 2, len = arguments.length; i < len; i++) {
				if (!this.equalObj(a, arguments[i])) return false;
			}return true;
		}
	}, {
		key: 'upperFirst',
		value: function upperFirst(type) {
			return type[0].toUpperCase() + type.slice(1);
		}
	}, {
		key: 'styless',
		value: function styless(name, value, style) {
			browsers.forEach(function (a) {
				this[a + name] = value;
			}.bind(style || this.style));
		}
	}, {
		key: 'lineStyle',
		value: function lineStyle(x) {
			if (!x) return 'solid';
			x = x.toLowerCase();
			if (x.indexOf('dot') != -1) return 'dotted';else if (x.indexOf('dash') != -1) return 'dashed';else if (x.indexOf('double') != -1 || x.indexOf('gap') != -1) return 'double';else if (x.indexOf('emboss') != -1) return 'ridge';else if (x.indexOf('grave') != -1) return 'groove';else if (x.indexOf('outset') != -1) return 'outset';else if (x.indexOf('inset') != -1) return 'inset';else return 'solid';
		}
	}]);

	return Properties;
}();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvY29udmVydGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUksUUFBTSxtQ0FBbUMsS0FBbkMsRUFBTjtBQUNKLElBQUksV0FBUyxrQkFBa0IsS0FBbEIsQ0FBd0IsR0FBeEIsQ0FBVDtJQUF1QyxRQUFNLG9CQUFVLE9BQVY7O0lBRTVCOzs7QUFDcEIsVUFEb0IsY0FDcEIsR0FBYTt3QkFETyxnQkFDUDs7cUVBRE8sNEJBRVYsWUFERzs7QUFFWixNQUFJLGNBQVksTUFBSyxTQUFMLENBQWUsY0FBZixFQUFaLENBRlE7QUFHWixpQkFBZSxNQUFLLEdBQUwsQ0FBUyxTQUFULENBQW1CLE1BQU0sTUFBSyxTQUFMLENBQWUsRUFBZixDQUF6QixFQUE2QyxNQUFNLFlBQVksRUFBWixDQUFuRCxDQUFmLENBSFk7O0VBQWI7O2NBRG9COzswQkFNWixPQUFNLE1BQUssVUFBUztBQUMzQixPQUFJLFlBQVUsS0FBSyx1QkFBTCxDQUE2QixRQUE3QixDQUFWLENBRHVCO0FBRTNCLGdCQUFhLFVBQVUsSUFBVixDQUFiLElBQWdDLFVBQVUsSUFBVixFQUFnQixLQUFoQixDQUFoQyxDQUYyQjs7Ozs0Q0FJSDs7O1FBVkw7Ozs7OztBQWVyQixlQUFlLFVBQWY7QUFDQyxVQUQrQixVQUMvQixDQUFZLEtBQVosRUFBa0IsTUFBbEIsRUFBeUI7d0JBRE0sWUFDTjs7QUFDeEIsT0FBSyxLQUFMLEdBQVcsS0FBWCxDQUR3QjtBQUV4QixPQUFLLE1BQUwsR0FBWSxNQUFaLENBRndCO0FBR3hCLGFBQVcsS0FBSyxHQUFMLEdBQVMsT0FBTyxHQUFQLENBQXBCLENBSHdCO0VBQXpCOztjQUQrQjs7MEJBTXhCO0FBQ04sUUFBSyxPQUFMLGFBQWdCLFNBQWhCLEVBRE07Ozs7MEJBSUMsT0FBTyxNQUFLO0FBQ25CLFFBQUssSUFBTCxLQUFjLEtBQUssSUFBTCxFQUFXLEtBQVgsQ0FBZCxDQURtQjs7OzswQkFJWixRQUFPO0FBQ2QsT0FBRyxPQUFPLEdBQVAsSUFBWSxNQUFaLElBQXNCLE9BQU8sR0FBUCxJQUFZLEtBQVosRUFDeEIsT0FBTyxHQUFQLENBREQsS0FHQyxPQUFPLENBQUMsT0FBTyxFQUFQLEdBQVUsQ0FBVixJQUFlLE9BQU8sRUFBUCxHQUFVLENBQVYsR0FBYyxDQUE3QixHQUFpQyxPQUFPLEVBQVAsQ0FBbEMsR0FBNkMsS0FBN0MsSUFBb0QsTUFBTSxPQUFOLENBQWMsT0FBTyxHQUFQLENBQVcsV0FBWCxFQUFkLEtBQXlDLENBQUMsQ0FBRCxHQUFLLE9BQU8sR0FBUCxHQUFhLE9BQTNELENBQXBELEdBQXdILEdBQXhILElBQTZILE9BQU8sS0FBUCxJQUFjLEVBQWQsQ0FBN0gsQ0FIUjs7OzsyQkFLUSxHQUFFLEdBQUU7QUFDWixPQUFJLE9BQUssT0FBTyxJQUFQLENBQVksQ0FBWixDQUFMLENBRFE7QUFFWixPQUFHLENBQUMsQ0FBRCxJQUFNLEtBQUssTUFBTCxJQUFhLE9BQU8sSUFBUCxDQUFZLENBQVosRUFBZSxNQUFmLEVBQ3JCLE9BQU8sS0FBUCxDQUREO0FBRUEsT0FBRyxLQUFLLE1BQUwsSUFBYSxDQUFiLEVBQWU7QUFDakIsU0FBSSxJQUFJLElBQUUsQ0FBRixFQUFJLE1BQUksS0FBSyxNQUFMLEVBQVksSUFBRSxHQUFGLEVBQU0sR0FBbEMsRUFBc0M7QUFDckMsU0FBRyxFQUFFLEtBQUssQ0FBTCxDQUFGLEtBQVksRUFBRSxLQUFLLENBQUwsQ0FBRixDQUFaLEVBQ0YsT0FBTyxLQUFQLENBREQ7S0FERDtJQUREOztBQU9BLFFBQUksSUFBSSxJQUFFLENBQUYsRUFBSSxNQUFJLFVBQVUsTUFBVixFQUFpQixJQUFFLEdBQUYsRUFBTSxHQUF2QztBQUNDLFFBQUcsQ0FBQyxLQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWdCLFVBQVUsQ0FBVixDQUFoQixDQUFELEVBQ0YsT0FBTyxLQUFQLENBREQ7SUFERCxPQUdPLElBQVAsQ0FkWTs7Ozs2QkFnQkYsTUFBSztBQUNmLFVBQU8sS0FBSyxDQUFMLEVBQVEsV0FBUixLQUF3QixLQUFLLEtBQUwsQ0FBVyxDQUFYLENBQXhCLENBRFE7Ozs7MEJBR1IsTUFBSyxPQUFPLE9BQU07QUFDekIsWUFBUyxPQUFULENBQWlCLFVBQVMsQ0FBVCxFQUFXO0FBQzNCLFNBQUssSUFBRSxJQUFGLENBQUwsR0FBYSxLQUFiLENBRDJCO0lBQVgsQ0FFZixJQUZlLENBRVYsU0FBTyxLQUFLLEtBQUwsQ0FGZCxFQUR5Qjs7Ozs0QkFLaEIsR0FBRTtBQUNYLE9BQUcsQ0FBQyxDQUFELEVBQ0YsT0FBTyxPQUFQLENBREQ7QUFFQSxPQUFFLEVBQUUsV0FBRixFQUFGLENBSFc7QUFJWCxPQUFHLEVBQUUsT0FBRixDQUFVLEtBQVYsS0FBa0IsQ0FBQyxDQUFELEVBQ3BCLE9BQU8sUUFBUCxDQURELEtBRUssSUFBRyxFQUFFLE9BQUYsQ0FBVSxNQUFWLEtBQW1CLENBQUMsQ0FBRCxFQUMxQixPQUFPLFFBQVAsQ0FESSxLQUVBLElBQUcsRUFBRSxPQUFGLENBQVUsUUFBVixLQUFxQixDQUFDLENBQUQsSUFBTSxFQUFFLE9BQUYsQ0FBVSxLQUFWLEtBQWtCLENBQUMsQ0FBRCxFQUNwRCxPQUFPLFFBQVAsQ0FESSxLQUVBLElBQUcsRUFBRSxPQUFGLENBQVUsUUFBVixLQUFxQixDQUFDLENBQUQsRUFDNUIsT0FBTyxPQUFQLENBREksS0FFQSxJQUFHLEVBQUUsT0FBRixDQUFVLE9BQVYsS0FBb0IsQ0FBQyxDQUFELEVBQzNCLE9BQU8sUUFBUCxDQURJLEtBRUEsSUFBRyxFQUFFLE9BQUYsQ0FBVSxRQUFWLEtBQXFCLENBQUMsQ0FBRCxFQUM1QixPQUFPLFFBQVAsQ0FESSxLQUVBLElBQUcsRUFBRSxPQUFGLENBQVUsT0FBVixLQUFvQixDQUFDLENBQUQsRUFDM0IsT0FBTyxPQUFQLENBREksS0FHSixPQUFPLE9BQVAsQ0FISTs7OztRQTVEeUI7R0FBaEMiLCJmaWxlIjoiY29udmVydGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuLi9jb252ZXJ0ZXInXG5cbnZhciBMaW5lcz0nZG90dGVkLGRhc2hlZCxpbnNldCxvdXRzZXQsc29saWQnLnNwbGl0KClcbnZhciBicm93c2Vycz0nLC13ZWJraXQtLC1tb3otJy5zcGxpdCgnLCcpLCBjc3NJRD1Db252ZXJ0ZXIuYXNDc3NJRDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3R5bGVDb252ZXJ0ZXIgZXh0ZW5kcyBDb252ZXJ0ZXJ7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHZhciBwYXJlbnRTdHlsZT10aGlzLndvcmRNb2RlbC5nZXRQYXJlbnRTdHlsZSgpO1xuXHRcdHBhcmVudFN0eWxlICYmIHRoaXMuZG9jLnN0eWxlUGF0aChjc3NJRCh0aGlzLndvcmRNb2RlbC5pZCksIGNzc0lEKHBhcmVudFN0eWxlLmlkKSlcblx0fVxuXHRjb252ZXJ0KHZhbHVlLG5hbWUsY2F0ZWdvcnkpe1xuXHRcdHZhciBjb252ZXJ0ZXI9dGhpcy5fZ2V0UHJvcGVydGllc0NvbnZlcnRlcihjYXRlZ29yeSk7XG5cdFx0Y29udmVydGVyICYmIGNvbnZlcnRlcltuYW1lXSAmJiBjb252ZXJ0ZXJbbmFtZV0odmFsdWUpXG5cdH1cblx0X2dldFByb3BlcnRpZXNDb252ZXJ0ZXIoKXtcblx0XHRcblx0fVxufVxuXG5TdHlsZUNvbnZlcnRlci5Qcm9wZXJ0aWVzPWNsYXNzIFByb3BlcnRpZXN7XG5cdGNvbnN0cnVjdG9yKHN0eWxlLHBhcmVudCl7XG5cdFx0dGhpcy5zdHlsZT1zdHlsZVxuXHRcdHRoaXMucGFyZW50PXBhcmVudFxuXHRcdHBhcmVudCAmJiAodGhpcy5kb2M9cGFyZW50LmRvYylcblx0fVxuXHR2aXNpdCgpe1xuXHRcdHRoaXMuY29udmVydCguLi5hcmd1bWVudHMpXG5cdH1cblx0XG5cdGNvbnZlcnQodmFsdWUsIG5hbWUpe1xuXHRcdHRoaXNbbmFtZV0gJiYgdGhpc1tuYW1lXSh2YWx1ZSlcblx0fVxuXHRcblx0X2JvcmRlcihib3JkZXIpe1xuXHRcdGlmKGJvcmRlci52YWw9PSdub25lJyB8fCBib3JkZXIudmFsPT0nbmlsJylcblx0XHRcdHJldHVybiAnMCdcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gKGJvcmRlci5zejwxICYmIGJvcmRlci5zej4wID8gMSA6IGJvcmRlci5zeikrJ3B0ICcrKExpbmVzLmluZGV4T2YoYm9yZGVyLnZhbC50b0xvd2VyQ2FzZSgpKSE9LTEgPyBib3JkZXIudmFsIDogJ3NvbGlkJykrJyAnKyhib3JkZXIuY29sb3J8fCcnKVxuXHR9XG5cdGVxdWFsT2JqKGEsYil7XG5cdFx0dmFyIGtleXM9T2JqZWN0LmtleXMoYSlcblx0XHRpZighYiB8fCBrZXlzLmxlbmd0aCE9T2JqZWN0LmtleXMoYikubGVuZ3RoKVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0aWYoa2V5cy5sZW5ndGghPTApe1x0XHRcdFx0XHRcblx0XHRcdGZvcih2YXIgaT0wLGxlbj1rZXlzLmxlbmd0aDtpPGxlbjtpKyspe1xuXHRcdFx0XHRpZihhW2tleXNbaV1dIT1iW2tleXNbaV1dKVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHRmb3IodmFyIGk9MixsZW49YXJndW1lbnRzLmxlbmd0aDtpPGxlbjtpKyspXG5cdFx0XHRpZighdGhpcy5lcXVhbE9iaihhLGFyZ3VtZW50c1tpXSkpXG5cdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdHJldHVybiB0cnVlXG5cdH1cblx0dXBwZXJGaXJzdCh0eXBlKXtcblx0XHRyZXR1cm4gdHlwZVswXS50b1VwcGVyQ2FzZSgpICsgdHlwZS5zbGljZSgxKVxuXHR9XG5cdHN0eWxlc3MobmFtZSx2YWx1ZSwgc3R5bGUpe1xuXHRcdGJyb3dzZXJzLmZvckVhY2goZnVuY3Rpb24oYSl7XG5cdFx0XHR0aGlzW2ErbmFtZV09dmFsdWVcblx0XHR9LmJpbmQoc3R5bGV8fHRoaXMuc3R5bGUpKVxuXHR9XG5cdGxpbmVTdHlsZSh4KXtcblx0XHRpZigheClcblx0XHRcdHJldHVybiAnc29saWQnXG5cdFx0eD14LnRvTG93ZXJDYXNlKClcblx0XHRpZih4LmluZGV4T2YoJ2RvdCcpIT0tMSlcblx0XHRcdHJldHVybiAnZG90dGVkJ1xuXHRcdGVsc2UgaWYoeC5pbmRleE9mKCdkYXNoJykhPS0xKVxuXHRcdFx0cmV0dXJuICdkYXNoZWQnXG5cdFx0ZWxzZSBpZih4LmluZGV4T2YoJ2RvdWJsZScpIT0tMSB8fCB4LmluZGV4T2YoJ2dhcCcpIT0tMSlcblx0XHRcdHJldHVybiAnZG91YmxlJ1xuXHRcdGVsc2UgaWYoeC5pbmRleE9mKCdlbWJvc3MnKSE9LTEpXG5cdFx0XHRyZXR1cm4gJ3JpZGdlJ1xuXHRcdGVsc2UgaWYoeC5pbmRleE9mKCdncmF2ZScpIT0tMSlcblx0XHRcdHJldHVybiAnZ3Jvb3ZlJ1xuXHRcdGVsc2UgaWYoeC5pbmRleE9mKCdvdXRzZXQnKSE9LTEpXG5cdFx0XHRyZXR1cm4gJ291dHNldCdcblx0XHRlbHNlIGlmKHguaW5kZXhPZignaW5zZXQnKSE9LTEpXG5cdFx0XHRyZXR1cm4gJ2luc2V0J1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiAnc29saWQnXG5cdH1cbn1cblxuIl19