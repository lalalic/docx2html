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

var _paragraph = require('./paragraph');

var _paragraph2 = _interopRequireDefault(_paragraph);

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Document = function (_Paragraph) {
	(0, _inherits3.default)(Document, _Paragraph);

	function Document() {
		(0, _classCallCheck3.default)(this, Document);
		return (0, _possibleConstructorReturn3.default)(this, (Document.__proto__ || (0, _getPrototypeOf2.default)(Document)).apply(this, arguments));
	}

	(0, _createClass3.default)(Document, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiRG9jdW1lbnQiLCJjYXRlZ29yeSIsImlubGluZVN0eWxlIiwiZG9jIiwiY3JlYXRlU3R5bGUiLCJQcm9wZXJ0aWVzIiwicGFyYWdyYXBoU3R5bGUiLCJjb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7MENBQ0lDLFEsRUFBUztBQUNoQyxPQUFHLEtBQUtBLFFBQUwsQ0FBSCxFQUNDLE9BQU8sS0FBS0EsUUFBTCxDQUFQO0FBQ0QsV0FBT0EsUUFBUDtBQUNBLFNBQUssUUFBTDtBQUNDLFVBQUtDLFdBQUwsR0FBaUIsS0FBS0MsR0FBTCxDQUFTQyxXQUFULENBQXFCLFFBQXJCLENBQWpCO0FBQ0EsWUFBTyxLQUFLSCxRQUFMLElBQWUsSUFBSSxpQkFBT0ksVUFBWCxDQUFzQixLQUFLSCxXQUEzQixDQUF0QjtBQUNELFNBQUssV0FBTDtBQUNDLFVBQUtJLGNBQUwsR0FBb0IsS0FBS0gsR0FBTCxDQUFTQyxXQUFULENBQXFCLHFCQUFyQixDQUFwQjtBQUNBLFlBQU8sS0FBS0gsUUFBTCxJQUFlLElBQUksS0FBS00sV0FBTCxDQUFpQkYsVUFBckIsQ0FBZ0MsS0FBS0MsY0FBckMsQ0FBdEI7QUFORDtBQVFBOzs7OztrQkFabUJOLFEiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFyYWdyYXBoIGZyb20gJy4vcGFyYWdyYXBoJ1xuaW1wb3J0IElubGluZSBmcm9tICcuL2lubGluZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBQYXJhZ3JhcGh7XG5cdF9nZXRQcm9wZXJ0aWVzQ29udmVydGVyKGNhdGVnb3J5KXtcblx0XHRpZih0aGlzW2NhdGVnb3J5XSlcblx0XHRcdHJldHVybiB0aGlzW2NhdGVnb3J5XVxuXHRcdHN3aXRjaChjYXRlZ29yeSl7XG5cdFx0Y2FzZSAnaW5saW5lJzpcblx0XHRcdHRoaXMuaW5saW5lU3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3NwYW4sYScpXG5cdFx0XHRyZXR1cm4gdGhpc1tjYXRlZ29yeV09bmV3IElubGluZS5Qcm9wZXJ0aWVzKHRoaXMuaW5saW5lU3R5bGUpXG5cdFx0Y2FzZSAncGFyYWdyYXBoJzpcblx0XHRcdHRoaXMucGFyYWdyYXBoU3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3AsaDEsaDIsaDMsaDQsaDUsaDYnKVxuXHRcdFx0cmV0dXJuIHRoaXNbY2F0ZWdvcnldPW5ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXModGhpcy5wYXJhZ3JhcGhTdHlsZSlcblx0XHR9XG5cdH1cbn0iXX0=