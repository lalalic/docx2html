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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvdGFibGUuanMiXSwibmFtZXMiOlsiZ1JvdyIsIlRhYmxlIiwiYXJndW1lbnRzIiwidGFyZ2V0Iiwid29yZE1vZGVsIiwiZ2V0VGFyZ2V0IiwiY2F0ZWdvcnkiLCJzZWxlY3RvciIsImdldFRhYmxlU2VsZWN0b3IiLCJ0ZXN0IiwiZ2V0UHJpb3JpdGl6ZWRTZWxlY3RvciIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsImRvYyIsImNyZWF0ZVN0eWxlIiwicmVwbGFjZSIsIkNlbGxQcm9wZXJ0aWVzIiwiYXNDc3NJRCIsImlkIiwibGV2ZWwiLCJQcmlvcml0aXppZWRTdHlsZXMiLCJpbmRleE9mIiwiaSIsInNwbGl0IiwicmV2ZXJzZSIsInN0eWxlIiwicGFyZW50IiwidGFibGVTZWxlY3RvciIsIngiLCJsZWZ0IiwiYm9yZGVyTGVmdCIsIl9ib3JkZXIiLCJyaWdodCIsImJvcmRlclJpZ2h0IiwidG9wIiwiYm9yZGVyVG9wIiwiYm90dG9tIiwiYm9yZGVyQm90dG9tIiwiaW5zaWRlViIsImNzcyIsImluc2lkZUgiLCJ1cHBlckZpcnN0IiwibWFyZ2luTGVmdCIsIndpZHRoIiwiUm93UHJvcGVydGllcyIsImJhY2tncm91bmRDb2xvciIsImNvbnRlbnQiLCJzZXRBdHRyaWJ1dGUiLCJUYWJsZVN0eWxlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOzs7O0FBSUEsSUFBSUEsT0FBSyxXQUFUOztJQUNxQkMsSzs7O0FBQ3BCLGtCQUFhO0FBQUE7O0FBQUEsbUlBQ0hDLFNBREc7O0FBRVosUUFBS0MsTUFBTCxHQUFZLE1BQUtDLFNBQUwsQ0FBZUMsU0FBZixFQUFaO0FBRlk7QUFHWjs7OzswQ0FLdUJDLFEsRUFBUztBQUNoQyxPQUFHLEtBQUtBLFFBQUwsQ0FBSCxFQUNDLE9BQU8sS0FBS0EsUUFBTCxDQUFQOztBQUVE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RCxHQUErRCxLQUFLSixPQUFMLENBQWFILEVBQUVNLEdBQWYsQ0FBekUsRUFIRCxDQUc4RjtBQUM3Rk4sT0FBRVEsTUFBRixLQUFhLEtBQUt2QixHQUFMLENBQVNDLFdBQVQsQ0FBcUJhLGdCQUFjLE9BQWQsR0FBc0JwQixRQUEzQyxFQUFxRDhCLFlBQXJELEdBQWtFLEtBQUtOLE9BQUwsQ0FBYUgsRUFBRVEsTUFBZixDQUEvRSxFQWhDRixDQWdDd0c7QUFoQ3hHO0FBa0NBO0FBMUNGO0FBQUE7QUFBQSxzQkEyQ0tSLENBM0NMLEVBMkNPO0FBQ0wsUUFBS0gsS0FBTCxDQUFXb0IsZUFBWCxHQUEyQmpCLENBQTNCO0FBQ0E7QUE3Q0Y7QUFBQTtBQUFBLDJCQThDVUEsQ0E5Q1YsRUE4Q1k7QUFDVixRQUFLRixNQUFMLENBQVlvQixPQUFaLENBQW9CQyxZQUFwQixDQUFpQyxTQUFqQyxFQUEyQ25CLENBQTNDO0FBQ0E7QUFoREY7QUFBQTtBQUFBLEVBQWtELG9CQUFNaEIsVUFBeEQ7O0FBbURBWCxNQUFNK0MsV0FBTixHQUFrQix3R0FBd0d6QixLQUF4RyxDQUE4RyxHQUE5RyxDQUFsQiIsImZpbGUiOiJ0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuL2NvbnZlcnRlcidcbmltcG9ydCBQYXJhZ3JhcGggZnJvbSAnLi9wYXJhZ3JhcGgnXG5pbXBvcnQgSW5saW5lIGZyb20gJy4vaW5saW5lJ1xuXG4vKlxudGhlIHByaW9yaXR5IG9mIGNzcyBydWxlIHNob3VsZCBiZSBhbGlnbmVkIHdpdGggd29yZFxuKi9cblxudmFyIGdSb3c9L3Jvd3xob3J6L2lcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRhYmxlIGV4dGVuZHMgU3R5bGV7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMudGFyZ2V0PXRoaXMud29yZE1vZGVsLmdldFRhcmdldCgpXG5cdH1cblx0Z2V0IFByaW9yaXRpemllZFN0eWxlcygpe1xuXHRcdHJldHVybiAnbndDZWxsLG5lQ2VsbCxzd0NlbGwsc2VDZWxsLGZpcnN0Um93LGxhc3RSb3csZmlyc3RDb2wsbGFzdENvbCxiYW5kMVZlcnQsYmFuZDJWZXJ0LGJhbmQxSG9yeixiYW5kMkhvcnonLnNwbGl0KCcsJykucmV2ZXJzZSgpXG5cdH1cblx0XG5cdF9nZXRQcm9wZXJ0aWVzQ29udmVydGVyKGNhdGVnb3J5KXtcblx0XHRpZih0aGlzW2NhdGVnb3J5XSlcblx0XHRcdHJldHVybiB0aGlzW2NhdGVnb3J5XVxuXHRcdFxuXHRcdHZhciBzZWxlY3Rvcj10aGlzLmdldFRhYmxlU2VsZWN0b3IoKSsnPicrKGdSb3cudGVzdCh0aGlzLnRhcmdldCkgPyAnLicrdGhpcy5nZXRQcmlvcml0aXplZFNlbGVjdG9yKCkrJz50ZCcgOiAndHI+LicrdGhpcy5nZXRQcmlvcml0aXplZFNlbGVjdG9yKCkpXHRcblx0XHRzd2l0Y2goY2F0ZWdvcnkpe1xuXHRcdGNhc2UgJ3RhYmxlJzpcblx0XHRcdHJldHVybiB0aGlzW2NhdGVnb3J5XT1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Qcm9wZXJ0aWVzKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMuZ2V0VGFibGVTZWxlY3RvcigpLnJlcGxhY2UoL1xcPlxccyp0Ym9keSQvaSwnJykpLCB0aGlzKVxuXHRcdGNhc2UgJ2lubGluZSc6Ly8wMDEyXG5cdFx0XHRyZXR1cm4gdGhpc1tjYXRlZ29yeV09bmV3IElubGluZS5Qcm9wZXJ0aWVzKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHNlbGVjdG9yKycgc3BhbicpKVxuXHRcdGNhc2UgJ3BhcmFncmFwaCc6Ly8wMDEyXG5cdFx0XHRyZXR1cm4gdGhpc1tjYXRlZ29yeV09bmV3IFBhcmFncmFwaC5Qcm9wZXJ0aWVzKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHNlbGVjdG9yKycgcCcpKVxuXHRcdGNhc2UgJ2NlbGwnOi8vMDAxMVxuXHRcdFx0cmV0dXJuIHRoaXNbY2F0ZWdvcnldPW5ldyB0aGlzLmNvbnN0cnVjdG9yLkNlbGxQcm9wZXJ0aWVzKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHNlbGVjdG9yKSx0aGlzKVxuXHRcdH1cblx0fVxuXHRcblx0Z2V0VGFibGVTZWxlY3Rvcigpe1xuXHRcdHJldHVybiAnLicrU3R5bGUuYXNDc3NJRCh0aGlzLndvcmRNb2RlbC5pZCkrJz50Ym9keSdcblx0fVxuXHRcblx0Z2V0UHJpb3JpdGl6ZWRTZWxlY3Rvcigpe1xuXHRcdHZhciBzZWxlY3Rvcj10aGlzLnRhcmdldFxuXHRcdGZvcih2YXIgbGV2ZWw9dGhpcy5Qcmlvcml0aXppZWRTdHlsZXMuaW5kZXhPZih0aGlzLnRhcmdldCksaT0wO2k8bGV2ZWw7aSsrKVxuXHRcdFx0c2VsZWN0b3I9c2VsZWN0b3IrJ1t4JytpKyddJztcblx0XHRyZXR1cm4gc2VsZWN0b3Jcblx0fVxufVxuXHRcblRhYmxlLlByb3BlcnRpZXM9Y2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdGNvbnN0cnVjdG9yKHN0eWxlLCBwYXJlbnQpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnBhcmVudD1wYXJlbnRcblx0XHR0aGlzLmRvYz1wYXJlbnQuZG9jXG5cdFx0dGhpcy50YWJsZVNlbGVjdG9yPXBhcmVudC5nZXRUYWJsZVNlbGVjdG9yKClcblx0fVxuXHR0YmxCb3JkZXJzKHgpe1xuXHRcdHgubGVmdCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy50YWJsZVNlbGVjdG9yKyc+dHI+dGQ6Zmlyc3QtY2hpbGQnKS5ib3JkZXJMZWZ0PXRoaXMuX2JvcmRlcih4LmxlZnQpKSAvLzAwMTJcblx0XHR4LnJpZ2h0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLnRhYmxlU2VsZWN0b3IrJz50cj50ZDpsYXN0LWNoaWxkJykuYm9yZGVyUmlnaHQ9dGhpcy5fYm9yZGVyKHgucmlnaHQpKS8vMDAxMlxuXHRcdHgudG9wICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLnRhYmxlU2VsZWN0b3IrJz50cjpmaXJzdC1vZi10eXBlPnRkJykuYm9yZGVyVG9wPXRoaXMuX2JvcmRlcih4LnRvcCkpLy8wMDEyXG5cdFx0eC5ib3R0b20gJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMudGFibGVTZWxlY3RvcisnPnRyOmxhc3Qtb2YtdHlwZT50ZCcpLmJvcmRlckJvdHRvbT10aGlzLl9ib3JkZXIoeC5ib3R0b20pKS8vMDAxMlxuXHRcdFxuXHRcdGlmKHguaW5zaWRlVil7XG5cdFx0XHR2YXIgY3NzPXRoaXMuX2JvcmRlcih4Lmluc2lkZVYpXG5cdFx0XHR2YXIgc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy50YWJsZVNlbGVjdG9yKyc+dHI+dGQ6bm90KDpmaXJzdC1jaGlsZCk6bm90KDpsYXN0LWNoaWxkKScpLy8wMDIyXG5cdFx0XHRzdHlsZS5ib3JkZXJSaWdodD1zdHlsZS5ib3JkZXJMZWZ0PWNzc1xuXHRcdFx0dGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy50YWJsZVNlbGVjdG9yKyc+dHI+dGQ6bGFzdC1jaGlsZCcpLmJvcmRlckxlZnQ9Y3NzLy8wMDEyXG5cdFx0XHR0aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLnRhYmxlU2VsZWN0b3IrJz50cj50ZDpmaXJzdC1jaGlsZCcpLmJvcmRlclJpZ2h0PWNzcy8vMDAxMlxuXHRcdH1cblx0XHRcblx0XHRpZih4Lmluc2lkZUgpe1xuXHRcdFx0dmFyIGNzcz10aGlzLl9ib3JkZXIoeC5pbnNpZGVIKVxuXHRcdFx0dmFyIHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMudGFibGVTZWxlY3RvcisnPnRyOm5vdCg6Zmlyc3Qtb2YtdHlwZSk6bm90KDpsYXN0LW9mLXR5cGUpPnRkJykvLzAwMjJcblx0XHRcdHN0eWxlLmJvcmRlclRvcD1zdHlsZS5ib3JkZXJCb3R0b209Y3NzXG5cdFx0XHR0aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLnRhYmxlU2VsZWN0b3IrJz50cjpsYXN0LW9mLXR5cGU+dGQnKS5ib3JkZXJUb3A9Y3NzLy8wMDEyXG5cdFx0XHR0aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLnRhYmxlU2VsZWN0b3IrJz50cjpmaXJzdC1vZi10eXBlPnRkJykuYm9yZGVyQm90dG9tPWNzcy8vMDAxMlxuXHRcdH1cblx0fVxuXHR0YmxDZWxsTWFyKHgpe1xuXHRcdGZvcih2YXIgaSBpbiB4KVxuXHRcdFx0dGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy50YWJsZVNlbGVjdG9yKyc+dHI+dGQnKVsncGFkZGluZycrdGhpcy51cHBlckZpcnN0KGkpXT0oeFtpXTwxICYmIHhbaV0+MCA/IDEgOiB4W2ldKSsncHgnLy8wMDAyXG5cdH1cblx0dGJsSW5kKHgpe1xuXHRcdHggJiYgKHRoaXMuc3R5bGUubWFyZ2luTGVmdD14KydweCcpXG5cdH1cblx0dGJsVyh4KXtcblx0XHR4ICYmIHghPSdhdXRvJyAmJiAodGhpcy5zdHlsZS53aWR0aD14KVxuXHR9XG59XG5cdFx0XG5cblRhYmxlLlJvd1Byb3BlcnRpZXM9Y2xhc3MgUm93UHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdGNvbnN0cnVjdG9yKHN0eWxlLHBhcmVudCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMucGFyZW50PXBhcmVudFxuXHRcdHRoaXMuZG9jPXBhcmVudC5kb2Ncblx0fVxufVxuXG5UYWJsZS5DZWxsUHJvcGVydGllcz1jbGFzcyBDZWxsUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdGNvbnN0cnVjdG9yKHN0eWxlLHBhcmVudCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMucGFyZW50PXBhcmVudFxuXHRcdHRoaXMuZG9jPXBhcmVudC5kb2Ncblx0fVxuXHR0Y0JvcmRlcnMoeCl7XG5cdFx0dmFyIHRhYmxlU2VsZWN0b3I9dGhpcy5wYXJlbnQuZ2V0VGFibGVTZWxlY3RvcigpLCBzZWxlY3Rvcj10aGlzLnBhcmVudC5nZXRQcmlvcml0aXplZFNlbGVjdG9yKClcblx0XHRzd2l0Y2godGhpcy5wYXJlbnQudGFyZ2V0KXtcblx0XHRcdGNhc2UgJ2ZpcnN0Um93Jzpcblx0XHRcdGNhc2UgJ2xhc3RSb3cnOlxuXHRcdFx0Y2FzZSAnYmFuZDFIb3J6Jzpcblx0XHRcdGNhc2UgJ2JhbmQySG9yeic6XG5cdFx0XHRcdHZhciBzdHlsZTtcblx0XHRcdFx0eC5sZWZ0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+Licrc2VsZWN0b3IrJz50ZDpmaXJzdC1jaGlsZCcpLmJvcmRlckxlZnQ9dGhpcy5fYm9yZGVyKHgubGVmdCkpOy8vMDAyMVxuXHRcdFx0XHR4LnJpZ2h0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+Licrc2VsZWN0b3IrJz50ZDpsYXN0LWNoaWxkJykuYm9yZGVyUmlnaHQ9dGhpcy5fYm9yZGVyKHgucmlnaHQpKTsvLzAwMjFcblx0XHRcdFx0eC50b3AgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz4uJytzZWxlY3RvcisnPnRkJykuYm9yZGVyVG9wPXRoaXMuX2JvcmRlcih4LnRvcCkpOy8vMDAxMVxuXHRcdFx0XHR4LmJvdHRvbSAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPi4nK3NlbGVjdG9yKyc+dGQnKS5ib3JkZXJCb3R0b209dGhpcy5fYm9yZGVyKHguYm90dG9tKSk7Ly8vLzAwMTFcblx0XHRcdFx0eC5pbnNpZGVWICYmICgoc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPi4nK3NlbGVjdG9yKyc+dGQ6bm90KDpmaXJzdC1jaGlsZCk6bm90KDpsYXN0LWNoaWxkKScpKS5ib3JkZXJSaWdodD1zdHlsZS5ib3JkZXJMZWZ0PXRoaXMuX2JvcmRlcih4Lmluc2lkZVYpKTsvLzAwMzFcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgJ2ZpcnN0Q29sJzpcblx0XHRcdGNhc2UgJ2xhc3RDb2wnOlxuXHRcdFx0Y2FzZSAnYmFuZDJWZXJ0Jzpcblx0XHRcdGNhc2UgJ2JhbmQxVmVydCc6XG5cdFx0XHRcdHgudG9wICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI6Zmlyc3Qtb2YtdHlwZT4uJytzZWxlY3RvcikuYm9yZGVyVG9wPXRoaXMuX2JvcmRlcih4LnRvcCkpOy8vMDAyMVxuXHRcdFx0XHR4LmxlZnQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz50cjpmaXJzdC1vZi10eXBlPi4nK3NlbGVjdG9yKS5ib3JkZXJMZWZ0PXRoaXMuX2JvcmRlcih4LmxlZnQpKTsvLzAwMjFcblx0XHRcdFx0eC5yaWdodCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyOmZpcnN0LW9mLXR5cGU+Licrc2VsZWN0b3IpLmJvcmRlclJpZ2h0PXRoaXMuX2JvcmRlcih4LnJpZ2h0KSk7Ly8wMDIxXG5cdFx0XHRcdFxuXHRcdFx0XHR4LmJvdHRvbSAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyOmxhc3Qtb2YtdHlwZT4uJytzZWxlY3RvcikuYm9yZGVyQm90dG9tPXRoaXMuX2JvcmRlcih4LmJvdHRvbSkpOy8vMDAyMVxuXHRcdFx0XHR4LmxlZnQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz50cjpsYXN0LW9mLXR5cGU+Licrc2VsZWN0b3IpLmJvcmRlckxlZnQ9dGhpcy5fYm9yZGVyKHgubGVmdCkpOy8vMDAyMVxuXHRcdFx0XHR4LnJpZ2h0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI6bGFzdC1vZi10eXBlPi4nK3NlbGVjdG9yKS5ib3JkZXJSaWdodD10aGlzLl9ib3JkZXIoeC5yaWdodCkpOy8vMDAyMVxuXHRcdFx0XHRcblx0XHRcdFx0XG5cdFx0XHRcdHgubGVmdCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyOm5vdCg6Zmlyc3Qtb2YtdHlwZSk6bm90KDpsYXN0LW9mLXR5cGUpPi4nK3NlbGVjdG9yKS5ib3JkZXJMZWZ0PXRoaXMuX2JvcmRlcih4LmxlZnQpKTsvLzAwMzFcblx0XHRcdFx0eC5yaWdodCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyOm5vdCg6Zmlyc3Qtb2YtdHlwZSk6bm90KDpsYXN0LW9mLXR5cGUpPi4nK3NlbGVjdG9yKS5ib3JkZXJSaWdodD10aGlzLl9ib3JkZXIoeC5yaWdodCkpOy8vMDAzMVxuXHRcdFx0XHRicmVha1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0eC5sZWZ0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI+Licrc2VsZWN0b3IpLmJvcmRlckxlZnQ9dGhpcy5fYm9yZGVyKHgubGVmdCkpLy8wMDExXG5cdFx0XHRcdHgucmlnaHQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz50cj4uJytzZWxlY3RvcikuYm9yZGVyUmlnaHQ9dGhpcy5fYm9yZGVyKHgucmlnaHQpKS8vMDAxMVxuXHRcdFx0XHR4LnRvcCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyPi4nK3NlbGVjdG9yKS5ib3JkZXJUb3A9dGhpcy5fYm9yZGVyKHgudG9wKSkvLzAwMTFcblx0XHRcdFx0eC5ib3R0b20gJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz50cj4uJytzZWxlY3RvcikuYm9yZGVyQm90dG9tPXRoaXMuX2JvcmRlcih4LmJvdHRvbSkpLy8wMDExXG5cdFx0fVxuXHR9XG5cdHNoZCh4KXtcblx0XHR0aGlzLnN0eWxlLmJhY2tncm91bmRDb2xvcj14XG5cdH1cblx0Z3JpZFNwYW4oeCl7XG5cdFx0dGhpcy5wYXJlbnQuY29udGVudC5zZXRBdHRyaWJ1dGUoJ2NvbHNwYW4nLHgpXG5cdH1cbn1cblx0XHRcblRhYmxlLlRhYmxlU3R5bGVzPSdmaXJzdFJvdyxsYXN0Um93LGZpcnN0Q29sLGxhc3RDb2wsYmFuZDFWZXJ0LGJhbmQyVmVydCxiYW5kMUhvcnosYmFuZDJIb3J6LG5lQ2VsbCxud0NlbGwsc2VDZWxsLHN3Q2VsbCcuc3BsaXQoJywnKSJdfQ==