'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

var _converter3 = require('./style/converter');

var _converter4 = _interopRequireDefault(_converter3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Drawing = function (_Converter) {
	_inherits(Drawing, _Converter);

	function Drawing() {
		_classCallCheck(this, Drawing);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Drawing).apply(this, arguments));
	}

	_createClass(Drawing, [{
		key: 'convertStyle',
		value: function convertStyle(el) {
			_get(Object.getPrototypeOf(Drawing.prototype), 'convertStyle', this).apply(this, arguments);
			var style = this.wordModel.getDirectStyle();
			style && style.parse([new this.constructor.Properties(el.style, this)]);
		}
	}]);

	return Drawing;
}(_converter2.default);

exports.default = Drawing;

var Properties = function (_Style$Properties) {
	_inherits(Properties, _Style$Properties);

	function Properties() {
		_classCallCheck(this, Properties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));
	}

	_createClass(Properties, [{
		key: 'extent',
		value: function extent(x) {
			this.world = x;
			this.style.width = x.width + 'pt';
			this.style.height = x.height + 'pt';
		}
	}, {
		key: 'distL',
		value: function distL(x) {
			x && (this.style.marginLeft = x + 'pt');
		}
	}, {
		key: 'distT',
		value: function distT(x) {
			x && (this.style.marginTop = x + 'pt');
		}
	}, {
		key: 'distB',
		value: function distB(x) {
			x && (this.style.marginBottom = x + 'pt');
		}
	}, {
		key: 'distR',
		value: function distR(x) {
			x && (this.style.marginRight = x + 'pt');
		}
	}]);

	return Properties;
}(_converter4.default.Properties);

Drawing.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZHJhd2luZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OzsrQkFDUCxJQUFHO0FBQ2YsOEJBRm1CLHNEQUVHLFVBQXRCLENBRGU7QUFFZixPQUFJLFFBQU0sS0FBSyxTQUFMLENBQWUsY0FBZixFQUFOLENBRlc7QUFHZixZQUFTLE1BQU0sS0FBTixDQUFZLENBQUMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsVUFBakIsQ0FBNEIsR0FBRyxLQUFILEVBQVMsSUFBekMsQ0FBRCxDQUFaLENBQVQsQ0FIZTs7OztRQURJOzs7OztJQVNmOzs7Ozs7Ozs7Ozt5QkFDRSxHQUFFO0FBQ1IsUUFBSyxLQUFMLEdBQVcsQ0FBWCxDQURRO0FBRVIsUUFBSyxLQUFMLENBQVcsS0FBWCxHQUFpQixFQUFFLEtBQUYsR0FBUSxJQUFSLENBRlQ7QUFHUixRQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQWtCLEVBQUUsTUFBRixHQUFTLElBQVQsQ0FIVjs7Ozt3QkFLSCxHQUFFO0FBQ1AsU0FBTSxLQUFLLEtBQUwsQ0FBVyxVQUFYLEdBQXNCLElBQUUsSUFBRixDQUE1QixDQURPOzs7O3dCQUdGLEdBQUU7QUFDUCxTQUFNLEtBQUssS0FBTCxDQUFXLFNBQVgsR0FBcUIsSUFBRSxJQUFGLENBQTNCLENBRE87Ozs7d0JBR0YsR0FBRTtBQUNQLFNBQU0sS0FBSyxLQUFMLENBQVcsWUFBWCxHQUF3QixJQUFFLElBQUYsQ0FBOUIsQ0FETzs7Ozt3QkFHRixHQUFFO0FBQ1AsU0FBTSxLQUFLLEtBQUwsQ0FBVyxXQUFYLEdBQXVCLElBQUUsSUFBRixDQUE3QixDQURPOzs7O1FBZkg7RUFBbUIsb0JBQU0sVUFBTjs7QUFvQnpCLFFBQVEsVUFBUixHQUFtQixVQUFuQiIsImZpbGUiOiJkcmF3aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcidcbmltcG9ydCBTdHlsZSBmcm9tICcuL3N0eWxlL2NvbnZlcnRlcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhd2luZyBleHRlbmRzIENvbnZlcnRlcntcblx0Y29udmVydFN0eWxlKGVsKXtcblx0XHRzdXBlci5jb252ZXJ0U3R5bGUoLi4uYXJndW1lbnRzKVxuXHRcdHZhciBzdHlsZT10aGlzLndvcmRNb2RlbC5nZXREaXJlY3RTdHlsZSgpXG5cdFx0c3R5bGUgJiYgc3R5bGUucGFyc2UoW25ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXMoZWwuc3R5bGUsdGhpcyldKVxuXHR9XG5cbn1cblxuY2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdGV4dGVudCh4KXtcblx0XHR0aGlzLndvcmxkPXhcblx0XHR0aGlzLnN0eWxlLndpZHRoPXgud2lkdGgrJ3B0J1xuXHRcdHRoaXMuc3R5bGUuaGVpZ2h0PXguaGVpZ2h0KydwdCdcblx0fVxuXHRkaXN0TCh4KXtcblx0XHR4ICYmICh0aGlzLnN0eWxlLm1hcmdpbkxlZnQ9eCsncHQnKVxuXHR9XG5cdGRpc3RUKHgpe1xuXHRcdHggJiYgKHRoaXMuc3R5bGUubWFyZ2luVG9wPXgrJ3B0Jylcblx0fVxuXHRkaXN0Qih4KXtcblx0XHR4ICYmICh0aGlzLnN0eWxlLm1hcmdpbkJvdHRvbT14KydwdCcpXG5cdH1cblx0ZGlzdFIoeCl7XG5cdFx0eCAmJiAodGhpcy5zdHlsZS5tYXJnaW5SaWdodD14KydwdCcpXG5cdH1cbn1cblxuRHJhd2luZy5Qcm9wZXJ0aWVzPVByb3BlcnRpZXMiXX0=