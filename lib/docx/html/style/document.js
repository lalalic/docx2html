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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiRG9jdW1lbnQiLCJjYXRlZ29yeSIsImlubGluZVN0eWxlIiwiZG9jIiwiY3JlYXRlU3R5bGUiLCJJbmxpbmUiLCJQcm9wZXJ0aWVzIiwicGFyYWdyYXBoU3R5bGUiLCJjb25zdHJ1Y3RvciIsIlBhcmFncmFwaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7MENBQ0lDLFEsRUFBUztBQUNoQyxPQUFHLEtBQUtBLFFBQUwsQ0FBSCxFQUNDLE9BQU8sS0FBS0EsUUFBTCxDQUFQO0FBQ0QsV0FBT0EsUUFBUDtBQUNBLFNBQUssUUFBTDtBQUNDLFVBQUtDLFdBQUwsR0FBaUIsS0FBS0MsR0FBTCxDQUFTQyxXQUFULENBQXFCLFFBQXJCLENBQWpCO0FBQ0EsWUFBTyxLQUFLSCxRQUFMLElBQWUsSUFBSUksaUJBQU9DLFVBQVgsQ0FBc0IsS0FBS0osV0FBM0IsQ0FBdEI7QUFDRCxTQUFLLFdBQUw7QUFDQyxVQUFLSyxjQUFMLEdBQW9CLEtBQUtKLEdBQUwsQ0FBU0MsV0FBVCxDQUFxQixxQkFBckIsQ0FBcEI7QUFDQSxZQUFPLEtBQUtILFFBQUwsSUFBZSxJQUFJLEtBQUtPLFdBQUwsQ0FBaUJGLFVBQXJCLENBQWdDLEtBQUtDLGNBQXJDLENBQXRCO0FBTkQ7QUFRQTs7O0VBWm9DRSxtQjs7a0JBQWpCVCxRIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhcmFncmFwaCBmcm9tICcuL3BhcmFncmFwaCdcbmltcG9ydCBJbmxpbmUgZnJvbSAnLi9pbmxpbmUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgUGFyYWdyYXBoe1xuXHRfZ2V0UHJvcGVydGllc0NvbnZlcnRlcihjYXRlZ29yeSl7XG5cdFx0aWYodGhpc1tjYXRlZ29yeV0pXG5cdFx0XHRyZXR1cm4gdGhpc1tjYXRlZ29yeV1cblx0XHRzd2l0Y2goY2F0ZWdvcnkpe1xuXHRcdGNhc2UgJ2lubGluZSc6XG5cdFx0XHR0aGlzLmlubGluZVN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCdzcGFuLGEnKVxuXHRcdFx0cmV0dXJuIHRoaXNbY2F0ZWdvcnldPW5ldyBJbmxpbmUuUHJvcGVydGllcyh0aGlzLmlubGluZVN0eWxlKVxuXHRcdGNhc2UgJ3BhcmFncmFwaCc6XG5cdFx0XHR0aGlzLnBhcmFncmFwaFN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCdwLGgxLGgyLGgzLGg0LGg1LGg2Jylcblx0XHRcdHJldHVybiB0aGlzW2NhdGVnb3J5XT1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Qcm9wZXJ0aWVzKHRoaXMucGFyYWdyYXBoU3R5bGUpXG5cdFx0fVxuXHR9XG59Il19