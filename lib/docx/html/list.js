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

var _p = require('./p');

var _p2 = _interopRequireDefault(_p);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = function (_Paragraph) {
	(0, _inherits3.default)(List, _Paragraph);

	function List() {
		(0, _classCallCheck3.default)(this, List);
		return (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).apply(this, arguments));
	}

	(0, _createClass3.default)(List, [{
		key: 'convert',
		value: function convert() {
			var elParent = this.parent.content,
			    ul = elParent.lastElementChild;
			var listStyle = this.wordModel.getNumberingStyle();
			var numId = listStyle.id,
			    level = this.wordModel.getLevel();

			var makeStructure = function (parent) {
				ul = this.doc.createElement('ul');
				ul.id = listStyle.id;
				ul.setAttribute('level', level);
				this.constructor.addClass(ul, listStyle.getParentStyle().id);
				parent.appendChild(ul);
			}.bind(this);

			if (!ul || ul.localName != 'ul' || ul.id != numId) {
				makeStructure(elParent);
			} else if (ul.getAttribute('level') != level) {
				var possibleParent = ul.querySelector('[level="' + level + '"]');
				if (!possibleParent) {
					makeStructure(ul.querySelector('[level="' + (parseInt(level) - 1) + '"]') || ul);
				} else ul = possibleParent;
			}
			var li = this.doc.createElement('li');
			ul.appendChild(li);
			li.appendChild(this.content = this.createElement());
			var marker = this.doc.createElement('span');
			this.constructor.addClass(marker, 'marker');
			this.content.appendChild(marker); //as marker
			this.convertStyle(this.content);
		}
	}]);
	return List;
}(_p2.default);

exports.default = List;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvbGlzdC5qcyJdLCJuYW1lcyI6WyJMaXN0IiwiZWxQYXJlbnQiLCJwYXJlbnQiLCJjb250ZW50IiwidWwiLCJsYXN0RWxlbWVudENoaWxkIiwibGlzdFN0eWxlIiwid29yZE1vZGVsIiwiZ2V0TnVtYmVyaW5nU3R5bGUiLCJudW1JZCIsImlkIiwibGV2ZWwiLCJnZXRMZXZlbCIsIm1ha2VTdHJ1Y3R1cmUiLCJkb2MiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiY29uc3RydWN0b3IiLCJhZGRDbGFzcyIsImdldFBhcmVudFN0eWxlIiwiYXBwZW5kQ2hpbGQiLCJiaW5kIiwibG9jYWxOYW1lIiwiZ2V0QXR0cmlidXRlIiwicG9zc2libGVQYXJlbnQiLCJxdWVyeVNlbGVjdG9yIiwicGFyc2VJbnQiLCJsaSIsIm1hcmtlciIsImNvbnZlcnRTdHlsZSIsIlBhcmFncmFwaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7OzRCQUNYO0FBQ1IsT0FBSUMsV0FBUyxLQUFLQyxNQUFMLENBQVlDLE9BQXpCO0FBQUEsT0FBa0NDLEtBQUdILFNBQVNJLGdCQUE5QztBQUNBLE9BQUlDLFlBQVUsS0FBS0MsU0FBTCxDQUFlQyxpQkFBZixFQUFkO0FBQ0EsT0FBSUMsUUFBTUgsVUFBVUksRUFBcEI7QUFBQSxPQUF3QkMsUUFBTSxLQUFLSixTQUFMLENBQWVLLFFBQWYsRUFBOUI7O0FBRUEsT0FBSUMsZ0JBQWMsVUFBU1gsTUFBVCxFQUFnQjtBQUNqQ0UsU0FBRyxLQUFLVSxHQUFMLENBQVNDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBSDtBQUNBWCxPQUFHTSxFQUFILEdBQU1KLFVBQVVJLEVBQWhCO0FBQ0FOLE9BQUdZLFlBQUgsQ0FBZ0IsT0FBaEIsRUFBd0JMLEtBQXhCO0FBQ0EsU0FBS00sV0FBTCxDQUFpQkMsUUFBakIsQ0FBMEJkLEVBQTFCLEVBQTZCRSxVQUFVYSxjQUFWLEdBQTJCVCxFQUF4RDtBQUNBUixXQUFPa0IsV0FBUCxDQUFtQmhCLEVBQW5CO0FBQ0EsSUFOaUIsQ0FNaEJpQixJQU5nQixDQU1YLElBTlcsQ0FBbEI7O0FBUUEsT0FBRyxDQUFDakIsRUFBRCxJQUFPQSxHQUFHa0IsU0FBSCxJQUFjLElBQXJCLElBQTZCbEIsR0FBR00sRUFBSCxJQUFPRCxLQUF2QyxFQUE2QztBQUM1Q0ksa0JBQWNaLFFBQWQ7QUFDQSxJQUZELE1BRU0sSUFBR0csR0FBR21CLFlBQUgsQ0FBZ0IsT0FBaEIsS0FBMEJaLEtBQTdCLEVBQW1DO0FBQ3hDLFFBQUlhLGlCQUFlcEIsR0FBR3FCLGFBQUgsQ0FBaUIsYUFBV2QsS0FBWCxHQUFpQixJQUFsQyxDQUFuQjtBQUNBLFFBQUcsQ0FBQ2EsY0FBSixFQUFtQjtBQUNsQlgsbUJBQWNULEdBQUdxQixhQUFILENBQWlCLGNBQVlDLFNBQVNmLEtBQVQsSUFBZ0IsQ0FBNUIsSUFBK0IsSUFBaEQsS0FBeURQLEVBQXZFO0FBQ0EsS0FGRCxNQUdDQSxLQUFHb0IsY0FBSDtBQUNEO0FBQ0QsT0FBSUcsS0FBRyxLQUFLYixHQUFMLENBQVNDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBUDtBQUNBWCxNQUFHZ0IsV0FBSCxDQUFlTyxFQUFmO0FBQ0FBLE1BQUdQLFdBQUgsQ0FBZSxLQUFLakIsT0FBTCxHQUFhLEtBQUtZLGFBQUwsRUFBNUI7QUFDQSxPQUFJYSxTQUFPLEtBQUtkLEdBQUwsQ0FBU0MsYUFBVCxDQUF1QixNQUF2QixDQUFYO0FBQ0EsUUFBS0UsV0FBTCxDQUFpQkMsUUFBakIsQ0FBMEJVLE1BQTFCLEVBQWtDLFFBQWxDO0FBQ0EsUUFBS3pCLE9BQUwsQ0FBYWlCLFdBQWIsQ0FBeUJRLE1BQXpCLEVBM0JRLENBMkJ3QjtBQUNoQyxRQUFLQyxZQUFMLENBQWtCLEtBQUsxQixPQUF2QjtBQUNBOzs7RUE5QmdDMkIsVzs7a0JBQWI5QixJIiwiZmlsZSI6Imxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFyYWdyYXBoIGZyb20gJy4vcCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdCBleHRlbmRzIFBhcmFncmFwaHtcblx0Y29udmVydCgpe1xuXHRcdHZhciBlbFBhcmVudD10aGlzLnBhcmVudC5jb250ZW50LCB1bD1lbFBhcmVudC5sYXN0RWxlbWVudENoaWxkO1xuXHRcdHZhciBsaXN0U3R5bGU9dGhpcy53b3JkTW9kZWwuZ2V0TnVtYmVyaW5nU3R5bGUoKVxuXHRcdHZhciBudW1JZD1saXN0U3R5bGUuaWQsIGxldmVsPXRoaXMud29yZE1vZGVsLmdldExldmVsKClcblx0XHRcblx0XHR2YXIgbWFrZVN0cnVjdHVyZT1mdW5jdGlvbihwYXJlbnQpe1xuXHRcdFx0dWw9dGhpcy5kb2MuY3JlYXRlRWxlbWVudCgndWwnKVxuXHRcdFx0dWwuaWQ9bGlzdFN0eWxlLmlkXG5cdFx0XHR1bC5zZXRBdHRyaWJ1dGUoJ2xldmVsJyxsZXZlbClcblx0XHRcdHRoaXMuY29uc3RydWN0b3IuYWRkQ2xhc3ModWwsbGlzdFN0eWxlLmdldFBhcmVudFN0eWxlKCkuaWQpXG5cdFx0XHRwYXJlbnQuYXBwZW5kQ2hpbGQodWwpXG5cdFx0fS5iaW5kKHRoaXMpXG5cdFx0XG5cdFx0aWYoIXVsIHx8IHVsLmxvY2FsTmFtZSE9J3VsJyB8fCB1bC5pZCE9bnVtSWQpe1xuXHRcdFx0bWFrZVN0cnVjdHVyZShlbFBhcmVudClcblx0XHR9ZWxzZSBpZih1bC5nZXRBdHRyaWJ1dGUoJ2xldmVsJykhPWxldmVsKXtcblx0XHRcdHZhciBwb3NzaWJsZVBhcmVudD11bC5xdWVyeVNlbGVjdG9yKCdbbGV2ZWw9XCInK2xldmVsKydcIl0nKVxuXHRcdFx0aWYoIXBvc3NpYmxlUGFyZW50KXtcblx0XHRcdFx0bWFrZVN0cnVjdHVyZSh1bC5xdWVyeVNlbGVjdG9yKCdbbGV2ZWw9XCInKyhwYXJzZUludChsZXZlbCktMSkrJ1wiXScpIHx8IHVsKVxuXHRcdFx0fWVsc2UgXG5cdFx0XHRcdHVsPXBvc3NpYmxlUGFyZW50XG5cdFx0fVxuXHRcdHZhciBsaT10aGlzLmRvYy5jcmVhdGVFbGVtZW50KCdsaScpXG5cdFx0dWwuYXBwZW5kQ2hpbGQobGkpXG5cdFx0bGkuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50PXRoaXMuY3JlYXRlRWxlbWVudCgpKVxuXHRcdHZhciBtYXJrZXI9dGhpcy5kb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpXG5cdFx0dGhpcy5jb25zdHJ1Y3Rvci5hZGRDbGFzcyhtYXJrZXIsICdtYXJrZXInKVxuXHRcdHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChtYXJrZXIpLy9hcyBtYXJrZXJcblx0XHR0aGlzLmNvbnZlcnRTdHlsZSh0aGlzLmNvbnRlbnQpXG5cdH1cbn0iXX0=