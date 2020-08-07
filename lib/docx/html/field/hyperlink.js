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

var _field = require('./field');

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function uptrim(el) {
  var parent = el.parentNode;
  parent.removeChild(el);
  if (parent.childNodes.length == 0) uptrim(parent);
}

var Hyperlink = function (_Field) {
  (0, _inherits3.default)(Hyperlink, _Field);

  function Hyperlink() {
    (0, _classCallCheck3.default)(this, Hyperlink);
    return (0, _possibleConstructorReturn3.default)(this, (Hyperlink.__proto__ || (0, _getPrototypeOf2.default)(Hyperlink)).apply(this, arguments));
  }

  (0, _createClass3.default)(Hyperlink, [{
    key: 'convert',
    value: function convert(elEnd) {
      var a = this.doc.createElement('a');
      a.href = this.wordModel.getLink();
      elEnd.id = this.doc.uid();

      var current = this.elStart,
          parent = current.parentNode;
      while (!parent.querySelector('#' + elEnd.id)) {
        current = parent;
        parent = current.parentNode;
      }
      parent.insertBefore(a, current);
      while (a.nextSibling) {
        a.appendChild(a.nextSibling);
      }uptrim(this.elStart);
      uptrim(elEnd);
    }
  }]);
  return Hyperlink;
}(_field2.default);

exports.default = Hyperlink;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZmllbGQvaHlwZXJsaW5rLmpzIl0sIm5hbWVzIjpbInVwdHJpbSIsImVsIiwicGFyZW50IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiY2hpbGROb2RlcyIsImxlbmd0aCIsIkh5cGVybGluayIsImVsRW5kIiwiYSIsImRvYyIsImNyZWF0ZUVsZW1lbnQiLCJocmVmIiwid29yZE1vZGVsIiwiZ2V0TGluayIsImlkIiwidWlkIiwiY3VycmVudCIsImVsU3RhcnQiLCJxdWVyeVNlbGVjdG9yIiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCJhcHBlbmRDaGlsZCIsIkZpZWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxTQUFTQSxNQUFULENBQWdCQyxFQUFoQixFQUFtQjtBQUNqQixNQUFJQyxTQUFPRCxHQUFHRSxVQUFkO0FBQ0FELFNBQU9FLFdBQVAsQ0FBbUJILEVBQW5CO0FBQ0EsTUFBR0MsT0FBT0csVUFBUCxDQUFrQkMsTUFBbEIsSUFBMEIsQ0FBN0IsRUFDRU4sT0FBT0UsTUFBUDtBQUNIOztJQUNvQkssUzs7Ozs7Ozs7Ozs0QkFDWEMsSyxFQUFNO0FBQ1osVUFBSUMsSUFBRSxLQUFLQyxHQUFMLENBQVNDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBTjtBQUNBRixRQUFFRyxJQUFGLEdBQU8sS0FBS0MsU0FBTCxDQUFlQyxPQUFmLEVBQVA7QUFDQU4sWUFBTU8sRUFBTixHQUFTLEtBQUtMLEdBQUwsQ0FBU00sR0FBVCxFQUFUOztBQUVBLFVBQUlDLFVBQVEsS0FBS0MsT0FBakI7QUFBQSxVQUEwQmhCLFNBQU9lLFFBQVFkLFVBQXpDO0FBQ0EsYUFBTSxDQUFDRCxPQUFPaUIsYUFBUCxDQUFxQixNQUFJWCxNQUFNTyxFQUEvQixDQUFQLEVBQTBDO0FBQ3hDRSxrQkFBUWYsTUFBUjtBQUNBQSxpQkFBT2UsUUFBUWQsVUFBZjtBQUNEO0FBQ0RELGFBQU9rQixZQUFQLENBQW9CWCxDQUFwQixFQUF1QlEsT0FBdkI7QUFDQSxhQUFNUixFQUFFWSxXQUFSO0FBQ0VaLFVBQUVhLFdBQUYsQ0FBY2IsRUFBRVksV0FBaEI7QUFERixPQUdBckIsT0FBTyxLQUFLa0IsT0FBWjtBQUNBbEIsYUFBT1EsS0FBUDtBQUNEOzs7RUFqQm9DZSxlOztrQkFBbEJoQixTIiwiZmlsZSI6Imh5cGVybGluay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGaWVsZCBmcm9tICcuL2ZpZWxkJ1xuXG5mdW5jdGlvbiB1cHRyaW0oZWwpe1xuICB2YXIgcGFyZW50PWVsLnBhcmVudE5vZGVcbiAgcGFyZW50LnJlbW92ZUNoaWxkKGVsKVxuICBpZihwYXJlbnQuY2hpbGROb2Rlcy5sZW5ndGg9PTApXG4gICAgdXB0cmltKHBhcmVudClcbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh5cGVybGluayBleHRlbmRzIEZpZWxke1xuICBjb252ZXJ0KGVsRW5kKXtcbiAgICB2YXIgYT10aGlzLmRvYy5jcmVhdGVFbGVtZW50KCdhJylcbiAgICBhLmhyZWY9dGhpcy53b3JkTW9kZWwuZ2V0TGluaygpXG4gICAgZWxFbmQuaWQ9dGhpcy5kb2MudWlkKClcbiAgICBcbiAgICB2YXIgY3VycmVudD10aGlzLmVsU3RhcnQsIHBhcmVudD1jdXJyZW50LnBhcmVudE5vZGVcbiAgICB3aGlsZSghcGFyZW50LnF1ZXJ5U2VsZWN0b3IoJyMnK2VsRW5kLmlkKSl7XG4gICAgICBjdXJyZW50PXBhcmVudFxuICAgICAgcGFyZW50PWN1cnJlbnQucGFyZW50Tm9kZVxuICAgIH1cbiAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGEsIGN1cnJlbnQpXG4gICAgd2hpbGUoYS5uZXh0U2libGluZylcbiAgICAgIGEuYXBwZW5kQ2hpbGQoYS5uZXh0U2libGluZylcbiAgICBcbiAgICB1cHRyaW0odGhpcy5lbFN0YXJ0KVxuICAgIHVwdHJpbShlbEVuZClcbiAgfVxufSJdfQ==