'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _converter = require('../converter');

var _converter2 = _interopRequireDefault(_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Lines = 'dotted,dashed,inset,outset,solid'.split();
var browsers = ',-webkit-,-moz-'.split(','),
    cssID = _converter2.default.asCssID;

var StyleConverter = function (_Converter) {
  (0, _inherits3.default)(StyleConverter, _Converter);

  function StyleConverter() {
    (0, _classCallCheck3.default)(this, StyleConverter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (StyleConverter.__proto__ || (0, _getPrototypeOf2.default)(StyleConverter)).apply(this, arguments));

    var parentStyle = _this.wordModel.getParentStyle();
    parentStyle && _this.doc.stylePath(cssID(_this.wordModel.id), cssID(parentStyle.id));
    return _this;
  }

  (0, _createClass3.default)(StyleConverter, [{
    key: 'convert',
    value: function convert(value, name, category) {
      var converter = this._getPropertiesConverter(category);
      converter && converter[name] && converter[name](value);
    }
  }, {
    key: '_getPropertiesConverter',
    value: function _getPropertiesConverter() {}
  }]);
  return StyleConverter;
}(_converter2.default);

exports.default = StyleConverter;


StyleConverter.Properties = function () {
  function Properties(style, parent) {
    (0, _classCallCheck3.default)(this, Properties);

    this.style = style;
    this.parent = parent;
    parent && (this.doc = parent.doc);
  }

  (0, _createClass3.default)(Properties, [{
    key: 'visit',
    value: function visit() {
      this.convert.apply(this, arguments);
    }
  }, {
    key: 'convert',
    value: function convert(value, name) {
      this[name] && this[name](value);
    }
  }, {
    key: '_border',
    value: function _border(border) {
      if (border.val == 'none' || border.val == 'nil') return '0';else return (border.sz < 1 && border.sz > 0 ? 1 : border.sz) + 'pt ' + (Lines.indexOf(border.val.toLowerCase()) != -1 ? border.val : 'solid') + ' ' + (border.color || '');
    }
  }, {
    key: 'equalObj',
    value: function equalObj(a, b) {
      var keys = (0, _keys2.default)(a);
      if (!b || keys.length != (0, _keys2.default)(b).length) return false;
      if (keys.length != 0) {
        for (var i = 0, len = keys.length; i < len; i++) {
          if (a[keys[i]] != b[keys[i]]) return false;
        }
      }

      for (var i = 2, len = arguments.length; i < len; i++) {
        if (!this.equalObj(a, arguments[i])) return false;
      }return true;
    }
  }, {
    key: 'upperFirst',
    value: function upperFirst(type) {
      return type[0].toUpperCase() + type.slice(1);
    }
  }, {
    key: 'styless',
    value: function styless(name, value, style) {
      browsers.forEach(function (a) {
        this[a + name] = value;
      }.bind(style || this.style));
    }
  }, {
    key: 'lineStyle',
    value: function lineStyle(x) {
      if (!x) return 'solid';
      x = x.toLowerCase();
      if (x.indexOf('dot') != -1) return 'dotted';else if (x.indexOf('dash') != -1) return 'dashed';else if (x.indexOf('double') != -1 || x.indexOf('gap') != -1) return 'double';else if (x.indexOf('emboss') != -1) return 'ridge';else if (x.indexOf('grave') != -1) return 'groove';else if (x.indexOf('outset') != -1) return 'outset';else if (x.indexOf('inset') != -1) return 'inset';else return 'solid';
    }
  }]);
  return Properties;
}();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvY29udmVydGVyLmpzIl0sIm5hbWVzIjpbIkxpbmVzIiwic3BsaXQiLCJicm93c2VycyIsImNzc0lEIiwiQ29udmVydGVyIiwiYXNDc3NJRCIsIlN0eWxlQ29udmVydGVyIiwiYXJndW1lbnRzIiwicGFyZW50U3R5bGUiLCJ3b3JkTW9kZWwiLCJnZXRQYXJlbnRTdHlsZSIsImRvYyIsInN0eWxlUGF0aCIsImlkIiwidmFsdWUiLCJuYW1lIiwiY2F0ZWdvcnkiLCJjb252ZXJ0ZXIiLCJfZ2V0UHJvcGVydGllc0NvbnZlcnRlciIsIlByb3BlcnRpZXMiLCJzdHlsZSIsInBhcmVudCIsImNvbnZlcnQiLCJib3JkZXIiLCJ2YWwiLCJzeiIsImluZGV4T2YiLCJ0b0xvd2VyQ2FzZSIsImNvbG9yIiwiYSIsImIiLCJrZXlzIiwibGVuZ3RoIiwiaSIsImxlbiIsImVxdWFsT2JqIiwidHlwZSIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJmb3JFYWNoIiwiYmluZCIsIngiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFJQSxRQUFNLG1DQUFtQ0MsS0FBbkMsRUFBVjtBQUNBLElBQUlDLFdBQVMsa0JBQWtCRCxLQUFsQixDQUF3QixHQUF4QixDQUFiO0FBQUEsSUFBMkNFLFFBQU1DLG9CQUFVQyxPQUEzRDs7SUFFcUJDLGM7OztBQUNuQiw0QkFBYTtBQUFBOztBQUFBLHVKQUNGQyxTQURFOztBQUVYLFFBQUlDLGNBQVksTUFBS0MsU0FBTCxDQUFlQyxjQUFmLEVBQWhCO0FBQ0FGLG1CQUFlLE1BQUtHLEdBQUwsQ0FBU0MsU0FBVCxDQUFtQlQsTUFBTSxNQUFLTSxTQUFMLENBQWVJLEVBQXJCLENBQW5CLEVBQTZDVixNQUFNSyxZQUFZSyxFQUFsQixDQUE3QyxDQUFmO0FBSFc7QUFJWjs7Ozs0QkFDT0MsSyxFQUFNQyxJLEVBQUtDLFEsRUFBUztBQUMx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O0FBQ0ZBLFVBQUVBLEVBQUVkLFdBQUYsRUFBRjtBQUNBLFVBQUdjLEVBQUVmLE9BQUYsQ0FBVSxLQUFWLEtBQWtCLENBQUMsQ0FBdEIsRUFDRSxPQUFPLFFBQVAsQ0FERixLQUVLLElBQUdlLEVBQUVmLE9BQUYsQ0FBVSxNQUFWLEtBQW1CLENBQUMsQ0FBdkIsRUFDSCxPQUFPLFFBQVAsQ0FERyxLQUVBLElBQUdlLEVBQUVmLE9BQUYsQ0FBVSxRQUFWLEtBQXFCLENBQUMsQ0FBdEIsSUFBMkJlLEVBQUVmLE9BQUYsQ0FBVSxLQUFWLEtBQWtCLENBQUMsQ0FBakQsRUFDSCxPQUFPLFFBQVAsQ0FERyxLQUVBLElBQUdlLEVBQUVmLE9BQUYsQ0FBVSxRQUFWLEtBQXFCLENBQUMsQ0FBekIsRUFDSCxPQUFPLE9BQVAsQ0FERyxLQUVBLElBQUdlLEVBQUVmLE9BQUYsQ0FBVSxPQUFWLEtBQW9CLENBQUMsQ0FBeEIsRUFDSCxPQUFPLFFBQVAsQ0FERyxLQUVBLElBQUdlLEVBQUVmLE9BQUYsQ0FBVSxRQUFWLEtBQXFCLENBQUMsQ0FBekIsRUFDSCxPQUFPLFFBQVAsQ0FERyxLQUVBLElBQUdlLEVBQUVmLE9BQUYsQ0FBVSxPQUFWLEtBQW9CLENBQUMsQ0FBeEIsRUFDSCxPQUFPLE9BQVAsQ0FERyxLQUdILE9BQU8sT0FBUDtBQUNIO0FBaEVIO0FBQUE7QUFBQSIsImZpbGUiOiJjb252ZXJ0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4uL2NvbnZlcnRlcidcblxudmFyIExpbmVzPSdkb3R0ZWQsZGFzaGVkLGluc2V0LG91dHNldCxzb2xpZCcuc3BsaXQoKVxudmFyIGJyb3dzZXJzPScsLXdlYmtpdC0sLW1vei0nLnNwbGl0KCcsJyksIGNzc0lEPUNvbnZlcnRlci5hc0Nzc0lEO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdHlsZUNvbnZlcnRlciBleHRlbmRzIENvbnZlcnRlcntcbiAgY29uc3RydWN0b3IoKXtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpXG4gICAgdmFyIHBhcmVudFN0eWxlPXRoaXMud29yZE1vZGVsLmdldFBhcmVudFN0eWxlKCk7XG4gICAgcGFyZW50U3R5bGUgJiYgdGhpcy5kb2Muc3R5bGVQYXRoKGNzc0lEKHRoaXMud29yZE1vZGVsLmlkKSwgY3NzSUQocGFyZW50U3R5bGUuaWQpKVxuICB9XG4gIGNvbnZlcnQodmFsdWUsbmFtZSxjYXRlZ29yeSl7XG4gICAgdmFyIGNvbnZlcnRlcj10aGlzLl9nZXRQcm9wZXJ0aWVzQ29udmVydGVyKGNhdGVnb3J5KTtcbiAgICBjb252ZXJ0ZXIgJiYgY29udmVydGVyW25hbWVdICYmIGNvbnZlcnRlcltuYW1lXSh2YWx1ZSlcbiAgfVxuICBfZ2V0UHJvcGVydGllc0NvbnZlcnRlcigpe1xuICAgIFxuICB9XG59XG5cblN0eWxlQ29udmVydGVyLlByb3BlcnRpZXM9Y2xhc3MgUHJvcGVydGllc3tcbiAgY29uc3RydWN0b3Ioc3R5bGUscGFyZW50KXtcbiAgICB0aGlzLnN0eWxlPXN0eWxlXG4gICAgdGhpcy5wYXJlbnQ9cGFyZW50XG4gICAgcGFyZW50ICYmICh0aGlzLmRvYz1wYXJlbnQuZG9jKVxuICB9XG4gIHZpc2l0KCl7XG4gICAgdGhpcy5jb252ZXJ0KC4uLmFyZ3VtZW50cylcbiAgfVxuICBcbiAgY29udmVydCh2YWx1ZSwgbmFtZSl7XG4gICAgdGhpc1tuYW1lXSAmJiB0aGlzW25hbWVdKHZhbHVlKVxuICB9XG4gIFxuICBfYm9yZGVyKGJvcmRlcil7XG4gICAgaWYoYm9yZGVyLnZhbD09J25vbmUnIHx8IGJvcmRlci52YWw9PSduaWwnKVxuICAgICAgcmV0dXJuICcwJ1xuICAgIGVsc2VcbiAgICAgIHJldHVybiAoYm9yZGVyLnN6PDEgJiYgYm9yZGVyLnN6PjAgPyAxIDogYm9yZGVyLnN6KSsncHQgJysoTGluZXMuaW5kZXhPZihib3JkZXIudmFsLnRvTG93ZXJDYXNlKCkpIT0tMSA/IGJvcmRlci52YWwgOiAnc29saWQnKSsnICcrKGJvcmRlci5jb2xvcnx8JycpXG4gIH1cbiAgZXF1YWxPYmooYSxiKXtcbiAgICB2YXIga2V5cz1PYmplY3Qua2V5cyhhKVxuICAgIGlmKCFiIHx8IGtleXMubGVuZ3RoIT1PYmplY3Qua2V5cyhiKS5sZW5ndGgpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICBpZihrZXlzLmxlbmd0aCE9MCl7ICAgICAgICAgXG4gICAgICBmb3IodmFyIGk9MCxsZW49a2V5cy5sZW5ndGg7aTxsZW47aSsrKXtcbiAgICAgICAgaWYoYVtrZXlzW2ldXSE9YltrZXlzW2ldXSlcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZm9yKHZhciBpPTIsbGVuPWFyZ3VtZW50cy5sZW5ndGg7aTxsZW47aSsrKVxuICAgICAgaWYoIXRoaXMuZXF1YWxPYmooYSxhcmd1bWVudHNbaV0pKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIHVwcGVyRmlyc3QodHlwZSl7XG4gICAgcmV0dXJuIHR5cGVbMF0udG9VcHBlckNhc2UoKSArIHR5cGUuc2xpY2UoMSlcbiAgfVxuICBzdHlsZXNzKG5hbWUsdmFsdWUsIHN0eWxlKXtcbiAgICBicm93c2Vycy5mb3JFYWNoKGZ1bmN0aW9uKGEpe1xuICAgICAgdGhpc1thK25hbWVdPXZhbHVlXG4gICAgfS5iaW5kKHN0eWxlfHx0aGlzLnN0eWxlKSlcbiAgfVxuICBsaW5lU3R5bGUoeCl7XG4gICAgaWYoIXgpXG4gICAgICByZXR1cm4gJ3NvbGlkJ1xuICAgIHg9eC50b0xvd2VyQ2FzZSgpXG4gICAgaWYoeC5pbmRleE9mKCdkb3QnKSE9LTEpXG4gICAgICByZXR1cm4gJ2RvdHRlZCdcbiAgICBlbHNlIGlmKHguaW5kZXhPZignZGFzaCcpIT0tMSlcbiAgICAgIHJldHVybiAnZGFzaGVkJ1xuICAgIGVsc2UgaWYoeC5pbmRleE9mKCdkb3VibGUnKSE9LTEgfHwgeC5pbmRleE9mKCdnYXAnKSE9LTEpXG4gICAgICByZXR1cm4gJ2RvdWJsZSdcbiAgICBlbHNlIGlmKHguaW5kZXhPZignZW1ib3NzJykhPS0xKVxuICAgICAgcmV0dXJuICdyaWRnZSdcbiAgICBlbHNlIGlmKHguaW5kZXhPZignZ3JhdmUnKSE9LTEpXG4gICAgICByZXR1cm4gJ2dyb292ZSdcbiAgICBlbHNlIGlmKHguaW5kZXhPZignb3V0c2V0JykhPS0xKVxuICAgICAgcmV0dXJuICdvdXRzZXQnXG4gICAgZWxzZSBpZih4LmluZGV4T2YoJ2luc2V0JykhPS0xKVxuICAgICAgcmV0dXJuICdpbnNldCdcbiAgICBlbHNlXG4gICAgICByZXR1cm4gJ3NvbGlkJ1xuICB9XG59XG5cbiJdfQ==