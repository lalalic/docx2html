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

var Section = function (_Style$Properties) {
	_inherits(Section, _Style$Properties);

	function Section() {
		_classCallCheck(this, Section);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Section).apply(this, arguments));
	}

	_createClass(Section, [{
		key: 'size',
		value: function size(x) {
			this.style.width = x.width + 'pt';
			this.style.minHeight = x.height + 'pt';
		}
	}, {
		key: 'margin',
		value: function margin(x) {
			this.style.paddingLeft = x.left + 'pt';
			this.style.paddingRight = x.right + 'pt';
			this.style.paddingTop = x.top + 'pt';
			this.style.paddingBottom = x.bottom + 'pt';

			x.gutter && (this.style['padding' + (x.gutterAtRight ? 'Right' : 'Left')] = x[x.gutterAtRight ? 'right' : 'left'] + x.gutter + 'pt');
		}
	}, {
		key: 'cols',
		value: function cols(x) {
			this.styless('column-count', x.num);
			x.space && this.styless('column-gap', x.space + 'pt');
			x.sep && this.styless('column-rule', '1px solid black');
		}
	}]);

	return Section;
}(_converter2.default.Properties);

exports.default = Section;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvc2VjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O3VCQUNmLEdBQUU7QUFDTixRQUFLLEtBQUwsQ0FBVyxLQUFYLEdBQWlCLEVBQUUsS0FBRixHQUFRLElBQVIsQ0FEWDtBQUVOLFFBQUssS0FBTCxDQUFXLFNBQVgsR0FBcUIsRUFBRSxNQUFGLEdBQVMsSUFBVCxDQUZmOzs7O3lCQUlBLEdBQUU7QUFDUixRQUFLLEtBQUwsQ0FBVyxXQUFYLEdBQXVCLEVBQUUsSUFBRixHQUFPLElBQVAsQ0FEZjtBQUVSLFFBQUssS0FBTCxDQUFXLFlBQVgsR0FBd0IsRUFBRSxLQUFGLEdBQVEsSUFBUixDQUZoQjtBQUdSLFFBQUssS0FBTCxDQUFXLFVBQVgsR0FBc0IsRUFBRSxHQUFGLEdBQU0sSUFBTixDQUhkO0FBSVIsUUFBSyxLQUFMLENBQVcsYUFBWCxHQUF5QixFQUFFLE1BQUYsR0FBUyxJQUFULENBSmpCOztBQU1SLEtBQUUsTUFBRixLQUFhLEtBQUssS0FBTCxDQUFXLGFBQVcsRUFBRSxhQUFGLEdBQWtCLE9BQWxCLEdBQTRCLE1BQTVCLENBQVgsQ0FBWCxHQUEyRCxFQUFHLEVBQUUsYUFBRixHQUFrQixPQUFsQixHQUE0QixNQUE1QixDQUFILEdBQXdDLEVBQUUsTUFBRixHQUFTLElBQWpELENBQXhFLENBTlE7Ozs7dUJBUUosR0FBRTtBQUNOLFFBQUssT0FBTCxDQUFhLGNBQWIsRUFBNEIsRUFBRSxHQUFGLENBQTVCLENBRE07QUFFTixLQUFFLEtBQUYsSUFBVyxLQUFLLE9BQUwsQ0FBYSxZQUFiLEVBQTBCLEVBQUUsS0FBRixHQUFRLElBQVIsQ0FBckMsQ0FGTTtBQUdOLEtBQUUsR0FBRixJQUFTLEtBQUssT0FBTCxDQUFhLGFBQWIsRUFBMkIsaUJBQTNCLENBQVQsQ0FITTs7OztRQWJhO0VBQWdCLG9CQUFNLFVBQU47O2tCQUFoQiIsImZpbGUiOiJzZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4vY29udmVydGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcblx0c2l6ZSh4KXtcblx0XHR0aGlzLnN0eWxlLndpZHRoPXgud2lkdGgrJ3B0J1xuXHRcdHRoaXMuc3R5bGUubWluSGVpZ2h0PXguaGVpZ2h0KydwdCdcblx0fVxuXHRtYXJnaW4oeCl7XG5cdFx0dGhpcy5zdHlsZS5wYWRkaW5nTGVmdD14LmxlZnQrJ3B0J1xuXHRcdHRoaXMuc3R5bGUucGFkZGluZ1JpZ2h0PXgucmlnaHQrJ3B0J1xuXHRcdHRoaXMuc3R5bGUucGFkZGluZ1RvcD14LnRvcCsncHQnXG5cdFx0dGhpcy5zdHlsZS5wYWRkaW5nQm90dG9tPXguYm90dG9tKydwdCdcblx0XHRcblx0XHR4Lmd1dHRlciAmJiAodGhpcy5zdHlsZVsncGFkZGluZycrKHguZ3V0dGVyQXRSaWdodCA/ICdSaWdodCcgOiAnTGVmdCcpXT14Wyh4Lmd1dHRlckF0UmlnaHQgPyAncmlnaHQnIDogJ2xlZnQnKV0reC5ndXR0ZXIrJ3B0Jylcblx0fVxuXHRjb2xzKHgpe1xuXHRcdHRoaXMuc3R5bGVzcygnY29sdW1uLWNvdW50Jyx4Lm51bSlcblx0XHR4LnNwYWNlICYmIHRoaXMuc3R5bGVzcygnY29sdW1uLWdhcCcseC5zcGFjZSsncHQnKTtcblx0XHR4LnNlcCAmJiB0aGlzLnN0eWxlc3MoJ2NvbHVtbi1ydWxlJywnMXB4IHNvbGlkIGJsYWNrJyk7XG5cdH1cbn0iXX0=