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

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

var _converter3 = require('./style/converter');

var _converter4 = _interopRequireDefault(_converter3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	(0, _inherits3.default)(Shape, _Converter);

	function Shape() {
		(0, _classCallCheck3.default)(this, Shape);
		return (0, _possibleConstructorReturn3.default)(this, (Shape.__proto__ || (0, _getPrototypeOf2.default)(Shape)).apply(this, arguments));
	}

	(0, _createClass3.default)(Shape, [{
		key: 'convertStyle',
		value: function convertStyle(el) {
			el.style.position = 'absolute';
			el.style.overflow = 'hidden';

			var pathStyle = { stroke: 'black', strokeWidth: 2, fillOpacity: 0 },
			    bgStyle = this.makeBackgroundStyle();
			(0, _get3.default)(Shape.prototype.__proto__ || (0, _getPrototypeOf2.default)(Shape.prototype), 'convertStyle', this).apply(this, arguments);
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
	(0, _inherits3.default)(Properties, _Style$Properties);

	function Properties(style, parent, pathStyle, bgStyle) {
		(0, _classCallCheck3.default)(this, Properties);

		var _this2 = (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));

		_this2.pathStyle = pathStyle;
		_this2.bgStyle = bgStyle;
		return _this2;
	}

	(0, _createClass3.default)(Properties, [{
		key: 'xfrm',
		value: function xfrm(x) {
			this.style.width = x.width + 'px';
			this.style.height = x.height + 'px';
			x.x && (this.style.left = x.x + 'px');
			x.y && (this.style.top = x.y + 'px');

			x.rotation && this.styless('transform', 'rotate(' + x.rotation + 'deg)');

			this.world = x;
		}
	}, {
		key: 'ln',
		value: function ln(x) {
			x.color && (this.pathStyle.stroke = x.color);
			x.width != undefined && (this.pathStyle.strokeWidth = x.width + 'px');

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
			this.style.paddingLeft = x + 'px';
		}
	}, {
		key: 'tIns',
		value: function tIns(x) {
			this.style.paddingTop = x + 'px';
		}
	}, {
		key: 'rIns',
		value: function rIns(x) {
			this.style.paddingRight = x + 'px';
		}
	}, {
		key: 'bIns',
		value: function bIns(x) {
			this.style.paddingBottom = x + 'px';
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
			this.style.height = this.world.width + 'px';
			this.style.width = this.world.height + 'px';
			var delta = (this.world.width - this.world.height) / 2;

			this.bgStyle.height = this.world.height + 'px';
			this.bgStyle.width = this.world.width + 'px';
			this.styless('transform', 'translate(-' + delta + 'pt,' + delta + 'pt) rotate(-' + x + 'deg) ', this.bgStyle);

			this.styless('transform', 'translate(' + delta + 'pt,-' + delta + 'pt) rotate(' + (x + this.world.rotation || 0) + 'deg)');
		}
	}]);
	return Properties;
}(_converter4.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc2hhcGUuanMiXSwibmFtZXMiOlsiQVoiLCJyIiwiYSIsInRvTG93ZXJDYXNlIiwiY2xvemVkIiwiYXNTdHlsZSIsIngiLCJpIiwiJCIsImlzRnVuY3Rpb24iLCJwdXNoIiwicmVwbGFjZSIsImpvaW4iLCJTaGFwZSIsImVsIiwic3R5bGUiLCJwb3NpdGlvbiIsIm92ZXJmbG93IiwicGF0aFN0eWxlIiwic3Ryb2tlIiwic3Ryb2tlV2lkdGgiLCJmaWxsT3BhY2l0eSIsImJnU3R5bGUiLCJtYWtlQmFja2dyb3VuZFN0eWxlIiwiYXJndW1lbnRzIiwid29yZE1vZGVsIiwiZ2V0RGlyZWN0U3R5bGUiLCJwcm9wQ29udmVydGVyIiwiY29uc3RydWN0b3IiLCJQcm9wZXJ0aWVzIiwicGFyc2UiLCJwYXRoIiwiYmFja2dyb3VuZCIsImJnSW1hZ2UiLCJncmFkIiwic3ZnIiwic3ZnSW1hZ2UiLCJkb2MiLCJhc0ltYWdlVVJMIiwiYmFja2dyb3VuZEltYWdlIiwiYmFja2dyb3VuZFNpemUiLCJpZCIsInVpZCIsImNvbnRlbnQiLCJzZXRBdHRyaWJ1dGUiLCJjcmVhdGVTdHlsZSIsInpJbmRleCIsIndpZHRoIiwiaGVpZ2h0IiwibGVmdCIsInRvcCIsInBhcmVudCIsInkiLCJyb3RhdGlvbiIsInN0eWxlc3MiLCJ3b3JsZCIsImNvbG9yIiwidW5kZWZpbmVkIiwiY2FwIiwic3Ryb2tlTGluZWNhcCIsImRhc2giLCJsaW5lU3R5bGUiLCJzdHJva2VEYXNoYXJyYXkiLCJmaWxsIiwiYW5nZWwiLCJlbmQiLCJwb3AiLCJsZW4iLCJzdG9wcyIsImxlbmd0aCIsIm5vRmlsbCIsImxuIiwiZ3JhZEZpbGwiLCJmYW1pbHkiLCJmb250RmFtaWx5IiwidCIsInNoYXBlIiwiTWF0aCIsIm1pbiIsInRlc3QiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdUb3AiLCJwYWRkaW5nUmlnaHQiLCJwYWRkaW5nQm90dG9tIiwiZGlzcGxheSIsInZlcnRp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QWhDLElBQStDaEYsSUFBRSxLQUFLaUQsS0FBTCxDQUFXRixRQUFiLElBQXVCLENBQXRFLElBQXlFLE1BQWxHO0FBQ0E7QUFwS0Y7QUFBQTtBQUFBLEVBQTBDLG9CQUFNeEIsVUFBaEQiLCJmaWxlIjoic2hhcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJ1xuaW1wb3J0IFN0eWxlIGZyb20gJy4vc3R5bGUvY29udmVydGVyJ1xuXG52YXIgQVo9L1tBLVpdL2csIFxuXHRyPWZ1bmN0aW9uKGEpe3JldHVybiAnLScrYS50b0xvd2VyQ2FzZSgpfSxcblx0Y2xvemVkPS9aJC9naTtcblx0XG5mdW5jdGlvbiBhc1N0eWxlKHgpe1xuXHR2YXIgYT1bXVxuXHRmb3IodmFyIGkgaW4geClcblx0XHQhJC5pc0Z1bmN0aW9uKHhbaV0pICYmIGEucHVzaChpLnJlcGxhY2UoQVoscikrJzonK3hbaV0pXG5cdHJldHVybiBhLmpvaW4oJzsnKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFwZSBleHRlbmRzIENvbnZlcnRlcntcblx0Z2V0IHRhZygpe3JldHVybiAnZGl2J31cblx0XG5cdGNvbnZlcnRTdHlsZShlbCl7XG5cdFx0ZWwuc3R5bGUucG9zaXRpb249J2Fic29sdXRlJ1xuXHRcdGVsLnN0eWxlLm92ZXJmbG93PSdoaWRkZW4nXG5cblx0XHR2YXIgcGF0aFN0eWxlPXtzdHJva2U6J2JsYWNrJywgc3Ryb2tlV2lkdGg6MiwgZmlsbE9wYWNpdHk6MH0sXG5cdFx0XHRiZ1N0eWxlPXRoaXMubWFrZUJhY2tncm91bmRTdHlsZSgpO1xuXHRcdHN1cGVyLmNvbnZlcnRTdHlsZSguLi5hcmd1bWVudHMpXG5cdFx0dmFyIHN0eWxlPXRoaXMud29yZE1vZGVsLmdldERpcmVjdFN0eWxlKCksXG5cdFx0XHRwcm9wQ29udmVydGVyPW5ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXMoZWwuc3R5bGUsdGhpcywgcGF0aFN0eWxlLCBiZ1N0eWxlKTtcblx0XHRzdHlsZSAmJiBzdHlsZS5wYXJzZShbcHJvcENvbnZlcnRlcl0pXG5cdFx0aWYodGhpcy5wYXRoKXtcblx0XHRcdGlmKGVsLnN0eWxlLmJhY2tncm91bmQpXG5cdFx0XHRcdHBhdGhTdHlsZS5maWxsT3BhY2l0eT0wXG5cdFx0XHR2YXIgYmdJbWFnZT1lbC5zdHlsZS5iYWNrZ3JvdW5kLFxuXHRcdFx0XHRncmFkPXBhdGhTdHlsZS5ncmFkO1xuXHRcdFx0ZGVsZXRlIHBhdGhTdHlsZS5ncmFkO1x0XHRcdFx0XG5cdFx0XHRcblx0XHRcdHZhciBzdmc9JzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPidcblx0XHRcdFx0XHQrKGdyYWQgPyAnPGRlZnM+JytncmFkKyc8L2RlZnM+JyA6ICcnKVxuXHRcdFx0XHRcdCt0aGlzLnBhdGgrJyBzdHlsZT1cIicrYXNTdHlsZShwYXRoU3R5bGUpKydcIiAvPjwvc3ZnPic7XG5cdFx0XHR2YXIgc3ZnSW1hZ2U9J3VybCgnK3RoaXMuZG9jLmFzSW1hZ2VVUkwoc3ZnKSsnKSc7XG5cdFx0XHRiZ1N0eWxlLmJhY2tncm91bmRJbWFnZT1zdmdJbWFnZVxuXHRcdFx0YmdTdHlsZS5iYWNrZ3JvdW5kU2l6ZT0nMTAwJSAxMDAlJ1xuXHRcdH1cblx0fVxuXHRtYWtlQmFja2dyb3VuZFN0eWxlKCl7XG5cdFx0Ly9tYWtlIGJhY2tncm91bmQgZWwgdG8gaG9sZCBzdmcgYmFja2dyb3VuZFxuXHRcdHZhciBpZD0nc2hhcGUnK3RoaXMuZG9jLnVpZCgpXG5cdFx0dGhpcy5jb250ZW50LnNldEF0dHJpYnV0ZSgnaWQnLGlkKVxuXHRcdHZhciBzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnIycraWQrJzo6YmVmb3JlJylcblx0XHRzdHlsZS5jb250ZW50PSdcIlwiJ1xuXHRcdHN0eWxlLnpJbmRleD0tMVxuXHRcdHN0eWxlLnBvc2l0aW9uPSdhYnNvbHV0ZSdcblx0XHRzdHlsZS53aWR0aD0nMTAwJSdcblx0XHRzdHlsZS5oZWlnaHQ9JzEwMCUnXG5cdFx0c3R5bGUubGVmdD0wXG5cdFx0c3R5bGUudG9wPTBcblx0XHRyZXR1cm4gc3R5bGVcblx0fVxufVxuXG5TaGFwZS5Qcm9wZXJ0aWVzPWNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRjb25zdHJ1Y3RvcihzdHlsZSxwYXJlbnQsIHBhdGhTdHlsZSwgYmdTdHlsZSl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMucGF0aFN0eWxlPXBhdGhTdHlsZVxuXHRcdHRoaXMuYmdTdHlsZT1iZ1N0eWxlXG5cdH1cblxuXHR4ZnJtKHgpe1xuXHRcdHRoaXMuc3R5bGUud2lkdGg9eC53aWR0aCsncHgnXG5cdFx0dGhpcy5zdHlsZS5oZWlnaHQ9eC5oZWlnaHQrJ3B4J1xuXHRcdHgueCAmJiAodGhpcy5zdHlsZS5sZWZ0PXgueCsncHgnKVxuXHRcdHgueSAmJiAodGhpcy5zdHlsZS50b3A9eC55KydweCcpXG5cdFx0XG5cdFx0eC5yb3RhdGlvbiAmJiB0aGlzLnN0eWxlc3MoJ3RyYW5zZm9ybScsJ3JvdGF0ZSgnK3gucm90YXRpb24rJ2RlZyknKVxuXHRcdFxuXHRcdHRoaXMud29ybGQ9eFxuXHR9XG5cdGxuKHgpe1xuXHRcdHguY29sb3IgJiYgKHRoaXMucGF0aFN0eWxlLnN0cm9rZT14LmNvbG9yKTtcblx0XHR4LndpZHRoIT11bmRlZmluZWQgJiYgKHRoaXMucGF0aFN0eWxlLnN0cm9rZVdpZHRoPXgud2lkdGgrJ3B4Jyk7XG5cdFx0XG5cdFx0c3dpdGNoKHguY2FwKXtcblx0XHRjYXNlICdybmQnOlxuXHRcdFx0dGhpcy5wYXRoU3R5bGUuc3Ryb2tlTGluZWNhcD0ncm91bmQnXG5cdFx0XHRicmVha1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRcblx0XHR9XG5cdFx0XG5cdFx0aWYoeC5kYXNoKXtcblx0XHRcdHN3aXRjaCh0aGlzLmxpbmVTdHlsZSh4LmRhc2gpKXtcblx0XHRcdGNhc2UgJ2RvdHRlZCc6XG5cdFx0XHRcdHRoaXMucGF0aFN0eWxlLnN0cm9rZURhc2hhcnJheT1cIjUsNVwiXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAnZGFzaGVkJzpcblx0XHRcdFx0dGhpcy5wYXRoU3R5bGUuc3Ryb2tlRGFzaGFycmF5PVwiMTAsMTBcIlxuXHRcdFx0YnJlYWtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0c29saWRGaWxsKHgpe1xuXHRcdHRoaXMucGF0aFN0eWxlLmZpbGw9eFxuXHRcdHRoaXMucGF0aFN0eWxlLmZpbGxPcGFjaXR5PTFcblx0fVxuXHRncmFkRmlsbCh4KXtcblx0XHRpZih0aGlzLnN0eWxlLmJhY2tncm91bmRJbWFnZSlcblx0XHRcdHJldHVyblxuXHRcdFx0XG5cdFx0dmFyIGdyYWQ9W11cblx0XHRzd2l0Y2goeC5wYXRoKXtcblx0XHRjYXNlICdsaW5lYXInOlxuXHRcdFx0Z3JhZC5wdXNoKCc8bGluZWFyR3JhZGllbnQgaWQ9XCJncmFkXCInKVxuXHRcdFx0c3dpdGNoKHguYW5nZWwpe1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRncmFkLnB1c2goJ3gxPVwiMCVcIiB5MT1cIjAlXCIgeDI9XCIxMDAlXCIgeTI9XCIwJVwiPicpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlIDkwOlxuXHRcdFx0XHRncmFkLnB1c2goJ3gxPVwiMCVcIiB5MT1cIjAlXCIgeDI9XCIwJVwiIHkyPVwiMTAwJVwiPicpXG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRjYXNlIDE4MDpcblx0XHRcdFx0Z3JhZC5wdXNoKCd4MT1cIjEwMCVcIiB5MT1cIjAlXCIgeDI9XCIwJVwiIHkyPVwiMCVcIj4nKVxuXHRcdFx0XHRicmVha1xuXHRcdFx0Y2FzZSAyNzA6XG5cdFx0XHRcdGdyYWQucHVzaCgneDE9XCIwJVwiIHkxPVwiMTAwJVwiIHgyPVwiMCVcIiB5Mj1cIjAlXCI+Jylcblx0XHRcdFx0YnJlYWtcblx0XHRcdH1cblx0XHRcdGdyYWQucHVzaCgnPC9saW5lYXJHcmFkaWVudD4nKVxuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdjaXJjbGUnOlxuXHRcdFx0Z3JhZC5wdXNoKCc8cmFkaWFsR3JhZGllbnQgIGlkPVwiZ3JhZFwiJylcblx0XHRcdGdyYWQucHVzaCgnY3g9XCI1MCVcIiBjeT1cIjUwJVwiIHI9XCI1MCVcIiBmeD1cIjUwJVwiIGZ5PVwiNTAlXCI+Jylcblx0XHRcdGdyYWQucHVzaCgnPC9yYWRpYWxHcmFkaWVudD4nKVxuXHRcdFx0YnJlYWtcblx0XHR9XG5cdFx0dmFyIGVuZD1ncmFkLnBvcCgpXG5cdFx0Zm9yKHZhciBpPTAsbGVuPXguc3RvcHMubGVuZ3RoLGE7aTxsZW47aSsrKVxuXHRcdFx0Z3JhZC5wdXNoKCc8c3RvcCBvZmZzZXQ9XCInKyhhPXguc3RvcHNbaV0pLnBvc2l0aW9uKyclXCIgc3R5bGU9XCJzdG9wLW9wYWNpdHk6MTtzdG9wLWNvbG9yOicrYS5jb2xvcisnXCIvPicpXG5cdFx0Z3JhZC5wdXNoKGVuZClcblx0XHRcblx0XHR0aGlzLnBhdGhTdHlsZS5ncmFkPWdyYWQuam9pbignICcpXG5cdFx0dGhpcy5wYXRoU3R5bGUuZmlsbD0ndXJsKCNncmFkKSdcblx0XHR0aGlzLnBhdGhTdHlsZS5maWxsT3BhY2l0eT0xXG5cdH1cblx0YmxpcEZpbGwoeCl7XG5cdFx0dGhpcy5zdHlsZS5iYWNrZ3JvdW5kPSd1cmwoJyt0aGlzLmRvYy5hc0ltYWdlVVJMKHgpKycpJ1xuXHRcdHRoaXMuc3R5bGUuYmFja2dyb3VuZFNpemU9JzEwMCUgMTAwJSdcblx0XHR0aGlzLm5vRmlsbCgpXG5cdH1cblx0bm9GaWxsKHgpe1xuXHRcdHRoaXMucGF0aFN0eWxlLmZpbGxPcGFjaXR5PTBcblx0fVxuXHRsblJlZih4KXtcblx0XHR0aGlzLmxuKHgpXG5cdH1cblx0ZmlsbFJlZih4KXtcblx0XHRpZih0aGlzLnN0eWxlLmJhY2tncm91bmRJbWFnZSlcblx0XHRcdHJldHVyblxuXHRcdFxuXHRcdGlmKHR5cGVvZih4LnBhdGgpIT0ndW5kZWZpbmVkJylcblx0XHRcdHJldHVybiB0aGlzLmdyYWRGaWxsKHgpO1xuXHRcdFx0XG5cdFx0aWYodHlwZW9mKHgpPT0nc3RyaW5nJylcblx0XHRcdHRoaXMucGF0aFN0eWxlLmZpbGw9eFxuXHRcdGVsc2UgaWYodHlwZW9mKHguY29sb3IpIT0ndW5kZWZpbmVkJylcblx0XHRcdHRoaXMucGF0aFN0eWxlLmZpbGw9eC5jb2xvclxuXHRcdGVsc2Vcblx0XHRcdHJldHVybjtcblx0XHR0aGlzLnBhdGhTdHlsZS5maWxsT3BhY2l0eT0xXG5cdH1cblx0Zm9udFJlZih4KXtcblx0XHR4LmNvbG9yICYmICh0aGlzLnN0eWxlLmNvbG9yPXguY29sb3IpO1xuXHRcdHguZmFtaWx5ICYmICh0aGlzLnN0eWxlLmZvbnRGYW1pbHk9eC5mYW1pbHkpO1xuXHR9XG5cdHBhdGgoeCwgdCl7XG5cdFx0c3dpdGNoKHguc2hhcGUpe1xuXHRcdGNhc2UgJ2xpbmUnOlxuXHRcdFx0dGhpcy5wYXJlbnQucGF0aD0nPGxpbmUgeDE9XCIwXCIgeTE9XCIwXCIgeDI9XCInK3RoaXMud29ybGQud2lkdGgrJ3B0XCIgeTI9XCInK3RoaXMud29ybGQuaGVpZ2h0KydwdFwiJ1xuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdyZWN0Jzpcblx0XHRcdHRoaXMucGFyZW50LnBhdGg9JzxyZWN0IHdpZHRoPVwiJyt0aGlzLndvcmxkLndpZHRoKydwdFwiIGhlaWdodD1cIicrdGhpcy53b3JsZC5oZWlnaHQrJ3B0XCInXG5cdFx0XHRicmVhaztcdFxuXHRcdGNhc2UgJ3JvdW5kUmVjdCc6XG5cdFx0XHR0aGlzLnBhcmVudC5wYXRoPSc8cmVjdCByeD1cIicrKHQ9TWF0aC5taW4odGhpcy53b3JsZC53aWR0aCwgdGhpcy53b3JsZC5oZWlnaHQpLzEyKSsncHRcIiByeT1cIicrdCsncHRcIiB3aWR0aD1cIicrdGhpcy53b3JsZC53aWR0aCsncHRcIiBoZWlnaHQ9XCInK3RoaXMud29ybGQuaGVpZ2h0KydwdFwiJ1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnZWxsaXBzZSc6XG5cdFx0XHR0aGlzLnBhcmVudC5wYXRoPSc8ZWxsaXBzZSBjeD1cIicrdGhpcy53b3JsZC53aWR0aC8yKydwdFwiIGN5PVwiJyt0aGlzLndvcmxkLmhlaWdodC8yKydwdFwiIHJ4PVwiJyt0aGlzLndvcmxkLndpZHRoLzIrJ3B0XCIgcnk9XCInK3RoaXMud29ybGQuaGVpZ2h0LzIrJ3B0XCInXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ3BhdGgnOlxuXHRcdFx0dGhpcy5wYXJlbnQucGF0aD0nPHBhdGggZD1cIicreC5wYXRoKydcIidcblx0XHRcdGlmKCFjbG96ZWQudGVzdCh4LnBhdGgpKVxuXHRcdFx0XHR0aGlzLm5vRmlsbCgpXG5cdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXHRzcEF1dG9GaXQoKXtcblx0XHR0aGlzLnN0eWxlLmhlaWdodD0nYXV0bydcblx0fVxuXHRsSW5zKHgpe1xuXHRcdHRoaXMuc3R5bGUucGFkZGluZ0xlZnQ9eCsncHgnXG5cdH1cblx0dElucyh4KXtcblx0XHR0aGlzLnN0eWxlLnBhZGRpbmdUb3A9eCsncHgnXG5cdH1cblx0cklucyh4KXtcblx0XHR0aGlzLnN0eWxlLnBhZGRpbmdSaWdodD14KydweCdcblx0fVxuXHRiSW5zKHgpe1xuXHRcdHRoaXMuc3R5bGUucGFkZGluZ0JvdHRvbT14KydweCdcblx0fVxuXHRhbmNob3IoeCl7XG5cdFx0dGhpcy5zdHlsZS5kaXNwbGF5PSd0YWJsZS1jZWxsJ1xuXHRcdHRoaXMuc3R5bGUudmVydGljYWxBbGlnbj14XG5cdH1cblx0dmVydCh4KXtcblx0XHR0aGlzLnN0eWxlLmhlaWdodD10aGlzLndvcmxkLndpZHRoKydweCdcblx0XHR0aGlzLnN0eWxlLndpZHRoPXRoaXMud29ybGQuaGVpZ2h0KydweCdcblx0XHR2YXIgZGVsdGE9KHRoaXMud29ybGQud2lkdGgtdGhpcy53b3JsZC5oZWlnaHQpLzJcblx0XHRcdFx0XHRcdFxuXHRcdHRoaXMuYmdTdHlsZS5oZWlnaHQ9dGhpcy53b3JsZC5oZWlnaHQrJ3B4J1xuXHRcdHRoaXMuYmdTdHlsZS53aWR0aD10aGlzLndvcmxkLndpZHRoKydweCdcblx0XHR0aGlzLnN0eWxlc3MoJ3RyYW5zZm9ybScsJ3RyYW5zbGF0ZSgtJytkZWx0YSsncHQsJytkZWx0YSsncHQpIHJvdGF0ZSgtJyt4KydkZWcpICcsIHRoaXMuYmdTdHlsZSlcblxuXHRcdHRoaXMuc3R5bGVzcygndHJhbnNmb3JtJywndHJhbnNsYXRlKCcrZGVsdGErJ3B0LC0nK2RlbHRhKydwdCkgcm90YXRlKCcrKHgrdGhpcy53b3JsZC5yb3RhdGlvbnx8MCkrJ2RlZyknKVxuXHR9XG59Il19