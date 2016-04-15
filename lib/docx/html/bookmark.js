'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bookmark = function (_Converter) {
	_inherits(Bookmark, _Converter);

	function Bookmark() {
		_classCallCheck(this, Bookmark);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Bookmark).apply(this, arguments));
	}

	_createClass(Bookmark, [{
		key: 'convert',
		value: function convert() {
			if (this.parent.content.childNodes.length == 0 && !this.parent.content.id) {
				this.parent.content.id = this.wordModel.getName();
			} else {
				_get(Object.getPrototypeOf(Bookmark.prototype), 'convert', this).apply(this, arguments);
				this.content.id = this.wordModel.getName();
			}
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'i';
		}
	}]);

	return Bookmark;
}(_converter2.default);

exports.default = Bookmark;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvYm9va21hcmsuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzRCQUdYO0FBQ1IsT0FBRyxLQUFLLE1BQUwsQ0FBWSxPQUFaLENBQW9CLFVBQXBCLENBQStCLE1BQS9CLElBQXVDLENBQXZDLElBQTRDLENBQUMsS0FBSyxNQUFMLENBQVksT0FBWixDQUFvQixFQUFwQixFQUF1QjtBQUN0RSxTQUFLLE1BQUwsQ0FBWSxPQUFaLENBQW9CLEVBQXBCLEdBQXVCLEtBQUssU0FBTCxDQUFlLE9BQWYsRUFBdkIsQ0FEc0U7SUFBdkUsTUFFSztBQUNKLCtCQVBrQixrREFPRCxVQUFqQixDQURJO0FBRUosU0FBSyxPQUFMLENBQWEsRUFBYixHQUFnQixLQUFLLFNBQUwsQ0FBZSxPQUFmLEVBQWhCLENBRkk7SUFGTDs7OztzQkFIUTtBQUFDLFVBQU8sR0FBUCxDQUFEOzs7O1FBRFciLCJmaWxlIjoiYm9va21hcmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb29rbWFyayBleHRlbmRzIENvbnZlcnRlcntcblx0Z2V0IHRhZygpe3JldHVybiAnaSd9XG5cblx0Y29udmVydCgpe1xuXHRcdGlmKHRoaXMucGFyZW50LmNvbnRlbnQuY2hpbGROb2Rlcy5sZW5ndGg9PTAgJiYgIXRoaXMucGFyZW50LmNvbnRlbnQuaWQpe1xuXHRcdFx0dGhpcy5wYXJlbnQuY29udGVudC5pZD10aGlzLndvcmRNb2RlbC5nZXROYW1lKClcblx0XHR9ZWxzZXtcblx0XHRcdHN1cGVyLmNvbnZlcnQoLi4uYXJndW1lbnRzKVxuXHRcdFx0dGhpcy5jb250ZW50LmlkPXRoaXMud29yZE1vZGVsLmdldE5hbWUoKVxuXHRcdH1cblx0fVxuXG59Il19