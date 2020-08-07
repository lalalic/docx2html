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

var _paragraph = require('./paragraph');

var _paragraph2 = _interopRequireDefault(_paragraph);

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
the priority of css rule should be aligned with word
*/

var gRow = /row|horz/i;

var Table = function (_Style) {
  (0, _inherits3.default)(Table, _Style);

  function Table() {
    (0, _classCallCheck3.default)(this, Table);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).apply(this, arguments));

    _this.target = _this.wordModel.getTarget();
    return _this;
  }

  (0, _createClass3.default)(Table, [{
    key: '_getPropertiesConverter',
    value: function _getPropertiesConverter(category) {
      if (this[category]) return this[category];

      var selector = this.getTableSelector() + '>' + (gRow.test(this.target) ? '.' + this.getPrioritizedSelector() + '>td' : 'tr>.' + this.getPrioritizedSelector());
      switch (category) {
        case 'table':
          return this[category] = new this.constructor.Properties(this.doc.createStyle(this.getTableSelector().replace(/\>\s*tbody$/i, '')), this);
        case 'inline':
          //0012
          return this[category] = new _inline2.default.Properties(this.doc.createStyle(selector + ' span'));
        case 'paragraph':
          //0012
          return this[category] = new _paragraph2.default.Properties(this.doc.createStyle(selector + ' p'));
        case 'cell':
          //0011
          return this[category] = new this.constructor.CellProperties(this.doc.createStyle(selector), this);
      }
    }
  }, {
    key: 'getTableSelector',
    value: function getTableSelector() {
      return '.' + _converter2.default.asCssID(this.wordModel.id) + '>tbody';
    }
  }, {
    key: 'getPrioritizedSelector',
    value: function getPrioritizedSelector() {
      var selector = this.target;
      for (var level = this.PrioritiziedStyles.indexOf(this.target), i = 0; i < level; i++) {
        selector = selector + '[x' + i + ']';
      }return selector;
    }
  }, {
    key: 'PrioritiziedStyles',
    get: function get() {
      return 'nwCell,neCell,swCell,seCell,firstRow,lastRow,firstCol,lastCol,band1Vert,band2Vert,band1Horz,band2Horz'.split(',').reverse();
    }
  }]);
  return Table;
}(_converter2.default);

exports.default = Table;


Table.Properties = function (_Style$Properties) {
  (0, _inherits3.default)(Properties, _Style$Properties);

  function Properties(style, parent) {
    (0, _classCallCheck3.default)(this, Properties);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));

    _this2.parent = parent;
    _this2.doc = parent.doc;
    _this2.tableSelector = parent.getTableSelector();
    return _this2;
  }

  (0, _createClass3.default)(Properties, [{
    key: 'tblBorders',
    value: function tblBorders(x) {
      x.left && (this.doc.createStyle(this.tableSelector + '>tr>td:first-child').borderLeft = this._border(x.left)); //0012
      x.right && (this.doc.createStyle(this.tableSelector + '>tr>td:last-child').borderRight = this._border(x.right)); //0012
      x.top && (this.doc.createStyle(this.tableSelector + '>tr:first-of-type>td').borderTop = this._border(x.top)); //0012
      x.bottom && (this.doc.createStyle(this.tableSelector + '>tr:last-of-type>td').borderBottom = this._border(x.bottom)); //0012

      if (x.insideV) {
        var css = this._border(x.insideV);
        var style = this.doc.createStyle(this.tableSelector + '>tr>td:not(:first-child):not(:last-child)'); //0022
        style.borderRight = style.borderLeft = css;
        this.doc.createStyle(this.tableSelector + '>tr>td:last-child').borderLeft = css; //0012
        this.doc.createStyle(this.tableSelector + '>tr>td:first-child').borderRight = css; //0012
      }

      if (x.insideH) {
        var css = this._border(x.insideH);
        var style = this.doc.createStyle(this.tableSelector + '>tr:not(:first-of-type):not(:last-of-type)>td'); //0022
        style.borderTop = style.borderBottom = css;
        this.doc.createStyle(this.tableSelector + '>tr:last-of-type>td').borderTop = css; //0012
        this.doc.createStyle(this.tableSelector + '>tr:first-of-type>td').borderBottom = css; //0012
      }
    }
  }, {
    key: 'tblCellMar',
    value: function tblCellMar(x) {
      for (var i in x) {
        this.doc.createStyle(this.tableSelector + '>tr>td')['padding' + this.upperFirst(i)] = (x[i] < 1 && x[i] > 0 ? 1 : x[i]) + 'px';
      } //0002
    }
  }, {
    key: 'tblInd',
    value: function tblInd(x) {
      x && (this.style.marginLeft = x + 'px');
    }
  }, {
    key: 'tblW',
    value: function tblW(x) {
      x && x != 'auto' && (this.style.width = x);
    }
  }]);
  return Properties;
}(_converter2.default.Properties);

Table.RowProperties = function (_Style$Properties2) {
  (0, _inherits3.default)(RowProperties, _Style$Properties2);

  function RowProperties(style, parent) {
    (0, _classCallCheck3.default)(this, RowProperties);

    var _this3 = (0, _possibleConstructorReturn3.default)(this, (RowProperties.__proto__ || (0, _getPrototypeOf2.default)(RowProperties)).apply(this, arguments));

    _this3.parent = parent;
    _this3.doc = parent.doc;
    return _this3;
  }

  return RowProperties;
}(_converter2.default.Properties);

Table.CellProperties = function (_Style$Properties3) {
  (0, _inherits3.default)(CellProperties, _Style$Properties3);

  function CellProperties(style, parent) {
    (0, _classCallCheck3.default)(this, CellProperties);

    var _this4 = (0, _possibleConstructorReturn3.default)(this, (CellProperties.__proto__ || (0, _getPrototypeOf2.default)(CellProperties)).apply(this, arguments));

    _this4.parent = parent;
    _this4.doc = parent.doc;
    return _this4;
  }

  (0, _createClass3.default)(CellProperties, [{
    key: 'tcBorders',
    value: function tcBorders(x) {
      var tableSelector = this.parent.getTableSelector(),
          selector = this.parent.getPrioritizedSelector();
      switch (this.parent.target) {
        case 'firstRow':
        case 'lastRow':
        case 'band1Horz':
        case 'band2Horz':
          var style;
          x.left && (this.doc.createStyle(tableSelector + '>.' + selector + '>td:first-child').borderLeft = this._border(x.left)); //0021
          x.right && (this.doc.createStyle(tableSelector + '>.' + selector + '>td:last-child').borderRight = this._border(x.right)); //0021
          x.top && (this.doc.createStyle(tableSelector + '>.' + selector + '>td').borderTop = this._border(x.top)); //0011
          x.bottom && (this.doc.createStyle(tableSelector + '>.' + selector + '>td').borderBottom = this._border(x.bottom)); ////0011
          x.insideV && ((style = this.doc.createStyle(tableSelector + '>.' + selector + '>td:not(:first-child):not(:last-child)')).borderRight = style.borderLeft = this._border(x.insideV)); //0031
          break;
        case 'firstCol':
        case 'lastCol':
        case 'band2Vert':
        case 'band1Vert':
          x.top && (this.doc.createStyle(tableSelector + '>tr:first-of-type>.' + selector).borderTop = this._border(x.top)); //0021
          x.left && (this.doc.createStyle(tableSelector + '>tr:first-of-type>.' + selector).borderLeft = this._border(x.left)); //0021
          x.right && (this.doc.createStyle(tableSelector + '>tr:first-of-type>.' + selector).borderRight = this._border(x.right)); //0021

          x.bottom && (this.doc.createStyle(tableSelector + '>tr:last-of-type>.' + selector).borderBottom = this._border(x.bottom)); //0021
          x.left && (this.doc.createStyle(tableSelector + '>tr:last-of-type>.' + selector).borderLeft = this._border(x.left)); //0021
          x.right && (this.doc.createStyle(tableSelector + '>tr:last-of-type>.' + selector).borderRight = this._border(x.right)); //0021


          x.left && (this.doc.createStyle(tableSelector + '>tr:not(:first-of-type):not(:last-of-type)>.' + selector).borderLeft = this._border(x.left)); //0031
          x.right && (this.doc.createStyle(tableSelector + '>tr:not(:first-of-type):not(:last-of-type)>.' + selector).borderRight = this._border(x.right)); //0031
          break;
        default:
          x.left && (this.doc.createStyle(tableSelector + '>tr>.' + selector).borderLeft = this._border(x.left)); //0011
          x.right && (this.doc.createStyle(tableSelector + '>tr>.' + selector).borderRight = this._border(x.right)); //0011
          x.top && (this.doc.createStyle(tableSelector + '>tr>.' + selector).borderTop = this._border(x.top)); //0011
          x.bottom && (this.doc.createStyle(tableSelector + '>tr>.' + selector).borderBottom = this._border(x.bottom)); //0011
      }
    }
  }, {
    key: 'shd',
    value: function shd(x) {
      this.style.backgroundColor = x;
    }
  }, {
    key: 'gridSpan',
    value: function gridSpan(x) {
      this.parent.content.setAttribute('colspan', x);
    }
  }]);
  return CellProperties;
}(_converter2.default.Properties);

Table.TableStyles = 'firstRow,lastRow,firstCol,lastCol,band1Vert,band2Vert,band1Horz,band2Horz,neCell,nwCell,seCell,swCell'.split(',');
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvdGFibGUuanMiXSwibmFtZXMiOlsiZ1JvdyIsIlRhYmxlIiwiYXJndW1lbnRzIiwidGFyZ2V0Iiwid29yZE1vZGVsIiwiZ2V0VGFyZ2V0IiwiY2F0ZWdvcnkiLCJzZWxlY3RvciIsImdldFRhYmxlU2VsZWN0b3IiLCJ0ZXN0IiwiZ2V0UHJpb3JpdGl6ZWRTZWxlY3RvciIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsImRvYyIsImNyZWF0ZVN0eWxlIiwicmVwbGFjZSIsIklubGluZSIsIlBhcmFncmFwaCIsIkNlbGxQcm9wZXJ0aWVzIiwiU3R5bGUiLCJhc0Nzc0lEIiwiaWQiLCJsZXZlbCIsIlByaW9yaXRpemllZFN0eWxlcyIsImluZGV4T2YiLCJpIiwic3BsaXQiLCJyZXZlcnNlIiwic3R5bGUiLCJwYXJlbnQiLCJ0YWJsZVNlbGVjdG9yIiwieCIsImxlZnQiLCJib3JkZXJMZWZ0IiwiX2JvcmRlciIsInJpZ2h0IiwiYm9yZGVyUmlnaHQiLCJ0b3AiLCJib3JkZXJUb3AiLCJib3R0b20iLCJib3JkZXJCb3R0b20iLCJpbnNpZGVWIiwiY3NzIiwiaW5zaWRlSCIsInVwcGVyRmlyc3QiLCJtYXJnaW5MZWZ0Iiwid2lkdGgiLCJSb3dQcm9wZXJ0aWVzIiwiYmFja2dyb3VuZENvbG9yIiwiY29udGVudCIsInNldEF0dHJpYnV0ZSIsIlRhYmxlU3R5bGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7QUFJQSxJQUFJQSxPQUFLLFdBQVQ7O0lBQ3FCQyxLOzs7QUFDbkIsbUJBQWE7QUFBQTs7QUFBQSxxSUFDRkMsU0FERTs7QUFFWCxVQUFLQyxNQUFMLEdBQVksTUFBS0MsU0FBTCxDQUFlQyxTQUFmLEVBQVo7QUFGVztBQUdaOzs7OzRDQUt1QkMsUSxFQUFTO0FBQy9CLFVBQUcsS0FBS0EsUUFBTCxDQUFILEVB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Q25HSixZQUFFTSxHQUFGLEtBQVUsS0FBS3hCLEdBQUwsQ0FBU0MsV0FBVCxDQUFxQmdCLGdCQUFjLE9BQWQsR0FBc0J2QixRQUEzQyxFQUFxRCtCLFNBQXJELEdBQStELEtBQUtKLE9BQUwsQ0FBYUgsRUFBRU0sR0FBZixDQUF6RSxFQUhGLENBRytGO0FBQzdGTixZQUFFUSxNQUFGLEtBQWEsS0FBSzFCLEdBQUwsQ0FBU0MsV0FBVCxDQUFxQmdCLGdCQUFjLE9BQWQsR0FBc0J2QixRQUEzQyxFQUFxRGlDLFlBQXJELEdBQWtFLEtBQUtOLE9BQUwsQ0FBYUgsRUFBRVEsTUFBZixDQUEvRSxFQWhDSixDQWdDMEc7QUFoQzFHO0FBa0NEO0FBMUNIO0FBQUE7QUFBQSx3QkEyQ01SLENBM0NOLEVBMkNRO0FBQ0osV0FBS0gsS0FBTCxDQUFXb0IsZUFBWCxHQUEyQmpCLENBQTNCO0FBQ0Q7QUE3Q0g7QUFBQTtBQUFBLDZCQThDV0EsQ0E5Q1gsRUE4Q2E7QUFDVCxXQUFLRixNQUFMLENBQVlvQixPQUFaLENBQW9CQyxZQUFwQixDQUFpQyxTQUFqQyxFQUEyQ25CLENBQTNDO0FBQ0Q7QUFoREg7QUFBQTtBQUFBLEVBQWtEWixvQkFBTVAsVUFBeEQ7O0FBbURBWCxNQUFNa0QsV0FBTixHQUFrQix3R0FBd0d6QixLQUF4RyxDQUE4RyxHQUE5RyxDQUFsQiIsImZpbGUiOiJ0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuL2NvbnZlcnRlcidcbmltcG9ydCBQYXJhZ3JhcGggZnJvbSAnLi9wYXJhZ3JhcGgnXG5pbXBvcnQgSW5saW5lIGZyb20gJy4vaW5saW5lJ1xuXG4vKlxudGhlIHByaW9yaXR5IG9mIGNzcyBydWxlIHNob3VsZCBiZSBhbGlnbmVkIHdpdGggd29yZFxuKi9cblxudmFyIGdSb3c9L3Jvd3xob3J6L2lcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYmxlIGV4dGVuZHMgU3R5bGV7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKVxuICAgIHRoaXMudGFyZ2V0PXRoaXMud29yZE1vZGVsLmdldFRhcmdldCgpXG4gIH1cbiAgZ2V0IFByaW9yaXRpemllZFN0eWxlcygpe1xuICAgIHJldHVybiAnbndDZWxsLG5lQ2VsbCxzd0NlbGwsc2VDZWxsLGZpcnN0Um93LGxhc3RSb3csZmlyc3RDb2wsbGFzdENvbCxiYW5kMVZlcnQsYmFuZDJWZXJ0LGJhbmQxSG9yeixiYW5kMkhvcnonLnNwbGl0KCcsJykucmV2ZXJzZSgpXG4gIH1cbiAgXG4gIF9nZXRQcm9wZXJ0aWVzQ29udmVydGVyKGNhdGVnb3J5KXtcbiAgICBpZih0aGlzW2NhdGVnb3J5XSlcbiAgICAgIHJldHVybiB0aGlzW2NhdGVnb3J5XVxuICAgIFxuICAgIHZhciBzZWxlY3Rvcj10aGlzLmdldFRhYmxlU2VsZWN0b3IoKSsnPicrKGdSb3cudGVzdCh0aGlzLnRhcmdldCkgPyAnLicrdGhpcy5nZXRQcmlvcml0aXplZFNlbGVjdG9yKCkrJz50ZCcgOiAndHI+LicrdGhpcy5nZXRQcmlvcml0aXplZFNlbGVjdG9yKCkpICBcbiAgICBzd2l0Y2goY2F0ZWdvcnkpe1xuICAgIGNhc2UgJ3RhYmxlJzpcbiAgICAgIHJldHVybiB0aGlzW2NhdGVnb3J5XT1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Qcm9wZXJ0aWVzKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMuZ2V0VGFibGVTZWxlY3RvcigpLnJlcGxhY2UoL1xcPlxccyp0Ym9keSQvaSwnJykpLCB0aGlzKVxuICAgIGNhc2UgJ2lubGluZSc6Ly8wMDEyXG4gICAgICByZXR1cm4gdGhpc1tjYXRlZ29yeV09bmV3IElubGluZS5Qcm9wZXJ0aWVzKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHNlbGVjdG9yKycgc3BhbicpKVxuICAgIGNhc2UgJ3BhcmFncmFwaCc6Ly8wMDEyXG4gICAgICByZXR1cm4gdGhpc1tjYXRlZ29yeV09bmV3IFBhcmFncmFwaC5Qcm9wZXJ0aWVzKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHNlbGVjdG9yKycgcCcpKVxuICAgIGNhc2UgJ2NlbGwnOi8vMDAxMVxuICAgICAgcmV0dXJuIHRoaXNbY2F0ZWdvcnldPW5ldyB0aGlzLmNvbnN0cnVjdG9yLkNlbGxQcm9wZXJ0aWVzKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHNlbGVjdG9yKSx0aGlzKVxuICAgIH1cbiAgfVxuICBcbiAgZ2V0VGFibGVTZWxlY3Rvcigpe1xuICAgIHJldHVybiAnLicrU3R5bGUuYXNDc3NJRCh0aGlzLndvcmRNb2RlbC5pZCkrJz50Ym9keSdcbiAgfVxuICBcbiAgZ2V0UHJpb3JpdGl6ZWRTZWxlY3Rvcigpe1xuICAgIHZhciBzZWxlY3Rvcj10aGlzLnRhcmdldFxuICAgIGZvcih2YXIgbGV2ZWw9dGhpcy5Qcmlvcml0aXppZWRTdHlsZXMuaW5kZXhPZih0aGlzLnRhcmdldCksaT0wO2k8bGV2ZWw7aSsrKVxuICAgICAgc2VsZWN0b3I9c2VsZWN0b3IrJ1t4JytpKyddJztcbiAgICByZXR1cm4gc2VsZWN0b3JcbiAgfVxufVxuICBcblRhYmxlLlByb3BlcnRpZXM9Y2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG4gIGNvbnN0cnVjdG9yKHN0eWxlLCBwYXJlbnQpe1xuICAgIHN1cGVyKC4uLmFyZ3VtZW50cylcbiAgICB0aGlzLnBhcmVudD1wYXJlbnRcbiAgICB0aGlzLmRvYz1wYXJlbnQuZG9jXG4gICAgdGhpcy50YWJsZVNlbGVjdG9yPXBhcmVudC5nZXRUYWJsZVNlbGVjdG9yKClcbiAgfVxuICB0YmxCb3JkZXJzKHgpe1xuICAgIHgubGVmdCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy50YWJsZVNlbGVjdG9yKyc+dHI+dGQ6Zmlyc3QtY2hpbGQnKS5ib3JkZXJMZWZ0PXRoaXMuX2JvcmRlcih4LmxlZnQpKSAvLzAwMTJcbiAgICB4LnJpZ2h0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLnRhYmxlU2VsZWN0b3IrJz50cj50ZDpsYXN0LWNoaWxkJykuYm9yZGVyUmlnaHQ9dGhpcy5fYm9yZGVyKHgucmlnaHQpKS8vMDAxMlxuICAgIHgudG9wICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLnRhYmxlU2VsZWN0b3IrJz50cjpmaXJzdC1vZi10eXBlPnRkJykuYm9yZGVyVG9wPXRoaXMuX2JvcmRlcih4LnRvcCkpLy8wMDEyXG4gICAgeC5ib3R0b20gJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMudGFibGVTZWxlY3RvcisnPnRyOmxhc3Qtb2YtdHlwZT50ZCcpLmJvcmRlckJvdHRvbT10aGlzLl9ib3JkZXIoeC5ib3R0b20pKS8vMDAxMlxuICAgIFxuICAgIGlmKHguaW5zaWRlVil7XG4gICAgICB2YXIgY3NzPXRoaXMuX2JvcmRlcih4Lmluc2lkZVYpXG4gICAgICB2YXIgc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy50YWJsZVNlbGVjdG9yKyc+dHI+dGQ6bm90KDpmaXJzdC1jaGlsZCk6bm90KDpsYXN0LWNoaWxkKScpLy8wMDIyXG4gICAgICBzdHlsZS5ib3JkZXJSaWdodD1zdHlsZS5ib3JkZXJMZWZ0PWNzc1xuICAgICAgdGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy50YWJsZVNlbGVjdG9yKyc+dHI+dGQ6bGFzdC1jaGlsZCcpLmJvcmRlckxlZnQ9Y3NzLy8wMDEyXG4gICAgICB0aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLnRhYmxlU2VsZWN0b3IrJz50cj50ZDpmaXJzdC1jaGlsZCcpLmJvcmRlclJpZ2h0PWNzcy8vMDAxMlxuICAgIH1cbiAgICBcbiAgICBpZih4Lmluc2lkZUgpe1xuICAgICAgdmFyIGNzcz10aGlzLl9ib3JkZXIoeC5pbnNpZGVIKVxuICAgICAgdmFyIHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMudGFibGVTZWxlY3RvcisnPnRyOm5vdCg6Zmlyc3Qtb2YtdHlwZSk6bm90KDpsYXN0LW9mLXR5cGUpPnRkJykvLzAwMjJcbiAgICAgIHN0eWxlLmJvcmRlclRvcD1zdHlsZS5ib3JkZXJCb3R0b209Y3NzXG4gICAgICB0aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLnRhYmxlU2VsZWN0b3IrJz50cjpsYXN0LW9mLXR5cGU+dGQnKS5ib3JkZXJUb3A9Y3NzLy8wMDEyXG4gICAgICB0aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLnRhYmxlU2VsZWN0b3IrJz50cjpmaXJzdC1vZi10eXBlPnRkJykuYm9yZGVyQm90dG9tPWNzcy8vMDAxMlxuICAgIH1cbiAgfVxuICB0YmxDZWxsTWFyKHgpe1xuICAgIGZvcih2YXIgaSBpbiB4KVxuICAgICAgdGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy50YWJsZVNlbGVjdG9yKyc+dHI+dGQnKVsncGFkZGluZycrdGhpcy51cHBlckZpcnN0KGkpXT0oeFtpXTwxICYmIHhbaV0+MCA/IDEgOiB4W2ldKSsncHgnLy8wMDAyXG4gIH1cbiAgdGJsSW5kKHgpe1xuICAgIHggJiYgKHRoaXMuc3R5bGUubWFyZ2luTGVmdD14KydweCcpXG4gIH1cbiAgdGJsVyh4KXtcbiAgICB4ICYmIHghPSdhdXRvJyAmJiAodGhpcy5zdHlsZS53aWR0aD14KVxuICB9XG59XG4gICAgXG5cblRhYmxlLlJvd1Byb3BlcnRpZXM9Y2xhc3MgUm93UHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG4gIGNvbnN0cnVjdG9yKHN0eWxlLHBhcmVudCl7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKVxuICAgIHRoaXMucGFyZW50PXBhcmVudFxuICAgIHRoaXMuZG9jPXBhcmVudC5kb2NcbiAgfVxufVxuXG5UYWJsZS5DZWxsUHJvcGVydGllcz1jbGFzcyBDZWxsUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG4gIGNvbnN0cnVjdG9yKHN0eWxlLHBhcmVudCl7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKVxuICAgIHRoaXMucGFyZW50PXBhcmVudFxuICAgIHRoaXMuZG9jPXBhcmVudC5kb2NcbiAgfVxuICB0Y0JvcmRlcnMoeCl7XG4gICAgdmFyIHRhYmxlU2VsZWN0b3I9dGhpcy5wYXJlbnQuZ2V0VGFibGVTZWxlY3RvcigpLCBzZWxlY3Rvcj10aGlzLnBhcmVudC5nZXRQcmlvcml0aXplZFNlbGVjdG9yKClcbiAgICBzd2l0Y2godGhpcy5wYXJlbnQudGFyZ2V0KXtcbiAgICAgIGNhc2UgJ2ZpcnN0Um93JzpcbiAgICAgIGNhc2UgJ2xhc3RSb3cnOlxuICAgICAgY2FzZSAnYmFuZDFIb3J6JzpcbiAgICAgIGNhc2UgJ2JhbmQySG9yeic6XG4gICAgICAgIHZhciBzdHlsZTtcbiAgICAgICAgeC5sZWZ0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+Licrc2VsZWN0b3IrJz50ZDpmaXJzdC1jaGlsZCcpLmJvcmRlckxlZnQ9dGhpcy5fYm9yZGVyKHgubGVmdCkpOy8vMDAyMVxuICAgICAgICB4LnJpZ2h0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+Licrc2VsZWN0b3IrJz50ZDpsYXN0LWNoaWxkJykuYm9yZGVyUmlnaHQ9dGhpcy5fYm9yZGVyKHgucmlnaHQpKTsvLzAwMjFcbiAgICAgICAgeC50b3AgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz4uJytzZWxlY3RvcisnPnRkJykuYm9yZGVyVG9wPXRoaXMuX2JvcmRlcih4LnRvcCkpOy8vMDAxMVxuICAgICAgICB4LmJvdHRvbSAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPi4nK3NlbGVjdG9yKyc+dGQnKS5ib3JkZXJCb3R0b209dGhpcy5fYm9yZGVyKHguYm90dG9tKSk7Ly8vLzAwMTFcbiAgICAgICAgeC5pbnNpZGVWICYmICgoc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPi4nK3NlbGVjdG9yKyc+dGQ6bm90KDpmaXJzdC1jaGlsZCk6bm90KDpsYXN0LWNoaWxkKScpKS5ib3JkZXJSaWdodD1zdHlsZS5ib3JkZXJMZWZ0PXRoaXMuX2JvcmRlcih4Lmluc2lkZVYpKTsvLzAwMzFcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2ZpcnN0Q29sJzpcbiAgICAgIGNhc2UgJ2xhc3RDb2wnOlxuICAgICAgY2FzZSAnYmFuZDJWZXJ0JzpcbiAgICAgIGNhc2UgJ2JhbmQxVmVydCc6XG4gICAgICAgIHgudG9wICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI6Zmlyc3Qtb2YtdHlwZT4uJytzZWxlY3RvcikuYm9yZGVyVG9wPXRoaXMuX2JvcmRlcih4LnRvcCkpOy8vMDAyMVxuICAgICAgICB4LmxlZnQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz50cjpmaXJzdC1vZi10eXBlPi4nK3NlbGVjdG9yKS5ib3JkZXJMZWZ0PXRoaXMuX2JvcmRlcih4LmxlZnQpKTsvLzAwMjFcbiAgICAgICAgeC5yaWdodCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyOmZpcnN0LW9mLXR5cGU+Licrc2VsZWN0b3IpLmJvcmRlclJpZ2h0PXRoaXMuX2JvcmRlcih4LnJpZ2h0KSk7Ly8wMDIxXG4gICAgICAgIFxuICAgICAgICB4LmJvdHRvbSAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyOmxhc3Qtb2YtdHlwZT4uJytzZWxlY3RvcikuYm9yZGVyQm90dG9tPXRoaXMuX2JvcmRlcih4LmJvdHRvbSkpOy8vMDAyMVxuICAgICAgICB4LmxlZnQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz50cjpsYXN0LW9mLXR5cGU+Licrc2VsZWN0b3IpLmJvcmRlckxlZnQ9dGhpcy5fYm9yZGVyKHgubGVmdCkpOy8vMDAyMVxuICAgICAgICB4LnJpZ2h0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI6bGFzdC1vZi10eXBlPi4nK3NlbGVjdG9yKS5ib3JkZXJSaWdodD10aGlzLl9ib3JkZXIoeC5yaWdodCkpOy8vMDAyMVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHgubGVmdCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyOm5vdCg6Zmlyc3Qtb2YtdHlwZSk6bm90KDpsYXN0LW9mLXR5cGUpPi4nK3NlbGVjdG9yKS5ib3JkZXJMZWZ0PXRoaXMuX2JvcmRlcih4LmxlZnQpKTsvLzAwMzFcbiAgICAgICAgeC5yaWdodCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyOm5vdCg6Zmlyc3Qtb2YtdHlwZSk6bm90KDpsYXN0LW9mLXR5cGUpPi4nK3NlbGVjdG9yKS5ib3JkZXJSaWdodD10aGlzLl9ib3JkZXIoeC5yaWdodCkpOy8vMDAzMVxuICAgICAgICBicmVha1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgeC5sZWZ0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI+Licrc2VsZWN0b3IpLmJvcmRlckxlZnQ9dGhpcy5fYm9yZGVyKHgubGVmdCkpLy8wMDExXG4gICAgICAgIHgucmlnaHQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz50cj4uJytzZWxlY3RvcikuYm9yZGVyUmlnaHQ9dGhpcy5fYm9yZGVyKHgucmlnaHQpKS8vMDAxMVxuICAgICAgICB4LnRvcCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyPi4nK3NlbGVjdG9yKS5ib3JkZXJUb3A9dGhpcy5fYm9yZGVyKHgudG9wKSkvLzAwMTFcbiAgICAgICAgeC5ib3R0b20gJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz50cj4uJytzZWxlY3RvcikuYm9yZGVyQm90dG9tPXRoaXMuX2JvcmRlcih4LmJvdHRvbSkpLy8wMDExXG4gICAgfVxuICB9XG4gIHNoZCh4KXtcbiAgICB0aGlzLnN0eWxlLmJhY2tncm91bmRDb2xvcj14XG4gIH1cbiAgZ3JpZFNwYW4oeCl7XG4gICAgdGhpcy5wYXJlbnQuY29udGVudC5zZXRBdHRyaWJ1dGUoJ2NvbHNwYW4nLHgpXG4gIH1cbn1cbiAgICBcblRhYmxlLlRhYmxlU3R5bGVzPSdmaXJzdFJvdyxsYXN0Um93LGZpcnN0Q29sLGxhc3RDb2wsYmFuZDFWZXJ0LGJhbmQyVmVydCxiYW5kMUhvcnosYmFuZDJIb3J6LG5lQ2VsbCxud0NlbGwsc2VDZWxsLHN3Q2VsbCcuc3BsaXQoJywnKSJdfQ==