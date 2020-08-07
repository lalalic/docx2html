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

var Tr = function (_Converter) {
  (0, _inherits3.default)(Tr, _Converter);

  function Tr() {
    (0, _classCallCheck3.default)(this, Tr);
    return (0, _possibleConstructorReturn3.default)(this, (Tr.__proto__ || (0, _getPrototypeOf2.default)(Tr)).apply(this, arguments));
  }

  (0, _createClass3.default)(Tr, [{
    key: 'convertStyle',
    value: function convertStyle(el) {
      (0, _get3.default)(Tr.prototype.__proto__ || (0, _getPrototypeOf2.default)(Tr.prototype), 'convertStyle', this).apply(this, arguments);
      var style = this.wordModel.getDirectStyle();
      style && style.parse([new this.constructor.Properties(el.style, this)]);
    }
  }, {
    key: 'tag',
    get: function get() {
      return 'tr';
    }
  }]);
  return Tr;
}(_converter2.default);

exports.default = Tr;

var Properties = function (_Style$RowProperties) {
  (0, _inherits3.default)(Properties, _Style$RowProperties);

  function Properties() {
    (0, _classCallCheck3.default)(this, Properties);
    return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
  }

  (0, _createClass3.default)(Properties, [{
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
}(_table2.default.RowProperties);

Tr.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvdHIuanMiXSwibmFtZXMiOlsiVHIiLCJlbCIsImFyZ3VtZW50cyIsInN0eWxlIiwid29yZE1vZGVsIiwiZ2V0RGlyZWN0U3R5bGUiLCJwYXJzZSIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsIkNvbnZlcnRlciIsIngiLCJuYW1lcyIsIlByaW9yaXRpemllZFN0eWxlcyIsIlN0eWxlIiwicHJvdG90eXBlIiwibGV2ZWwiLCJ0IiwiaSIsImNoYXJBdCIsInB1c2giLCJUYWJsZVN0eWxlcyIsImluZGV4T2YiLCJsZW5ndGgiLCJUZCIsImFkZENsYXNzIiwicGFyZW50IiwiY29udGVudCIsImpvaW4iLCJzZXRBdHRyaWJ1dGUiLCJSb3dQcm9wZXJ0aWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLEU7Ozs7Ozs7Ozs7aUNBR05DLEUsRUFBRztBQUNkLGtJQUFzQkMsU0FBdEI7QUFDQSxVQUFJQyxRQUFNLEtBQUtDLFNBQUwsQ0FBZUMsY0FBZixFQUFWO0FBQ0FGLGVBQVNBLE1BQU1HLEtBQU4sQ0FBWSxDQUFDLElBQUksS0FBS0MsV0FBTCxDQUFpQkMsVUFBckIsQ0FBZ0NQLEdBQUdFLEtBQW5DLEVBQTBDLElBQTFDLENBQUQsQ0FBWixDQUFUO0FBQ0Q7Ozt3QkFOUTtBQUFDLGFBQU8sSUFBUDtBQUFZOzs7RUFEUU0sbUI7O2tCQUFYVCxFOztJQVVmUSxVOzs7Ozs7Ozs7OzZCQUNLRSxDLEVBQUU7QUFDVCxVQUFJQyxRQUFNLEVBQVY7QUFBQSxVQUFjQyxxQkFBbUJDLGdCQUFNQyxTQUFOLENBQWdCRixrQkFBakQ7QUFBQSxVQUFxRUcsUUFBTSxDQUFDLENBQTVFO0FBQUEsVUFBK0VDLENBQS9FO0FBQ0EsV0FBSSxJQUFJQyxJQUFFLENBQVYsRUFBWUEsSUFBRSxFQUFkLEVBQWlCQSxHQUFqQixFQUFxQjtBQUNuQixZQUFHUCxFQUFFUSxNQUFGLENBQVNELENBQVQsS0FBYSxHQUFoQixFQUFvQjtBQUNsQk4sZ0JBQU1RLElBQU4sQ0FBV0gsSUFBRUgsZ0JBQU1PLFdBQU4sQ0FBa0JILENBQWxCLENBQWI7QUFDQSxjQUFHLENBQUNELElBQUVKLG1CQUFtQlMsT0FBbkIsQ0FBMkJMLENBQTNCLENBQUgsSUFBa0NELEtBQXJDLEVBQ0VBLFFBQU1DLENBQU47QUFDSDtBQUNGO0FBQ0RMLFlBQU1XLE1BQU4sSUFBZ0JDLEdBQUdDLFFBQUgsQ0FBWSxLQUFLQyxNQUFMLENBQVlDLE9BQXhCLEVBQWdDZixNQUFNZ0IsSUFBTixDQUFXLEdBQVgsQ0FBaEMsQ0FBaEI7QUFDQSxXQUFJLElBQUlWLElBQUUsQ0FBVixFQUFZQSxJQUFFRixLQUFkLEVBQW9CRSxHQUFwQjtBQUNFLGFBQUtRLE1BQUwsQ0FBWUMsT0FBWixDQUFvQkUsWUFBcEIsQ0FBaUMsTUFBSVgsQ0FBckMsRUFBdUMsQ0FBdkM7QUFERjtBQUVEOzs7RUFic0JKLGdCQUFNZ0IsYTs7QUFnQi9CN0IsR0FBR1EsVUFBSCxHQUFjQSxVQUFkIiwiZmlsZSI6InRyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcidcbmltcG9ydCBTdHlsZSBmcm9tICcuL3N0eWxlL3RhYmxlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUciBleHRlbmRzIENvbnZlcnRlcntcbiAgZ2V0IHRhZygpe3JldHVybiAndHInfVxuXG4gIGNvbnZlcnRTdHlsZShlbCl7XG4gICAgc3VwZXIuY29udmVydFN0eWxlKC4uLmFyZ3VtZW50cylcbiAgICB2YXIgc3R5bGU9dGhpcy53b3JkTW9kZWwuZ2V0RGlyZWN0U3R5bGUoKVxuICAgIHN0eWxlICYmIHN0eWxlLnBhcnNlKFtuZXcgdGhpcy5jb25zdHJ1Y3Rvci5Qcm9wZXJ0aWVzKGVsLnN0eWxlLCB0aGlzKV0pXG4gIH1cbn1cblxuY2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlJvd1Byb3BlcnRpZXN7XG4gIGNuZlN0eWxlKHgpe1xuICAgIHZhciBuYW1lcz1bXSwgUHJpb3JpdGl6aWVkU3R5bGVzPVN0eWxlLnByb3RvdHlwZS5Qcmlvcml0aXppZWRTdHlsZXMsIGxldmVsPS0xLCB0XG4gICAgZm9yKHZhciBpPTA7aTwxMjtpKyspe1xuICAgICAgaWYoeC5jaGFyQXQoaSk9PScxJyl7XG4gICAgICAgIG5hbWVzLnB1c2godD1TdHlsZS5UYWJsZVN0eWxlc1tpXSlcbiAgICAgICAgaWYoKHQ9UHJpb3JpdGl6aWVkU3R5bGVzLmluZGV4T2YodCkpPmxldmVsKVxuICAgICAgICAgIGxldmVsPXRcbiAgICAgIH1cbiAgICB9XG4gICAgbmFtZXMubGVuZ3RoICYmIFRkLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsbmFtZXMuam9pbignICcpKTtcbiAgICBmb3IodmFyIGk9MDtpPGxldmVsO2krKylcbiAgICAgIHRoaXMucGFyZW50LmNvbnRlbnQuc2V0QXR0cmlidXRlKCd4JytpLDEpXG4gIH1cbn1cblxuVHIuUHJvcGVydGllcz1Qcm9wZXJ0aWVzIl19