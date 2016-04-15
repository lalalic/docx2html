'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var divContainers = 'SECTION,DIV,TD'.split(',');

var Converter = function () {
	function Converter(wModel, parentConverter) {
		_classCallCheck(this, Converter);

		this.wordModel = wModel;
		this.parent = parentConverter;
		this.doc = parentConverter && parentConverter.doc;
		this.content = null;
	}

	_createClass(Converter, [{
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
			switch (_typeof(this.tag)) {
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
			return a.replace(/\s+/g, '_');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvY29udmVydGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLElBQUksZ0JBQWMsaUJBQWlCLEtBQWpCLENBQXVCLEdBQXZCLENBQWQ7O0lBRWlCO0FBQ3BCLFVBRG9CLFNBQ3BCLENBQVksTUFBWixFQUFvQixlQUFwQixFQUFvQzt3QkFEaEIsV0FDZ0I7O0FBQ25DLE9BQUssU0FBTCxHQUFlLE1BQWYsQ0FEbUM7QUFFbkMsT0FBSyxNQUFMLEdBQVksZUFBWixDQUZtQztBQUduQyxPQUFLLEdBQUwsR0FBVSxtQkFBbUIsZ0JBQWdCLEdBQWhCLENBSE07QUFJbkMsT0FBSyxPQUFMLEdBQWEsSUFBYixDQUptQztFQUFwQzs7Y0FEb0I7Ozs7MEJBVWI7QUFDTixPQUFHLENBQUMsS0FBSyxNQUFMLElBQWUsS0FBSyxNQUFMLENBQVksT0FBWixFQUNsQixPQUFPLEtBQUssT0FBTCxhQUFnQixTQUFoQixDQUFQLENBREQ7Ozs7NEJBR1E7QUFDUixRQUFLLE9BQUwsR0FBYSxLQUFLLGFBQUwsRUFBYixDQURRO0FBRVIsT0FBRyxLQUFLLE9BQUwsRUFBYTtBQUNmLFNBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsV0FBcEIsQ0FBZ0MsS0FBSyxPQUFMLENBQWhDLENBRGU7SUFBaEIsTUFHQyxLQUFLLE9BQUwsR0FBYSxLQUFLLE1BQUwsSUFBZSxLQUFLLE1BQUwsQ0FBWSxPQUFaLElBQXVCLElBQXRDLENBSGQ7O0FBS0EsUUFBSyxZQUFMLENBQWtCLEtBQUssT0FBTCxDQUFsQixDQVBROzs7O2tDQVNNO0FBQ2QsbUJBQWMsS0FBSyxHQUFMLENBQWQ7QUFDQSxTQUFLLFFBQUw7QUFDQyxZQUFPLEtBQUssR0FBTCxDQUFTLGFBQVQsQ0FBdUIsS0FBSyxHQUFMLENBQTlCLENBREQ7QUFEQSxTQUdLLFVBQUw7QUFDQyxTQUFJLEtBQUcsS0FBSyxHQUFMLEVBQUgsQ0FETDtBQUVDLFlBQU8sS0FBSyxHQUFMLENBQVMsYUFBVCxDQUF1QixFQUF2QixDQUFQLENBRkQ7QUFIQTtBQU9DLFlBQU8sSUFBUCxDQUREO0FBTkEsSUFEYzs7OzsrQkFXRixJQUFJLEdBQUU7QUFDbEIsUUFBSyxTQUFMLENBQWUsVUFBZixLQUNLLElBQUUsS0FBSyxTQUFMLENBQWUsVUFBZixFQUFGLENBREwsSUFFSSxLQUFLLFdBQUwsQ0FBaUIsUUFBakIsQ0FBMEIsRUFBMUIsRUFBNkIsS0FBSyxHQUFMLENBQVMsU0FBVCxDQUFtQixLQUFLLFdBQUwsQ0FBaUIsT0FBakIsQ0FBeUIsQ0FBekIsQ0FBbkIsQ0FBN0IsQ0FGSixDQURrQjs7OztrQ0FLSjtBQUNkLFVBQU8sS0FBUCxDQURjOzs7OzRCQUdOOzs7c0JBbkNLO0FBQUMsVUFBTyxJQUFQLENBQUQ7Ozs7c0JBQ0w7QUFBQyxVQUFPLElBQVAsQ0FBRDs7OzswQkFvQ00sR0FBRTtBQUNoQixVQUFPLEVBQUUsT0FBRixDQUFVLE1BQVYsRUFBaUIsR0FBakIsQ0FBUCxDQURnQjs7OzsyQkFHRCxJQUFJLFNBQVE7QUFDM0IsTUFBRyxZQUFILENBQWdCLE9BQWhCLEVBQXlCLENBQUMsR0FBRyxZQUFILENBQWdCLE9BQWhCLEtBQTBCLEVBQTFCLENBQUQsR0FBK0IsR0FBL0IsR0FBbUMsT0FBbkMsQ0FBekIsQ0FEMkI7Ozs7UUEvQ1IiLCJmaWxlIjoiY29udmVydGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGRpdkNvbnRhaW5lcnM9J1NFQ1RJT04sRElWLFREJy5zcGxpdCgnLCcpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb252ZXJ0ZXJ7XG5cdGNvbnN0cnVjdG9yKHdNb2RlbCwgcGFyZW50Q29udmVydGVyKXtcblx0XHR0aGlzLndvcmRNb2RlbD13TW9kZWxcblx0XHR0aGlzLnBhcmVudD1wYXJlbnRDb252ZXJ0ZXJcblx0XHR0aGlzLmRvYz0gcGFyZW50Q29udmVydGVyICYmIHBhcmVudENvbnZlcnRlci5kb2Ncblx0XHR0aGlzLmNvbnRlbnQ9bnVsbDtcblx0fVxuXHRnZXQgd29yZFR5cGUoKXtyZXR1cm4gbnVsbH1cblx0Z2V0IHRhZygpe3JldHVybiBudWxsfVxuXHQvKippbnRlcmZhY2UgQVBJOiBoYXBwZW4gd2hlbiBqdXN0IHdvcmQgbW9kZWwgaWRlbnRpZmllZCwgd2l0aG91dCBjaGlsZHJlbiBhcHBlbmRlZCB5ZXQqL1xuXHR2aXNpdCgpe1xuXHRcdGlmKCF0aGlzLnBhcmVudCB8fCB0aGlzLnBhcmVudC5jb250ZW50KVxuXHRcdFx0cmV0dXJuIHRoaXMuY29udmVydCguLi5hcmd1bWVudHMpXG5cdH1cblx0Y29udmVydCgpe1xuXHRcdHRoaXMuY29udGVudD10aGlzLmNyZWF0ZUVsZW1lbnQoKVxuXHRcdGlmKHRoaXMuY29udGVudCl7XG5cdFx0XHR0aGlzLnBhcmVudC5jb250ZW50LmFwcGVuZENoaWxkKHRoaXMuY29udGVudClcblx0XHR9ZWxzZVxuXHRcdFx0dGhpcy5jb250ZW50PXRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmNvbnRlbnQgfHwgbnVsbFxuXHRcdFx0XG5cdFx0dGhpcy5jb252ZXJ0U3R5bGUodGhpcy5jb250ZW50KVxuXHR9XG5cdGNyZWF0ZUVsZW1lbnQoKXtcblx0XHRzd2l0Y2godHlwZW9mKHRoaXMudGFnKSl7XG5cdFx0Y2FzZSAnc3RyaW5nJzpcblx0XHRcdHJldHVybiB0aGlzLmRvYy5jcmVhdGVFbGVtZW50KHRoaXMudGFnKVxuXHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRcdHZhciBlbD10aGlzLnRhZygpXG5cdFx0XHRyZXR1cm4gdGhpcy5kb2MuY3JlYXRlRWxlbWVudChlbClcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIG51bGxcblx0XHR9XG5cdH1cblx0Y29udmVydFN0eWxlKGVsLCBhKXtcblx0XHR0aGlzLndvcmRNb2RlbC5nZXRTdHlsZUlkIFxuXHRcdFx0JiYgKGE9dGhpcy53b3JkTW9kZWwuZ2V0U3R5bGVJZCgpKSBcblx0XHRcdCYmIHRoaXMuY29uc3RydWN0b3IuYWRkQ2xhc3MoZWwsdGhpcy5kb2Muc3R5bGVQYXRoKHRoaXMuY29uc3RydWN0b3IuYXNDc3NJRChhKSkpO1xuXHR9XG5cdF9zaG91bGRJZ25vcmUoKXtcblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxuXHRyZWxlYXNlKCl7fVxuXG5cdHN0YXRpYyBhc0Nzc0lEKGEpe1xuXHRcdHJldHVybiBhLnJlcGxhY2UoL1xccysvZywnXycpXG5cdH1cblx0c3RhdGljIGFkZENsYXNzKGVsLCBjbGFzc2VzKXtcblx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgKGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKXx8JycpKycgJytjbGFzc2VzKVxuXHR9XG59XG4iXX0=