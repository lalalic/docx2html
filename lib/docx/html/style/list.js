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

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

var _paragraph = require('./paragraph');

var _paragraph2 = _interopRequireDefault(_paragraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListStyleType = { lowerLetter: 'lower-latin', upperLetter: 'upper-latin', lowerRoman: 'lower-roman', upperRoman: 'upper-roman' };
var cssID = _converter2.default.asCssID;

var List = function (_Style) {
	(0, _inherits3.default)(List, _Style);

	function List() {
		(0, _classCallCheck3.default)(this, List);

		var _this = (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).apply(this, arguments));

		_this.levelStyles = {};
		return _this;
	}

	(0, _createClass3.default)(List, [{
		key: '_getPropertiesConverter',
		value: function _getPropertiesConverter(category) {
			if (!category) return null;
			var info = category.split(' '),
			    level = parseInt(info[0]),
			    type = info.length == 1 ? 'list' : info[1],
			    style = this.levelStyles[level],
			    levelSelector = '.' + cssID(this.wordModel.id) + '[level="' + level + '"]';

			if (!style) style = this.levelStyles[level] = {};

			if (style[type]) return style[type];

			switch (type) {
				case 'inline':
					style.inline = new _inline2.default.Properties(this.doc.createStyle(levelSelector + '>li>p>.marker:before'));
					break;
				case 'paragraph':
					style.paragraph = new this.constructor.Pr(this.doc.createStyle(levelSelector + '>li>p'), this, levelSelector);
					break;
				case 'list':
					style.list = new this.constructor.Properties(this.doc.createStyle(levelSelector + '>li>p>.marker:before'), this, levelSelector, cssID(this.wordModel.id) + '_' + level, level);
					break;
			}
			return style[type];
		}
	}]);
	return List;
}(_converter2.default);

exports.default = List;


List.Pr = function (_Paragraph$Properties) {
	(0, _inherits3.default)(Pr, _Paragraph$Properties);

	function Pr(style, parent, levelSelector) {
		(0, _classCallCheck3.default)(this, Pr);

		var _this2 = (0, _possibleConstructorReturn3.default)(this, (Pr.__proto__ || (0, _getPrototypeOf2.default)(Pr)).apply(this, arguments));

		_this2.doc = parent.doc;
		_this2.levelSelector = levelSelector;
		return _this2;
	}

	(0, _createClass3.default)(Pr, [{
		key: 'ind',
		value: function ind(x) {
			var hanging = x.hanging;
			delete x.hanging;
			_paragraph2.default.Properties.prototype.ind.call(this, x);
			x.hanging = hanging;
			x.hanging && (this.doc.createStyle(this.levelSelector + '>li>p>.marker').left = -x.hanging + 'px');
		}
	}]);
	return Pr;
}(_paragraph2.default.Properties);

List.Properties = function (_Style$Properties) {
	(0, _inherits3.default)(Properties, _Style$Properties);

	function Properties(style, parent, levelSelector, counter, level) {
		(0, _classCallCheck3.default)(this, Properties);

		var _this3 = (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));

		_this3.doc = parent.doc;
		_this3.levelSelector = levelSelector;
		_this3.level = level;
		_this3.counter = counter;
		_this3.doc.createStyle(levelSelector).counterReset = counter;
		_this3.doc.createStyle(levelSelector + '>li').counterIncrement = counter;
		return _this3;
	}

	(0, _createClass3.default)(Properties, [{
		key: 'start',
		value: function start(x) {
			this.doc.createStyle(this.levelSelector).counterReset = this.counter + ' ' + (x - 1);
		}
	}, {
		key: 'numFmt',
		value: function numFmt(x) {
			this.type = ListStyleType[x] || x;
		}
	}, {
		key: 'lvlText',
		value: function lvlText(x) {
			this.style.content = '"' + x.replace('%' + (this.level + 1), '" counter(' + this.counter + (!this.type ? '' : ',' + this.type) + ') "') + '"';
		}
	}, {
		key: 'lvlJc',
		value: function lvlJc(x) {}
	}, {
		key: 'lvlPicBulletId',
		value: function lvlPicBulletId(x) {}
	}]);
	return Properties;
}(_converter2.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvbGlzdC5qcyJdLCJuYW1lcyI6WyJMaXN0U3R5bGVUeXBlIiwibG93ZXJMZXR0ZXIiLCJ1cHBlckxldHRlciIsImxvd2VyUm9tYW4iLCJ1cHBlclJvbWFuIiwiY3NzSUQiLCJhc0Nzc0lEIiwiTGlzdCIsImFyZ3VtZW50cyIsImxldmVsU3R5bGVzIiwiY2F0ZWdvcnkiLCJpbmZvIiwic3BsaXQiLCJsZXZlbCIsInBhcnNlSW50IiwidHlwZSIsImxlbmd0aCIsInN0eWxlIiwibGV2ZWxTZWxlY3RvciIsIndvcmRNb2RlbCIsImlkIiwiaW5saW5lIiwiUHJvcGVydGllcyIsImRvYyIsImNyZWF0ZVN0eWxlIiwicGFyYWdyYXBoIiwiY29uc3RydWN0b3IiLCJQciIsImxpc3QiLCJwYXJlbnQiLCJ4IiwiaGFuZ2luZyIsInByb3RvdHlwZSIsImluZCIsImNhbGwiLCJsZWZ0IiwiY291bnRlciIsImNvdW50ZXJSZXNldCIsImNvdW50ZXJJbmNyZW1lbnQiLCJjb250ZW50IiwicmVwbGFjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUlBLGdCQUFjLEVBQUNDLGFBQVksYUFBYixFQUEyQkMsYUFBWSxhQUF2QyxFQUFxREMsWUFBVyxhQUFoRSxFQUE4RUMsWUFBVyxhQUF6RixFQUFsQjtBQUNBLElBQUlDLFFBQU0sb0JBQU1DLE9BQWhCOztJQUVxQkMsSTs7O0FBQ3BCLGlCQUFhO0FBQUE7O0FBQUEsaUlBQ0hDLFNBREc7O0FBRVosUUFBS0MsV0FBTCxHQUFpQixFQUFqQjtBQUZZO0FBR1o7Ozs7MENBRXVCQyxRLEVBQVM7QUFDaEMsT0FBRyxDQUFDQSxRQUFKLEVBQ0MsT0FBTyxJQUFQO0FBQ0QsT0FBSUMsT0FBS0QsU0FBU0UsS0FBVCxDQUFlLEdBQWYsQ0FBVDtBQUFBLE9BQ0NDLFFBQU1DLFNBQVNILEtBQUssQ0FB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LEtBQW5DLEVBQTBDb0IsZ0JBQTFDLEdBQTJERixPQUEzRDtBQVB3RDtBQVF4RDs7QUFURjtBQUFBO0FBQUEsd0JBVU9OLENBVlAsRUFVUztBQUNQLFFBQUtQLEdBQUwsQ0FBU0MsV0FBVCxDQUFxQixLQUFLTixhQUExQixFQUF5Q21CLFlBQXpDLEdBQXNELEtBQUtELE9BQUwsR0FBYSxHQUFiLElBQWtCTixJQUFFLENBQXBCLENBQXREO0FBQ0E7QUFaRjtBQUFBO0FBQUEseUJBYVFBLENBYlIsRUFhVTtBQUNSLFFBQUtmLElBQUwsR0FBVWYsY0FBYzhCLENBQWQsS0FBa0JBLENBQTVCO0FBQ0E7QUFmRjtBQUFBO0FBQUEsMEJBZ0JTQSxDQWhCVCxFQWdCVztBQUNULFFBQUtiLEtBQUwsQ0FBV3NCLE9BQVgsR0FBbUIsTUFBSVQsRUFBRVUsT0FBRixDQUFVLE9BQUssS0FBSzNCLEtBQUwsR0FBVyxDQUFoQixDQUFWLEVBQTZCLGVBQWEsS0FBS3VCLE9BQWxCLElBQTJCLENBQUMsS0FBS3JCLElBQU4sR0FBYSxFQUFiLEdBQWtCLE1BQUksS0FBS0EsSUFBdEQsSUFBNEQsS0FBekYsQ0FBSixHQUFvRyxHQUF2SDtBQUNBO0FBbEJGO0FBQUE7QUFBQSx3QkFtQk9lLENBbkJQLEVBbUJTLENBRVA7QUFyQkY7QUFBQTtBQUFBLGlDQXNCZ0JBLENBdEJoQixFQXNCa0IsQ0FFaEI7QUF4QkY7QUFBQTtBQUFBLEVBQXlDLG9CQUFNUixVQUEvQyIsImZpbGUiOiJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4vY29udmVydGVyJ1xuaW1wb3J0IElubGluZSBmcm9tICcuL2lubGluZSdcbmltcG9ydCBQYXJhZ3JhcGggZnJvbSAnLi9wYXJhZ3JhcGgnXG5cbnZhciBMaXN0U3R5bGVUeXBlPXtsb3dlckxldHRlcjonbG93ZXItbGF0aW4nLHVwcGVyTGV0dGVyOid1cHBlci1sYXRpbicsbG93ZXJSb21hbjonbG93ZXItcm9tYW4nLHVwcGVyUm9tYW46J3VwcGVyLXJvbWFuJ31cbnZhciBjc3NJRD1TdHlsZS5hc0Nzc0lEXG5cdFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdCBleHRlbmRzIFN0eWxle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLmxldmVsU3R5bGVzPXt9XG5cdH1cblx0XG5cdF9nZXRQcm9wZXJ0aWVzQ29udmVydGVyKGNhdGVnb3J5KXtcblx0XHRpZighY2F0ZWdvcnkpXG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdHZhciBpbmZvPWNhdGVnb3J5LnNwbGl0KCcgJyksXG5cdFx0XHRsZXZlbD1wYXJzZUludChpbmZvWzBdKSxcblx0XHRcdHR5cGU9aW5mby5sZW5ndGg9PTEgPyAnbGlzdCcgOiBpbmZvWzFdLFxuXHRcdFx0c3R5bGU9dGhpcy5sZXZlbFN0eWxlc1tsZXZlbF0sXG5cdFx0XHRsZXZlbFNlbGVjdG9yPScuJytjc3NJRCh0aGlzLndvcmRNb2RlbC5pZCkrJ1tsZXZlbD1cIicrbGV2ZWwrJ1wiXSc7XG5cdFx0XG5cdFx0aWYoIXN0eWxlKVxuXHRcdFx0c3R5bGU9dGhpcy5sZXZlbFN0eWxlc1tsZXZlbF09e31cblx0XHRcdFxuXHRcdGlmKHN0eWxlW3R5cGVdKVxuXHRcdFx0cmV0dXJuIHN0eWxlW3R5cGVdO1xuXHRcdFx0XG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgJ2lubGluZSc6XG5cdFx0XHRzdHlsZS5pbmxpbmU9bmV3IElubGluZS5Qcm9wZXJ0aWVzKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGxldmVsU2VsZWN0b3IrJz5saT5wPi5tYXJrZXI6YmVmb3JlJykpXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ3BhcmFncmFwaCc6XG5cdFx0XHRzdHlsZS5wYXJhZ3JhcGg9bmV3IHRoaXMuY29uc3RydWN0b3IuUHIodGhpcy5kb2MuY3JlYXRlU3R5bGUobGV2ZWxTZWxlY3RvcisnPmxpPnAnKSwgdGhpcywgbGV2ZWxTZWxlY3Rvcilcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSAnbGlzdCc6XG5cdFx0XHRzdHlsZS5saXN0PW5ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXModGhpcy5kb2MuY3JlYXRlU3R5bGUobGV2ZWxTZWxlY3RvcisnPmxpPnA+Lm1hcmtlcjpiZWZvcmUnKSwgdGhpcywgbGV2ZWxTZWxlY3RvciwgY3NzSUQodGhpcy53b3JkTW9kZWwuaWQpKydfJytsZXZlbCwgbGV2ZWwpO1xuXHRcdFx0YnJlYWtcblx0XHR9XG5cdFx0cmV0dXJuIHN0eWxlW3R5cGVdXG5cdH1cbn1cblx0XG5MaXN0LlByPWNsYXNzIFByIGV4dGVuZHMgUGFyYWdyYXBoLlByb3BlcnRpZXN7XG5cdGNvbnN0cnVjdG9yKHN0eWxlLHBhcmVudCwgbGV2ZWxTZWxlY3Rvcil7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuZG9jPXBhcmVudC5kb2Ncblx0XHR0aGlzLmxldmVsU2VsZWN0b3I9bGV2ZWxTZWxlY3RvclxuXHR9XG5cdGluZCh4KXtcblx0XHR2YXIgaGFuZ2luZz14Lmhhbmdpbmdcblx0XHRkZWxldGUgeC5oYW5naW5nXG5cdFx0UGFyYWdyYXBoLlByb3BlcnRpZXMucHJvdG90eXBlLmluZC5jYWxsKHRoaXMseClcblx0XHR4Lmhhbmdpbmc9aGFuZ2luZ1xuXHRcdHguaGFuZ2luZyAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy5sZXZlbFNlbGVjdG9yKyc+bGk+cD4ubWFya2VyJykubGVmdD0teC5oYW5naW5nKydweCcpXG5cdH1cbn1cblx0XHRcbkxpc3QuUHJvcGVydGllcz1jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcblx0Y29uc3RydWN0b3Ioc3R5bGUsIHBhcmVudCwgbGV2ZWxTZWxlY3RvciwgY291bnRlciwgbGV2ZWwpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLmRvYz1wYXJlbnQuZG9jXG5cdFx0dGhpcy5sZXZlbFNlbGVjdG9yPWxldmVsU2VsZWN0b3Jcblx0XHR0aGlzLmxldmVsPWxldmVsXG5cdFx0dGhpcy5jb3VudGVyPWNvdW50ZXJcblx0XHR0aGlzLmRvYy5jcmVhdGVTdHlsZShsZXZlbFNlbGVjdG9yKS5jb3VudGVyUmVzZXQ9Y291bnRlclxuXHRcdHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGxldmVsU2VsZWN0b3IrJz5saScpLmNvdW50ZXJJbmNyZW1lbnQ9Y291bnRlclxuXHR9XG5cdHN0YXJ0KHgpe1xuXHRcdHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMubGV2ZWxTZWxlY3RvcikuY291bnRlclJlc2V0PXRoaXMuY291bnRlcisnICcrKHgtMSlcblx0fVxuXHRudW1GbXQoeCl7XG5cdFx0dGhpcy50eXBlPUxpc3RTdHlsZVR5cGVbeF18fHhcblx0fVxuXHRsdmxUZXh0KHgpe1xuXHRcdHRoaXMuc3R5bGUuY29udGVudD0nXCInK3gucmVwbGFjZSgnJScrKHRoaXMubGV2ZWwrMSksJ1wiIGNvdW50ZXIoJyt0aGlzLmNvdW50ZXIrKCF0aGlzLnR5cGUgPyAnJyA6ICcsJyt0aGlzLnR5cGUpKycpIFwiJykrJ1wiJ1xuXHR9XG5cdGx2bEpjKHgpe1xuXHRcdFxuXHR9XG5cdGx2bFBpY0J1bGxldElkKHgpe1xuXHRcdFxuXHR9XG59Il19