'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _field = require('./field');

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function uptrim(el) {
	var parent = el.parentNode;
	parent.removeChild(el);
	if (parent.childNodes.length == 0) uptrim(parent);
}

var Hyperlink = function (_Field) {
	_inherits(Hyperlink, _Field);

	function Hyperlink() {
		_classCallCheck(this, Hyperlink);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Hyperlink).apply(this, arguments));
	}

	_createClass(Hyperlink, [{
		key: 'convert',
		value: function convert(elEnd) {
			var a = this.doc.createElement('a');
			a.href = this.wordModel.getLink();
			elEnd.id = this.doc.uid();

			var current = this.elStart,
			    parent = current.parentNode;
			while (!parent.querySelector('#' + elEnd.id)) {
				current = parent;
				parent = current.parentNode;
			}
			parent.insertBefore(a, current);
			while (a.nextSibling) {
				a.appendChild(a.nextSibling);
			}uptrim(this.elStart);
			uptrim(elEnd);
		}
	}]);

	return Hyperlink;
}(_field2.default);

exports.default = Hyperlink;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZmllbGQvaHlwZXJsaW5rLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUVBLFNBQVMsTUFBVCxDQUFnQixFQUFoQixFQUFtQjtBQUNsQixLQUFJLFNBQU8sR0FBRyxVQUFILENBRE87QUFFbEIsUUFBTyxXQUFQLENBQW1CLEVBQW5CLEVBRmtCO0FBR2xCLEtBQUcsT0FBTyxVQUFQLENBQWtCLE1BQWxCLElBQTBCLENBQTFCLEVBQ0YsT0FBTyxNQUFQLEVBREQ7Q0FIRDs7SUFNcUI7Ozs7Ozs7Ozs7OzBCQUNaLE9BQU07QUFDYixPQUFJLElBQUUsS0FBSyxHQUFMLENBQVMsYUFBVCxDQUF1QixHQUF2QixDQUFGLENBRFM7QUFFYixLQUFFLElBQUYsR0FBTyxLQUFLLFNBQUwsQ0FBZSxPQUFmLEVBQVAsQ0FGYTtBQUdiLFNBQU0sRUFBTixHQUFTLEtBQUssR0FBTCxDQUFTLEdBQVQsRUFBVCxDQUhhOztBQUtiLE9BQUksVUFBUSxLQUFLLE9BQUw7T0FBYyxTQUFPLFFBQVEsVUFBUixDQUxwQjtBQU1iLFVBQU0sQ0FBQyxPQUFPLGFBQVAsQ0FBcUIsTUFBSSxNQUFNLEVBQU4sQ0FBMUIsRUFBb0M7QUFDekMsY0FBUSxNQUFSLENBRHlDO0FBRXpDLGFBQU8sUUFBUSxVQUFSLENBRmtDO0lBQTFDO0FBSUEsVUFBTyxZQUFQLENBQW9CLENBQXBCLEVBQXVCLE9BQXZCLEVBVmE7QUFXYixVQUFNLEVBQUUsV0FBRjtBQUNMLE1BQUUsV0FBRixDQUFjLEVBQUUsV0FBRixDQUFkO0lBREQsTUFHQSxDQUFPLEtBQUssT0FBTCxDQUFQLENBZGE7QUFlYixVQUFPLEtBQVAsRUFmYTs7OztRQURNIiwiZmlsZSI6Imh5cGVybGluay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGaWVsZCBmcm9tICcuL2ZpZWxkJ1xuXG5mdW5jdGlvbiB1cHRyaW0oZWwpe1xuXHR2YXIgcGFyZW50PWVsLnBhcmVudE5vZGVcblx0cGFyZW50LnJlbW92ZUNoaWxkKGVsKVxuXHRpZihwYXJlbnQuY2hpbGROb2Rlcy5sZW5ndGg9PTApXG5cdFx0dXB0cmltKHBhcmVudClcbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh5cGVybGluayBleHRlbmRzIEZpZWxke1xuXHRjb252ZXJ0KGVsRW5kKXtcblx0XHR2YXIgYT10aGlzLmRvYy5jcmVhdGVFbGVtZW50KCdhJylcblx0XHRhLmhyZWY9dGhpcy53b3JkTW9kZWwuZ2V0TGluaygpXG5cdFx0ZWxFbmQuaWQ9dGhpcy5kb2MudWlkKClcblx0XHRcblx0XHR2YXIgY3VycmVudD10aGlzLmVsU3RhcnQsIHBhcmVudD1jdXJyZW50LnBhcmVudE5vZGVcblx0XHR3aGlsZSghcGFyZW50LnF1ZXJ5U2VsZWN0b3IoJyMnK2VsRW5kLmlkKSl7XG5cdFx0XHRjdXJyZW50PXBhcmVudFxuXHRcdFx0cGFyZW50PWN1cnJlbnQucGFyZW50Tm9kZVxuXHRcdH1cblx0XHRwYXJlbnQuaW5zZXJ0QmVmb3JlKGEsIGN1cnJlbnQpXG5cdFx0d2hpbGUoYS5uZXh0U2libGluZylcblx0XHRcdGEuYXBwZW5kQ2hpbGQoYS5uZXh0U2libGluZylcblx0XHRcblx0XHR1cHRyaW0odGhpcy5lbFN0YXJ0KVxuXHRcdHVwdHJpbShlbEVuZClcblx0fVxufSJdfQ==