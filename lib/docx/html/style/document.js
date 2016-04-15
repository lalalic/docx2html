'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _paragraph = require('./paragraph');

var _paragraph2 = _interopRequireDefault(_paragraph);

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Document = function (_Paragraph) {
	_inherits(Document, _Paragraph);

	function Document() {
		_classCallCheck(this, Document);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Document).apply(this, arguments));
	}

	_createClass(Document, [{
		key: '_getPropertiesConverter',
		value: function _getPropertiesConverter(category) {
			if (this[category]) return this[category];
			switch (category) {
				case 'inline':
					this.inlineStyle = this.doc.createStyle('span,a');
					return this[category] = new _inline2.default.Properties(this.inlineStyle);
				case 'paragraph':
					this.paragraphStyle = this.doc.createStyle('p,h1,h2,h3,h4,h5,h6');
					return this[category] = new this.constructor.Properties(this.paragraphStyle);
			}
		}
	}]);

	return Document;
}(_paragraph2.default);

exports.default = Document;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzBDQUNJLFVBQVM7QUFDaEMsT0FBRyxLQUFLLFFBQUwsQ0FBSCxFQUNDLE9BQU8sS0FBSyxRQUFMLENBQVAsQ0FERDtBQUVBLFdBQU8sUUFBUDtBQUNBLFNBQUssUUFBTDtBQUNDLFVBQUssV0FBTCxHQUFpQixLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLFFBQXJCLENBQWpCLENBREQ7QUFFQyxZQUFPLEtBQUssUUFBTCxJQUFlLElBQUksaUJBQU8sVUFBUCxDQUFrQixLQUFLLFdBQUwsQ0FBckMsQ0FGUjtBQURBLFNBSUssV0FBTDtBQUNDLFVBQUssY0FBTCxHQUFvQixLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLHFCQUFyQixDQUFwQixDQUREO0FBRUMsWUFBTyxLQUFLLFFBQUwsSUFBZSxJQUFJLEtBQUssV0FBTCxDQUFpQixVQUFqQixDQUE0QixLQUFLLGNBQUwsQ0FBL0MsQ0FGUjtBQUpBLElBSGdDOzs7O1FBRGIiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFyYWdyYXBoIGZyb20gJy4vcGFyYWdyYXBoJ1xuaW1wb3J0IElubGluZSBmcm9tICcuL2lubGluZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBQYXJhZ3JhcGh7XG5cdF9nZXRQcm9wZXJ0aWVzQ29udmVydGVyKGNhdGVnb3J5KXtcblx0XHRpZih0aGlzW2NhdGVnb3J5XSlcblx0XHRcdHJldHVybiB0aGlzW2NhdGVnb3J5XVxuXHRcdHN3aXRjaChjYXRlZ29yeSl7XG5cdFx0Y2FzZSAnaW5saW5lJzpcblx0XHRcdHRoaXMuaW5saW5lU3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3NwYW4sYScpXG5cdFx0XHRyZXR1cm4gdGhpc1tjYXRlZ29yeV09bmV3IElubGluZS5Qcm9wZXJ0aWVzKHRoaXMuaW5saW5lU3R5bGUpXG5cdFx0Y2FzZSAncGFyYWdyYXBoJzpcblx0XHRcdHRoaXMucGFyYWdyYXBoU3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3AsaDEsaDIsaDMsaDQsaDUsaDYnKVxuXHRcdFx0cmV0dXJuIHRoaXNbY2F0ZWdvcnldPW5ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXModGhpcy5wYXJhZ3JhcGhTdHlsZSlcblx0XHR9XG5cdH1cbn0iXX0=