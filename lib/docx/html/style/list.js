'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

var _paragraph = require('./paragraph');

var _paragraph2 = _interopRequireDefault(_paragraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListStyleType = { lowerLetter: 'lower-latin', upperLetter: 'upper-latin', lowerRoman: 'lower-roman', upperRoman: 'upper-roman' };
var cssID = _converter2.default.asCssID;

var List = function (_Style) {
	_inherits(List, _Style);

	function List() {
		_classCallCheck(this, List);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(List).apply(this, arguments));

		_this.levelStyles = {};
		return _this;
	}

	_createClass(List, [{
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
	_inherits(Pr, _Paragraph$Properties);

	function Pr(style, parent, levelSelector) {
		_classCallCheck(this, Pr);

		var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Pr).apply(this, arguments));

		_this2.doc = parent.doc;
		_this2.levelSelector = levelSelector;
		return _this2;
	}

	_createClass(Pr, [{
		key: 'ind',
		value: function ind(x) {
			var hanging = x.hanging;
			delete x.hanging;
			_paragraph2.default.Properties.prototype.ind.call(this, x);
			x.hanging = hanging;
			x.hanging && (this.doc.createStyle(this.levelSelector + '>li>p>.marker').left = -x.hanging + 'pt');
		}
	}]);

	return Pr;
}(_paragraph2.default.Properties);

List.Properties = function (_Style$Properties) {
	_inherits(Properties, _Style$Properties);

	function Properties(style, parent, levelSelector, counter, level) {
		_classCallCheck(this, Properties);

		var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));

		_this3.doc = parent.doc;
		_this3.levelSelector = levelSelector;
		_this3.level = level;
		_this3.counter = counter;
		_this3.doc.createStyle(levelSelector).counterReset = counter;
		_this3.doc.createStyle(levelSelector + '>li').counterIncrement = counter;
		return _this3;
	}

	_createClass(Properties, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvbGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSSxnQkFBYyxFQUFDLGFBQVksYUFBWixFQUEwQixhQUFZLGFBQVosRUFBMEIsWUFBVyxhQUFYLEVBQXlCLFlBQVcsYUFBWCxFQUE1RjtBQUNKLElBQUksUUFBTSxvQkFBTSxPQUFOOztJQUVXOzs7QUFDcEIsVUFEb0IsSUFDcEIsR0FBYTt3QkFETyxNQUNQOztxRUFETyxrQkFFVixZQURHOztBQUVaLFFBQUssV0FBTCxHQUFpQixFQUFqQixDQUZZOztFQUFiOztjQURvQjs7MENBTUksVUFBUztBQUNoQyxPQUFHLENBQUMsUUFBRCxFQUNGLE9BQU8sSUFBUCxDQUREO0FBRUEsT0FBSSxPQUFLLFNBQVMsS0FBVCxDQUFlLEdBQWYsQ0FBTDtPQUNILFFBQU0sU0FBUyxLQUFLLENBQUwsQ0FBVCxDQUFOO09BQ0EsT0FBSyxLQUFLLE1BQUwsSUFBYSxDQUFiLEdBQWlCLE1BQWpCLEdBQTBCLEtBQUssQ0FBTCxDQUExQjtPQUNMLFFBQU0sS0FBSyxXQUFMLENBQWlCLEtBQWpCLENBQU47T0FDQSxnQkFBYyxNQUFJLE1BQU0sS0FBSyxTQUFMLENBQWUsRUFBZixDQUFWLEdBQTZCLFVBQTdCLEdBQXdDLEtBQXhDLEdBQThDLElBQTlDLENBUGlCOztBQVNoQyxPQUFHLENBQUMsS0FBRCxFQUNGLFFBQU0sS0FBSyxXQUFMLENBQWlCLEtBQWpCLElBQXdCLEVBQXhCLENBRFA7O0FBR0EsT0FBRyxNQUFNLElBQU4sQ0FBSCxFQUNDLE9BQU8sTUFBTSxJQUFOLENBQVAsQ0FERDs7QUFHQSxXQUFPLElBQVA7QUFDQSxTQUFLLFFBQUw7QUFDQyxXQUFNLE1BQU4sR0FBYSxJQUFJLGlCQUFPLFVBQVAsQ0FBa0IsS0FBSyxHQUFMLENBQVMsV0FBVCxDQUFxQixnQkFBYyxzQkFB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QTRELEtBQTVELENBQWpDLEdBQW9HLEdBQXBHLENBRFY7Ozs7d0JBR0osR0FBRTs7O2lDQUdPLEdBQUU7OztRQXRCSTtFQUFtQixvQkFBTSxVQUFOLENBQXpDIiwiZmlsZSI6Imxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSAnLi9jb252ZXJ0ZXInXG5pbXBvcnQgSW5saW5lIGZyb20gJy4vaW5saW5lJ1xuaW1wb3J0IFBhcmFncmFwaCBmcm9tICcuL3BhcmFncmFwaCdcblxudmFyIExpc3RTdHlsZVR5cGU9e2xvd2VyTGV0dGVyOidsb3dlci1sYXRpbicsdXBwZXJMZXR0ZXI6J3VwcGVyLWxhdGluJyxsb3dlclJvbWFuOidsb3dlci1yb21hbicsdXBwZXJSb21hbjondXBwZXItcm9tYW4nfVxudmFyIGNzc0lEPVN0eWxlLmFzQ3NzSURcblx0XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0IGV4dGVuZHMgU3R5bGV7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMubGV2ZWxTdHlsZXM9e31cblx0fVxuXHRcblx0X2dldFByb3BlcnRpZXNDb252ZXJ0ZXIoY2F0ZWdvcnkpe1xuXHRcdGlmKCFjYXRlZ29yeSlcblx0XHRcdHJldHVybiBudWxsXG5cdFx0dmFyIGluZm89Y2F0ZWdvcnkuc3BsaXQoJyAnKSxcblx0XHRcdGxldmVsPXBhcnNlSW50KGluZm9bMF0pLFxuXHRcdFx0dHlwZT1pbmZvLmxlbmd0aD09MSA/ICdsaXN0JyA6IGluZm9bMV0sXG5cdFx0XHRzdHlsZT10aGlzLmxldmVsU3R5bGVzW2xldmVsXSxcblx0XHRcdGxldmVsU2VsZWN0b3I9Jy4nK2Nzc0lEKHRoaXMud29yZE1vZGVsLmlkKSsnW2xldmVsPVwiJytsZXZlbCsnXCJdJztcblx0XHRcblx0XHRpZighc3R5bGUpXG5cdFx0XHRzdHlsZT10aGlzLmxldmVsU3R5bGVzW2xldmVsXT17fVxuXHRcdFx0XG5cdFx0aWYoc3R5bGVbdHlwZV0pXG5cdFx0XHRyZXR1cm4gc3R5bGVbdHlwZV07XG5cdFx0XHRcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSAnaW5saW5lJzpcblx0XHRcdHN0eWxlLmlubGluZT1uZXcgSW5saW5lLlByb3BlcnRpZXModGhpcy5kb2MuY3JlYXRlU3R5bGUobGV2ZWxTZWxlY3RvcisnPmxpPnA+Lm1hcmtlcjpiZWZvcmUnKSlcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSAncGFyYWdyYXBoJzpcblx0XHRcdHN0eWxlLnBhcmFncmFwaD1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Qcih0aGlzLmRvYy5jcmVhdGVTdHlsZShsZXZlbFNlbGVjdG9yKyc+bGk+cCcpLCB0aGlzLCBsZXZlbFNlbGVjdG9yKVxuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdsaXN0Jzpcblx0XHRcdHN0eWxlLmxpc3Q9bmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyh0aGlzLmRvYy5jcmVhdGVTdHlsZShsZXZlbFNlbGVjdG9yKyc+bGk+cD4ubWFya2VyOmJlZm9yZScpLCB0aGlzLCBsZXZlbFNlbGVjdG9yLCBjc3NJRCh0aGlzLndvcmRNb2RlbC5pZCkrJ18nK2xldmVsLCBsZXZlbCk7XG5cdFx0XHRicmVha1xuXHRcdH1cblx0XHRyZXR1cm4gc3R5bGVbdHlwZV1cblx0fVxufVxuXHRcbkxpc3QuUHI9Y2xhc3MgUHIgZXh0ZW5kcyBQYXJhZ3JhcGguUHJvcGVydGllc3tcblx0Y29uc3RydWN0b3Ioc3R5bGUscGFyZW50LCBsZXZlbFNlbGVjdG9yKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5kb2M9cGFyZW50LmRvY1xuXHRcdHRoaXMubGV2ZWxTZWxlY3Rvcj1sZXZlbFNlbGVjdG9yXG5cdH1cblx0aW5kKHgpe1xuXHRcdHZhciBoYW5naW5nPXguaGFuZ2luZ1xuXHRcdGRlbGV0ZSB4Lmhhbmdpbmdcblx0XHRQYXJhZ3JhcGguUHJvcGVydGllcy5wcm90b3R5cGUuaW5kLmNhbGwodGhpcyx4KVxuXHRcdHguaGFuZ2luZz1oYW5naW5nXG5cdFx0eC5oYW5naW5nICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLmxldmVsU2VsZWN0b3IrJz5saT5wPi5tYXJrZXInKS5sZWZ0PS14LmhhbmdpbmcrJ3B0Jylcblx0fVxufVxuXHRcdFxuTGlzdC5Qcm9wZXJ0aWVzPWNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRjb25zdHJ1Y3RvcihzdHlsZSwgcGFyZW50LCBsZXZlbFNlbGVjdG9yLCBjb3VudGVyLCBsZXZlbCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuZG9jPXBhcmVudC5kb2Ncblx0XHR0aGlzLmxldmVsU2VsZWN0b3I9bGV2ZWxTZWxlY3RvclxuXHRcdHRoaXMubGV2ZWw9bGV2ZWxcblx0XHR0aGlzLmNvdW50ZXI9Y291bnRlclxuXHRcdHRoaXMuZG9jLmNyZWF0ZVN0eWxlKGxldmVsU2VsZWN0b3IpLmNvdW50ZXJSZXNldD1jb3VudGVyXG5cdFx0dGhpcy5kb2MuY3JlYXRlU3R5bGUobGV2ZWxTZWxlY3RvcisnPmxpJykuY291bnRlckluY3JlbWVudD1jb3VudGVyXG5cdH1cblx0c3RhcnQoeCl7XG5cdFx0dGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy5sZXZlbFNlbGVjdG9yKS5jb3VudGVyUmVzZXQ9dGhpcy5jb3VudGVyKycgJysoeC0xKVxuXHR9XG5cdG51bUZtdCh4KXtcblx0XHR0aGlzLnR5cGU9TGlzdFN0eWxlVHlwZVt4XXx8eFxuXHR9XG5cdGx2bFRleHQoeCl7XG5cdFx0dGhpcy5zdHlsZS5jb250ZW50PSdcIicreC5yZXBsYWNlKCclJysodGhpcy5sZXZlbCsxKSwnXCIgY291bnRlcignK3RoaXMuY291bnRlcisoIXRoaXMudHlwZSA/ICcnIDogJywnK3RoaXMudHlwZSkrJykgXCInKSsnXCInXG5cdH1cblx0bHZsSmMoeCl7XG5cdFx0XG5cdH1cblx0bHZsUGljQnVsbGV0SWQoeCl7XG5cdFx0XG5cdH1cbn0iXX0=