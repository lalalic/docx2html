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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbIlBhcmFncmFwaCIsImNhdGVnb3J5IiwiaW5saW5lU3R5bGUiLCJkb2MiLCJjcmVhdGVTdHlsZSIsIlN0eWxlIiwiYXNDc3NJRCIsIndvcmRNb2RlbCIsImlkIiwiSW5saW5lIiwiUHJvcGVydGllcyIsInBhcmFncmFwaFN0eWxlIiwiY29uc3RydWN0b3IiLCJfZ2V0UHJvcGVydGllc0NvbnZlcnRlciIsIkZyYW1lUHJvcGVydGllcyIsIk51bWJlcmluZyIsIngiLCJzdHlsZSIsInRleHRBbGlnbiIsImxlZnQiLCJtYXJnaW5MZWZ0IiwicmlnaHQiLCJtYXJnaW5SaWdodCIsImZpcnN0TGluZSIsInRleHRJbmRlbnQiLCJoYW5naW5nIiwiYm90dG9tIiwibWFyZ2luQm90dG9tIiwidG9wIiwibWFyZ2luVG9wIiwibGluZUhlaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7Ozs0Q0FDS0MsUSxFQUFTO0FBQy9CLFVBQUcsS0FBS0EsUUFBTCxDQUFILEVBQ0UsT0FBTyxLQUFLQSxRQUFMLENBQVA7QUFDRixjQUFPQSxRQUFQO0FBQ0EsYUFBSyxRQUFMO0FBQ0UsZUFBS0MsV0FBTCxHQUFpQixLQUFLQyxHQUFMLENBQVNDLFdBQVQsQ0FBcUIsTUFBSUMsb0JBQU1DLE9BQU4sQ0FBYyxLQUFLQyxTQUFMLENBQWVDLEVBQTdCLENBQUosR0FBcUMsT0FBMUQsQ0FBakI7QUFDQSxpQkFBTyxLQUFLUCxRQUFMLElBQWUsSUFBSVEsaUJBQU9DLFVBQVgsQ0FBc0IsS0FBS1IsV0FBM0IsQ0FBdEI7QUFDRixhQUFLLFdBQUw7QUFDRSxlQUFLUyxjQUFMLEdBQW9CLEtBQUtSLEdBQUwsQ0FBU0MsV0FBVCxDQUFxQixNQUFJQyxvQkFBTUMsT0FBTixDQUFjLEtBQUtDLFNBQUwsQ0FBZUMsRUFBN0IsQ0FBekIsQ0FBcEI7QUFDQSxpQkFBTyxLQUFLUCxRQUFMLElBQWUsSUFBSSxLQUFLVyxXQUFMLENBQWlCRixVQUFyQixDQUFnQyxLQUFLQyxjQUFyQyxDQUF0QjtBQUNGLGFBQUssT0FBTDtBQUNFLGVBQUtFLHVCQUFMLENBQTZCLFdBQTdCO0FBQ0EsaUJBQU8sS0FBS1osUUFBTCxJQUFlLElBQUksS0FBS1csV0FBTCxDQUFpQkUsZUFBckIsQ0FBcUMsS0FBS0gsY0FBMUMsQ0FBdEI7QUFDRixhQUFLLFdBQUw7QUFDRSxlQUFLRSx1QkFBTCxDQUE2QixXQUE3QjtBQUNBLGlCQUFPLEtBQUtaLFFBQUwsSUFBZSxJQUFJYyxvQkFBVUwsVUFBZCxDQUF5QixLQUFLQyxjQUE5QixDQUF0QjtBQVpGO0FBY0Q7OztFQWxCb0NOLG1COztrQkFBbEJMLFM7OztBQXFCckJBLFVBQVVVLFVBQVY7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsdUJBQ0tNLENBREwsRUFDTztBQUNILFdBQUtDLEtBQUwsQ0FBV0MsU0FBWCxHQUFxQkYsQ0FBckI7QUFDRDtBQUhIO0FBQUE7QUFBQSx3QkFJTUEsQ0FKTixFQUlRO0FBQ0pBLFFBQUVHLElBQUYsS0FBVyxLQUFLRixLQUFMLENBQVdHLFVBQVgsR0FBc0JKLEVBQUVHLElBQUYsR0FBTyxJQUF4QztBQUNBSCxRQUFFSyxLQUFGLEtBQVksS0FBS0osS0FBTCxDQUFXSyxXQUFYLEdBQXVCTixFQUFFSyxLQUFGLEdBQVEsSUFBM0M7QUFDQUwsUUFBRU8sU0FBRixLQUFnQixLQUFLTixLQUFMLENBQVdPLFVBQVgsR0FBc0JSLEVBQUVPLFNBQUYsR0FBWSxJQUFsRDtBQUNBUCxRQUFFUyxPQUFGLEtBQWMsS0FBS1IsS0FBTCxDQUFXTyxVQUFYLEdBQXNCLE1BQUlSLEVBQUVTLE9BQU4sR0FBYyxJQUFsRDtBQUNEO0FBVEg7QUFBQTtBQUFBLDRCQVVVVCxDQVZWLEVBVVk7QUFDUkEsUUFBRVUsTUFBRixLQUFhLEtBQUtULEtBQUwsQ0FBV1UsWUFBWCxHQUF3QlgsRUFBRVUsTUFBRixHQUFTLElBQTlDO0FBQ0FWLFFBQUVZLEdBQUYsS0FBVSxLQUFLWCxLQUFMLENBQVdZLFNBQVgsR0FBcUJiLEVBQUVZLEdBQUYsR0FBTSxJQUFyQzs7QUFFQVosUUFBRWMsVUFBRixLQUFpQixLQUFLYixLQUFMLENBQVdhLFVBQVgsR0FBc0JkLEVBQUVjLFVBQXpDO0FBQ0Q7QUFmSDtBQUFBO0FBQUEsRUFBOEN6QixvQkFBTUssVUFBcEQ7O0FBa0JBVixVQUFVYyxlQUFWO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSxFQUF3RFQsb0JBQU1LLFVBQTlEIiwiZmlsZSI6InBhcmFncmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuL2NvbnZlcnRlcidcbmltcG9ydCBJbmxpbmUgZnJvbSAnLi9pbmxpbmUnXG5pbXBvcnQgTnVtYmVyaW5nIGZyb20gJy4vbnVtYmVyaW5nJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhZ3JhcGggZXh0ZW5kcyBTdHlsZXtcbiAgX2dldFByb3BlcnRpZXNDb252ZXJ0ZXIoY2F0ZWdvcnkpe1xuICAgIGlmKHRoaXNbY2F0ZWdvcnldKVxuICAgICAgcmV0dXJuIHRoaXNbY2F0ZWdvcnldXG4gICAgc3dpdGNoKGNhdGVnb3J5KXtcbiAgICBjYXNlICdpbmxpbmUnOlxuICAgICAgdGhpcy5pbmxpbmVTdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnLicrU3R5bGUuYXNDc3NJRCh0aGlzLndvcmRNb2RlbC5pZCkrJyBzcGFuJylcbiAgICAgIHJldHVybiB0aGlzW2NhdGVnb3J5XT1uZXcgSW5saW5lLlByb3BlcnRpZXModGhpcy5pbmxpbmVTdHlsZSlcbiAgICBjYXNlICdwYXJhZ3JhcGgnOlxuICAgICAgdGhpcy5wYXJhZ3JhcGhTdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnLicrU3R5bGUuYXNDc3NJRCh0aGlzLndvcmRNb2RlbC5pZCkpXG4gICAgICByZXR1cm4gdGhpc1tjYXRlZ29yeV09bmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyh0aGlzLnBhcmFncmFwaFN0eWxlKVxuICAgIGNhc2UgJ2ZyYW1lJzpcbiAgICAgIHRoaXMuX2dldFByb3BlcnRpZXNDb252ZXJ0ZXIoJ3BhcmFncmFwaCcpXG4gICAgICByZXR1cm4gdGhpc1tjYXRlZ29yeV09bmV3IHRoaXMuY29uc3RydWN0b3IuRnJhbWVQcm9wZXJ0aWVzKHRoaXMucGFyYWdyYXBoU3R5bGUpXG4gICAgY2FzZSAnbnVtYmVyaW5nJzpcbiAgICAgIHRoaXMuX2dldFByb3BlcnRpZXNDb252ZXJ0ZXIoJ3BhcmFncmFwaCcpXG4gICAgICByZXR1cm4gdGhpc1tjYXRlZ29yeV09bmV3IE51bWJlcmluZy5Qcm9wZXJ0aWVzKHRoaXMucGFyYWdyYXBoU3R5bGUpXG4gICAgfVxuICB9XG59XG5cblBhcmFncmFwaC5Qcm9wZXJ0aWVzPWNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuICBqYyh4KXtcbiAgICB0aGlzLnN0eWxlLnRleHRBbGlnbj14XG4gIH1cbiAgaW5kKHgpe1xuICAgIHgubGVmdCAmJiAodGhpcy5zdHlsZS5tYXJnaW5MZWZ0PXgubGVmdCsncHgnKVxuICAgIHgucmlnaHQgJiYgKHRoaXMuc3R5bGUubWFyZ2luUmlnaHQ9eC5yaWdodCsncHgnKVxuICAgIHguZmlyc3RMaW5lICYmICh0aGlzLnN0eWxlLnRleHRJbmRlbnQ9eC5maXJzdExpbmUrJ3B4JylcbiAgICB4LmhhbmdpbmcgJiYgKHRoaXMuc3R5bGUudGV4dEluZGVudD0nLScreC5oYW5naW5nKydweCcpXG4gIH1cbiAgc3BhY2luZyh4KXtcbiAgICB4LmJvdHRvbSAmJiAodGhpcy5zdHlsZS5tYXJnaW5Cb3R0b209eC5ib3R0b20rJ3B4JylcbiAgICB4LnRvcCAmJiAodGhpcy5zdHlsZS5tYXJnaW5Ub3A9eC50b3ArJ3B4JylcbiAgICBcbiAgICB4LmxpbmVIZWlnaHQgJiYgKHRoaXMuc3R5bGUubGluZUhlaWdodD14LmxpbmVIZWlnaHQpXG4gIH1cbn1cblxuUGFyYWdyYXBoLkZyYW1lUHJvcGVydGllcz1jbGFzcyBGcmFtZVByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuICAgIFxufSJdfQ==