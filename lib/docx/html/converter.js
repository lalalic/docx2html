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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvY29udmVydGVyLmpzIl0sIm5hbWVzIjpbImRpdkNvbnRhaW5lcnMiLCJzcGxpdCIsIkNvbnZlcnRlciIsIndNb2RlbCIsInBhcmVudENvbnZlcnRlciIsIndvcmRNb2RlbCIsInBhcmVudCIsImRvYyIsImNvbnRlbnQiLCJjb252ZXJ0IiwiYXJndW1lbnRzIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY29udmVydFN0eWxlIiwidGFnIiwiZWwiLCJhIiwiZ2V0U3R5bGVJZCIsImNvbnN0cnVjdG9yIiwiYWRkQ2xhc3MiLCJzdHlsZVBhdGgiLCJhc0Nzc0lEIiwicmVwbGFjZSIsImNsYXNzZXMiLCJzZXRBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsZ0JBQWMsaUJBQWlCQyxLQUFqQixDQUF1QixHQUF2QixDQUFsQjs7SUFFcUJDLFM7QUFDcEIsb0JBQVlDLE1BQVosRUFBb0JDLGVBQXBCLEVBQW9DO0FBQUE7O0FBQ25DLE9BQUtDLFNBQUwsR0FBZUYsTUFBZjtBQUNBLE9BQUtHLE1BQUwsR0FBWUYsZUFBWjtBQUNBLE9BQUtHLEdBQUwsR0FBVUgsbUJBQW1CQSxnQkFBZ0JHLEdBQTdDO0FBQ0EsT0FBS0MsT0FBTCxHQUFhLElBQWI7QUFDQTs7Ozs7QUFHRDswQkFDTztBQUNOLE9BQUcsQ0FBQyxLQUFLRixNQUFOLElBQWdCLEtBQUtBLE1BQUwsQ0FBWUUsT0FBL0IsRUFDQyxPQUFPLEtBQUtDLE9BQUwsYUFBZ0JDLFNBQWhCLENBQVA7QUFDRDs7OzRCQUNRO0FBQ1IsUUFBS0YsT0FBTCxHQUFhLEtBQUtHLGFBQUwsRUFBYjtBQUNBLE9BQUcsS0FBS0gsT0FBUixFQUFnQjtBQUNmLFNBQUtGLE1BQUwsQ0FBWUUsT0FBWixDQUFvQkksV0FBcEIsQ0FBZ0MsS0FBS0osT0FBckM7QUFDQSxJQUZELE1BR0MsS0FBS0EsT0FBTCxHQUFhLEtBQUtGLE1BQUwsSUFBZSxLQUFLQSxNQUFMLENBQVlFLE9BQTNCLElBQXNDLElBQW5EOztBQUVELFFBQUtLLFlBQUwsQ0FBa0IsS0FBS0wsT0FBdkI7QUFDQTs7O2tDQUNjO0FBQ2QsaUNBQWMsS0FBS00sR0FBbkI7QUFDQSxTQUFLLFFBQUw7QUFDQyxZQUFPLEtBQUtQLEdBQUwsQ0FBU0ksYUFBVCxDQUF1QixLQUFLRyxHQUE1QixDQUFQO0FBQ0QsU0FBSyxVQUFMO0FBQ0MsU0FBSUMsS0FBRyxLQUFLRCxHQUFMLEVBQVA7QUFDQSxZQUFPLEtBQUtQLEdBQUwsQ0FBU0ksYUFBVCxDQUF1QkksRUFBdkIsQ0FBUDtBQUNEO0FBQ0MsWUFBTyxJQUFQO0FBUEQ7QUFTQTs7OytCQUNZQSxFLEVBQUlDLEMsRUFBRTtBQUNsQixRQUFLWCxTQUFMLENBQWVZLFVBQWYsS0FDS0QsSUFBRSxLQUFLWCxTQUFMLENBQWVZLFVBQWYsRUFEUCxLQUVJLEtBQUtDLFdBQUwsQ0FBaUJDLFFBQWpCLENBQTBCSixFQUExQixFQUE2QixLQUFLUixHQUFMLENBQVNhLFNBQVQsQ0FBbUIsS0FBS0YsV0FBTCxDQUFpQkcsT0FBakIsQ0FBeUJMLENBQXpCLENBQW5CLENBQTdCLENBRko7QUFHQTs7O2tDQUNjO0FBQ2QsVUFBTyxLQUFQO0FBQ0E7Ozs0QkFDUSxDQUFFOzs7c0JBbkNHO0FBQUMsVUFBTyxJQUFQO0FBQVk7OztzQkFDbEI7QUFBQyxVQUFPLElBQVA7QUFBWTs7OzBCQW9DUEEsQyxFQUFFO0FBQ2hCLFVBQU9BLEVBQUVNLE9BQUYsQ0FBVSxNQUFWLEVBQWlCLEdBQWpCLENBQVA7QUFDQTs7OzJCQUNlUCxFLEVBQUlRLE8sRUFBUTtBQUMzQlIsTUFBR1MsWUFBSCxDQUFnQixPQUFoQixFQUF5QixDQUFDVCxHQUFHVSxZQUFILENBQWdCLE9BQWhCLEtBQTBCLEVBQTNCLElBQStCLEdBQS9CLEdBQW1DRixPQUE1RDtBQUNBOzs7OztrQkFqRG1CckIsUyIsImZpbGUiOiJjb252ZXJ0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGl2Q29udGFpbmVycz0nU0VDVElPTixESVYsVEQnLnNwbGl0KCcsJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnZlcnRlcntcblx0Y29uc3RydWN0b3Iod01vZGVsLCBwYXJlbnRDb252ZXJ0ZXIpe1xuXHRcdHRoaXMud29yZE1vZGVsPXdNb2RlbFxuXHRcdHRoaXMucGFyZW50PXBhcmVudENvbnZlcnRlclxuXHRcdHRoaXMuZG9jPSBwYXJlbnRDb252ZXJ0ZXIgJiYgcGFyZW50Q29udmVydGVyLmRvY1xuXHRcdHRoaXMuY29udGVudD1udWxsO1xuXHR9XG5cdGdldCB3b3JkVHlwZSgpe3JldHVybiBudWxsfVxuXHRnZXQgdGFnKCl7cmV0dXJuIG51bGx9XG5cdC8qKmludGVyZmFjZSBBUEk6IGhhcHBlbiB3aGVuIGp1c3Qgd29yZCBtb2RlbCBpZGVudGlmaWVkLCB3aXRob3V0IGNoaWxkcmVuIGFwcGVuZGVkIHlldCovXG5cdHZpc2l0KCl7XG5cdFx0aWYoIXRoaXMucGFyZW50IHx8IHRoaXMucGFyZW50LmNvbnRlbnQpXG5cdFx0XHRyZXR1cm4gdGhpcy5jb252ZXJ0KC4uLmFyZ3VtZW50cylcblx0fVxuXHRjb252ZXJ0KCl7XG5cdFx0dGhpcy5jb250ZW50PXRoaXMuY3JlYXRlRWxlbWVudCgpXG5cdFx0aWYodGhpcy5jb250ZW50KXtcblx0XHRcdHRoaXMucGFyZW50LmNvbnRlbnQuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KVxuXHRcdH1lbHNlXG5cdFx0XHR0aGlzLmNvbnRlbnQ9dGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuY29udGVudCB8fCBudWxsXG5cdFx0XHRcblx0XHR0aGlzLmNvbnZlcnRTdHlsZSh0aGlzLmNvbnRlbnQpXG5cdH1cblx0Y3JlYXRlRWxlbWVudCgpe1xuXHRcdHN3aXRjaCh0eXBlb2YodGhpcy50YWcpKXtcblx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0cmV0dXJuIHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQodGhpcy50YWcpXG5cdFx0Y2FzZSAnZnVuY3Rpb24nOlxuXHRcdFx0dmFyIGVsPXRoaXMudGFnKClcblx0XHRcdHJldHVybiB0aGlzLmRvYy5jcmVhdGVFbGVtZW50KGVsKVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdH1cblx0fVxuXHRjb252ZXJ0U3R5bGUoZWwsIGEpe1xuXHRcdHRoaXMud29yZE1vZGVsLmdldFN0eWxlSWQgXG5cdFx0XHQmJiAoYT10aGlzLndvcmRNb2RlbC5nZXRTdHlsZUlkKCkpIFxuXHRcdFx0JiYgdGhpcy5jb25zdHJ1Y3Rvci5hZGRDbGFzcyhlbCx0aGlzLmRvYy5zdHlsZVBhdGgodGhpcy5jb25zdHJ1Y3Rvci5hc0Nzc0lEKGEpKSk7XG5cdH1cblx0X3Nob3VsZElnbm9yZSgpe1xuXHRcdHJldHVybiBmYWxzZVxuXHR9XG5cdHJlbGVhc2UoKXt9XG5cblx0c3RhdGljIGFzQ3NzSUQoYSl7XG5cdFx0cmV0dXJuIGEucmVwbGFjZSgvXFxzKy9nLCdfJylcblx0fVxuXHRzdGF0aWMgYWRkQ2xhc3MoZWwsIGNsYXNzZXMpe1xuXHRcdGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAoZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpfHwnJykrJyAnK2NsYXNzZXMpXG5cdH1cbn1cbiJdfQ==