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

var _converter3 = require('./style/converter');

var _converter4 = _interopRequireDefault(_converter3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AZ = /[A-Z]/g,
    r = function r(a) {
  return '-' + a.toLowerCase();
},
    clozed = /Z$/gi;

function asStyle(x) {
  var a = [];
  for (var i in x) {
    !$tool.isFunction(x[i]) && a.push(i.replace(AZ, r) + ':' + x[i]);
  }return a.join(';');
}

var Shape = function (_Converter) {
  (0, _inherits3.default)(Shape, _Converter);

  function Shape() {
    (0, _classCallCheck3.default)(this, Shape);
    return (0, _possibleConstructorReturn3.default)(this, (Shape.__proto__ || (0, _getPrototypeOf2.default)(Shape)).apply(this, arguments));
  }

  (0, _createClass3.default)(Shape, [{
    key: 'convertStyle',
    value: function convertStyle(el) {
      el.style.position = 'absolute';
      el.style.overflow = 'hidden';

      var pathStyle = { stroke: 'black', strokeWidth: 2, fillOpacity: 0 },
          bgStyle = this.makeBackgroundStyle();
      (0, _get3.default)(Shape.prototype.__proto__ || (0, _getPrototypeOf2.default)(Shape.prototype), 'convertStyle', this).apply(this, arguments);
      var style = this.wordModel.getDirectStyle(),
          propConverter = new this.constructor.Properties(el.style, this, pathStyle, bgStyle);
      style && style.parse([propConverter]);
      if (this.path) {
        if (el.style.background) pathStyle.fillOpacity = 0;
        var bgImage = el.style.background,
            grad = pathStyle.grad;
        delete pathStyle.grad;

        var svg = '<svg xmlns="http://www.w3.org/2000/svg">' + (grad ? '<defs>' + grad + '</defs>' : '') + this.path + ' style="' + asStyle(pathStyle) + '" /></svg>';
        var svgImage = 'url(' + this.doc.asImageURL(svg) + ')';
        bgStyle.backgroundImage = svgImage;
        bgStyle.backgroundSize = '100% 100%';
      }
    }
  }, {
    key: 'makeBackgroundStyle',
    value: function makeBackgroundStyle() {
      //make background el to hold svg background
      var id = 'shape' + this.doc.uid();
      this.content.setAttribute('id', id);
      var style = this.doc.createStyle('#' + id + '::before');
      style.content = '""';
      style.zIndex = -1;
      style.position = 'absolute';
      style.width = '100%';
      style.height = '100%';
      style.left = 0;
      style.top = 0;
      return style;
    }
  }, {
    key: 'tag',
    get: function get() {
      return 'div';
    }
  }]);
  return Shape;
}(_converter2.default);

exports.default = Shape;


Shape.Properties = function (_Style$Properties) {
  (0, _inherits3.default)(Properties, _Style$Properties);

  function Properties(style, parent, pathStyle, bgStyle) {
    (0, _classCallCheck3.default)(this, Properties);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));

    _this2.pathStyle = pathStyle;
    _this2.bgStyle = bgStyle;
    return _this2;
  }

  (0, _createClass3.default)(Properties, [{
    key: 'xfrm',
    value: function xfrm(x) {
      this.style.width = x.width + 'px';
      this.style.height = x.height + 'px';
      x.x && (this.style.left = x.x + 'px');
      x.y && (this.style.top = x.y + 'px');

      x.rotation && this.styless('transform', 'rotate(' + x.rotation + 'deg)');

      this.world = x;
    }
  }, {
    key: 'ln',
    value: function ln(x) {
      x.color && (this.pathStyle.stroke = x.color);
      x.width != undefined && (this.pathStyle.strokeWidth = x.width + 'px');

      switch (x.cap) {
        case 'rnd':
          this.pathStyle.strokeLinecap = 'round';
          break;
        default:

      }

      if (x.dash) {
        switch (this.lineStyle(x.dash)) {
          case 'dotted':
            this.pathStyle.strokeDasharray = "5,5";
            break;
            break;
          case 'dashed':
            this.pathStyle.strokeDasharray = "10,10";
            break;
        }
      }
    }
  }, {
    key: 'solidFill',
    value: function solidFill(x) {
      this.pathStyle.fill = x;
      this.pathStyle.fillOpacity = 1;
    }
  }, {
    key: 'gradFill',
    value: function gradFill(x) {
      if (this.style.backgroundImage) return;

      var grad = [];
      switch (x.path) {
        case 'linear':
          grad.push('<linearGradient id="grad"');
          switch (x.angel) {
            case 0:
              grad.push('x1="0%" y1="0%" x2="100%" y2="0%">');
              break;
            case 90:
              grad.push('x1="0%" y1="0%" x2="0%" y2="100%">');
              break;
            case 180:
              grad.push('x1="100%" y1="0%" x2="0%" y2="0%">');
              break;
            case 270:
              grad.push('x1="0%" y1="100%" x2="0%" y2="0%">');
              break;
          }
          grad.push('</linearGradient>');
          break;
        case 'circle':
          grad.push('<radialGradient  id="grad"');
          grad.push('cx="50%" cy="50%" r="50%" fx="50%" fy="50%">');
          grad.push('</radialGradient>');
          break;
      }
      var end = grad.pop();
      for (var i = 0, len = x.stops.length, a; i < len; i++) {
        grad.push('<stop offset="' + (a = x.stops[i]).position + '%" style="stop-opacity:1;stop-color:' + a.color + '"/>');
      }grad.push(end);

      this.pathStyle.grad = grad.join(' ');
      this.pathStyle.fill = 'url(#grad)';
      this.pathStyle.fillOpacity = 1;
    }
  }, {
    key: 'blipFill',
    value: function blipFill(x) {
      this.style.background = 'url(' + this.doc.asImageURL(x) + ')';
      this.style.backgroundSize = '100% 100%';
      this.noFill();
    }
  }, {
    key: 'noFill',
    value: function noFill(x) {
      this.pathStyle.fillOpacity = 0;
    }
  }, {
    key: 'lnRef',
    value: function lnRef(x) {
      this.ln(x);
    }
  }, {
    key: 'fillRef',
    value: function fillRef(x) {
      if (this.style.backgroundImage) return;

      if (typeof x.path != 'undefined') return this.gradFill(x);

      if (typeof x == 'string') this.pathStyle.fill = x;else if (typeof x.color != 'undefined') this.pathStyle.fill = x.color;else return;
      this.pathStyle.fillOpacity = 1;
    }
  }, {
    key: 'fontRef',
    value: function fontRef(x) {
      x.color && (this.style.color = x.color);
      x.family && (this.style.fontFamily = x.family);
    }
  }, {
    key: 'path',
    value: function path(x, t) {
      switch (x.shape) {
        case 'line':
          this.parent.path = '<line x1="0" y1="0" x2="' + this.world.width + 'pt" y2="' + this.world.height + 'pt"';
          break;
        case 'rect':
          this.parent.path = '<rect width="' + this.world.width + 'pt" height="' + this.world.height + 'pt"';
          break;
        case 'roundRect':
          this.parent.path = '<rect rx="' + (t = Math.min(this.world.width, this.world.height) / 12) + 'pt" ry="' + t + 'pt" width="' + this.world.width + 'pt" height="' + this.world.height + 'pt"';
          break;
        case 'ellipse':
          this.parent.path = '<ellipse cx="' + this.world.width / 2 + 'pt" cy="' + this.world.height / 2 + 'pt" rx="' + this.world.width / 2 + 'pt" ry="' + this.world.height / 2 + 'pt"';
          break;
        case 'path':
          this.parent.path = '<path d="' + x.path + '"';
          if (!clozed.test(x.path)) this.noFill();
          break;
      }
    }
  }, {
    key: 'spAutoFit',
    value: function spAutoFit() {
      this.style.height = 'auto';
    }
  }, {
    key: 'lIns',
    value: function lIns(x) {
      this.style.paddingLeft = x + 'px';
    }
  }, {
    key: 'tIns',
    value: function tIns(x) {
      this.style.paddingTop = x + 'px';
    }
  }, {
    key: 'rIns',
    value: function rIns(x) {
      this.style.paddingRight = x + 'px';
    }
  }, {
    key: 'bIns',
    value: function bIns(x) {
      this.style.paddingBottom = x + 'px';
    }
  }, {
    key: 'anchor',
    value: function anchor(x) {
      this.style.display = 'table-cell';
      this.style.verticalAlign = x;
    }
  }, {
    key: 'vert',
    value: function vert(x) {
      this.style.height = this.world.width + 'px';
      this.style.width = this.world.height + 'px';
      var delta = (this.world.width - this.world.height) / 2;

      this.bgStyle.height = this.world.height + 'px';
      this.bgStyle.width = this.world.width + 'px';
      this.styless('transform', 'translate(-' + delta + 'pt,' + delta + 'pt) rotate(-' + x + 'deg) ', this.bgStyle);

      this.styless('transform', 'translate(' + delta + 'pt,-' + delta + 'pt) rotate(' + (x + this.world.rotation || 0) + 'deg)');
    }
  }]);
  return Properties;
}(_converter4.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc2hhcGUuanMiXSwibmFtZXMiOlsiQVoiLCJyIiwiYSIsInRvTG93ZXJDYXNlIiwiY2xvemVkIiwiYXNTdHlsZSIsIngiLCJpIiwiJHRvb2wiLCJpc0Z1bmN0aW9uIiwicHVzaCIsInJlcGxhY2UiLCJqb2luIiwiU2hhcGUiLCJlbCIsInN0eWxlIiwicG9zaXRpb24iLCJvdmVyZmxvdyIsInBhdGhTdHlsZSIsInN0cm9rZSIsInN0cm9rZVdpZHRoIiwiZmlsbE9wYWNpdHkiLCJiZ1N0eWxlIiwibWFrZUJhY2tncm91bmRTdHlsZSIsImFyZ3VtZW50cyIsIndvcmRNb2RlbCIsImdldERpcmVjdFN0eWxlIiwicHJvcENvbnZlcnRlciIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsInBhcnNlIiwicGF0aCIsImJhY2tncm91bmQiLCJiZ0ltYWdlIiwiZ3JhZCIsInN2ZyIsInN2Z0ltYWdlIiwiZG9jIiwiYXNJbWFnZVVSTCIsImJhY2tncm91bmRJbWFnZSIsImJhY2tncm91bmRTaXplIiwiaWQiLCJ1aWQiLCJjb250ZW50Iiwic2V0QXR0cmlidXRlIiwiY3JlYXRlU3R5bGUiLCJ6SW5kZXgiLCJ3aWR0aCIsImhlaWdodCIsImxlZnQiLCJ0b3AiLCJDb252ZXJ0ZXIiLCJwYXJlbnQiLCJ5Iiwicm90YXRpb24iLCJzdHlsZXNzIiwid29ybGQiLCJjb2xvciIsInVuZGVmaW5lZCIsImNhcCIsInN0cm9rZUxpbmVjYXAiLCJkYXNoIiwibGluZVN0eWxlIiwic3Ryb2tlRGFzaGFycmF5IiwiZmlsbCIsImFuZ2VsIiwiZW5kIiwicG9wIiwibGVuIiwic3RvcHMiLCJsZW5ndGgiLCJub0ZpbGwiLCJsbiIsImdyYWRGaWxsIiwiZmFtaWx5IiwiZm9udEZhbWlseSIsInQiLCJzaGFwZSIsIk1hdGgiLCJtaW4iLCJ0ZXN0IiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nVG9wIiwicGFkZGluZ1JpZ2h0IiwicGFkZGluZ0JvdHRvbSIs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RUFBeUIsZUFBYWdDLEtBQWIsR0FBbUIsTUFBbkIsR0FBMEJBLEtBQTFCLEdBQWdDLGFBQWhDLElBQStDakYsSUFBRSxLQUFLa0QsS0FBTCxDQUFXRixRQUFiLElBQXVCLENBQXRFLElBQXlFLE1BQWxHO0FBQ0Q7QUFwS0g7QUFBQTtBQUFBLEVBQTBDa0Msb0JBQU0zRCxVQUFoRCIsImZpbGUiOiJzaGFwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi9jb252ZXJ0ZXInXG5pbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZS9jb252ZXJ0ZXInXG5cbnZhciBBWj0vW0EtWl0vZywgXG4gIHI9ZnVuY3Rpb24oYSl7cmV0dXJuICctJythLnRvTG93ZXJDYXNlKCl9LFxuICBjbG96ZWQ9L1okL2dpO1xuICBcbmZ1bmN0aW9uIGFzU3R5bGUoeCl7XG4gIHZhciBhPVtdXG4gIGZvcih2YXIgaSBpbiB4KVxuICAgICEkdG9vbC5pc0Z1bmN0aW9uKHhbaV0pICYmIGEucHVzaChpLnJlcGxhY2UoQVoscikrJzonK3hbaV0pXG4gIHJldHVybiBhLmpvaW4oJzsnKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFwZSBleHRlbmRzIENvbnZlcnRlcntcbiAgZ2V0IHRhZygpe3JldHVybiAnZGl2J31cbiAgXG4gIGNvbnZlcnRTdHlsZShlbCl7XG4gICAgZWwuc3R5bGUucG9zaXRpb249J2Fic29sdXRlJ1xuICAgIGVsLnN0eWxlLm92ZXJmbG93PSdoaWRkZW4nXG5cbiAgICB2YXIgcGF0aFN0eWxlPXtzdHJva2U6J2JsYWNrJywgc3Ryb2tlV2lkdGg6MiwgZmlsbE9wYWNpdHk6MH0sXG4gICAgICBiZ1N0eWxlPXRoaXMubWFrZUJhY2tncm91bmRTdHlsZSgpO1xuICAgIHN1cGVyLmNvbnZlcnRTdHlsZSguLi5hcmd1bWVudHMpXG4gICAgdmFyIHN0eWxlPXRoaXMud29yZE1vZGVsLmdldERpcmVjdFN0eWxlKCksXG4gICAgICBwcm9wQ29udmVydGVyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXMoZWwuc3R5bGUsdGhpcywgcGF0aFN0eWxlLCBiZ1N0eWxlKTtcbiAgICBzdHlsZSAmJiBzdHlsZS5wYXJzZShbcHJvcENvbnZlcnRlcl0pXG4gICAgaWYodGhpcy5wYXRoKXtcbiAgICAgIGlmKGVsLnN0eWxlLmJhY2tncm91bmQpXG4gICAgICAgIHBhdGhTdHlsZS5maWxsT3BhY2l0eT0wXG4gICAgICB2YXIgYmdJbWFnZT1lbC5zdHlsZS5iYWNrZ3JvdW5kLFxuICAgICAgICBncmFkPXBhdGhTdHlsZS5ncmFkO1xuICAgICAgZGVsZXRlIHBhdGhTdHlsZS5ncmFkOyAgICAgICAgXG4gICAgICBcbiAgICAgIHZhciBzdmc9JzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPidcbiAgICAgICAgICArKGdyYWQgPyAnPGRlZnM+JytncmFkKyc8L2RlZnM+JyA6ICcnKVxuICAgICAgICAgICt0aGlzLnBhdGgrJyBzdHlsZT1cIicrYXNTdHlsZShwYXRoU3R5bGUpKydcIiAvPjwvc3ZnPic7XG4gICAgICB2YXIgc3ZnSW1hZ2U9J3VybCgnK3RoaXMuZG9jLmFzSW1hZ2VVUkwoc3ZnKSsnKSc7XG4gICAgICBiZ1N0eWxlLmJhY2tncm91bmRJbWFnZT1zdmdJbWFnZVxuICAgICAgYmdTdHlsZS5iYWNrZ3JvdW5kU2l6ZT0nMTAwJSAxMDAlJ1xuICAgIH1cbiAgfVxuICBtYWtlQmFja2dyb3VuZFN0eWxlKCl7XG4gICAgLy9tYWtlIGJhY2tncm91bmQgZWwgdG8gaG9sZCBzdmcgYmFja2dyb3VuZFxuICAgIHZhciBpZD0nc2hhcGUnK3RoaXMuZG9jLnVpZCgpXG4gICAgdGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZSgnaWQnLGlkKVxuICAgIHZhciBzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnIycraWQrJzo6YmVmb3JlJylcbiAgICBzdHlsZS5jb250ZW50PSdcIlwiJ1xuICAgIHN0eWxlLnpJbmRleD0tMVxuICAgIHN0eWxlLnBvc2l0aW9uPSdhYnNvbHV0ZSdcbiAgICBzdHlsZS53aWR0aD0nMTAwJSdcbiAgICBzdHlsZS5oZWlnaHQ9JzEwMCUnXG4gICAgc3R5bGUubGVmdD0wXG4gICAgc3R5bGUudG9wPTBcbiAgICByZXR1cm4gc3R5bGVcbiAgfVxufVxuXG5TaGFwZS5Qcm9wZXJ0aWVzPWNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuICBjb25zdHJ1Y3RvcihzdHlsZSxwYXJlbnQsIHBhdGhTdHlsZSwgYmdTdHlsZSl7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKVxuICAgIHRoaXMucGF0aFN0eWxlPXBhdGhTdHlsZVxuICAgIHRoaXMuYmdTdHlsZT1iZ1N0eWxlXG4gIH1cblxuICB4ZnJtKHgpe1xuICAgIHRoaXMuc3R5bGUud2lkdGg9eC53aWR0aCsncHgnXG4gICAgdGhpcy5zdHlsZS5oZWlnaHQ9eC5oZWlnaHQrJ3B4J1xuICAgIHgueCAmJiAodGhpcy5zdHlsZS5sZWZ0PXgueCsncHgnKVxuICAgIHgueSAmJiAodGhpcy5zdHlsZS50b3A9eC55KydweCcpXG4gICAgXG4gICAgeC5yb3RhdGlvbiAmJiB0aGlzLnN0eWxlc3MoJ3RyYW5zZm9ybScsJ3JvdGF0ZSgnK3gucm90YXRpb24rJ2RlZyknKVxuICAgIFxuICAgIHRoaXMud29ybGQ9eFxuICB9XG4gIGxuKHgpe1xuICAgIHguY29sb3IgJiYgKHRoaXMucGF0aFN0eWxlLnN0cm9rZT14LmNvbG9yKTtcbiAgICB4LndpZHRoIT11bmRlZmluZWQgJiYgKHRoaXMucGF0aFN0eWxlLnN0cm9rZVdpZHRoPXgud2lkdGgrJ3B4Jyk7XG4gICAgXG4gICAgc3dpdGNoKHguY2FwKXtcbiAgICBjYXNlICdybmQnOlxuICAgICAgdGhpcy5wYXRoU3R5bGUuc3Ryb2tlTGluZWNhcD0ncm91bmQnXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBcbiAgICB9XG4gICAgXG4gICAgaWYoeC5kYXNoKXtcbiAgICAgIHN3aXRjaCh0aGlzLmxpbmVTdHlsZSh4LmRhc2gpKXtcbiAgICAgIGNhc2UgJ2RvdHRlZCc6XG4gICAgICAgIHRoaXMucGF0aFN0eWxlLnN0cm9rZURhc2hhcnJheT1cIjUsNVwiXG4gICAgICAgIGJyZWFrXG4gICAgICBicmVha1xuICAgICAgY2FzZSAnZGFzaGVkJzpcbiAgICAgICAgdGhpcy5wYXRoU3R5bGUuc3Ryb2tlRGFzaGFycmF5PVwiMTAsMTBcIlxuICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc29saWRGaWxsKHgpe1xuICAgIHRoaXMucGF0aFN0eWxlLmZpbGw9eFxuICAgIHRoaXMucGF0aFN0eWxlLmZpbGxPcGFjaXR5PTFcbiAgfVxuICBncmFkRmlsbCh4KXtcbiAgICBpZih0aGlzLnN0eWxlLmJhY2tncm91bmRJbWFnZSlcbiAgICAgIHJldHVyblxuICAgICAgXG4gICAgdmFyIGdyYWQ9W11cbiAgICBzd2l0Y2goeC5wYXRoKXtcbiAgICBjYXNlICdsaW5lYXInOlxuICAgICAgZ3JhZC5wdXNoKCc8bGluZWFyR3JhZGllbnQgaWQ9XCJncmFkXCInKVxuICAgICAgc3dpdGNoKHguYW5nZWwpe1xuICAgICAgY2FzZSAwOlxuICAgICAgICBncmFkLnB1c2goJ3gxPVwiMCVcIiB5MT1cIjAlXCIgeDI9XCIxMDAlXCIgeTI9XCIwJVwiPicpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDkwOlxuICAgICAgICBncmFkLnB1c2goJ3gxPVwiMCVcIiB5MT1cIjAlXCIgeDI9XCIwJVwiIHkyPVwiMTAwJVwiPicpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDE4MDpcbiAgICAgICAgZ3JhZC5wdXNoKCd4MT1cIjEwMCVcIiB5MT1cIjAlXCIgeDI9XCIwJVwiIHkyPVwiMCVcIj4nKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAyNzA6XG4gICAgICAgIGdyYWQucHVzaCgneDE9XCIwJVwiIHkxPVwiMTAwJVwiIHgyPVwiMCVcIiB5Mj1cIjAlXCI+JylcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIGdyYWQucHVzaCgnPC9saW5lYXJHcmFkaWVudD4nKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdjaXJjbGUnOlxuICAgICAgZ3JhZC5wdXNoKCc8cmFkaWFsR3JhZGllbnQgIGlkPVwiZ3JhZFwiJylcbiAgICAgIGdyYWQucHVzaCgnY3g9XCI1MCVcIiBjeT1cIjUwJVwiIHI9XCI1MCVcIiBmeD1cIjUwJVwiIGZ5PVwiNTAlXCI+JylcbiAgICAgIGdyYWQucHVzaCgnPC9yYWRpYWxHcmFkaWVudD4nKVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgdmFyIGVuZD1ncmFkLnBvcCgpXG4gICAgZm9yKHZhciBpPTAsbGVuPXguc3RvcHMubGVuZ3RoLGE7aTxsZW47aSsrKVxuICAgICAgZ3JhZC5wdXNoKCc8c3RvcCBvZmZzZXQ9XCInKyhhPXguc3RvcHNbaV0pLnBvc2l0aW9uKyclXCIgc3R5bGU9XCJzdG9wLW9wYWNpdHk6MTtzdG9wLWNvbG9yOicrYS5jb2xvcisnXCIvPicpXG4gICAgZ3JhZC5wdXNoKGVuZClcbiAgICBcbiAgICB0aGlzLnBhdGhTdHlsZS5ncmFkPWdyYWQuam9pbignICcpXG4gICAgdGhpcy5wYXRoU3R5bGUuZmlsbD0ndXJsKCNncmFkKSdcbiAgICB0aGlzLnBhdGhTdHlsZS5maWxsT3BhY2l0eT0xXG4gIH1cbiAgYmxpcEZpbGwoeCl7XG4gICAgdGhpcy5zdHlsZS5iYWNrZ3JvdW5kPSd1cmwoJyt0aGlzLmRvYy5hc0ltYWdlVVJMKHgpKycpJ1xuICAgIHRoaXMuc3R5bGUuYmFja2dyb3VuZFNpemU9JzEwMCUgMTAwJSdcbiAgICB0aGlzLm5vRmlsbCgpXG4gIH1cbiAgbm9GaWxsKHgpe1xuICAgIHRoaXMucGF0aFN0eWxlLmZpbGxPcGFjaXR5PTBcbiAgfVxuICBsblJlZih4KXtcbiAgICB0aGlzLmxuKHgpXG4gIH1cbiAgZmlsbFJlZih4KXtcbiAgICBpZih0aGlzLnN0eWxlLmJhY2tncm91bmRJbWFnZSlcbiAgICAgIHJldHVyblxuICAgIFxuICAgIGlmKHR5cGVvZih4LnBhdGgpIT0ndW5kZWZpbmVkJylcbiAgICAgIHJldHVybiB0aGlzLmdyYWRGaWxsKHgpO1xuICAgICAgXG4gICAgaWYodHlwZW9mKHgpPT0nc3RyaW5nJylcbiAgICAgIHRoaXMucGF0aFN0eWxlLmZpbGw9eFxuICAgIGVsc2UgaWYodHlwZW9mKHguY29sb3IpIT0ndW5kZWZpbmVkJylcbiAgICAgIHRoaXMucGF0aFN0eWxlLmZpbGw9eC5jb2xvclxuICAgIGVsc2VcbiAgICAgIHJldHVybjtcbiAgICB0aGlzLnBhdGhTdHlsZS5maWxsT3BhY2l0eT0xXG4gIH1cbiAgZm9udFJlZih4KXtcbiAgICB4LmNvbG9yICYmICh0aGlzLnN0eWxlLmNvbG9yPXguY29sb3IpO1xuICAgIHguZmFtaWx5ICYmICh0aGlzLnN0eWxlLmZvbnRGYW1pbHk9eC5mYW1pbHkpO1xuICB9XG4gIHBhdGgoeCwgdCl7XG4gICAgc3dpdGNoKHguc2hhcGUpe1xuICAgIGNhc2UgJ2xpbmUnOlxuICAgICAgdGhpcy5wYXJlbnQucGF0aD0nPGxpbmUgeDE9XCIwXCIgeTE9XCIwXCIgeDI9XCInK3RoaXMud29ybGQud2lkdGgrJ3B0XCIgeTI9XCInK3RoaXMud29ybGQuaGVpZ2h0KydwdFwiJ1xuICAgICAgYnJlYWtcbiAgICBjYXNlICdyZWN0JzpcbiAgICAgIHRoaXMucGFyZW50LnBhdGg9JzxyZWN0IHdpZHRoPVwiJyt0aGlzLndvcmxkLndpZHRoKydwdFwiIGhlaWdodD1cIicrdGhpcy53b3JsZC5oZWlnaHQrJ3B0XCInXG4gICAgICBicmVhazsgIFxuICAgIGNhc2UgJ3JvdW5kUmVjdCc6XG4gICAgICB0aGlzLnBhcmVudC5wYXRoPSc8cmVjdCByeD1cIicrKHQ9TWF0aC5taW4odGhpcy53b3JsZC53aWR0aCwgdGhpcy53b3JsZC5oZWlnaHQpLzEyKSsncHRcIiByeT1cIicrdCsncHRcIiB3aWR0aD1cIicrdGhpcy53b3JsZC53aWR0aCsncHRcIiBoZWlnaHQ9XCInK3RoaXMud29ybGQuaGVpZ2h0KydwdFwiJ1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnZWxsaXBzZSc6XG4gICAgICB0aGlzLnBhcmVudC5wYXRoPSc8ZWxsaXBzZSBjeD1cIicrdGhpcy53b3JsZC53aWR0aC8yKydwdFwiIGN5PVwiJyt0aGlzLndvcmxkLmhlaWdodC8yKydwdFwiIHJ4PVwiJyt0aGlzLndvcmxkLndpZHRoLzIrJ3B0XCIgcnk9XCInK3RoaXMud29ybGQuaGVpZ2h0LzIrJ3B0XCInXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3BhdGgnOlxuICAgICAgdGhpcy5wYXJlbnQucGF0aD0nPHBhdGggZD1cIicreC5wYXRoKydcIidcbiAgICAgIGlmKCFjbG96ZWQudGVzdCh4LnBhdGgpKVxuICAgICAgICB0aGlzLm5vRmlsbCgpXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuICBzcEF1dG9GaXQoKXtcbiAgICB0aGlzLnN0eWxlLmhlaWdodD0nYXV0bydcbiAgfVxuICBsSW5zKHgpe1xuICAgIHRoaXMuc3R5bGUucGFkZGluZ0xlZnQ9eCsncHgnXG4gIH1cbiAgdElucyh4KXtcbiAgICB0aGlzLnN0eWxlLnBhZGRpbmdUb3A9eCsncHgnXG4gIH1cbiAgcklucyh4KXtcbiAgICB0aGlzLnN0eWxlLnBhZGRpbmdSaWdodD14KydweCdcbiAgfVxuICBiSW5zKHgpe1xuICAgIHRoaXMuc3R5bGUucGFkZGluZ0JvdHRvbT14KydweCdcbiAgfVxuICBhbmNob3IoeCl7XG4gICAgdGhpcy5zdHlsZS5kaXNwbGF5PSd0YWJsZS1jZWxsJ1xuICAgIHRoaXMuc3R5bGUudmVydGljYWxBbGlnbj14XG4gIH1cbiAgdmVydCh4KXtcbiAgICB0aGlzLnN0eWxlLmhlaWdodD10aGlzLndvcmxkLndpZHRoKydweCdcbiAgICB0aGlzLnN0eWxlLndpZHRoPXRoaXMud29ybGQuaGVpZ2h0KydweCdcbiAgICB2YXIgZGVsdGE9KHRoaXMud29ybGQud2lkdGgtdGhpcy53b3JsZC5oZWlnaHQpLzJcbiAgICAgICAgICAgIFxuICAgIHRoaXMuYmdTdHlsZS5oZWlnaHQ9dGhpcy53b3JsZC5oZWlnaHQrJ3B4J1xuICAgIHRoaXMuYmdTdHlsZS53aWR0aD10aGlzLndvcmxkLndpZHRoKydweCdcbiAgICB0aGlzLnN0eWxlc3MoJ3RyYW5zZm9ybScsJ3RyYW5zbGF0ZSgtJytkZWx0YSsncHQsJytkZWx0YSsncHQpIHJvdGF0ZSgtJyt4KydkZWcpICcsIHRoaXMuYmdTdHlsZSlcblxuICAgIHRoaXMuc3R5bGVzcygndHJhbnNmb3JtJywndHJhbnNsYXRlKCcrZGVsdGErJ3B0LC0nK2RlbHRhKydwdCkgcm90YXRlKCcrKHgrdGhpcy53b3JsZC5yb3RhdGlvbnx8MCkrJ2RlZyknKVxuICB9XG59Il19