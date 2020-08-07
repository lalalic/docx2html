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

var FieldBegin = function (_Converter) {
  (0, _inherits3.default)(FieldBegin, _Converter);

  function FieldBegin() {
    (0, _classCallCheck3.default)(this, FieldBegin);
    return (0, _possibleConstructorReturn3.default)(this, (FieldBegin.__proto__ || (0, _getPrototypeOf2.default)(FieldBegin)).apply(this, arguments));
  }

  (0, _createClass3.default)(FieldBegin, [{
    key: 'convert',
    value: function convert(wordField, endConverter) {
      if (!wordField) return (0, _get3.default)(FieldBegin.prototype.__proto__ || (0, _getPrototypeOf2.default)(FieldBegin.prototype), 'convert', this).apply(this, arguments);
      var converter = this.constructor.factory(wordField, this);
      converter && converter.convert(endConverter && endConverter.content);
    }
  }, {
    key: 'tag',
    get: function get() {
      return 'span';
    }
  }], [{
    key: 'factory',
    value: function factory(wordField, parent) {
      try {
        var Model = require('./factory')[wordField.type];
        return new Model(wordField, parent);
      } catch (e) {}
    }
  }]);
  return FieldBegin;
}(_converter2.default);

exports.default = FieldBegin;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZmllbGRCZWdpbi5qcyJdLCJuYW1lcyI6WyJGaWVsZEJlZ2luIiwid29yZEZpZWxkIiwiZW5kQ29udmVydGVyIiwiYXJndW1lbnRzIiwiY29udmVydGVyIiwiY29uc3RydWN0b3IiLCJmYWN0b3J5IiwiY29udmVydCIsImNvbnRlbnQiLCJwYXJlbnQiLCJNb2RlbCIsInJlcXVpcmUiLCJ0eXBlIiwiZSIsIkNvbnZlcnRlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs0QkFHWEMsUyxFQUFXQyxZLEVBQWE7QUFDOUIsVUFBRyxDQUFDRCxTQUFKLEVBQ0UsOElBQXdCRSxTQUF4QjtBQUNGLFVBQUlDLFlBQVUsS0FBS0MsV0FBTCxDQUFpQkMsT0FBakIsQ0FBeUJMLFNBQXpCLEVBQW9DLElBQXBDLENBQWQ7QUFDQUcsbUJBQWFBLFVBQVVHLE9BQVYsQ0FBa0JMLGdCQUFnQkEsYUFBYU0sT0FBL0MsQ0FBYjtBQUNEOzs7d0JBUFE7QUFBQyxhQUFPLE1BQVA7QUFBYzs7OzRCQVNUUCxTLEVBQVdRLE0sRUFBTztBQUMvQixVQUFHO0FBQ0QsWUFBSUMsUUFBTUMsUUFBUSxXQUFSLEVBQXFCVixVQUFVVyxJQUEvQixDQUFWO0FBQ0EsZUFBTyxJQUFJRixLQUFKLENBQVVULFNBQVYsRUFBcUJRLE1BQXJCLENBQVA7QUFDRCxPQUhELENBR0MsT0FBTUksQ0FBTixFQUFRLENBQ1I7QUFDRjs7O0VBaEJxQ0MsbUI7O2tCQUFuQmQsVSIsImZpbGUiOiJmaWVsZEJlZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcicgXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpZWxkQmVnaW4gZXh0ZW5kcyBDb252ZXJ0ZXJ7XG4gIGdldCB0YWcoKXtyZXR1cm4gJ3NwYW4nfVxuICBcbiAgY29udmVydCh3b3JkRmllbGQsIGVuZENvbnZlcnRlcil7XG4gICAgaWYoIXdvcmRGaWVsZClcbiAgICAgIHJldHVybiBzdXBlci5jb252ZXJ0KC4uLmFyZ3VtZW50cylcbiAgICB2YXIgY29udmVydGVyPXRoaXMuY29uc3RydWN0b3IuZmFjdG9yeSh3b3JkRmllbGQsIHRoaXMpXG4gICAgY29udmVydGVyICYmIGNvbnZlcnRlci5jb252ZXJ0KGVuZENvbnZlcnRlciAmJiBlbmRDb252ZXJ0ZXIuY29udGVudClcbiAgfVxuICBcbiAgc3RhdGljIGZhY3Rvcnkod29yZEZpZWxkLCBwYXJlbnQpe1xuICAgIHRyeXtcbiAgICAgIHZhciBNb2RlbD1yZXF1aXJlKCcuL2ZhY3RvcnknKVt3b3JkRmllbGQudHlwZV1cbiAgICAgIHJldHVybiBuZXcgTW9kZWwod29yZEZpZWxkLCBwYXJlbnQpXG4gICAgfWNhdGNoKGUpe1xuICAgIH1cbiAgfVxufSJdfQ==