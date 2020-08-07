'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _drawing = require('./drawing');

var _drawing2 = _interopRequireDefault(_drawing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Graphic = function (_Drawing) {
	(0, _inherits3.default)(Graphic, _Drawing);

	function Graphic() {
		(0, _classCallCheck3.default)(this, Graphic);
		return (0, _possibleConstructorReturn3.default)(this, (Graphic.__proto__ || (0, _getPrototypeOf2.default)(Graphic)).apply(this, arguments));
	}

	(0, _createClass3.default)(Graphic, [{
		key: 'tag',
		get: function get() {
			return 'span';
		}
	}]);
	return Graphic;
}(_drawing2.default);

exports.default = Graphic;

var Properties = function (_Drawing$Properties) {
	(0, _inherits3.default)(Properties, _Drawing$Properties);

	function Properties() {
		(0, _classCallCheck3.default)(this, Properties);
		return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
	}

	(0, _createClass3.default)(Properties, [{
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
			switch (typeof x === 'undefined' ? 'undefined' : (0, _typeof3.default)(x)) {
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
			x.width && (this.style.borderWidth = x.width + 'px', this.style.borderStyle = 'solid');
			x.dash && (this.style.borderStyle = this.lineStyle(x.dash));
			x.cap === 'rnd' && (this.style.borderRadius = x.width * 2 + 'px');
		}
	}, {
		key: 'xfrm',
		value: function xfrm(x) {
			this.style.width = x.width + 'px';
			this.style.height = x.height + 'px';
			x.x && (this.style.left = x.x + 'px');
			x.y && (this.style.top = x.y + 'px');
		}
	}]);
	return Properties;
}(_drawing2.default.Properties);

Graphic.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZ3JhcGhpYy5qcyJdLCJuYW1lcyI6WyJHcmFwaGljIiwiRHJhd2luZyIsIlByb3BlcnRpZXMiLCJ4Iiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJiYWNrZ3JvdW5kIiwic29saWRGaWxsIiwiZ3JhZEZpbGwiLCJub0ZpbGwiLCJjb2xvciIsImJvcmRlckNvbG9yIiwid2lkdGgiLCJib3JkZXJXaWR0aCIsImJvcmRlclN0eWxlIiwiZGFzaCIsImxpbmVTdHlsZSIsImNhcCIsImJvcmRlclJhZGl1cyIsImhlaWdodCIsImxlZnQiLCJ5IiwidG9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7O3NCQUNYO0FBQUMsVUFBTyxNQUFQO0FBQWM7OztFQURZQyxpQjs7a0JBQWhCRCxPOztJQUlmRSxVOzs7Ozs7Ozs7OzRCQUNLQyxDLEVBQUU7QUFDWCxRQUFLQyxLQUFMLENBQVdDLGVBQVgsR0FBMkJGLENBQTNCO0FBQ0E7OzsyQkFDUUEsQyxFQUFFLENBRVY7Ozt5QkFDTUEsQyxFQUFFO0FBQ1IsUUFBS0MsS0FBTCxDQUFXRSxVQUFYLEdBQXNCLGFBQXRCO0FBQ0E7OzswQkFDT0gsQyxFQUFFO0FBQ1Qsa0JBQWNBLENBQWQsdURBQWNBLENBQWQ7QUFDQSxTQUFLLFFBQUw7QUFDQyxZQUFPLEtBQUtJLFNBQUwsQ0FBZUosQ0FBZixDQUFQO0FBQ0QsU0FBSyxRQUFMO0FBQ0MsWUFBTyxLQUFLSyxRQUFMLENBQWNMLENBQWQsQ0FBUDtBQUNELFNBQUssUUFBTDtBQUNDLFlBQU8sS0FBS00sTUFBTCxDQUFZTixDQUFaLENBQVA7QUFORDtBQVFBOzs7cUJBQ0VBLEMsRUFBRTtBQUNKQSxLQUFFTyxLQUFGLEtBQVksS0FBS04sS0FBTCxDQUFXTyxXQUFYLEdBQXVCUixFQUFFTyxLQUFyQztBQUNBUCxLQUFFUyxLQUFGLEtBQVksS0FBS1IsS0FBTCxDQUFXUyxXQUFYLEdBQXVCVixFQUFFUyxLQUFGLEdBQVEsSUFBL0IsRUFBcUMsS0FBS1IsS0FBTCxDQUFXVSxXQUFYLEdBQXVCLE9BQXhFO0FBQ0FYLEtBQUVZLElBQUYsS0FBVyxLQUFLWCxLQUFMLENBQVdVLFdBQVgsR0FBdUIsS0FBS0UsU0FBTCxDQUFlYixFQUFFWSxJQUFqQixDQUFsQztBQUNBWixLQUFFYyxHQUFGLEtBQVEsS0FBUixLQUFrQixLQUFLYixLQUFMLENBQVdjLFlBQVgsR0FBd0JmLEVBQUVTLEtBQUYsR0FBUSxDQUFSLEdBQVUsSUFBcEQ7QUFDQTs7O3VCQUNJVCxDLEVBQUU7QUFDTixRQUFLQyxLQUFMLENBQVdRLEtBQVgsR0FBaUJULEVBQUVTLEtBQUYsR0FBUSxJQUF6QjtBQUNBLFFBQUtSLEtBQUwsQ0FBV2UsTUFBWCxHQUFrQmhCLEVBQUVnQixNQUFGLEdBQVMsSUFBM0I7QUFDQWhCLEtBQUVBLENBQUYsS0FBUSxLQUFLQyxLQUFMLENBQVdnQixJQUFYLEdBQWdCakIsRUFBRUEsQ0FBRixHQUFJLElBQTVCO0FBQ0FBLEtBQUVrQixDQUFGLEtBQVEsS0FBS2pCLEtBQUwsQ0FBV2tCLEdBQVgsR0FBZW5CLEVBQUVrQixDQUFGLEdBQUksSUFBM0I7QUFDQTs7O0VBL0J1QnBCLGtCQUFRQyxVOztBQWtDakNGLFFBQVFFLFVBQVIsR0FBbUJBLFVBQW5CIiwiZmlsZSI6ImdyYXBoaWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRHJhd2luZyBmcm9tICcuL2RyYXdpbmcnXHRcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhpYyBleHRlbmRzIERyYXdpbmd7XG5cdGdldCB0YWcoKXtyZXR1cm4gJ3NwYW4nfVxufVxuXG5jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgRHJhd2luZy5Qcm9wZXJ0aWVze1xuXHRzb2xpZEZpbGwoeCl7XG5cdFx0dGhpcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9eFxuXHR9XG5cdGdyYWRGaWxsKHgpe1xuXHRcdFxuXHR9XG5cdG5vRmlsbCh4KXtcblx0XHR0aGlzLnN0eWxlLmJhY2tncm91bmQ9J3RyYW5zcGFyZW50J1xuXHR9XG5cdGZpbGxSZWYoeCl7XG5cdFx0c3dpdGNoKHR5cGVvZih4KSl7XG5cdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdHJldHVybiB0aGlzLnNvbGlkRmlsbCh4KVxuXHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRyZXR1cm4gdGhpcy5ncmFkRmlsbCh4KVxuXHRcdGNhc2UgJ251bWJlcic6XG5cdFx0XHRyZXR1cm4gdGhpcy5ub0ZpbGwoeClcblx0XHR9XG5cdH1cblx0bG4oeCl7XG5cdFx0eC5jb2xvciAmJiAodGhpcy5zdHlsZS5ib3JkZXJDb2xvcj14LmNvbG9yKTtcblx0XHR4LndpZHRoICYmICh0aGlzLnN0eWxlLmJvcmRlcldpZHRoPXgud2lkdGgrJ3B4JywgdGhpcy5zdHlsZS5ib3JkZXJTdHlsZT0nc29saWQnKTtcblx0XHR4LmRhc2ggJiYgKHRoaXMuc3R5bGUuYm9yZGVyU3R5bGU9dGhpcy5saW5lU3R5bGUoeC5kYXNoKSk7XG5cdFx0eC5jYXA9PT0ncm5kJyAmJiAodGhpcy5zdHlsZS5ib3JkZXJSYWRpdXM9eC53aWR0aCoyKydweCcpXG5cdH1cblx0eGZybSh4KXtcblx0XHR0aGlzLnN0eWxlLndpZHRoPXgud2lkdGgrJ3B4J1xuXHRcdHRoaXMuc3R5bGUuaGVpZ2h0PXguaGVpZ2h0KydweCdcblx0XHR4LnggJiYgKHRoaXMuc3R5bGUubGVmdD14LngrJ3B4Jylcblx0XHR4LnkgJiYgKHRoaXMuc3R5bGUudG9wPXgueSsncHgnKVxuXHR9XG59XG5cbkdyYXBoaWMuUHJvcGVydGllcz1Qcm9wZXJ0aWVzIl19