'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var divContainers = 'SECTION,DIV,TD'.split(',');

var Converter = function () {
	function Converter(wModel, parentConverter) {
		(0, _classCallCheck3.default)(this, Converter);

		this.wordModel = wModel;
		this.parent = parentConverter;
		this.doc = parentConverter && parentConverter.doc;
		this.content = null;
	}

	(0, _createClass3.default)(Converter, [{
		key: 'visit',

		/**interface API: happen when just word model identified, without children appended yet*/
		value: function visit() {
			if (!this.parent || this.parent.content) return this.convert.apply(this, arguments);
		}
	}, {
		key: 'convert',
		value: function convert() {
			this.content = this.createElement();
			if (this.content) {
				this.parent.content.appendChild(this.content);
			} else this.content = this.parent && this.parent.content || null;

			this.convertStyle(this.content);
		}
	}, {
		key: 'createElement',
		value: function createElement() {
			switch ((0, _typeof3.default)(this.tag)) {
				case 'string':
					return this.doc.createElement(this.tag);
				case 'function':
					var el = this.tag();
					return this.doc.createElement(el);
				default:
					return null;
			}
		}
	}, {
		key: 'convertStyle',
		value: function convertStyle(el, a) {
			this.wordModel.getStyleId && (a = this.wordModel.getStyleId()) && this.constructor.addClass(el, this.doc.stylePath(this.constructor.asCssID(a)));
		}
	}, {
		key: '_shouldIgnore',
		value: function _shouldIgnore() {
			return false;
		}
	}, {
		key: 'release',
		value: function release() {}
	}, {
		key: 'wordType',
		get: function get() {
			return null;
		}
	}, {
		key: 'tag',
		get: function get() {
			return null;
		}
	}], [{
		key: 'asCssID',
		value: function asCssID(a) {
			return a.replace(/\s+/g, '_').replace(/^\d/g, function (d) {
				return "_" + d;
			});
		}
	}, {
		key: 'addClass',
		value: function addClass(el, classes) {
			el.setAttribute('class', (el.getAttribute('class') || '') + ' ' + classes);
		}
	}]);
	return Converter;
}();

exports.default = Converter;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvY29udmVydGVyLmpzIl0sIm5hbWVzIjpbImRpdkNvbnRhaW5lcnMiLCJzcGxpdCIsIkNvbnZlcnRlciIsIndNb2RlbCIsInBhcmVudENvbnZlcnRlciIsIndvcmRNb2RlbCIsInBhcmVudCIsImRvYyIsImNvbnRlbnQiLCJjb252ZXJ0IiwiYXJndW1lbnRzIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY29udmVydFN0eWxlIiwidGFnIiwiZWwiLCJhIiwiZ2V0U3R5bGVJZCIsImNvbnN0cnVjdG9yIiwiYWRkQ2xhc3MiLCJzdHlsZVBhdGgiLCJhc0Nzc0lEIiwicmVwbGFjZSIsImQiLCJjbGFzc2VzIiwic2V0QXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLGdCQUFjLGlCQUFpQkMsS0FBakIsQ0FBdUIsR0FBdkIsQ0FBbEI7O0lBRXFCQyxTO0FBQ3BCLG9CQUFZQyxNQUFaLEVBQW9CQyxlQUFwQixFQUFvQztBQUFBOztBQUNuQyxPQUFLQyxTQUFMLEdBQWVGLE1BQWY7QUFDQSxPQUFLRyxNQUFMLEdBQVlGLGVBQVo7QUFDQSxPQUFLRyxHQUFMLEdBQVVILG1CQUFtQkEsZ0JBQWdCRyxHQUE3QztBQUNBLE9BQUtDLE9BQUwsR0FBYSxJQUFiO0FBQ0E7Ozs7O0FBR0Q7MEJBQ087QUFDTixPQUFHLENBQUMsS0FBS0YsTUFBTixJQUFnQixLQUFLQSxNQUFMLENBQVlFLE9BQS9CLEVBQ0MsT0FBTyxLQUFLQyxPQUFMLGFBQWdCQyxTQUFoQixDQUFQO0FBQ0Q7Ozs0QkFDUTtBQUNSLFFBQUtGLE9BQUwsR0FBYSxLQUFLRyxhQUFMLEVBQWI7QUFDQSxPQUFHLEtBQUtILE9BQVIsRUFBZ0I7QUFDZixTQUFLRixNQUFMLENBQVlFLE9BQVosQ0FBb0JJLFdBQXBCLENBQWdDLEtBQUtKLE9BQXJDO0FBQ0EsSUFGRCxNQUdDLEtBQUtBLE9BQUwsR0FBYSxLQUFLRixNQUFMLElBQWUsS0FBS0EsTUFBTCxDQUFZRSxPQUEzQixJQUFzQyxJQUFuRDs7QUFFRCxRQUFLSyxZQUFMLENBQWtCLEtBQUtMLE9BQXZCO0FBQ0E7OztrQ0FDYztBQUNkLGlDQUFjLEtBQUtNLEdBQW5CO0FBQ0EsU0FBSyxRQUFMO0FBQ0MsWUFBTyxLQUFLUCxHQUFMLENBQVNJLGFBQVQsQ0FBdUIsS0FBS0csR0FBNUIsQ0FBUDtBQUNELFNBQUssVUFBTDtBQUNDLFNBQUlDLEtBQUcsS0FBS0QsR0FBTCxFQUFQO0FBQ0EsWUFBTyxLQUFLUCxHQUFMLENBQVNJLGFBQVQsQ0FBdUJJLEVBQXZCLENBQVA7QUFDRDtBQUNDLFlBQU8sSUFBUDtBQVBEO0FBU0E7OzsrQkFDWUEsRSxFQUFJQyxDLEVBQUU7QUFDbEIsUUFBS1gsU0FBTCxDQUFlWSxVQUFmLEtBQ0tELElBQUUsS0FBS1gsU0FBTCxDQUFlWSxVQUFmLEVBRFAsS0FFSSxLQUFLQyxXQUFMLENBQWlCQyxRQUFqQixDQUEwQkosRUFBMUIsRUFBNkIsS0FBS1IsR0FBTCxDQUFTYSxTQUFULENBQW1CLEtBQUtGLFdBQUwsQ0FBaUJHLE9BQWpCLENBQXlCTCxDQUF6QixDQUFuQixDQUE3QixDQUZKO0FBR0E7OztrQ0FDYztBQUNkLFVBQU8sS0FBUDtBQUNBOzs7NEJBQ1EsQ0FBRTs7O3NCQW5DRztBQUFDLFVBQU8sSUFBUDtBQUFZOzs7c0JBQ2xCO0FBQUMsVUFBTyxJQUFQO0FBQVk7OzswQkFvQ1BBLEMsRUFBRTtBQUNoQixVQUFPQSxFQUFFTSxPQUFGLENBQVUsTUFBVixFQUFpQixHQUFqQixFQUFzQkEsT0FBdEIsQ0FBOEIsTUFBOUIsRUFBcUM7QUFBQSxXQUFHLE1BQUlDLENBQVA7QUFBQSxJQUFyQyxDQUFQO0FBQ0E7OzsyQkFDZVIsRSxFQUFJUyxPLEVBQVE7QUFDM0JULE1BQUdVLFlBQUgsQ0FBZ0IsT0FBaEIsRUFBeUIsQ0FBQ1YsR0FBR1csWUFBSCxDQUFnQixPQUFoQixLQUEwQixFQUEzQixJQUErQixHQUEvQixHQUFtQ0YsT0FBNUQ7QUFDQTs7Ozs7a0JBakRtQnRCLFMiLCJmaWxlIjoiY29udmVydGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpdkNvbnRhaW5lcnM9J1NFQ1RJT04sRElWLFREJy5zcGxpdCgnLCcpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb252ZXJ0ZXJ7XG5cdGNvbnN0cnVjdG9yKHdNb2RlbCwgcGFyZW50Q29udmVydGVyKXtcblx0XHR0aGlzLndvcmRNb2RlbD13TW9kZWxcblx0XHR0aGlzLnBhcmVudD1wYXJlbnRDb252ZXJ0ZXJcblx0XHR0aGlzLmRvYz0gcGFyZW50Q29udmVydGVyICYmIHBhcmVudENvbnZlcnRlci5kb2Ncblx0XHR0aGlzLmNvbnRlbnQ9bnVsbDtcblx0fVxuXHRnZXQgd29yZFR5cGUoKXtyZXR1cm4gbnVsbH1cblx0Z2V0IHRhZygpe3JldHVybiBudWxsfVxuXHQvKippbnRlcmZhY2UgQVBJOiBoYXBwZW4gd2hlbiBqdXN0IHdvcmQgbW9kZWwgaWRlbnRpZmllZCwgd2l0aG91dCBjaGlsZHJlbiBhcHBlbmRlZCB5ZXQqL1xuXHR2aXNpdCgpe1xuXHRcdGlmKCF0aGlzLnBhcmVudCB8fCB0aGlzLnBhcmVudC5jb250ZW50KVxuXHRcdFx0cmV0dXJuIHRoaXMuY29udmVydCguLi5hcmd1bWVudHMpXG5cdH1cblx0Y29udmVydCgpe1xuXHRcdHRoaXMuY29udGVudD10aGlzLmNyZWF0ZUVsZW1lbnQoKVxuXHRcdGlmKHRoaXMuY29udGVudCl7XG5cdFx0XHR0aGlzLnBhcmVudC5jb250ZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudClcblx0XHR9ZWxzZVxuXHRcdFx0dGhpcy5jb250ZW50PXRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmNvbnRlbnQgfHwgbnVsbFxuXHRcdFx0XG5cdFx0dGhpcy5jb252ZXJ0U3R5bGUodGhpcy5jb250ZW50KVxuXHR9XG5cdGNyZWF0ZUVsZW1lbnQoKXtcblx0XHRzd2l0Y2godHlwZW9mKHRoaXMudGFnKSl7XG5cdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdHJldHVybiB0aGlzLmRvYy5jcmVhdGVFbGVtZW50KHRoaXMudGFnKVxuXHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRcdHZhciBlbD10aGlzLnRhZygpXG5cdFx0XHRyZXR1cm4gdGhpcy5kb2MuY3JlYXRlRWxlbWVudChlbClcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIG51bGxcblx0XHR9XG5cdH1cblx0Y29udmVydFN0eWxlKGVsLCBhKXtcblx0XHR0aGlzLndvcmRNb2RlbC5nZXRTdHlsZUlkIFxuXHRcdFx0JiYgKGE9dGhpcy53b3JkTW9kZWwuZ2V0U3R5bGVJZCgpKSBcblx0XHRcdCYmIHRoaXMuY29uc3RydWN0b3IuYWRkQ2xhc3MoZWwsdGhpcy5kb2Muc3R5bGVQYXRoKHRoaXMuY29uc3RydWN0b3IuYXNDc3NJRChhKSkpO1xuXHR9XG5cdF9zaG91bGRJZ25vcmUoKXtcblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxuXHRyZWxlYXNlKCl7fVxuXG5cdHN0YXRpYyBhc0Nzc0lEKGEpe1xuXHRcdHJldHVybiBhLnJlcGxhY2UoL1xccysvZywnXycpLnJlcGxhY2UoL15cXGQvZyxkPT5cIl9cIitkKVxuXHR9XG5cdHN0YXRpYyBhZGRDbGFzcyhlbCwgY2xhc3Nlcyl7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIChlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJyl8fCcnKSsnICcrY2xhc3Nlcylcblx0fVxufVxuIl19