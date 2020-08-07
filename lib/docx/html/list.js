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

var _p = require('./p');

var _p2 = _interopRequireDefault(_p);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = function (_Paragraph) {
  (0, _inherits3.default)(List, _Paragraph);

  function List() {
    (0, _classCallCheck3.default)(this, List);
    return (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).apply(this, arguments));
  }

  (0, _createClass3.default)(List, [{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvbGlzdC5qcyJdLCJuYW1lcyI6WyJMaXN0IiwiZWxQYXJlbnQiLCJwYXJlbnQiLCJjb250ZW50IiwidWwiLCJsYXN0RWxlbWVudENoaWxkIiwibGlzdFN0eWxlIiwid29yZE1vZGVsIiwiZ2V0TnVtYmVyaW5nU3R5bGUiLCJudW1JZCIsImlkIiwibGV2ZWwiLCJnZXRMZXZlbCIsIm1ha2VTdHJ1Y3R1cmUiLCJkb2MiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiY29uc3RydWN0b3IiLCJhZGRDbGFzcyIsImdldFBhcmVudFN0eWxlIiwiYXBwZW5kQ2hpbGQiLCJiaW5kIiwibG9jYWxOYW1lIiwiZ2V0QXR0cmlidXRlIiwicG9zc2libGVQYXJlbnQiLCJxdWVyeVNlbGVjdG9yIiwicGFyc2VJbnQiLCJsaSIsIm1hcmtlciIsImNvbnZlcnRTdHlsZSIsIlBhcmFncmFwaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7OzhCQUNWO0FBQ1AsVUFBSUMsV0FBUyxLQUFLQyxNQUFMLENBQVlDLE9BQXpCO0FBQUEsVUFBa0NDLEtBQUdILFNBQVNJLGdCQUE5QztBQUNBLFVBQUlDLFlBQVUsS0FBS0MsU0FBTCxDQUFlQyxpQkFBZixFQUFkO0FBQ0EsVUFBSUMsUUFBTUgsVUFBVUksRUFBcEI7QUFBQSxVQUF3QkMsUUFBTSxLQUFLSixTQUFMLENBQWVLLFFBQWYsRUFBOUI7O0FBRUEsVUFBSUMsZ0JBQWMsVUFBU1gsTUFBVCxFQUFnQjtBQUNoQ0UsYUFBRyxLQUFLVSxHQUFMLENBQVNDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBSDtBQUNBWCxXQUFHTSxFQUFILEdBQU1KLFVBQVVJLEVBQWhCO0FBQ0FOLFdBQUdZLFlBQUgsQ0FBZ0IsT0FBaEIsRUFBd0JMLEtBQXhCO0FBQ0EsYUFBS00sV0FBTCxDQUFpQkMsUUFBakIsQ0FBMEJkLEVBQTFCLEVBQTZCRSxVQUFVYSxjQUFWLEdBQTJCVCxFQUF4RDtBQUNBUixlQUFPa0IsV0FBUCxDQUFtQmhCLEVBQW5CO0FBQ0QsT0FOaUIsQ0FNaEJpQixJQU5nQixDQU1YLElBTlcsQ0FBbEI7O0FBUUEsVUFBRyxDQUFDakIsRUFBRCxJQUFPQSxHQUFHa0IsU0FBSCxJQUFjLElBQXJCLElBQTZCbEIsR0FBR00sRUFBSCxJQUFPRCxLQUF2QyxFQUE2QztBQUMzQ0ksc0JBQWNaLFFBQWQ7QUFDRCxPQUZELE1BRU0sSUFBR0csR0FBR21CLFlBQUgsQ0FBZ0IsT0FBaEIsS0FBMEJaLEtBQTdCLEVBQW1DO0FBQ3ZDLFlBQUlhLGlCQUFlcEIsR0FBR3FCLGFBQUgsQ0FBaUIsYUFBV2QsS0FBWCxHQUFpQixJQUFsQyxDQUFuQjtBQUNBLFlBQUcsQ0FBQ2EsY0FBSixFQUFtQjtBQUNqQlgsd0JBQWNULEdBQUdxQixhQUFILENBQWlCLGNBQVlDLFNBQVNmLEtBQVQsSUFBZ0IsQ0FBNUIsSUFBK0IsSUFBaEQsS0FBeURQLEVBQXZFO0FBQ0QsU0FGRCxNQUdFQSxLQUFHb0IsY0FBSDtBQUNIO0FBQ0QsVUFBSUcsS0FBRyxLQUFLYixHQUFMLENBQVNDLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBUDtBQUNBWCxTQUFHZ0IsV0FBSCxDQUFlTyxFQUFmO0FBQ0FBLFNBQUdQLFdBQUgsQ0FBZSxLQUFLakIsT0FBTCxHQUFhLEtBQUtZLGFBQUwsRUFBNUI7QUFDQSxVQUFJYSxTQUFPLEtBQUtkLEdBQUwsQ0FBU0MsYUFBVCxDQUF1QixNQUF2QixDQUFYO0FBQ0EsV0FBS0UsV0FBTCxDQUFpQkMsUUFBakIsQ0FBMEJVLE1BQTFCLEVBQWtDLFFBQWxDO0FBQ0EsV0FBS3pCLE9BQUwsQ0FBYWlCLFdBQWIsQ0FBeUJRLE1BQXpCLEVBM0JPLENBMkJ5QjtBQUNoQyxXQUFLQyxZQUFMLENBQWtCLEtBQUsxQixPQUF2QjtBQUNEOzs7RUE5QitCMkIsVzs7a0JBQWI5QixJIiwiZmlsZSI6Imxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFyYWdyYXBoIGZyb20gJy4vcCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdCBleHRlbmRzIFBhcmFncmFwaHtcbiAgY29udmVydCgpe1xuICAgIHZhciBlbFBhcmVudD10aGlzLnBhcmVudC5jb250ZW50LCB1bD1lbFBhcmVudC5sYXN0RWxlbWVudENoaWxkO1xuICAgIHZhciBsaXN0U3R5bGU9dGhpcy53b3JkTW9kZWwuZ2V0TnVtYmVyaW5nU3R5bGUoKVxuICAgIHZhciBudW1JZD1saXN0U3R5bGUuaWQsIGxldmVsPXRoaXMud29yZE1vZGVsLmdldExldmVsKClcbiAgICBcbiAgICB2YXIgbWFrZVN0cnVjdHVyZT1mdW5jdGlvbihwYXJlbnQpe1xuICAgICAgdWw9dGhpcy5kb2MuY3JlYXRlRWxlbWVudCgndWwnKVxuICAgICAgdWwuaWQ9bGlzdFN0eWxlLmlkXG4gICAgICB1bC5zZXRBdHRyaWJ1dGUoJ2xldmVsJyxsZXZlbClcbiAgICAgIHRoaXMuY29uc3RydWN0b3IuYWRkQ2xhc3ModWwsbGlzdFN0eWxlLmdldFBhcmVudFN0eWxlKCkuaWQpXG4gICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQodWwpXG4gICAgfS5iaW5kKHRoaXMpXG4gICAgXG4gICAgaWYoIXVsIHx8IHVsLmxvY2FsTmFtZSE9J3VsJyB8fCB1bC5pZCE9bnVtSWQpe1xuICAgICAgbWFrZVN0cnVjdHVyZShlbFBhcmVudClcbiAgICB9ZWxzZSBpZih1bC5nZXRBdHRyaWJ1dGUoJ2xldmVsJykhPWxldmVsKXtcbiAgICAgIHZhciBwb3NzaWJsZVBhcmVudD11bC5xdWVyeVNlbGVjdG9yKCdbbGV2ZWw9XCInK2xldmVsKydcIl0nKVxuICAgICAgaWYoIXBvc3NpYmxlUGFyZW50KXtcbiAgICAgICAgbWFrZVN0cnVjdHVyZSh1bC5xdWVyeVNlbGVjdG9yKCdbbGV2ZWw9XCInKyhwYXJzZUludChsZXZlbCktMSkrJ1wiXScpIHx8IHVsKVxuICAgICAgfWVsc2UgXG4gICAgICAgIHVsPXBvc3NpYmxlUGFyZW50XG4gICAgfVxuICAgIHZhciBsaT10aGlzLmRvYy5jcmVhdGVFbGVtZW50KCdsaScpXG4gICAgdWwuYXBwZW5kQ2hpbGQobGkpXG4gICAgbGkuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50PXRoaXMuY3JlYXRlRWxlbWVudCgpKVxuICAgIHZhciBtYXJrZXI9dGhpcy5kb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgdGhpcy5jb25zdHJ1Y3Rvci5hZGRDbGFzcyhtYXJrZXIsICdtYXJrZXInKVxuICAgIHRoaXMuY29udGVudC5hcHBlbmRDaGlsZChtYXJrZXIpLy9hcyBtYXJrZXJcbiAgICB0aGlzLmNvbnZlcnRTdHlsZSh0aGlzLmNvbnRlbnQpXG4gIH1cbn0iXX0=