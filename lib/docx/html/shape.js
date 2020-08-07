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
    !$.isFunction(x[i]) && a.push(i.replace(AZ, r) + ':' + x[i]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc2hhcGUuanMiXSwibmFtZXMiOlsiQVoiLCJyIiwiYSIsInRvTG93ZXJDYXNlIiwiY2xvemVkIiwiYXNTdHlsZSIsIngiLCJpIiwiJCIsImlzRnVuY3Rpb24iLCJwdXNoIiwicmVwbGFjZSIsImpvaW4iLCJTaGFwZSIsImVsIiwic3R5bGUiLCJwb3NpdGlvbiIsIm92ZXJmbG93IiwicGF0aFN0eWxlIiwic3Ryb2tlIiwic3Ryb2tlV2lkdGgiLCJmaWxsT3BhY2l0eSIsImJnU3R5bGUiLCJtYWtlQmFja2dyb3VuZFN0eWxlIiwiYXJndW1lbnRzIiwid29yZE1vZGVsIiwiZ2V0RGlyZWN0U3R5bGUiLCJwcm9wQ29udmVydGVyIiwiY29uc3RydWN0b3IiLCJQcm9wZXJ0aWVzIiwicGFyc2UiLCJwYXRoIiwiYmFja2dyb3VuZCIsImJnSW1hZ2UiLCJncmFkIiwic3ZnIiwic3ZnSW1hZ2UiLCJkb2MiLCJhc0ltYWdlVVJMIiwiYmFja2dyb3VuZEltYWdlIiwiYmFja2dyb3VuZFNpemUiLCJpZCIsInVpZCIsImNvbnRlbnQiLCJzZXRBdHRyaWJ1dGUiLCJjcmVhdGVTdHlsZSIsInpJbmRleCIsIndpZHRoIiwiaGVpZ2h0IiwibGVmdCIsInRvcCIsIkNvbnZlcnRlciIsInBhcmVudCIsInkiLCJyb3RhdGlvbiIsInN0eWxlc3MiLCJ3b3JsZCIsImNvbG9yIiwidW5kZWZpbmVkIiwiY2FwIiwic3Ryb2tlTGluZWNhcCIsImRhc2giLCJsaW5lU3R5bGUiLCJzdHJva2VEYXNoYXJyYXkiLCJmaWxsIiwiYW5nZWwiLCJlbmQiLCJwb3AiLCJsZW4iLCJzdG9wcyIsImxlbmd0aCIsIm5vRmlsbCIsImxuIiwiZ3JhZEZpbGwiLCJmYW1pbHkiLCJmb250RmFtaWx5IiwidCIsInNoYXBlIiwiTWF0aCIsIm1pbiIsInRlc3QiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdUb3AiLCJwYWRkaW5nUmlnaHQiLCJwYWRkaW5nQm90dG9tIiwiZGlzcGxheSIsInZlcnRpY2FsQWxpZ24iLCJkZWx0YSIsIlN0eWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJQSxLQUFHLFFBQVA7QUFBQSxJQUNFQyxJQUFFLFNBQUZBLENBQUUsQ0FBU0MsQ0FBVCxFQUFXO0FBQUMsU0FBTyxNQUFJQSxFQUFFQyxXQUFGLEVBQVg7QUFBMkIsQ0FEM0M7QUFBQSxJQUVFQyxTQUFPLE1BRlQ7O0FBSUEsU0FBU0MsT0FBVCxDQUFpQkMsQ0FBakIsRUFBbUI7QUFDakIsTUFBSUosSUFBRSxFQUFOO0FBQ0EsT0FBSSxJQUFJSyxDQUFSLElBQWFELENBQWI7QUFDRSxLQUFDRSxFQUFFQyxVQUFGLENBQWFILEVBQUVDLENBQUYsQ0FBYixDQUFELElBQXVCTCxFQUFFUSxJQUFGLENBQU9ILEVBQUVJLE9BQUYsQ0FBVVgsRUFBVixFQUFhQyxDQUFiLElBQWdCLEdBQWhCLEdBQW9CSyxFQUFFQyxDQUFGLENBQTNCLENBQXZCO0FBREYsR0FFQSxPQUFPTCxFQUFFVSxJQUFGLENBQU8sR0FBUCxDQUFQO0FBQ0Q7O0lBRW9CQyxLOzs7Ozs7Ozs7O2lDQUdOQyxFLEVBQUc7QUFDZEEsU0FBR0MsS0FBSCxDQUFTQyxRQUFULEdBQWtCLFVBQWxCO0FBQ0FGLFNBQUdDLEtBQUgsQ0FBU0UsUUFBVCxHQUFrQixRQUFsQjs7QUFFQSxVQUFJQyxZQUFVLEVBQUNDLFFBQU8sT0FBUixFQUFpQkMsYUFBWSxDQUE3QixFQUFnQ0MsYUFBWSxDQUE1QyxFQUFkO0FBQUEsVUFDRUMsVUFBUSxLQUFLQyxtQkFBTCxFQURWO0FBRUEsd0lBQXNCQyxTQUF0QjtBQUNBLFVBQUlULFFBQU0sS0FBS1UsU0FBTCxDQUFlQyxjQUFmLEVBQVY7QUFBQSxVQUNFQyxnQkFBYyxJQUFJLEtBQUtDLFdBQUwsQ0FBaUJDLFVBQXJCLENBQWdDZixHQUFHQyxLQUFuQyxFQUF5QyxJQUF6QyxFQUErQ0csU0FBL0MsRUFBMERJLE9BQTFELENBRGhCO0FBRUFQLGVBQVNBLE1BQU1lLEtBQU4sQ0FBWSxDQUFDSCxhQUFELENBQVosQ0FBVDtBQUNBLFVBQUcsS0FBS0ksSUFBUixFQUFhO0FBQ1gsWUFBR2pCLEdBQUdDLEtBQUgsQ0FBU2lCLFVBQVosRUFDRWQsVUFBVUcsV0FBVixHQUFzQixDQUF0QjtBQUNGLFlBQUlZLFVBQVFuQixHQUFHQyxLQUFILENBQVNpQixVQUFyQjtBQUFBLFlBQ0VFLE9BQUtoQixVQUFVZ0IsSUFEakI7QUFFQSxlQUFPaEIsVUFBVWdCLElBQWpCOztBQUVBLFlBQUlDLE1BQUksOENBQ0ZELE9BQU8sV0FBU0EsSUFBVCxHQUFjLFNBQXJCLEdBQWlDLEVBRC9CLElBRUgsS0FBS0gsSUFGRixHQUVPLFVBRlAsR0FFa0IxQixRQUFRYSxTQUFSLENBRmxCLEdBRXFDLFlBRjdDO0FBR0EsWUFBSWtCLFdBQVMsU0FBTyxLQUFLQyxHQUFMLENBQVNDLFVBQVQsQ0FBb0JILEdBQXBCLENBQVAsR0FBZ0MsR0FBN0M7QUFDQWIsZ0JBQVFpQixlQUFSLEdBQXdCSCxRQUF4QjtBQUNBZCxnQkFBUWtCLGNBQVIsR0FBdUIsV0FBdkI7QUFDRDtBQUNGOzs7MENBQ29CO0FBQ25CO0FBQ0EsVUFBSUMsS0FBRyxVQUFRLEtBQUtKLEdBQUwsQ0FBU0ssR0FBVCxFQUFmO0FBQ0EsV0FBS0MsT0FBTCxDQUFhQyxZQUFiLENBQTBCLElBQTFCLEVBQStCSCxFQUEvQjtBQUNBLFVBQUkxQixRQUFNLEtBQUtzQixHQUFMLENBQVNRLFdBQVQsQ0FBcUIsTUFBSUosRUFBSixHQUFPLFVBQTVCLENBQVY7QUFDQTFCLFlBQU00QixPQUFOLEdBQWMsSUFBZDtBQUNBNUIsWUFBTStCLE1BQU4sR0FBYSxDQUFDLENBQWQ7QUFDQS9CLFlBQU1DLFFBQU4sR0FBZSxVQUFmO0FBQ0FELFlBQU1nQyxLQUFOLEdBQVksTUFBWjtBQUNBaEMsWUFBTWlDLE1BQU4sR0FBYSxNQUFiO0FBQ0FqQyxZQUFNa0MsSUFBTixHQUFXLENBQVg7QUFDQWxDLFlBQU1tQyxHQUFOLEdBQVUsQ0FBVjtBQUNBLGFBQU9uQyxLQUFQO0FBQ0Q7Ozt3QkF4Q1E7QUFBQyxhQUFPLEtBQVA7QUFBYTs7O0VBRFVvQyxtQjs7a0JBQWR0QyxLOzs7QUE0Q3JCQSxNQUFNZ0IsVUFBTjtBQUFBOztBQUNFLHNCQUFZZCxLQUFaLEVBQWtCcUMsTUFBbEIsRUFBMEJsQyxTQUExQixFQUFxQ0ksT0FBckMsRUFBNkM7QUFBQTs7QUFBQSxnSkFDbENFLFNBRGtDOztBQUUzQyxXQUFLTixTQUFMLEdBQWVBLFNBQWY7QUFDQSxXQUFLSSxPQUFMLEdBQWFBLE9BQWI7QUFIMkM7QUFJNUM7O0FBTEg7QUFBQTtBQUFBLHlCQU9PaEIsQ0FQUCxFQU9TO0FBQ0wsV0FBS1MsS0FBTCxDQUFXZ0MsS0FBWCxHQUFpQnpDLEVBQUV5QyxLQUFGLEdBQVEsSUFBekI7QUFDQSxXQUFLaEMsS0FBTCxDQUFXaUMsTUFBWCxHQUFrQjFDLEVBQUUwQyxNQUFGLEdBQVMsSUFBM0I7QUFDQTFDLFFBQUVBLENBQUYsS0FBUSxLQUFLUyxLQUFMLENBQVdrQyxJQUFYLEdBQWdCM0MsRUFBRUEsQ0FBRixHQUFJLElBQTVCO0FBQ0FBLFFBQUUrQyxDQUFGLEtBQVEsS0FBS3RDLEtBQUwsQ0FBV21DLEdBQVgsR0FBZTVDLEVBQUUrQyxDQUFGLEdBQUksSUFBM0I7O0FBRUEvQyxRQUFFZ0QsUUFBRixJQUFjLEtBQUtDLE9BQUwsQ0FBYSxXQUFiLEVBQXlCLFlBQVVqRCxFQUFFZ0QsUUFBWixHQUFxQixNQUE5QyxDQUFkOztBQUVBLFdBQUtFLEtBQUwsR0FBV2xELENBQVg7QUFDRDtBQWhCSDtBQUFBO0FBQUEsdUJBaUJLQSxDQWpCTCxFQWlCTztBQUNIQSxRQUFFbUQsS0FBRixLQUFZLEtBQUt2QyxTQUFMLENBQWVDLE1BQWYsR0FBc0JiLEVBQUVtRCxLQUFwQztBQUNBbkQsUUFBRXlDLEtBQUYsSUFBU1csU0FBVCxLQUF1QixLQUFLeEMsU0FBTCxDQUFlRSxXQUFmLEdBQTJCZCxFQUFFeUMsS0FBRixHQUFRLElBQTFEOztBQUVBLGNBQU96QyxFQUFFcUQsR0FBVDtBQUNBLGFBQUssS0FBTDtBQUNFLGVBQUt6QyxTQUFMLENBQWUwQyxhQUFmLEdBQTZCLE9BQTdCO0FBQ0E7QUFDRjs7QUFKQTs7QUFRQSxVQUFHdEQsRUFBRXVELElBQUwsRUFBVTtBQUNSLGdCQUFPLEtBQUtDLFNBQUwsQ0FBZXhELEVBQUV1RCxJQUFqQixDQUFQO0FBQ0EsZUFBSyxRQUFMO0FBQ0UsaUJBQUszQyxTQUFMLENBQWU2QyxlQUFmLEdBQStCLEtBQS9CO0FBQ0E7QUFDRjtBQUNBLGVBQUssUUFBTDtBQUNFLGlCQUFLN0MsU0FBTCxDQUFlNkMsZUFBZixHQUErQixPQUEvQjtBQUNGO0FBUEE7QUFTRDtBQUNGO0FBeENIO0FBQUE7QUFBQSw4QkF5Q1l6RCxDQXpDWixFQXlDYztBQUNWLFdBQUtZLFNBQUwsQ0FBZThDLElBQWYsR0FBb0IxRCxDQUFwQjtBQUNBLFdBQUtZLFNBQUwsQ0FBZUcsV0FBZixHQUEyQixDQUEzQjtBQUNEO0FBNUNIO0FBQUE7QUFBQSw2QkE2Q1dmLENBN0NYLEVBNkNhO0FBQ1QsVUFBRyxLQUFLUyxLQUFMLENBQVd3QixlQUFkLEVBQ0U7O0FBRUYsVUFBSUwsT0FBSyxFQUFUO0FBQ0EsY0FBTzVCLEVBQUV5QixJQUFUO0FBQ0EsYUFBSyxRQUFMO0FBQ0VHLGVBQUt4QixJQUFMLENBQVUsMkJBQVY7QUFDQSxrQkFBT0osRUFBRTJELEtBQVQ7QUFDQSxpQkFBSyxDQUFMO0FBQ0UvQixtQkFBS3hCLElBQUwsQ0FBVSxvQ0FBVjtBQUNBO0FBQ0YsaUJBQUssRUFBTDtBQUNFd0IsbUJBQUt4QixJQUFMLENBQVUsb0NBQVY7QUFDQTtBQUNGLGlCQUFLLEdBQUw7QUFDRXdCLG1CQUFLeEIsSUFBTCxDQUFVLG9DQUFWO0FBQ0E7QUFDRixpQkFBSyxHQUFMO0FBQ0V3QixtQkFBS3hCLElBQUwsQ0FBVSxvQ0FBVjtBQUNBO0FBWkY7QUFjQXdCLGVBQUt4QixJQUFMLENBQVUsbUJBQVY7QUFDQTtBQUNGLGFBQUssUUFBTDtBQUNFd0IsZUFBS3hCLElBQUwsQ0FBVSw0QkFBVjtBQUNBd0IsZUFBS3hCLElBQUwsQ0FBVSw4Q0FBVjtBQUNBd0IsZUFBS3hCLElBQUwsQ0FBVSxtQkFBVjtBQUNBO0FBdkJGO0FBeUJBLFVBQUl3RCxNQUFJaEMsS0FBS2lDLEdBQUwsRUFBUjtBQUNBLFdBQUksSUFBSTVELElBQUUsQ0FBTixFQUFRNkQsTUFBSTlELEVBQUUrRCxLQUFGLENBQVFDLE1BQXBCLEVBQTJCcEUsQ0FBL0IsRUFBaUNLLElBQUU2RCxHQUFuQyxFQUF1QzdELEdBQXZDO0FBQ0UyQixhQUFLeEIsSUFBTCxDQUFVLG1CQUFpQixDQUFDUixJQUFFSSxFQUFFK0QsS0FBRixDQUFROUQsQ0FBUixDQUFILEVBQWVTLFFBQWhDLEdBQXlDLHNDQUF6QyxHQUFnRmQsRUFBRXVELEtBQWxGLEdBQXdGLEtBQWxHO0FBREYsT0FFQXZCLEtBQUt4QixJQUFMLENBQVV3RCxHQUFWOztBQUVBLFdBQUtoRCxTQUFMLENBQWVnQixJQUFmLEdBQW9CQSxLQUFLdEIsSUFBTCxDQUFVLEdBQVYsQ0FBcEI7QUFDQSxXQUFLTSxTQUFMLENBQWU4QyxJQUFmLEdBQW9CLFlBQXBCO0FBQ0EsV0FBSzlDLFNBQUwsQ0FBZUcsV0FBZixHQUEyQixDQUEzQjtBQUNEO0FBbkZIO0FBQUE7QUFBQSw2QkFvRldmLENBcEZYLEVBb0ZhO0FBQ1QsV0FBS1MsS0FBTCxDQUFXaUIsVUFBWCxHQUFzQixTQUFPLEtBQUtLLEdBQUwsQ0FBU0MsVUFBVCxDQUFvQmhDLENBQXBCLENBQVAsR0FBOEIsR0FBcEQ7QUFDQSxXQUFLUyxLQUFMLENBQVd5QixjQUFYLEdBQTBCLFdBQTFCO0FBQ0EsV0FBSytCLE1BQUw7QUFDRDtBQXhGSDtBQUFBO0FBQUEsMkJBeUZTakUsQ0F6RlQsRUF5Rlc7QUFDUCxXQUFLWSxTQUFMLENBQWVHLFdBQWYsR0FBMkIsQ0FBM0I7QUFDRDtBQTNGSDtBQUFBO0FBQUEsMEJBNEZRZixDQTVGUixFQTRGVTtBQUNOLFdBQUtrRSxFQUFMLENBQVFsRSxDQUFSO0FBQ0Q7QUE5Rkg7QUFBQTtBQUFBLDRCQStGVUEsQ0EvRlYsRUErRlk7QUFDUixVQUFHLEtBQUtTLEtBQUwsQ0FBV3dCLGVBQWQsRUFDRTs7QUFFRixVQUFHLE9BQU9qQyxFQUFFeUIsSUFBVCxJQUFnQixXQUFuQixFQUNFLE9BQU8sS0FBSzBDLFFBQUwsQ0FBY25FLENBQWQsQ0FBUDs7QUFFRixVQUFHLE9BQU9BLENBQVAsSUFBVyxRQUFkLEVBQ0UsS0FBS1ksU0FBTCxDQUFlOEMsSUFBZixHQUFvQjFELENBQXBCLENBREYsS0FFSyxJQUFHLE9BQU9BLEVBQUVtRCxLQUFULElBQWlCLFdBQXBCLEVBQ0gsS0FBS3ZDLFNBQUwsQ0FBZThDLElBQWYsR0FBb0IxRCxFQUFFbUQsS0FBdEIsQ0FERyxLQUdIO0FBQ0YsV0FBS3ZDLFNBQUwsQ0FBZUcsV0FBZixHQUEyQixDQUEzQjtBQUNEO0FBN0dIO0FBQUE7QUFBQSw0QkE4R1VmLENBOUdWLEVBOEdZO0FBQ1JBLFFBQUVtRCxLQUFGLEtBQVksS0FBSzFDLEtBQUwsQ0FBVzBDLEtBQVgsR0FBaUJuRCxFQUFFbUQsS0FBL0I7QUFDQW5ELFFBQUVvRSxNQUFGLEtBQWEsS0FBSzNELEtBQUwsQ0FBVzRELFVBQVgsR0FBc0JyRSxFQUFFb0UsTUFBckM7QUFDRDtBQWpISDtBQUFBO0FBQUEseUJBa0hPcEUsQ0FsSFAsRUFrSFVzRSxDQWxIVixFQWtIWTtBQUNSLGNBQU90RSxFQUFFdUUsS0FBVDtBQUNBLGFBQUssTUFBTDtBQUNFLGVBQUt6QixNQUFMLENBQVlyQixJQUFaLEdBQWlCLDZCQUEyQixLQUFLeUIsS0FBTCxDQUFXVCxLQUF0QyxHQUE0QyxVQUE1QyxHQUF1RCxLQUFLUyxLQUFMLENBQVdSLE1BQWxFLEdBQXlFLEtBQTFGO0FBQ0E7QUFDRixhQUFLLE1BQUw7QUFDRSxlQUFLSSxNQUFMLENBQVlyQixJQUFaLEdBQWlCLGtCQUFnQixLQUFLeUIsS0FBTCxDQUFXVCxLQUEzQixHQUFpQyxjQUFqQyxHQUFnRCxLQUFLUyxLQUFMLENBQVdSLE1BQTNELEdBQWtFLEtBQW5GO0FBQ0E7QUFDRixhQUFLLFdBQUw7QUFDRSxlQUFLSSxNQUFMLENBQVlyQixJQUFaLEdBQWlCLGdCQUFjNkMsSUFBRUUsS0FBS0MsR0FBTCxDQUFTLEtBQUt2QixLQUFMLENBQVdULEtBQXBCLEVBQTJCLEtBQUtTLEtBQUwsQ0FBV1IsTUFBdEMsSUFBOEMsRUFBOUQsSUFBa0UsVUFBbEUsR0FBNkU0QixDQUE3RSxHQUErRSxhQUEvRSxHQUE2RixLQUFLcEIsS0FBTCxDQUFXVCxLQUF4RyxHQUE4RyxjQUE5RyxHQUE2SCxLQUFLUyxLQUFMLENBQVdSLE1BQXhJLEdBQStJLEtBQWhLO0FBQ0E7QUFDRixhQUFLLFNBQUw7QUFDRSxlQUFLSSxNQUFMLENBQVlyQixJQUFaLEdBQWlCLGtCQUFnQixLQUFLeUIsS0FBTCxDQUFXVCxLQUFYLEdBQWlCLENBQWpDLEdBQW1DLFVBQW5DLEdBQThDLEtBQUtTLEtBQUwsQ0FBV1IsTUFBWCxHQUFrQixDQUFoRSxHQUFrRSxVQUFsRSxHQUE2RSxLQUFLUSxLQUFMLENBQVdULEtBQVgsR0FBaUIsQ0FBOUYsR0FBZ0csVUFBaEcsR0FBMkcsS0FBS1MsS0FBTCxDQUFXUixNQUFYLEdBQWtCLENBQTdILEdBQStILEtBQWhKO0FBQ0E7QUFDRixhQUFLLE1BQUw7QUFDRSxlQUFLSSxNQUFMLENBQVlyQixJQUFaLEdBQWlCLGNBQVl6QixFQUFFeUIsSUFBZCxHQUFtQixHQUFwQztBQUNBLGNBQUcsQ0FBQzNCLE9BQU80RSxJQUFQLENBQVkxRSxFQUFFeUIsSUFBZCxDQUFKLEVBQ0UsS0FBS3dDLE1BQUw7QUFDRjtBQWpCRjtBQW1CRDtBQXRJSDtBQUFBO0FBQUEsZ0NBdUlhO0FBQ1QsV0FBS3hELEtBQUwsQ0FBV2lDLE1BQVgsR0FBa0IsTUFBbEI7QUFDRDtBQXpJSDtBQUFBO0FBQUEseUJBMElPMUMsQ0ExSVAsRUEwSVM7QUFDTCxXQUFLUyxLQUFMLENBQVdrRSxXQUFYLEdBQXVCM0UsSUFBRSxJQUF6QjtBQUNEO0FBNUlIO0FBQUE7QUFBQSx5QkE2SU9BLENBN0lQLEVBNklTO0FBQ0wsV0FBS1MsS0FBTCxDQUFXbUUsVUFBWCxHQUFzQjVFLElBQUUsSUFBeEI7QUFDRDtBQS9JSDtBQUFBO0FBQUEseUJBZ0pPQSxDQWhKUCxFQWdKUztBQUNMLFdBQUtTLEtBQUwsQ0FBV29FLFlBQVgsR0FBd0I3RSxJQUFFLElBQTFCO0FBQ0Q7QUFsSkg7QUFBQTtBQUFBLHlCQW1KT0EsQ0FuSlAsRUFtSlM7QUFDTCxXQUFLUyxLQUFMLENBQVdxRSxhQUFYLEdBQXlCOUUsSUFBRSxJQUEzQjtBQUNEO0FBckpIO0FBQUE7QUFBQSwyQkFzSlNBLENBdEpULEVBc0pXO0FBQ1AsV0FBS1MsS0FBTCxDQUFXc0UsT0FBWCxHQUFtQixZQUFuQjtBQUNBLFdBQUt0RSxLQUFMLENBQVd1RSxhQUFYLEdBQXlCaEYsQ0FBekI7QUFDRDtBQXpKSDtBQUFBO0FBQUEseUJBMEpPQSxDQTFKUCxFQTBKUztBQUNMLFdBQUtTLEtBQUwsQ0FBV2lDLE1BQVgsR0FBa0IsS0FBS1EsS0FBTCxDQUFXVCxLQUFYLEdBQWlCLElBQW5DO0FBQ0EsV0FBS2hDLEtBQUwsQ0FBV2dDLEtBQVgsR0FBaUIsS0FBS1MsS0FBTCxDQUFXUixNQUFYLEdBQWtCLElBQW5DO0FBQ0EsVUFBSXVDLFFBQU0sQ0FBQyxLQUFLL0IsS0FBTCxDQUFXVCxLQUFYLEdBQWlCLEtBQUtTLEtBQUwsQ0FBV1IsTUFBN0IsSUFBcUMsQ0FBL0M7O0FBRUEsV0FBSzFCLE9BQUwsQ0FBYTBCLE1BQWIsR0FBb0IsS0FBS1EsS0FBTCxDQUFXUixNQUFYLEdBQWtCLElBQXRDO0FBQ0EsV0FBSzFCLE9BQUwsQ0FBYXlCLEtBQWIsR0FBbUIsS0FBS1MsS0FBTCxDQUFXVCxLQUFYLEdBQWlCLElBQXBDO0FBQ0EsV0FBS1EsT0FBTCxDQUFhLFdBQWIsRUFBeUIsZ0JBQWNnQyxLQUFkLEdBQW9CLEtBQXBCLEdBQTBCQSxLQUExQixHQUFnQyxjQUFoQyxHQUErQ2pGLENBQS9DLEdBQWlELE9BQTFFLEVBQW1GLEtBQUtnQixPQUF4Rjs7QUFFQSxXQUFLaUMsT0FBTCxDQUFhLFdBQWIsRUFBeUIsZUFBYWdDLEtBQWIsR0FBbUIsTUFBbkIsR0FBMEJBLEtBQTFCLEdBQWdDLGFBQWhDLElBQStDakYsSUFBRSxLQUFLa0QsS0FBTCxDQUFXRixRQUFiLElBQXVCLENBQXRFLElBQXlFLE1BQWxHO0FBQ0Q7QUFwS0g7QUFBQTtBQUFBLEVBQTBDa0Msb0JBQU0zRCxVQUFoRCIsImZpbGUiOiJzaGFwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi9jb252ZXJ0ZXInXG5pbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZS9jb252ZXJ0ZXInXG5cbnZhciBBWj0vW0EtWl0vZywgXG4gIHI9ZnVuY3Rpb24oYSl7cmV0dXJuICctJythLnRvTG93ZXJDYXNlKCl9LFxuICBjbG96ZWQ9L1okL2dpO1xuICBcbmZ1bmN0aW9uIGFzU3R5bGUoeCl7XG4gIHZhciBhPVtdXG4gIGZvcih2YXIgaSBpbiB4KVxuICAgICEkLmlzRnVuY3Rpb24oeFtpXSkgJiYgYS5wdXNoKGkucmVwbGFjZShBWixyKSsnOicreFtpXSlcbiAgcmV0dXJuIGEuam9pbignOycpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXBlIGV4dGVuZHMgQ29udmVydGVye1xuICBnZXQgdGFnKCl7cmV0dXJuICdkaXYnfVxuICBcbiAgY29udmVydFN0eWxlKGVsKXtcbiAgICBlbC5zdHlsZS5wb3NpdGlvbj0nYWJzb2x1dGUnXG4gICAgZWwuc3R5bGUub3ZlcmZsb3c9J2hpZGRlbidcblxuICAgIHZhciBwYXRoU3R5bGU9e3N0cm9rZTonYmxhY2snLCBzdHJva2VXaWR0aDoyLCBmaWxsT3BhY2l0eTowfSxcbiAgICAgIGJnU3R5bGU9dGhpcy5tYWtlQmFja2dyb3VuZFN0eWxlKCk7XG4gICAgc3VwZXIuY29udmVydFN0eWxlKC4uLmFyZ3VtZW50cylcbiAgICB2YXIgc3R5bGU9dGhpcy53b3JkTW9kZWwuZ2V0RGlyZWN0U3R5bGUoKSxcbiAgICAgIHByb3BDb252ZXJ0ZXI9bmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyhlbC5zdHlsZSx0aGlzLCBwYXRoU3R5bGUsIGJnU3R5bGUpO1xuICAgIHN0eWxlICYmIHN0eWxlLnBhcnNlKFtwcm9wQ29udmVydGVyXSlcbiAgICBpZih0aGlzLnBhdGgpe1xuICAgICAgaWYoZWwuc3R5bGUuYmFja2dyb3VuZClcbiAgICAgICAgcGF0aFN0eWxlLmZpbGxPcGFjaXR5PTBcbiAgICAgIHZhciBiZ0ltYWdlPWVsLnN0eWxlLmJhY2tncm91bmQsXG4gICAgICAgIGdyYWQ9cGF0aFN0eWxlLmdyYWQ7XG4gICAgICBkZWxldGUgcGF0aFN0eWxlLmdyYWQ7ICAgICAgICBcbiAgICAgIFxuICAgICAgdmFyIHN2Zz0nPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+J1xuICAgICAgICAgICsoZ3JhZCA/ICc8ZGVmcz4nK2dyYWQrJzwvZGVmcz4nIDogJycpXG4gICAgICAgICAgK3RoaXMucGF0aCsnIHN0eWxlPVwiJythc1N0eWxlKHBhdGhTdHlsZSkrJ1wiIC8+PC9zdmc+JztcbiAgICAgIHZhciBzdmdJbWFnZT0ndXJsKCcrdGhpcy5kb2MuYXNJbWFnZVVSTChzdmcpKycpJztcbiAgICAgIGJnU3R5bGUuYmFja2dyb3VuZEltYWdlPXN2Z0ltYWdlXG4gICAgICBiZ1N0eWxlLmJhY2tncm91bmRTaXplPScxMDAlIDEwMCUnXG4gICAgfVxuICB9XG4gIG1ha2VCYWNrZ3JvdW5kU3R5bGUoKXtcbiAgICAvL21ha2UgYmFja2dyb3VuZCBlbCB0byBob2xkIHN2ZyBiYWNrZ3JvdW5kXG4gICAgdmFyIGlkPSdzaGFwZScrdGhpcy5kb2MudWlkKClcbiAgICB0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKCdpZCcsaWQpXG4gICAgdmFyIHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCcjJytpZCsnOjpiZWZvcmUnKVxuICAgIHN0eWxlLmNvbnRlbnQ9J1wiXCInXG4gICAgc3R5bGUuekluZGV4PS0xXG4gICAgc3R5bGUucG9zaXRpb249J2Fic29sdXRlJ1xuICAgIHN0eWxlLndpZHRoPScxMDAlJ1xuICAgIHN0eWxlLmhlaWdodD0nMTAwJSdcbiAgICBzdHlsZS5sZWZ0PTBcbiAgICBzdHlsZS50b3A9MFxuICAgIHJldHVybiBzdHlsZVxuICB9XG59XG5cblNoYXBlLlByb3BlcnRpZXM9Y2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG4gIGNvbnN0cnVjdG9yKHN0eWxlLHBhcmVudCwgcGF0aFN0eWxlLCBiZ1N0eWxlKXtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpXG4gICAgdGhpcy5wYXRoU3R5bGU9cGF0aFN0eWxlXG4gICAgdGhpcy5iZ1N0eWxlPWJnU3R5bGVcbiAgfVxuXG4gIHhmcm0oeCl7XG4gICAgdGhpcy5zdHlsZS53aWR0aD14LndpZHRoKydweCdcbiAgICB0aGlzLnN0eWxlLmhlaWdodD14LmhlaWdodCsncHgnXG4gICAgeC54ICYmICh0aGlzLnN0eWxlLmxlZnQ9eC54KydweCcpXG4gICAgeC55ICYmICh0aGlzLnN0eWxlLnRvcD14LnkrJ3B4JylcbiAgICBcbiAgICB4LnJvdGF0aW9uICYmIHRoaXMuc3R5bGVzcygndHJhbnNmb3JtJywncm90YXRlKCcreC5yb3RhdGlvbisnZGVnKScpXG4gICAgXG4gICAgdGhpcy53b3JsZD14XG4gIH1cbiAgbG4oeCl7XG4gICAgeC5jb2xvciAmJiAodGhpcy5wYXRoU3R5bGUuc3Ryb2tlPXguY29sb3IpO1xuICAgIHgud2lkdGghPXVuZGVmaW5lZCAmJiAodGhpcy5wYXRoU3R5bGUuc3Ryb2tlV2lkdGg9eC53aWR0aCsncHgnKTtcbiAgICBcbiAgICBzd2l0Y2goeC5jYXApe1xuICAgIGNhc2UgJ3JuZCc6XG4gICAgICB0aGlzLnBhdGhTdHlsZS5zdHJva2VMaW5lY2FwPSdyb3VuZCdcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIFxuICAgIH1cbiAgICBcbiAgICBpZih4LmRhc2gpe1xuICAgICAgc3dpdGNoKHRoaXMubGluZVN0eWxlKHguZGFzaCkpe1xuICAgICAgY2FzZSAnZG90dGVkJzpcbiAgICAgICAgdGhpcy5wYXRoU3R5bGUuc3Ryb2tlRGFzaGFycmF5PVwiNSw1XCJcbiAgICAgICAgYnJlYWtcbiAgICAgIGJyZWFrXG4gICAgICBjYXNlICdkYXNoZWQnOlxuICAgICAgICB0aGlzLnBhdGhTdHlsZS5zdHJva2VEYXNoYXJyYXk9XCIxMCwxMFwiXG4gICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBzb2xpZEZpbGwoeCl7XG4gICAgdGhpcy5wYXRoU3R5bGUuZmlsbD14XG4gICAgdGhpcy5wYXRoU3R5bGUuZmlsbE9wYWNpdHk9MVxuICB9XG4gIGdyYWRGaWxsKHgpe1xuICAgIGlmKHRoaXMuc3R5bGUuYmFja2dyb3VuZEltYWdlKVxuICAgICAgcmV0dXJuXG4gICAgICBcbiAgICB2YXIgZ3JhZD1bXVxuICAgIHN3aXRjaCh4LnBhdGgpe1xuICAgIGNhc2UgJ2xpbmVhcic6XG4gICAgICBncmFkLnB1c2goJzxsaW5lYXJHcmFkaWVudCBpZD1cImdyYWRcIicpXG4gICAgICBzd2l0Y2goeC5hbmdlbCl7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIGdyYWQucHVzaCgneDE9XCIwJVwiIHkxPVwiMCVcIiB4Mj1cIjEwMCVcIiB5Mj1cIjAlXCI+JylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgOTA6XG4gICAgICAgIGdyYWQucHVzaCgneDE9XCIwJVwiIHkxPVwiMCVcIiB4Mj1cIjAlXCIgeTI9XCIxMDAlXCI+JylcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgMTgwOlxuICAgICAgICBncmFkLnB1c2goJ3gxPVwiMTAwJVwiIHkxPVwiMCVcIiB4Mj1cIjAlXCIgeTI9XCIwJVwiPicpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIDI3MDpcbiAgICAgICAgZ3JhZC5wdXNoKCd4MT1cIjAlXCIgeTE9XCIxMDAlXCIgeDI9XCIwJVwiIHkyPVwiMCVcIj4nKVxuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgZ3JhZC5wdXNoKCc8L2xpbmVhckdyYWRpZW50PicpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2NpcmNsZSc6XG4gICAgICBncmFkLnB1c2goJzxyYWRpYWxHcmFkaWVudCAgaWQ9XCJncmFkXCInKVxuICAgICAgZ3JhZC5wdXNoKCdjeD1cIjUwJVwiIGN5PVwiNTAlXCIgcj1cIjUwJVwiIGZ4PVwiNTAlXCIgZnk9XCI1MCVcIj4nKVxuICAgICAgZ3JhZC5wdXNoKCc8L3JhZGlhbEdyYWRpZW50PicpXG4gICAgICBicmVha1xuICAgIH1cbiAgICB2YXIgZW5kPWdyYWQucG9wKClcbiAgICBmb3IodmFyIGk9MCxsZW49eC5zdG9wcy5sZW5ndGgsYTtpPGxlbjtpKyspXG4gICAgICBncmFkLnB1c2goJzxzdG9wIG9mZnNldD1cIicrKGE9eC5zdG9wc1tpXSkucG9zaXRpb24rJyVcIiBzdHlsZT1cInN0b3Atb3BhY2l0eToxO3N0b3AtY29sb3I6JythLmNvbG9yKydcIi8+JylcbiAgICBncmFkLnB1c2goZW5kKVxuICAgIFxuICAgIHRoaXMucGF0aFN0eWxlLmdyYWQ9Z3JhZC5qb2luKCcgJylcbiAgICB0aGlzLnBhdGhTdHlsZS5maWxsPSd1cmwoI2dyYWQpJ1xuICAgIHRoaXMucGF0aFN0eWxlLmZpbGxPcGFjaXR5PTFcbiAgfVxuICBibGlwRmlsbCh4KXtcbiAgICB0aGlzLnN0eWxlLmJhY2tncm91bmQ9J3VybCgnK3RoaXMuZG9jLmFzSW1hZ2VVUkwoeCkrJyknXG4gICAgdGhpcy5zdHlsZS5iYWNrZ3JvdW5kU2l6ZT0nMTAwJSAxMDAlJ1xuICAgIHRoaXMubm9GaWxsKClcbiAgfVxuICBub0ZpbGwoeCl7XG4gICAgdGhpcy5wYXRoU3R5bGUuZmlsbE9wYWNpdHk9MFxuICB9XG4gIGxuUmVmKHgpe1xuICAgIHRoaXMubG4oeClcbiAgfVxuICBmaWxsUmVmKHgpe1xuICAgIGlmKHRoaXMuc3R5bGUuYmFja2dyb3VuZEltYWdlKVxuICAgICAgcmV0dXJuXG4gICAgXG4gICAgaWYodHlwZW9mKHgucGF0aCkhPSd1bmRlZmluZWQnKVxuICAgICAgcmV0dXJuIHRoaXMuZ3JhZEZpbGwoeCk7XG4gICAgICBcbiAgICBpZih0eXBlb2YoeCk9PSdzdHJpbmcnKVxuICAgICAgdGhpcy5wYXRoU3R5bGUuZmlsbD14XG4gICAgZWxzZSBpZih0eXBlb2YoeC5jb2xvcikhPSd1bmRlZmluZWQnKVxuICAgICAgdGhpcy5wYXRoU3R5bGUuZmlsbD14LmNvbG9yXG4gICAgZWxzZVxuICAgICAgcmV0dXJuO1xuICAgIHRoaXMucGF0aFN0eWxlLmZpbGxPcGFjaXR5PTFcbiAgfVxuICBmb250UmVmKHgpe1xuICAgIHguY29sb3IgJiYgKHRoaXMuc3R5bGUuY29sb3I9eC5jb2xvcik7XG4gICAgeC5mYW1pbHkgJiYgKHRoaXMuc3R5bGUuZm9udEZhbWlseT14LmZhbWlseSk7XG4gIH1cbiAgcGF0aCh4LCB0KXtcbiAgICBzd2l0Y2goeC5zaGFwZSl7XG4gICAgY2FzZSAnbGluZSc6XG4gICAgICB0aGlzLnBhcmVudC5wYXRoPSc8bGluZSB4MT1cIjBcIiB5MT1cIjBcIiB4Mj1cIicrdGhpcy53b3JsZC53aWR0aCsncHRcIiB5Mj1cIicrdGhpcy53b3JsZC5oZWlnaHQrJ3B0XCInXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3JlY3QnOlxuICAgICAgdGhpcy5wYXJlbnQucGF0aD0nPHJlY3Qgd2lkdGg9XCInK3RoaXMud29ybGQud2lkdGgrJ3B0XCIgaGVpZ2h0PVwiJyt0aGlzLndvcmxkLmhlaWdodCsncHRcIidcbiAgICAgIGJyZWFrOyAgXG4gICAgY2FzZSAncm91bmRSZWN0JzpcbiAgICAgIHRoaXMucGFyZW50LnBhdGg9JzxyZWN0IHJ4PVwiJysodD1NYXRoLm1pbih0aGlzLndvcmxkLndpZHRoLCB0aGlzLndvcmxkLmhlaWdodCkvMTIpKydwdFwiIHJ5PVwiJyt0KydwdFwiIHdpZHRoPVwiJyt0aGlzLndvcmxkLndpZHRoKydwdFwiIGhlaWdodD1cIicrdGhpcy53b3JsZC5oZWlnaHQrJ3B0XCInXG4gICAgICBicmVhaztcbiAgICBjYXNlICdlbGxpcHNlJzpcbiAgICAgIHRoaXMucGFyZW50LnBhdGg9JzxlbGxpcHNlIGN4PVwiJyt0aGlzLndvcmxkLndpZHRoLzIrJ3B0XCIgY3k9XCInK3RoaXMud29ybGQuaGVpZ2h0LzIrJ3B0XCIgcng9XCInK3RoaXMud29ybGQud2lkdGgvMisncHRcIiByeT1cIicrdGhpcy53b3JsZC5oZWlnaHQvMisncHRcIidcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAncGF0aCc6XG4gICAgICB0aGlzLnBhcmVudC5wYXRoPSc8cGF0aCBkPVwiJyt4LnBhdGgrJ1wiJ1xuICAgICAgaWYoIWNsb3plZC50ZXN0KHgucGF0aCkpXG4gICAgICAgIHRoaXMubm9GaWxsKClcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIHNwQXV0b0ZpdCgpe1xuICAgIHRoaXMuc3R5bGUuaGVpZ2h0PSdhdXRvJ1xuICB9XG4gIGxJbnMoeCl7XG4gICAgdGhpcy5zdHlsZS5wYWRkaW5nTGVmdD14KydweCdcbiAgfVxuICB0SW5zKHgpe1xuICAgIHRoaXMuc3R5bGUucGFkZGluZ1RvcD14KydweCdcbiAgfVxuICBySW5zKHgpe1xuICAgIHRoaXMuc3R5bGUucGFkZGluZ1JpZ2h0PXgrJ3B4J1xuICB9XG4gIGJJbnMoeCl7XG4gICAgdGhpcy5zdHlsZS5wYWRkaW5nQm90dG9tPXgrJ3B4J1xuICB9XG4gIGFuY2hvcih4KXtcbiAgICB0aGlzLnN0eWxlLmRpc3BsYXk9J3RhYmxlLWNlbGwnXG4gICAgdGhpcy5zdHlsZS52ZXJ0aWNhbEFsaWduPXhcbiAgfVxuICB2ZXJ0KHgpe1xuICAgIHRoaXMuc3R5bGUuaGVpZ2h0PXRoaXMud29ybGQud2lkdGgrJ3B4J1xuICAgIHRoaXMuc3R5bGUud2lkdGg9dGhpcy53b3JsZC5oZWlnaHQrJ3B4J1xuICAgIHZhciBkZWx0YT0odGhpcy53b3JsZC53aWR0aC10aGlzLndvcmxkLmhlaWdodCkvMlxuICAgICAgICAgICAgXG4gICAgdGhpcy5iZ1N0eWxlLmhlaWdodD10aGlzLndvcmxkLmhlaWdodCsncHgnXG4gICAgdGhpcy5iZ1N0eWxlLndpZHRoPXRoaXMud29ybGQud2lkdGgrJ3B4J1xuICAgIHRoaXMuc3R5bGVzcygndHJhbnNmb3JtJywndHJhbnNsYXRlKC0nK2RlbHRhKydwdCwnK2RlbHRhKydwdCkgcm90YXRlKC0nK3grJ2RlZykgJywgdGhpcy5iZ1N0eWxlKVxuXG4gICAgdGhpcy5zdHlsZXNzKCd0cmFuc2Zvcm0nLCd0cmFuc2xhdGUoJytkZWx0YSsncHQsLScrZGVsdGErJ3B0KSByb3RhdGUoJysoeCt0aGlzLndvcmxkLnJvdGF0aW9ufHwwKSsnZGVnKScpXG4gIH1cbn0iXX0=