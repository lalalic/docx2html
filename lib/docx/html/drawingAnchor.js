'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _drawing = require('./drawing');

var _drawing2 = _interopRequireDefault(_drawing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var unit = /[a-zA-Z]+$/g;
function asNum(a) {
	return parseFloat(a.replace(unit, ''));
}

var Anchor = function (_Drawing) {
	_inherits(Anchor, _Drawing);

	function Anchor() {
		_classCallCheck(this, Anchor);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Anchor).apply(this, arguments));
	}

	_createClass(Anchor, [{
		key: 'convertStyle',
		value: function convertStyle(el) {
			el.style.display = 'inline-block';
			el.style.position = 'relative';

			_get(Object.getPrototypeOf(Anchor.prototype), 'convertStyle', this).apply(this, arguments);
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
				if ((t = this.world.width - asNum(this.doc.section.style.paddingLeft)) >= 0) style.left = 0;else style.left = -t + 'pt';
				break;
			case 'center':
				style.left = (asNum(this.doc.section.style.width) - this.world.width) / 2 + 'pt';
				break;
			case 'right':
				if ((t = this.world.width - asNum(this.doc.section.style.paddingRight)) >= 0) style.right = 0;else style.right = -t + 'pt';
				break;
			case 'inside':
				style.left = 0;
				break;
			case 'outside':
				style.right = 0;
				break;
			default:
				style.left = x.posOffset + 'pt';
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
				this.style.left = (asNum(sect.width) - asNum(sect.paddingRight) + asNum(sect.paddingLeft) - this.world.width) / 2 + 'pt';
				break;
			case 'outside':
			case 'right':
				this.style.right = sect.paddingRight;
				break;
			default:
				this.style.left = x.posOffset + asNum(sect.paddingLeft) + 'pt';
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
				style.top = x.posOffset + 'pt';
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
				style.top = asNum(sect.paddingTop) + x.posOffset + 'pt';
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
	_inherits(Properties, _Drawing$Properties);

	function Properties() {
		_classCallCheck(this, Properties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));
	}

	_createClass(Properties, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZHJhd2luZ0FuY2hvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUksT0FBSyxhQUFMO0FBQ0osU0FBUyxLQUFULENBQWUsQ0FBZixFQUFpQjtBQUNoQixRQUFPLFdBQVcsRUFBRSxPQUFGLENBQVUsSUFBVixFQUFlLEVBQWYsQ0FBWCxDQUFQLENBRGdCO0NBQWpCOztJQUlxQjs7Ozs7Ozs7Ozs7K0JBR1AsSUFBRztBQUNmLE1BQUcsS0FBSCxDQUFTLE9BQVQsR0FBaUIsY0FBakIsQ0FEZTtBQUVmLE1BQUcsS0FBSCxDQUFTLFFBQVQsR0FBa0IsVUFBbEIsQ0FGZTs7QUFJZiw4QkFQbUIscURBT0csVUFBdEIsQ0FKZTs7OztzQkFGUDtBQUFDLFVBQU8sS0FBUCxDQUFEOzs7O1FBRFc7Ozs7OztBQVlyQixJQUFJLFlBQVU7QUFDYixxQkFBSyxHQUFFO0FBQ04sTUFBSSxRQUFNLEtBQUssS0FBTDtNQUFZLENBQXRCLENBRE07QUFFTixVQUFPLEVBQUUsS0FBRjtBQUNQLFFBQUssTUFBTDtBQUNDLFFBQUcsQ0FBQyxJQUFFLEtBQUssS0FBTCxDQUFXLEtBQVgsR0FBaUIsTUFBTSxLQUFLLEdBQUwsQ0FBUyxPQUFULENBQWlCLEtBQWpCLENBQXVCLFdBQXZCLENBQXZCLENBQUgsSUFBZ0UsQ0FBaEUsRUFDRixNQUFNLElBQU4sR0FBVyxDQUFYLENBREQsS0FHQyxNQUFNLElBQU4sR0FBVyxDQUFDLENBQUQsR0FBRyxJQUFILENBSFo7QUFJQSxVQUxEO0FBREEsUUFPSyxRQUFMO0FBQ0MsVUFBTSxJQUFOLEdBQVcsQ0FBQyxNQUFNLEtBQUssR0FBTCxDQUFTLE9BQVQsQ0FBaUIsS0FBakIsQ0FBdUIsS0FBdkIsQ0FBTixHQUFvQyxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQXJDLEdBQXVELENBQXZELEdBQXlELElBQXpELENBRFo7QUFFQyxVQUZEO0FBUEEs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ICcuL2RyYXdpbmcnXG5cbnZhciB1bml0PS9bYS16QS1aXSskL2dcbmZ1bmN0aW9uIGFzTnVtKGEpe1xuXHRyZXR1cm4gcGFyc2VGbG9hdChhLnJlcGxhY2UodW5pdCwnJykpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFuY2hvciBleHRlbmRzIERyYXdpbmd7XG5cdGdldCB0YWcoKXtyZXR1cm4gJ2Rpdid9XG5cdFxuXHRjb252ZXJ0U3R5bGUoZWwpe1xuXHRcdGVsLnN0eWxlLmRpc3BsYXk9J2lubGluZS1ibG9jaydcblx0XHRlbC5zdHlsZS5wb3NpdGlvbj0ncmVsYXRpdmUnXG5cdFx0XG5cdFx0c3VwZXIuY29udmVydFN0eWxlKC4uLmFyZ3VtZW50cylcblx0fVxuXG59XG5cbnZhciBQb3NpdGlvbkg9e1xuXHRwYWdlKHgpe1xuXHRcdHZhciBzdHlsZT10aGlzLnN0eWxlLCB0O1xuXHRcdHN3aXRjaCh4LmFsaWduKXtcblx0XHRjYXNlICdsZWZ0Jzpcblx0XHRcdGlmKCh0PXRoaXMud29ybGQud2lkdGgtYXNOdW0odGhpcy5kb2Muc2VjdGlvbi5zdHlsZS5wYWRkaW5nTGVmdCkpPj0wKVxuXHRcdFx0XHRzdHlsZS5sZWZ0PTBcblx0XHRcdGVsc2Vcblx0XHRcdFx0c3R5bGUubGVmdD0tdCsncHQnXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ2NlbnRlcic6XG5cdFx0XHRzdHlsZS5sZWZ0PShhc051bSh0aGlzLmRvYy5zZWN0aW9uLnN0eWxlLndpZHRoKS10aGlzLndvcmxkLndpZHRoKS8yKydwdCdcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSAncmlnaHQnOiBcblx0XHRcdGlmKCh0PXRoaXMud29ybGQud2lkdGgtYXNOdW0odGhpcy5kb2Muc2VjdGlvbi5zdHlsZS5wYWRkaW5nUmlnaHQpKT49MClcblx0XHRcdFx0c3R5bGUucmlnaHQ9MFxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRzdHlsZS5yaWdodD0tdCsncHQnXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ2luc2lkZSc6IFxuXHRcdFx0c3R5bGUubGVmdD0wXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ291dHNpZGUnOiBcblx0XHRcdHN0eWxlLnJpZ2h0PTBcblx0XHRcdGJyZWFrXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHN0eWxlLmxlZnQ9eC5wb3NPZmZzZXQrJ3B0J1xuXHRcdFx0YnJlYWtcblx0XHR9XG5cdH0sXG5cdG1hcmdpbih4KXtcblx0XHR2YXIgc2VjdD10aGlzLmRvYy5zZWN0aW9uLnN0eWxlXG5cdFx0c3dpdGNoKHguYWxpZ24pe1xuXHRcdGNhc2UgJ2luc2lkZSc6IFxuXHRcdGNhc2UgJ2xlZnQnOlxuXHRcdFx0dGhpcy5zdHlsZS5sZWZ0PXNlY3QucGFkZGluZ0xlZnRcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSAnY2VudGVyJzpcblx0XHRcdHRoaXMuc3R5bGUubGVmdD0oYXNOdW0oc2VjdC53aWR0aCktYXNOdW0oc2VjdC5wYWRkaW5nUmlnaHQpK2FzTnVtKHNlY3QucGFkZGluZ0xlZnQpLXRoaXMud29ybGQud2lkdGgpLzIrJ3B0J1xuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdvdXRzaWRlJzogXG5cdFx0Y2FzZSAncmlnaHQnOiBcblx0XHRcdHRoaXMuc3R5bGUucmlnaHQ9c2VjdC5wYWRkaW5nUmlnaHRcblx0XHRcdGJyZWFrXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHRoaXMuc3R5bGUubGVmdD0oeC5wb3NPZmZzZXQrYXNOdW0oc2VjdC5wYWRkaW5nTGVmdCkpKydwdCdcblx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9LFxuXHRjb2x1bW4oeCl7XG5cdFx0QW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsJ3dhcm5pbmcgd2FybmluZy1wb3NpdGlvbkgtY29sdW1uJylcblx0XHRQb3NpdGlvbkgubWFyZ2luLmNhbGwodGhpcyx4KVxuXHR9LFxuXHRjaGFyYWN0ZXIoeCl7XG5cdFx0QW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uSC1jaGFyYWN0ZXInKVxuXHR9LFxuXHRsZWZ0TWFyZ2luKHgpe1xuXHRcdEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvbkgtbGVmdE1hcmdpbicpXG5cdH0sXG5cdHJpZ2h0TWFyZ2luKHgpe1xuXHRcdEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvbkgtcmlnaHRNYXJnaW4nKVxuXHR9LFxuXHRpbnNpZGVNYXJnaW4oeCl7XG5cdFx0QW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uSC1pbnNpZGVNYXJnaW4nKVxuXHR9LFxuXHRvdXRzaWRlTWFyZ2luKHgpe1xuXHRcdEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvbkgtb3V0c2lkZU1hcmdpbicpXG5cdH1cbn1cbnZhciBQb3NpdGlvblY9e1xuXHRwYWdlKHgpe1xuXHRcdHZhciBzdHlsZT10aGlzLnN0eWxlLCBzZWN0PXRoaXMuZG9jLnNlY3Rpb24uc3R5bGU7XG5cdFx0c3dpdGNoKHguYWxpZ24pe1xuXHRcdGNhc2UgJ3RvcCc6XG5cdFx0XHRzdHlsZS50b3A9MFxuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdib3R0b20nOlxuXHRcdFx0c3R5bGUuYm90dG9tPTBcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSAnY2VudGVyJzpcblx0XHRjYXNlICdvdXRzaWRlJzpcblx0XHRjYXNlICdpbnNpZGUnOlxuXHRcdFx0QW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uVi1wYWdlLScreC5hbGlnbilcblx0XHRicmVha1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRzdHlsZS50b3A9eC5wb3NPZmZzZXQrJ3B0J1xuXHRcdGJyZWFrXG5cdFx0fVxuXHR9LFxuXHRtYXJnaW4oeCl7XG5cdFx0dmFyIHN0eWxlPXRoaXMuc3R5bGUsc2VjdD10aGlzLmRvYy5zZWN0aW9uLnN0eWxlXG5cdFx0c3dpdGNoKHguYWxpZ24pe1xuXHRcdGNhc2UgJ3RvcCc6XG5cdFx0XHRzdHlsZS50b3A9c2VjdC5wYWRkaW5nVG9wXG5cdFx0YnJlYWtcblx0XHRjYXNlICdib3R0b20nOlxuXHRcdFx0c3R5bGUuYm90dG9tPXNlY3QucGFkZGluZ0JvdHRvbVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAnY2VudGVyJzpcblx0XHRjYXNlICdvdXRzaWRlJzpcblx0XHRjYXNlICdpbnNpZGUnOlxuXHRcdFx0QW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uVi1tYXJnaW4tJyt4LmFsaWduKVxuXHRcdGJyZWFrXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHN0eWxlLnRvcD1hc051bShzZWN0LnBhZGRpbmdUb3ApK3gucG9zT2Zmc2V0KydwdCdcblx0XHRicmVha1xuXHRcdH1cblx0fSxcblx0bGluZSh4KXtcblx0XHRBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25WLWxpbmUnKVxuXHR9LFxuXHR0b3BNYXJnaW4oeCl7XG5cdFx0QW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uVi10b3BNYXJnaW4nKVxuXHR9LFxuXHRib3R0b21NYXJnaW4oeCl7XG5cdFx0QW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uVi1ib3R0b21NYXJnaW4nKVxuXHR9LFxuXHRpbnNpZGVNYXJnaW4oeCl7XG5cdFx0QW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uVi1pbnNpZGVNYXJnaW4nKVxuXHR9LFxuXHRvdXRzaWRlTWFyZ2luKHgpe1xuXHRcdEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvblYtb3V0c2lkZU1hcmdpbicpXG5cdH0sXG5cdHBhcmFncmFwaCh4KXsvL29ubHkgb2Zmc2V0XG5cdFx0QW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uVi1wYXJhZ3JhcGgnKVxuXHR9XG59XG5cdFxuLy9vbmx5IHN1cHBvcnQgYWJzb2x1dGUgcGFnZSBvZmZzZXRcbmNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBEcmF3aW5nLlByb3BlcnRpZXN7XG5cdGdldFBhcmFncmFwaFBhZGRpbmdMZWZ0KCl7XG5cdFx0cmV0dXJuICcwcHQnXG5cdH1cblx0cG9zaXRpb25IKHgpe1xuXHRcdFBvc2l0aW9uSFt4LnJlbGF0aXZlRnJvbV0uY2FsbCh0aGlzLHgpXG5cdH1cblx0cG9zaXRpb25WKHgpe1xuXHRcdFBvc2l0aW9uVlt4LnJlbGF0aXZlRnJvbV0uY2FsbCh0aGlzLHgpXG5cdH1cblx0d3JhcCh4KXtcblx0XHRzd2l0Y2goeCl7XG5cdFx0Y2FzZSAndGlnaHQnOlxuXHRcdGNhc2UgJ3Rocm91Z2gnOlxuXHRcdGNhc2UgJ3NxdWFyZSc6XG5cdFx0Y2FzZSAndG9wQW5kQm90dG9tJzpcblx0XHRcdEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC13cmFwLScreClcblx0XHRcdGJyZWFrXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHRoaXMuc3R5bGUucG9zaXRpb249J2Fic29sdXRlJ1xuXHRcdH1cblx0fVxuXHRiZWhpbmREb2MoeCl7XG5cdFx0dGhpcy5zdHlsZS56SW5kZXg9LTFcblx0fVxufVxuXG5BbmNob3IuUHJvcGVydGllcz1Qcm9wZXJ0aWVzXG4iXX0=