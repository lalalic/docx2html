'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

var _table = require('./style/table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = function (_Converter) {
	_inherits(Table, _Converter);

	function Table() {
		_classCallCheck(this, Table);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Table).apply(this, arguments));
	}

	_createClass(Table, [{
		key: 'convertStyle',
		value: function convertStyle(el) {
			_get(Object.getPrototypeOf(Table.prototype), 'convertStyle', this).apply(this, arguments);
			var width = this.wordModel.getColWidth(),
			    html = ['<colgroup>'];
			for (var i = 0, cols = width.cols, sum = width.sum, len = cols.length; i < len; i++) {
				html.push('<col style="width:' + cols[i] * 100 / sum + '%"/>');
			}html.push('</colgroup>');
			el.innerHTML = html.join('');
			var style = this.wordModel.getDirectStyle();
			style && style.parse([new this.constructor.Properties(el.style, this)]);
			var tbody = this.doc.createElement('tbody');
			this.content.appendChild(tbody);
			this.content = tbody;
		}
	}, {
		key: 'getTableSelector',
		value: function getTableSelector() {
			var selector = '#' + (this.content.id ? this.content.id : this.content.id = this.doc.uid()),
			    level = _table2.default.prototype.PrioritiziedStyles.length;
			for (var i = 0; i < level; i++) {
				this.content.setAttribute('x' + i, 1);
				selector += '[x' + i + ']';
			}
			return selector + ">tbody";
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'table';
		}
	}]);

	return Table;
}(_converter2.default);

exports.default = Table;


Table.Properties = function (_Style$Properties) {
	_inherits(Properties, _Style$Properties);

	function Properties() {
		_classCallCheck(this, Properties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));
	}

	return Properties;
}(_table2.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7K0JBR1AsSUFBRztBQUNmLDhCQUptQixvREFJRyxVQUF0QixDQURlO0FBRWYsT0FBSSxRQUFNLEtBQUssU0FBTCxDQUFlLFdBQWYsRUFBTjtPQUFvQyxPQUFLLENBQUMsWUFBRCxDQUFMLENBRnpCO0FBR2YsUUFBSSxJQUFJLElBQUUsQ0FBRixFQUFJLE9BQUssTUFBTSxJQUFOLEVBQVcsTUFBSSxNQUFNLEdBQU4sRUFBVSxNQUFJLEtBQUssTUFBTCxFQUFZLElBQUUsR0FBRixFQUFNLEdBQWhFO0FBQ0MsU0FBSyxJQUFMLENBQVUsdUJBQXNCLEtBQUssQ0FBTCxJQUFRLEdBQVIsR0FBWSxHQUFaLEdBQWlCLE1BQXZDLENBQVY7SUFERCxJQUVBLENBQUssSUFBTCxDQUFVLGFBQVYsRUFMZTtBQU1mLE1BQUcsU0FBSCxHQUFhLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYixDQU5lO0FBT2YsT0FBSSxRQUFNLEtBQUssU0FBTCxDQUFlLGNBQWYsRUFBTixDQVBXO0FBUWYsWUFBUyxNQUFNLEtBQU4sQ0FBWSxDQUFDLElBQUksS0FBSyxXQUFMLENBQWlCLFVBQWpCLENBQTRCLEdBQUcsS0FBSCxFQUFVLElBQTFDLENBQUQsQ0FBWixDQUFULENBUmU7QUFTZixPQUFJLFFBQU0sS0FBSyxHQUFMLENBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFOLENBVFc7QUFVZixRQUFLLE9BQUwsQ0FBYSxXQUFiLENBQXlCLEtBQXpCLEVBVmU7QUFXZixRQUFLLE9BQUwsR0FBYSxLQUFiLENBWGU7Ozs7cUNBY0U7QUFDakIsT0FBSSxXQUFTLE9BQUssS0FBSyxPQUFMLENBQWEsRUFBYixHQUFrQixLQUFLLE9BQUwsQ0FBYSxFQUFiLEdBQW1CLEtBQUssT0FBTCxDQUFhLEVBQWIsR0FBZ0IsS0FBSyxHQUFMLENBQVMsR0FBVCxFQUFoQixDQUExQztPQUNaLFFBQU0sZ0JBQU0sU0FBTixDQUFnQixrQkFBaEIsQ0FBbUMsTUFBbkMsQ0FGVTtBQUdqQixRQUFJLElBQUksSUFBRSxDQUFGLEVBQUksSUFBRSxLQUFGLEVBQVEsR0FBcEIsRUFBd0I7QUFDdkIsU0FBSyxPQUFMLENBQWEsWUFBYixDQUEwQixNQUFJLENBQUosRUFBTSxDQUFoQyxFQUR1QjtBQUV2QixnQkFBVyxPQUFLLENBQUwsR0FBTyxHQUFQLENBRlk7SUFBeEI7QUFJQSxVQUFPLFdBQVMsUUFBVCxDQVBVOzs7O3NCQWhCVDtBQUFDLFVBQU8sT0FBUCxDQUFEOzs7O1FBRFc7Ozs7OztBQTRCckIsTUFBTSxVQUFOO1dBQXVCOzs7Ozs7Ozs7RUFBbUIsZ0JBQU0sVUFBTixDQUExQyIsImZpbGUiOiJ0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi9jb252ZXJ0ZXInXG5pbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZS90YWJsZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBDb252ZXJ0ZXJ7XG5cdGdldCB0YWcoKXtyZXR1cm4gJ3RhYmxlJ31cblxuXHRjb252ZXJ0U3R5bGUoZWwpe1xuXHRcdHN1cGVyLmNvbnZlcnRTdHlsZSguLi5hcmd1bWVudHMpXG5cdFx0dmFyIHdpZHRoPXRoaXMud29yZE1vZGVsLmdldENvbFdpZHRoKCksIGh0bWw9Wyc8Y29sZ3JvdXA+J11cblx0XHRmb3IodmFyIGk9MCxjb2xzPXdpZHRoLmNvbHMsc3VtPXdpZHRoLnN1bSxsZW49Y29scy5sZW5ndGg7aTxsZW47aSsrKVxuXHRcdFx0aHRtbC5wdXNoKCc8Y29sIHN0eWxlPVwid2lkdGg6JysoY29sc1tpXSoxMDAvc3VtKSsnJVwiLz4nKVxuXHRcdGh0bWwucHVzaCgnPC9jb2xncm91cD4nKVxuXHRcdGVsLmlubmVySFRNTD1odG1sLmpvaW4oJycpXG5cdFx0dmFyIHN0eWxlPXRoaXMud29yZE1vZGVsLmdldERpcmVjdFN0eWxlKClcblx0XHRzdHlsZSAmJiBzdHlsZS5wYXJzZShbbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyhlbC5zdHlsZSwgdGhpcyldKVxuXHRcdHZhciB0Ym9keT10aGlzLmRvYy5jcmVhdGVFbGVtZW50KCd0Ym9keScpXG5cdFx0dGhpcy5jb250ZW50LmFwcGVuZENoaWxkKHRib2R5KVxuXHRcdHRoaXMuY29udGVudD10Ym9keVxuXHR9XG5cdFxuXHRnZXRUYWJsZVNlbGVjdG9yKCl7XG5cdFx0dmFyIHNlbGVjdG9yPScjJysodGhpcy5jb250ZW50LmlkID8gdGhpcy5jb250ZW50LmlkIDogKHRoaXMuY29udGVudC5pZD10aGlzLmRvYy51aWQoKSkpLFxuXHRcdFx0bGV2ZWw9U3R5bGUucHJvdG90eXBlLlByaW9yaXRpemllZFN0eWxlcy5sZW5ndGg7XG5cdFx0Zm9yKHZhciBpPTA7aTxsZXZlbDtpKyspe1xuXHRcdFx0dGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZSgneCcraSwxKVxuXHRcdFx0c2VsZWN0b3IrPSgnW3gnK2krJ10nKVxuXHRcdH1cblx0XHRyZXR1cm4gc2VsZWN0b3IrXCI+dGJvZHlcIlxuXHR9XG59XG5cblRhYmxlLlByb3BlcnRpZXM9Y2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdFxufSJdfQ==