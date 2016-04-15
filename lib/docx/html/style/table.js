'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

var _paragraph = require('./paragraph');

var _paragraph2 = _interopRequireDefault(_paragraph);

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
the priority of css rule should be aligned with word
*/

var gRow = /row|horz/i;

var Table = function (_Style) {
	_inherits(Table, _Style);

	function Table() {
		_classCallCheck(this, Table);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Table).apply(this, arguments));

		_this.target = _this.wordModel.getTarget();
		return _this;
	}

	_createClass(Table, [{
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
	_inherits(Properties, _Style$Properties);

	function Properties(style, parent) {
		_classCallCheck(this, Properties);

		var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));

		_this2.parent = parent;
		_this2.doc = parent.doc;
		_this2.tableSelector = parent.getTableSelector();
		return _this2;
	}

	_createClass(Properties, [{
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
				this.doc.createStyle(this.tableSelector + '>tr>td')['padding' + this.upperFirst(i)] = (x[i] < 1 && x[i] > 0 ? 1 : x[i]) + 'pt';
			} //0002
		}
	}, {
		key: 'tblInd',
		value: function tblInd(x) {
			x && (this.style.marginLeft = x + 'pt');
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
	_inherits(RowProperties, _Style$Properties2);

	function RowProperties(style, parent) {
		_classCallCheck(this, RowProperties);

		var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(RowProperties).apply(this, arguments));

		_this3.parent = parent;
		_this3.doc = parent.doc;
		return _this3;
	}

	return RowProperties;
}(_converter2.default.Properties);

Table.CellProperties = function (_Style$Properties3) {
	_inherits(CellProperties, _Style$Properties3);

	function CellProperties(style, parent) {
		_classCallCheck(this, CellProperties);

		var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(CellProperties).apply(this, arguments));

		_this4.parent = parent;
		_this4.doc = parent.doc;
		return _this4;
	}

	_createClass(CellProperties, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQSxJQUFJLE9BQUssV0FBTDs7SUFDaUI7OztBQUNwQixVQURvQixLQUNwQixHQUFhO3dCQURPLE9BQ1A7O3FFQURPLG1CQUVWLFlBREc7O0FBRVosUUFBSyxNQUFMLEdBQVksTUFBSyxTQUFMLENBQWUsU0FBZixFQUFaLENBRlk7O0VBQWI7O2NBRG9COzswQ0FTSSxVQUFTO0FBQ2hDLE9BQUcsS0FBSyxRQUFMLENBQUgsRUFDQyxPQUFPLEtBQUssUUFBTCxDQUFQLENBREQ7O0FBR0EsT0FBSSxXQUFTLEtBQUssZ0JBQUwsS0FBd0IsR0FBeEIsSUFBNkIsS0FBSyxJQUFMLENBQVUsS0FBSyxNQUFMLENBQVYsR0FBeUIsTUFBSSxLQUFLLHNCQUFMLEVBQUosR0FBa0MsS0FBbEMsR0FBMEMsU0FBTyxLQUFLLHNCQUFMLEVBQVAsQ0FBaEcsQ0FKbUI7QUFLaEMsV0FBTyxRQUFQO0FBQ0EsU0FBSyxPQUFMO0FBQ0MsWUFBTyxLQUFLLFFBQUwsSUFBZSxJQUFJLEtBQUssV0FBTCxDQUFpQixVQUFqQixDQUE0QixLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLEtBQUssZ0JBQUwsR0FBd0IsT0FBeEIsQ0FBZ0MsY0FBaEMsRUFBK0MsRUFBL0MsQ0FBckIsQ0FBaEMsRUFBMEcsSUFBMUcsQ0FBZixDQURSO0FBREEsU0FHSyxRQUFMOztBQUNDLFlBQU8sS0FBSyxRQUFMLElBQWUsSUFBSSxpQkFBTyxVQUFQLENBQWtCLEtBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsV0FBUyxPQUFULENBQTNDLENBQWYsQ0FEUjtBQUhBLFNBS0ssV0FBTDs7QUFDQyxZQUFPLEtBQUssUUFBTCxJQUFlLElBQUksb0JBQVUsVUFBVixDQUFxQixLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFC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R0FBc0IsUUFBdEIsQ0FBckIsQ0FBcUQsU0FBckQsR0FBK0QsS0FBSyxPQUFMLENBQWEsRUFBRSxHQUFGLENBQTVFLENBQVY7QUFIRCxNQUlDLENBQUUsTUFBRixLQUFhLEtBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsZ0JBQWMsT0FBZCxHQUFzQixRQUF0QixDQUFyQixDQUFxRCxZQUFyRCxHQUFrRSxLQUFLLE9BQUwsQ0FBYSxFQUFFLE1BQUYsQ0FBL0UsQ0FBYixDQUpEO0FBNUJELElBRlc7Ozs7c0JBcUNSLEdBQUU7QUFDTCxRQUFLLEtBQUwsQ0FBVyxlQUFYLEdBQTJCLENBQTNCLENBREs7Ozs7MkJBR0csR0FBRTtBQUNWLFFBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsWUFBcEIsQ0FBaUMsU0FBakMsRUFBMkMsQ0FBM0MsRUFEVTs7OztRQTlDZTtFQUF1QixvQkFBTSxVQUFOLENBQWxEOztBQW1EQSxNQUFNLFdBQU4sR0FBa0Isd0dBQXdHLEtBQXhHLENBQThHLEdBQTlHLENBQWxCIiwiZmlsZSI6InRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4vY29udmVydGVyJ1xuaW1wb3J0IFBhcmFncmFwaCBmcm9tICcuL3BhcmFncmFwaCdcbmltcG9ydCBJbmxpbmUgZnJvbSAnLi9pbmxpbmUnXG5cbi8qXG50aGUgcHJpb3JpdHkgb2YgY3NzIHJ1bGUgc2hvdWxkIGJlIGFsaWduZWQgd2l0aCB3b3JkXG4qL1xuXG52YXIgZ1Jvdz0vcm93fGhvcnovaVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBTdHlsZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy50YXJnZXQ9dGhpcy53b3JkTW9kZWwuZ2V0VGFyZ2V0KClcblx0fVxuXHRnZXQgUHJpb3JpdGl6aWVkU3R5bGVzKCl7XG5cdFx0cmV0dXJuICdud0NlbGwsbmVDZWxsLHN3Q2VsbCxzZUNlbGwsZmlyc3RSb3csbGFzdFJvdyxmaXJzdENvbCxsYXN0Q29sLGJhbmQxVmVydCxiYW5kMlZlcnQsYmFuZDFIb3J6LGJhbmQySG9yeicuc3BsaXQoJywnKS5yZXZlcnNlKClcblx0fVxuXHRcblx0X2dldFByb3BlcnRpZXNDb252ZXJ0ZXIoY2F0ZWdvcnkpe1xuXHRcdGlmKHRoaXNbY2F0ZWdvcnldKVxuXHRcdFx0cmV0dXJuIHRoaXNbY2F0ZWdvcnldXG5cdFx0XG5cdFx0dmFyIHNlbGVjdG9yPXRoaXMuZ2V0VGFibGVTZWxlY3RvcigpKyc+JysoZ1Jvdy50ZXN0KHRoaXMudGFyZ2V0KSA/ICcuJyt0aGlzLmdldFByaW9yaXRpemVkU2VsZWN0b3IoKSsnPnRkJyA6ICd0cj4uJyt0aGlzLmdldFByaW9yaXRpemVkU2VsZWN0b3IoKSlcdFxuXHRcdHN3aXRjaChjYXRlZ29yeSl7XG5cdFx0Y2FzZSAndGFibGUnOlxuXHRcdFx0cmV0dXJuIHRoaXNbY2F0ZWdvcnldPW5ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXModGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy5nZXRUYWJsZVNlbGVjdG9yKCkucmVwbGFjZSgvXFw+XFxzKnRib2R5JC9pLCcnKSksIHRoaXMpXG5cdFx0Y2FzZSAnaW5saW5lJzovLzAwMTJcblx0XHRcdHJldHVybiB0aGlzW2NhdGVnb3J5XT1uZXcgSW5saW5lLlByb3BlcnRpZXModGhpcy5kb2MuY3JlYXRlU3R5bGUoc2VsZWN0b3IrJyBzcGFuJykpXG5cdFx0Y2FzZSAncGFyYWdyYXBoJzovLzAwMTJcblx0XHRcdHJldHVybiB0aGlzW2NhdGVnb3J5XT1uZXcgUGFyYWdyYXBoLlByb3BlcnRpZXModGhpcy5kb2MuY3JlYXRlU3R5bGUoc2VsZWN0b3IrJyBwJykpXG5cdFx0Y2FzZSAnY2VsbCc6Ly8wMDExXG5cdFx0XHRyZXR1cm4gdGhpc1tjYXRlZ29yeV09bmV3IHRoaXMuY29uc3RydWN0b3IuQ2VsbFByb3BlcnRpZXModGhpcy5kb2MuY3JlYXRlU3R5bGUoc2VsZWN0b3IpLHRoaXMpXG5cdFx0fVxuXHR9XG5cdFxuXHRnZXRUYWJsZVNlbGVjdG9yKCl7XG5cdFx0cmV0dXJuICcuJytTdHlsZS5hc0Nzc0lEKHRoaXMud29yZE1vZGVsLmlkKSsnPnRib2R5J1xuXHR9XG5cdFxuXHRnZXRQcmlvcml0aXplZFNlbGVjdG9yKCl7XG5cdFx0dmFyIHNlbGVjdG9yPXRoaXMudGFyZ2V0XG5cdFx0Zm9yKHZhciBsZXZlbD10aGlzLlByaW9yaXRpemllZFN0eWxlcy5pbmRleE9mKHRoaXMudGFyZ2V0KSxpPTA7aTxsZXZlbDtpKyspXG5cdFx0XHRzZWxlY3Rvcj1zZWxlY3RvcisnW3gnK2krJ10nO1xuXHRcdHJldHVybiBzZWxlY3RvclxuXHR9XG59XG5cdFxuVGFibGUuUHJvcGVydGllcz1jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcblx0Y29uc3RydWN0b3Ioc3R5bGUsIHBhcmVudCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMucGFyZW50PXBhcmVudFxuXHRcdHRoaXMuZG9jPXBhcmVudC5kb2Ncblx0XHR0aGlzLnRhYmxlU2VsZWN0b3I9cGFyZW50LmdldFRhYmxlU2VsZWN0b3IoKVxuXHR9XG5cdHRibEJvcmRlcnMoeCl7XG5cdFx0eC5sZWZ0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLnRhYmxlU2VsZWN0b3IrJz50cj50ZDpmaXJzdC1jaGlsZCcpLmJvcmRlckxlZnQ9dGhpcy5fYm9yZGVyKHgubGVmdCkpIC8vMDAxMlxuXHRcdHgucmlnaHQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMudGFibGVTZWxlY3RvcisnPnRyPnRkOmxhc3QtY2hpbGQnKS5ib3JkZXJSaWdodD10aGlzLl9ib3JkZXIoeC5yaWdodCkpLy8wMDEyXG5cdFx0eC50b3AgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMudGFibGVTZWxlY3RvcisnPnRyOmZpcnN0LW9mLXR5cGU+dGQnKS5ib3JkZXJUb3A9dGhpcy5fYm9yZGVyKHgudG9wKSkvLzAwMTJcblx0XHR4LmJvdHRvbSAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy50YWJsZVNlbGVjdG9yKyc+dHI6bGFzdC1vZi10eXBlPnRkJykuYm9yZGVyQm90dG9tPXRoaXMuX2JvcmRlcih4LmJvdHRvbSkpLy8wMDEyXG5cdFx0XG5cdFx0aWYoeC5pbnNpZGVWKXtcblx0XHRcdHZhciBjc3M9dGhpcy5fYm9yZGVyKHguaW5zaWRlVilcblx0XHRcdHZhciBzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLnRhYmxlU2VsZWN0b3IrJz50cj50ZDpub3QoOmZpcnN0LWNoaWxkKTpub3QoOmxhc3QtY2hpbGQpJykvLzAwMjJcblx0XHRcdHN0eWxlLmJvcmRlclJpZ2h0PXN0eWxlLmJvcmRlckxlZnQ9Y3NzXG5cdFx0XHR0aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLnRhYmxlU2VsZWN0b3IrJz50cj50ZDpsYXN0LWNoaWxkJykuYm9yZGVyTGVmdD1jc3MvLzAwMTJcblx0XHRcdHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMudGFibGVTZWxlY3RvcisnPnRyPnRkOmZpcnN0LWNoaWxkJykuYm9yZGVyUmlnaHQ9Y3NzLy8wMDEyXG5cdFx0fVxuXHRcdFxuXHRcdGlmKHguaW5zaWRlSCl7XG5cdFx0XHR2YXIgY3NzPXRoaXMuX2JvcmRlcih4Lmluc2lkZUgpXG5cdFx0XHR2YXIgc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy50YWJsZVNlbGVjdG9yKyc+dHI6bm90KDpmaXJzdC1vZi10eXBlKTpub3QoOmxhc3Qtb2YtdHlwZSk+dGQnKS8vMDAyMlxuXHRcdFx0c3R5bGUuYm9yZGVyVG9wPXN0eWxlLmJvcmRlckJvdHRvbT1jc3Ncblx0XHRcdHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMudGFibGVTZWxlY3RvcisnPnRyOmxhc3Qtb2YtdHlwZT50ZCcpLmJvcmRlclRvcD1jc3MvLzAwMTJcblx0XHRcdHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMudGFibGVTZWxlY3RvcisnPnRyOmZpcnN0LW9mLXR5cGU+dGQnKS5ib3JkZXJCb3R0b209Y3NzLy8wMDEyXG5cdFx0fVxuXHR9XG5cdHRibENlbGxNYXIoeCl7XG5cdFx0Zm9yKHZhciBpIGluIHgpXG5cdFx0XHR0aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLnRhYmxlU2VsZWN0b3IrJz50cj50ZCcpWydwYWRkaW5nJyt0aGlzLnVwcGVyRmlyc3QoaSldPSh4W2ldPDEgJiYgeFtpXT4wID8gMSA6IHhbaV0pKydwdCcvLzAwMDJcblx0fVxuXHR0YmxJbmQoeCl7XG5cdFx0eCAmJiAodGhpcy5zdHlsZS5tYXJnaW5MZWZ0PXgrJ3B0Jylcblx0fVxuXHR0YmxXKHgpe1xuXHRcdHggJiYgeCE9J2F1dG8nICYmICh0aGlzLnN0eWxlLndpZHRoPXgpXG5cdH1cbn1cblx0XHRcblxuVGFibGUuUm93UHJvcGVydGllcz1jbGFzcyBSb3dQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcblx0Y29uc3RydWN0b3Ioc3R5bGUscGFyZW50KXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5wYXJlbnQ9cGFyZW50XG5cdFx0dGhpcy5kb2M9cGFyZW50LmRvY1xuXHR9XG59XG5cblRhYmxlLkNlbGxQcm9wZXJ0aWVzPWNsYXNzIENlbGxQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcblx0Y29uc3RydWN0b3Ioc3R5bGUscGFyZW50KXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5wYXJlbnQ9cGFyZW50XG5cdFx0dGhpcy5kb2M9cGFyZW50LmRvY1xuXHR9XG5cdHRjQm9yZGVycyh4KXtcblx0XHR2YXIgdGFibGVTZWxlY3Rvcj10aGlzLnBhcmVudC5nZXRUYWJsZVNlbGVjdG9yKCksIHNlbGVjdG9yPXRoaXMucGFyZW50LmdldFByaW9yaXRpemVkU2VsZWN0b3IoKVxuXHRcdHN3aXRjaCh0aGlzLnBhcmVudC50YXJnZXQpe1xuXHRcdFx0Y2FzZSAnZmlyc3RSb3cnOlxuXHRcdFx0Y2FzZSAnbGFzdFJvdyc6XG5cdFx0XHRjYXNlICdiYW5kMUhvcnonOlxuXHRcdFx0Y2FzZSAnYmFuZDJIb3J6Jzpcblx0XHRcdFx0dmFyIHN0eWxlO1xuXHRcdFx0XHR4LmxlZnQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz4uJytzZWxlY3RvcisnPnRkOmZpcnN0LWNoaWxkJykuYm9yZGVyTGVmdD10aGlzLl9ib3JkZXIoeC5sZWZ0KSk7Ly8wMDIxXG5cdFx0XHRcdHgucmlnaHQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz4uJytzZWxlY3RvcisnPnRkOmxhc3QtY2hpbGQnKS5ib3JkZXJSaWdodD10aGlzLl9ib3JkZXIoeC5yaWdodCkpOy8vMDAyMVxuXHRcdFx0XHR4LnRvcCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPi4nK3NlbGVjdG9yKyc+dGQnKS5ib3JkZXJUb3A9dGhpcy5fYm9yZGVyKHgudG9wKSk7Ly8wMDExXG5cdFx0XHRcdHguYm90dG9tICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+Licrc2VsZWN0b3IrJz50ZCcpLmJvcmRlckJvdHRvbT10aGlzLl9ib3JkZXIoeC5ib3R0b20pKTsvLy8vMDAxMVxuXHRcdFx0XHR4Lmluc2lkZVYgJiYgKChzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+Licrc2VsZWN0b3IrJz50ZDpub3QoOmZpcnN0LWNoaWxkKTpub3QoOmxhc3QtY2hpbGQpJykpLmJvcmRlclJpZ2h0PXN0eWxlLmJvcmRlckxlZnQ9dGhpcy5fYm9yZGVyKHguaW5zaWRlVikpOy8vMDAzMVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnZmlyc3RDb2wnOlxuXHRcdFx0Y2FzZSAnbGFzdENvbCc6XG5cdFx0XHRjYXNlICdiYW5kMlZlcnQnOlxuXHRcdFx0Y2FzZSAnYmFuZDFWZXJ0Jzpcblx0XHRcdFx0eC50b3AgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz50cjpmaXJzdC1vZi10eXBlPi4nK3NlbGVjdG9yKS5ib3JkZXJUb3A9dGhpcy5fYm9yZGVyKHgudG9wKSk7Ly8wMDIxXG5cdFx0XHRcdHgubGVmdCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyOmZpcnN0LW9mLXR5cGU+Licrc2VsZWN0b3IpLmJvcmRlckxlZnQ9dGhpcy5fYm9yZGVyKHgubGVmdCkpOy8vMDAyMVxuXHRcdFx0XHR4LnJpZ2h0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI6Zmlyc3Qtb2YtdHlwZT4uJytzZWxlY3RvcikuYm9yZGVyUmlnaHQ9dGhpcy5fYm9yZGVyKHgucmlnaHQpKTsvLzAwMjFcblx0XHRcdFx0XG5cdFx0XHRcdHguYm90dG9tICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI6bGFzdC1vZi10eXBlPi4nK3NlbGVjdG9yKS5ib3JkZXJCb3R0b209dGhpcy5fYm9yZGVyKHguYm90dG9tKSk7Ly8wMDIxXG5cdFx0XHRcdHgubGVmdCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyOmxhc3Qtb2YtdHlwZT4uJytzZWxlY3RvcikuYm9yZGVyTGVmdD10aGlzLl9ib3JkZXIoeC5sZWZ0KSk7Ly8wMDIxXG5cdFx0XHRcdHgucmlnaHQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz50cjpsYXN0LW9mLXR5cGU+Licrc2VsZWN0b3IpLmJvcmRlclJpZ2h0PXRoaXMuX2JvcmRlcih4LnJpZ2h0KSk7Ly8wMDIxXG5cdFx0XHRcdFxuXHRcdFx0XHRcblx0XHRcdFx0eC5sZWZ0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI6bm90KDpmaXJzdC1vZi10eXBlKTpub3QoOmxhc3Qtb2YtdHlwZSk+Licrc2VsZWN0b3IpLmJvcmRlckxlZnQ9dGhpcy5fYm9yZGVyKHgubGVmdCkpOy8vMDAzMVxuXHRcdFx0XHR4LnJpZ2h0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI6bm90KDpmaXJzdC1vZi10eXBlKTpub3QoOmxhc3Qtb2YtdHlwZSk+Licrc2VsZWN0b3IpLmJvcmRlclJpZ2h0PXRoaXMuX2JvcmRlcih4LnJpZ2h0KSk7Ly8wMDMxXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR4LmxlZnQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz50cj4uJytzZWxlY3RvcikuYm9yZGVyTGVmdD10aGlzLl9ib3JkZXIoeC5sZWZ0KSkvLzAwMTFcblx0XHRcdFx0eC5yaWdodCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyPi4nK3NlbGVjdG9yKS5ib3JkZXJSaWdodD10aGlzLl9ib3JkZXIoeC5yaWdodCkpLy8wMDExXG5cdFx0XHRcdHgudG9wICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI+Licrc2VsZWN0b3IpLmJvcmRlclRvcD10aGlzLl9ib3JkZXIoeC50b3ApKS8vMDAxMVxuXHRcdFx0XHR4LmJvdHRvbSAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyPi4nK3NlbGVjdG9yKS5ib3JkZXJCb3R0b209dGhpcy5fYm9yZGVyKHguYm90dG9tKSkvLzAwMTFcblx0XHR9XG5cdH1cblx0c2hkKHgpe1xuXHRcdHRoaXMuc3R5bGUuYmFja2dyb3VuZENvbG9yPXhcblx0fVxuXHRncmlkU3Bhbih4KXtcblx0XHR0aGlzLnBhcmVudC5jb250ZW50LnNldEF0dHJpYnV0ZSgnY29sc3BhbicseClcblx0fVxufVxuXHRcdFxuVGFibGUuVGFibGVTdHlsZXM9J2ZpcnN0Um93LGxhc3RSb3csZmlyc3RDb2wsbGFzdENvbCxiYW5kMVZlcnQsYmFuZDJWZXJ0LGJhbmQxSG9yeixiYW5kMkhvcnosbmVDZWxsLG53Q2VsbCxzZUNlbGwsc3dDZWxsJy5zcGxpdCgnLCcpIl19