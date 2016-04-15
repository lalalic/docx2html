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

var Td = function (_Converter) {
	_inherits(Td, _Converter);

	function Td() {
		_classCallCheck(this, Td);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Td).apply(this, arguments));
	}

	_createClass(Td, [{
		key: 'convertStyle',
		value: function convertStyle(el) {
			_get(Object.getPrototypeOf(Td.prototype), 'convertStyle', this).apply(this, arguments);
			var style = this.wordModel.getDirectStyle();
			style && style.parse([new this.constructor.Properties(el.style, this)]);
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'td';
		}
	}]);

	return Td;
}(_converter2.default);

exports.default = Td;

var Properties = function (_Style$CellProperties) {
	_inherits(Properties, _Style$CellProperties);

	function Properties() {
		_classCallCheck(this, Properties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));
	}

	_createClass(Properties, [{
		key: 'tcBorders',
		value: function tcBorders(x) {
			x.left && (this.style.borderLeft = this._border(x.left));
			x.right && (this.style.borderRight = this._border(x.right));
			x.top && (this.style.borderTop = this._border(x.top));
			x.bottom && (this.style.borderBottom = this._border(x.bottom));
		}
	}, {
		key: 'cnfStyle',
		value: function cnfStyle(x) {
			var names = [],
			    PrioritiziedStyles = _table2.default.prototype.PrioritiziedStyles,
			    level = -1,
			    t;
			for (var i = 0; i < 12; i++) {
				if (x.charAt(i) == '1') {
					names.push(t = _table2.default.TableStyles[i]);
					if ((t = PrioritiziedStyles.indexOf(t)) > level) level = t;
				}
			}
			names.length && Td.addClass(this.parent.content, names.join(' '));
			for (var i = 0; i < level; i++) {
				this.parent.content.setAttribute('x' + i, 1);
			}
		}
	}]);

	return Properties;
}(_table2.default.CellProperties);

Td.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvdGQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7K0JBR1AsSUFBRztBQUNmLDhCQUptQixpREFJRyxVQUF0QixDQURlO0FBRWYsT0FBSSxRQUFNLEtBQUssU0FBTCxDQUFlLGNBQWYsRUFBTixDQUZXO0FBR2YsWUFBUyxNQUFNLEtBQU4sQ0FBWSxDQUFDLElBQUksS0FBSyxXQUFMLENBQWlCLFVBQWpCLENBQTRCLEdBQUcsS0FBSCxFQUFTLElBQXpDLENBQUQsQ0FBWixDQUFULENBSGU7Ozs7c0JBRlA7QUFBQyxVQUFPLElBQVAsQ0FBRDs7OztRQURXOzs7OztJQVdmOzs7Ozs7Ozs7Ozs0QkFDSyxHQUFFO0FBQ1gsS0FBRSxJQUFGLEtBQVcsS0FBSyxLQUFMLENBQVcsVUFBWCxHQUFzQixLQUFLLE9BQUwsQ0FBYSxFQUFFLElBQUYsQ0FBbkMsQ0FBWCxDQURXO0FBRVgsS0FBRSxLQUFGLEtBQVksS0FBSyxLQUFMLENBQVcsV0FBWCxHQUF1QixLQUFLLE9BQUwsQ0FBYSxFQUFFLEtBQUYsQ0FBcEMsQ0FBWixDQUZXO0FBR1gsS0FBRSxHQUFGLEtBQVUsS0FBSyxLQUFMLENBQVcsU0FBWCxHQUFxQixLQUFLLE9BQUwsQ0FBYSxFQUFFLEdBQUYsQ0FBbEMsQ0FBVixDQUhXO0FBSVgsS0FBRSxNQUFGLEtBQWEsS0FBSyxLQUFMLENBQVcsWUFBWCxHQUF3QixLQUFLLE9BQUwsQ0FBYSxFQUFFLE1BQUYsQ0FBckMsQ0FBYixDQUpXOzs7OzJCQU1ILEdBQUU7QUFDVixPQUFJLFFBQU0sRUFBTjtPQUFVLHFCQUFtQixnQkFBTSxTQUFOLENBQWdCLGtCQUFoQjtPQUFvQyxRQUFNLENBQUMsQ0FBRDtPQUFJLENBQS9FLENBRFU7QUFFVixRQUFJLElBQUksSUFBRSxDQUFGLEVBQUksSUFBRSxFQUFGLEVBQUssR0FBakIsRUFBcUI7QUFDcEIsUUFBRyxFQUFFLE1BQUYsQ0FBUyxDQUFULEtBQWEsR0FBYixFQUFpQjtBQUNuQixXQUFNLElBQU4sQ0FBVyxJQUFFLGdCQUFNLFdBQU4sQ0FBa0IsQ0FBbEIsQ0FBRixDQUFYLENBRG1CO0FBRW5CLFNBQUcsQ0FBQyxJQUFFLG1CQUFtQixPQUFuQixDQUEyQixDQUEzQixDQUFGLENBQUQsR0FBa0MsS0FBbEMsRUFDRixRQUFNLENBQU4sQ0FERDtLQUZEO0lBREQ7QUFPQSxTQUFNLE1BQU4sSUFBZ0IsR0FBRyxRQUFILENBQVksS0FBSyxNQUFMLENBQVksT0FBWixFQUFvQixNQUFNLElBQU4sQ0FBVyxHQUFYLENBQWhDLENBQWhCLENBVFU7QUFVVixRQUFJLElBQUksSUFBRSxDQUFGLEVBQUksSUFBRSxLQUFGLEVBQVEsR0FBcEI7QUFDQyxTQUFLLE1BQUwsQ0FBWSxPQUFaLENBQW9CLFlBQXBCLENBQWlDLE1BQUksQ0FBSixFQUFNLENBQXZDO0lBREQ7Ozs7UUFqQkk7RUFBbUIsZ0JBQU0sY0FBTjs7QUFzQnpCLEdBQUcsVUFBSCxHQUFjLFVBQWQiLCJmaWxlIjoidGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJ1xuaW1wb3J0IFN0eWxlIGZyb20gJy4vc3R5bGUvdGFibGUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRkIGV4dGVuZHMgQ29udmVydGVye1xuXHRnZXQgdGFnKCl7cmV0dXJuICd0ZCd9XG5cdFxuXHRjb252ZXJ0U3R5bGUoZWwpe1xuXHRcdHN1cGVyLmNvbnZlcnRTdHlsZSguLi5hcmd1bWVudHMpXG5cdFx0dmFyIHN0eWxlPXRoaXMud29yZE1vZGVsLmdldERpcmVjdFN0eWxlKClcblx0XHRzdHlsZSAmJiBzdHlsZS5wYXJzZShbbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyhlbC5zdHlsZSx0aGlzKV0pXG5cdH1cblxufVxuXG5jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuQ2VsbFByb3BlcnRpZXN7XG5cdHRjQm9yZGVycyh4KXtcblx0XHR4LmxlZnQgJiYgKHRoaXMuc3R5bGUuYm9yZGVyTGVmdD10aGlzLl9ib3JkZXIoeC5sZWZ0KSlcblx0XHR4LnJpZ2h0ICYmICh0aGlzLnN0eWxlLmJvcmRlclJpZ2h0PXRoaXMuX2JvcmRlcih4LnJpZ2h0KSlcblx0XHR4LnRvcCAmJiAodGhpcy5zdHlsZS5ib3JkZXJUb3A9dGhpcy5fYm9yZGVyKHgudG9wKSlcblx0XHR4LmJvdHRvbSAmJiAodGhpcy5zdHlsZS5ib3JkZXJCb3R0b209dGhpcy5fYm9yZGVyKHguYm90dG9tKSlcblx0fVxuXHRjbmZTdHlsZSh4KXtcblx0XHR2YXIgbmFtZXM9W10sIFByaW9yaXRpemllZFN0eWxlcz1TdHlsZS5wcm90b3R5cGUuUHJpb3JpdGl6aWVkU3R5bGVzLCBsZXZlbD0tMSwgdFxuXHRcdGZvcih2YXIgaT0wO2k8MTI7aSsrKXtcblx0XHRcdGlmKHguY2hhckF0KGkpPT0nMScpe1xuXHRcdFx0XHRuYW1lcy5wdXNoKHQ9U3R5bGUuVGFibGVTdHlsZXNbaV0pXG5cdFx0XHRcdGlmKCh0PVByaW9yaXRpemllZFN0eWxlcy5pbmRleE9mKHQpKT5sZXZlbClcblx0XHRcdFx0XHRsZXZlbD10XG5cdFx0XHR9XG5cdFx0fVxuXHRcdG5hbWVzLmxlbmd0aCAmJiBUZC5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LG5hbWVzLmpvaW4oJyAnKSk7XG5cdFx0Zm9yKHZhciBpPTA7aTxsZXZlbDtpKyspXG5cdFx0XHR0aGlzLnBhcmVudC5jb250ZW50LnNldEF0dHJpYnV0ZSgneCcraSwxKVxuXHR9XG59XG5cblRkLlByb3BlcnRpZXM9UHJvcGVydGllc1xuXG5cblxuIl19