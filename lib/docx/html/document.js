'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

var _jszip = require('jszip');

var _jszip2 = _interopRequireDefault(_jszip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createDocument, CSSStyleDeclaration;

var Document = function (_Converter) {
	(0, _inherits3.default)(Document, _Converter);

	function Document() {
		(0, _classCallCheck3.default)(this, Document);
		return (0, _possibleConstructorReturn3.default)(this, (Document.__proto__ || (0, _getPrototypeOf2.default)(Document)).apply(this, arguments));
	}

	(0, _createClass3.default)(Document, [{
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
			this.convertStyle();
		}
	}, {
		key: 'convertStyle',
		value: function convertStyle() {
			var bgStyle = this.wordModel.getBackgroundStyle();
			if (!bgStyle) return;

			var style = this.doc.createStyle('section');
			switch (typeof bgStyle === 'undefined' ? 'undefined' : (0, _typeof3.default)(bgStyle)) {
				case 'object':
					// fill
					console.warn('not support fill color on document background yet');
					break;
				default:
					style.backgroundColor = bgStyle;
					break;
			}
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
					var root = (0, _assign2.default)(document.createElement('div'), {
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
						toString: function toString(opt) {
							var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : selfConverter.props;

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

					return (0, _assign2.default)(selfConverter[$.isNode ? 'nodefy' : 'browserify'](doc, stylesheet, opt), {
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
			return (0, _assign2.default)(doc, {
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

			return (0, _assign2.default)(doc, {
				asZip: function asZip(opt, props) {
					var zip = new _jszip2.default(),
					    hasImage = false;
					var f = zip.folder('images');
					(0, _keys2.default)(this.images).forEach(function (a) {
						hasImage = true;
						f.file(a.split('/').pop(), this[a]);
					}, this.images);
					zip.file('props.json', (0, _stringify2.default)(props));
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
					return $.Deferred.when((this.images && (0, _keys2.default)(this.images) || []).map(function (a) {
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
					(0, _keys2.default)(this.images).forEach(function (b) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiY3JlYXRlRG9jdW1lbnQiLCJDU1NTdHlsZURlY2xhcmF0aW9uIiwiRG9jdW1lbnQiLCJkb2MiLCJjb25zdHJ1Y3RvciIsImNyZWF0ZSIsIm9wdGlvbnMiLCJjb250ZW50IiwiY29udGVudFN0eWxlIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJtaW5IZWlnaHQiLCJ3aWR0aCIsInBhZGRpbmdUb3AiLCJvdmVyZmxvdyIsImNyZWF0ZVN0eWxlIiwibWFyZ2luIiwiYm9yZGVyIiwicGFkZGluZyIsImJveFNpemluZyIsImJvcmRlckNvbGxhcHNlIiwid29yZEJyZWFrIiwiY29sb3IiLCJwb3NpdGlvbiIsInpJbmRleCIsImRpc3BsYXkiLCJsaXN0U3R5bGUiLCJ0ZXh0RGVjb3JhdGlvbiIsIm91dGxpbmUiLCJjb252ZXJ0U3R5bGUiLCJiZ1N0eWxlIiwid29yZE1vZGVsIiwiZ2V0QmFja2dyb3VuZFN0eWxlIiwiY29uc29sZSIsIndhcm4iLCJvcHQiLCJ0b1N0cmluZyIsInByb3BzIiwicmVsZWFzZSIsImFzWmlwIiwiZG93bmxvYWQiLCJzYXZlIiwic2VsZkNvbnZlcnRlciIsImRvY3VtZW50IiwiYnJvd3NlckRvYyIsInVpZCIsInJvb3QiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJzZWN0aW9uIiwiYmluZCIsImNyZWF0ZVRleHROb2RlIiwiY3JlYXRlU3R5bGVTaGVldCIsInN0eWxlc2hlZXQiLCJlbFN0eWxlIiwiYm9keSIsImFwcGVuZENoaWxkIiwic2hlZXQiLCJnZXRTdHlsZVRleHQiLCJzdHlsZXMiLCJpIiwicnVsZXMiLCJjc3NSdWxlcyIsImxlbiIsImxlbmd0aCIsInB1c2giLCJjc3NUZXh0Iiwiam9pbiIsInRlbXBsYXRlIiwiJCIsImlzRnVuY3Rpb24iLCJfaHRtbCIsImh0bWwiLCJuYW1lIiwiZXh0ZW5kU2NyaXB0IiwiZGl2cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJvdXRlckhUTUwiLCJkaXZjb250YWluZXIiLCJkaXYiLCJwYXJlbnQiLCJwYXJlbnROb2RlIiwic2V0QXR0cmlidXRlIiwiaW5kZXhPZiIsImNoaWxkTm9kZXMiLCJfdHJhbnNmb3JtZXIiLCJhIiwicXVlcnlTZWxlY3RvciIsInBhcmVudElkIiwiZ2V0QXR0cmlidXRlIiwiaW5kZXgiLCJwYXJzZUludCIsImluc2VydEJlZm9yZSIsInJlbW92ZUNoaWxkIiwiZWwiLCJlbHMiLCJjb250YWluZXIiLCJtaXhpbiIsInJlbFN0eWxlcyIsImlzTm9kZSIsInNlbGVjdG9yIiwiaW5zZXJ0UnVsZSIsInNwbGl0IiwibWFwIiwidHJpbSIsInN0eWxlUGF0aCIsInBhdGhzIiwidW5zaGlmdCIsIl9yZWxlYXNlIiwiYXNJbWFnZVVSTCIsImJ1ZmZlciIsIkVycm9yIiwiUHJvdG9fQmxvYiIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsIkJsb2IiLCJwb3AiLCJSZWdfUHJvdG9fQmxvYiIsIlJlZ0V4cCIsInppcCIsIkpTWmlwIiwiaGFzSW1hZ2UiLCJmIiwiZm9sZGVyIiwiaW1hZ2VzIiwiZm9yRWFjaCIsImZpbGUiLCJyZXBsYWNlIiwiaHJlZiIsImdlbmVyYXRlIiwidHlwZSIsImNsaWNrIiwicmV2b2tlT2JqZWN0VVJMIiwibWUiLCJEZWZlcnJlZCIsIndoZW4iLCJzYXZlSW1hZ2UiLCJ0aGVuIiwidXJsIiwic2F2ZUh0bWwiLCJhcnJheUJ1ZmZlciIsImIiLCJDb252ZXJ0ZXIiLCJtIiwicmVxdWlyZSIsImpzZG9tIiwid2luZG93IiwiZGVmYXVsdFZpZXciLCJnbG9iYWwiLCJidG9hIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJQSxjQUFKLEVBQW9CQyxtQkFBcEI7O0lBRXFCQyxROzs7Ozs7Ozs7OzRCQUdYO0FBQ1IsUUFBS0MsR0FBTCxHQUFTLEtBQUtDLFdBQUwsQ0FBaUJDLE1BQWpC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QUFQO0FBV0EsS0FsQ3VCOztBQW1DeEJ1RixZQUFPLEVBbkNpQjtBQW9DeEJmLGNBcEN3QixzQkFvQ2IrQixXQXBDYSxFQW9DRDtBQUN0QixTQUFJRixNQUFJekIsSUFBSUMsZUFBSixDQUFvQixJQUFJQyxJQUFKLENBQVMsQ0FBQ3lCLFdBQUQsQ0FBVCxFQUMzQixFQUFDVixNQUFLLFlBQVUsT0FBT1UsV0FBUCxJQUFxQixRQUFyQixHQUFnQyxTQUFoQyxHQUE0QyxHQUF0RCxDQUFOLEVBRDJCLENBQXBCLENBQVI7QUFFQSxVQUFLaEIsTUFBTCxDQUFZYyxHQUFaLElBQWlCRSxXQUFqQjtBQUNBLFlBQU9GLEdBQVA7QUFDQSxLQXpDdUI7QUEwQ3hCOUIsWUExQ3dCLHNCQTBDZDtBQUNULHlCQUFZLEtBQUtnQixNQUFqQixFQUF5QkMsT0FBekIsQ0FBaUMsVUFBU2dCLENBQVQsRUFBVztBQUMzQzVCLFVBQUltQixlQUFKLENBQW9CUyxDQUFwQjtBQUNBLE1BRkQ7QUFHQSxZQUFPLEtBQUtqQixNQUFaO0FBQ0E7QUEvQ3VCLElBQWxCLENBQVA7QUFpREE7OztFQS9Tb0NrQixtQjs7a0JBQWpCNUksUTs7O0FBa1RyQixDQUFDLFVBQVNpRyxNQUFULEVBQWlCNEMsQ0FBakIsRUFBbUI7QUFDbkIsS0FBRyxDQUFDNUMsTUFBSixFQUFZOztBQUVabkcsa0JBQWVnSixRQUFRRCxDQUFSLEVBQVdFLEtBQTFCO0FBQ0EsS0FBSUMsU0FBT2xKLGlCQUFpQm1KLFdBQTVCOztBQUVBQyxRQUFPQyxJQUFQLEdBQVlILE9BQU9HLElBQW5CO0FBQ0FwSix1QkFBb0JpSixPQUFPakosbUJBQTNCO0FBQ0EsQ0FSRCxFQVFHb0UsRUFBRThCLE1BUkwsRUFRYSxPQVJiIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcidcbmltcG9ydCBKU1ppcCBmcm9tICdqc3ppcCdcblxudmFyIGNyZWF0ZURvY3VtZW50LCBDU1NTdHlsZURlY2xhcmF0aW9uXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgQ29udmVydGVye1xuXHRnZXQgdGFnKCl7cmV0dXJuICdodG1sJ31cblxuXHRjb252ZXJ0KCl7XG5cdFx0dGhpcy5kb2M9dGhpcy5jb25zdHJ1Y3Rvci5jcmVhdGUodGhpcy5vcHRpb25zKVxuXHRcdHRoaXMuY29udGVudD10aGlzLmRvY1xuXHRcdGxldCBjb250ZW50U3R5bGU9dGhpcy5jb250ZW50LnN0eWxlXG5cdFx0Y29udGVudFN0eWxlLmJhY2tncm91bmRDb2xvcj0ndHJhbnNwYXJlbnQnXG5cdFx0Y29udGVudFN0eWxlLm1pbkhlaWdodD0nMTAwMHB4J1xuXHRcdGNvbnRlbnRTdHlsZS53aWR0aD0nMTAwJSdcblx0XHRjb250ZW50U3R5bGUucGFkZGluZ1RvcD0nMjBweCdcblx0XHRjb250ZW50U3R5bGUub3ZlcmZsb3c9J2F1dG8nXG5cblx0XHR2YXIgc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJyonKVxuXHRcdHN0eWxlLm1hcmdpbj0nMCdcblx0XHRzdHlsZS5ib3JkZXI9JzAnXG5cdFx0c3R5bGUucGFkZGluZz0nMCdcblx0XHRzdHlsZS5ib3hTaXppbmc9J2JvcmRlci1ib3gnXG5cblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgndGFibGUnKVxuXHRcdHN0eWxlLndpZHRoPScxMDAlJ1xuXHRcdHN0eWxlLmJvcmRlckNvbGxhcHNlPSdjb2xsYXBzZSdcblx0XHRzdHlsZS53b3JkQnJlYWs9J2JyZWFrLXdvcmQnXG5cblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnc2VjdGlvbicpXG5cdFx0c3R5bGUubWFyZ2luPSdhdXRvJ1xuXHRcdHN0eWxlLmJhY2tncm91bmRDb2xvcj0nd2hpdGUnXG5cdFx0c3R5bGUuY29sb3I9J2JsYWNrJ1xuXHRcdHN0eWxlLnBvc2l0aW9uPSdyZWxhdGl2ZSdcblx0XHRzdHlsZS56SW5kZXg9MFxuXG5cdFx0c3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3A6ZW1wdHk6YmVmb3JlJylcblx0XHRzdHlsZS5jb250ZW50PSdcIlwiJ1xuXHRcdHN0eWxlLmRpc3BsYXk9J2lubGluZS1ibG9jaydcblxuXHRcdHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCd1bCcpXG5cdFx0c3R5bGUubGlzdFN0eWxlPVwibm9uZVwiXG5cblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgndWw+bGk+cCcpXG5cdFx0c3R5bGUucG9zaXRpb249J3JlbGF0aXZlJ1xuXG5cdFx0c3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3VsIC5tYXJrZXInKVxuXHRcdHN0eWxlLnBvc2l0aW9uPSdhYnNvbHV0ZSdcblxuXHRcdHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCdhJylcblx0XHRzdHlsZS50ZXh0RGVjb3JhdGlvbj0nbm9uZSdcblxuXHRcdHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCcudW5zdXBwb3J0ZWQnKVxuXHRcdHN0eWxlLm91dGxpbmU9XCIycHggcmVkIHNvbGlkXCJcblxuXHRcdHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCcud2FybmluZycpXG5cdFx0c3R5bGUub3V0bGluZT1cIjFweCB5ZWxsb3cgc29saWRcIlxuXHRcdHRoaXMuY29udmVydFN0eWxlKClcblx0fVxuXHRcblx0Y29udmVydFN0eWxlKCl7XG5cdFx0dmFyIGJnU3R5bGU9dGhpcy53b3JkTW9kZWwuZ2V0QmFja2dyb3VuZFN0eWxlKClcblx0XHRpZighYmdTdHlsZSlcblx0XHRcdHJldHVyblxuXHRcdFxuXHRcdHZhciBzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnc2VjdGlvbicpXG5cdFx0c3dpdGNoKHR5cGVvZiBiZ1N0eWxlKXtcblx0XHRjYXNlICdvYmplY3QnOi8vIGZpbGxcblx0XHRcdGNvbnNvbGUud2Fybignbm90IHN1cHBvcnQgZmlsbCBjb2xvciBvbiBkb2N1bWVudCBiYWNrZ3JvdW5kIHlldCcpXG5cdFx0YnJlYWtcblx0XHRkZWZhdWx0OlxuXHRcdFx0c3R5bGUuYmFja2dyb3VuZENvbG9yPWJnU3R5bGVcblx0XHRicmVha1xuXHRcdH1cblx0fVxuXHQvKipcblx0KiBvcHQ6IHtcblx0KiBcdHRlbXBsYXRlOiBmdW5jdGlvbihzdHlsZSwgaHRtbCwgcHJvcHMpeyByZXR1cm4gKGh0bWwpfSxcblx0XHRleHRlbmRTY3JpcHQ6IFwiaHR0cDovL2EuY29tL2EuanNcIlxuXHRcdH1cblx0Ki9cblx0dG9TdHJpbmcob3B0KXtcblx0XHRyZXR1cm4gdGhpcy5kb2MudG9TdHJpbmcob3B0LHRoaXMucHJvcHMpXG5cdH1cblx0cmVsZWFzZSgpe1xuXHRcdHRoaXMuZG9jLnJlbGVhc2UoKVxuXHR9XG5cdGFzWmlwKG9wdCl7XG5cdFx0cmV0dXJuIHRoaXMuZG9jLmFzWmlwKG9wdCx0aGlzLnByb3BzKVxuXHR9XG5cdGRvd25sb2FkKG9wdCl7XG5cdFx0cmV0dXJuIHRoaXMuZG9jLmRvd25sb2FkKG9wdCwgdGhpcy5wcm9wcylcblx0fVxuXHQvKipcblx0KiBvcHQ9ZXh0ZW5kKHRvU3RyaW5nLm9wdCx7XG5cdFx0c2F2ZUltYWdlOiBmdW5jdGlvbihhcnJheUJ1ZmZlciwgZG9jLnByb3BzKTogcHJvbWlzZSh1cmwpIHt9LFxuXHRcdHNhdmVIdG1sOiBmdW5jdGlvbigpe31cblx0fSlcblx0Ki9cblx0c2F2ZSAob3B0KXtcblx0XHRyZXR1cm4gdGhpcy5kb2Muc2F2ZShvcHQsIHRoaXMucHJvcHMpXG5cdH1cblxuXHRzdGF0aWMgY3JlYXRlKG9wdCl7XG5cdFx0dmFyIHNlbGZDb252ZXJ0ZXI9dGhpc1xuXHRcdHJldHVybiAoZnVuY3Rpb24oZG9jdW1lbnQpe1xuXHRcdFx0dmFyIGRvYz0oZnVuY3Rpb24gYnJvd3NlckRvYygpe1xuXHRcdFx0XHR2YXIgdWlkPTA7XG5cdFx0XHRcdHZhciByb290PU9iamVjdC5hc3NpZ24oZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jykse1xuXHRcdFx0XHRcdGlkIDogXCJBXCIsXG5cdFx0XHRcdFx0c2VjdGlvbjogbnVsbCxcblx0XHRcdFx0XHRjcmVhdGVFbGVtZW50OiBkb2N1bWVudC5jcmVhdGVFbGVtZW50LmJpbmQoZG9jdW1lbnQpLFxuXHRcdFx0XHRcdGNyZWF0ZVRleHROb2RlOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZS5iaW5kKGRvY3VtZW50KSxcblx0XHRcdFx0XHRjcmVhdGVTdHlsZVNoZWV0KCl7XG5cdFx0XHRcdFx0XHRpZih0aGlzLnN0eWxlc2hlZXQpXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnN0eWxlc2hlZXQ7XG5cdFx0XHRcdFx0XHR2YXIgZWxTdHlsZT10aGlzLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcblx0XHRcdFx0XHRcdHRoaXMuYm9keS5hcHBlbmRDaGlsZChlbFN0eWxlLG51bGwpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc3R5bGVzaGVldD1lbFN0eWxlLnNoZWV0XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRnZXRTdHlsZVRleHQoKXtcblx0XHRcdFx0XHRcdHZhciBzdHlsZXM9W11cblx0XHRcdFx0XHRcdGZvcih2YXIgaT0wLCBydWxlcz10aGlzLnN0eWxlc2hlZXQuY3NzUnVsZXMsIGxlbj1ydWxlcy5sZW5ndGg7aTxsZW47aSsrKVxuXHRcdFx0XHRcdFx0XHRzdHlsZXMucHVzaChydWxlc1tpXS5jc3NUZXh0KVxuXHRcdFx0XHRcdFx0cmV0dXJuIHN0eWxlcy5qb2luKCdcXHJcXG4nKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0dWlkKCl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5pZCsodWlkKyspXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR0b1N0cmluZyhvcHQsIHByb3BzPXNlbGZDb252ZXJ0ZXIucHJvcHMpe1xuXHRcdFx0XHRcdFx0aWYob3B0ICYmIHR5cGVvZiBvcHQudGVtcGxhdGUhPVwidW5kZWZpbmVkXCIgJiYgJC5pc0Z1bmN0aW9uKG9wdC50ZW1wbGF0ZSkpXG5cdFx0XHRcdFx0XHRcdHJldHVybiBvcHQudGVtcGxhdGUodGhpcy5nZXRTdHlsZVRleHQoKSwgdGhpcy5faHRtbCgpLCBwcm9wcylcblx0XHRcdFx0XHRcdHZhciBodG1sPVsnPCFkb2N0eXBlIGh0bWw+XFxyXFxuPGh0bWw+PGhlYWQ+PG1ldGEgY2hhcnNldD11dGYtOD48bWV0YSBrZXk9XCJnZW5lcmF0b3JcIiB2YWx1ZT1cImRvY3gyaHRtbFwiPjx0aXRsZT4nKyhwcm9wcy5uYW1lfHwnJykrJzwvdGl0bGU+PHN0eWxlPiddXG5cdFx0XHRcdFx0XHRodG1sLnB1c2godGhpcy5nZXRTdHlsZVRleHQoKSlcblx0XHRcdFx0XHRcdGh0bWwucHVzaCgnPC9zdHlsZT48L2hlYWQ+PGJvZHk+Jylcblx0XHRcdFx0XHRcdGh0bWwucHVzaCh0aGlzLl9odG1sKCkpXG5cdFx0XHRcdFx0XHRvcHQgJiYgb3B0LmV4dGVuZFNjcmlwdCAmJiBodG1sLnB1c2goJzxzY3JpcHQgc3JjPVwiJytvcHQuZXh0ZW5kU2NyaXB0KydcIj48L3NjcmlwdD4nKVxuXHRcdFx0XHRcdFx0aHRtbC5wdXNoKCc8L2JvZHk+PGh0bWw+Jylcblx0XHRcdFx0XHRcdHJldHVybiBodG1sLmpvaW4oJ1xcclxcbicpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRfaHRtbCgpe1xuXHRcdFx0XHRcdFx0dmFyIGRpdnM9dGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdwPmRpdiwgc3Bhbj5kaXYnKVxuXHRcdFx0XHRcdFx0aWYoZGl2cy5sZW5ndGg9PTApXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLm91dGVySFRNTFxuXG5cdFx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHRcdCogaWxsZWdhbCA8cD4gPGRpdi8+IDwvcD5cblx0XHRcdFx0XHRcdCogRE9NIG9wZXJhdGlvbiBkaXJlY3RseSBpbiBvbmxvYWRcblx0XHRcdFx0XHRcdCovXG5cdFx0XHRcdFx0XHR2YXIgZGl2Y29udGFpbmVyPWRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKSwgdWlkPTBcblx0XHRcdFx0XHRcdGRpdmNvbnRhaW5lci5pZD0nZGl2Y29udGFpbmVyJ1xuXHRcdFx0XHRcdFx0ZGl2Y29udGFpbmVyLnN0eWxlLmRpc3BsYXk9XCJub25lXCJcblx0XHRcdFx0XHRcdHRoaXMuYXBwZW5kQ2hpbGQoZGl2Y29udGFpbmVyKVxuXHRcdFx0XHRcdFx0Zm9yKHZhciBpPWRpdnMubGVuZ3RoLTE7aT4tMTtpLS0pe1xuXHRcdFx0XHRcdFx0XHR2YXIgZGl2PWRpdnNbaV0sXG5cdFx0XHRcdFx0XHRcdFx0cGFyZW50PWRpdi5wYXJlbnROb2RlO1xuXG5cdFx0XHRcdFx0XHRcdGlmKCFkaXYuaWQpXG5cdFx0XHRcdFx0XHRcdFx0ZGl2LmlkPSdfeicrKCsrdWlkKVxuXG5cdFx0XHRcdFx0XHRcdGlmKCFwYXJlbnQuaWQpXG5cdFx0XHRcdFx0XHRcdFx0cGFyZW50LmlkPSdfeScrdWlkXG5cblx0XHRcdFx0XHRcdFx0ZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1wYXJlbnQnLHBhcmVudC5pZClcblx0XHRcdFx0XHRcdFx0ZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsaW5kZXhPZihkaXYscGFyZW50LmNoaWxkTm9kZXMpKVxuXG5cdFx0XHRcdFx0XHRcdGRpdmNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXZzW2ldKVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR2YXIgaHRtbD10aGlzLm91dGVySFRNTCsnXFxuXFxyPHNjcmlwdD4oJyt0aGlzLl90cmFuc2Zvcm1lci50b1N0cmluZygpKycpKCk7PC9zY3JpcHQ+J1xuXHRcdFx0XHRcdFx0dGhpcy5fdHJhbnNmb3JtZXIoKTtcblx0XHRcdFx0XHRcdHJldHVybiBodG1sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRfdHJhbnNmb3JtZXIoKXtcblx0XHRcdFx0XHRcdHZhciBhPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaXZjb250YWluZXInKVxuXHRcdFx0XHRcdFx0Zm9yKHZhciBkaXZzPWEuY2hpbGROb2RlcywgaT1kaXZzLmxlbmd0aC0xO2k+LTE7aS0tKXtcblx0XHRcdFx0XHRcdFx0dmFyIGRpdj1kaXZzW2ldLFxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudElkPWRpdi5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50JyksXG5cdFx0XHRcdFx0XHRcdFx0aW5kZXg9cGFyc2VJbnQoZGl2LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpKSxcblx0XHRcdFx0XHRcdFx0XHRwYXJlbnQ9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycrcGFyZW50SWQpO1xuXHRcdFx0XHRcdFx0XHRwYXJlbnQuaW5zZXJ0QmVmb3JlKGRpdixwYXJlbnQuY2hpbGROb2Rlc1tpbmRleF0pXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRhLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGZ1bmN0aW9uIGluZGV4T2YoZWwsIGVscyl7XG5cdFx0XHRcdFx0Zm9yKHZhciBpPWVscy5sZW5ndGgtMTtpPjA7aS0tKVxuXHRcdFx0XHRcdFx0aWYoZWw9PWVsc1tpXSlcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGlcblx0XHRcdFx0XHRyZXR1cm4gMFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0KG9wdCAmJiBvcHQuY29udGFpbmVyIHx8IGRvY3VtZW50LmJvZHkpLmFwcGVuZENoaWxkKHJvb3QpO1xuXHRcdFx0XHRyb290LmJvZHk9cm9vdFxuXHRcdFx0XHRyZXR1cm4gcm9vdFxuXHRcdFx0fSkoKTtcblxuXHRcdFx0cmV0dXJuIChmdW5jdGlvbiBtaXhpbihkb2Mpe1xuXHRcdFx0XHR2YXIgc3R5bGVzaGVldD1kb2MuY3JlYXRlU3R5bGVTaGVldCgpXG5cdFx0XHRcdHZhciByZWxTdHlsZXM9e30sIHN0eWxlcz17fVxuXG5cdFx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHNlbGZDb252ZXJ0ZXJbJC5pc05vZGUgPyAnbm9kZWZ5JyA6ICdicm93c2VyaWZ5J10oZG9jLHN0eWxlc2hlZXQsIG9wdCkse1xuXHRcdFx0XHRcdGNyZWF0ZVN0eWxlKHNlbGVjdG9yKXtcblx0XHRcdFx0XHRcdGlmKHN0eWxlc1tzZWxlY3Rvcl0pXG5cdFx0XHRcdFx0XHRcdHJldHVybiBzdHlsZXNbc2VsZWN0b3JdXG5cdFx0XHRcdFx0XHR2YXIgcnVsZXM9c3R5bGVzaGVldC5jc3NSdWxlcyxsZW49cnVsZXMubGVuZ3RoXG5cdFx0XHRcdFx0XHRzdHlsZXNoZWV0Lmluc2VydFJ1bGUoc2VsZWN0b3Iuc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24oYSl7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGEudHJpbSgpWzBdPT0nIycgPyBhIDogJyMnK3RoaXMuaWQrJyAnK2Fcblx0XHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKS5qb2luKCcsJykrJ3t9JyxsZW4pXG5cdFx0XHRcdFx0XHRyZXR1cm4gIHN0eWxlc1tzZWxlY3Rvcl09c3R5bGVzaGVldC5jc3NSdWxlc1tsZW5dLnN0eWxlXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzdHlsZVBhdGgoYSwgcGFyZW50KXtcblx0XHRcdFx0XHRcdGlmKHBhcmVudClcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlbFN0eWxlc1thXT1wYXJlbnRcblx0XHRcdFx0XHRcdHZhciBwYXRocz1bYV0scGFyZW50PWFcblx0XHRcdFx0XHRcdHdoaWxlKHBhcmVudD1yZWxTdHlsZXNbcGFyZW50XSlcblx0XHRcdFx0XHRcdFx0cGF0aHMudW5zaGlmdChwYXJlbnQpXG5cdFx0XHRcdFx0XHRyZXR1cm4gcGF0aHMuam9pbignICcpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRyZWxlYXNlKCl7XG5cdFx0XHRcdFx0XHRkZWxldGUgdGhpcy5zZWN0aW9uXG5cdFx0XHRcdFx0XHR0aGlzLl9yZWxlYXNlKClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9KShkb2MpXG5cdFx0fSkoJC5pc05vZGUgPyBjcmVhdGVEb2N1bWVudCgpIDogZG9jdW1lbnQpXG5cdH1cblxuXHRzdGF0aWMgbm9kZWZ5KGRvYywgc3R5bGVzaGVldCwgb3B0KXtcblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihkb2Mse1xuXHRcdFx0X3JlbGVhc2UoKXtcblxuXHRcdFx0fSxcblx0XHRcdGFzSW1hZ2VVUkwoYnVmZmVyKXtcblx0XHRcdFx0aWYob3B0ICYmIHR5cGVvZihvcHQuYXNJbWFnZVVSTCkhPSd1bmRlZmluZWQnKVxuXHRcdFx0XHRcdHJldHVybiBvcHQuYXNJbWFnZVVSTChidWZmZXIpXG5cdFx0XHRcdHJldHVybiBcImltYWdlOi8vbm90c3VwcG9ydFwiXG5cdFx0XHR9LFxuXHRcdFx0YXNaaXAoKXtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCcpXG5cdFx0XHR9LFxuXHRcdFx0ZG93bmxvYWQoKXtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCcpXG5cdFx0XHR9LFxuXHRcdFx0c2F2ZSgpe1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0Jylcblx0XHRcdH1cblx0XHR9KVxuXHR9XG5cblx0c3RhdGljIGJyb3dzZXJpZnkoZG9jLCBzdHlsZXNoZWV0LCBvcHQpe1xuXHRcdHZhciBQcm90b19CbG9iPShmdW5jdGlvbihhKXtcblx0XHRcdFx0YT1VUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKCkpLnNwbGl0KCcvJyk7XG5cdFx0XHRcdGEucG9wKCk7XG5cdFx0XHRcdHJldHVybiBhLmpvaW4oJy8nKVxuXHRcdFx0fSkoKSxcblx0XHRcdFJlZ19Qcm90b19CbG9iPW5ldyBSZWdFeHAoUHJvdG9fQmxvYitcIi8oW1xcXFx3XFxcXGQtXSspXCIsXCJnaVwiKTtcblxuXHRcdHJldHVybiBPYmplY3QuYXNzaWduKGRvYyx7XG5cdFx0XHRhc1ppcChvcHQsIHByb3BzKXtcblx0XHRcdFx0dmFyIHppcD1uZXcgSlNaaXAoKSxoYXNJbWFnZT1mYWxzZTtcblx0XHRcdFx0dmFyIGY9emlwLmZvbGRlcignaW1hZ2VzJylcblx0XHRcdFx0T2JqZWN0LmtleXModGhpcy5pbWFnZXMpLmZvckVhY2goZnVuY3Rpb24oYSl7XG5cdFx0XHRcdFx0aGFzSW1hZ2U9dHJ1ZVxuXHRcdFx0XHRcdGYuZmlsZShhLnNwbGl0KCcvJykucG9wKCksdGhpc1thXSlcblx0XHRcdFx0fSx0aGlzLmltYWdlcylcblx0XHRcdFx0emlwLmZpbGUoJ3Byb3BzLmpzb24nLEpTT04uc3RyaW5naWZ5KHByb3BzKSk7XG5cdFx0XHRcdHppcC5maWxlKCdtYWluLmh0bWwnLGhhc0ltYWdlID8gdGhpcy50b1N0cmluZyhvcHQpLnJlcGxhY2UoUHJvdG9fQmxvYiwnaW1hZ2VzJykgOiB0aGlzLnRvU3RyaW5nKCkpXG5cdFx0XHRcdHJldHVybiB6aXBcblx0XHRcdH0sXG5cdFx0XHRkb3dubG9hZChvcHQsIHByb3BzKXtcblx0XHRcdFx0dmFyIGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIilcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKVxuXHRcdFx0XHRhLmhyZWY9VVJMLmNyZWF0ZU9iamVjdFVSTCh0aGlzLmFzWmlwKG9wdCxwcm9wcykuZ2VuZXJhdGUoe3R5cGU6J2Jsb2InfSkpXG5cdFx0XHRcdGEuZG93bmxvYWQ9KHByb3BzLm5hbWV8fFwiZG9jdW1lbnRcIikrJy56aXAnXG5cdFx0XHRcdGEuY2xpY2soKVxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKGEuaHJlZilcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKVxuXHRcdFx0fSxcblx0XHRcdHNhdmUob3B0LCBwcm9wcyl7XG5cdFx0XHRcdHZhciBoYXNJbWFnZT1mYWxzZSwgaW1hZ2VzPXt9LCBtZT10aGlzO1xuXHRcdFx0XHRyZXR1cm4gJC5EZWZlcnJlZC53aGVuKCh0aGlzLmltYWdlcyAmJiBPYmplY3Qua2V5cyh0aGlzLmltYWdlcyl8fFtdKS5tYXAoZnVuY3Rpb24oYSl7XG5cdFx0XHRcdFx0aGFzSW1hZ2U9dHJ1ZVxuXHRcdFx0XHRcdHJldHVybiBvcHQuc2F2ZUltYWdlKHRoaXNbYV0scHJvcHMpXG5cdFx0XHRcdFx0XHQudGhlbihmdW5jdGlvbih1cmwpe3JldHVybiBpbWFnZXNbYV09dXJsfSlcblx0XHRcdFx0fSx0aGlzLmltYWdlcykpXG5cdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0dmFyIGh0bWw9bWUudG9TdHJpbmcob3B0LCBwcm9wcyk7XG5cdFx0XHRcdFx0aWYoaGFzSW1hZ2UpXG5cdFx0XHRcdFx0XHRodG1sPWh0bWwucmVwbGFjZShSZWdfUHJvdG9fQmxvYixmdW5jdGlvbihhLGlkKXtyZXR1cm4gaW1hZ2VzW2FdfSk7XG5cdFx0XHRcdFx0cmV0dXJuIG9wdC5zYXZlSHRtbChodG1sLCBwcm9wcylcblx0XHRcdFx0fSlcblx0XHRcdH0sXG5cdFx0XHRpbWFnZXM6e30sXG5cdFx0XHRhc0ltYWdlVVJMKGFycmF5QnVmZmVyKXtcblx0XHRcdFx0dmFyIHVybD1VUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFthcnJheUJ1ZmZlcl0sXG5cdFx0XHRcdFx0e3R5cGU6XCJpbWFnZS9cIisodHlwZW9mKGFycmF5QnVmZmVyKT09J3N0cmluZycgPyAnc3ZnK3htbCcgOiAnKicpfSkpO1xuXHRcdFx0XHR0aGlzLmltYWdlc1t1cmxdPWFycmF5QnVmZmVyXG5cdFx0XHRcdHJldHVybiB1cmxcblx0XHRcdH0sXG5cdFx0XHRfcmVsZWFzZSgpe1xuXHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLmltYWdlcykuZm9yRWFjaChmdW5jdGlvbihiKXtcblx0XHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKGIpXG5cdFx0XHRcdH0pXG5cdFx0XHRcdGRlbGV0ZSB0aGlzLmltYWdlc1xuXHRcdFx0fVxuXHRcdH0pXG5cdH1cbn1cblxuKGZ1bmN0aW9uKGlzTm9kZSwgbSl7XG5cdGlmKCFpc05vZGUpXHRyZXR1cm47XG5cblx0Y3JlYXRlRG9jdW1lbnQ9cmVxdWlyZShtKS5qc2RvbVxuXHRsZXQgd2luZG93PWNyZWF0ZURvY3VtZW50KCkuZGVmYXVsdFZpZXdcblxuXHRnbG9iYWwuYnRvYT13aW5kb3cuYnRvYVxuXHRDU1NTdHlsZURlY2xhcmF0aW9uPXdpbmRvdy5DU1NTdHlsZURlY2xhcmF0aW9uXG59KSgkLmlzTm9kZSwgXCJqc2RvbVwiKVxuIl19