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

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

var _numbering = require('./numbering');

var _numbering2 = _interopRequireDefault(_numbering);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Paragraph = function (_Style) {
	(0, _inherits3.default)(Paragraph, _Style);

	function Paragraph() {
		(0, _classCallCheck3.default)(this, Paragraph);
		return (0, _possibleConstructorReturn3.default)(this, (Paragraph.__proto__ || (0, _getPrototypeOf2.default)(Paragraph)).apply(this, arguments));
	}

	(0, _createClass3.default)(Paragraph, [{
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
	(0, _inherits3.default)(Properties, _Style$Properties);

	function Properties() {
		(0, _classCallCheck3.default)(this, Properties);
		return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
	}

	(0, _createClass3.default)(Properties, [{
		key: 'jc',
		value: function jc(x) {
			this.style.textAlign = x;
		}
	}, {
		key: 'ind',
		value: function ind(x) {
			x.left && (this.style.marginLeft = x.left + 'px');
			x.right && (this.style.marginRight = x.right + 'px');
			x.firstLine && (this.style.textIndent = x.firstLine + 'px');
			x.hanging && (this.style.textIndent = '-' + x.hanging + 'px');
		}
	}, {
		key: 'spacing',
		value: function spacing(x) {
			x.bottom && (this.style.marginBottom = x.bottom + 'px');
			x.top && (this.style.marginTop = x.top + 'px');

			x.lineHeight && (this.style.lineHeight = x.lineHeight);
		}
	}]);
	return Properties;
}(_converter2.default.Properties);

Paragraph.FrameProperties = function (_Style$Properties2) {
	(0, _inherits3.default)(FrameProperties, _Style$Properties2);

	function FrameProperties() {
		(0, _classCallCheck3.default)(this, FrameProperties);
		return (0, _possibleConstructorReturn3.default)(this, (FrameProperties.__proto__ || (0, _getPrototypeOf2.default)(FrameProperties)).apply(this, arguments));
	}

	return FrameProperties;
}(_converter2.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbIlBhcmFncmFwaCIsImNhdGVnb3J5IiwiaW5saW5lU3R5bGUiLCJkb2MiLCJjcmVhdGVTdHlsZSIsImFzQ3NzSUQiLCJ3b3JkTW9kZWwiLCJpZCIsIlByb3BlcnRpZXMiLCJwYXJhZ3JhcGhTdHlsZSIsImNvbnN0cnVjdG9yIiwiX2dldFByb3BlcnRpZXNDb252ZXJ0ZXIiLCJGcmFtZVByb3BlcnRpZXMiLCJ4Iiwic3R5bGUiLCJ0ZXh0QWxpZ24iLCJsZWZ0IiwibWFyZ2luTGVmdCIsInJpZ2h0IiwibWFyZ2luUmlnaHQiLCJmaXJzdExpbmUiLCJ0ZXh0SW5kZW50IiwiaGFuZ2luZyIsImJvdHRvbSIsIm1hcmdpbkJvdHRvbSIsInRvcCIsIm1hcmdpblRvcCIsImxpbmVIZWlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLFM7Ozs7Ozs7Ozs7MENBQ0lDLFEsRUFBUztBQUNoQyxPQUFHLEtBQUtBLFFBQUwsQ0FBSCxFQUNDLE9BQU8sS0FBS0EsUUFBTCxDQUFQO0FBQ0QsV0FBT0EsUUFBUDtBQUNBLFNBQUssUUFBTDtBQUNDLFVBQUtDLFdBQUwsR0FBaUIsS0FBS0MsR0FBTCxDQUFTQyxXQUFULENBQXFCLE1BQUksb0JBQU1DLE9BQU4sQ0FBYyxLQUFLQyxTQUFMLENBQWVDLEVBQTdCLENBQUosR0FBcUMsT0FBMUQsQ0FBakI7QUFDQSxZQUFPLEtBQUtOLFFBQUwsSUFBZSxJQUFJLGlCQUFPTyxVQUFYLENBQXNCLEtBQUtOLFdBQTNCLENBQXRCO0FBQ0QsU0FBSyxXQUFMO0FBQ0MsVUFBS08sY0FBTCxHQUFvQixLQUFLTixHQUFMLENBQVNDLFdBQVQsQ0FBcUIsTUFBSSxvQkFBTUMsT0FBTixDQUFjLEtBQUtDLFNBQUwsQ0FBZUMsRUFBN0IsQ0FBekIsQ0FBcEI7QUFDQSxZQUFPLEtBQUtOLFFBQUwsSUFBZSxJQUFJLEtBQUtTLFdBQUwsQ0FBaUJGLFVBQXJCLENBQWdDLEtBQUtDLGNBQXJDLENBQXRCO0FBQ0QsU0FBSyxPQUFMO0FBQ0MsVUFBS0UsdUJBQUwsQ0FBNkIsV0FBN0I7QUFDQSxZQUFPLEtBQUtWLFFBQUwsSUFBZSxJQUFJLEtBQUtTLFdBQUwsQ0FBaUJFLGVBQXJCLENBQXFDLEtBQUtILGNBQTFDLENBQXRCO0FBQ0QsU0FBSyxXQUFMO0FBQ0MsVUFBS0UsdUJBQUwsQ0FBNkIsV0FBN0I7QUFDQSxZQUFPLEtBQUtWLFFBQUwsSUFBZSxJQUFJLG9CQUFVTyxVQUFkLENBQXlCLEtBQUtDLGNBQTlCLENBQXRCO0FBWkQ7QUFjQTs7Ozs7a0JBbEJtQlQsUzs7O0FBcUJyQkEsVUFBVVEsVUFBVjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxxQkFDSUssQ0FESixFQUNNO0FBQ0osUUFBS0MsS0FBTCxDQUFXQyxTQUFYLEdBQXFCRixDQUFyQjtBQUNBO0FBSEY7QUFBQTtBQUFBLHNCQUlLQSxDQUpMLEVBSU87QUFDTEEsS0FBRUcsSUFBRixLQUFXLEtBQUtGLEtBQUwsQ0FBV0csVUFBWCxHQUFzQkosRUFBRUcsSUFBRixHQUFPLElBQXhDO0FBQ0FILEtBQUVLLEtBQUYsS0FBWSxLQUFLSixLQUFMLENBQVdLLFdBQVgsR0FBdUJOLEVBQUVLLEtBQUYsR0FBUSxJQUEzQztBQUNBTCxLQUFFTyxTQUFGLEtBQWdCLEtBQUtOLEtBQUwsQ0FBV08sVUFBWCxHQUFzQlIsRUFBRU8sU0FBRixHQUFZLElBQWxEO0FBQ0FQLEtBQUVTLE9BQUYsS0FBYyxLQUFLUixLQUFMLENBQVdPLFVBQVgsR0FBc0IsTUFBSVIsRUFBRVMsT0FBTixHQUFjLElBQWxEO0FBQ0E7QUFURjtBQUFBO0FBQUEsMEJBVVNULENBVlQsRUFVVztBQUNUQSxLQUFFVSxNQUFGLEtBQWEsS0FBS1QsS0FBTCxDQUFXVSxZQUFYLEdBQXdCWCxFQUFFVSxNQUFGLEdBQVMsSUFBOUM7QUFDQVYsS0FBRVksR0FBRixLQUFVLEtBQUtYLEtBQUwsQ0FBV1ksU0FBWCxHQUFxQmIsRUFBRVksR0FBRixHQUFNLElBQXJDOztBQUVBWixLQUFFYyxVQUFGLEtBQWlCLEtBQUtiLEtBQUwsQ0FBV2EsVUFBWCxHQUFzQmQsRUFBRWMsVUFBekM7QUFDQTtBQWZGO0FBQUE7QUFBQSxFQUE4QyxvQkFBTW5CLFVBQXBEOztBQWtCQVIsVUFBVVksZUFBVjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsRUFBd0Qsb0JBQU1KLFVBQTlEIiwiZmlsZSI6InBhcmFncmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuL2NvbnZlcnRlcidcbmltcG9ydCBJbmxpbmUgZnJvbSAnLi9pbmxpbmUnXG5pbXBvcnQgTnVtYmVyaW5nIGZyb20gJy4vbnVtYmVyaW5nJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhZ3JhcGggZXh0ZW5kcyBTdHlsZXtcblx0X2dldFByb3BlcnRpZXNDb252ZXJ0ZXIoY2F0ZWdvcnkpe1xuXHRcdGlmKHRoaXNbY2F0ZWdvcnldKVxuXHRcdFx0cmV0dXJuIHRoaXNbY2F0ZWdvcnldXG5cdFx0c3dpdGNoKGNhdGVnb3J5KXtcblx0XHRjYXNlICdpbmxpbmUnOlxuXHRcdFx0dGhpcy5pbmxpbmVTdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnLicrU3R5bGUuYXNDc3NJRCh0aGlzLndvcmRNb2RlbC5pZCkrJyBzcGFuJylcblx0XHRcdHJldHVybiB0aGlzW2NhdGVnb3J5XT1uZXcgSW5saW5lLlByb3BlcnRpZXModGhpcy5pbmxpbmVTdHlsZSlcblx0XHRjYXNlICdwYXJhZ3JhcGgnOlxuXHRcdFx0dGhpcy5wYXJhZ3JhcGhTdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnLicrU3R5bGUuYXNDc3NJRCh0aGlzLndvcmRNb2RlbC5pZCkpXG5cdFx0XHRyZXR1cm4gdGhpc1tjYXRlZ29yeV09bmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyh0aGlzLnBhcmFncmFwaFN0eWxlKVxuXHRcdGNhc2UgJ2ZyYW1lJzpcblx0XHRcdHRoaXMuX2dldFByb3BlcnRpZXNDb252ZXJ0ZXIoJ3BhcmFncmFwaCcpXG5cdFx0XHRyZXR1cm4gdGhpc1tjYXRlZ29yeV09bmV3IHRoaXMuY29uc3RydWN0b3IuRnJhbWVQcm9wZXJ0aWVzKHRoaXMucGFyYWdyYXBoU3R5bGUpXG5cdFx0Y2FzZSAnbnVtYmVyaW5nJzpcblx0XHRcdHRoaXMuX2dldFByb3BlcnRpZXNDb252ZXJ0ZXIoJ3BhcmFncmFwaCcpXG5cdFx0XHRyZXR1cm4gdGhpc1tjYXRlZ29yeV09bmV3IE51bWJlcmluZy5Qcm9wZXJ0aWVzKHRoaXMucGFyYWdyYXBoU3R5bGUpXG5cdFx0fVxuXHR9XG59XG5cblBhcmFncmFwaC5Qcm9wZXJ0aWVzPWNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRqYyh4KXtcblx0XHR0aGlzLnN0eWxlLnRleHRBbGlnbj14XG5cdH1cblx0aW5kKHgpe1xuXHRcdHgubGVmdCAmJiAodGhpcy5zdHlsZS5tYXJnaW5MZWZ0PXgubGVmdCsncHgnKVxuXHRcdHgucmlnaHQgJiYgKHRoaXMuc3R5bGUubWFyZ2luUmlnaHQ9eC5yaWdodCsncHgnKVxuXHRcdHguZmlyc3RMaW5lICYmICh0aGlzLnN0eWxlLnRleHRJbmRlbnQ9eC5maXJzdExpbmUrJ3B4Jylcblx0XHR4LmhhbmdpbmcgJiYgKHRoaXMuc3R5bGUudGV4dEluZGVudD0nLScreC5oYW5naW5nKydweCcpXG5cdH1cblx0c3BhY2luZyh4KXtcblx0XHR4LmJvdHRvbSAmJiAodGhpcy5zdHlsZS5tYXJnaW5Cb3R0b209eC5ib3R0b20rJ3B4Jylcblx0XHR4LnRvcCAmJiAodGhpcy5zdHlsZS5tYXJnaW5Ub3A9eC50b3ArJ3B4Jylcblx0XHRcblx0XHR4LmxpbmVIZWlnaHQgJiYgKHRoaXMuc3R5bGUubGluZUhlaWdodD14LmxpbmVIZWlnaHQpXG5cdH1cbn1cblxuUGFyYWdyYXBoLkZyYW1lUHJvcGVydGllcz1jbGFzcyBGcmFtZVByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRcdFxufSJdfQ==