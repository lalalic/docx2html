'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

var _numbering = require('./numbering');

var _numbering2 = _interopRequireDefault(_numbering);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Paragraph = function (_Style) {
	_inherits(Paragraph, _Style);

	function Paragraph() {
		_classCallCheck(this, Paragraph);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Paragraph).apply(this, arguments));
	}

	_createClass(Paragraph, [{
		key: '_getPropertiesConverter',
		value: function _getPropertiesConverter(category) {
			if (this[category]) return this[category];
			switch (category) {
				case 'inline':
					this.inlineStyle = this.doc.createStyle('.' + _converter2.default.asCssID(this.wordModel.id) + ' span');
					return this[category] = new _inline2.default.Properties(this.inlineStyle);
				case 'paragraph':
					this.paragraphStyle = this.doc.createStyle('.' + _converter2.default.asCssID(this.wordModel.id));
					return this[category] = new this.constructor.Properties(this.paragraphStyle);
				case 'frame':
					this._getPropertiesConverter('paragraph');
					return this[category] = new this.constructor.FrameProperties(this.paragraphStyle);
				case 'numbering':
					this._getPropertiesConverter('paragraph');
					return this[category] = new _numbering2.default.Properties(this.paragraphStyle);
			}
		}
	}]);

	return Paragraph;
}(_converter2.default);

exports.default = Paragraph;


Paragraph.Properties = function (_Style$Properties) {
	_inherits(Properties, _Style$Properties);

	function Properties() {
		_classCallCheck(this, Properties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));
	}

	_createClass(Properties, [{
		key: 'jc',
		value: function jc(x) {
			this.style.textAlign = x;
		}
	}, {
		key: 'ind',
		value: function ind(x) {
			x.left && (this.style.marginLeft = x.left + 'pt');
			x.right && (this.style.marginRight = x.right + 'pt');
			x.firstLine && (this.style.textIndent = x.firstLine + 'pt');
			x.hanging && (this.style.textIndent = '-' + x.hanging + 'pt');
		}
	}, {
		key: 'spacing',
		value: function spacing(x) {
			x.bottom && (this.style.marginBottom = x.bottom + 'pt');
			x.top && (this.style.marginTop = x.top + 'pt');

			x.lineHeight && (this.style.lineHeight = x.lineHeight);
		}
	}]);

	return Properties;
}(_converter2.default.Properties);

Paragraph.FrameProperties = function (_Style$Properties2) {
	_inherits(FrameProperties, _Style$Properties2);

	function FrameProperties() {
		_classCallCheck(this, FrameProperties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(FrameProperties).apply(this, arguments));
	}

	return FrameProperties;
}(_converter2.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzBDQUNJLFVBQVM7QUFDaEMsT0FBRyxLQUFLLFFBQUwsQ0FBSCxFQUNDLE9BQU8sS0FBSyxRQUFMLENBQVAsQ0FERDtBQUVBLFdBQU8sUUFBUDtBQUNBLFNBQUssUUFBTDtBQUNDLFVBQUssV0FBTCxHQUFpQixLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLE1BQUksb0JBQU0sT0FBTixDQUFjLEtBQUssU0FBTCxDQUFlLEVBQWYsQ0FBbEIsR0FBcUMsT0FBckMsQ0FBdEMsQ0FERDtBQUVDLFlBQU8sS0FBSyxRQUFMLElBQWUsSUFBSSxpQkFBTyxVQUFQLENBQWtCLEtBQUssV0FBTCxDQUFyQyxDQUZSO0FBREEsU0FJSyxXQUFMO0FBQ0MsVUFBSyxjQUFMLEdBQW9CLEtBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsTUFBSSxvQkFBTSxPQUFOLENBQWMsS0FBSyxTQUFMLENBQWUsRUFBZixDQUFsQixDQUF6QyxDQUREO0FBRUMsWUFBTyxLQUFLLFFBQUwsSUFBZSxJQUFJLEtBQUssV0FBTCxDQUFpQixVQUFqQixDQUE0QixLQUFLLGNBQUwsQ0FBL0MsQ0FGUjtBQUpBLFNBT0ssT0FBTDtBQUNDLFVBQUssdUJBQUwsQ0FBNkIsV0FBN0IsRUFERDtBQUVDLFlBQU8sS0FBSyxRQUFMLElBQWUsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsZUFBakIsQ0FBaUMsS0FBSyxjQUFMLENBQXBELENBRlI7QUFQQSxTQVVLLFdBQUw7QUFDQyxVQUFLLHVCQUFMLENBQTZCLFdBQTdCLEVBREQ7QUFFQyxZQUFPLEtBQUssUUFBTCxJQUFlLElBQUksb0JBQVUsVUFBVixDQUFxQixLQUFLLGNBQUwsQ0FBeEMsQ0FGUjtBQVZBLElBSGdDOzs7O1FBRGI7Ozs7OztBQXFCckIsVUFBVSxVQUFWO1dBQTJCOzs7Ozs7Ozs7O3FCQUN2QixHQUFFO0FBQ0osUUFBSyxLQUFMLENBQVcsU0FBWCxHQUFxQixDQUFyQixDQURJOzs7O3NCQUdELEdBQUU7QUFDTCxLQUFFLElBQUYsS0FBVyxLQUFLLEtBQUwsQ0FBVyxVQUFYLEdBQXNCLEVBQUUsSUFBRixHQUFPLElBQVAsQ0FBakMsQ0FESztBQUVMLEtBQUUsS0FBRixLQUFZLEtBQUssS0FBTCxDQUFXLFdBQVgsR0FBdUIsRUFBRSxLQUFGLEdBQVEsSUFBUixDQUFuQyxDQUZLO0FBR0wsS0FBRSxTQUFGLEtBQWdCLEtBQUssS0FBTCxDQUFXLFVBQVgsR0FBc0IsRUFBRSxTQUFGLEdBQVksSUFBWixDQUF0QyxDQUhLO0FBSUwsS0FBRSxPQUFGLEtBQWMsS0FBSyxLQUFMLENBQVcsVUFBWCxHQUFzQixNQUFJLEVBQUUsT0FBRixHQUFVLElBQWQsQ0FBcEMsQ0FKSzs7OzswQkFNRSxHQUFFO0FBQ1QsS0FBRSxNQUFGLEtBQWEsS0FBSyxLQUFMLENBQVcsWUFBWCxHQUF3QixFQUFFLE1BQUYsR0FBUyxJQUFULENBQXJDLENBRFM7QUFFVCxLQUFFLEdBQUYsS0FBVSxLQUFLLEtBQUwsQ0FBVyxTQUFYLEdBQXFCLEVBQUUsR0FBRixHQUFNLElBQU4sQ0FBL0IsQ0FGUzs7QUFJVCxLQUFFLFVBQUYsS0FBaUIsS0FBSyxLQUFMLENBQVcsVUFBWCxHQUFzQixFQUFFLFVBQUYsQ0FBdkMsQ0FKUzs7OztRQVZnQjtFQUFtQixvQkFBTSxVQUFOLENBQTlDOztBQWtCQSxVQUFVLGVBQVY7V0FBZ0M7Ozs7Ozs7OztFQUF3QixvQkFBTSxVQUFOLENBQXhEIiwiZmlsZSI6InBhcmFncmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuL2NvbnZlcnRlcidcbmltcG9ydCBJbmxpbmUgZnJvbSAnLi9pbmxpbmUnXG5pbXBvcnQgTnVtYmVyaW5nIGZyb20gJy4vbnVtYmVyaW5nJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhZ3JhcGggZXh0ZW5kcyBTdHlsZXtcblx0X2dldFByb3BlcnRpZXNDb252ZXJ0ZXIoY2F0ZWdvcnkpe1xuXHRcdGlmKHRoaXNbY2F0ZWdvcnldKVxuXHRcdFx0cmV0dXJuIHRoaXNbY2F0ZWdvcnldXG5cdFx0c3dpdGNoKGNhdGVnb3J5KXtcblx0XHRjYXNlICdpbmxpbmUnOlxuXHRcdFx0dGhpcy5pbmxpbmVTdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnLicrU3R5bGUuYXNDc3NJRCh0aGlzLndvcmRNb2RlbC5pZCkrJyBzcGFuJylcblx0XHRcdHJldHVybiB0aGlzW2NhdGVnb3J5XT1uZXcgSW5saW5lLlByb3BlcnRpZXModGhpcy5pbmxpbmVTdHlsZSlcblx0XHRjYXNlICdwYXJhZ3JhcGgnOlxuXHRcdFx0dGhpcy5wYXJhZ3JhcGhTdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnLicrU3R5bGUuYXNDc3NJRCh0aGlzLndvcmRNb2RlbC5pZCkpXG5cdFx0XHRyZXR1cm4gdGhpc1tjYXRlZ29yeV09bmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyh0aGlzLnBhcmFncmFwaFN0eWxlKVxuXHRcdGNhc2UgJ2ZyYW1lJzpcblx0XHRcdHRoaXMuX2dldFByb3BlcnRpZXNDb252ZXJ0ZXIoJ3BhcmFncmFwaCcpXG5cdFx0XHRyZXR1cm4gdGhpc1tjYXRlZ29yeV09bmV3IHRoaXMuY29uc3RydWN0b3IuRnJhbWVQcm9wZXJ0aWVzKHRoaXMucGFyYWdyYXBoU3R5bGUpXG5cdFx0Y2FzZSAnbnVtYmVyaW5nJzpcblx0XHRcdHRoaXMuX2dldFByb3BlcnRpZXNDb252ZXJ0ZXIoJ3BhcmFncmFwaCcpXG5cdFx0XHRyZXR1cm4gdGhpc1tjYXRlZ29yeV09bmV3IE51bWJlcmluZy5Qcm9wZXJ0aWVzKHRoaXMucGFyYWdyYXBoU3R5bGUpXG5cdFx0fVxuXHR9XG59XG5cblBhcmFncmFwaC5Qcm9wZXJ0aWVzPWNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRqYyh4KXtcblx0XHR0aGlzLnN0eWxlLnRleHRBbGlnbj14XG5cdH1cblx0aW5kKHgpe1xuXHRcdHgubGVmdCAmJiAodGhpcy5zdHlsZS5tYXJnaW5MZWZ0PXgubGVmdCsncHQnKVxuXHRcdHgucmlnaHQgJiYgKHRoaXMuc3R5bGUubWFyZ2luUmlnaHQ9eC5yaWdodCsncHQnKVxuXHRcdHguZmlyc3RMaW5lICYmICh0aGlzLnN0eWxlLnRleHRJbmRlbnQ9eC5maXJzdExpbmUrJ3B0Jylcblx0XHR4LmhhbmdpbmcgJiYgKHRoaXMuc3R5bGUudGV4dEluZGVudD0nLScreC5oYW5naW5nKydwdCcpXG5cdH1cblx0c3BhY2luZyh4KXtcblx0XHR4LmJvdHRvbSAmJiAodGhpcy5zdHlsZS5tYXJnaW5Cb3R0b209eC5ib3R0b20rJ3B0Jylcblx0XHR4LnRvcCAmJiAodGhpcy5zdHlsZS5tYXJnaW5Ub3A9eC50b3ArJ3B0Jylcblx0XHRcblx0XHR4LmxpbmVIZWlnaHQgJiYgKHRoaXMuc3R5bGUubGluZUhlaWdodD14LmxpbmVIZWlnaHQpXG5cdH1cbn1cblxuUGFyYWdyYXBoLkZyYW1lUHJvcGVydGllcz1jbGFzcyBGcmFtZVByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRcdFxufSJdfQ==