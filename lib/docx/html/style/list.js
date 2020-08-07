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

var _paragraph = require('./paragraph');

var _paragraph2 = _interopRequireDefault(_paragraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListStyleType = { lowerLetter: 'lower-latin', upperLetter: 'upper-latin', lowerRoman: 'lower-roman', upperRoman: 'upper-roman' };
var cssID = _converter2.default.asCssID;

var List = function (_Style) {
  (0, _inherits3.default)(List, _Style);

  function List() {
    (0, _classCallCheck3.default)(this, List);

    var _this = (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).apply(this, arguments));

    _this.levelStyles = {};
    return _this;
  }

  (0, _createClass3.default)(List, [{
    key: '_getPropertiesConverter',
    value: function _getPropertiesConverter(category) {
      if (!category) return null;
      var info = category.split(' '),
          level = parseInt(info[0]),
          type = info.length == 1 ? 'list' : info[1],
          style = this.levelStyles[level],
          levelSelector = '.' + cssID(this.wordModel.id) + '[level="' + level + '"]';

      if (!style) style = this.levelStyles[level] = {};

      if (style[type]) return style[type];

      switch (type) {
        case 'inline':
          style.inline = new _inline2.default.Properties(this.doc.createStyle(levelSelector + '>li>p>.marker:before'));
          break;
        case 'paragraph':
          style.paragraph = new this.constructor.Pr(this.doc.createStyle(levelSelector + '>li>p'), this, levelSelector);
          break;
        case 'list':
          style.list = new this.constructor.Properties(this.doc.createStyle(levelSelector + '>li>p>.marker:before'), this, levelSelector, cssID(this.wordModel.id) + '_' + level, level);
          break;
      }
      return style[type];
    }
  }]);
  return List;
}(_converter2.default);

exports.default = List;


List.Pr = function (_Paragraph$Properties) {
  (0, _inherits3.default)(Pr, _Paragraph$Properties);

  function Pr(style, parent, levelSelector) {
    (0, _classCallCheck3.default)(this, Pr);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Pr.__proto__ || (0, _getPrototypeOf2.default)(Pr)).apply(this, arguments));

    _this2.doc = parent.doc;
    _this2.levelSelector = levelSelector;
    return _this2;
  }

  (0, _createClass3.default)(Pr, [{
    key: 'ind',
    value: function ind(x) {
      var hanging = x.hanging;
      delete x.hanging;
      _paragraph2.default.Properties.prototype.ind.call(this, x);
      x.hanging = hanging;
      x.hanging && (this.doc.createStyle(this.levelSelector + '>li>p>.marker').left = -x.hanging + 'px');
    }
  }]);
  return Pr;
}(_paragraph2.default.Properties);

List.Properties = function (_Style$Properties) {
  (0, _inherits3.default)(Properties, _Style$Properties);

  function Properties(style, parent, levelSelector, counter, level) {
    (0, _classCallCheck3.default)(this, Properties);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));

    _this3.doc = parent.doc;
    _this3.levelSelector = levelSelector;
    _this3.level = level;
    _this3.counter = counter;
    _this3.doc.createStyle(levelSelector).counterReset = counter;
    _this3.doc.createStyle(levelSelector + '>li').counterIncrement = counter;
    return _this3;
  }

  (0, _createClass3.default)(Properties, [{
    key: 'start',
    value: function start(x) {
      this.doc.createStyle(this.levelSelector).counterReset = this.counter + ' ' + (x - 1);
    }
  }, {
    key: 'numFmt',
    value: function numFmt(x) {
      this.type = ListStyleType[x] || x;
    }
  }, {
    key: 'lvlText',
    value: function lvlText(x) {
      this.style.content = '"' + x.replace('%' + (this.level + 1), '" counter(' + this.counter + (!this.type ? '' : ',' + this.type) + ') "') + '"';
    }
  }, {
    key: 'lvlJc',
    value: function lvlJc(x) {}
  }, {
    key: 'lvlPicBulletId',
    value: function lvlPicBulletId(x) {}
  }]);
  return Properties;
}(_converter2.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvbGlzdC5qcyJdLCJuYW1lcyI6WyJMaXN0U3R5bGVUeXBlIiwibG93ZXJMZXR0ZXIiLCJ1cHBlckxldHRlciIsImxvd2VyUm9tYW4iLCJ1cHBlclJvbWFuIiwiY3NzSUQiLCJTdHlsZSIsImFzQ3NzSUQiLCJMaXN0IiwiYXJndW1lbnRzIiwibGV2ZWxTdHlsZXMiLCJjYXRlZ29yeSIsImluZm8iLCJzcGxpdCIsImxldmVsIiwicGFyc2VJbnQiLCJ0eXBlIiwibGVuZ3RoIiwic3R5bGUiLCJsZXZlbFNlbGVjdG9yIiwid29yZE1vZGVsIiwiaWQiLCJpbmxpbmUiLCJJbmxpbmUiLCJQcm9wZXJ0aWVzIiwiZG9jIiwiY3JlYXRlU3R5bGUiLCJwYXJhZ3JhcGgiLCJjb25zdHJ1Y3RvciIsIlByIiwibGlzdCIsInBhcmVudCIsIngiLCJoYW5naW5nIiwiUGFyYWdyYXBoIiwicHJvdG90eXBlIiwiaW5kIiwiY2FsbCIsImxlZnQiLCJjb3VudGVyIiwiY291bnRlclJlc2V0IiwiY291bnRlckluY3JlbWVudCIsImNvbnRlbnQiLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSUEsZ0JBQWMsRUFBQ0MsYUFBWSxhQUFiLEVBQTJCQyxhQUFZLGFBQXZDLEVBQXFEQyxZQUFXLGFBQWhFLEVBQThFQyxZQUFXLGFBQXpGLEVBQWxCO0FBQ0EsSUFBSUMsUUFBTUMsb0JBQU1DLE9BQWhCOztJQUVxQkMsSTs7O0FBQ25CLGtCQUFhO0FBQUE7O0FBQUEsbUlBQ0ZDLFNBREU7O0FBRVgsVUFBS0MsV0FBTCxHQUFpQixFQUFqQjtBQUZXO0FBR1o7Ozs7NENBRXVCQyxRLEVBQVM7QUFDL0IsVUFBRyxDQUFDQSxRQUFKLEVBQ0UsT0FBTyxJQUFQO0FBQ0YsVUFBSUMsT0FBS0QsU0FBU0UsS0FBVCxDQUFlLEdBQWYsQ0FBVDtB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REQsT0FBakQ7QUFDQSxXQUFLZCxHQUFMLENBQVNDLFdBQVQsQ0FBcUJQLGdCQUFjLEtBQW5DLEVBQTBDc0IsZ0JBQTFDLEdBQTJERixPQUEzRDtBQVB1RDtBQVF4RDs7QUFUSDtBQUFBO0FBQUEsMEJBVVFQLENBVlIsRUFVVTtBQUNOLFdBQUtQLEdBQUwsQ0FBU0MsV0FBVCxDQUFxQixLQUFLUCxhQUExQixFQUF5Q3FCLFlBQXpDLEdBQXNELEtBQUtELE9BQUwsR0FBYSxHQUFiLElBQWtCUCxJQUFFLENBQXBCLENBQXREO0FBQ0Q7QUFaSDtBQUFBO0FBQUEsMkJBYVNBLENBYlQsRUFhVztBQUNQLFdBQUtoQixJQUFMLEdBQVVoQixjQUFjZ0MsQ0FBZCxLQUFrQkEsQ0FBNUI7QUFDRDtBQWZIO0FBQUE7QUFBQSw0QkFnQlVBLENBaEJWLEVBZ0JZO0FBQ1IsV0FBS2QsS0FBTCxDQUFXd0IsT0FBWCxHQUFtQixNQUFJVixFQUFFVyxPQUFGLENBQVUsT0FBSyxLQUFLN0IsS0FBTCxHQUFXLENBQWhCLENBQVYsRUFBNkIsZUFBYSxLQUFLeUIsT0FBbEIsSUFBMkIsQ0FBQyxLQUFLdkIsSUFBTixHQUFhLEVBQWIsR0FBa0IsTUFBSSxLQUFLQSxJQUF0RCxJQUE0RCxLQUF6RixDQUFKLEdBQW9HLEdBQXZIO0FBQ0Q7QUFsQkg7QUFBQTtBQUFBLDBCQW1CUWdCLENBbkJSLEVBbUJVLENBRVA7QUFyQkg7QUFBQTtBQUFBLG1DQXNCaUJBLENBdEJqQixFQXNCbUIsQ0FFaEI7QUF4Qkg7QUFBQTtBQUFBLEVBQXlDMUIsb0JBQU1rQixVQUEvQyIsImZpbGUiOiJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4vY29udmVydGVyJ1xuaW1wb3J0IElubGluZSBmcm9tICcuL2lubGluZSdcbmltcG9ydCBQYXJhZ3JhcGggZnJvbSAnLi9wYXJhZ3JhcGgnXG5cbnZhciBMaXN0U3R5bGVUeXBlPXtsb3dlckxldHRlcjonbG93ZXItbGF0aW4nLHVwcGVyTGV0dGVyOid1cHBlci1sYXRpbicsbG93ZXJSb21hbjonbG93ZXItcm9tYW4nLHVwcGVyUm9tYW46J3VwcGVyLXJvbWFuJ31cbnZhciBjc3NJRD1TdHlsZS5hc0Nzc0lEXG4gIFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdCBleHRlbmRzIFN0eWxle1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcbiAgICB0aGlzLmxldmVsU3R5bGVzPXt9XG4gIH1cbiAgXG4gIF9nZXRQcm9wZXJ0aWVzQ29udmVydGVyKGNhdGVnb3J5KXtcbiAgICBpZighY2F0ZWdvcnkpXG4gICAgICByZXR1cm4gbnVsbFxuICAgIHZhciBpbmZvPWNhdGVnb3J5LnNwbGl0KCcgJyksXG4gICAgICBsZXZlbD1wYXJzZUludChpbmZvWzBdKSxcbiAgICAgIHR5cGU9aW5mby5sZW5ndGg9PTEgPyAnbGlzdCcgOiBpbmZvWzFdLFxuICAgICAgc3R5bGU9dGhpcy5sZXZlbFN0eWxlc1tsZXZlbF0sXG4gICAgICBsZXZlbFNlbGVjdG9yPScuJytjc3NJRCh0aGlzLndvcmRNb2RlbC5pZCkrJ1tsZXZlbD1cIicrbGV2ZWwrJ1wiXSc7XG4gICAgXG4gICAgaWYoIXN0eWxlKVxuICAgICAgc3R5bGU9dGhpcy5sZXZlbFN0eWxlc1tsZXZlbF09e31cbiAgICAgIFxuICAgIGlmKHN0eWxlW3R5cGVdKVxuICAgICAgcmV0dXJuIHN0eWxlW3R5cGVdO1xuICAgICAgXG4gICAgc3dpdGNoKHR5cGUpe1xuICAgIGNhc2UgJ2lubGluZSc6XG4gICAgICBzdHlsZS5pbmxpbmU9bmV3IElubGluZS5Qcm9wZXJ0aWVzKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGxldmVsU2VsZWN0b3IrJz5saT5wPi5tYXJrZXI6YmVmb3JlJykpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3BhcmFncmFwaCc6XG4gICAgICBzdHlsZS5wYXJhZ3JhcGg9bmV3IHRoaXMuY29uc3RydWN0b3IuUHIodGhpcy5kb2MuY3JlYXRlU3R5bGUobGV2ZWxTZWxlY3RvcisnPmxpPnAnKSwgdGhpcywgbGV2ZWxTZWxlY3RvcilcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnbGlzdCc6XG4gICAgICBzdHlsZS5saXN0PW5ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXModGhpcy5kb2MuY3JlYXRlU3R5bGUobGV2ZWxTZWxlY3RvcisnPmxpPnA+Lm1hcmtlcjpiZWZvcmUnKSwgdGhpcywgbGV2ZWxTZWxlY3RvciwgY3NzSUQodGhpcy53b3JkTW9kZWwuaWQpKydfJytsZXZlbCwgbGV2ZWwpO1xuICAgICAgYnJlYWtcbiAgICB9XG4gICAgcmV0dXJuIHN0eWxlW3R5cGVdXG4gIH1cbn1cbiAgXG5MaXN0LlByPWNsYXNzIFByIGV4dGVuZHMgUGFyYWdyYXBoLlByb3BlcnRpZXN7XG4gIGNvbnN0cnVjdG9yKHN0eWxlLHBhcmVudCwgbGV2ZWxTZWxlY3Rvcil7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKVxuICAgIHRoaXMuZG9jPXBhcmVudC5kb2NcbiAgICB0aGlzLmxldmVsU2VsZWN0b3I9bGV2ZWxTZWxlY3RvclxuICB9XG4gIGluZCh4KXtcbiAgICB2YXIgaGFuZ2luZz14LmhhbmdpbmdcbiAgICBkZWxldGUgeC5oYW5naW5nXG4gICAgUGFyYWdyYXBoLlByb3BlcnRpZXMucHJvdG90eXBlLmluZC5jYWxsKHRoaXMseClcbiAgICB4Lmhhbmdpbmc9aGFuZ2luZ1xuICAgIHguaGFuZ2luZyAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy5sZXZlbFNlbGVjdG9yKyc+bGk+cD4ubWFya2VyJykubGVmdD0teC5oYW5naW5nKydweCcpXG4gIH1cbn1cbiAgICBcbkxpc3QuUHJvcGVydGllcz1jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcbiAgY29uc3RydWN0b3Ioc3R5bGUsIHBhcmVudCwgbGV2ZWxTZWxlY3RvciwgY291bnRlciwgbGV2ZWwpe1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcbiAgICB0aGlzLmRvYz1wYXJlbnQuZG9jXG4gICAgdGhpcy5sZXZlbFNlbGVjdG9yPWxldmVsU2VsZWN0b3JcbiAgICB0aGlzLmxldmVsPWxldmVsXG4gICAgdGhpcy5jb3VudGVyPWNvdW50ZXJcbiAgICB0aGlzLmRvYy5jcmVhdGVTdHlsZShsZXZlbFNlbGVjdG9yKS5jb3VudGVyUmVzZXQ9Y291bnRlclxuICAgIHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGxldmVsU2VsZWN0b3IrJz5saScpLmNvdW50ZXJJbmNyZW1lbnQ9Y291bnRlclxuICB9XG4gIHN0YXJ0KHgpe1xuICAgIHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMubGV2ZWxTZWxlY3RvcikuY291bnRlclJlc2V0PXRoaXMuY291bnRlcisnICcrKHgtMSlcbiAgfVxuICBudW1GbXQoeCl7XG4gICAgdGhpcy50eXBlPUxpc3RTdHlsZVR5cGVbeF18fHhcbiAgfVxuICBsdmxUZXh0KHgpe1xuICAgIHRoaXMuc3R5bGUuY29udGVudD0nXCInK3gucmVwbGFjZSgnJScrKHRoaXMubGV2ZWwrMSksJ1wiIGNvdW50ZXIoJyt0aGlzLmNvdW50ZXIrKCF0aGlzLnR5cGUgPyAnJyA6ICcsJyt0aGlzLnR5cGUpKycpIFwiJykrJ1wiJ1xuICB9XG4gIGx2bEpjKHgpe1xuICAgIFxuICB9XG4gIGx2bFBpY0J1bGxldElkKHgpe1xuICAgIFxuICB9XG59Il19