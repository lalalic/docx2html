'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

var _jszip = require('jszip');

var _jszip2 = _interopRequireDefault(_jszip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createDocument, CSSStyleDeclaration;

var Document = function (_Converter) {
	_inherits(Document, _Converter);

	function Document() {
		_classCallCheck(this, Document);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Document).apply(this, arguments));
	}

	_createClass(Document, [{
		key: 'convert',
		value: function convert() {
			this.doc = this.constructor.create(this.options);
			this.content = this.doc;
			var contentStyle = this.content.style;
			contentStyle.backgroundColor = 'transparent';
			contentStyle.minHeight = '1000px';
			contentStyle.width = '100%';
			contentStyle.paddingTop = '20px';
			contentStyle.overflow = 'auto';

			var style = this.doc.createStyle('*');
			style.margin = '0';
			style.border = '0';
			style.padding = '0';
			style.boxSizing = 'border-box';

			style = this.doc.createStyle('table');
			style.width = '100%';
			style.borderCollapse = 'collapse';
			style.wordBreak = 'break-word';

			style = this.doc.createStyle('section');
			style.margin = 'auto';
			style.backgroundColor = 'white';
			style.color = 'black';
			style.position = 'relative';
			style.zIndex = 0;

			style = this.doc.createStyle('p:empty:before');
			style.content = '""';
			style.display = 'inline-block';

			style = this.doc.createStyle('ul');
			style.listStyle = "none";

			style = this.doc.createStyle('ul>li>p');
			style.position = 'relative';

			style = this.doc.createStyle('ul .marker');
			style.position = 'absolute';

			style = this.doc.createStyle('a');
			style.textDecoration = 'none';

			style = this.doc.createStyle('.unsupported');
			style.outline = "2px red solid";

			style = this.doc.createStyle('.warning');
			style.outline = "1px yellow solid";
		}
		/**
  * opt: {
  * 	template: function(style, html, props){ return (html)},
  	extendScript: "http://a.com/a.js"
  	}
  */

	}, {
		key: 'toString',
		value: function toString(opt) {
			return this.doc.toString(opt, this.props);
		}
	}, {
		key: 'release',
		value: function release() {
			this.doc.release();
		}
	}, {
		key: 'asZip',
		value: function asZip(opt) {
			return this.doc.asZip(opt, this.props);
		}
	}, {
		key: 'download',
		value: function download(opt) {
			return this.doc.download(opt, this.props);
		}
		/**
  * opt=extend(toString.opt,{
  	saveImage: function(arrayBuffer, doc.props): promise(url) {},
  	saveHtml: function(){}
  })
  */

	}, {
		key: 'save',
		value: function save(opt) {
			return this.doc.save(opt, this.props);
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'html';
		}
	}], [{
		key: 'create',
		value: function create(opt) {
			var selfConverter = this;
			return function (document) {
				var doc = function browserDoc() {
					var _uid = 0;
					var root = Object.assign(document.createElement('div'), {
						id: "A",
						section: null,
						createElement: document.createElement.bind(document),
						createTextNode: document.createTextNode.bind(document),
						createStyleSheet: function createStyleSheet() {
							if (this.stylesheet) return this.stylesheet;
							var elStyle = this.createElement('style');
							this.body.appendChild(elStyle, null);
							return this.stylesheet = elStyle.sheet;
						},
						getStyleText: function getStyleText() {
							var styles = [];
							for (var i = 0, rules = this.stylesheet.cssRules, len = rules.length; i < len; i++) {
								styles.push(rules[i].cssText);
							}return styles.join('\r\n');
						},
						uid: function uid() {
							return this.id + _uid++;
						},
						toString: function toString(opt, props) {
							if (opt && typeof opt.template != "undefined" && $.isFunction(opt.template)) return opt.template(this.getStyleText(), this._html(), props);
							var html = ['<!doctype html>\r\n<html><head><meta charset=utf-8><meta key="generator" value="docx2html"><title>' + (props.name || '') + '</title><style>'];
							html.push(this.getStyleText());
							html.push('</style></head><body>');
							html.push(this._html());
							opt && opt.extendScript && html.push('<script src="' + opt.extendScript + '"></script>');
							html.push('</body><html>');
							return html.join('\r\n');
						},
						_html: function _html() {
							var divs = this.querySelectorAll('p>div, span>div');
							if (divs.length == 0) return this.outerHTML;

							/**
       * illegal <p> <div/> </p>
       * DOM operation directly in onload
       */
							var divcontainer = doc.createElement('div'),
							    uid = 0;
							divcontainer.id = 'divcontainer';
							divcontainer.style.display = "none";
							this.appendChild(divcontainer);
							for (var i = divs.length - 1; i > -1; i--) {
								var div = divs[i],
								    parent = div.parentNode;

								if (!div.id) div.id = '_z' + ++uid;

								if (!parent.id) parent.id = '_y' + uid;

								div.setAttribute('data-parent', parent.id);
								div.setAttribute('data-index', indexOf(div, parent.childNodes));

								divcontainer.appendChild(divs[i]);
							}

							var html = this.outerHTML + '\n\r<script>(' + this._transformer.toString() + ')();</script>';
							this._transformer();
							return html;
						},
						_transformer: function _transformer() {
							var a = document.querySelector('#divcontainer');
							for (var divs = a.childNodes, i = divs.length - 1; i > -1; i--) {
								var div = divs[i],
								    parentId = div.getAttribute('data-parent'),
								    index = parseInt(div.getAttribute('data-index')),
								    parent = document.querySelector('#' + parentId);
								parent.insertBefore(div, parent.childNodes[index]);
							}
							a.parentNode.removeChild(a);
						}
					});

					function indexOf(el, els) {
						for (var i = els.length - 1; i > 0; i--) {
							if (el == els[i]) return i;
						}return 0;
					}

					(opt && opt.container || document.body).appendChild(root);
					root.body = root;
					return root;
				}();

				return function mixin(doc) {
					var stylesheet = doc.createStyleSheet();
					var relStyles = {},
					    styles = {};

					return Object.assign(selfConverter[$.isNode ? 'nodefy' : 'browserify'](doc, stylesheet, opt), {
						createStyle: function createStyle(selector) {
							if (styles[selector]) return styles[selector];
							var rules = stylesheet.cssRules,
							    len = rules.length;
							stylesheet.insertRule(selector.split(',').map(function (a) {
								return a.trim()[0] == '#' ? a : '#' + this.id + ' ' + a;
							}.bind(this)).join(',') + '{}', len);
							return styles[selector] = stylesheet.cssRules[len].style;
						},
						stylePath: function stylePath(a, parent) {
							if (parent) return relStyles[a] = parent;
							var paths = [a],
							    parent = a;
							while (parent = relStyles[parent]) {
								paths.unshift(parent);
							}return paths.join(' ');
						},
						release: function release() {
							delete this.section;
							this._release();
						}
					});
				}(doc);
			}($.isNode ? createDocument() : document);
		}
	}, {
		key: 'nodefy',
		value: function nodefy(doc, stylesheet, opt) {
			return Object.assign(doc, {
				_release: function _release() {},
				asImageURL: function asImageURL(buffer) {
					if (opt && typeof opt.asImageURL != 'undefined') return opt.asImageURL(buffer);
					return "image://notsupport";
				},
				asZip: function asZip() {
					throw new Error('not support');
				},
				download: function download() {
					throw new Error('not support');
				},
				save: function save() {
					throw new Error('not support');
				}
			});
		}
	}, {
		key: 'browserify',
		value: function browserify(doc, stylesheet, opt) {
			var Proto_Blob = function (a) {
				a = URL.createObjectURL(new Blob()).split('/');
				a.pop();
				return a.join('/');
			}(),
			    Reg_Proto_Blob = new RegExp(Proto_Blob + "/([\\w\\d-]+)", "gi");

			return Object.assign(doc, {
				asZip: function asZip(opt, props) {
					var zip = new _jszip2.default(),
					    hasImage = false;
					var f = zip.folder('images');
					Object.keys(this.images).forEach(function (a) {
						hasImage = true;
						f.file(a.split('/').pop(), this[a]);
					}, this.images);
					zip.file('props.json', JSON.stringify(props));
					zip.file('main.html', hasImage ? this.toString(opt).replace(Proto_Blob, 'images') : this.toString());
					return zip;
				},
				download: function download(opt, props) {
					var a = document.createElement("a");
					document.body.appendChild(a);
					a.href = URL.createObjectURL(this.asZip(opt, props).generate({ type: 'blob' }));
					a.download = (props.name || "document") + '.zip';
					a.click();
					URL.revokeObjectURL(a.href);
					document.body.removeChild(a);
				},
				save: function save(opt, props) {
					var hasImage = false,
					    images = {},
					    me = this;
					return $.Deferred.when((this.images && Object.keys(this.images) || []).map(function (a) {
						hasImage = true;
						return opt.saveImage(this[a], props).then(function (url) {
							return images[a] = url;
						});
					}, this.images)).then(function () {
						var html = me.toString(opt, props);
						if (hasImage) html = html.replace(Reg_Proto_Blob, function (a, id) {
							return images[a];
						});
						return opt.saveHtml(html, props);
					});
				},

				images: {},
				asImageURL: function asImageURL(arrayBuffer) {
					var url = URL.createObjectURL(new Blob([arrayBuffer], { type: "image/" + (typeof arrayBuffer == 'string' ? 'svg+xml' : '*') }));
					this.images[url] = arrayBuffer;
					return url;
				},
				_release: function _release() {
					Object.keys(this.images).forEach(function (b) {
						URL.revokeObjectURL(b);
					});
					delete this.images;
				}
			});
		}
	}]);

	return Document;
}(_converter2.default);

exports.default = Document;


(function (isNode, m) {
	if (!isNode) return;

	createDocument = require(m).jsdom;
	var window = createDocument().defaultView;

	global.btoa = window.btoa;
	CSSStyleDeclaration = window.CSSStyleDeclaration;
})($.isNode, "jsdom");
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLGNBQUosRUFBb0IsbUJBQXBCOztJQUVxQjs7Ozs7Ozs7Ozs7NEJBR1g7QUFDUixRQUFLLEdBQUwsR0FBUyxLQUFLLFdBQUwsQ0FBaUIsTUFBakIsQ0FBd0IsS0FBSyxPQUFMLENBQWpDLENBRFE7QUFFUixRQUFLLE9BQUwsR0FBYSxLQUFLLEdBQUwsQ0FGTDtBQUdSLE9BQUksZUFBYSxLQUFLLE9BQUwsQ0FBYSxLQUFiLENBSFQ7QUFJUixnQkFBYSxlQUFiLEdBQTZCLGFBQTdCLENBSlE7QUFLUixnQkFBYSxTQUFiLEdBQXVCLFFBQXZCLENBTFE7QUFNUixnQkFBYSxLQUFiLEdBQW1CLE1BQW5CLENBTlE7QUFPUixnQkFBYSxVQUFiLEdBQXdCLE1BQXhCLENBUFE7QUFRUixnQkFBYSxRQUFiLEdBQXNCLE1BQXRCLENBUlE7O0FBVVIsT0FBSSxRQUFNLEtBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsR0FBckIsQ0FBTixDQVZJO0FBV1IsU0FBTSxNQUFOLEdBQWEsR0FBYixDQVhRO0FBWVIsU0FBTSxNQUFOLEdBQWEsR0FBYixDQVpRO0FBYVIsU0FBTSxPQUFOLEdBQWMsR0FBZCxDQWJRO0FBY1IsU0FBTSxTQUFOLEdBQWdCLFlBQWhCLENBZFE7O0FBZ0JSLFdBQU0sS0FBSyxHQUFMLENBQVMsV0FBVCxDQUFxQixPQUFyQixDQUFOLENBaEJRO0FBaUJSLFNBQU0sS0FBTixHQUFZLE1BQVosQ0FqQlE7QUFrQlIsU0FBTSxjQUFOLEdBQXFCLFVBQXJCLENBbEJRO0FBbUJSLFNBQU0sU0FBTixHQUFnQixZQUFoQixDQW5CUTs7QUFxQlIsV0FBTSxLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLFNBQXJCLENBQU4sQ0FyQlE7QUFzQlIsU0FBTSxNQUFOLEdBQWEsTUFBYixDQXRCUTtB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O1FBck9uQjs7Ozs7O0FBaVNyQixDQUFDLFVBQVMsTUFBVCxFQUFpQixDQUFqQixFQUFtQjtBQUNuQixLQUFHLENBQUMsTUFBRCxFQUFTLE9BQVo7O0FBRUEsa0JBQWUsUUFBUSxDQUFSLEVBQVcsS0FBWCxDQUhJO0FBSW5CLEtBQUksU0FBTyxpQkFBaUIsV0FBakIsQ0FKUTs7QUFNbkIsUUFBTyxJQUFQLEdBQVksT0FBTyxJQUFQLENBTk87QUFPbkIsdUJBQW9CLE9BQU8sbUJBQVAsQ0FQRDtDQUFuQixDQUFELENBUUcsRUFBRSxNQUFGLEVBQVUsT0FSYiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi9jb252ZXJ0ZXInXG5pbXBvcnQgSlNaaXAgZnJvbSAnanN6aXAnXG5cbnZhciBjcmVhdGVEb2N1bWVudCwgQ1NTU3R5bGVEZWNsYXJhdGlvblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIENvbnZlcnRlcntcblx0Z2V0IHRhZygpe3JldHVybiAnaHRtbCd9XG5cblx0Y29udmVydCgpe1xuXHRcdHRoaXMuZG9jPXRoaXMuY29uc3RydWN0b3IuY3JlYXRlKHRoaXMub3B0aW9ucylcblx0XHR0aGlzLmNvbnRlbnQ9dGhpcy5kb2Ncblx0XHRsZXQgY29udGVudFN0eWxlPXRoaXMuY29udGVudC5zdHlsZVxuXHRcdGNvbnRlbnRTdHlsZS5iYWNrZ3JvdW5kQ29sb3I9J3RyYW5zcGFyZW50J1xuXHRcdGNvbnRlbnRTdHlsZS5taW5IZWlnaHQ9JzEwMDBweCdcblx0XHRjb250ZW50U3R5bGUud2lkdGg9JzEwMCUnXG5cdFx0Y29udGVudFN0eWxlLnBhZGRpbmdUb3A9JzIwcHgnXG5cdFx0Y29udGVudFN0eWxlLm92ZXJmbG93PSdhdXRvJ1xuXG5cdFx0dmFyIHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCcqJylcblx0XHRzdHlsZS5tYXJnaW49JzAnXG5cdFx0c3R5bGUuYm9yZGVyPScwJ1xuXHRcdHN0eWxlLnBhZGRpbmc9JzAnXG5cdFx0c3R5bGUuYm94U2l6aW5nPSdib3JkZXItYm94J1xuXG5cdFx0c3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3RhYmxlJylcblx0XHRzdHlsZS53aWR0aD0nMTAwJSdcblx0XHRzdHlsZS5ib3JkZXJDb2xsYXBzZT0nY29sbGFwc2UnXG5cdFx0c3R5bGUud29yZEJyZWFrPSdicmVhay13b3JkJ1xuXG5cdFx0c3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3NlY3Rpb24nKVxuXHRcdHN0eWxlLm1hcmdpbj0nYXV0bydcblx0XHRzdHlsZS5iYWNrZ3JvdW5kQ29sb3I9J3doaXRlJ1xuXHRcdHN0eWxlLmNvbG9yPSdibGFjaydcblx0XHRzdHlsZS5wb3NpdGlvbj0ncmVsYXRpdmUnXG5cdFx0c3R5bGUuekluZGV4PTBcblxuXHRcdHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCdwOmVtcHR5OmJlZm9yZScpXG5cdFx0c3R5bGUuY29udGVudD0nXCJcIidcblx0XHRzdHlsZS5kaXNwbGF5PSdpbmxpbmUtYmxvY2snXG5cblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgndWwnKVxuXHRcdHN0eWxlLmxpc3RTdHlsZT1cIm5vbmVcIlxuXG5cdFx0c3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3VsPmxpPnAnKVxuXHRcdHN0eWxlLnBvc2l0aW9uPSdyZWxhdGl2ZSdcblxuXHRcdHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCd1bCAubWFya2VyJylcblx0XHRzdHlsZS5wb3NpdGlvbj0nYWJzb2x1dGUnXG5cblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnYScpXG5cdFx0c3R5bGUudGV4dERlY29yYXRpb249J25vbmUnXG5cblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnLnVuc3VwcG9ydGVkJylcblx0XHRzdHlsZS5vdXRsaW5lPVwiMnB4IHJlZCBzb2xpZFwiXG5cblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnLndhcm5pbmcnKVxuXHRcdHN0eWxlLm91dGxpbmU9XCIxcHggeWVsbG93IHNvbGlkXCJcblx0fVxuXHQvKipcblx0KiBvcHQ6IHtcblx0KiBcdHRlbXBsYXRlOiBmdW5jdGlvbihzdHlsZSwgaHRtbCwgcHJvcHMpeyByZXR1cm4gKGh0bWwpfSxcblx0XHRleHRlbmRTY3JpcHQ6IFwiaHR0cDovL2EuY29tL2EuanNcIlxuXHRcdH1cblx0Ki9cblx0dG9TdHJpbmcob3B0KXtcblx0XHRyZXR1cm4gdGhpcy5kb2MudG9TdHJpbmcob3B0LHRoaXMucHJvcHMpXG5cdH1cblx0cmVsZWFzZSgpe1xuXHRcdHRoaXMuZG9jLnJlbGVhc2UoKVxuXHR9XG5cdGFzWmlwKG9wdCl7XG5cdFx0cmV0dXJuIHRoaXMuZG9jLmFzWmlwKG9wdCx0aGlzLnByb3BzKVxuXHR9XG5cdGRvd25sb2FkKG9wdCl7XG5cdFx0cmV0dXJuIHRoaXMuZG9jLmRvd25sb2FkKG9wdCwgdGhpcy5wcm9wcylcblx0fVxuXHQvKipcblx0KiBvcHQ9ZXh0ZW5kKHRvU3RyaW5nLm9wdCx7XG5cdFx0c2F2ZUltYWdlOiBmdW5jdGlvbihhcnJheUJ1ZmZlciwgZG9jLnByb3BzKTogcHJvbWlzZSh1cmwpIHt9LFxuXHRcdHNhdmVIdG1sOiBmdW5jdGlvbigpe31cblx0fSlcblx0Ki9cblx0c2F2ZSAob3B0KXtcblx0XHRyZXR1cm4gdGhpcy5kb2Muc2F2ZShvcHQsIHRoaXMucHJvcHMpXG5cdH1cblxuXHRzdGF0aWMgY3JlYXRlKG9wdCl7XG5cdFx0dmFyIHNlbGZDb252ZXJ0ZXI9dGhpc1xuXHRcdHJldHVybiAoZnVuY3Rpb24oZG9jdW1lbnQpe1xuXHRcdFx0dmFyIGRvYz0oZnVuY3Rpb24gYnJvd3NlckRvYygpe1xuXHRcdFx0XHR2YXIgdWlkPTA7XG5cdFx0XHRcdHZhciByb290PU9iamVjdC5hc3NpZ24oZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jykse1xuXHRcdFx0XHRcdGlkIDogXCJBXCIsXG5cdFx0XHRcdFx0c2VjdGlvbjogbnVsbCxcblx0XHRcdFx0XHRjcmVhdGVFbGVtZW50OiBkb2N1bWVudC5jcmVhdGVFbGVtZW50LmJpbmQoZG9jdW1lbnQpLFxuXHRcdFx0XHRcdGNyZWF0ZVRleHROb2RlOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZS5iaW5kKGRvY3VtZW50KSxcblx0XHRcdFx0XHRjcmVhdGVTdHlsZVNoZWV0KCl7XG5cdFx0XHRcdFx0XHRpZih0aGlzLnN0eWxlc2hlZXQpXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnN0eWxlc2hlZXQ7XG5cdFx0XHRcdFx0XHR2YXIgZWxTdHlsZT10aGlzLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcblx0XHRcdFx0XHRcdHRoaXMuYm9keS5hcHBlbmRDaGlsZChlbFN0eWxlLG51bGwpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc3R5bGVzaGVldD1lbFN0eWxlLnNoZWV0XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRnZXRTdHlsZVRleHQoKXtcblx0XHRcdFx0XHRcdHZhciBzdHlsZXM9W11cblx0XHRcdFx0XHRcdGZvcih2YXIgaT0wLCBydWxlcz10aGlzLnN0eWxlc2hlZXQuY3NzUnVsZXMsIGxlbj1ydWxlcy5sZW5ndGg7aTxsZW47aSsrKVxuXHRcdFx0XHRcdFx0XHRzdHlsZXMucHVzaChydWxlc1tpXS5jc3NUZXh0KVxuXHRcdFx0XHRcdFx0cmV0dXJuIHN0eWxlcy5qb2luKCdcXHJcXG4nKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0dWlkKCl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5pZCsodWlkKyspXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR0b1N0cmluZyhvcHQsIHByb3BzKXtcblx0XHRcdFx0XHRcdGlmKG9wdCAmJiB0eXBlb2Ygb3B0LnRlbXBsYXRlIT1cInVuZGVmaW5lZFwiICYmICQuaXNGdW5jdGlvbihvcHQudGVtcGxhdGUpKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gb3B0LnRlbXBsYXRlKHRoaXMuZ2V0U3R5bGVUZXh0KCksIHRoaXMuX2h0bWwoKSwgcHJvcHMpXG5cdFx0XHRcdFx0XHR2YXIgaHRtbD1bJzwhZG9jdHlwZSBodG1sPlxcclxcbjxodG1sPjxoZWFkPjxtZXRhIGNoYXJzZXQ9dXRmLTg+PG1ldGEga2V5PVwiZ2VuZXJhdG9yXCIgdmFsdWU9XCJkb2N4Mmh0bWxcIj48dGl0bGU+JysocHJvcHMubmFtZXx8JycpKyc8L3RpdGxlPjxzdHlsZT4nXVxuXHRcdFx0XHRcdFx0aHRtbC5wdXNoKHRoaXMuZ2V0U3R5bGVUZXh0KCkpXG5cdFx0XHRcdFx0XHRodG1sLnB1c2goJzwvc3R5bGU+PC9oZWFkPjxib2R5PicpXG5cdFx0XHRcdFx0XHRodG1sLnB1c2godGhpcy5faHRtbCgpKVxuXHRcdFx0XHRcdFx0b3B0ICYmIG9wdC5leHRlbmRTY3JpcHQgJiYgaHRtbC5wdXNoKCc8c2NyaXB0IHNyYz1cIicrb3B0LmV4dGVuZFNjcmlwdCsnXCI+PC9zY3JpcHQ+Jylcblx0XHRcdFx0XHRcdGh0bWwucHVzaCgnPC9ib2R5PjxodG1sPicpXG5cdFx0XHRcdFx0XHRyZXR1cm4gaHRtbC5qb2luKCdcXHJcXG4nKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0X2h0bWwoKXtcblx0XHRcdFx0XHRcdHZhciBkaXZzPXRoaXMucXVlcnlTZWxlY3RvckFsbCgncD5kaXYsIHNwYW4+ZGl2Jylcblx0XHRcdFx0XHRcdGlmKGRpdnMubGVuZ3RoPT0wKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vdXRlckhUTUxcblxuXHRcdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0XHQqIGlsbGVnYWwgPHA+IDxkaXYvPiA8L3A+XG5cdFx0XHRcdFx0XHQqIERPTSBvcGVyYXRpb24gZGlyZWN0bHkgaW4gb25sb2FkXG5cdFx0XHRcdFx0XHQqL1xuXHRcdFx0XHRcdFx0dmFyIGRpdmNvbnRhaW5lcj1kb2MuY3JlYXRlRWxlbWVudCgnZGl2JyksIHVpZD0wXG5cdFx0XHRcdFx0XHRkaXZjb250YWluZXIuaWQ9J2RpdmNvbnRhaW5lcidcblx0XHRcdFx0XHRcdGRpdmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5PVwibm9uZVwiXG5cdFx0XHRcdFx0XHR0aGlzLmFwcGVuZENoaWxkKGRpdmNvbnRhaW5lcilcblx0XHRcdFx0XHRcdGZvcih2YXIgaT1kaXZzLmxlbmd0aC0xO2k+LTE7aS0tKXtcblx0XHRcdFx0XHRcdFx0dmFyIGRpdj1kaXZzW2ldLFxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudD1kaXYucGFyZW50Tm9kZTtcblxuXHRcdFx0XHRcdFx0XHRpZighZGl2LmlkKVxuXHRcdFx0XHRcdFx0XHRcdGRpdi5pZD0nX3onKygrK3VpZClcblxuXHRcdFx0XHRcdFx0XHRpZighcGFyZW50LmlkKVxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudC5pZD0nX3knK3VpZFxuXG5cdFx0XHRcdFx0XHRcdGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50JyxwYXJlbnQuaWQpXG5cdFx0XHRcdFx0XHRcdGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLGluZGV4T2YoZGl2LHBhcmVudC5jaGlsZE5vZGVzKSlcblxuXHRcdFx0XHRcdFx0XHRkaXZjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2c1tpXSlcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIGh0bWw9dGhpcy5vdXRlckhUTUwrJ1xcblxccjxzY3JpcHQ+KCcrdGhpcy5fdHJhbnNmb3JtZXIudG9TdHJpbmcoKSsnKSgpOzwvc2NyaXB0Pidcblx0XHRcdFx0XHRcdHRoaXMuX3RyYW5zZm9ybWVyKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaHRtbFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0X3RyYW5zZm9ybWVyKCl7XG5cdFx0XHRcdFx0XHR2YXIgYT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGl2Y29udGFpbmVyJylcblx0XHRcdFx0XHRcdGZvcih2YXIgZGl2cz1hLmNoaWxkTm9kZXMsIGk9ZGl2cy5sZW5ndGgtMTtpPi0xO2ktLSl7XG5cdFx0XHRcdFx0XHRcdHZhciBkaXY9ZGl2c1tpXSxcblx0XHRcdFx0XHRcdFx0XHRwYXJlbnRJZD1kaXYuZ2V0QXR0cmlidXRlKCdkYXRhLXBhcmVudCcpLFxuXHRcdFx0XHRcdFx0XHRcdGluZGV4PXBhcnNlSW50KGRpdi5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSksXG5cdFx0XHRcdFx0XHRcdFx0cGFyZW50PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnK3BhcmVudElkKTtcblx0XHRcdFx0XHRcdFx0cGFyZW50Lmluc2VydEJlZm9yZShkaXYscGFyZW50LmNoaWxkTm9kZXNbaW5kZXhdKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGEpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRmdW5jdGlvbiBpbmRleE9mKGVsLCBlbHMpe1xuXHRcdFx0XHRcdGZvcih2YXIgaT1lbHMubGVuZ3RoLTE7aT4wO2ktLSlcblx0XHRcdFx0XHRcdGlmKGVsPT1lbHNbaV0pXG5cdFx0XHRcdFx0XHRcdHJldHVybiBpXG5cdFx0XHRcdFx0cmV0dXJuIDBcblx0XHRcdFx0fVxuXG5cdFx0XHRcdChvcHQgJiYgb3B0LmNvbnRhaW5lciB8fCBkb2N1bWVudC5ib2R5KS5hcHBlbmRDaGlsZChyb290KTtcblx0XHRcdFx0cm9vdC5ib2R5PXJvb3Rcblx0XHRcdFx0cmV0dXJuIHJvb3Rcblx0XHRcdH0pKCk7XG5cblx0XHRcdHJldHVybiAoZnVuY3Rpb24gbWl4aW4oZG9jKXtcblx0XHRcdFx0dmFyIHN0eWxlc2hlZXQ9ZG9jLmNyZWF0ZVN0eWxlU2hlZXQoKVxuXHRcdFx0XHR2YXIgcmVsU3R5bGVzPXt9LCBzdHlsZXM9e31cblxuXHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzZWxmQ29udmVydGVyWyQuaXNOb2RlID8gJ25vZGVmeScgOiAnYnJvd3NlcmlmeSddKGRvYyxzdHlsZXNoZWV0LCBvcHQpLHtcblx0XHRcdFx0XHRjcmVhdGVTdHlsZShzZWxlY3Rvcil7XG5cdFx0XHRcdFx0XHRpZihzdHlsZXNbc2VsZWN0b3JdKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gc3R5bGVzW3NlbGVjdG9yXVxuXHRcdFx0XHRcdFx0dmFyIHJ1bGVzPXN0eWxlc2hlZXQuY3NzUnVsZXMsbGVuPXJ1bGVzLmxlbmd0aFxuXHRcdFx0XHRcdFx0c3R5bGVzaGVldC5pbnNlcnRSdWxlKHNlbGVjdG9yLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uKGEpe1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBhLnRyaW0oKVswXT09JyMnID8gYSA6ICcjJyt0aGlzLmlkKycgJythXG5cdFx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSkuam9pbignLCcpKyd7fScsbGVuKVxuXHRcdFx0XHRcdFx0cmV0dXJuICBzdHlsZXNbc2VsZWN0b3JdPXN0eWxlc2hlZXQuY3NzUnVsZXNbbGVuXS5zdHlsZVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c3R5bGVQYXRoKGEsIHBhcmVudCl7XG5cdFx0XHRcdFx0XHRpZihwYXJlbnQpXG5cdFx0XHRcdFx0XHRcdHJldHVybiByZWxTdHlsZXNbYV09cGFyZW50XG5cdFx0XHRcdFx0XHR2YXIgcGF0aHM9W2FdLHBhcmVudD1hXG5cdFx0XHRcdFx0XHR3aGlsZShwYXJlbnQ9cmVsU3R5bGVzW3BhcmVudF0pXG5cdFx0XHRcdFx0XHRcdHBhdGhzLnVuc2hpZnQocGFyZW50KVxuXHRcdFx0XHRcdFx0cmV0dXJuIHBhdGhzLmpvaW4oJyAnKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cmVsZWFzZSgpe1xuXHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXMuc2VjdGlvblxuXHRcdFx0XHRcdFx0dGhpcy5fcmVsZWFzZSgpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fSkoZG9jKVxuXHRcdH0pKCQuaXNOb2RlID8gY3JlYXRlRG9jdW1lbnQoKSA6IGRvY3VtZW50KVxuXHR9XG5cblx0c3RhdGljIG5vZGVmeShkb2MsIHN0eWxlc2hlZXQsIG9wdCl7XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oZG9jLHtcblx0XHRcdF9yZWxlYXNlKCl7XG5cblx0XHRcdH0sXG5cdFx0XHRhc0ltYWdlVVJMKGJ1ZmZlcil7XG5cdFx0XHRcdGlmKG9wdCAmJiB0eXBlb2Yob3B0LmFzSW1hZ2VVUkwpIT0ndW5kZWZpbmVkJylcblx0XHRcdFx0XHRyZXR1cm4gb3B0LmFzSW1hZ2VVUkwoYnVmZmVyKVxuXHRcdFx0XHRyZXR1cm4gXCJpbWFnZTovL25vdHN1cHBvcnRcIlxuXHRcdFx0fSxcblx0XHRcdGFzWmlwKCl7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnQnKVxuXHRcdFx0fSxcblx0XHRcdGRvd25sb2FkKCl7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnQnKVxuXHRcdFx0fSxcblx0XHRcdHNhdmUoKXtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCcpXG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG5cdHN0YXRpYyBicm93c2VyaWZ5KGRvYywgc3R5bGVzaGVldCwgb3B0KXtcblx0XHR2YXIgUHJvdG9fQmxvYj0oZnVuY3Rpb24oYSl7XG5cdFx0XHRcdGE9VVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYigpKS5zcGxpdCgnLycpO1xuXHRcdFx0XHRhLnBvcCgpO1xuXHRcdFx0XHRyZXR1cm4gYS5qb2luKCcvJylcblx0XHRcdH0pKCksXG5cdFx0XHRSZWdfUHJvdG9fQmxvYj1uZXcgUmVnRXhwKFByb3RvX0Jsb2IrXCIvKFtcXFxcd1xcXFxkLV0rKVwiLFwiZ2lcIik7XG5cblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihkb2Mse1xuXHRcdFx0YXNaaXAob3B0LCBwcm9wcyl7XG5cdFx0XHRcdHZhciB6aXA9bmV3IEpTWmlwKCksaGFzSW1hZ2U9ZmFsc2U7XG5cdFx0XHRcdHZhciBmPXppcC5mb2xkZXIoJ2ltYWdlcycpXG5cdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMuaW1hZ2VzKS5mb3JFYWNoKGZ1bmN0aW9uKGEpe1xuXHRcdFx0XHRcdGhhc0ltYWdlPXRydWVcblx0XHRcdFx0XHRmLmZpbGUoYS5zcGxpdCgnLycpLnBvcCgpLHRoaXNbYV0pXG5cdFx0XHRcdH0sdGhpcy5pbWFnZXMpXG5cdFx0XHRcdHppcC5maWxlKCdwcm9wcy5qc29uJyxKU09OLnN0cmluZ2lmeShwcm9wcykpO1xuXHRcdFx0XHR6aXAuZmlsZSgnbWFpbi5odG1sJyxoYXNJbWFnZSA/IHRoaXMudG9TdHJpbmcob3B0KS5yZXBsYWNlKFByb3RvX0Jsb2IsJ2ltYWdlcycpIDogdGhpcy50b1N0cmluZygpKVxuXHRcdFx0XHRyZXR1cm4gemlwXG5cdFx0XHR9LFxuXHRcdFx0ZG93bmxvYWQob3B0LCBwcm9wcyl7XG5cdFx0XHRcdHZhciBhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSlcblx0XHRcdFx0YS5ocmVmPVVSTC5jcmVhdGVPYmplY3RVUkwodGhpcy5hc1ppcChvcHQscHJvcHMpLmdlbmVyYXRlKHt0eXBlOidibG9iJ30pKVxuXHRcdFx0XHRhLmRvd25sb2FkPShwcm9wcy5uYW1lfHxcImRvY3VtZW50XCIpKycuemlwJ1xuXHRcdFx0XHRhLmNsaWNrKClcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChhLmhyZWYpXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSlcblx0XHRcdH0sXG5cdFx0XHRzYXZlKG9wdCwgcHJvcHMpe1xuXHRcdFx0XHR2YXIgaGFzSW1hZ2U9ZmFsc2UsIGltYWdlcz17fSwgbWU9dGhpcztcblx0XHRcdFx0cmV0dXJuICQuRGVmZXJyZWQud2hlbigodGhpcy5pbWFnZXMgJiYgT2JqZWN0LmtleXModGhpcy5pbWFnZXMpfHxbXSkubWFwKGZ1bmN0aW9uKGEpe1xuXHRcdFx0XHRcdGhhc0ltYWdlPXRydWVcblx0XHRcdFx0XHRyZXR1cm4gb3B0LnNhdmVJbWFnZSh0aGlzW2FdLHByb3BzKVxuXHRcdFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24odXJsKXtyZXR1cm4gaW1hZ2VzW2FdPXVybH0pXG5cdFx0XHRcdH0sdGhpcy5pbWFnZXMpKVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHZhciBodG1sPW1lLnRvU3RyaW5nKG9wdCwgcHJvcHMpO1xuXHRcdFx0XHRcdGlmKGhhc0ltYWdlKVxuXHRcdFx0XHRcdFx0aHRtbD1odG1sLnJlcGxhY2UoUmVnX1Byb3RvX0Jsb2IsZnVuY3Rpb24oYSxpZCl7cmV0dXJuIGltYWdlc1thXX0pO1xuXHRcdFx0XHRcdHJldHVybiBvcHQuc2F2ZUh0bWwoaHRtbCwgcHJvcHMpXG5cdFx0XHRcdH0pXG5cdFx0XHR9LFxuXHRcdFx0aW1hZ2VzOnt9LFxuXHRcdFx0YXNJbWFnZVVSTChhcnJheUJ1ZmZlcil7XG5cdFx0XHRcdHZhciB1cmw9VVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbYXJyYXlCdWZmZXJdLFxuXHRcdFx0XHRcdHt0eXBlOlwiaW1hZ2UvXCIrKHR5cGVvZihhcnJheUJ1ZmZlcik9PSdzdHJpbmcnID8gJ3N2Zyt4bWwnIDogJyonKX0pKTtcblx0XHRcdFx0dGhpcy5pbWFnZXNbdXJsXT1hcnJheUJ1ZmZlclxuXHRcdFx0XHRyZXR1cm4gdXJsXG5cdFx0XHR9LFxuXHRcdFx0X3JlbGVhc2UoKXtcblx0XHRcdFx0T2JqZWN0LmtleXModGhpcy5pbWFnZXMpLmZvckVhY2goZnVuY3Rpb24oYil7XG5cdFx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChiKVxuXHRcdFx0XHR9KVxuXHRcdFx0XHRkZWxldGUgdGhpcy5pbWFnZXNcblx0XHRcdH1cblx0XHR9KVxuXHR9XG59XG5cbihmdW5jdGlvbihpc05vZGUsIG0pe1xuXHRpZighaXNOb2RlKVx0cmV0dXJuO1xuXG5cdGNyZWF0ZURvY3VtZW50PXJlcXVpcmUobSkuanNkb21cblx0bGV0IHdpbmRvdz1jcmVhdGVEb2N1bWVudCgpLmRlZmF1bHRWaWV3XG5cblx0Z2xvYmFsLmJ0b2E9d2luZG93LmJ0b2Fcblx0Q1NTU3R5bGVEZWNsYXJhdGlvbj13aW5kb3cuQ1NTU3R5bGVEZWNsYXJhdGlvblxufSkoJC5pc05vZGUsIFwianNkb21cIilcbiJdfQ==