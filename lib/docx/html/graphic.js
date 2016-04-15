'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _drawing = require('./drawing');

var _drawing2 = _interopRequireDefault(_drawing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Graphic = function (_Drawing) {
	_inherits(Graphic, _Drawing);

	function Graphic() {
		_classCallCheck(this, Graphic);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Graphic).apply(this, arguments));
	}

	_createClass(Graphic, [{
		key: 'tag',
		get: function get() {
			return 'span';
		}
	}]);

	return Graphic;
}(_drawing2.default);

exports.default = Graphic;

var Properties = function (_Drawing$Properties) {
	_inherits(Properties, _Drawing$Properties);

	function Properties() {
		_classCallCheck(this, Properties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));
	}

	_createClass(Properties, [{
		key: 'solidFill',
		value: function solidFill(x) {
			this.style.backgroundColor = x;
		}
	}, {
		key: 'gradFill',
		value: function gradFill(x) {}
	}, {
		key: 'noFill',
		value: function noFill(x) {
			this.style.background = 'transparent';
		}
	}, {
		key: 'fillRef',
		value: function fillRef(x) {
			switch (typeof x === 'undefined' ? 'undefined' : _typeof(x)) {
				case 'string':
					return this.solidFill(x);
				case 'object':
					return this.gradFill(x);
				case 'number':
					return this.noFill(x);
			}
		}
	}, {
		key: 'ln',
		value: function ln(x) {
			x.color && (this.style.borderColor = x.color);
			x.width && (this.style.borderWidth = x.width + 'pt', this.style.borderStyle = 'solid');
			x.dash && (this.style.borderStyle = this.lineStyle(x.dash));
			x.cap === 'rnd' && (this.style.borderRadius = x.width * 2 + 'pt');
		}
	}, {
		key: 'xfrm',
		value: function xfrm(x) {
			this.style.width = x.width + 'pt';
			this.style.height = x.height + 'pt';
			x.x && (this.style.left = x.x + 'pt');
			x.y && (this.style.top = x.y + 'pt');
		}
	}]);

	return Properties;
}(_drawing2.default.Properties);

Graphic.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZ3JhcGhpYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7c0JBQ1g7QUFBQyxVQUFPLE1BQVAsQ0FBRDs7OztRQURXOzs7OztJQUlmOzs7Ozs7Ozs7Ozs0QkFDSyxHQUFFO0FBQ1gsUUFBSyxLQUFMLENBQVcsZUFBWCxHQUEyQixDQUEzQixDQURXOzs7OzJCQUdILEdBQUU7Ozt5QkFHSixHQUFFO0FBQ1IsUUFBSyxLQUFMLENBQVcsVUFBWCxHQUFzQixhQUF0QixDQURROzs7OzBCQUdELEdBQUU7QUFDVCxrQkFBYyw0Q0FBZDtBQUNBLFNBQUssUUFBTDtBQUNDLFlBQU8sS0FBSyxTQUFMLENBQWUsQ0FBZixDQUFQLENBREQ7QUFEQSxTQUdLLFFBQUw7QUFDQyxZQUFPLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBUCxDQUREO0FBSEEsU0FLSyxRQUFMO0FBQ0MsWUFBTyxLQUFLLE1BQUwsQ0FBWSxDQUFaLENBQVAsQ0FERDtBQUxBLElBRFM7Ozs7cUJBVVAsR0FBRTtBQUNKLEtBQUUsS0FBRixLQUFZLEtBQUssS0FBTCxDQUFXLFdBQVgsR0FBdUIsRUFBRSxLQUFGLENBQW5DLENBREk7QUFFSixLQUFFLEtBQUYsS0FBWSxLQUFLLEtBQUwsQ0FBVyxXQUFYLEdBQXVCLEVBQUUsS0FBRixHQUFRLElBQVIsRUFBYyxLQUFLLEtBQUwsQ0FBVyxXQUFYLEdBQXVCLE9BQXZCLENBQWpELENBRkk7QUFHSixLQUFFLElBQUYsS0FBVyxLQUFLLEtBQUwsQ0FBVyxXQUFYLEdBQXVCLEtBQUssU0FBTCxDQUFlLEVBQUUsSUFBRixDQUF0QyxDQUFYLENBSEk7QUFJSixLQUFFLEdBQUYsS0FBUSxLQUFSLEtBQWtCLEtBQUssS0FBTCxDQUFXLFlBQVgsR0FBd0IsRUFBRSxLQUFGLEdBQVEsQ0FBUixHQUFVLElBQVYsQ0FBMUMsQ0FKSTs7Ozt1QkFNQSxHQUFFO0FBQ04sUUFBSyxLQUFMLENBQVcsS0FBWCxHQUFpQixFQUFFLEtBQUYsR0FBUSxJQUFSLENBRFg7QUFFTixRQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQWtCLEVBQUUsTUFBRixHQUFTLElBQVQsQ0FGWjtBQUdOLEtBQUUsQ0FBRixLQUFRLEtBQUssS0FBTCxDQUFXLElBQVgsR0FBZ0IsRUFBRSxDQUFGLEdBQUksSUFBSixDQUF4QixDQUhNO0FBSU4sS0FBRSxDQUFGLEtBQVEsS0FBSyxLQUFMLENBQVcsR0FBWCxHQUFlLEVBQUUsQ0FBRixHQUFJLElBQUosQ0FBdkIsQ0FKTTs7OztRQTFCRjtFQUFtQixrQkFBUSxVQUFSOztBQWtDekIsUUFBUSxVQUFSLEdBQW1CLFVBQW5CIiwiZmlsZSI6ImdyYXBoaWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRHJhd2luZyBmcm9tICcuL2RyYXdpbmcnXHRcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhpYyBleHRlbmRzIERyYXdpbmd7XG5cdGdldCB0YWcoKXtyZXR1cm4gJ3NwYW4nfVxufVxuXG5jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgRHJhd2luZy5Qcm9wZXJ0aWVze1xuXHRzb2xpZEZpbGwoeCl7XG5cdFx0dGhpcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9eFxuXHR9XG5cdGdyYWRGaWxsKHgpe1xuXHRcdFxuXHR9XG5cdG5vRmlsbCh4KXtcblx0XHR0aGlzLnN0eWxlLmJhY2tncm91bmQ9J3RyYW5zcGFyZW50J1xuXHR9XG5cdGZpbGxSZWYoeCl7XG5cdFx0c3dpdGNoKHR5cGVvZih4KSl7XG5cdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdHJldHVybiB0aGlzLnNvbGlkRmlsbCh4KVxuXHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRyZXR1cm4gdGhpcy5ncmFkRmlsbCh4KVxuXHRcdGNhc2UgJ251bWJlcic6XG5cdFx0XHRyZXR1cm4gdGhpcy5ub0ZpbGwoeClcblx0XHR9XG5cdH1cblx0bG4oeCl7XG5cdFx0eC5jb2xvciAmJiAodGhpcy5zdHlsZS5ib3JkZXJDb2xvcj14LmNvbG9yKTtcblx0XHR4LndpZHRoICYmICh0aGlzLnN0eWxlLmJvcmRlcldpZHRoPXgud2lkdGgrJ3B0JywgdGhpcy5zdHlsZS5ib3JkZXJTdHlsZT0nc29saWQnKTtcblx0XHR4LmRhc2ggJiYgKHRoaXMuc3R5bGUuYm9yZGVyU3R5bGU9dGhpcy5saW5lU3R5bGUoeC5kYXNoKSk7XG5cdFx0eC5jYXA9PT0ncm5kJyAmJiAodGhpcy5zdHlsZS5ib3JkZXJSYWRpdXM9eC53aWR0aCoyKydwdCcpXG5cdH1cblx0eGZybSh4KXtcblx0XHR0aGlzLnN0eWxlLndpZHRoPXgud2lkdGgrJ3B0J1xuXHRcdHRoaXMuc3R5bGUuaGVpZ2h0PXguaGVpZ2h0KydwdCdcblx0XHR4LnggJiYgKHRoaXMuc3R5bGUubGVmdD14LngrJ3B0Jylcblx0XHR4LnkgJiYgKHRoaXMuc3R5bGUudG9wPXgueSsncHQnKVxuXHR9XG59XG5cbkdyYXBoaWMuUHJvcGVydGllcz1Qcm9wZXJ0aWVzIl19