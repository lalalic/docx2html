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

var FieldBegin = function (_Converter) {
	_inherits(FieldBegin, _Converter);

	function FieldBegin() {
		_classCallCheck(this, FieldBegin);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(FieldBegin).apply(this, arguments));
	}

	_createClass(FieldBegin, [{
		key: 'convert',
		value: function convert(wordField, endConverter) {
			if (!wordField) return _get(Object.getPrototypeOf(FieldBegin.prototype), 'convert', this).apply(this, arguments);
			var converter = this.constructor.factory(wordField, this);
			converter && converter.convert(endConverter && endConverter.content);
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'span';
		}
	}], [{
		key: 'factory',
		value: function factory(wordField, parent) {
			try {
				var Model = require('./factory')[wordField.type];
				return new Model(wordField, parent);
			} catch (e) {}
		}
	}]);

	return FieldBegin;
}(_converter2.default);

exports.default = FieldBegin;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZmllbGRCZWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7MEJBR1osV0FBVyxjQUFhO0FBQy9CLE9BQUcsQ0FBQyxTQUFELEVBQ0Ysa0NBTGtCLG9EQUtNLFVBQXhCLENBREQ7QUFFQSxPQUFJLFlBQVUsS0FBSyxXQUFMLENBQWlCLE9BQWpCLENBQXlCLFNBQXpCLEVBQW9DLElBQXBDLENBQVYsQ0FIMkI7QUFJL0IsZ0JBQWEsVUFBVSxPQUFWLENBQWtCLGdCQUFnQixhQUFhLE9BQWIsQ0FBL0MsQ0FKK0I7Ozs7c0JBRnZCO0FBQUMsVUFBTyxNQUFQLENBQUQ7Ozs7MEJBU00sV0FBVyxRQUFPO0FBQ2hDLE9BQUc7QUFDRixRQUFJLFFBQU0sUUFBUSxXQUFSLEVBQXFCLFVBQVUsSUFBVixDQUEzQixDQURGO0FBRUYsV0FBTyxJQUFJLEtBQUosQ0FBVSxTQUFWLEVBQXFCLE1BQXJCLENBQVAsQ0FGRTtJQUFILENBR0MsT0FBTSxDQUFOLEVBQVEsRUFBUjs7OztRQWRrQiIsImZpbGUiOiJmaWVsZEJlZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcidcdFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWVsZEJlZ2luIGV4dGVuZHMgQ29udmVydGVye1xuXHRnZXQgdGFnKCl7cmV0dXJuICdzcGFuJ31cblx0XG5cdGNvbnZlcnQod29yZEZpZWxkLCBlbmRDb252ZXJ0ZXIpe1xuXHRcdGlmKCF3b3JkRmllbGQpXG5cdFx0XHRyZXR1cm4gc3VwZXIuY29udmVydCguLi5hcmd1bWVudHMpXG5cdFx0dmFyIGNvbnZlcnRlcj10aGlzLmNvbnN0cnVjdG9yLmZhY3Rvcnkod29yZEZpZWxkLCB0aGlzKVxuXHRcdGNvbnZlcnRlciAmJiBjb252ZXJ0ZXIuY29udmVydChlbmRDb252ZXJ0ZXIgJiYgZW5kQ29udmVydGVyLmNvbnRlbnQpXG5cdH1cblx0XG5cdHN0YXRpYyBmYWN0b3J5KHdvcmRGaWVsZCwgcGFyZW50KXtcblx0XHR0cnl7XG5cdFx0XHR2YXIgTW9kZWw9cmVxdWlyZSgnLi9mYWN0b3J5Jylbd29yZEZpZWxkLnR5cGVdXG5cdFx0XHRyZXR1cm4gbmV3IE1vZGVsKHdvcmRGaWVsZCwgcGFyZW50KVxuXHRcdH1jYXRjaChlKXtcblx0XHR9XG5cdH1cbn0iXX0=