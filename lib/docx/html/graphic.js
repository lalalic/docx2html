'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _drawing = require('./drawing');

var _drawing2 = _interopRequireDefault(_drawing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Graphic = function (_Drawing) {
  (0, _inherits3.default)(Graphic, _Drawing);

  function Graphic() {
    (0, _classCallCheck3.default)(this, Graphic);
    return (0, _possibleConstructorReturn3.default)(this, (Graphic.__proto__ || (0, _getPrototypeOf2.default)(Graphic)).apply(this, arguments));
  }

  (0, _createClass3.default)(Graphic, [{
    key: 'tag',
    get: function get() {
      return 'span';
    }
  }]);
  return Graphic;
}(_drawing2.default);

exports.default = Graphic;

var Properties = function (_Drawing$Properties) {
  (0, _inherits3.default)(Properties, _Drawing$Properties);

  function Properties() {
    (0, _classCallCheck3.default)(this, Properties);
    return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
  }

  (0, _createClass3.default)(Properties, [{
    key: 'solidFill',
    value: function solidFill(x) {
      this.style.backgroundColor = x;
    }
  }, {
    key: 'gradFill',
    value: function gradFill(x) {}
  }, {
    key: 'noFill',
    value: function noFill(x) {
      this.style.background = 'transparent';
    }
  }, {
    key: 'fillRef',
    value: function fillRef(x) {
      switch (typeof x === 'undefined' ? 'undefined' : (0, _typeof3.default)(x)) {
        case 'string':
          return this.solidFill(x);
        case 'object':
          return this.gradFill(x);
        case 'number':
          return this.noFill(x);
      }
    }
  }, {
    key: 'ln',
    value: function ln(x) {
      x.color && (this.style.borderColor = x.color);
      x.width && (this.style.borderWidth = x.width + 'px', this.style.borderStyle = 'solid');
      x.dash && (this.style.borderStyle = this.lineStyle(x.dash));
      x.cap === 'rnd' && (this.style.borderRadius = x.width * 2 + 'px');
    }
  }, {
    key: 'xfrm',
    value: function xfrm(x) {
      this.style.width = x.width + 'px';
      this.style.height = x.height + 'px';
      x.x && (this.style.left = x.x + 'px');
      x.y && (this.style.top = x.y + 'px');
    }
  }]);
  return Properties;
}(_drawing2.default.Properties);

Graphic.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZ3JhcGhpYy5qcyJdLCJuYW1lcyI6WyJHcmFwaGljIiwiRHJhd2luZyIsIlByb3BlcnRpZXMiLCJ4Iiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJiYWNrZ3JvdW5kIiwic29saWRGaWxsIiwiZ3JhZEZpbGwiLCJub0ZpbGwiLCJjb2xvciIsImJvcmRlckNvbG9yIiwid2lkdGgiLCJib3JkZXJXaWR0aCIsImJvcmRlclN0eWxlIiwiZGFzaCIsImxpbmVTdHlsZSIsImNhcCIsImJvcmRlclJhZGl1cyIsImhlaWdodCIsImxlZnQiLCJ5IiwidG9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7O3dCQUNWO0FBQUMsYUFBTyxNQUFQO0FBQWM7OztFQURXQyxpQjs7a0JBQWhCRCxPOztJQUlmRSxVOzs7Ozs7Ozs7OzhCQUNNQyxDLEVBQUU7QUFDVixXQUFLQyxLQUFMLENBQVdDLGVBQVgsR0FBMkJGLENBQTNCO0FBQ0Q7Ozs2QkFDUUEsQyxFQUFFLENBRVY7OzsyQkFDTUEsQyxFQUFFO0FBQ1AsV0FBS0MsS0FBTCxDQUFXRSxVQUFYLEdBQXNCLGFBQXRCO0FBQ0Q7Ozs0QkFDT0gsQyxFQUFFO0FBQ1IscUJBQWNBLENBQWQsdURBQWNBLENBQWQ7QUFDQSxhQUFLLFFBQUw7QUFDRSxpQkFBTyxLQUFLSSxTQUFMLENBQWVKLENBQWYsQ0FBUDtBQUNGLGFBQUssUUFBTDtBQUNFLGlCQUFPLEtBQUtLLFFBQUwsQ0FBY0wsQ0FBZCxDQUFQO0FBQ0YsYUFBSyxRQUFMO0FBQ0UsaUJBQU8sS0FBS00sTUFBTCxDQUFZTixDQUFaLENBQVA7QUFORjtBQVFEOzs7dUJBQ0VBLEMsRUFBRTtBQUNIQSxRQUFFTyxLQUFGLEtBQVksS0FBS04sS0FBTCxDQUFXTyxXQUFYLEdBQXVCUixFQUFFTyxLQUFyQztBQUNBUCxRQUFFUyxLQUFGLEtBQVksS0FBS1IsS0FBTCxDQUFXUyxXQUFYLEdBQXVCVixFQUFFUyxLQUFGLEdBQVEsSUFBL0IsRUFBcUMsS0FBS1IsS0FBTCxDQUFXVSxXQUFYLEdBQXVCLE9BQXhFO0FBQ0FYLFFBQUVZLElBQUYsS0FBVyxLQUFLWCxLQUFMLENBQVdVLFdBQVgsR0FBdUIsS0FBS0UsU0FBTCxDQUFlYixFQUFFWSxJQUFqQixDQUFsQztBQUNBWixRQUFFYyxHQUFGLEtBQVEsS0FBUixLQUFrQixLQUFLYixLQUFMLENBQVdjLFlBQVgsR0FBd0JmLEVBQUVTLEtBQUYsR0FBUSxDQUFSLEdBQVUsSUFBcEQ7QUFDRDs7O3lCQUNJVCxDLEVBQUU7QUFDTCxXQUFLQyxLQUFMLENBQVdRLEtBQVgsR0FBaUJULEVBQUVTLEtBQUYsR0FBUSxJQUF6QjtBQUNBLFdBQUtSLEtBQUwsQ0FBV2UsTUFBWCxHQUFrQmhCLEVBQUVnQixNQUFGLEdBQVMsSUFBM0I7QUFDQWhCLFFBQUVBLENBQUYsS0FBUSxLQUFLQyxLQUFMLENBQVdnQixJQUFYLEdBQWdCakIsRUFBRUEsQ0FBRixHQUFJLElBQTVCO0FBQ0FBLFFBQUVrQixDQUFGLEtBQVEsS0FBS2pCLEtBQUwsQ0FBV2tCLEdBQVgsR0FBZW5CLEVBQUVrQixDQUFGLEdBQUksSUFBM0I7QUFDRDs7O0VBL0JzQnBCLGtCQUFRQyxVOztBQWtDakNGLFFBQVFFLFVBQVIsR0FBbUJBLFVBQW5CIiwiZmlsZSI6ImdyYXBoaWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRHJhd2luZyBmcm9tICcuL2RyYXdpbmcnIFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaGljIGV4dGVuZHMgRHJhd2luZ3tcbiAgZ2V0IHRhZygpe3JldHVybiAnc3Bhbid9XG59XG5cbmNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBEcmF3aW5nLlByb3BlcnRpZXN7XG4gIHNvbGlkRmlsbCh4KXtcbiAgICB0aGlzLnN0eWxlLmJhY2tncm91bmRDb2xvcj14XG4gIH1cbiAgZ3JhZEZpbGwoeCl7XG4gICAgXG4gIH1cbiAgbm9GaWxsKHgpe1xuICAgIHRoaXMuc3R5bGUuYmFja2dyb3VuZD0ndHJhbnNwYXJlbnQnXG4gIH1cbiAgZmlsbFJlZih4KXtcbiAgICBzd2l0Y2godHlwZW9mKHgpKXtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHRoaXMuc29saWRGaWxsKHgpXG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIHJldHVybiB0aGlzLmdyYWRGaWxsKHgpXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHJldHVybiB0aGlzLm5vRmlsbCh4KVxuICAgIH1cbiAgfVxuICBsbih4KXtcbiAgICB4LmNvbG9yICYmICh0aGlzLnN0eWxlLmJvcmRlckNvbG9yPXguY29sb3IpO1xuICAgIHgud2lkdGggJiYgKHRoaXMuc3R5bGUuYm9yZGVyV2lkdGg9eC53aWR0aCsncHgnLCB0aGlzLnN0eWxlLmJvcmRlclN0eWxlPSdzb2xpZCcpO1xuICAgIHguZGFzaCAmJiAodGhpcy5zdHlsZS5ib3JkZXJTdHlsZT10aGlzLmxpbmVTdHlsZSh4LmRhc2gpKTtcbiAgICB4LmNhcD09PSdybmQnICYmICh0aGlzLnN0eWxlLmJvcmRlclJhZGl1cz14LndpZHRoKjIrJ3B4JylcbiAgfVxuICB4ZnJtKHgpe1xuICAgIHRoaXMuc3R5bGUud2lkdGg9eC53aWR0aCsncHgnXG4gICAgdGhpcy5zdHlsZS5oZWlnaHQ9eC5oZWlnaHQrJ3B4J1xuICAgIHgueCAmJiAodGhpcy5zdHlsZS5sZWZ0PXgueCsncHgnKVxuICAgIHgueSAmJiAodGhpcy5zdHlsZS50b3A9eC55KydweCcpXG4gIH1cbn1cblxuR3JhcGhpYy5Qcm9wZXJ0aWVzPVByb3BlcnRpZXMiXX0=