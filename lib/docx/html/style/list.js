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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvbGlzdC5qcyJdLCJuYW1lcyI6WyJMaXN0U3R5bGVUeXBlIiwibG93ZXJMZXR0ZXIiLCJ1cHBlckxldHRlciIsImxvd2VyUm9tYW4iLCJ1cHBlclJvbWFuIiwiY3NzSUQiLCJTdHlsZSIsImFzQ3NzSUQiLCJMaXN0IiwiYXJndW1lbnRzIiwibGV2ZWxTdHlsZXMiLCJjYXRlZ29yeSIsImluZm8iLCJzcGxpdCIsImxldmVsIiwicGFyc2VJbnQiLCJ0eXBlIiwibGVuZ3RoIiwic3R5bGUiLCJsZXZlbFNlbGVjdG9yIiwid29yZE1vZGVsIiwiaWQiLCJpbmxpbmUiLCJJbmxpbmUiLCJQcm9wZXJ0aWVzIiwiZG9jIiwiY3JlYXRlU3R5bGUiLCJwYXJhZ3JhcGgiLCJjb25zdHJ1Y3RvciIsIlByIiwibGlzdCIsInBhcmVudCIsIngiLCJoYW5naW5nIiwiUGFyYWdyYXBoIiwicHJvdG90eXBlIiwiaW5kIiwiY2FsbCIsImxlZnQiLCJjb3VudGVyIiwiY291bnRlclJlc2V0IiwiY291bnRlckluY3JlbWVudCIsImNvbnRlbnQiLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSUEsZ0JBQWMsRUFBQ0MsYUFBWSxhQUFiLEVBQTJCQyxhQUFZLGFBQXZDLEVBQXFEQyxZQUFXLGFBQWhFLEVBQThFQyxZQUFXLGFBQXpGLEVBQWxCO0FBQ0EsSUFBSUMsUUFBTUMsb0JBQU1DLE9BQWhCOztJQUVxQkMsSTs7O0FBQ3BCLGlCQUFhO0FBQUE7O0FBQUEsaUlBQ0hDLFNBREc7O0FBRVosUUFBS0MsV0FBTCxHQUFpQixFQUFqQjtBQUZZO0FBR1o7Ozs7MENBRXVCQyxRLEVBQVM7QUFDaEMsT0FBRyxDQUFDQSxRQUFKLEVBQ0MsT0FBTyxJQUFQO0FBQ0QsT0FBSUMsT0FBS0QsU0FBU0UsS0FBVCxDQUFlLEdBQWYsQ0FBVDtB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T0FBakQ7QUFDQSxTQUFLZCxHQUFMLENBQVNDLFdBQVQsQ0FBcUJQLGdCQUFjLEtBQW5DLEVBQTBDc0IsZ0JBQTFDLEdBQTJERixPQUEzRDtBQVB3RDtBQVF4RDs7QUFURjtBQUFBO0FBQUEsd0JBVU9QLENBVlAsRUFVUztBQUNQLFFBQUtQLEdBQUwsQ0FBU0MsV0FBVCxDQUFxQixLQUFLUCxhQUExQixFQUF5Q3FCLFlBQXpDLEdBQXNELEtBQUtELE9BQUwsR0FBYSxHQUFiLElBQWtCUCxJQUFFLENBQXBCLENBQXREO0FBQ0E7QUFaRjtBQUFBO0FBQUEseUJBYVFBLENBYlIsRUFhVTtBQUNSLFFBQUtoQixJQUFMLEdBQVVoQixjQUFjZ0MsQ0FBZCxLQUFrQkEsQ0FBNUI7QUFDQTtBQWZGO0FBQUE7QUFBQSwwQkFnQlNBLENBaEJULEVBZ0JXO0FBQ1QsUUFBS2QsS0FBTCxDQUFXd0IsT0FBWCxHQUFtQixNQUFJVixFQUFFVyxPQUFGLENBQVUsT0FBSyxLQUFLN0IsS0FBTCxHQUFXLENBQWhCLENBQVYsRUFBNkIsZUFBYSxLQUFLeUIsT0FBbEIsSUFBMkIsQ0FBQyxLQUFLdkIsSUFBTixHQUFhLEVBQWIsR0FBa0IsTUFBSSxLQUFLQSxJQUF0RCxJQUE0RCxLQUF6RixDQUFKLEdBQW9HLEdBQXZIO0FBQ0E7QUFsQkY7QUFBQTtBQUFBLHdCQW1CT2dCLENBbkJQLEVBbUJTLENBRVA7QUFyQkY7QUFBQTtBQUFBLGlDQXNCZ0JBLENBdEJoQixFQXNCa0IsQ0FFaEI7QUF4QkY7QUFBQTtBQUFBLEVBQXlDMUIsb0JBQU1rQixVQUEvQyIsImZpbGUiOiJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4vY29udmVydGVyJ1xuaW1wb3J0IElubGluZSBmcm9tICcuL2lubGluZSdcbmltcG9ydCBQYXJhZ3JhcGggZnJvbSAnLi9wYXJhZ3JhcGgnXG5cbnZhciBMaXN0U3R5bGVUeXBlPXtsb3dlckxldHRlcjonbG93ZXItbGF0aW4nLHVwcGVyTGV0dGVyOid1cHBlci1sYXRpbicsbG93ZXJSb21hbjonbG93ZXItcm9tYW4nLHVwcGVyUm9tYW46J3VwcGVyLXJvbWFuJ31cbnZhciBjc3NJRD1TdHlsZS5hc0Nzc0lEXG5cdFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdCBleHRlbmRzIFN0eWxle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLmxldmVsU3R5bGVzPXt9XG5cdH1cblx0XG5cdF9nZXRQcm9wZXJ0aWVzQ29udmVydGVyKGNhdGVnb3J5KXtcblx0XHRpZighY2F0ZWdvcnkpXG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdHZhciBpbmZvPWNhdGVnb3J5LnNwbGl0KCcgJyksXG5cdFx0XHRsZXZlbD1wYXJzZUludChpbmZvWzBdKSxcblx0XHRcdHR5cGU9aW5mby5sZW5ndGg9PTEgPyAnbGlzdCcgOiBpbmZvWzFdLFxuXHRcdFx0c3R5bGU9dGhpcy5sZXZlbFN0eWxlc1tsZXZlbF0sXG5cdFx0XHRsZXZlbFNlbGVjdG9yPScuJytjc3NJRCh0aGlzLndvcmRNb2RlbC5pZCkrJ1tsZXZlbD1cIicrbGV2ZWwrJ1wiXSc7XG5cdFx0XG5cdFx0aWYoIXN0eWxlKVxuXHRcdFx0c3R5bGU9dGhpcy5sZXZlbFN0eWxlc1tsZXZlbF09e31cblx0XHRcdFxuXHRcdGlmKHN0eWxlW3R5cGVdKVxuXHRcdFx0cmV0dXJuIHN0eWxlW3R5cGVdO1xuXHRcdFx0XG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgJ2lubGluZSc6XG5cdFx0XHRzdHlsZS5pbmxpbmU9bmV3IElubGluZS5Qcm9wZXJ0aWVzKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGxldmVsU2VsZWN0b3IrJz5saT5wPi5tYXJrZXI6YmVmb3JlJykpXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ3BhcmFncmFwaCc6XG5cdFx0XHRzdHlsZS5wYXJhZ3JhcGg9bmV3IHRoaXMuY29uc3RydWN0b3IuUHIodGhpcy5kb2MuY3JlYXRlU3R5bGUobGV2ZWxTZWxlY3RvcisnPmxpPnAnKSwgdGhpcywgbGV2ZWxTZWxlY3Rvcilcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSAnbGlzdCc6XG5cdFx0XHRzdHlsZS5saXN0PW5ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXModGhpcy5kb2MuY3JlYXRlU3R5bGUobGV2ZWxTZWxlY3RvcisnPmxpPnA+Lm1hcmtlcjpiZWZvcmUnKSwgdGhpcywgbGV2ZWxTZWxlY3RvciwgY3NzSUQodGhpcy53b3JkTW9kZWwuaWQpKydfJytsZXZlbCwgbGV2ZWwpO1xuXHRcdFx0YnJlYWtcblx0XHR9XG5cdFx0cmV0dXJuIHN0eWxlW3R5cGVdXG5cdH1cbn1cblx0XG5MaXN0LlByPWNsYXNzIFByIGV4dGVuZHMgUGFyYWdyYXBoLlByb3BlcnRpZXN7XG5cdGNvbnN0cnVjdG9yKHN0eWxlLHBhcmVudCwgbGV2ZWxTZWxlY3Rvcil7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuZG9jPXBhcmVudC5kb2Ncblx0XHR0aGlzLmxldmVsU2VsZWN0b3I9bGV2ZWxTZWxlY3RvclxuXHR9XG5cdGluZCh4KXtcblx0XHR2YXIgaGFuZ2luZz14Lmhhbmdpbmdcblx0XHRkZWxldGUgeC5oYW5naW5nXG5cdFx0UGFyYWdyYXBoLlByb3BlcnRpZXMucHJvdG90eXBlLmluZC5jYWxsKHRoaXMseClcblx0XHR4Lmhhbmdpbmc9aGFuZ2luZ1xuXHRcdHguaGFuZ2luZyAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy5sZXZlbFNlbGVjdG9yKyc+bGk+cD4ubWFya2VyJykubGVmdD0teC5oYW5naW5nKydweCcpXG5cdH1cbn1cblx0XHRcbkxpc3QuUHJvcGVydGllcz1jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcblx0Y29uc3RydWN0b3Ioc3R5bGUsIHBhcmVudCwgbGV2ZWxTZWxlY3RvciwgY291bnRlciwgbGV2ZWwpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLmRvYz1wYXJlbnQuZG9jXG5cdFx0dGhpcy5sZXZlbFNlbGVjdG9yPWxldmVsU2VsZWN0b3Jcblx0XHR0aGlzLmxldmVsPWxldmVsXG5cdFx0dGhpcy5jb3VudGVyPWNvdW50ZXJcblx0XHR0aGlzLmRvYy5jcmVhdGVTdHlsZShsZXZlbFNlbGVjdG9yKS5jb3VudGVyUmVzZXQ9Y291bnRlclxuXHRcdHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGxldmVsU2VsZWN0b3IrJz5saScpLmNvdW50ZXJJbmNyZW1lbnQ9Y291bnRlclxuXHR9XG5cdHN0YXJ0KHgpe1xuXHRcdHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMubGV2ZWxTZWxlY3RvcikuY291bnRlclJlc2V0PXRoaXMuY291bnRlcisnICcrKHgtMSlcblx0fVxuXHRudW1GbXQoeCl7XG5cdFx0dGhpcy50eXBlPUxpc3RTdHlsZVR5cGVbeF18fHhcblx0fVxuXHRsdmxUZXh0KHgpe1xuXHRcdHRoaXMuc3R5bGUuY29udGVudD0nXCInK3gucmVwbGFjZSgnJScrKHRoaXMubGV2ZWwrMSksJ1wiIGNvdW50ZXIoJyt0aGlzLmNvdW50ZXIrKCF0aGlzLnR5cGUgPyAnJyA6ICcsJyt0aGlzLnR5cGUpKycpIFwiJykrJ1wiJ1xuXHR9XG5cdGx2bEpjKHgpe1xuXHRcdFxuXHR9XG5cdGx2bFBpY0J1bGxldElkKHgpe1xuXHRcdFxuXHR9XG59Il19