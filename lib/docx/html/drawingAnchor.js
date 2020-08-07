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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _drawing = require('./drawing');

var _drawing2 = _interopRequireDefault(_drawing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unit = /[a-zA-Z]+$/g;
function asNum(a) {
	return parseFloat(a.replace(unit, ''));
}

var Anchor = function (_Drawing) {
	(0, _inherits3.default)(Anchor, _Drawing);

	function Anchor() {
		(0, _classCallCheck3.default)(this, Anchor);
		return (0, _possibleConstructorReturn3.default)(this, (Anchor.__proto__ || (0, _getPrototypeOf2.default)(Anchor)).apply(this, arguments));
	}

	(0, _createClass3.default)(Anchor, [{
		key: 'convertStyle',
		value: function convertStyle(el) {
			el.style.display = 'inline-block';
			el.style.position = 'relative';

			(0, _get3.default)(Anchor.prototype.__proto__ || (0, _getPrototypeOf2.default)(Anchor.prototype), 'convertStyle', this).apply(this, arguments);
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'div';
		}
	}]);
	return Anchor;
}(_drawing2.default);

exports.default = Anchor;


var PositionH = {
	page: function page(x) {
		var style = this.style,
		    t;
		switch (x.align) {
			case 'left':
				if ((t = this.world.width - asNum(this.doc.section.style.paddingLeft)) >= 0) style.left = 0;else style.left = -t + 'px';
				break;
			case 'center':
				style.left = (asNum(this.doc.section.style.width) - this.world.width) / 2 + 'px';
				break;
			case 'right':
				if ((t = this.world.width - asNum(this.doc.section.style.paddingRight)) >= 0) style.right = 0;else style.right = -t + 'px';
				break;
			case 'inside':
				style.left = 0;
				break;
			case 'outside':
				style.right = 0;
				break;
			default:
				style.left = x.posOffset + 'px';
				break;
		}
	},
	margin: function margin(x) {
		var sect = this.doc.section.style;
		switch (x.align) {
			case 'inside':
			case 'left':
				this.style.left = sect.paddingLeft;
				break;
			case 'center':
				this.style.left = (asNum(sect.width) - asNum(sect.paddingRight) + asNum(sect.paddingLeft) - this.world.width) / 2 + 'px';
				break;
			case 'outside':
			case 'right':
				this.style.right = sect.paddingRight;
				break;
			default:
				this.style.left = x.posOffset + asNum(sect.paddingLeft) + 'px';
				break;
		}
	},
	column: function column(x) {
		Anchor.addClass(this.parent.content, 'warning warning-positionH-column');
		PositionH.margin.call(this, x);
	},
	character: function character(x) {
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionH-character');
	},
	leftMargin: function leftMargin(x) {
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionH-leftMargin');
	},
	rightMargin: function rightMargin(x) {
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionH-rightMargin');
	},
	insideMargin: function insideMargin(x) {
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionH-insideMargin');
	},
	outsideMargin: function outsideMargin(x) {
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionH-outsideMargin');
	}
};
var PositionV = {
	page: function page(x) {
		var style = this.style,
		    sect = this.doc.section.style;
		switch (x.align) {
			case 'top':
				style.top = 0;
				break;
			case 'bottom':
				style.bottom = 0;
				break;
			case 'center':
			case 'outside':
			case 'inside':
				Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-page-' + x.align);
				break;
			default:
				style.top = x.posOffset + 'px';
				break;
		}
	},
	margin: function margin(x) {
		var style = this.style,
		    sect = this.doc.section.style;
		switch (x.align) {
			case 'top':
				style.top = sect.paddingTop;
				break;
			case 'bottom':
				style.bottom = sect.paddingBottom;
				break;
			case 'center':
			case 'outside':
			case 'inside':
				Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-margin-' + x.align);
				break;
			default:
				style.top = asNum(sect.paddingTop) + x.posOffset + 'px';
				break;
		}
	},
	line: function line(x) {
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-line');
	},
	topMargin: function topMargin(x) {
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-topMargin');
	},
	bottomMargin: function bottomMargin(x) {
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-bottomMargin');
	},
	insideMargin: function insideMargin(x) {
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-insideMargin');
	},
	outsideMargin: function outsideMargin(x) {
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-outsideMargin');
	},
	paragraph: function paragraph(x) {
		//only offset
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-paragraph');
	}
};

//only support absolute page offset

var Properties = function (_Drawing$Properties) {
	(0, _inherits3.default)(Properties, _Drawing$Properties);

	function Properties() {
		(0, _classCallCheck3.default)(this, Properties);
		return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
	}

	(0, _createClass3.default)(Properties, [{
		key: 'getParagraphPaddingLeft',
		value: function getParagraphPaddingLeft() {
			return '0pt';
		}
	}, {
		key: 'positionH',
		value: function positionH(x) {
			PositionH[x.relativeFrom].call(this, x);
		}
	}, {
		key: 'positionV',
		value: function positionV(x) {
			PositionV[x.relativeFrom].call(this, x);
		}
	}, {
		key: 'wrap',
		value: function wrap(x) {
			switch (x) {
				case 'tight':
				case 'through':
				case 'square':
				case 'topAndBottom':
					Anchor.addClass(this.parent.content, 'unsupported unsupported-wrap-' + x);
					break;
				default:
					this.style.position = 'absolute';
			}
		}
	}, {
		key: 'behindDoc',
		value: function behindDoc(x) {
			this.style.zIndex = -1;
		}
	}]);
	return Properties;
}(_drawing2.default.Properties);

Anchor.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZHJhd2luZ0FuY2hvci5qcyJdLCJuYW1lcyI6WyJ1bml0IiwiYXNOdW0iLCJhIiwicGFyc2VGbG9hdCIsInJlcGxhY2UiLCJBbmNob3IiLCJlbCIsInN0eWxlIiwiZGlzcGxheSIsInBvc2l0aW9uIiwiYXJndW1lbnRzIiwiRHJhd2luZyIsIlBvc2l0aW9uSCIsInBhZ2UiLCJ4IiwidCIsImFsaWduIiwid29ybGQiLCJ3aWR0aCIsImRvYyIsInNlY3Rpb24iLCJwYWRkaW5nTGVmdCIsImxlZnQiLCJwYWRkaW5nUmlnaHQiLCJyaWdodCIsInBvc09mZnNldCIsIm1hcmdpbiIsInNlY3QiLCJjb2x1bW4iLCJhZGRDbGFzcyIsInBhcmVudCIsImNvbnRlbnQiLCJjYWxsIiwiY2hhcmFjdGVyIiwibGVmdE1hcmdpbiIsInJpZ2h0TWFyZ2luIiwiaW5zaWRlTWFyZ2luIiwib3V0c2lkZU1hcmdpbiIsIlBvc2l0aW9uViIsInRvcCIsImJvdHRvbSIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwibGluZSIsInRvcE1hcmdpbiIsImJvdHRvbU1hcmdpbiIsInBhcmFncmFwaCIsIlByb3BlcnRpZXMiLCJyZWxhdGl2ZUZyb20iLCJ6SW5kZXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFJQSxPQUFLLGFBQVQ7QUFDQSxTQUFTQyxLQUFULENBQWVDLENBQWYsRUFBaUI7QUFDaEIsUUFBT0MsV0FBV0QsRUFBRUUsT0FBRixDQUFVSixJQUFWLEVBQWUsRUFBZixDQUFYLENBQVA7QUFDQTs7SUFFb0JLLE07Ozs7Ozs7Ozs7K0JBR1BDLEUsRUFBRztBQUNmQSxNQUFHQyxLQUFILENBQVNDLE9BQVQsR0FBaUIsY0FBakI7QUFDQUYsTUFBR0MsS0FBSCxDQUFTRSxRQUFULEdBQWtCLFVBQWxCOztBQUVBLHVJQUFzQkMsU0FBdEI7QUFDQTs7O3NCQVBRO0FBQUMs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LE9BQTVCLEVBQW9DLGlEQUFwQztBQUNBLEVBckRZO0FBc0RiZSxVQXREYSxxQkFzREhoQyxDQXRERyxFQXNERDtBQUFDO0FBQ1pULFNBQU93QixRQUFQLENBQWdCLEtBQUtDLE1BQUwsQ0FBWUMsT0FBNUIsRUFBb0MsNkNBQXBDO0FBQ0E7QUF4RFksQ0FBZDs7QUEyREE7O0lBQ01nQixVOzs7Ozs7Ozs7OzRDQUNvQjtBQUN4QixVQUFPLEtBQVA7QUFDQTs7OzRCQUNTakMsQyxFQUFFO0FBQ1hGLGFBQVVFLEVBQUVrQyxZQUFaLEVBQTBCaEIsSUFBMUIsQ0FBK0IsSUFBL0IsRUFBb0NsQixDQUFwQztBQUNBOzs7NEJBQ1NBLEMsRUFBRTtBQUNYd0IsYUFBVXhCLEVBQUVrQyxZQUFaLEVBQTBCaEIsSUFBMUIsQ0FBK0IsSUFBL0IsRUFBb0NsQixDQUFwQztBQUNBOzs7dUJBQ0lBLEMsRUFBRTtBQUNOLFdBQU9BLENBQVA7QUFDQSxTQUFLLE9BQUw7QUFDQSxTQUFLLFNBQUw7QUFDQSxTQUFLLFFBQUw7QUFDQSxTQUFLLGNBQUw7QUFDQ1QsWUFBT3dCLFFBQVAsQ0FBZ0IsS0FBS0MsTUFBTCxDQUFZQyxPQUE1QixFQUFvQyxrQ0FBZ0NqQixDQUFwRTtBQUNBO0FBQ0Q7QUFDQyxVQUFLUCxLQUFMLENBQVdFLFFBQVgsR0FBb0IsVUFBcEI7QUFSRDtBQVVBOzs7NEJBQ1NLLEMsRUFBRTtBQUNYLFFBQUtQLEtBQUwsQ0FBVzBDLE1BQVgsR0FBa0IsQ0FBQyxDQUFuQjtBQUNBOzs7RUF4QnVCdEMsa0JBQVFvQyxVOztBQTJCakMxQyxPQUFPMEMsVUFBUCxHQUFrQkEsVUFBbEIiLCJmaWxlIjoiZHJhd2luZ0FuY2hvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEcmF3aW5nIGZyb20gJy4vZHJhd2luZydcblxudmFyIHVuaXQ9L1thLXpBLVpdKyQvZ1xuZnVuY3Rpb24gYXNOdW0oYSl7XG5cdHJldHVybiBwYXJzZUZsb2F0KGEucmVwbGFjZSh1bml0LCcnKSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5jaG9yIGV4dGVuZHMgRHJhd2luZ3tcblx0Z2V0IHRhZygpe3JldHVybiAnZGl2J31cblx0XG5cdGNvbnZlcnRTdHlsZShlbCl7XG5cdFx0ZWwuc3R5bGUuZGlzcGxheT0naW5saW5lLWJsb2NrJ1xuXHRcdGVsLnN0eWxlLnBvc2l0aW9uPSdyZWxhdGl2ZSdcblx0XHRcblx0XHRzdXBlci5jb252ZXJ0U3R5bGUoLi4uYXJndW1lbnRzKVxuXHR9XG5cbn1cblxudmFyIFBvc2l0aW9uSD17XG5cdHBhZ2UoeCl7XG5cdFx0dmFyIHN0eWxlPXRoaXMuc3R5bGUsIHQ7XG5cdFx0c3dpdGNoKHguYWxpZ24pe1xuXHRcdGNhc2UgJ2xlZnQnOlxuXHRcdFx0aWYoKHQ9dGhpcy53b3JsZC53aWR0aC1hc051bSh0aGlzLmRvYy5zZWN0aW9uLnN0eWxlLnBhZGRpbmdMZWZ0KSk+PTApXG5cdFx0XHRcdHN0eWxlLmxlZnQ9MFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRzdHlsZS5sZWZ0PS10KydweCdcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSAnY2VudGVyJzpcblx0XHRcdHN0eWxlLmxlZnQ9KGFzTnVtKHRoaXMuZG9jLnNlY3Rpb24uc3R5bGUud2lkdGgpLXRoaXMud29ybGQud2lkdGgpLzIrJ3B4J1xuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdyaWdodCc6IFxuXHRcdFx0aWYoKHQ9dGhpcy53b3JsZC53aWR0aC1hc051bSh0aGlzLmRvYy5zZWN0aW9uLnN0eWxlLnBhZGRpbmdSaWdodCkpPj0wKVxuXHRcdFx0XHRzdHlsZS5yaWdodD0wXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHN0eWxlLnJpZ2h0PS10KydweCdcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSAnaW5zaWRlJzogXG5cdFx0XHRzdHlsZS5sZWZ0PTBcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSAnb3V0c2lkZSc6IFxuXHRcdFx0c3R5bGUucmlnaHQ9MFxuXHRcdFx0YnJlYWtcblx0XHRkZWZhdWx0OlxuXHRcdFx0c3R5bGUubGVmdD14LnBvc09mZnNldCsncHgnXG5cdFx0XHRicmVha1xuXHRcdH1cblx0fSxcblx0bWFyZ2luKHgpe1xuXHRcdHZhciBzZWN0PXRoaXMuZG9jLnNlY3Rpb24uc3R5bGVcblx0XHRzd2l0Y2goeC5hbGlnbil7XG5cdFx0Y2FzZSAnaW5zaWRlJzogXG5cdFx0Y2FzZSAnbGVmdCc6XG5cdFx0XHR0aGlzLnN0eWxlLmxlZnQ9c2VjdC5wYWRkaW5nTGVmdFxuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdjZW50ZXInOlxuXHRcdFx0dGhpcy5zdHlsZS5sZWZ0PShhc051bShzZWN0LndpZHRoKS1hc051bShzZWN0LnBhZGRpbmdSaWdodCkrYXNOdW0oc2VjdC5wYWRkaW5nTGVmdCktdGhpcy53b3JsZC53aWR0aCkvMisncHgnXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ291dHNpZGUnOiBcblx0XHRjYXNlICdyaWdodCc6IFxuXHRcdFx0dGhpcy5zdHlsZS5yaWdodD1zZWN0LnBhZGRpbmdSaWdodFxuXHRcdFx0YnJlYWtcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhpcy5zdHlsZS5sZWZ0PSh4LnBvc09mZnNldCthc051bShzZWN0LnBhZGRpbmdMZWZ0KSkrJ3B4J1xuXHRcdFx0YnJlYWtcblx0XHR9XG5cdH0sXG5cdGNvbHVtbih4KXtcblx0XHRBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwnd2FybmluZyB3YXJuaW5nLXBvc2l0aW9uSC1jb2x1bW4nKVxuXHRcdFBvc2l0aW9uSC5tYXJnaW4uY2FsbCh0aGlzLHgpXG5cdH0sXG5cdGNoYXJhY3Rlcih4KXtcblx0XHRBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25ILWNoYXJhY3RlcicpXG5cdH0sXG5cdGxlZnRNYXJnaW4oeCl7XG5cdFx0QW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uSC1sZWZ0TWFyZ2luJylcblx0fSxcblx0cmlnaHRNYXJnaW4oeCl7XG5cdFx0QW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uSC1yaWdodE1hcmdpbicpXG5cdH0sXG5cdGluc2lkZU1hcmdpbih4KXtcblx0XHRBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25ILWluc2lkZU1hcmdpbicpXG5cdH0sXG5cdG91dHNpZGVNYXJnaW4oeCl7XG5cdFx0QW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uSC1vdXRzaWRlTWFyZ2luJylcblx0fVxufVxudmFyIFBvc2l0aW9uVj17XG5cdHBhZ2UoeCl7XG5cdFx0dmFyIHN0eWxlPXRoaXMuc3R5bGUsIHNlY3Q9dGhpcy5kb2Muc2VjdGlvbi5zdHlsZTtcblx0XHRzd2l0Y2goeC5hbGlnbil7XG5cdFx0Y2FzZSAndG9wJzpcblx0XHRcdHN0eWxlLnRvcD0wXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ2JvdHRvbSc6XG5cdFx0XHRzdHlsZS5ib3R0b209MFxuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdjZW50ZXInOlxuXHRcdGNhc2UgJ291dHNpZGUnOlxuXHRcdGNhc2UgJ2luc2lkZSc6XG5cdFx0XHRBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25WLXBhZ2UtJyt4LmFsaWduKVxuXHRcdGJyZWFrXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHN0eWxlLnRvcD14LnBvc09mZnNldCsncHgnXG5cdFx0YnJlYWtcblx0XHR9XG5cdH0sXG5cdG1hcmdpbih4KXtcblx0XHR2YXIgc3R5bGU9dGhpcy5zdHlsZSxzZWN0PXRoaXMuZG9jLnNlY3Rpb24uc3R5bGVcblx0XHRzd2l0Y2goeC5hbGlnbil7XG5cdFx0Y2FzZSAndG9wJzpcblx0XHRcdHN0eWxlLnRvcD1zZWN0LnBhZGRpbmdUb3Bcblx0XHRicmVha1xuXHRcdGNhc2UgJ2JvdHRvbSc6XG5cdFx0XHRzdHlsZS5ib3R0b209c2VjdC5wYWRkaW5nQm90dG9tXG5cdFx0YnJlYWtcblx0XHRjYXNlICdjZW50ZXInOlxuXHRcdGNhc2UgJ291dHNpZGUnOlxuXHRcdGNhc2UgJ2luc2lkZSc6XG5cdFx0XHRBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25WLW1hcmdpbi0nK3guYWxpZ24pXG5cdFx0YnJlYWtcblx0XHRkZWZhdWx0OlxuXHRcdFx0c3R5bGUudG9wPWFzTnVtKHNlY3QucGFkZGluZ1RvcCkreC5wb3NPZmZzZXQrJ3B4J1xuXHRcdGJyZWFrXG5cdFx0fVxuXHR9LFxuXHRsaW5lKHgpe1xuXHRcdEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvblYtbGluZScpXG5cdH0sXG5cdHRvcE1hcmdpbih4KXtcblx0XHRBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25WLXRvcE1hcmdpbicpXG5cdH0sXG5cdGJvdHRvbU1hcmdpbih4KXtcblx0XHRBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25WLWJvdHRvbU1hcmdpbicpXG5cdH0sXG5cdGluc2lkZU1hcmdpbih4KXtcblx0XHRBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25WLWluc2lkZU1hcmdpbicpXG5cdH0sXG5cdG91dHNpZGVNYXJnaW4oeCl7XG5cdFx0QW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uVi1vdXRzaWRlTWFyZ2luJylcblx0fSxcblx0cGFyYWdyYXBoKHgpey8vb25seSBvZmZzZXRcblx0XHRBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25WLXBhcmFncmFwaCcpXG5cdH1cbn1cblx0XG4vL29ubHkgc3VwcG9ydCBhYnNvbHV0ZSBwYWdlIG9mZnNldFxuY2xhc3MgUHJvcGVydGllcyBleHRlbmRzIERyYXdpbmcuUHJvcGVydGllc3tcblx0Z2V0UGFyYWdyYXBoUGFkZGluZ0xlZnQoKXtcblx0XHRyZXR1cm4gJzBwdCdcblx0fVxuXHRwb3NpdGlvbkgoeCl7XG5cdFx0UG9zaXRpb25IW3gucmVsYXRpdmVGcm9tXS5jYWxsKHRoaXMseClcblx0fVxuXHRwb3NpdGlvblYoeCl7XG5cdFx0UG9zaXRpb25WW3gucmVsYXRpdmVGcm9tXS5jYWxsKHRoaXMseClcblx0fVxuXHR3cmFwKHgpe1xuXHRcdHN3aXRjaCh4KXtcblx0XHRjYXNlICd0aWdodCc6XG5cdFx0Y2FzZSAndGhyb3VnaCc6XG5cdFx0Y2FzZSAnc3F1YXJlJzpcblx0XHRjYXNlICd0b3BBbmRCb3R0b20nOlxuXHRcdFx0QW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXdyYXAtJyt4KVxuXHRcdFx0YnJlYWtcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhpcy5zdHlsZS5wb3NpdGlvbj0nYWJzb2x1dGUnXG5cdFx0fVxuXHR9XG5cdGJlaGluZERvYyh4KXtcblx0XHR0aGlzLnN0eWxlLnpJbmRleD0tMVxuXHR9XG59XG5cbkFuY2hvci5Qcm9wZXJ0aWVzPVByb3BlcnRpZXNcbiJdfQ==