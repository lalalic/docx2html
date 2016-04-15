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

var Properties = function (_Style$Properties) {
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

Shape.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc2hhcGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQUksS0FBRyxRQUFIO0lBQ0gsSUFBRSxTQUFGLENBQUUsQ0FBUyxDQUFULEVBQVc7QUFBQyxRQUFPLE1BQUksRUFBRSxXQUFGLEVBQUosQ0FBUjtDQUFYO0lBQ0YsU0FBTyxNQUFQOztBQUVELFNBQVMsT0FBVCxDQUFpQixDQUFqQixFQUFtQjtBQUNsQixLQUFJLElBQUUsRUFBRixDQURjO0FBRWxCLE1BQUksSUFBSSxDQUFKLElBQVMsQ0FBYjtBQUNDLEdBQUMsRUFBRSxVQUFGLENBQWEsRUFBRSxDQUFGLENBQWIsQ0FBRCxJQUF1QixFQUFFLElBQUYsQ0FBTyxFQUFFLE9BQUYsQ0FBVSxFQUFWLEVBQWEsQ0FBYixJQUFnQixHQUFoQixHQUFvQixFQUFFLENBQUYsQ0FBcEIsQ0FBOUI7RUFERCxPQUVPLEVBQUUsSUFBRixDQUFPLEdBQVAsQ0FBUCxDQUprQjtDQUFuQjs7SUFPcUI7Ozs7Ozs7Ozs7OytCQUdQLElBQUc7QUFDZixNQUFHLEtBQUgsQ0FBUyxRQUFULEdBQWtCLFVBQWxCLENBRGU7QUFFZixNQUFHLEtBQUgsQ0FBUyxRQUFULEdBQWtCLFFBQWxCLENBRmU7O0FBSWYsT0FBSSxZQUFVLEVBQUMsUUFBTyxPQUFQLEVBQWdCLGFBQVksQ0FBWixFQUFlLGFBQVksQ0FBWixFQUExQztPQUNILFVBQVEsS0FBSyxtQkFBTCxFQUFSLENBTGM7QUFNZiw4QkFUbUIsb0RBU0csVUFBdEIsQ0FOZTtBQU9mLE9BQUksUUFBTSxLQUFLLFNBQUwsQ0FBZSxjQUFmLEVBQU47T0FDSCxnQkFBYyxJQUFJLEtBQUssV0FBTCxDQUFpQixVQUFqQixDQUE0QixHQUFHLEtBQUgsRUFBUyxJQUF6QyxFQUErQyxTQUEvQyxFQUEwRCxPQUExRCxDQUFkLENBUmM7QUFTZixZQUFTLE1BQU0sS0FBTixD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LENBQVcsS0FBWCxHQUFpQixLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQWtCLElBQWxCLENBRlg7QUFHTixPQUFJLFFBQU0sQ0FBQyxLQUFLLEtBQUwsQ0FBVyxLQUFYLEdBQWlCLEtBQUssS0FBTCxDQUFXLE1BQVgsQ0FBbEIsR0FBcUMsQ0FBckMsQ0FISjs7QUFLTixRQUFLLE9BQUwsQ0FBYSxNQUFiLEdBQW9CLEtBQUssS0FBTCxDQUFXLE1BQVgsR0FBa0IsSUFBbEIsQ0FMZDtBQU1OLFFBQUssT0FBTCxDQUFhLEtBQWIsR0FBbUIsS0FBSyxLQUFMLENBQVcsS0FBWCxHQUFpQixJQUFqQixDQU5iO0FBT04sUUFBSyxPQUFMLENBQWEsV0FBYixFQUF5QixnQkFBYyxLQUFkLEdBQW9CLEtBQXBCLEdBQTBCLEtBQTFCLEdBQWdDLGNBQWhDLEdBQStDLENBQS9DLEdBQWlELE9BQWpELEVBQTBELEtBQUssT0FBTCxDQUFuRixDQVBNOztBQVNOLFFBQUssT0FBTCxDQUFhLFdBQWIsRUFBeUIsZUFBYSxLQUFiLEdBQW1CLE1BQW5CLEdBQTBCLEtBQTFCLEdBQWdDLGFBQWhDLElBQStDLElBQUUsS0FBSyxLQUFMLENBQVcsUUFBWCxJQUFxQixDQUF2QixDQUEvQyxHQUF5RSxNQUF6RSxDQUF6QixDQVRNOzs7O1FBMUpGO0VBQW1CLG9CQUFNLFVBQU47O0FBdUt6QixNQUFNLFVBQU4sR0FBaUIsVUFBakIiLCJmaWxlIjoic2hhcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJ1xuaW1wb3J0IFN0eWxlIGZyb20gJy4vc3R5bGUvY29udmVydGVyJ1xuXG52YXIgQVo9L1tBLVpdL2csIFxuXHRyPWZ1bmN0aW9uKGEpe3JldHVybiAnLScrYS50b0xvd2VyQ2FzZSgpfSxcblx0Y2xvemVkPS9aJC9naTtcblx0XG5mdW5jdGlvbiBhc1N0eWxlKHgpe1xuXHR2YXIgYT1bXVxuXHRmb3IodmFyIGkgaW4geClcblx0XHQhJC5pc0Z1bmN0aW9uKHhbaV0pICYmIGEucHVzaChpLnJlcGxhY2UoQVoscikrJzonK3hbaV0pXG5cdHJldHVybiBhLmpvaW4oJzsnKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFwZSBleHRlbmRzIENvbnZlcnRlcntcblx0Z2V0IHRhZygpe3JldHVybiAnZGl2J31cblx0XG5cdGNvbnZlcnRTdHlsZShlbCl7XG5cdFx0ZWwuc3R5bGUucG9zaXRpb249J2Fic29sdXRlJ1xuXHRcdGVsLnN0eWxlLm92ZXJmbG93PSdoaWRkZW4nXG5cblx0XHR2YXIgcGF0aFN0eWxlPXtzdHJva2U6J2JsYWNrJywgc3Ryb2tlV2lkdGg6MiwgZmlsbE9wYWNpdHk6MH0sXG5cdFx0XHRiZ1N0eWxlPXRoaXMubWFrZUJhY2tncm91bmRTdHlsZSgpO1xuXHRcdHN1cGVyLmNvbnZlcnRTdHlsZSguLi5hcmd1bWVudHMpXG5cdFx0dmFyIHN0eWxlPXRoaXMud29yZE1vZGVsLmdldERpcmVjdFN0eWxlKCksXG5cdFx0XHRwcm9wQ29udmVydGVyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXMoZWwuc3R5bGUsdGhpcywgcGF0aFN0eWxlLCBiZ1N0eWxlKTtcblx0XHRzdHlsZSAmJiBzdHlsZS5wYXJzZShbcHJvcENvbnZlcnRlcl0pXG5cdFx0aWYodGhpcy5wYXRoKXtcblx0XHRcdGlmKGVsLnN0eWxlLmJhY2tncm91bmQpXG5cdFx0XHRcdHBhdGhTdHlsZS5maWxsT3BhY2l0eT0wXG5cdFx0XHR2YXIgYmdJbWFnZT1lbC5zdHlsZS5iYWNrZ3JvdW5kLFxuXHRcdFx0XHRncmFkPXBhdGhTdHlsZS5ncmFkO1xuXHRcdFx0ZGVsZXRlIHBhdGhTdHlsZS5ncmFkO1x0XHRcdFx0XG5cdFx0XHRcblx0XHRcdHZhciBzdmc9JzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPidcblx0XHRcdFx0XHQrKGdyYWQgPyAnPGRlZnM+JytncmFkKyc8L2RlZnM+JyA6ICcnKVxuXHRcdFx0XHRcdCt0aGlzLnBhdGgrJyBzdHlsZT1cIicrYXNTdHlsZShwYXRoU3R5bGUpKydcIiAvPjwvc3ZnPic7XG5cdFx0XHR2YXIgc3ZnSW1hZ2U9J3VybCgnK3RoaXMuZG9jLmFzSW1hZ2VVUkwoc3ZnKSsnKSc7XG5cdFx0XHRiZ1N0eWxlLmJhY2tncm91bmRJbWFnZT1zdmdJbWFnZVxuXHRcdFx0YmdTdHlsZS5iYWNrZ3JvdW5kU2l6ZT0nMTAwJSAxMDAlJ1xuXHRcdH1cblx0fVxuXHRtYWtlQmFja2dyb3VuZFN0eWxlKCl7XG5cdFx0Ly9tYWtlIGJhY2tncm91bmQgZWwgdG8gaG9sZCBzdmcgYmFja2dyb3VuZFxuXHRcdHZhciBpZD0nc2hhcGUnK3RoaXMuZG9jLnVpZCgpXG5cdFx0dGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZSgnaWQnLGlkKVxuXHRcdHZhciBzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnIycraWQrJzo6YmVmb3JlJylcblx0XHRzdHlsZS5jb250ZW50PSdcIlwiJ1xuXHRcdHN0eWxlLnpJbmRleD0tMVxuXHRcdHN0eWxlLnBvc2l0aW9uPSdhYnNvbHV0ZSdcblx0XHRzdHlsZS53aWR0aD0nMTAwJSdcblx0XHRzdHlsZS5oZWlnaHQ9JzEwMCUnXG5cdFx0c3R5bGUubGVmdD0wXG5cdFx0c3R5bGUudG9wPTBcblx0XHRyZXR1cm4gc3R5bGVcblx0fVxufVxuXG5jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcblx0Y29uc3RydWN0b3Ioc3R5bGUscGFyZW50LCBwYXRoU3R5bGUsIGJnU3R5bGUpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnBhdGhTdHlsZT1wYXRoU3R5bGVcblx0XHR0aGlzLmJnU3R5bGU9YmdTdHlsZVxuXHR9XG5cblx0eGZybSh4KXtcblx0XHR0aGlzLnN0eWxlLndpZHRoPXgud2lkdGgrJ3B0J1xuXHRcdHRoaXMuc3R5bGUuaGVpZ2h0PXguaGVpZ2h0KydwdCdcblx0XHR4LnggJiYgKHRoaXMuc3R5bGUubGVmdD14LngrJ3B0Jylcblx0XHR4LnkgJiYgKHRoaXMuc3R5bGUudG9wPXgueSsncHQnKVxuXHRcdFxuXHRcdHgucm90YXRpb24gJiYgdGhpcy5zdHlsZXNzKCd0cmFuc2Zvcm0nLCdyb3RhdGUoJyt4LnJvdGF0aW9uKydkZWcpJylcblx0XHRcblx0XHR0aGlzLndvcmxkPXhcblx0fVxuXHRsbih4KXtcblx0XHR4LmNvbG9yICYmICh0aGlzLnBhdGhTdHlsZS5zdHJva2U9eC5jb2xvcik7XG5cdFx0eC53aWR0aCE9dW5kZWZpbmVkICYmICh0aGlzLnBhdGhTdHlsZS5zdHJva2VXaWR0aD14LndpZHRoKydwdCcpO1xuXHRcdFxuXHRcdHN3aXRjaCh4LmNhcCl7XG5cdFx0Y2FzZSAncm5kJzpcblx0XHRcdHRoaXMucGF0aFN0eWxlLnN0cm9rZUxpbmVjYXA9J3JvdW5kJ1xuXHRcdFx0YnJlYWtcblx0XHRkZWZhdWx0OlxuXHRcdFx0XG5cdFx0fVxuXHRcdFxuXHRcdGlmKHguZGFzaCl7XG5cdFx0XHRzd2l0Y2godGhpcy5saW5lU3R5bGUoeC5kYXNoKSl7XG5cdFx0XHRjYXNlICdkb3R0ZWQnOlxuXHRcdFx0XHR0aGlzLnBhdGhTdHlsZS5zdHJva2VEYXNoYXJyYXk9XCI1LDVcIlxuXHRcdFx0XHRicmVha1xuXHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgJ2Rhc2hlZCc6XG5cdFx0XHRcdHRoaXMucGF0aFN0eWxlLnN0cm9rZURhc2hhcnJheT1cIjEwLDEwXCJcblx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHNvbGlkRmlsbCh4KXtcblx0XHR0aGlzLnBhdGhTdHlsZS5maWxsPXhcblx0XHR0aGlzLnBhdGhTdHlsZS5maWxsT3BhY2l0eT0xXG5cdH1cblx0Z3JhZEZpbGwoeCl7XG5cdFx0aWYodGhpcy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UpXG5cdFx0XHRyZXR1cm5cblx0XHRcdFxuXHRcdHZhciBncmFkPVtdXG5cdFx0c3dpdGNoKHgucGF0aCl7XG5cdFx0Y2FzZSAnbGluZWFyJzpcblx0XHRcdGdyYWQucHVzaCgnPGxpbmVhckdyYWRpZW50IGlkPVwiZ3JhZFwiJylcblx0XHRcdHN3aXRjaCh4LmFuZ2VsKXtcblx0XHRcdGNhc2UgMDpcblx0XHRcdFx0Z3JhZC5wdXNoKCd4MT1cIjAlXCIgeTE9XCIwJVwiIHgyPVwiMTAwJVwiIHkyPVwiMCVcIj4nKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSA5MDpcblx0XHRcdFx0Z3JhZC5wdXNoKCd4MT1cIjAlXCIgeTE9XCIwJVwiIHgyPVwiMCVcIiB5Mj1cIjEwMCVcIj4nKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAxODA6XG5cdFx0XHRcdGdyYWQucHVzaCgneDE9XCIxMDAlXCIgeTE9XCIwJVwiIHgyPVwiMCVcIiB5Mj1cIjAlXCI+Jylcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgMjcwOlxuXHRcdFx0XHRncmFkLnB1c2goJ3gxPVwiMCVcIiB5MT1cIjEwMCVcIiB4Mj1cIjAlXCIgeTI9XCIwJVwiPicpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0XHRncmFkLnB1c2goJzwvbGluZWFyR3JhZGllbnQ+Jylcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSAnY2lyY2xlJzpcblx0XHRcdGdyYWQucHVzaCgnPHJhZGlhbEdyYWRpZW50ICBpZD1cImdyYWRcIicpXG5cdFx0XHRncmFkLnB1c2goJ2N4PVwiNTAlXCIgY3k9XCI1MCVcIiByPVwiNTAlXCIgZng9XCI1MCVcIiBmeT1cIjUwJVwiPicpXG5cdFx0XHRncmFkLnB1c2goJzwvcmFkaWFsR3JhZGllbnQ+Jylcblx0XHRcdGJyZWFrXG5cdFx0fVxuXHRcdHZhciBlbmQ9Z3JhZC5wb3AoKVxuXHRcdGZvcih2YXIgaT0wLGxlbj14LnN0b3BzLmxlbmd0aCxhO2k8bGVuO2krKylcblx0XHRcdGdyYWQucHVzaCgnPHN0b3Agb2Zmc2V0PVwiJysoYT14LnN0b3BzW2ldKS5wb3NpdGlvbisnJVwiIHN0eWxlPVwic3RvcC1vcGFjaXR5OjE7c3RvcC1jb2xvcjonK2EuY29sb3IrJ1wiLz4nKVxuXHRcdGdyYWQucHVzaChlbmQpXG5cdFx0XG5cdFx0dGhpcy5wYXRoU3R5bGUuZ3JhZD1ncmFkLmpvaW4oJyAnKVxuXHRcdHRoaXMucGF0aFN0eWxlLmZpbGw9J3VybCgjZ3JhZCknXG5cdFx0dGhpcy5wYXRoU3R5bGUuZmlsbE9wYWNpdHk9MVxuXHR9XG5cdGJsaXBGaWxsKHgpe1xuXHRcdHRoaXMuc3R5bGUuYmFja2dyb3VuZD0ndXJsKCcrdGhpcy5kb2MuYXNJbWFnZVVSTCh4KSsnKSdcblx0XHR0aGlzLnN0eWxlLmJhY2tncm91bmRTaXplPScxMDAlIDEwMCUnXG5cdFx0dGhpcy5ub0ZpbGwoKVxuXHR9XG5cdG5vRmlsbCh4KXtcblx0XHR0aGlzLnBhdGhTdHlsZS5maWxsT3BhY2l0eT0wXG5cdH1cblx0bG5SZWYoeCl7XG5cdFx0dGhpcy5sbih4KVxuXHR9XG5cdGZpbGxSZWYoeCl7XG5cdFx0aWYodGhpcy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UpXG5cdFx0XHRyZXR1cm5cblx0XHRcblx0XHRpZih0eXBlb2YoeC5wYXRoKSE9J3VuZGVmaW5lZCcpXG5cdFx0XHRyZXR1cm4gdGhpcy5ncmFkRmlsbCh4KTtcblx0XHRcdFxuXHRcdGlmKHR5cGVvZih4KT09J3N0cmluZycpXG5cdFx0XHR0aGlzLnBhdGhTdHlsZS5maWxsPXhcblx0XHRlbHNlIGlmKHR5cGVvZih4LmNvbG9yKSE9J3VuZGVmaW5lZCcpXG5cdFx0XHR0aGlzLnBhdGhTdHlsZS5maWxsPXguY29sb3Jcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm47XG5cdFx0dGhpcy5wYXRoU3R5bGUuZmlsbE9wYWNpdHk9MVxuXHR9XG5cdGZvbnRSZWYoeCl7XG5cdFx0eC5jb2xvciAmJiAodGhpcy5zdHlsZS5jb2xvcj14LmNvbG9yKTtcblx0XHR4LmZhbWlseSAmJiAodGhpcy5zdHlsZS5mb250RmFtaWx5PXguZmFtaWx5KTtcblx0fVxuXHRwYXRoKHgsIHQpe1xuXHRcdHN3aXRjaCh4LnNoYXBlKXtcblx0XHRjYXNlICdsaW5lJzpcblx0XHRcdHRoaXMucGFyZW50LnBhdGg9JzxsaW5lIHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiJyt0aGlzLndvcmxkLndpZHRoKydwdFwiIHkyPVwiJyt0aGlzLndvcmxkLmhlaWdodCsncHRcIidcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSAncmVjdCc6XG5cdFx0XHR0aGlzLnBhcmVudC5wYXRoPSc8cmVjdCB3aWR0aD1cIicrdGhpcy53b3JsZC53aWR0aCsncHRcIiBoZWlnaHQ9XCInK3RoaXMud29ybGQuaGVpZ2h0KydwdFwiJ1xuXHRcdFx0YnJlYWs7XHRcblx0XHRjYXNlICdyb3VuZFJlY3QnOlxuXHRcdFx0dGhpcy5wYXJlbnQucGF0aD0nPHJlY3Qgcng9XCInKyh0PU1hdGgubWluKHRoaXMud29ybGQud2lkdGgsIHRoaXMud29ybGQuaGVpZ2h0KS8xMikrJ3B0XCIgcnk9XCInK3QrJ3B0XCIgd2lkdGg9XCInK3RoaXMud29ybGQud2lkdGgrJ3B0XCIgaGVpZ2h0PVwiJyt0aGlzLndvcmxkLmhlaWdodCsncHRcIidcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ2VsbGlwc2UnOlxuXHRcdFx0dGhpcy5wYXJlbnQucGF0aD0nPGVsbGlwc2UgY3g9XCInK3RoaXMud29ybGQud2lkdGgvMisncHRcIiBjeT1cIicrdGhpcy53b3JsZC5oZWlnaHQvMisncHRcIiByeD1cIicrdGhpcy53b3JsZC53aWR0aC8yKydwdFwiIHJ5PVwiJyt0aGlzLndvcmxkLmhlaWdodC8yKydwdFwiJ1xuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdwYXRoJzpcblx0XHRcdHRoaXMucGFyZW50LnBhdGg9JzxwYXRoIGQ9XCInK3gucGF0aCsnXCInXG5cdFx0XHRpZighY2xvemVkLnRlc3QoeC5wYXRoKSlcblx0XHRcdFx0dGhpcy5ub0ZpbGwoKVxuXHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblx0c3BBdXRvRml0KCl7XG5cdFx0dGhpcy5zdHlsZS5oZWlnaHQ9J2F1dG8nXG5cdH1cblx0bElucyh4KXtcblx0XHR0aGlzLnN0eWxlLnBhZGRpbmdMZWZ0PXgrJ3B0J1xuXHR9XG5cdHRJbnMoeCl7XG5cdFx0dGhpcy5zdHlsZS5wYWRkaW5nVG9wPXgrJ3B0J1xuXHR9XG5cdHJJbnMoeCl7XG5cdFx0dGhpcy5zdHlsZS5wYWRkaW5nUmlnaHQ9eCsncHQnXG5cdH1cblx0Yklucyh4KXtcblx0XHR0aGlzLnN0eWxlLnBhZGRpbmdCb3R0b209eCsncHQnXG5cdH1cblx0YW5jaG9yKHgpe1xuXHRcdHRoaXMuc3R5bGUuZGlzcGxheT0ndGFibGUtY2VsbCdcblx0XHR0aGlzLnN0eWxlLnZlcnRpY2FsQWxpZ249eFxuXHR9XG5cdHZlcnQoeCl7XG5cdFx0dGhpcy5zdHlsZS5oZWlnaHQ9dGhpcy53b3JsZC53aWR0aCsncHQnXG5cdFx0dGhpcy5zdHlsZS53aWR0aD10aGlzLndvcmxkLmhlaWdodCsncHQnXG5cdFx0dmFyIGRlbHRhPSh0aGlzLndvcmxkLndpZHRoLXRoaXMud29ybGQuaGVpZ2h0KS8yXG5cdFx0XHRcdFx0XHRcblx0XHR0aGlzLmJnU3R5bGUuaGVpZ2h0PXRoaXMud29ybGQuaGVpZ2h0KydwdCdcblx0XHR0aGlzLmJnU3R5bGUud2lkdGg9dGhpcy53b3JsZC53aWR0aCsncHQnXG5cdFx0dGhpcy5zdHlsZXNzKCd0cmFuc2Zvcm0nLCd0cmFuc2xhdGUoLScrZGVsdGErJ3B0LCcrZGVsdGErJ3B0KSByb3RhdGUoLScreCsnZGVnKSAnLCB0aGlzLmJnU3R5bGUpXG5cblx0XHR0aGlzLnN0eWxlc3MoJ3RyYW5zZm9ybScsJ3RyYW5zbGF0ZSgnK2RlbHRhKydwdCwtJytkZWx0YSsncHQpIHJvdGF0ZSgnKyh4K3RoaXMud29ybGQucm90YXRpb258fDApKydkZWcpJylcblx0fVxufVxuXG5TaGFwZS5Qcm9wZXJ0aWVzPVByb3BlcnRpZXMiXX0=