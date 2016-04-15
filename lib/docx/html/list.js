'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _p = require('./p');

var _p2 = _interopRequireDefault(_p);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = function (_Paragraph) {
	_inherits(List, _Paragraph);

	function List() {
		_classCallCheck(this, List);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(List).apply(this, arguments));
	}

	_createClass(List, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvbGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzRCQUNYO0FBQ1IsT0FBSSxXQUFTLEtBQUssTUFBTCxDQUFZLE9BQVo7T0FBcUIsS0FBRyxTQUFTLGdCQUFULENBRDdCO0FBRVIsT0FBSSxZQUFVLEtBQUssU0FBTCxDQUFlLGlCQUFmLEVBQVYsQ0FGSTtBQUdSLE9BQUksUUFBTSxVQUFVLEVBQVY7T0FBYyxRQUFNLEtBQUssU0FBTCxDQUFlLFFBQWYsRUFBTixDQUhoQjs7QUFLUixPQUFJLGdCQUFjLFVBQVMsTUFBVCxFQUFnQjtBQUNqQyxTQUFHLEtBQUssR0FBTCxDQUFTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBSCxDQURpQztBQUVqQyxPQUFHLEVBQUgsR0FBTSxVQUFVLEVBQVYsQ0FGMkI7QUFHakMsT0FBRyxZQUFILENBQWdCLE9BQWhCLEVBQXdCLEtBQXhCLEVBSGlDO0FBSWpDLFNBQUssV0FBTCxDQUFpQixRQUFqQixDQUEwQixFQUExQixFQUE2QixVQUFVLGNBQVYsR0FBMkIsRUFBM0IsQ0FBN0IsQ0FKaUM7QUFLakMsV0FBTyxXQUFQLENBQW1CLEVBQW5CLEVBTGlDO0lBQWhCLENBTWhCLElBTmdCLENBTVgsSUFOVyxDQUFkLENBTEk7O0FBYVIsT0FBRyxDQUFDLEVBQUQsSUFBTyxHQUFHLFNBQUgsSUFBYyxJQUFkLElBQXNCLEdBQUcsRUFBSCxJQUFPLEtBQVAsRUFBYTtBQUM1QyxrQkFBYyxRQUFkLEVBRDRDO0lBQTdDLE1BRU0sSUFBRyxHQUFHLFlBQUgsQ0FBZ0IsT0FBaEIsS0FBMEIsS0FBMUIsRUFBZ0M7QUFDeEMsUUFBSSxpQkFBZSxHQUFHLGFBQUgsQ0FBaUIsYUFBVyxLQUFYLEdBQWlCLElBQWpCLENBQWhDLENBRG9DO0FBRXhDLFFBQUcsQ0FBQyxjQUFELEVBQWdCO0FBQ2xCLG1CQUFjLEdBQUcsYUFBSCxDQUFpQixjQUFZLFNBQVMsS0FBVCxJQUFnQixDQUFoQixDQUFaLEdBQStCLElBQS9CLENBQWpCLElBQXlELEVBQXpELENBQWQsQ0FEa0I7S0FBbkIsTUFHQyxLQUFHLGNBQUgsQ0FIRDtJQUZLO0FBT04sT0FBSSxLQUFHLEtBQUssR0FBTCxDQUFTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBSCxDQXRCSTtBQXVCUixNQUFHLFdBQUgsQ0FBZSxFQUFmLEVBdkJRO0FBd0JSLE1BQUcsV0FBSCxDQUFlLEtBQUssT0FBTCxHQUFhLEtBQUssYUFBTCxFQUFiLENBQWYsQ0F4QlE7QUF5QlIsT0FBSSxTQUFPLEtBQUssR0FBTCxDQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBUCxDQXpCSTtBQTBCUixRQUFLLFdBQUwsQ0FBaUIsUUFBakIsQ0FBMEIsTUFBMUIsRUFBa0MsUUFBbEMsRUExQlE7QUEyQlIsUUFBSyxPQUFMLENBQWEsV0FBYixDQUF5QixNQUF6QjtBQTNCUSxPQTRCUixDQUFLLFlBQUwsQ0FBa0IsS0FBSyxPQUFMLENBQWxCLENBNUJROzs7O1FBRFciLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJhZ3JhcGggZnJvbSAnLi9wJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0IGV4dGVuZHMgUGFyYWdyYXBoe1xuXHRjb252ZXJ0KCl7XG5cdFx0dmFyIGVsUGFyZW50PXRoaXMucGFyZW50LmNvbnRlbnQsIHVsPWVsUGFyZW50Lmxhc3RFbGVtZW50Q2hpbGQ7XG5cdFx0dmFyIGxpc3RTdHlsZT10aGlzLndvcmRNb2RlbC5nZXROdW1iZXJpbmdTdHlsZSgpXG5cdFx0dmFyIG51bUlkPWxpc3RTdHlsZS5pZCwgbGV2ZWw9dGhpcy53b3JkTW9kZWwuZ2V0TGV2ZWwoKVxuXHRcdFxuXHRcdHZhciBtYWtlU3RydWN0dXJlPWZ1bmN0aW9uKHBhcmVudCl7XG5cdFx0XHR1bD10aGlzLmRvYy5jcmVhdGVFbGVtZW50KCd1bCcpXG5cdFx0XHR1bC5pZD1saXN0U3R5bGUuaWRcblx0XHRcdHVsLnNldEF0dHJpYnV0ZSgnbGV2ZWwnLGxldmVsKVxuXHRcdFx0dGhpcy5jb25zdHJ1Y3Rvci5hZGRDbGFzcyh1bCxsaXN0U3R5bGUuZ2V0UGFyZW50U3R5bGUoKS5pZClcblx0XHRcdHBhcmVudC5hcHBlbmRDaGlsZCh1bClcblx0XHR9LmJpbmQodGhpcylcblx0XHRcblx0XHRpZighdWwgfHwgdWwubG9jYWxOYW1lIT0ndWwnIHx8IHVsLmlkIT1udW1JZCl7XG5cdFx0XHRtYWtlU3RydWN0dXJlKGVsUGFyZW50KVxuXHRcdH1lbHNlIGlmKHVsLmdldEF0dHJpYnV0ZSgnbGV2ZWwnKSE9bGV2ZWwpe1xuXHRcdFx0dmFyIHBvc3NpYmxlUGFyZW50PXVsLnF1ZXJ5U2VsZWN0b3IoJ1tsZXZlbD1cIicrbGV2ZWwrJ1wiXScpXG5cdFx0XHRpZighcG9zc2libGVQYXJlbnQpe1xuXHRcdFx0XHRtYWtlU3RydWN0dXJlKHVsLnF1ZXJ5U2VsZWN0b3IoJ1tsZXZlbD1cIicrKHBhcnNlSW50KGxldmVsKS0xKSsnXCJdJykgfHwgdWwpXG5cdFx0XHR9ZWxzZSBcblx0XHRcdFx0dWw9cG9zc2libGVQYXJlbnRcblx0XHR9XG5cdFx0dmFyIGxpPXRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoJ2xpJylcblx0XHR1bC5hcHBlbmRDaGlsZChsaSlcblx0XHRsaS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQ9dGhpcy5jcmVhdGVFbGVtZW50KCkpXG5cdFx0dmFyIG1hcmtlcj10aGlzLmRvYy5jcmVhdGVFbGVtZW50KCdzcGFuJylcblx0XHR0aGlzLmNvbnN0cnVjdG9yLmFkZENsYXNzKG1hcmtlciwgJ21hcmtlcicpXG5cdFx0dGhpcy5jb250ZW50LmFwcGVuZENoaWxkKG1hcmtlcikvL2FzIG1hcmtlclxuXHRcdHRoaXMuY29udmVydFN0eWxlKHRoaXMuY29udGVudClcblx0fVxufSJdfQ==