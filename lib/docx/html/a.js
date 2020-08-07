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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var A = function (_Converter) {
  (0, _inherits3.default)(A, _Converter);

  function A() {
    (0, _classCallCheck3.default)(this, A);
    return (0, _possibleConstructorReturn3.default)(this, (A.__proto__ || (0, _getPrototypeOf2.default)(A)).apply(this, arguments));
  }

  (0, _createClass3.default)(A, [{
    key: 'convert',
    value: function convert() {
      (0, _get3.default)(A.prototype.__proto__ || (0, _getPrototypeOf2.default)(A.prototype), 'convert', this).apply(this, arguments);
      var link = this.wordModel.getLink();
      link && (this.content.href = link);
    }
  }, {
    key: 'tag',
    get: function get() {
      return 'a';
    }
  }]);
  return A;
}(_converter2.default);

exports.default = A;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvYS5qcyJdLCJuYW1lcyI6WyJBIiwiYXJndW1lbnRzIiwibGluayIsIndvcmRNb2RlbCIsImdldExpbmsiLCJjb250ZW50IiwiaHJlZiIsIkNvbnZlcnRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsQzs7Ozs7Ozs7Ozs4QkFHVjtBQUNQLDJIQUFpQkMsU0FBakI7QUFDQSxVQUFJQyxPQUFLLEtBQUtDLFNBQUwsQ0FBZUMsT0FBZixFQUFUO0FBQ0FGLGVBQVMsS0FBS0csT0FBTCxDQUFhQyxJQUFiLEdBQWtCSixJQUEzQjtBQUNEOzs7d0JBTlE7QUFBQyxhQUFPLEdBQVA7QUFBVzs7O0VBRFFLLG1COztrQkFBVlAsQyIsImZpbGUiOiJhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQSBleHRlbmRzIENvbnZlcnRlcntcbiAgZ2V0IHRhZygpe3JldHVybiAnYSd9XG4gIFxuICBjb252ZXJ0KCl7XG4gICAgc3VwZXIuY29udmVydCguLi5hcmd1bWVudHMpXG4gICAgdmFyIGxpbms9dGhpcy53b3JkTW9kZWwuZ2V0TGluaygpO1xuICAgIGxpbmsgJiYgKHRoaXMuY29udGVudC5ocmVmPWxpbmspXG4gIH1cblxufSJdfQ==