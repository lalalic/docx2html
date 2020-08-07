'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _converter = require('../converter');

var _converter2 = _interopRequireDefault(_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Lines = 'dotted,dashed,inset,outset,solid'.split();
var browsers = ',-webkit-,-moz-'.split(','),
    cssID = _converter2.default.asCssID;

var StyleConverter = function (_Converter) {
	(0, _inherits3.default)(StyleConverter, _Converter);

	function StyleConverter() {
		(0, _classCallCheck3.default)(this, StyleConverter);

		var _this = (0, _possibleConstructorReturn3.default)(this, (StyleConverter.__proto__ || (0, _getPrototypeOf2.default)(StyleConverter)).apply(this, arguments));

		var parentStyle = _this.wordModel.getParentStyle();
		parentStyle && _this.doc.stylePath(cssID(_this.wordModel.id), cssID(parentStyle.id));
		return _this;
	}

	(0, _createClass3.default)(StyleConverter, [{
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
		(0, _classCallCheck3.default)(this, Properties);

		this.style = style;
		this.parent = parent;
		parent && (this.doc = parent.doc);
	}

	(0, _createClass3.default)(Properties, [{
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
			var keys = (0, _keys2.default)(a);
			if (!b || keys.length != (0, _keys2.default)(b).length) return false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvY29udmVydGVyLmpzIl0sIm5hbWVzIjpbIkxpbmVzIiwic3BsaXQiLCJicm93c2VycyIsImNzc0lEIiwiQ29udmVydGVyIiwiYXNDc3NJRCIsIlN0eWxlQ29udmVydGVyIiwiYXJndW1lbnRzIiwicGFyZW50U3R5bGUiLCJ3b3JkTW9kZWwiLCJnZXRQYXJlbnRTdHlsZSIsImRvYyIsInN0eWxlUGF0aCIsImlkIiwidmFsdWUiLCJuYW1lIiwiY2F0ZWdvcnkiLCJjb252ZXJ0ZXIiLCJfZ2V0UHJvcGVydGllc0NvbnZlcnRlciIsIlByb3BlcnRpZXMiLCJzdHlsZSIsInBhcmVudCIsImNvbnZlcnQiLCJib3JkZXIiLCJ2YWwiLCJzeiIsImluZGV4T2YiLCJ0b0xvd2VyQ2FzZSIsImNvbG9yIiwiYSIsImIiLCJrZXlzIiwibGVuZ3RoIiwiaSIsImxlbiIsImVxdWFsT2JqIiwidHlwZSIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJmb3JFYWNoIiwiYmluZCIsIngiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFJQSxRQUFNLG1DQUFtQ0MsS0FBbkMsRUFBVjtBQUNBLElBQUlDLFdBQVMsa0JBQWtCRCxLQUFsQixDQUF3QixHQUF4QixDQUFiO0FBQUEsSUFBMkNFLFFBQU1DLG9CQUFVQyxPQUEzRDs7SUFFcUJDLGM7OztBQUNwQiwyQkFBYTtBQUFBOztBQUFBLHFKQUNIQyxTQURHOztBQUVaLE1BQUlDLGNBQVksTUFBS0MsU0FBTCxDQUFlQyxjQUFmLEVBQWhCO0FBQ0FGLGlCQUFlLE1BQUtHLEdBQUwsQ0FBU0MsU0FBVCxDQUFtQlQsTUFBTSxNQUFLTSxTQUFMLENBQWVJLEVBQXJCLENBQW5CLEVBQTZDVixNQUFNSyxZQUFZSyxFQUFsQixDQUE3QyxDQUFmO0FBSFk7QUFJWjs7OzswQkFDT0MsSyxFQUFNQyxJLEVBQUtDLFEsRUFBUztBQUMz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O0FBQ0RBLE9BQUVBLEVBQUVkLFdBQUYsRUFBRjtBQUNBLE9BQUdjLEVBQUVmLE9BQUYsQ0FBVSxLQUFWLEtBQWtCLENBQUMsQ0FBdEIsRUFDQyxPQUFPLFFBQVAsQ0FERCxLQUVLLElBQUdlLEVBQUVmLE9BQUYsQ0FBVSxNQUFWLEtBQW1CLENBQUMsQ0FBdkIsRUFDSixPQUFPLFFBQVAsQ0FESSxLQUVBLElBQUdlLEVBQUVmLE9BQUYsQ0FBVSxRQUFWLEtBQXFCLENBQUMsQ0FBdEIsSUFBMkJlLEVBQUVmLE9BQUYsQ0FBVSxLQUFWLEtBQWtCLENBQUMsQ0FBakQsRUFDSixPQUFPLFFBQVAsQ0FESSxLQUVBLElBQUdlLEVBQUVmLE9BQUYsQ0FBVSxRQUFWLEtBQXFCLENBQUMsQ0FBekIsRUFDSixPQUFPLE9BQVAsQ0FESSxLQUVBLElBQUdlLEVBQUVmLE9BQUYsQ0FBVSxPQUFWLEtBQW9CLENBQUMsQ0FBeEIsRUFDSixPQUFPLFFBQVAsQ0FESSxLQUVBLElBQUdlLEVBQUVmLE9BQUYsQ0FBVSxRQUFWLEtBQXFCLENBQUMsQ0FBekIsRUFDSixPQUFPLFFBQVAsQ0FESSxLQUVBLElBQUdlLEVBQUVmLE9BQUYsQ0FBVSxPQUFWLEtBQW9CLENBQUMsQ0FBeEIsRUFDSixPQUFPLE9BQVAsQ0FESSxLQUdKLE9BQU8sT0FBUDtBQUNEO0FBaEVGO0FBQUE7QUFBQSIsImZpbGUiOiJjb252ZXJ0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4uL2NvbnZlcnRlcidcblxudmFyIExpbmVzPSdkb3R0ZWQsZGFzaGVkLGluc2V0LG91dHNldCxzb2xpZCcuc3BsaXQoKVxudmFyIGJyb3dzZXJzPScsLXdlYmtpdC0sLW1vei0nLnNwbGl0KCcsJyksIGNzc0lEPUNvbnZlcnRlci5hc0Nzc0lEO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdHlsZUNvbnZlcnRlciBleHRlbmRzIENvbnZlcnRlcntcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dmFyIHBhcmVudFN0eWxlPXRoaXMud29yZE1vZGVsLmdldFBhcmVudFN0eWxlKCk7XG5cdFx0cGFyZW50U3R5bGUgJiYgdGhpcy5kb2Muc3R5bGVQYXRoKGNzc0lEKHRoaXMud29yZE1vZGVsLmlkKSwgY3NzSUQocGFyZW50U3R5bGUuaWQpKVxuXHR9XG5cdGNvbnZlcnQodmFsdWUsbmFtZSxjYXRlZ29yeSl7XG5cdFx0dmFyIGNvbnZlcnRlcj10aGlzLl9nZXRQcm9wZXJ0aWVzQ29udmVydGVyKGNhdGVnb3J5KTtcblx0XHRjb252ZXJ0ZXIgJiYgY29udmVydGVyW25hbWVdICYmIGNvbnZlcnRlcltuYW1lXSh2YWx1ZSlcblx0fVxuXHRfZ2V0UHJvcGVydGllc0NvbnZlcnRlcigpe1xuXHRcdFxuXHR9XG59XG5cblN0eWxlQ29udmVydGVyLlByb3BlcnRpZXM9Y2xhc3MgUHJvcGVydGllc3tcblx0Y29uc3RydWN0b3Ioc3R5bGUscGFyZW50KXtcblx0XHR0aGlzLnN0eWxlPXN0eWxlXG5cdFx0dGhpcy5wYXJlbnQ9cGFyZW50XG5cdFx0cGFyZW50ICYmICh0aGlzLmRvYz1wYXJlbnQuZG9jKVxuXHR9XG5cdHZpc2l0KCl7XG5cdFx0dGhpcy5jb252ZXJ0KC4uLmFyZ3VtZW50cylcblx0fVxuXHRcblx0Y29udmVydCh2YWx1ZSwgbmFtZSl7XG5cdFx0dGhpc1tuYW1lXSAmJiB0aGlzW25hbWVdKHZhbHVlKVxuXHR9XG5cdFxuXHRfYm9yZGVyKGJvcmRlcil7XG5cdFx0aWYoYm9yZGVyLnZhbD09J25vbmUnIHx8IGJvcmRlci52YWw9PSduaWwnKVxuXHRcdFx0cmV0dXJuICcwJ1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiAoYm9yZGVyLnN6PDEgJiYgYm9yZGVyLnN6PjAgPyAxIDogYm9yZGVyLnN6KSsncHQgJysoTGluZXMuaW5kZXhPZihib3JkZXIudmFsLnRvTG93ZXJDYXNlKCkpIT0tMSA/IGJvcmRlci52YWwgOiAnc29saWQnKSsnICcrKGJvcmRlci5jb2xvcnx8JycpXG5cdH1cblx0ZXF1YWxPYmooYSxiKXtcblx0XHR2YXIga2V5cz1PYmplY3Qua2V5cyhhKVxuXHRcdGlmKCFiIHx8IGtleXMubGVuZ3RoIT1PYmplY3Qua2V5cyhiKS5sZW5ndGgpXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRpZihrZXlzLmxlbmd0aCE9MCl7XHRcdFx0XHRcdFxuXHRcdFx0Zm9yKHZhciBpPTAsbGVuPWtleXMubGVuZ3RoO2k8bGVuO2krKyl7XG5cdFx0XHRcdGlmKGFba2V5c1tpXV0hPWJba2V5c1tpXV0pXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHRcdGZvcih2YXIgaT0yLGxlbj1hcmd1bWVudHMubGVuZ3RoO2k8bGVuO2krKylcblx0XHRcdGlmKCF0aGlzLmVxdWFsT2JqKGEsYXJndW1lbnRzW2ldKSlcblx0XHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0cmV0dXJuIHRydWVcblx0fVxuXHR1cHBlckZpcnN0KHR5cGUpe1xuXHRcdHJldHVybiB0eXBlWzBdLnRvVXBwZXJDYXNlKCkgKyB0eXBlLnNsaWNlKDEpXG5cdH1cblx0c3R5bGVzcyhuYW1lLHZhbHVlLCBzdHlsZSl7XG5cdFx0YnJvd3NlcnMuZm9yRWFjaChmdW5jdGlvbihhKXtcblx0XHRcdHRoaXNbYStuYW1lXT12YWx1ZVxuXHRcdH0uYmluZChzdHlsZXx8dGhpcy5zdHlsZSkpXG5cdH1cblx0bGluZVN0eWxlKHgpe1xuXHRcdGlmKCF4KVxuXHRcdFx0cmV0dXJuICdzb2xpZCdcblx0XHR4PXgudG9Mb3dlckNhc2UoKVxuXHRcdGlmKHguaW5kZXhPZignZG90JykhPS0xKVxuXHRcdFx0cmV0dXJuICdkb3R0ZWQnXG5cdFx0ZWxzZSBpZih4LmluZGV4T2YoJ2Rhc2gnKSE9LTEpXG5cdFx0XHRyZXR1cm4gJ2Rhc2hlZCdcblx0XHRlbHNlIGlmKHguaW5kZXhPZignZG91YmxlJykhPS0xIHx8IHguaW5kZXhPZignZ2FwJykhPS0xKVxuXHRcdFx0cmV0dXJuICdkb3VibGUnXG5cdFx0ZWxzZSBpZih4LmluZGV4T2YoJ2VtYm9zcycpIT0tMSlcblx0XHRcdHJldHVybiAncmlkZ2UnXG5cdFx0ZWxzZSBpZih4LmluZGV4T2YoJ2dyYXZlJykhPS0xKVxuXHRcdFx0cmV0dXJuICdncm9vdmUnXG5cdFx0ZWxzZSBpZih4LmluZGV4T2YoJ291dHNldCcpIT0tMSlcblx0XHRcdHJldHVybiAnb3V0c2V0J1xuXHRcdGVsc2UgaWYoeC5pbmRleE9mKCdpbnNldCcpIT0tMSlcblx0XHRcdHJldHVybiAnaW5zZXQnXG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuICdzb2xpZCdcblx0fVxufVxuXG4iXX0=