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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Inline = function (_Style) {
  (0, _inherits3.default)(Inline, _Style);

  function Inline() {
    (0, _classCallCheck3.default)(this, Inline);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Inline.__proto__ || (0, _getPrototypeOf2.default)(Inline)).apply(this, arguments));

    _this.style = _this.wordModel.id ? _this.doc.createStyle('.' + _converter2.default.asCssID(_this.wordModel.id)) : _this.doc.createStyle('span');
    _this.inline = new _this.constructor.Properties(_this.style);
    return _this;
  }

  (0, _createClass3.default)(Inline, [{
    key: '_getPropertiesConverter',
    value: function _getPropertiesConverter() {
      return this.inline;
    }
  }]);
  return Inline;
}(_converter2.default);

exports.default = Inline;


Inline.Properties = function (_Style$Properties) {
  (0, _inherits3.default)(Properties, _Style$Properties);

  function Properties() {
    (0, _classCallCheck3.default)(this, Properties);
    return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
  }

  (0, _createClass3.default)(Properties, [{
    key: 'rFonts',
    value: function rFonts(x) {
      x.ascii && (this.style.fontFamily = x.ascii);
    }
  }, {
    key: 'b',
    value: function b(x) {
      this.style.fontWeight = 700;
    }
  }, {
    key: 'sz',
    value: function sz(x) {
      this.style.fontSize = x + 'px';
    }
  }, {
    key: 'color',
    value: function color(x) {
      this.style.color = x;
    }
  }, {
    key: 'i',
    value: function i(x) {
      this.style.fontStyle = 'italics';
    }
  }, {
    key: 'u',
    value: function u(x) {
      this.style.textDecoration = 'underline';
    }
  }, {
    key: 'bdr',
    value: function bdr(x) {
      this.style.border = this._border(x);
    }
  }, {
    key: 'lang',
    value: function lang(x) {}
  }, {
    key: 'vertAlign',
    value: function vertAlign(x) {
      switch (x) {
        case 'superscript':
          this.style.verticalAlign = 'super';
          break;
        case 'subscript':
          this.style.verticalAlign = 'sub';
          break;
      }
    }
  }, {
    key: 'highlight',
    value: function highlight(x) {
      this.style.backgroundColor = x;
    }
  }]);
  return Properties;
}(_converter2.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvaW5saW5lLmpzIl0sIm5hbWVzIjpbIklubGluZSIsImFyZ3VtZW50cyIsInN0eWxlIiwid29yZE1vZGVsIiwiaWQiLCJkb2MiLCJjcmVhdGVTdHlsZSIsIlN0eWxlIiwiYXNDc3NJRCIsImlubGluZSIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsIngiLCJhc2NpaSIsImZvbnRGYW1pbHkiLCJmb250V2VpZ2h0IiwiZm9udFNpemUiLCJjb2xvciIsImZvbnRTdHlsZSIsInRleHREZWNvcmF0aW9uIiwiYm9yZGVyIiwiX2JvcmRlciIsInZlcnRpY2FsQWxpZ24iLCJiYWNrZ3JvdW5kQ29sb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVxQkEsTTs7O0FBQ25CLG9CQUFhO0FBQUE7O0FBQUEsdUlBQ0ZDLFNBREU7O0FBRVgsVUFBS0MsS0FBTCxHQUFXLE1BQUtDLFNBQUwsQ0FBZUMsRUFBZixHQUFvQixNQUFLQyxHQUFMLENBQVNDLFdBQVQsQ0FBcUIsTUFBSUMsb0JBQU1DLE9BQU4sQ0FBYyxNQUFLTCxTQUFMLENBQWVDLEVBQTdCLENBQXpCLENBQXBCLEdBQWlGLE1BQUtDLEdBQUwsQ0FBU0MsV0FBVCxDQUFxQixNQUFyQixDQUE1RjtBQUNBLFVBQUtHLE1BQUwsR0FBWSxJQUFJLE1BQUtDLFdBQUwsQ0FBaUJDLFVBQXJCLENBQWdDLE1BQUtULEtBQXJDLENBQVo7QUFIVztBQUlaOzs7OzhDQUN3QjtBQUN2QixhQUFPLEtBQUtPLE1BQVo7QUFDRDs7O0VBUmlDRixtQjs7a0JBQWZQLE07OztBQVdyQkEsT0FBT1csVUFBUDtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSwyQkFDU0MsQ0FEVCxFQUNXO0FBQ1BBLFFBQUVDLEtBQUYsS0FBWSxLQUFLWCxLQUFMLENBQVdZLFVBQVgsR0FBc0JGLEVBQUVDLEtBQXBDO0FBQ0Q7QUFISDtBQUFBO0FBQUEsc0JBSUlELENBSkosRUFJTTtBQUNGLFdBQUtWLEtBQUwsQ0FBV2EsVUFBWCxHQUFzQixHQUF0QjtBQUNEO0FBTkg7QUFBQTtBQUFBLHVCQU9LSCxDQVBMLEVBT087QUFDSCxXQUFLVixLQUFMLENBQVdjLFFBQVgsR0FBb0JKLElBQUUsSUFBdEI7QUFDRDtBQVRIO0FBQUE7QUFBQSwwQkFVUUEsQ0FWUixFQVVVO0FBQ04sV0FBS1YsS0FBTCxDQUFXZSxLQUFYLEdBQWlCTCxDQUFqQjtBQUNEO0FBWkg7QUFBQTtBQUFBLHNCQWFJQSxDQWJKLEVBYU07QUFDRixXQUFLVixLQUFMLENBQVdnQixTQUFYLEdBQXFCLFNBQXJCO0FBQ0Q7QUFmSDtBQUFBO0FBQUEsc0JBZ0JJTixDQWhCSixFQWdCTTtBQUNGLFdBQUtWLEtBQUwsQ0FBV2lCLGNBQVgsR0FBMEIsV0FBMUI7QUFDRDtBQWxCSDtBQUFBO0FBQUEsd0JBbUJNUCxDQW5CTixFQW1CUTtBQUNKLFdBQUtWLEtBQUwsQ0FBV2tCLE1BQVgsR0FBa0IsS0FBS0MsT0FBTCxDQUFhVCxDQUFiLENBQWxCO0FBQ0Q7QUFyQkg7QUFBQTtBQUFBLHlCQXNCT0EsQ0F0QlAsRUFzQlMsQ0FFTjtBQXhCSDtBQUFBO0FBQUEsOEJBeUJZQSxDQXpCWixFQXlCYztBQUNWLGNBQU9BLENBQVA7QUFDQSxhQUFLLGFBQUw7QUFDRSxlQUFLVixLQUFMLENBQVdvQixhQUFYLEdBQXlCLE9BQXpCO0FBQ0Y7QUFDQSxhQUFLLFdBQUw7QUFDRSxlQUFLcEIsS0FBTCxDQUFXb0IsYUFBWCxHQUF5QixLQUF6QjtBQUNGO0FBTkE7QUFRRDtBQWxDSDtBQUFBO0FBQUEsOEJBbUNZVixDQW5DWixFQW1DYztBQUNWLFdBQUtWLEtBQUwsQ0FBV3FCLGVBQVgsR0FBMkJYLENBQTNCO0FBQ0Q7QUFyQ0g7QUFBQTtBQUFBLEVBQTJDTCxvQkFBTUksVUFBakQiLCJmaWxlIjoiaW5saW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4vY29udmVydGVyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5saW5lIGV4dGVuZHMgU3R5bGV7XHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcclxuICAgIHRoaXMuc3R5bGU9dGhpcy53b3JkTW9kZWwuaWQgPyB0aGlzLmRvYy5jcmVhdGVTdHlsZSgnLicrU3R5bGUuYXNDc3NJRCh0aGlzLndvcmRNb2RlbC5pZCkpIDogdGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3NwYW4nKVxyXG4gICAgdGhpcy5pbmxpbmU9bmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyh0aGlzLnN0eWxlKVxyXG4gIH1cclxuICBfZ2V0UHJvcGVydGllc0NvbnZlcnRlcigpe1xyXG4gICAgcmV0dXJuIHRoaXMuaW5saW5lXHJcbiAgfVxyXG59XHJcblxyXG5JbmxpbmUuUHJvcGVydGllcz1jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcclxuICByRm9udHMoeCl7XHJcbiAgICB4LmFzY2lpICYmICh0aGlzLnN0eWxlLmZvbnRGYW1pbHk9eC5hc2NpaSlcclxuICB9XHJcbiAgYih4KXtcclxuICAgIHRoaXMuc3R5bGUuZm9udFdlaWdodD03MDBcclxuICB9XHJcbiAgc3ooeCl7XHJcbiAgICB0aGlzLnN0eWxlLmZvbnRTaXplPXgrJ3B4J1xyXG4gIH1cclxuICBjb2xvcih4KXtcclxuICAgIHRoaXMuc3R5bGUuY29sb3I9eFxyXG4gIH1cclxuICBpKHgpe1xyXG4gICAgdGhpcy5zdHlsZS5mb250U3R5bGU9J2l0YWxpY3MnXHJcbiAgfVxyXG4gIHUoeCl7XHJcbiAgICB0aGlzLnN0eWxlLnRleHREZWNvcmF0aW9uPSd1bmRlcmxpbmUnXHJcbiAgfVxyXG4gIGJkcih4KXtcclxuICAgIHRoaXMuc3R5bGUuYm9yZGVyPXRoaXMuX2JvcmRlcih4KVxyXG4gIH1cclxuICBsYW5nKHgpe1xyXG4gICAgXHJcbiAgfVxyXG4gIHZlcnRBbGlnbih4KXtcclxuICAgIHN3aXRjaCh4KXtcclxuICAgIGNhc2UgJ3N1cGVyc2NyaXB0JzpcclxuICAgICAgdGhpcy5zdHlsZS52ZXJ0aWNhbEFsaWduPSdzdXBlcidcclxuICAgIGJyZWFrXHJcbiAgICBjYXNlICdzdWJzY3JpcHQnOlxyXG4gICAgICB0aGlzLnN0eWxlLnZlcnRpY2FsQWxpZ249J3N1YidcclxuICAgIGJyZWFrXHJcbiAgICB9XHJcbiAgfVxyXG4gIGhpZ2hsaWdodCh4KXtcclxuICAgIHRoaXMuc3R5bGUuYmFja2dyb3VuZENvbG9yPXhcclxuICB9XHJcbn0iXX0=