'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

var _converter3 = require('./style/converter');

var _converter4 = _interopRequireDefault(_converter3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AZ = /[A-Z]/g,
    r = function r(a) {
	return '-' + a.toLowerCase();
},
    clozed = /Z$/gi;

function asStyle(x) {
	var a = [];
	for (var i in x) {
		!$.isFunction(x[i]) && a.push(i.replace(AZ, r) + ':' + x[i]);
	}return a.join(';');
}

var Shape = function (_Converter) {
	_inherits(Shape, _Converter);

	function Shape() {
		_classCallCheck(this, Shape);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Shape).apply(this, arguments));
	}

	_createClass(Shape, [{
		key: 'convertStyle',
		value: function convertStyle(el) {
			el.style.position = 'absolute';
			el.style.overflow = 'hidden';

			var pathStyle = { stroke: 'black', strokeWidth: 2, fillOpacity: 0 },
			    bgStyle = this.makeBackgroundStyle();
			_get(Object.getPrototypeOf(Shape.prototype), 'convertStyle', this).apply(this, arguments);
			var style = this.wordModel.getDirectStyle(),
			    propConverter = new this.constructor.Properties(el.style, this, pathStyle, bgStyle);
			style && style.parse([propConverter]);
			if (this.path) {
				if (el.style.background) pathStyle.fillOpacity = 0;
				var bgImage = el.style.background,
				    grad = pathStyle.grad;
				delete pathStyle.grad;

				var svg = '<svg xmlns="http://www.w3.org/2000/svg">' + (grad ? '<defs>' + grad + '</defs>' : '') + this.path + ' style="' + asStyle(pathStyle) + '" /></svg>';
				var svgImage = 'url(' + this.doc.asImageURL(svg) + ')';
				bgStyle.backgroundImage = svgImage;
				bgStyle.backgroundSize = '100% 100%';
			}
		}
	}, {
		key: 'makeBackgroundStyle',
		value: function makeBackgroundStyle() {
			//make background el to hold svg background
			var id = 'shape' + this.doc.uid();
			this.content.setAttribute('id', id);
			var style = this.doc.createStyle('#' + id + '::before');
			style.content = '""';
			style.zIndex = -1;
			style.position = 'absolute';
			style.width = '100%';
			style.height = '100%';
			style.left = 0;
			style.top = 0;
			return style;
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'div';
		}
	}]);

	return Shape;
}(_converter2.default);

exports.default = Shape;


Shape.Properties = function (_Style$Properties) {
	_inherits(Properties, _Style$Properties);

	function Properties(style, parent, pathStyle, bgStyle) {
		_classCallCheck(this, Properties);

		var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));

		_this2.pathStyle = pathStyle;
		_this2.bgStyle = bgStyle;
		return _this2;
	}

	_createClass(Properties, [{
		key: 'xfrm',
		value: function xfrm(x) {
			this.style.width = x.width + 'pt';
			this.style.height = x.height + 'pt';
			x.x && (this.style.left = x.x + 'pt');
			x.y && (this.style.top = x.y + 'pt');

			x.rotation && this.styless('transform', 'rotate(' + x.rotation + 'deg)');

			this.world = x;
		}
	}, {
		key: 'ln',
		value: function ln(x) {
			x.color && (this.pathStyle.stroke = x.color);
			x.width != undefined && (this.pathStyle.strokeWidth = x.width + 'pt');

			switch (x.cap) {
				case 'rnd':
					this.pathStyle.strokeLinecap = 'round';
					break;
				default:

			}

			if (x.dash) {
				switch (this.lineStyle(x.dash)) {
					case 'dotted':
						this.pathStyle.strokeDasharray = "5,5";
						break;
						break;
					case 'dashed':
						this.pathStyle.strokeDasharray = "10,10";
						break;
				}
			}
		}
	}, {
		key: 'solidFill',
		value: function solidFill(x) {
			this.pathStyle.fill = x;
			this.pathStyle.fillOpacity = 1;
		}
	}, {
		key: 'gradFill',
		value: function gradFill(x) {
			if (this.style.backgroundImage) return;

			var grad = [];
			switch (x.path) {
				case 'linear':
					grad.push('<linearGradient id="grad"');
					switch (x.angel) {
						case 0:
							grad.push('x1="0%" y1="0%" x2="100%" y2="0%">');
							break;
						case 90:
							grad.push('x1="0%" y1="0%" x2="0%" y2="100%">');
							break;
						case 180:
							grad.push('x1="100%" y1="0%" x2="0%" y2="0%">');
							break;
						case 270:
							grad.push('x1="0%" y1="100%" x2="0%" y2="0%">');
							break;
					}
					grad.push('</linearGradient>');
					break;
				case 'circle':
					grad.push('<radialGradient  id="grad"');
					grad.push('cx="50%" cy="50%" r="50%" fx="50%" fy="50%">');
					grad.push('</radialGradient>');
					break;
			}
			var end = grad.pop();
			for (var i = 0, len = x.stops.length, a; i < len; i++) {
				grad.push('<stop offset="' + (a = x.stops[i]).position + '%" style="stop-opacity:1;stop-color:' + a.color + '"/>');
			}grad.push(end);

			this.pathStyle.grad = grad.join(' ');
			this.pathStyle.fill = 'url(#grad)';
			this.pathStyle.fillOpacity = 1;
		}
	}, {
		key: 'blipFill',
		value: function blipFill(x) {
			this.style.background = 'url(' + this.doc.asImageURL(x) + ')';
			this.style.backgroundSize = '100% 100%';
			this.noFill();
		}
	}, {
		key: 'noFill',
		value: function noFill(x) {
			this.pathStyle.fillOpacity = 0;
		}
	}, {
		key: 'lnRef',
		value: function lnRef(x) {
			this.ln(x);
		}
	}, {
		key: 'fillRef',
		value: function fillRef(x) {
			if (this.style.backgroundImage) return;

			if (typeof x.path != 'undefined') return this.gradFill(x);

			if (typeof x == 'string') this.pathStyle.fill = x;else if (typeof x.color != 'undefined') this.pathStyle.fill = x.color;else return;
			this.pathStyle.fillOpacity = 1;
		}
	}, {
		key: 'fontRef',
		value: function fontRef(x) {
			x.color && (this.style.color = x.color);
			x.family && (this.style.fontFamily = x.family);
		}
	}, {
		key: 'path',
		value: function path(x, t) {
			switch (x.shape) {
				case 'line':
					this.parent.path = '<line x1="0" y1="0" x2="' + this.world.width + 'pt" y2="' + this.world.height + 'pt"';
					break;
				case 'rect':
					this.parent.path = '<rect width="' + this.world.width + 'pt" height="' + this.world.height + 'pt"';
					break;
				case 'roundRect':
					this.parent.path = '<rect rx="' + (t = Math.min(this.world.width, this.world.height) / 12) + 'pt" ry="' + t + 'pt" width="' + this.world.width + 'pt" height="' + this.world.height + 'pt"';
					break;
				case 'ellipse':
					this.parent.path = '<ellipse cx="' + this.world.width / 2 + 'pt" cy="' + this.world.height / 2 + 'pt" rx="' + this.world.width / 2 + 'pt" ry="' + this.world.height / 2 + 'pt"';
					break;
				case 'path':
					this.parent.path = '<path d="' + x.path + '"';
					if (!clozed.test(x.path)) this.noFill();
					break;
			}
		}
	}, {
		key: 'spAutoFit',
		value: function spAutoFit() {
			this.style.height = 'auto';
		}
	}, {
		key: 'lIns',
		value: function lIns(x) {
			this.style.paddingLeft = x + 'pt';
		}
	}, {
		key: 'tIns',
		value: function tIns(x) {
			this.style.paddingTop = x + 'pt';
		}
	}, {
		key: 'rIns',
		value: function rIns(x) {
			this.style.paddingRight = x + 'pt';
		}
	}, {
		key: 'bIns',
		value: function bIns(x) {
			this.style.paddingBottom = x + 'pt';
		}
	}, {
		key: 'anchor',
		value: function anchor(x) {
			this.style.display = 'table-cell';
			this.style.verticalAlign = x;
		}
	}, {
		key: 'vert',
		value: function vert(x) {
			this.style.height = this.world.width + 'pt';
			this.style.width = this.world.height + 'pt';
			var delta = (this.world.width - this.world.height) / 2;

			this.bgStyle.height = this.world.height + 'pt';
			this.bgStyle.width = this.world.width + 'pt';
			this.styless('transform', 'translate(-' + delta + 'pt,' + delta + 'pt) rotate(-' + x + 'deg) ', this.bgStyle);

			this.styless('transform', 'translate(' + delta + 'pt,-' + delta + 'pt) rotate(' + (x + this.world.rotation || 0) + 'deg)');
		}
	}]);

	return Properties;
}(_converter4.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc2hhcGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQUksS0FBRyxRQUFIO0lBQ0gsSUFBRSxTQUFGLENBQUUsQ0FBUyxDQUFULEVBQVc7QUFBQyxRQUFPLE1BQUksRUFBRSxXQUFGLEVBQUosQ0FBUjtDQUFYO0lBQ0YsU0FBTyxNQUFQOztBQUVELFNBQVMsT0FBVCxDQUFpQixDQUFqQixFQUFtQjtBQUNsQixLQUFJLElBQUUsRUFBRixDQURjO0FBRWxCLE1BQUksSUFBSSxDQUFKLElBQVMsQ0FBYjtBQUNDLEdBQUMsRUFBRSxVQUFGLENBQWEsRUFBRSxDQUFGLENBQWIsQ0FBRCxJQUF1QixFQUFFLElBQUYsQ0FBTyxFQUFFLE9BQUYsQ0FBVSxFQUFWLEVBQWEsQ0FBYixJQUFnQixHQUFoQixHQUFvQixFQUFFLENBQUYsQ0FBcEIsQ0FBOUI7RUFERCxPQUVPLEVBQUUsSUFBRixDQUFPLEdBQVAsQ0FBUCxDQUprQjtDQUFuQjs7SUFPcUI7Ozs7Ozs7Ozs7OytCQUdQLElBQUc7QUFDZixNQUFHLEtBQUgsQ0FBUyxRQUFULEdBQWtCLFVBQWxCLENBRGU7QUFFZixNQUFHLEtBQUgsQ0FBUyxRQUFULEdBQWtCLFFBQWxCLENBRmU7O0FBSWYsT0FBSSxZQUFVLEVBQUMsUUFBTyxPQUFQLEVBQWdCLGFBQVksQ0FBWixFQUFlLGFBQVksQ0FBWixFQUExQztPQUNILFVBQVEsS0FBSyxtQkFBTCxFQUFSLENBTGM7QUFNZiw4QkFUbUIsb0RBU0csVUFBdEIsQ0FOZTtBQU9mLE9BQUksUUFBTSxLQUFLLFNBQUwsQ0FBZSxjQUFmLEVBQU47T0FDSCxnQkFBYyxJQUFJLEtBQUssV0FBTCxDQUFpQixVQUFqQixDQUE0QixHQUFHLEtBQUgsRUFBUyxJQUF6QyxFQUErQyxTQUEvQyxFQUEwRCxPQUExRCxDQUFkLENBUmM7QUFTZixZQUFTLE1BQU0sS0FBTixD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akIsQ0FEWjtBQUVOLFFBQUssS0FBTCxDQUFXLEtBQVgsR0FBaUIsS0FBSyxLQUFMLENBQVcsTUFBWCxHQUFrQixJQUFsQixDQUZYO0FBR04sT0FBSSxRQUFNLENBQUMsS0FBSyxLQUFMLENBQVcsS0FBWCxHQUFpQixLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWxCLEdBQXFDLENBQXJDLENBSEo7O0FBS04sUUFBSyxPQUFMLENBQWEsTUFBYixHQUFvQixLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQWtCLElBQWxCLENBTGQ7QUFNTixRQUFLLE9BQUwsQ0FBYSxLQUFiLEdBQW1CLEtBQUssS0FBTCxDQUFXLEtBQVgsR0FBaUIsSUFBakIsQ0FOYjtBQU9OLFFBQUssT0FBTCxDQUFhLFdBQWIsRUFBeUIsZ0JBQWMsS0FBZCxHQUFvQixLQUFwQixHQUEwQixLQUExQixHQUFnQyxjQUFoQyxHQUErQyxDQUEvQyxHQUFpRCxPQUFqRCxFQUEwRCxLQUFLLE9BQUwsQ0FBbkYsQ0FQTTs7QUFTTixRQUFLLE9BQUwsQ0FBYSxXQUFiLEVBQXlCLGVBQWEsS0FBYixHQUFtQixNQUFuQixHQUEwQixLQUExQixHQUFnQyxhQUFoQyxJQUErQyxJQUFFLEtBQUssS0FBTCxDQUFXLFFBQVgsSUFBcUIsQ0FBdkIsQ0FBL0MsR0FBeUUsTUFBekUsQ0FBekIsQ0FUTTs7OztRQTFKZTtFQUFtQixvQkFBTSxVQUFOLENBQTFDIiwiZmlsZSI6InNoYXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcidcbmltcG9ydCBTdHlsZSBmcm9tICcuL3N0eWxlL2NvbnZlcnRlcidcblxudmFyIEFaPS9bQS1aXS9nLCBcblx0cj1mdW5jdGlvbihhKXtyZXR1cm4gJy0nK2EudG9Mb3dlckNhc2UoKX0sXG5cdGNsb3plZD0vWiQvZ2k7XG5cdFxuZnVuY3Rpb24gYXNTdHlsZSh4KXtcblx0dmFyIGE9W11cblx0Zm9yKHZhciBpIGluIHgpXG5cdFx0ISQuaXNGdW5jdGlvbih4W2ldKSAmJiBhLnB1c2goaS5yZXBsYWNlKEFaLHIpKyc6Jyt4W2ldKVxuXHRyZXR1cm4gYS5qb2luKCc7Jylcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhcGUgZXh0ZW5kcyBDb252ZXJ0ZXJ7XG5cdGdldCB0YWcoKXtyZXR1cm4gJ2Rpdid9XG5cdFxuXHRjb252ZXJ0U3R5bGUoZWwpe1xuXHRcdGVsLnN0eWxlLnBvc2l0aW9uPSdhYnNvbHV0ZSdcblx0XHRlbC5zdHlsZS5vdmVyZmxvdz0naGlkZGVuJ1xuXG5cdFx0dmFyIHBhdGhTdHlsZT17c3Ryb2tlOidibGFjaycsIHN0cm9rZVdpZHRoOjIsIGZpbGxPcGFjaXR5OjB9LFxuXHRcdFx0YmdTdHlsZT10aGlzLm1ha2VCYWNrZ3JvdW5kU3R5bGUoKTtcblx0XHRzdXBlci5jb252ZXJ0U3R5bGUoLi4uYXJndW1lbnRzKVxuXHRcdHZhciBzdHlsZT10aGlzLndvcmRNb2RlbC5nZXREaXJlY3RTdHlsZSgpLFxuXHRcdFx0cHJvcENvbnZlcnRlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Qcm9wZXJ0aWVzKGVsLnN0eWxlLHRoaXMsIHBhdGhTdHlsZSwgYmdTdHlsZSk7XG5cdFx0c3R5bGUgJiYgc3R5bGUucGFyc2UoW3Byb3BDb252ZXJ0ZXJdKVxuXHRcdGlmKHRoaXMucGF0aCl7XG5cdFx0XHRpZihlbC5zdHlsZS5iYWNrZ3JvdW5kKVxuXHRcdFx0XHRwYXRoU3R5bGUuZmlsbE9wYWNpdHk9MFxuXHRcdFx0dmFyIGJnSW1hZ2U9ZWwuc3R5bGUuYmFja2dyb3VuZCxcblx0XHRcdFx0Z3JhZD1wYXRoU3R5bGUuZ3JhZDtcblx0XHRcdGRlbGV0ZSBwYXRoU3R5bGUuZ3JhZDtcdFx0XHRcdFxuXHRcdFx0XG5cdFx0XHR2YXIgc3ZnPSc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj4nXG5cdFx0XHRcdFx0KyhncmFkID8gJzxkZWZzPicrZ3JhZCsnPC9kZWZzPicgOiAnJylcblx0XHRcdFx0XHQrdGhpcy5wYXRoKycgc3R5bGU9XCInK2FzU3R5bGUocGF0aFN0eWxlKSsnXCIgLz48L3N2Zz4nO1xuXHRcdFx0dmFyIHN2Z0ltYWdlPSd1cmwoJyt0aGlzLmRvYy5hc0ltYWdlVVJMKHN2ZykrJyknO1xuXHRcdFx0YmdTdHlsZS5iYWNrZ3JvdW5kSW1hZ2U9c3ZnSW1hZ2Vcblx0XHRcdGJnU3R5bGUuYmFja2dyb3VuZFNpemU9JzEwMCUgMTAwJSdcblx0XHR9XG5cdH1cblx0bWFrZUJhY2tncm91bmRTdHlsZSgpe1xuXHRcdC8vbWFrZSBiYWNrZ3JvdW5kIGVsIHRvIGhvbGQgc3ZnIGJhY2tncm91bmRcblx0XHR2YXIgaWQ9J3NoYXBlJyt0aGlzLmRvYy51aWQoKVxuXHRcdHRoaXMuY29udGVudC5zZXRBdHRyaWJ1dGUoJ2lkJyxpZClcblx0XHR2YXIgc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJyMnK2lkKyc6OmJlZm9yZScpXG5cdFx0c3R5bGUuY29udGVudD0nXCJcIidcblx0XHRzdHlsZS56SW5kZXg9LTFcblx0XHRzdHlsZS5wb3NpdGlvbj0nYWJzb2x1dGUnXG5cdFx0c3R5bGUud2lkdGg9JzEwMCUnXG5cdFx0c3R5bGUuaGVpZ2h0PScxMDAlJ1xuXHRcdHN0eWxlLmxlZnQ9MFxuXHRcdHN0eWxlLnRvcD0wXG5cdFx0cmV0dXJuIHN0eWxlXG5cdH1cbn1cblxuU2hhcGUuUHJvcGVydGllcz1jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcblx0Y29uc3RydWN0b3Ioc3R5bGUscGFyZW50LCBwYXRoU3R5bGUsIGJnU3R5bGUpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnBhdGhTdHlsZT1wYXRoU3R5bGVcblx0XHR0aGlzLmJnU3R5bGU9YmdTdHlsZVxuXHR9XG5cblx0eGZybSh4KXtcblx0XHR0aGlzLnN0eWxlLndpZHRoPXgud2lkdGgrJ3B0J1xuXHRcdHRoaXMuc3R5bGUuaGVpZ2h0PXguaGVpZ2h0KydwdCdcblx0XHR4LnggJiYgKHRoaXMuc3R5bGUubGVmdD14LngrJ3B0Jylcblx0XHR4LnkgJiYgKHRoaXMuc3R5bGUudG9wPXgueSsncHQnKVxuXHRcdFxuXHRcdHgucm90YXRpb24gJiYgdGhpcy5zdHlsZXNzKCd0cmFuc2Zvcm0nLCdyb3RhdGUoJyt4LnJvdGF0aW9uKydkZWcpJylcblx0XHRcblx0XHR0aGlzLndvcmxkPXhcblx0fVxuXHRsbih4KXtcblx0XHR4LmNvbG9yICYmICh0aGlzLnBhdGhTdHlsZS5zdHJva2U9eC5jb2xvcik7XG5cdFx0eC53aWR0aCE9dW5kZWZpbmVkICYmICh0aGlzLnBhdGhTdHlsZS5zdHJva2VXaWR0aD14LndpZHRoKydwdCcpO1xuXHRcdFxuXHRcdHN3aXRjaCh4LmNhcCl7XG5cdFx0Y2FzZSAncm5kJzpcblx0XHRcdHRoaXMucGF0aFN0eWxlLnN0cm9rZUxpbmVjYXA9J3JvdW5kJ1xuXHRcdFx0YnJlYWtcblx0XHRkZWZhdWx0OlxuXHRcdFx0XG5cdFx0fVxuXHRcdFxuXHRcdGlmKHguZGFzaCl7XG5cdFx0XHRzd2l0Y2godGhpcy5saW5lU3R5bGUoeC5kYXNoKSl7XG5cdFx0XHRjYXNlICdkb3R0ZWQnOlxuXHRcdFx0XHR0aGlzLnBhdGhTdHlsZS5zdHJva2VEYXNoYXJyYXk9XCI1LDVcIlxuXHRcdFx0XHRicmVha1xuXHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgJ2Rhc2hlZCc6XG5cdFx0XHRcdHRoaXMucGF0aFN0eWxlLnN0cm9rZURhc2hhcnJheT1cIjEwLDEwXCJcblx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHNvbGlkRmlsbCh4KXtcblx0XHR0aGlzLnBhdGhTdHlsZS5maWxsPXhcblx0XHR0aGlzLnBhdGhTdHlsZS5maWxsT3BhY2l0eT0xXG5cdH1cblx0Z3JhZEZpbGwoeCl7XG5cdFx0aWYodGhpcy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UpXG5cdFx0XHRyZXR1cm5cblx0XHRcdFxuXHRcdHZhciBncmFkPVtdXG5cdFx0c3dpdGNoKHgucGF0aCl7XG5cdFx0Y2FzZSAnbGluZWFyJzpcblx0XHRcdGdyYWQucHVzaCgnPGxpbmVhckdyYWRpZW50IGlkPVwiZ3JhZFwiJylcblx0XHRcdHN3aXRjaCh4LmFuZ2VsKXtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0Z3JhZC5wdXNoKCd4MT1cIjAlXCIgeTE9XCIwJVwiIHgyPVwiMTAwJVwiIHkyPVwiMCVcIj4nKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSA5MDpcblx0XHRcdFx0Z3JhZC5wdXNoKCd4MT1cIjAlXCIgeTE9XCIwJVwiIHgyPVwiMCVcIiB5Mj1cIjEwMCVcIj4nKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAxODA6XG5cdFx0XHRcdGdyYWQucHVzaCgneDE9XCIxMDAlXCIgeTE9XCIwJVwiIHgyPVwiMCVcIiB5Mj1cIjAlXCI+Jylcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgMjcwOlxuXHRcdFx0XHRncmFkLnB1c2goJ3gxPVwiMCVcIiB5MT1cIjEwMCVcIiB4Mj1cIjAlXCIgeTI9XCIwJVwiPicpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0XHRncmFkLnB1c2goJzwvbGluZWFyR3JhZGllbnQ+Jylcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSAnY2lyY2xlJzpcblx0XHRcdGdyYWQucHVzaCgnPHJhZGlhbEdyYWRpZW50ICBpZD1cImdyYWRcIicpXG5cdFx0XHRncmFkLnB1c2goJ2N4PVwiNTAlXCIgY3k9XCI1MCVcIiByPVwiNTAlXCIgZng9XCI1MCVcIiBmeT1cIjUwJVwiPicpXG5cdFx0XHRncmFkLnB1c2goJzwvcmFkaWFsR3JhZGllbnQ+Jylcblx0XHRcdGJyZWFrXG5cdFx0fVxuXHRcdHZhciBlbmQ9Z3JhZC5wb3AoKVxuXHRcdGZvcih2YXIgaT0wLGxlbj14LnN0b3BzLmxlbmd0aCxhO2k8bGVuO2krKylcblx0XHRcdGdyYWQucHVzaCgnPHN0b3Agb2Zmc2V0PVwiJysoYT14LnN0b3BzW2ldKS5wb3NpdGlvbisnJVwiIHN0eWxlPVwic3RvcC1vcGFjaXR5OjE7c3RvcC1jb2xvcjonK2EuY29sb3IrJ1wiLz4nKVxuXHRcdGdyYWQucHVzaChlbmQpXG5cdFx0XG5cdFx0dGhpcy5wYXRoU3R5bGUuZ3JhZD1ncmFkLmpvaW4oJyAnKVxuXHRcdHRoaXMucGF0aFN0eWxlLmZpbGw9J3VybCgjZ3JhZCknXG5cdFx0dGhpcy5wYXRoU3R5bGUuZmlsbE9wYWNpdHk9MVxuXHR9XG5cdGJsaXBGaWxsKHgpe1xuXHRcdHRoaXMuc3R5bGUuYmFja2dyb3VuZD0ndXJsKCcrdGhpcy5kb2MuYXNJbWFnZVVSTCh4KSsnKSdcblx0XHR0aGlzLnN0eWxlLmJhY2tncm91bmRTaXplPScxMDAlIDEwMCUnXG5cdFx0dGhpcy5ub0ZpbGwoKVxuXHR9XG5cdG5vRmlsbCh4KXtcblx0XHR0aGlzLnBhdGhTdHlsZS5maWxsT3BhY2l0eT0wXG5cdH1cblx0bG5SZWYoeCl7XG5cdFx0dGhpcy5sbih4KVxuXHR9XG5cdGZpbGxSZWYoeCl7XG5cdFx0aWYodGhpcy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UpXG5cdFx0XHRyZXR1cm5cblx0XHRcblx0XHRpZih0eXBlb2YoeC5wYXRoKSE9J3VuZGVmaW5lZCcpXG5cdFx0XHRyZXR1cm4gdGhpcy5ncmFkRmlsbCh4KTtcblx0XHRcdFxuXHRcdGlmKHR5cGVvZih4KT09J3N0cmluZycpXG5cdFx0XHR0aGlzLnBhdGhTdHlsZS5maWxsPXhcblx0XHRlbHNlIGlmKHR5cGVvZih4LmNvbG9yKSE9J3VuZGVmaW5lZCcpXG5cdFx0XHR0aGlzLnBhdGhTdHlsZS5maWxsPXguY29sb3Jcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm47XG5cdFx0dGhpcy5wYXRoU3R5bGUuZmlsbE9wYWNpdHk9MVxuXHR9XG5cdGZvbnRSZWYoeCl7XG5cdFx0eC5jb2xvciAmJiAodGhpcy5zdHlsZS5jb2xvcj14LmNvbG9yKTtcblx0XHR4LmZhbWlseSAmJiAodGhpcy5zdHlsZS5mb250RmFtaWx5PXguZmFtaWx5KTtcblx0fVxuXHRwYXRoKHgsIHQpe1xuXHRcdHN3aXRjaCh4LnNoYXBlKXtcblx0XHRjYXNlICdsaW5lJzpcblx0XHRcdHRoaXMucGFyZW50LnBhdGg9JzxsaW5lIHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiJyt0aGlzLndvcmxkLndpZHRoKydwdFwiIHkyPVwiJyt0aGlzLndvcmxkLmhlaWdodCsncHRcIidcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSAncmVjdCc6XG5cdFx0XHR0aGlzLnBhcmVudC5wYXRoPSc8cmVjdCB3aWR0aD1cIicrdGhpcy53b3JsZC53aWR0aCsncHRcIiBoZWlnaHQ9XCInK3RoaXMud29ybGQuaGVpZ2h0KydwdFwiJ1xuXHRcdFx0YnJlYWs7XHRcblx0XHRjYXNlICdyb3VuZFJlY3QnOlxuXHRcdFx0dGhpcy5wYXJlbnQucGF0aD0nPHJlY3Qgcng9XCInKyh0PU1hdGgubWluKHRoaXMud29ybGQud2lkdGgsIHRoaXMud29ybGQuaGVpZ2h0KS8xMikrJ3B0XCIgcnk9XCInK3QrJ3B0XCIgd2lkdGg9XCInK3RoaXMud29ybGQud2lkdGgrJ3B0XCIgaGVpZ2h0PVwiJyt0aGlzLndvcmxkLmhlaWdodCsncHRcIidcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ2VsbGlwc2UnOlxuXHRcdFx0dGhpcy5wYXJlbnQucGF0aD0nPGVsbGlwc2UgY3g9XCInK3RoaXMud29ybGQud2lkdGgvMisncHRcIiBjeT1cIicrdGhpcy53b3JsZC5oZWlnaHQvMisncHRcIiByeD1cIicrdGhpcy53b3JsZC53aWR0aC8yKydwdFwiIHJ5PVwiJyt0aGlzLndvcmxkLmhlaWdodC8yKydwdFwiJ1xuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdwYXRoJzpcblx0XHRcdHRoaXMucGFyZW50LnBhdGg9JzxwYXRoIGQ9XCInK3gucGF0aCsnXCInXG5cdFx0XHRpZighY2xvemVkLnRlc3QoeC5wYXRoKSlcblx0XHRcdFx0dGhpcy5ub0ZpbGwoKVxuXHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblx0c3BBdXRvRml0KCl7XG5cdFx0dGhpcy5zdHlsZS5oZWlnaHQ9J2F1dG8nXG5cdH1cblx0bElucyh4KXtcblx0XHR0aGlzLnN0eWxlLnBhZGRpbmdMZWZ0PXgrJ3B0J1xuXHR9XG5cdHRJbnMoeCl7XG5cdFx0dGhpcy5zdHlsZS5wYWRkaW5nVG9wPXgrJ3B0J1xuXHR9XG5cdHJJbnMoeCl7XG5cdFx0dGhpcy5zdHlsZS5wYWRkaW5nUmlnaHQ9eCsncHQnXG5cdH1cblx0Yklucyh4KXtcblx0XHR0aGlzLnN0eWxlLnBhZGRpbmdCb3R0b209eCsncHQnXG5cdH1cblx0YW5jaG9yKHgpe1xuXHRcdHRoaXMuc3R5bGUuZGlzcGxheT0ndGFibGUtY2VsbCdcblx0XHR0aGlzLnN0eWxlLnZlcnRpY2FsQWxpZ249eFxuXHR9XG5cdHZlcnQoeCl7XG5cdFx0dGhpcy5zdHlsZS5oZWlnaHQ9dGhpcy53b3JsZC53aWR0aCsncHQnXG5cdFx0dGhpcy5zdHlsZS53aWR0aD10aGlzLndvcmxkLmhlaWdodCsncHQnXG5cdFx0dmFyIGRlbHRhPSh0aGlzLndvcmxkLndpZHRoLXRoaXMud29ybGQuaGVpZ2h0KS8yXG5cdFx0XHRcdFx0XHRcblx0XHR0aGlzLmJnU3R5bGUuaGVpZ2h0PXRoaXMud29ybGQuaGVpZ2h0KydwdCdcblx0XHR0aGlzLmJnU3R5bGUud2lkdGg9dGhpcy53b3JsZC53aWR0aCsncHQnXG5cdFx0dGhpcy5zdHlsZXNzKCd0cmFuc2Zvcm0nLCd0cmFuc2xhdGUoLScrZGVsdGErJ3B0LCcrZGVsdGErJ3B0KSByb3RhdGUoLScreCsnZGVnKSAnLCB0aGlzLmJnU3R5bGUpXG5cblx0XHR0aGlzLnN0eWxlc3MoJ3RyYW5zZm9ybScsJ3RyYW5zbGF0ZSgnK2RlbHRhKydwdCwtJytkZWx0YSsncHQpIHJvdGF0ZSgnKyh4K3RoaXMud29ybGQucm90YXRpb258fDApKydkZWcpJylcblx0fVxufSJdfQ==