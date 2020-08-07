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

var Table = function (_Converter) {
  (0, _inherits3.default)(Table, _Converter);

  function Table() {
    (0, _classCallCheck3.default)(this, Table);
    return (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).apply(this, arguments));
  }

  (0, _createClass3.default)(Table, [{
    key: 'convertStyle',
    value: function convertStyle(el) {
      (0, _get3.default)(Table.prototype.__proto__ || (0, _getPrototypeOf2.default)(Table.prototype), 'convertStyle', this).apply(this, arguments);
      var width = this.wordModel.getColWidth(),
          html = ['<colgroup>'];
      for (var i = 0, cols = width.cols, sum = width.sum, len = cols.length; i < len; i++) {
        html.push('<col style="width:' + cols[i] * 100 / sum + '%"/>');
      }html.push('</colgroup>');
      el.innerHTML = html.join('');
      var style = this.wordModel.getDirectStyle();
      style && style.parse([new this.constructor.Properties(el.style, this)]);
      var tbody = this.doc.createElement('tbody');
      this.content.appendChild(tbody);
      this.content = tbody;
    }
  }, {
    key: 'getTableSelector',
    value: function getTableSelector() {
      var selector = '#' + (this.content.id ? this.content.id : this.content.id = this.doc.uid()),
          level = _table2.default.prototype.PrioritiziedStyles.length;
      for (var i = 0; i < level; i++) {
        this.content.setAttribute('x' + i, 1);
        selector += '[x' + i + ']';
      }
      return selector + ">tbody";
    }
  }, {
    key: 'tag',
    get: function get() {
      return 'table';
    }
  }]);
  return Table;
}(_converter2.default);

exports.default = Table;


Table.Properties = function (_Style$Properties) {
  (0, _inherits3.default)(Properties, _Style$Properties);

  function Properties() {
    (0, _classCallCheck3.default)(this, Properties);
    return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
  }

  return Properties;
}(_table2.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvdGFibGUuanMiXSwibmFtZXMiOlsiVGFibGUiLCJlbCIsImFyZ3VtZW50cyIsIndpZHRoIiwid29yZE1vZGVsIiwiZ2V0Q29sV2lkdGgiLCJodG1sIiwiaSIsImNvbHMiLCJzdW0iLCJsZW4iLCJsZW5ndGgiLCJwdXNoIiwiaW5uZXJIVE1MIiwiam9pbiIsInN0eWxlIiwiZ2V0RGlyZWN0U3R5bGUiLCJwYXJzZSIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsInRib2R5IiwiZG9jIiwiY3JlYXRlRWxlbWVudCIsImNvbnRlbnQiLCJhcHBlbmRDaGlsZCIsInNlbGVjdG9yIiwiaWQiLCJ1aWQiLCJsZXZlbCIsIlN0eWxlIiwicHJvdG90eXBlIiwiUHJpb3JpdGl6aWVkU3R5bGVzIiwic2V0QXR0cmlidXRlIiwiQ29udmVydGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7aUNBR05DLEUsRUFBRztBQUNkLHdJQUFzQkMsU0FBdEI7QUFDQSxVQUFJQyxRQUFNLEtBQUtDLFNBQUwsQ0FBZUMsV0FBZixFQUFWO0FBQUEsVUFBd0NDLE9BQUssQ0FBQyxZQUFELENBQTdDO0FBQ0EsV0FBSSxJQUFJQyxJQUFFLENBQU4sRUFBUUMsT0FBS0wsTUFBTUssSUFBbkIsRUFBd0JDLE1BQUlOLE1BQU1NLEdBQWxDLEVBQXNDQyxNQUFJRixLQUFLRyxNQUFuRCxFQUEwREosSUFBRUcsR0FBNUQsRUFBZ0VILEdBQWhFO0FBQ0VELGFBQUtNLElBQUwsQ0FBVSx1QkFBc0JKLEtBQUtELENBQUwsSUFBUSxHQUFSLEdBQVlFLEdBQWxDLEdBQXVDLE1BQWpEO0FBREYsT0FFQUgsS0FBS00sSUFBTCxDQUFVLGFBQVY7QUFDQVgsU0FBR1ksU0FBSCxHQUFhUCxLQUFLUSxJQUFMLENBQVUsRUFBVixDQUFiO0FBQ0EsVUFBSUMsUUFBTSxLQUFLWCxTQUFMLENBQWVZLGNBQWYsRUFBVjtBQUNBRCxlQUFTQSxNQUFNRSxLQUFOLENBQVksQ0FBQyxJQUFJLEtBQUtDLFdBQUwsQ0FBaUJDLFVBQXJCLENBQWdDbEIsR0FBR2MsS0FBbkMsRUFBMEMsSUFBMUMsQ0FBRCxDQUFaLENBQVQ7QUFDQSxVQUFJSyxRQUFNLEtBQUtDLEdBQUwsQ0FBU0MsYUFBVCxDQUF1QixPQUF2QixDQUFWO0FBQ0EsV0FBS0MsT0FBTCxDQUFhQyxXQUFiLENBQXlCSixLQUF6QjtBQUNBLFdBQUtHLE9BQUwsR0FBYUgsS0FBYjtBQUNEOzs7dUNBRWlCO0FBQ2hCLFVBQUlLLFdBQVMsT0FBSyxLQUFLRixPQUFMLENBQWFHLEVBQWIsR0FBa0IsS0FBS0gsT0FBTCxDQUFhRyxFQUEvQixHQUFxQyxLQUFLSCxPQUFMLENBQWFHLEVBQWIsR0FBZ0IsS0FBS0wsR0FBTCxDQUFTTSxHQUFULEVBQTFELENBQWI7QUFBQSxVQUNFQyxRQUFNQyxnQkFBTUMsU0FBTixDQUFnQkMsa0JBQWhCLENBQW1DcEIsTUFEM0M7QUFFQSxXQUFJLElBQUlKLElBQUUsQ0FBVixFQUFZQSxJQUFFcUIsS0FBZCxFQUFvQnJCLEdBQXBCLEVBQXdCO0FBQ3RCLGFBQUtnQixPQUFMLENBQWFTLFlBQWIsQ0FBMEIsTUFBSXpCLENBQTlCLEVBQWdDLENBQWhDO0FBQ0FrQixvQkFBVyxPQUFLbEIsQ0FBTCxHQUFPLEdBQWxCO0FBQ0Q7QUFDRCxhQUFPa0IsV0FBUyxRQUFoQjtBQUNEOzs7d0JBeEJRO0FBQUMsYUFBTyxPQUFQO0FBQWU7OztFQURRUSxtQjs7a0JBQWRqQyxLOzs7QUE0QnJCQSxNQUFNbUIsVUFBTjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsRUFBMENVLGdCQUFNVixVQUFoRCIsImZpbGUiOiJ0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi9jb252ZXJ0ZXInXG5pbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZS90YWJsZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBDb252ZXJ0ZXJ7XG4gIGdldCB0YWcoKXtyZXR1cm4gJ3RhYmxlJ31cblxuICBjb252ZXJ0U3R5bGUoZWwpe1xuICAgIHN1cGVyLmNvbnZlcnRTdHlsZSguLi5hcmd1bWVudHMpXG4gICAgdmFyIHdpZHRoPXRoaXMud29yZE1vZGVsLmdldENvbFdpZHRoKCksIGh0bWw9Wyc8Y29sZ3JvdXA+J11cbiAgICBmb3IodmFyIGk9MCxjb2xzPXdpZHRoLmNvbHMsc3VtPXdpZHRoLnN1bSxsZW49Y29scy5sZW5ndGg7aTxsZW47aSsrKVxuICAgICAgaHRtbC5wdXNoKCc8Y29sIHN0eWxlPVwid2lkdGg6JysoY29sc1tpXSoxMDAvc3VtKSsnJVwiLz4nKVxuICAgIGh0bWwucHVzaCgnPC9jb2xncm91cD4nKVxuICAgIGVsLmlubmVySFRNTD1odG1sLmpvaW4oJycpXG4gICAgdmFyIHN0eWxlPXRoaXMud29yZE1vZGVsLmdldERpcmVjdFN0eWxlKClcbiAgICBzdHlsZSAmJiBzdHlsZS5wYXJzZShbbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyhlbC5zdHlsZSwgdGhpcyldKVxuICAgIHZhciB0Ym9keT10aGlzLmRvYy5jcmVhdGVFbGVtZW50KCd0Ym9keScpXG4gICAgdGhpcy5jb250ZW50LmFwcGVuZENoaWxkKHRib2R5KVxuICAgIHRoaXMuY29udGVudD10Ym9keVxuICB9XG4gIFxuICBnZXRUYWJsZVNlbGVjdG9yKCl7XG4gICAgdmFyIHNlbGVjdG9yPScjJysodGhpcy5jb250ZW50LmlkID8gdGhpcy5jb250ZW50LmlkIDogKHRoaXMuY29udGVudC5pZD10aGlzLmRvYy51aWQoKSkpLFxuICAgICAgbGV2ZWw9U3R5bGUucHJvdG90eXBlLlByaW9yaXRpemllZFN0eWxlcy5sZW5ndGg7XG4gICAgZm9yKHZhciBpPTA7aTxsZXZlbDtpKyspe1xuICAgICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZSgneCcraSwxKVxuICAgICAgc2VsZWN0b3IrPSgnW3gnK2krJ10nKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0b3IrXCI+dGJvZHlcIlxuICB9XG59XG5cblRhYmxlLlByb3BlcnRpZXM9Y2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG4gIFxufSJdfQ==