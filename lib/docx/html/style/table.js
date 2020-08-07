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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvdGFibGUuanMiXSwibmFtZXMiOlsiZ1JvdyIsIlRhYmxlIiwiYXJndW1lbnRzIiwidGFyZ2V0Iiwid29yZE1vZGVsIiwiZ2V0VGFyZ2V0IiwiY2F0ZWdvcnkiLCJzZWxlY3RvciIsImdldFRhYmxlU2VsZWN0b3IiLCJ0ZXN0IiwiZ2V0UHJpb3JpdGl6ZWRTZWxlY3RvciIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsImRvYyIsImNyZWF0ZVN0eWxlIiwicmVwbGFjZSIsIklubGluZSIsIlBhcmFncmFwaCIsIkNlbGxQcm9wZXJ0aWVzIiwiU3R5bGUiLCJhc0Nzc0lEIiwiaWQiLCJsZXZlbCIsIlByaW9yaXRpemllZFN0eWxlcyIsImluZGV4T2YiLCJpIiwic3BsaXQiLCJyZXZlcnNlIiwic3R5bGUiLCJwYXJlbnQiLCJ0YWJsZVNlbGVjdG9yIiwieCIsImxlZnQiLCJib3JkZXJMZWZ0IiwiX2JvcmRlciIsInJpZ2h0IiwiYm9yZGVyUmlnaHQiLCJ0b3AiLCJib3JkZXJUb3AiLCJib3R0b20iLCJib3JkZXJCb3R0b20iLCJpbnNpZGVWIiwiY3NzIiwiaW5zaWRlSCIsInVwcGVyRmlyc3QiLCJtYXJnaW5MZWZ0Iiwid2lkdGgiLCJSb3dQcm9wZXJ0aWVzIiwiYmFja2dyb3VuZENvbG9yIiwiY29udGVudCIsInNldEF0dHJpYnV0ZSIsIlRhYmxlU3R5bGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7QUFJQSxJQUFJQSxPQUFLLFdBQVQ7O0lBQ3FCQyxLOzs7QUFDcEIsa0JBQWE7QUFBQTs7QUFBQSxtSUFDSEMsU0FERzs7QUFFWixRQUFLQyxNQUFMLEdBQVksTUFBS0MsU0FBTCxDQUFlQyxTQUFmLEVBQVo7QUFGWTtBQUdaOzs7OzBDQUt1QkMsUSxFQUFTO0FBQ2hDLE9BQUcsS0FBS0EsUUFBTCxDQUFILEVB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R0osT0FBRU0sR0FBRixLQUFVLEtBQUt4QixHQUFMLENBQVNDLFdBQVQsQ0FBcUJnQixnQkFBYyxPQUFkLEdBQXNCdkIsUUFBM0MsRUFBcUQrQixTQUFyRCxHQUErRCxLQUFLSixPQUFMLENBQWFILEVBQUVNLEdBQWYsQ0FBekUsRUFIRCxDQUc4RjtBQUM3Rk4sT0FBRVEsTUFBRixLQUFhLEtBQUsxQixHQUFMLENBQVNDLFdBQVQsQ0FBcUJnQixnQkFBYyxPQUFkLEdBQXNCdkIsUUFBM0MsRUFBcURpQyxZQUFyRCxHQUFrRSxLQUFLTixPQUFMLENBQWFILEVBQUVRLE1BQWYsQ0FBL0UsRUFoQ0YsQ0FnQ3dHO0FBaEN4RztBQWtDQTtBQTFDRjtBQUFBO0FBQUEsc0JBMkNLUixDQTNDTCxFQTJDTztBQUNMLFFBQUtILEtBQUwsQ0FBV29CLGVBQVgsR0FBMkJqQixDQUEzQjtBQUNBO0FBN0NGO0FBQUE7QUFBQSwyQkE4Q1VBLENBOUNWLEVBOENZO0FBQ1YsUUFBS0YsTUFBTCxDQUFZb0IsT0FBWixDQUFvQkMsWUFBcEIsQ0FBaUMsU0FBakMsRUFBMkNuQixDQUEzQztBQUNBO0FBaERGO0FBQUE7QUFBQSxFQUFrRFosb0JBQU1QLFVBQXhEOztBQW1EQVgsTUFBTWtELFdBQU4sR0FBa0Isd0dBQXdHekIsS0FBeEcsQ0FBOEcsR0FBOUcsQ0FBbEIiLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSAnLi9jb252ZXJ0ZXInXG5pbXBvcnQgUGFyYWdyYXBoIGZyb20gJy4vcGFyYWdyYXBoJ1xuaW1wb3J0IElubGluZSBmcm9tICcuL2lubGluZSdcblxuLypcbnRoZSBwcmlvcml0eSBvZiBjc3MgcnVsZSBzaG91bGQgYmUgYWxpZ25lZCB3aXRoIHdvcmRcbiovXG5cbnZhciBnUm93PS9yb3d8aG9yei9pXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZSBleHRlbmRzIFN0eWxle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnRhcmdldD10aGlzLndvcmRNb2RlbC5nZXRUYXJnZXQoKVxuXHR9XG5cdGdldCBQcmlvcml0aXppZWRTdHlsZXMoKXtcblx0XHRyZXR1cm4gJ253Q2VsbCxuZUNlbGwsc3dDZWxsLHNlQ2VsbCxmaXJzdFJvdyxsYXN0Um93LGZpcnN0Q29sLGxhc3RDb2wsYmFuZDFWZXJ0LGJhbmQyVmVydCxiYW5kMUhvcnosYmFuZDJIb3J6Jy5zcGxpdCgnLCcpLnJldmVyc2UoKVxuXHR9XG5cdFxuXHRfZ2V0UHJvcGVydGllc0NvbnZlcnRlcihjYXRlZ29yeSl7XG5cdFx0aWYodGhpc1tjYXRlZ29yeV0pXG5cdFx0XHRyZXR1cm4gdGhpc1tjYXRlZ29yeV1cblx0XHRcblx0XHR2YXIgc2VsZWN0b3I9dGhpcy5nZXRUYWJsZVNlbGVjdG9yKCkrJz4nKyhnUm93LnRlc3QodGhpcy50YXJnZXQpID8gJy4nK3RoaXMuZ2V0UHJpb3JpdGl6ZWRTZWxlY3RvcigpKyc+dGQnIDogJ3RyPi4nK3RoaXMuZ2V0UHJpb3JpdGl6ZWRTZWxlY3RvcigpKVx0XG5cdFx0c3dpdGNoKGNhdGVnb3J5KXtcblx0XHRjYXNlICd0YWJsZSc6XG5cdFx0XHRyZXR1cm4gdGhpc1tjYXRlZ29yeV09bmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLmdldFRhYmxlU2VsZWN0b3IoKS5yZXBsYWNlKC9cXD5cXHMqdGJvZHkkL2ksJycpKSwgdGhpcylcblx0XHRjYXNlICdpbmxpbmUnOi8vMDAxMlxuXHRcdFx0cmV0dXJuIHRoaXNbY2F0ZWdvcnldPW5ldyBJbmxpbmUuUHJvcGVydGllcyh0aGlzLmRvYy5jcmVhdGVTdHlsZShzZWxlY3RvcisnIHNwYW4nKSlcblx0XHRjYXNlICdwYXJhZ3JhcGgnOi8vMDAxMlxuXHRcdFx0cmV0dXJuIHRoaXNbY2F0ZWdvcnldPW5ldyBQYXJhZ3JhcGguUHJvcGVydGllcyh0aGlzLmRvYy5jcmVhdGVTdHlsZShzZWxlY3RvcisnIHAnKSlcblx0XHRjYXNlICdjZWxsJzovLzAwMTFcblx0XHRcdHJldHVybiB0aGlzW2NhdGVnb3J5XT1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5DZWxsUHJvcGVydGllcyh0aGlzLmRvYy5jcmVhdGVTdHlsZShzZWxlY3RvciksdGhpcylcblx0XHR9XG5cdH1cblx0XG5cdGdldFRhYmxlU2VsZWN0b3IoKXtcblx0XHRyZXR1cm4gJy4nK1N0eWxlLmFzQ3NzSUQodGhpcy53b3JkTW9kZWwuaWQpKyc+dGJvZHknXG5cdH1cblx0XG5cdGdldFByaW9yaXRpemVkU2VsZWN0b3IoKXtcblx0XHR2YXIgc2VsZWN0b3I9dGhpcy50YXJnZXRcblx0XHRmb3IodmFyIGxldmVsPXRoaXMuUHJpb3JpdGl6aWVkU3R5bGVzLmluZGV4T2YodGhpcy50YXJnZXQpLGk9MDtpPGxldmVsO2krKylcblx0XHRcdHNlbGVjdG9yPXNlbGVjdG9yKydbeCcraSsnXSc7XG5cdFx0cmV0dXJuIHNlbGVjdG9yXG5cdH1cbn1cblx0XG5UYWJsZS5Qcm9wZXJ0aWVzPWNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRjb25zdHJ1Y3RvcihzdHlsZSwgcGFyZW50KXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5wYXJlbnQ9cGFyZW50XG5cdFx0dGhpcy5kb2M9cGFyZW50LmRvY1xuXHRcdHRoaXMudGFibGVTZWxlY3Rvcj1wYXJlbnQuZ2V0VGFibGVTZWxlY3RvcigpXG5cdH1cblx0dGJsQm9yZGVycyh4KXtcblx0XHR4LmxlZnQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMudGFibGVTZWxlY3RvcisnPnRyPnRkOmZpcnN0LWNoaWxkJykuYm9yZGVyTGVmdD10aGlzLl9ib3JkZXIoeC5sZWZ0KSkgLy8wMDEyXG5cdFx0eC5yaWdodCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy50YWJsZVNlbGVjdG9yKyc+dHI+dGQ6bGFzdC1jaGlsZCcpLmJvcmRlclJpZ2h0PXRoaXMuX2JvcmRlcih4LnJpZ2h0KSkvLzAwMTJcblx0XHR4LnRvcCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy50YWJsZVNlbGVjdG9yKyc+dHI6Zmlyc3Qtb2YtdHlwZT50ZCcpLmJvcmRlclRvcD10aGlzLl9ib3JkZXIoeC50b3ApKS8vMDAxMlxuXHRcdHguYm90dG9tICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLnRhYmxlU2VsZWN0b3IrJz50cjpsYXN0LW9mLXR5cGU+dGQnKS5ib3JkZXJCb3R0b209dGhpcy5fYm9yZGVyKHguYm90dG9tKSkvLzAwMTJcblx0XHRcblx0XHRpZih4Lmluc2lkZVYpe1xuXHRcdFx0dmFyIGNzcz10aGlzLl9ib3JkZXIoeC5pbnNpZGVWKVxuXHRcdFx0dmFyIHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMudGFibGVTZWxlY3RvcisnPnRyPnRkOm5vdCg6Zmlyc3QtY2hpbGQpOm5vdCg6bGFzdC1jaGlsZCknKS8vMDAyMlxuXHRcdFx0c3R5bGUuYm9yZGVyUmlnaHQ9c3R5bGUuYm9yZGVyTGVmdD1jc3Ncblx0XHRcdHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMudGFibGVTZWxlY3RvcisnPnRyPnRkOmxhc3QtY2hpbGQnKS5ib3JkZXJMZWZ0PWNzcy8vMDAxMlxuXHRcdFx0dGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy50YWJsZVNlbGVjdG9yKyc+dHI+dGQ6Zmlyc3QtY2hpbGQnKS5ib3JkZXJSaWdodD1jc3MvLzAwMTJcblx0XHR9XG5cdFx0XG5cdFx0aWYoeC5pbnNpZGVIKXtcblx0XHRcdHZhciBjc3M9dGhpcy5fYm9yZGVyKHguaW5zaWRlSClcblx0XHRcdHZhciBzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLnRhYmxlU2VsZWN0b3IrJz50cjpub3QoOmZpcnN0LW9mLXR5cGUpOm5vdCg6bGFzdC1vZi10eXBlKT50ZCcpLy8wMDIyXG5cdFx0XHRzdHlsZS5ib3JkZXJUb3A9c3R5bGUuYm9yZGVyQm90dG9tPWNzc1xuXHRcdFx0dGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy50YWJsZVNlbGVjdG9yKyc+dHI6bGFzdC1vZi10eXBlPnRkJykuYm9yZGVyVG9wPWNzcy8vMDAxMlxuXHRcdFx0dGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy50YWJsZVNlbGVjdG9yKyc+dHI6Zmlyc3Qtb2YtdHlwZT50ZCcpLmJvcmRlckJvdHRvbT1jc3MvLzAwMTJcblx0XHR9XG5cdH1cblx0dGJsQ2VsbE1hcih4KXtcblx0XHRmb3IodmFyIGkgaW4geClcblx0XHRcdHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMudGFibGVTZWxlY3RvcisnPnRyPnRkJylbJ3BhZGRpbmcnK3RoaXMudXBwZXJGaXJzdChpKV09KHhbaV08MSAmJiB4W2ldPjAgPyAxIDogeFtpXSkrJ3B4Jy8vMDAwMlxuXHR9XG5cdHRibEluZCh4KXtcblx0XHR4ICYmICh0aGlzLnN0eWxlLm1hcmdpbkxlZnQ9eCsncHgnKVxuXHR9XG5cdHRibFcoeCl7XG5cdFx0eCAmJiB4IT0nYXV0bycgJiYgKHRoaXMuc3R5bGUud2lkdGg9eClcblx0fVxufVxuXHRcdFxuXG5UYWJsZS5Sb3dQcm9wZXJ0aWVzPWNsYXNzIFJvd1Byb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRjb25zdHJ1Y3RvcihzdHlsZSxwYXJlbnQpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnBhcmVudD1wYXJlbnRcblx0XHR0aGlzLmRvYz1wYXJlbnQuZG9jXG5cdH1cbn1cblxuVGFibGUuQ2VsbFByb3BlcnRpZXM9Y2xhc3MgQ2VsbFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRjb25zdHJ1Y3RvcihzdHlsZSxwYXJlbnQpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnBhcmVudD1wYXJlbnRcblx0XHR0aGlzLmRvYz1wYXJlbnQuZG9jXG5cdH1cblx0dGNCb3JkZXJzKHgpe1xuXHRcdHZhciB0YWJsZVNlbGVjdG9yPXRoaXMucGFyZW50LmdldFRhYmxlU2VsZWN0b3IoKSwgc2VsZWN0b3I9dGhpcy5wYXJlbnQuZ2V0UHJpb3JpdGl6ZWRTZWxlY3RvcigpXG5cdFx0c3dpdGNoKHRoaXMucGFyZW50LnRhcmdldCl7XG5cdFx0XHRjYXNlICdmaXJzdFJvdyc6XG5cdFx0XHRjYXNlICdsYXN0Um93Jzpcblx0XHRcdGNhc2UgJ2JhbmQxSG9yeic6XG5cdFx0XHRjYXNlICdiYW5kMkhvcnonOlxuXHRcdFx0XHR2YXIgc3R5bGU7XG5cdFx0XHRcdHgubGVmdCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPi4nK3NlbGVjdG9yKyc+dGQ6Zmlyc3QtY2hpbGQnKS5ib3JkZXJMZWZ0PXRoaXMuX2JvcmRlcih4LmxlZnQpKTsvLzAwMjFcblx0XHRcdFx0eC5yaWdodCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPi4nK3NlbGVjdG9yKyc+dGQ6bGFzdC1jaGlsZCcpLmJvcmRlclJpZ2h0PXRoaXMuX2JvcmRlcih4LnJpZ2h0KSk7Ly8wMDIxXG5cdFx0XHRcdHgudG9wICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+Licrc2VsZWN0b3IrJz50ZCcpLmJvcmRlclRvcD10aGlzLl9ib3JkZXIoeC50b3ApKTsvLzAwMTFcblx0XHRcdFx0eC5ib3R0b20gJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz4uJytzZWxlY3RvcisnPnRkJykuYm9yZGVyQm90dG9tPXRoaXMuX2JvcmRlcih4LmJvdHRvbSkpOy8vLy8wMDExXG5cdFx0XHRcdHguaW5zaWRlViAmJiAoKHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz4uJytzZWxlY3RvcisnPnRkOm5vdCg6Zmlyc3QtY2hpbGQpOm5vdCg6bGFzdC1jaGlsZCknKSkuYm9yZGVyUmlnaHQ9c3R5bGUuYm9yZGVyTGVmdD10aGlzLl9ib3JkZXIoeC5pbnNpZGVWKSk7Ly8wMDMxXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlICdmaXJzdENvbCc6XG5cdFx0XHRjYXNlICdsYXN0Q29sJzpcblx0XHRcdGNhc2UgJ2JhbmQyVmVydCc6XG5cdFx0XHRjYXNlICdiYW5kMVZlcnQnOlxuXHRcdFx0XHR4LnRvcCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyOmZpcnN0LW9mLXR5cGU+Licrc2VsZWN0b3IpLmJvcmRlclRvcD10aGlzLl9ib3JkZXIoeC50b3ApKTsvLzAwMjFcblx0XHRcdFx0eC5sZWZ0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI6Zmlyc3Qtb2YtdHlwZT4uJytzZWxlY3RvcikuYm9yZGVyTGVmdD10aGlzLl9ib3JkZXIoeC5sZWZ0KSk7Ly8wMDIxXG5cdFx0XHRcdHgucmlnaHQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz50cjpmaXJzdC1vZi10eXBlPi4nK3NlbGVjdG9yKS5ib3JkZXJSaWdodD10aGlzLl9ib3JkZXIoeC5yaWdodCkpOy8vMDAyMVxuXHRcdFx0XHRcblx0XHRcdFx0eC5ib3R0b20gJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz50cjpsYXN0LW9mLXR5cGU+Licrc2VsZWN0b3IpLmJvcmRlckJvdHRvbT10aGlzLl9ib3JkZXIoeC5ib3R0b20pKTsvLzAwMjFcblx0XHRcdFx0eC5sZWZ0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI6bGFzdC1vZi10eXBlPi4nK3NlbGVjdG9yKS5ib3JkZXJMZWZ0PXRoaXMuX2JvcmRlcih4LmxlZnQpKTsvLzAwMjFcblx0XHRcdFx0eC5yaWdodCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyOmxhc3Qtb2YtdHlwZT4uJytzZWxlY3RvcikuYm9yZGVyUmlnaHQ9dGhpcy5fYm9yZGVyKHgucmlnaHQpKTsvLzAwMjFcblx0XHRcdFx0XG5cdFx0XHRcdFxuXHRcdFx0XHR4LmxlZnQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz50cjpub3QoOmZpcnN0LW9mLXR5cGUpOm5vdCg6bGFzdC1vZi10eXBlKT4uJytzZWxlY3RvcikuYm9yZGVyTGVmdD10aGlzLl9ib3JkZXIoeC5sZWZ0KSk7Ly8wMDMxXG5cdFx0XHRcdHgucmlnaHQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz50cjpub3QoOmZpcnN0LW9mLXR5cGUpOm5vdCg6bGFzdC1vZi10eXBlKT4uJytzZWxlY3RvcikuYm9yZGVyUmlnaHQ9dGhpcy5fYm9yZGVyKHgucmlnaHQpKTsvLzAwMzFcblx0XHRcdFx0YnJlYWtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHgubGVmdCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyPi4nK3NlbGVjdG9yKS5ib3JkZXJMZWZ0PXRoaXMuX2JvcmRlcih4LmxlZnQpKS8vMDAxMVxuXHRcdFx0XHR4LnJpZ2h0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI+Licrc2VsZWN0b3IpLmJvcmRlclJpZ2h0PXRoaXMuX2JvcmRlcih4LnJpZ2h0KSkvLzAwMTFcblx0XHRcdFx0eC50b3AgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz50cj4uJytzZWxlY3RvcikuYm9yZGVyVG9wPXRoaXMuX2JvcmRlcih4LnRvcCkpLy8wMDExXG5cdFx0XHRcdHguYm90dG9tICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI+Licrc2VsZWN0b3IpLmJvcmRlckJvdHRvbT10aGlzLl9ib3JkZXIoeC5ib3R0b20pKS8vMDAxMVxuXHRcdH1cblx0fVxuXHRzaGQoeCl7XG5cdFx0dGhpcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9eFxuXHR9XG5cdGdyaWRTcGFuKHgpe1xuXHRcdHRoaXMucGFyZW50LmNvbnRlbnQuc2V0QXR0cmlidXRlKCdjb2xzcGFuJyx4KVxuXHR9XG59XG5cdFx0XG5UYWJsZS5UYWJsZVN0eWxlcz0nZmlyc3RSb3csbGFzdFJvdyxmaXJzdENvbCxsYXN0Q29sLGJhbmQxVmVydCxiYW5kMlZlcnQsYmFuZDFIb3J6LGJhbmQySG9yeixuZUNlbGwsbndDZWxsLHNlQ2VsbCxzd0NlbGwnLnNwbGl0KCcsJykiXX0=