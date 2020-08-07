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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvY29udmVydGVyLmpzIl0sIm5hbWVzIjpbImRpdkNvbnRhaW5lcnMiLCJzcGxpdCIsIkNvbnZlcnRlciIsIndNb2RlbCIsInBhcmVudENvbnZlcnRlciIsIndvcmRNb2RlbCIsInBhcmVudCIsImRvYyIsImNvbnRlbnQiLCJjb252ZXJ0IiwiYXJndW1lbnRzIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY29udmVydFN0eWxlIiwidGFnIiwiZWwiLCJhIiwiZ2V0U3R5bGVJZCIsImNvbnN0cnVjdG9yIiwiYWRkQ2xhc3MiLCJzdHlsZVBhdGgiLCJhc0Nzc0lEIiwicmVwbGFjZSIsImNsYXNzZXMiLCJzZXRBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsZ0JBQWMsaUJBQWlCQyxLQUFqQixDQUF1QixHQUF2QixDQUFsQjs7SUFFcUJDLFM7QUFDbkIscUJBQVlDLE1BQVosRUFBb0JDLGVBQXBCLEVBQW9DO0FBQUE7O0FBQ2xDLFNBQUtDLFNBQUwsR0FBZUYsTUFBZjtBQUNBLFNBQUtHLE1BQUwsR0FBWUYsZUFBWjtBQUNBLFNBQUtHLEdBQUwsR0FBVUgsbUJBQW1CQSxnQkFBZ0JHLEdBQTdDO0FBQ0EsU0FBS0MsT0FBTCxHQUFhLElBQWI7QUFDRDs7Ozs7QUFHRDs0QkFDTztBQUNMLFVBQUcsQ0FBQyxLQUFLRixNQUFOLElBQWdCLEtBQUtBLE1BQUwsQ0FBWUUsT0FBL0IsRUFDRSxPQUFPLEtBQUtDLE9BQUwsYUFBZ0JDLFNBQWhCLENBQVA7QUFDSDs7OzhCQUNRO0FBQ1AsV0FBS0YsT0FBTCxHQUFhLEtBQUtHLGFBQUwsRUFBYjtBQUNBLFVBQUcsS0FBS0gsT0FBUixFQUFnQjtBQUNkLGFBQUtGLE1BQUwsQ0FBWUUsT0FBWixDQUFvQkksV0FBcEIsQ0FBZ0MsS0FBS0osT0FBckM7QUFDRCxPQUZELE1BR0UsS0FBS0EsT0FBTCxHQUFhLEtBQUtGLE1BQUwsSUFBZSxLQUFLQSxNQUFMLENBQVlFLE9BQTNCLElBQXNDLElBQW5EOztBQUVGLFdBQUtLLFlBQUwsQ0FBa0IsS0FBS0wsT0FBdkI7QUFDRDs7O29DQUNjO0FBQ2Isb0NBQWMsS0FBS00sR0FBbkI7QUFDQSxhQUFLLFFBQUw7QUFDRSxpQkFBTyxLQUFLUCxHQUFMLENBQVNJLGFBQVQsQ0FBdUIsS0FBS0csR0FBNUIsQ0FBUDtBQUNGLGFBQUssVUFBTDtBQUNFLGNBQUlDLEtBQUcsS0FBS0QsR0FBTCxFQUFQO0FBQ0EsaUJBQU8sS0FBS1AsR0FBTCxDQUFTSSxhQUFULENBQXVCSSxFQUF2QixDQUFQO0FBQ0Y7QUFDRSxpQkFBTyxJQUFQO0FBUEY7QUFTRDs7O2lDQUNZQSxFLEVBQUlDLEMsRUFBRTtBQUNqQixXQUFLWCxTQUFMLENBQWVZLFVBQWYsS0FDTUQsSUFBRSxLQUFLWCxTQUFMLENBQWVZLFVBQWYsRUFEUixLQUVLLEtBQUtDLFdBQUwsQ0FBaUJDLFFBQWpCLENBQTBCSixFQUExQixFQUE2QixLQUFLUixHQUFMLENBQVNhLFNBQVQsQ0FBbUIsS0FBS0YsV0FBTCxDQUFpQkcsT0FBakIsQ0FBeUJMLENBQXpCLENBQW5CLENBQTdCLENBRkw7QUFHRDs7O29DQUNjO0FBQ2IsYUFBTyxLQUFQO0FBQ0Q7Ozs4QkFDUSxDQUFFOzs7d0JBbkNHO0FBQUMsYUFBTyxJQUFQO0FBQVk7Ozt3QkFDbEI7QUFBQyxhQUFPLElBQVA7QUFBWTs7OzRCQW9DUEEsQyxFQUFFO0FBQ2YsYUFBT0EsRUFBRU0sT0FBRixDQUFVLE1BQVYsRUFBaUIsR0FBakIsQ0FBUDtBQUNEOzs7NkJBQ2VQLEUsRUFBSVEsTyxFQUFRO0FBQzFCUixTQUFHUyxZQUFILENBQWdCLE9BQWhCLEVBQXlCLENBQUNULEdBQUdVLFlBQUgsQ0FBZ0IsT0FBaEIsS0FBMEIsRUFBM0IsSUFBK0IsR0FBL0IsR0FBbUNGLE9BQTVEO0FBQ0Q7Ozs7O2tCQWpEa0JyQixTIiwiZmlsZSI6ImNvbnZlcnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBkaXZDb250YWluZXJzPSdTRUNUSU9OLERJVixURCcuc3BsaXQoJywnKTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udmVydGVye1xuICBjb25zdHJ1Y3Rvcih3TW9kZWwsIHBhcmVudENvbnZlcnRlcil7XG4gICAgdGhpcy53b3JkTW9kZWw9d01vZGVsXG4gICAgdGhpcy5wYXJlbnQ9cGFyZW50Q29udmVydGVyXG4gICAgdGhpcy5kb2M9IHBhcmVudENvbnZlcnRlciAmJiBwYXJlbnRDb252ZXJ0ZXIuZG9jXG4gICAgdGhpcy5jb250ZW50PW51bGw7XG4gIH1cbiAgZ2V0IHdvcmRUeXBlKCl7cmV0dXJuIG51bGx9XG4gIGdldCB0YWcoKXtyZXR1cm4gbnVsbH1cbiAgLyoqaW50ZXJmYWNlIEFQSTogaGFwcGVuIHdoZW4ganVzdCB3b3JkIG1vZGVsIGlkZW50aWZpZWQsIHdpdGhvdXQgY2hpbGRyZW4gYXBwZW5kZWQgeWV0Ki9cbiAgdmlzaXQoKXtcbiAgICBpZighdGhpcy5wYXJlbnQgfHwgdGhpcy5wYXJlbnQuY29udGVudClcbiAgICAgIHJldHVybiB0aGlzLmNvbnZlcnQoLi4uYXJndW1lbnRzKVxuICB9XG4gIGNvbnZlcnQoKXtcbiAgICB0aGlzLmNvbnRlbnQ9dGhpcy5jcmVhdGVFbGVtZW50KClcbiAgICBpZih0aGlzLmNvbnRlbnQpe1xuICAgICAgdGhpcy5wYXJlbnQuY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpXG4gICAgfWVsc2VcbiAgICAgIHRoaXMuY29udGVudD10aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5jb250ZW50IHx8IG51bGxcbiAgICAgIFxuICAgIHRoaXMuY29udmVydFN0eWxlKHRoaXMuY29udGVudClcbiAgfVxuICBjcmVhdGVFbGVtZW50KCl7XG4gICAgc3dpdGNoKHR5cGVvZih0aGlzLnRhZykpe1xuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gdGhpcy5kb2MuY3JlYXRlRWxlbWVudCh0aGlzLnRhZylcbiAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICB2YXIgZWw9dGhpcy50YWcoKVxuICAgICAgcmV0dXJuIHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoZWwpXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG4gIGNvbnZlcnRTdHlsZShlbCwgYSl7XG4gICAgdGhpcy53b3JkTW9kZWwuZ2V0U3R5bGVJZCBcbiAgICAgICYmIChhPXRoaXMud29yZE1vZGVsLmdldFN0eWxlSWQoKSkgXG4gICAgICAmJiB0aGlzLmNvbnN0cnVjdG9yLmFkZENsYXNzKGVsLHRoaXMuZG9jLnN0eWxlUGF0aCh0aGlzLmNvbnN0cnVjdG9yLmFzQ3NzSUQoYSkpKTtcbiAgfVxuICBfc2hvdWxkSWdub3JlKCl7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgcmVsZWFzZSgpe31cblxuICBzdGF0aWMgYXNDc3NJRChhKXtcbiAgICByZXR1cm4gYS5yZXBsYWNlKC9cXHMrL2csJ18nKVxuICB9XG4gIHN0YXRpYyBhZGRDbGFzcyhlbCwgY2xhc3Nlcyl7XG4gICAgZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIChlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJyl8fCcnKSsnICcrY2xhc3NlcylcbiAgfVxufVxuIl19