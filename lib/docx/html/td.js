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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

var _table = require('./style/table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Td = function (_Converter) {
  (0, _inherits3.default)(Td, _Converter);

  function Td() {
    (0, _classCallCheck3.default)(this, Td);
    return (0, _possibleConstructorReturn3.default)(this, (Td.__proto__ || (0, _getPrototypeOf2.default)(Td)).apply(this, arguments));
  }

  (0, _createClass3.default)(Td, [{
    key: 'convertStyle',
    value: function convertStyle(el) {
      (0, _get3.default)(Td.prototype.__proto__ || (0, _getPrototypeOf2.default)(Td.prototype), 'convertStyle', this).apply(this, arguments);
      var style = this.wordModel.getDirectStyle();
      style && style.parse([new this.constructor.Properties(el.style, this)]);
    }
  }, {
    key: 'tag',
    get: function get() {
      return 'td';
    }
  }]);
  return Td;
}(_converter2.default);

exports.default = Td;

var Properties = function (_Style$CellProperties) {
  (0, _inherits3.default)(Properties, _Style$CellProperties);

  function Properties() {
    (0, _classCallCheck3.default)(this, Properties);
    return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
  }

  (0, _createClass3.default)(Properties, [{
    key: 'tcBorders',
    value: function tcBorders(x) {
      x.left && (this.style.borderLeft = this._border(x.left));
      x.right && (this.style.borderRight = this._border(x.right));
      x.top && (this.style.borderTop = this._border(x.top));
      x.bottom && (this.style.borderBottom = this._border(x.bottom));
    }
  }, {
    key: 'cnfStyle',
    value: function cnfStyle(x) {
      var names = [],
          PrioritiziedStyles = _table2.default.prototype.PrioritiziedStyles,
          level = -1,
          t;
      for (var i = 0; i < 12; i++) {
        if (x.charAt(i) == '1') {
          names.push(t = _table2.default.TableStyles[i]);
          if ((t = PrioritiziedStyles.indexOf(t)) > level) level = t;
        }
      }
      names.length && Td.addClass(this.parent.content, names.join(' '));
      for (var i = 0; i < level; i++) {
        this.parent.content.setAttribute('x' + i, 1);
      }
    }
  }]);
  return Properties;
}(_table2.default.CellProperties);

Td.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvdGQuanMiXSwibmFtZXMiOlsiVGQiLCJlbCIsImFyZ3VtZW50cyIsInN0eWxlIiwid29yZE1vZGVsIiwiZ2V0RGlyZWN0U3R5bGUiLCJwYXJzZSIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsIkNvbnZlcnRlciIsIngiLCJsZWZ0IiwiYm9yZGVyTGVmdCIsIl9ib3JkZXIiLCJyaWdodCIsImJvcmRlclJpZ2h0IiwidG9wIiwiYm9yZGVyVG9wIiwiYm90dG9tIiwiYm9yZGVyQm90dG9tIiwibmFtZXMiLCJQcmlvcml0aXppZWRTdHlsZXMiLCJTdHlsZSIsInByb3RvdHlwZSIsImxldmVsIiwidCIsImkiLCJjaGFyQXQiLCJwdXNoIiwiVGFibGVTdHlsZXMiLCJpbmRleE9mIiwibGVuZ3RoIiwiYWRkQ2xhc3MiLCJwYXJlbnQiLCJjb250ZW50Iiwiam9pbiIsInNldEF0dHJpYnV0ZSIsIkNlbGxQcm9wZXJ0aWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLEU7Ozs7Ozs7Ozs7aUNBR05DLEUsRUFBRztBQUNkLGtJQUFzQkMsU0FBdEI7QUFDQSxVQUFJQyxRQUFNLEtBQUtDLFNBQUwsQ0FBZUMsY0FBZixFQUFWO0FBQ0FGLGVBQVNBLE1BQU1HLEtBQU4sQ0FBWSxDQUFDLElBQUksS0FBS0MsV0FBTCxDQUFpQkMsVUFBckIsQ0FBZ0NQLEdBQUdFLEtBQW5DLEVBQXlDLElBQXpDLENBQUQsQ0FBWixDQUFUO0FBQ0Q7Ozt3QkFOUTtBQUFDLGFBQU8sSUFBUDtBQUFZOzs7RUFEUU0sbUI7O2tCQUFYVCxFOztJQVdmUSxVOzs7Ozs7Ozs7OzhCQUNNRSxDLEVBQUU7QUFDVkEsUUFBRUMsSUFBRixLQUFXLEtBQUtSLEtBQUwsQ0FBV1MsVUFBWCxHQUFzQixLQUFLQyxPQUFMLENBQWFILEVBQUVDLElBQWYsQ0FBakM7QUFDQUQsUUFBRUksS0FBRixLQUFZLEtBQUtYLEtBQUwsQ0FBV1ksV0FBWCxHQUF1QixLQUFLRixPQUFMLENBQWFILEVBQUVJLEtBQWYsQ0FBbkM7QUFDQUosUUFBRU0sR0FBRixLQUFVLEtBQUtiLEtBQUwsQ0FBV2MsU0FBWCxHQUFxQixLQUFLSixPQUFMLENBQWFILEVBQUVNLEdBQWYsQ0FBL0I7QUFDQU4sUUFBRVEsTUFBRixLQUFhLEtBQUtmLEtBQUwsQ0FBV2dCLFlBQVgsR0FBd0IsS0FBS04sT0FBTCxDQUFhSCxFQUFFUSxNQUFmLENBQXJDO0FBQ0Q7Ozs2QkFDUVIsQyxFQUFFO0FBQ1QsVUFBSVUsUUFBTSxFQUFWO0FBQUEsVUFBY0MscUJBQW1CQyxnQkFBTUMsU0FBTixDQUFnQkYsa0JBQWpEO0FBQUEsVUFBcUVHLFFBQU0sQ0FBQyxDQUE1RTtBQUFBLFVBQStFQyxDQUEvRTtBQUNBLFdBQUksSUFBSUMsSUFBRSxDQUFWLEVBQVlBLElBQUUsRUFBZCxFQUFpQkEsR0FBakIsRUFBcUI7QUFDbkIsWUFBR2hCLEVBQUVpQixNQUFGLENBQVNELENBQVQsS0FBYSxHQUFoQixFQUFvQjtBQUNsQk4sZ0JBQU1RLElBQU4sQ0FBV0gsSUFBRUgsZ0JBQU1PLFdBQU4sQ0FBa0JILENBQWxCLENBQWI7QUFDQSxjQUFHLENBQUNELElBQUVKLG1CQUFtQlMsT0FBbkIsQ0FBMkJMLENBQTNCLENBQUgsSUFBa0NELEtBQXJDLEVBQ0VBLFFBQU1DLENBQU47QUFDSDtBQUNGO0FBQ0RMLFlBQU1XLE1BQU4sSUFBZ0IvQixHQUFHZ0MsUUFBSCxDQUFZLEtBQUtDLE1BQUwsQ0FBWUMsT0FBeEIsRUFBZ0NkLE1BQU1lLElBQU4sQ0FBVyxHQUFYLENBQWhDLENBQWhCO0FBQ0EsV0FBSSxJQUFJVCxJQUFFLENBQVYsRUFBWUEsSUFBRUYsS0FBZCxFQUFvQkUsR0FBcEI7QUFDRSxhQUFLTyxNQUFMLENBQVlDLE9BQVosQ0FBb0JFLFlBQXBCLENBQWlDLE1BQUlWLENBQXJDLEVBQXVDLENBQXZDO0FBREY7QUFFRDs7O0VBbkJzQkosZ0JBQU1lLGM7O0FBc0IvQnJDLEdBQUdRLFVBQUgsR0FBY0EsVUFBZCIsImZpbGUiOiJ0ZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi9jb252ZXJ0ZXInXG5pbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZS90YWJsZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGQgZXh0ZW5kcyBDb252ZXJ0ZXJ7XG4gIGdldCB0YWcoKXtyZXR1cm4gJ3RkJ31cbiAgXG4gIGNvbnZlcnRTdHlsZShlbCl7XG4gICAgc3VwZXIuY29udmVydFN0eWxlKC4uLmFyZ3VtZW50cylcbiAgICB2YXIgc3R5bGU9dGhpcy53b3JkTW9kZWwuZ2V0RGlyZWN0U3R5bGUoKVxuICAgIHN0eWxlICYmIHN0eWxlLnBhcnNlKFtuZXcgdGhpcy5jb25zdHJ1Y3Rvci5Qcm9wZXJ0aWVzKGVsLnN0eWxlLHRoaXMpXSlcbiAgfVxuXG59XG5cbmNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5DZWxsUHJvcGVydGllc3tcbiAgdGNCb3JkZXJzKHgpe1xuICAgIHgubGVmdCAmJiAodGhpcy5zdHlsZS5ib3JkZXJMZWZ0PXRoaXMuX2JvcmRlcih4LmxlZnQpKVxuICAgIHgucmlnaHQgJiYgKHRoaXMuc3R5bGUuYm9yZGVyUmlnaHQ9dGhpcy5fYm9yZGVyKHgucmlnaHQpKVxuICAgIHgudG9wICYmICh0aGlzLnN0eWxlLmJvcmRlclRvcD10aGlzLl9ib3JkZXIoeC50b3ApKVxuICAgIHguYm90dG9tICYmICh0aGlzLnN0eWxlLmJvcmRlckJvdHRvbT10aGlzLl9ib3JkZXIoeC5ib3R0b20pKVxuICB9XG4gIGNuZlN0eWxlKHgpe1xuICAgIHZhciBuYW1lcz1bXSwgUHJpb3JpdGl6aWVkU3R5bGVzPVN0eWxlLnByb3RvdHlwZS5Qcmlvcml0aXppZWRTdHlsZXMsIGxldmVsPS0xLCB0XG4gICAgZm9yKHZhciBpPTA7aTwxMjtpKyspe1xuICAgICAgaWYoeC5jaGFyQXQoaSk9PScxJyl7XG4gICAgICAgIG5hbWVzLnB1c2godD1TdHlsZS5UYWJsZVN0eWxlc1tpXSlcbiAgICAgICAgaWYoKHQ9UHJpb3JpdGl6aWVkU3R5bGVzLmluZGV4T2YodCkpPmxldmVsKVxuICAgICAgICAgIGxldmVsPXRcbiAgICAgIH1cbiAgICB9XG4gICAgbmFtZXMubGVuZ3RoICYmIFRkLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsbmFtZXMuam9pbignICcpKTtcbiAgICBmb3IodmFyIGk9MDtpPGxldmVsO2krKylcbiAgICAgIHRoaXMucGFyZW50LmNvbnRlbnQuc2V0QXR0cmlidXRlKCd4JytpLDEpXG4gIH1cbn1cblxuVGQuUHJvcGVydGllcz1Qcm9wZXJ0aWVzXG4iXX0=