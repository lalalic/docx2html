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

var _table = require('./style/table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = function (_Converter) {
	(0, _inherits3.default)(Table, _Converter);

	function Table() {
		(0, _classCallCheck3.default)(this, Table);
		return (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).apply(this, arguments));
	}

	(0, _createClass3.default)(Table, [{
		key: 'convertStyle',
		value: function convertStyle(el) {
			(0, _get3.default)(Table.prototype.__proto__ || (0, _getPrototypeOf2.default)(Table.prototype), 'convertStyle', this).apply(this, arguments);
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
	(0, _inherits3.default)(Properties, _Style$Properties);

	function Properties() {
		(0, _classCallCheck3.default)(this, Properties);
		return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
	}

	return Properties;
}(_table2.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvdGFibGUuanMiXSwibmFtZXMiOlsiVGFibGUiLCJlbCIsImFyZ3VtZW50cyIsIndpZHRoIiwid29yZE1vZGVsIiwiZ2V0Q29sV2lkdGgiLCJodG1sIiwiaSIsImNvbHMiLCJzdW0iLCJsZW4iLCJsZW5ndGgiLCJwdXNoIiwiaW5uZXJIVE1MIiwiam9pbiIsInN0eWxlIiwiZ2V0RGlyZWN0U3R5bGUiLCJwYXJzZSIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsInRib2R5IiwiZG9jIiwiY3JlYXRlRWxlbWVudCIsImNvbnRlbnQiLCJhcHBlbmRDaGlsZCIsInNlbGVjdG9yIiwiaWQiLCJ1aWQiLCJsZXZlbCIsIlN0eWxlIiwicHJvdG90eXBlIiwiUHJpb3JpdGl6aWVkU3R5bGVzIiwic2V0QXR0cmlidXRlIiwiQ29udmVydGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLEs7Ozs7Ozs7Ozs7K0JBR1BDLEUsRUFBRztBQUNmLHFJQUFzQkMsU0FBdEI7QUFDQSxPQUFJQyxRQUFNLEtBQUtDLFNBQUwsQ0FBZUMsV0FBZixFQUFWO0FBQUEsT0FBd0NDLE9BQUssQ0FBQyxZQUFELENBQTdDO0FBQ0EsUUFBSSxJQUFJQyxJQUFFLENBQU4sRUFBUUMsT0FBS0wsTUFBTUssSUFBbkIsRUFBd0JDLE1BQUlOLE1BQU1NLEdBQWxDLEVBQXNDQyxNQUFJRixLQUFLRyxNQUFuRCxFQUEwREosSUFBRUcsR0FBNUQsRUFBZ0VILEdBQWhFO0FBQ0NELFNBQUtNLElBQUwsQ0FBVSx1QkFBc0JKLEtBQUtELENBQUwsSUFBUSxHQUFSLEdBQVlFLEdBQWxDLEdBQXVDLE1BQWpEO0FBREQsSUFFQUgsS0FBS00sSUFBTCxDQUFVLGFBQVY7QUFDQVgsTUFBR1ksU0FBSCxHQUFhUCxLQUFLUSxJQUFMLENBQVUsRUFBVixDQUFiO0FBQ0EsT0FBSUMsUUFBTSxLQUFLWCxTQUFMLENBQWVZLGNBQWYsRUFBVjtBQUNBRCxZQUFTQSxNQUFNRSxLQUFOLENBQVksQ0FBQyxJQUFJLEtBQUtDLFdBQUwsQ0FBaUJDLFVBQXJCLENBQWdDbEIsR0FBR2MsS0FBbkMsRUFBMEMsSUFBMUMsQ0FBRCxDQUFaLENBQVQ7QUFDQSxPQUFJSyxRQUFNLEtBQUtDLEdBQUwsQ0FBU0MsYUFBVCxDQUF1QixPQUF2QixDQUFWO0FBQ0EsUUFBS0MsT0FBTCxDQUFhQyxXQUFiLENBQXlCSixLQUF6QjtBQUNBLFFBQUtHLE9BQUwsR0FBYUgsS0FBYjtBQUNBOzs7cUNBRWlCO0FBQ2pCLE9BQUlLLFdBQVMsT0FBSyxLQUFLRixPQUFMLENBQWFHLEVBQWIsR0FBa0IsS0FBS0gsT0FBTCxDQUFhRyxFQUEvQixHQUFxQyxLQUFLSCxPQUFMLENBQWFHLEVBQWIsR0FBZ0IsS0FBS0wsR0FBTCxDQUFTTSxHQUFULEVBQTFELENBQWI7QUFBQSxPQUNDQyxRQUFNQyxnQkFBTUMsU0FBTixDQUFnQkMsa0JBQWhCLENBQW1DcEIsTUFEMUM7QUFFQSxRQUFJLElBQUlKLElBQUUsQ0FBVixFQUFZQSxJQUFFcUIsS0FBZCxFQUFvQnJCLEdBQXBCLEVBQXdCO0FBQ3ZCLFNBQUtnQixPQUFMLENBQWFTLFlBQWIsQ0FBMEIsTUFBSXpCLENBQTlCLEVBQWdDLENBQWhDO0FBQ0FrQixnQkFBVyxPQUFLbEIsQ0FBTCxHQUFPLEdBQWxCO0FBQ0E7QUFDRCxVQUFPa0IsV0FBUyxRQUFoQjtBQUNBOzs7c0JBeEJRO0FBQUMsVUFBTyxPQUFQO0FBQWU7OztFQURTUSxtQjs7a0JBQWRqQyxLOzs7QUE0QnJCQSxNQUFNbUIsVUFBTjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsRUFBMENVLGdCQUFNVixVQUFoRCIsImZpbGUiOiJ0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi9jb252ZXJ0ZXInXG5pbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZS90YWJsZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBDb252ZXJ0ZXJ7XG5cdGdldCB0YWcoKXtyZXR1cm4gJ3RhYmxlJ31cblxuXHRjb252ZXJ0U3R5bGUoZWwpe1xuXHRcdHN1cGVyLmNvbnZlcnRTdHlsZSguLi5hcmd1bWVudHMpXG5cdFx0dmFyIHdpZHRoPXRoaXMud29yZE1vZGVsLmdldENvbFdpZHRoKCksIGh0bWw9Wyc8Y29sZ3JvdXA+J11cblx0XHRmb3IodmFyIGk9MCxjb2xzPXdpZHRoLmNvbHMsc3VtPXdpZHRoLnN1bSxsZW49Y29scy5sZW5ndGg7aTxsZW47aSsrKVxuXHRcdFx0aHRtbC5wdXNoKCc8Y29sIHN0eWxlPVwid2lkdGg6JysoY29sc1tpXSoxMDAvc3VtKSsnJVwiLz4nKVxuXHRcdGh0bWwucHVzaCgnPC9jb2xncm91cD4nKVxuXHRcdGVsLmlubmVySFRNTD1odG1sLmpvaW4oJycpXG5cdFx0dmFyIHN0eWxlPXRoaXMud29yZE1vZGVsLmdldERpcmVjdFN0eWxlKClcblx0XHRzdHlsZSAmJiBzdHlsZS5wYXJzZShbbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyhlbC5zdHlsZSwgdGhpcyldKVxuXHRcdHZhciB0Ym9keT10aGlzLmRvYy5jcmVhdGVFbGVtZW50KCd0Ym9keScpXG5cdFx0dGhpcy5jb250ZW50LmFwcGVuZENoaWxkKHRib2R5KVxuXHRcdHRoaXMuY29udGVudD10Ym9keVxuXHR9XG5cdFxuXHRnZXRUYWJsZVNlbGVjdG9yKCl7XG5cdFx0dmFyIHNlbGVjdG9yPScjJysodGhpcy5jb250ZW50LmlkID8gdGhpcy5jb250ZW50LmlkIDogKHRoaXMuY29udGVudC5pZD10aGlzLmRvYy51aWQoKSkpLFxuXHRcdFx0bGV2ZWw9U3R5bGUucHJvdG90eXBlLlByaW9yaXRpemllZFN0eWxlcy5sZW5ndGg7XG5cdFx0Zm9yKHZhciBpPTA7aTxsZXZlbDtpKyspe1xuXHRcdFx0dGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZSgneCcraSwxKVxuXHRcdFx0c2VsZWN0b3IrPSgnW3gnK2krJ10nKVxuXHRcdH1cblx0XHRyZXR1cm4gc2VsZWN0b3IrXCI+dGJvZHlcIlxuXHR9XG59XG5cblRhYmxlLlByb3BlcnRpZXM9Y2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdFxufSJdfQ==