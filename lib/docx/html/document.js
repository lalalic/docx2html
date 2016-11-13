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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiY3JlYXRlRG9jdW1lbnQiLCJDU1NTdHlsZURlY2xhcmF0aW9uIiwiRG9jdW1lbnQiLCJkb2MiLCJjb25zdHJ1Y3RvciIsImNyZWF0ZSIsIm9wdGlvbnMiLCJjb250ZW50IiwiY29udGVudFN0eWxlIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJtaW5IZWlnaHQiLCJ3aWR0aCIsInBhZGRpbmdUb3AiLCJvdmVyZmxvdyIsImNyZWF0ZVN0eWxlIiwibWFyZ2luIiwiYm9yZGVyIiwicGFkZGluZyIsImJveFNpemluZyIsImJvcmRlckNvbGxhcHNlIiwid29yZEJyZWFrIiwiY29sb3IiLCJwb3NpdGlvbiIsInpJbmRleCIsImRpc3BsYXkiLCJsaXN0U3R5bGUiLCJ0ZXh0RGVjb3JhdGlvbiIsIm91dGxpbmUiLCJjb252ZXJ0U3R5bGUiLCJiZ1N0eWxlIiwid29yZE1vZGVsIiwiZ2V0QmFja2dyb3VuZFN0eWxlIiwiY29uc29sZSIsIndhcm4iLCJvcHQiLCJ0b1N0cmluZyIsInByb3BzIiwicmVsZWFzZSIsImFzWmlwIiwiZG93bmxvYWQiLCJzYXZlIiwic2VsZkNvbnZlcnRlciIsImRvY3VtZW50IiwiYnJvd3NlckRvYyIsInVpZCIsInJvb3QiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJzZWN0aW9uIiwiYmluZCIsImNyZWF0ZVRleHROb2RlIiwiY3JlYXRlU3R5bGVTaGVldCIsInN0eWxlc2hlZXQiLCJlbFN0eWxlIiwiYm9keSIsImFwcGVuZENoaWxkIiwic2hlZXQiLCJnZXRTdHlsZVRleHQiLCJzdHlsZXMiLCJpIiwicnVsZXMiLCJjc3NSdWxlcyIsImxlbiIsImxlbmd0aCIsInB1c2giLCJjc3NUZXh0Iiwiam9pbiIsInRlbXBsYXRlIiwiJCIsImlzRnVuY3Rpb24iLCJfaHRtbCIsImh0bWwiLCJuYW1lIiwiZXh0ZW5kU2NyaXB0IiwiZGl2cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJvdXRlckhUTUwiLCJkaXZjb250YWluZXIiLCJkaXYiLCJwYXJlbnQiLCJwYXJlbnROb2RlIiwic2V0QXR0cmlidXRlIiwiaW5kZXhPZiIsImNoaWxkTm9kZXMiLCJfdHJhbnNmb3JtZXIiLCJhIiwicXVlcnlTZWxlY3RvciIsInBhcmVudElkIiwiZ2V0QXR0cmlidXRlIiwiaW5kZXgiLCJwYXJzZUludCIsImluc2VydEJlZm9yZSIsInJlbW92ZUNoaWxkIiwiZWwiLCJlbHMiLCJjb250YWluZXIiLCJtaXhpbiIsInJlbFN0eWxlcyIsImlzTm9kZSIsInNlbGVjdG9yIiwiaW5zZXJ0UnVsZSIsInNwbGl0IiwibWFwIiwidHJpbSIsInN0eWxlUGF0aCIsInBhdGhzIiwidW5zaGlmdCIsIl9yZWxlYXNlIiwiYXNJbWFnZVVSTCIsImJ1ZmZlciIsIkVycm9yIiwiUHJvdG9fQmxvYiIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsIkJsb2IiLCJwb3AiLCJSZWdfUHJvdG9fQmxvYiIsIlJlZ0V4cCIsInppcCIsImhhc0ltYWdlIiwiZiIsImZvbGRlciIsImltYWdlcyIsImZvckVhY2giLCJmaWxlIiwicmVwbGFjZSIsImhyZWYiLCJnZW5lcmF0ZSIsInR5cGUiLCJjbGljayIsInJldm9rZU9iamVjdFVSTCIsIm1lIiwiRGVmZXJyZWQiLCJ3aGVuIiwic2F2ZUltYWdlIiwidGhlbiIsInVybCIsInNhdmVIdG1sIiwiYXJyYXlCdWZmZXIiLCJiIiwibSIsInJlcXVpcmUiLCJqc2RvbSIsIndpbmRvdyIsImRlZmF1bHRWaWV3IiwiZ2xvYmFsIiwiYnRvYSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSUEsY0FBSixFQUFvQkMsbUJBQXBCOztJQUVxQkMsUTs7Ozs7Ozs7Ozs0QkFHWDtBQUNSLFFBQUtDLEdBQUwsR0FBUyxLQUFLQyxXQUFMLENBQWlCQyxNQUFqQixDQUF3QixLQUFLQyxPQUE3QixD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LHNCQW9DYjhCLFdBcENhLEVBb0NEO0FBQ3RCLFNBQUlGLE1BQUl4QixJQUFJQyxlQUFKLENBQW9CLElBQUlDLElBQUosQ0FBUyxDQUFDd0IsV0FBRCxDQUFULEVBQzNCLEVBQUNWLE1BQUssWUFBVSxPQUFPVSxXQUFQLElBQXFCLFFBQXJCLEdBQWdDLFNBQWhDLEdBQTRDLEdBQXRELENBQU4sRUFEMkIsQ0FBcEIsQ0FBUjtBQUVBLFVBQUtoQixNQUFMLENBQVljLEdBQVosSUFBaUJFLFdBQWpCO0FBQ0EsWUFBT0YsR0FBUDtBQUNBLEtBekN1QjtBQTBDeEI3QixZQTFDd0Isc0JBMENkO0FBQ1QseUJBQVksS0FBS2UsTUFBakIsRUFBeUJDLE9BQXpCLENBQWlDLFVBQVNnQixDQUFULEVBQVc7QUFDM0MzQixVQUFJa0IsZUFBSixDQUFvQlMsQ0FBcEI7QUFDQSxNQUZEO0FBR0EsWUFBTyxLQUFLakIsTUFBWjtBQUNBO0FBL0N1QixJQUFsQixDQUFQO0FBaURBOzs7OztrQkEvU21CekgsUTs7O0FBa1RyQixDQUFDLFVBQVNpRyxNQUFULEVBQWlCMEMsQ0FBakIsRUFBbUI7QUFDbkIsS0FBRyxDQUFDMUMsTUFBSixFQUFZOztBQUVabkcsa0JBQWU4SSxRQUFRRCxDQUFSLEVBQVdFLEtBQTFCO0FBQ0EsS0FBSUMsU0FBT2hKLGlCQUFpQmlKLFdBQTVCOztBQUVBQyxRQUFPQyxJQUFQLEdBQVlILE9BQU9HLElBQW5CO0FBQ0FsSix1QkFBb0IrSSxPQUFPL0ksbUJBQTNCO0FBQ0EsQ0FSRCxFQVFHb0UsRUFBRThCLE1BUkwsRUFRYSxPQVJiIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcidcbmltcG9ydCBKU1ppcCBmcm9tICdqc3ppcCdcblxudmFyIGNyZWF0ZURvY3VtZW50LCBDU1NTdHlsZURlY2xhcmF0aW9uXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgQ29udmVydGVye1xuXHRnZXQgdGFnKCl7cmV0dXJuICdodG1sJ31cblxuXHRjb252ZXJ0KCl7XG5cdFx0dGhpcy5kb2M9dGhpcy5jb25zdHJ1Y3Rvci5jcmVhdGUodGhpcy5vcHRpb25zKVxuXHRcdHRoaXMuY29udGVudD10aGlzLmRvY1xuXHRcdGxldCBjb250ZW50U3R5bGU9dGhpcy5jb250ZW50LnN0eWxlXG5cdFx0Y29udGVudFN0eWxlLmJhY2tncm91bmRDb2xvcj0ndHJhbnNwYXJlbnQnXG5cdFx0Y29udGVudFN0eWxlLm1pbkhlaWdodD0nMTAwMHB4J1xuXHRcdGNvbnRlbnRTdHlsZS53aWR0aD0nMTAwJSdcblx0XHRjb250ZW50U3R5bGUucGFkZGluZ1RvcD0nMjBweCdcblx0XHRjb250ZW50U3R5bGUub3ZlcmZsb3c9J2F1dG8nXG5cblx0XHR2YXIgc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJyonKVxuXHRcdHN0eWxlLm1hcmdpbj0nMCdcblx0XHRzdHlsZS5ib3JkZXI9JzAnXG5cdFx0c3R5bGUucGFkZGluZz0nMCdcblx0XHRzdHlsZS5ib3hTaXppbmc9J2JvcmRlci1ib3gnXG5cblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgndGFibGUnKVxuXHRcdHN0eWxlLndpZHRoPScxMDAlJ1xuXHRcdHN0eWxlLmJvcmRlckNvbGxhcHNlPSdjb2xsYXBzZSdcblx0XHRzdHlsZS53b3JkQnJlYWs9J2JyZWFrLXdvcmQnXG5cblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnc2VjdGlvbicpXG5cdFx0c3R5bGUubWFyZ2luPSdhdXRvJ1xuXHRcdHN0eWxlLmJhY2tncm91bmRDb2xvcj0nd2hpdGUnXG5cdFx0c3R5bGUuY29sb3I9J2JsYWNrJ1xuXHRcdHN0eWxlLnBvc2l0aW9uPSdyZWxhdGl2ZSdcblx0XHRzdHlsZS56SW5kZXg9MFxuXG5cdFx0c3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3A6ZW1wdHk6YmVmb3JlJylcblx0XHRzdHlsZS5jb250ZW50PSdcIlwiJ1xuXHRcdHN0eWxlLmRpc3BsYXk9J2lubGluZS1ibG9jaydcblxuXHRcdHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCd1bCcpXG5cdFx0c3R5bGUubGlzdFN0eWxlPVwibm9uZVwiXG5cblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgndWw+bGk+cCcpXG5cdFx0c3R5bGUucG9zaXRpb249J3JlbGF0aXZlJ1xuXG5cdFx0c3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3VsIC5tYXJrZXInKVxuXHRcdHN0eWxlLnBvc2l0aW9uPSdhYnNvbHV0ZSdcblxuXHRcdHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCdhJylcblx0XHRzdHlsZS50ZXh0RGVjb3JhdGlvbj0nbm9uZSdcblxuXHRcdHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCcudW5zdXBwb3J0ZWQnKVxuXHRcdHN0eWxlLm91dGxpbmU9XCIycHggcmVkIHNvbGlkXCJcblxuXHRcdHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCcud2FybmluZycpXG5cdFx0c3R5bGUub3V0bGluZT1cIjFweCB5ZWxsb3cgc29saWRcIlxuXHRcdHRoaXMuY29udmVydFN0eWxlKClcblx0fVxuXHRcblx0Y29udmVydFN0eWxlKCl7XG5cdFx0dmFyIGJnU3R5bGU9dGhpcy53b3JkTW9kZWwuZ2V0QmFja2dyb3VuZFN0eWxlKClcblx0XHRpZighYmdTdHlsZSlcblx0XHRcdHJldHVyblxuXHRcdFxuXHRcdHZhciBzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnc2VjdGlvbicpXG5cdFx0c3dpdGNoKHR5cGVvZiBiZ1N0eWxlKXtcblx0XHRjYXNlICdvYmplY3QnOi8vIGZpbGxcblx0XHRcdGNvbnNvbGUud2Fybignbm90IHN1cHBvcnQgZmlsbCBjb2xvciBvbiBkb2N1bWVudCBiYWNrZ3JvdW5kIHlldCcpXG5cdFx0YnJlYWtcblx0XHRkZWZhdWx0OlxuXHRcdFx0c3R5bGUuYmFja2dyb3VuZENvbG9yPWJnU3R5bGVcblx0XHRicmVha1xuXHRcdH1cblx0fVxuXHQvKipcblx0KiBvcHQ6IHtcblx0KiBcdHRlbXBsYXRlOiBmdW5jdGlvbihzdHlsZSwgaHRtbCwgcHJvcHMpeyByZXR1cm4gKGh0bWwpfSxcblx0XHRleHRlbmRTY3JpcHQ6IFwiaHR0cDovL2EuY29tL2EuanNcIlxuXHRcdH1cblx0Ki9cblx0dG9TdHJpbmcob3B0KXtcblx0XHRyZXR1cm4gdGhpcy5kb2MudG9TdHJpbmcob3B0LHRoaXMucHJvcHMpXG5cdH1cblx0cmVsZWFzZSgpe1xuXHRcdHRoaXMuZG9jLnJlbGVhc2UoKVxuXHR9XG5cdGFzWmlwKG9wdCl7XG5cdFx0cmV0dXJuIHRoaXMuZG9jLmFzWmlwKG9wdCx0aGlzLnByb3BzKVxuXHR9XG5cdGRvd25sb2FkKG9wdCl7XG5cdFx0cmV0dXJuIHRoaXMuZG9jLmRvd25sb2FkKG9wdCwgdGhpcy5wcm9wcylcblx0fVxuXHQvKipcblx0KiBvcHQ9ZXh0ZW5kKHRvU3RyaW5nLm9wdCx7XG5cdFx0c2F2ZUltYWdlOiBmdW5jdGlvbihhcnJheUJ1ZmZlciwgZG9jLnByb3BzKTogcHJvbWlzZSh1cmwpIHt9LFxuXHRcdHNhdmVIdG1sOiBmdW5jdGlvbigpe31cblx0fSlcblx0Ki9cblx0c2F2ZSAob3B0KXtcblx0XHRyZXR1cm4gdGhpcy5kb2Muc2F2ZShvcHQsIHRoaXMucHJvcHMpXG5cdH1cblxuXHRzdGF0aWMgY3JlYXRlKG9wdCl7XG5cdFx0dmFyIHNlbGZDb252ZXJ0ZXI9dGhpc1xuXHRcdHJldHVybiAoZnVuY3Rpb24oZG9jdW1lbnQpe1xuXHRcdFx0dmFyIGRvYz0oZnVuY3Rpb24gYnJvd3NlckRvYygpe1xuXHRcdFx0XHR2YXIgdWlkPTA7XG5cdFx0XHRcdHZhciByb290PU9iamVjdC5hc3NpZ24oZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jykse1xuXHRcdFx0XHRcdGlkIDogXCJBXCIsXG5cdFx0XHRcdFx0c2VjdGlvbjogbnVsbCxcblx0XHRcdFx0XHRjcmVhdGVFbGVtZW50OiBkb2N1bWVudC5jcmVhdGVFbGVtZW50LmJpbmQoZG9jdW1lbnQpLFxuXHRcdFx0XHRcdGNyZWF0ZVRleHROb2RlOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZS5iaW5kKGRvY3VtZW50KSxcblx0XHRcdFx0XHRjcmVhdGVTdHlsZVNoZWV0KCl7XG5cdFx0XHRcdFx0XHRpZih0aGlzLnN0eWxlc2hlZXQpXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnN0eWxlc2hlZXQ7XG5cdFx0XHRcdFx0XHR2YXIgZWxTdHlsZT10aGlzLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcblx0XHRcdFx0XHRcdHRoaXMuYm9keS5hcHBlbmRDaGlsZChlbFN0eWxlLG51bGwpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc3R5bGVzaGVldD1lbFN0eWxlLnNoZWV0XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRnZXRTdHlsZVRleHQoKXtcblx0XHRcdFx0XHRcdHZhciBzdHlsZXM9W11cblx0XHRcdFx0XHRcdGZvcih2YXIgaT0wLCBydWxlcz10aGlzLnN0eWxlc2hlZXQuY3NzUnVsZXMsIGxlbj1ydWxlcy5sZW5ndGg7aTxsZW47aSsrKVxuXHRcdFx0XHRcdFx0XHRzdHlsZXMucHVzaChydWxlc1tpXS5jc3NUZXh0KVxuXHRcdFx0XHRcdFx0cmV0dXJuIHN0eWxlcy5qb2luKCdcXHJcXG4nKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0dWlkKCl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5pZCsodWlkKyspXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR0b1N0cmluZyhvcHQsIHByb3BzKXtcblx0XHRcdFx0XHRcdGlmKG9wdCAmJiB0eXBlb2Ygb3B0LnRlbXBsYXRlIT1cInVuZGVmaW5lZFwiICYmICQuaXNGdW5jdGlvbihvcHQudGVtcGxhdGUpKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gb3B0LnRlbXBsYXRlKHRoaXMuZ2V0U3R5bGVUZXh0KCksIHRoaXMuX2h0bWwoKSwgcHJvcHMpXG5cdFx0XHRcdFx0XHR2YXIgaHRtbD1bJzwhZG9jdHlwZSBodG1sPlxcclxcbjxodG1sPjxoZWFkPjxtZXRhIGNoYXJzZXQ9dXRmLTg+PG1ldGEga2V5PVwiZ2VuZXJhdG9yXCIgdmFsdWU9XCJkb2N4Mmh0bWxcIj48dGl0bGU+JysocHJvcHMubmFtZXx8JycpKyc8L3RpdGxlPjxzdHlsZT4nXVxuXHRcdFx0XHRcdFx0aHRtbC5wdXNoKHRoaXMuZ2V0U3R5bGVUZXh0KCkpXG5cdFx0XHRcdFx0XHRodG1sLnB1c2goJzwvc3R5bGU+PC9oZWFkPjxib2R5PicpXG5cdFx0XHRcdFx0XHRodG1sLnB1c2godGhpcy5faHRtbCgpKVxuXHRcdFx0XHRcdFx0b3B0ICYmIG9wdC5leHRlbmRTY3JpcHQgJiYgaHRtbC5wdXNoKCc8c2NyaXB0IHNyYz1cIicrb3B0LmV4dGVuZFNjcmlwdCsnXCI+PC9zY3JpcHQ+Jylcblx0XHRcdFx0XHRcdGh0bWwucHVzaCgnPC9ib2R5PjxodG1sPicpXG5cdFx0XHRcdFx0XHRyZXR1cm4gaHRtbC5qb2luKCdcXHJcXG4nKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0X2h0bWwoKXtcblx0XHRcdFx0XHRcdHZhciBkaXZzPXRoaXMucXVlcnlTZWxlY3RvckFsbCgncD5kaXYsIHNwYW4+ZGl2Jylcblx0XHRcdFx0XHRcdGlmKGRpdnMubGVuZ3RoPT0wKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vdXRlckhUTUxcblxuXHRcdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0XHQqIGlsbGVnYWwgPHA+IDxkaXYvPiA8L3A+XG5cdFx0XHRcdFx0XHQqIERPTSBvcGVyYXRpb24gZGlyZWN0bHkgaW4gb25sb2FkXG5cdFx0XHRcdFx0XHQqL1xuXHRcdFx0XHRcdFx0dmFyIGRpdmNvbnRhaW5lcj1kb2MuY3JlYXRlRWxlbWVudCgnZGl2JyksIHVpZD0wXG5cdFx0XHRcdFx0XHRkaXZjb250YWluZXIuaWQ9J2RpdmNvbnRhaW5lcidcblx0XHRcdFx0XHRcdGRpdmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5PVwibm9uZVwiXG5cdFx0XHRcdFx0XHR0aGlzLmFwcGVuZENoaWxkKGRpdmNvbnRhaW5lcilcblx0XHRcdFx0XHRcdGZvcih2YXIgaT1kaXZzLmxlbmd0aC0xO2k+LTE7aS0tKXtcblx0XHRcdFx0XHRcdFx0dmFyIGRpdj1kaXZzW2ldLFxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudD1kaXYucGFyZW50Tm9kZTtcblxuXHRcdFx0XHRcdFx0XHRpZighZGl2LmlkKVxuXHRcdFx0XHRcdFx0XHRcdGRpdi5pZD0nX3onKygrK3VpZClcblxuXHRcdFx0XHRcdFx0XHRpZighcGFyZW50LmlkKVxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudC5pZD0nX3knK3VpZFxuXG5cdFx0XHRcdFx0XHRcdGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50JyxwYXJlbnQuaWQpXG5cdFx0XHRcdFx0XHRcdGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLGluZGV4T2YoZGl2LHBhcmVudC5jaGlsZE5vZGVzKSlcblxuXHRcdFx0XHRcdFx0XHRkaXZjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2c1tpXSlcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIGh0bWw9dGhpcy5vdXRlckhUTUwrJ1xcblxccjxzY3JpcHQ+KCcrdGhpcy5fdHJhbnNmb3JtZXIudG9TdHJpbmcoKSsnKSgpOzwvc2NyaXB0Pidcblx0XHRcdFx0XHRcdHRoaXMuX3RyYW5zZm9ybWVyKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaHRtbFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0X3RyYW5zZm9ybWVyKCl7XG5cdFx0XHRcdFx0XHR2YXIgYT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGl2Y29udGFpbmVyJylcblx0XHRcdFx0XHRcdGZvcih2YXIgZGl2cz1hLmNoaWxkTm9kZXMsIGk9ZGl2cy5sZW5ndGgtMTtpPi0xO2ktLSl7XG5cdFx0XHRcdFx0XHRcdHZhciBkaXY9ZGl2c1tpXSxcblx0XHRcdFx0XHRcdFx0XHRwYXJlbnRJZD1kaXYuZ2V0QXR0cmlidXRlKCdkYXRhLXBhcmVudCcpLFxuXHRcdFx0XHRcdFx0XHRcdGluZGV4PXBhcnNlSW50KGRpdi5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSksXG5cdFx0XHRcdFx0XHRcdFx0cGFyZW50PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnK3BhcmVudElkKTtcblx0XHRcdFx0XHRcdFx0cGFyZW50Lmluc2VydEJlZm9yZShkaXYscGFyZW50LmNoaWxkTm9kZXNbaW5kZXhdKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGEpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRmdW5jdGlvbiBpbmRleE9mKGVsLCBlbHMpe1xuXHRcdFx0XHRcdGZvcih2YXIgaT1lbHMubGVuZ3RoLTE7aT4wO2ktLSlcblx0XHRcdFx0XHRcdGlmKGVsPT1lbHNbaV0pXG5cdFx0XHRcdFx0XHRcdHJldHVybiBpXG5cdFx0XHRcdFx0cmV0dXJuIDBcblx0XHRcdFx0fVxuXG5cdFx0XHRcdChvcHQgJiYgb3B0LmNvbnRhaW5lciB8fCBkb2N1bWVudC5ib2R5KS5hcHBlbmRDaGlsZChyb290KTtcblx0XHRcdFx0cm9vdC5ib2R5PXJvb3Rcblx0XHRcdFx0cmV0dXJuIHJvb3Rcblx0XHRcdH0pKCk7XG5cblx0XHRcdHJldHVybiAoZnVuY3Rpb24gbWl4aW4oZG9jKXtcblx0XHRcdFx0dmFyIHN0eWxlc2hlZXQ9ZG9jLmNyZWF0ZVN0eWxlU2hlZXQoKVxuXHRcdFx0XHR2YXIgcmVsU3R5bGVzPXt9LCBzdHlsZXM9e31cblxuXHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzZWxmQ29udmVydGVyWyQuaXNOb2RlID8gJ25vZGVmeScgOiAnYnJvd3NlcmlmeSddKGRvYyxzdHlsZXNoZWV0LCBvcHQpLHtcblx0XHRcdFx0XHRjcmVhdGVTdHlsZShzZWxlY3Rvcil7XG5cdFx0XHRcdFx0XHRpZihzdHlsZXNbc2VsZWN0b3JdKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gc3R5bGVzW3NlbGVjdG9yXVxuXHRcdFx0XHRcdFx0dmFyIHJ1bGVzPXN0eWxlc2hlZXQuY3NzUnVsZXMsbGVuPXJ1bGVzLmxlbmd0aFxuXHRcdFx0XHRcdFx0c3R5bGVzaGVldC5pbnNlcnRSdWxlKHNlbGVjdG9yLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uKGEpe1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBhLnRyaW0oKVswXT09JyMnID8gYSA6ICcjJyt0aGlzLmlkKycgJythXG5cdFx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSkuam9pbignLCcpKyd7fScsbGVuKVxuXHRcdFx0XHRcdFx0cmV0dXJuICBzdHlsZXNbc2VsZWN0b3JdPXN0eWxlc2hlZXQuY3NzUnVsZXNbbGVuXS5zdHlsZVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c3R5bGVQYXRoKGEsIHBhcmVudCl7XG5cdFx0XHRcdFx0XHRpZihwYXJlbnQpXG5cdFx0XHRcdFx0XHRcdHJldHVybiByZWxTdHlsZXNbYV09cGFyZW50XG5cdFx0XHRcdFx0XHR2YXIgcGF0aHM9W2FdLHBhcmVudD1hXG5cdFx0XHRcdFx0XHR3aGlsZShwYXJlbnQ9cmVsU3R5bGVzW3BhcmVudF0pXG5cdFx0XHRcdFx0XHRcdHBhdGhzLnVuc2hpZnQocGFyZW50KVxuXHRcdFx0XHRcdFx0cmV0dXJuIHBhdGhzLmpvaW4oJyAnKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cmVsZWFzZSgpe1xuXHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXMuc2VjdGlvblxuXHRcdFx0XHRcdFx0dGhpcy5fcmVsZWFzZSgpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fSkoZG9jKVxuXHRcdH0pKCQuaXNOb2RlID8gY3JlYXRlRG9jdW1lbnQoKSA6IGRvY3VtZW50KVxuXHR9XG5cblx0c3RhdGljIG5vZGVmeShkb2MsIHN0eWxlc2hlZXQsIG9wdCl7XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oZG9jLHtcblx0XHRcdF9yZWxlYXNlKCl7XG5cblx0XHRcdH0sXG5cdFx0XHRhc0ltYWdlVVJMKGJ1ZmZlcil7XG5cdFx0XHRcdGlmKG9wdCAmJiB0eXBlb2Yob3B0LmFzSW1hZ2VVUkwpIT0ndW5kZWZpbmVkJylcblx0XHRcdFx0XHRyZXR1cm4gb3B0LmFzSW1hZ2VVUkwoYnVmZmVyKVxuXHRcdFx0XHRyZXR1cm4gXCJpbWFnZTovL25vdHN1cHBvcnRcIlxuXHRcdFx0fSxcblx0XHRcdGFzWmlwKCl7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnQnKVxuXHRcdFx0fSxcblx0XHRcdGRvd25sb2FkKCl7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnQnKVxuXHRcdFx0fSxcblx0XHRcdHNhdmUoKXtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCcpXG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG5cdHN0YXRpYyBicm93c2VyaWZ5KGRvYywgc3R5bGVzaGVldCwgb3B0KXtcblx0XHR2YXIgUHJvdG9fQmxvYj0oZnVuY3Rpb24oYSl7XG5cdFx0XHRcdGE9VVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYigpKS5zcGxpdCgnLycpO1xuXHRcdFx0XHRhLnBvcCgpO1xuXHRcdFx0XHRyZXR1cm4gYS5qb2luKCcvJylcblx0XHRcdH0pKCksXG5cdFx0XHRSZWdfUHJvdG9fQmxvYj1uZXcgUmVnRXhwKFByb3RvX0Jsb2IrXCIvKFtcXFxcd1xcXFxkLV0rKVwiLFwiZ2lcIik7XG5cblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihkb2Mse1xuXHRcdFx0YXNaaXAob3B0LCBwcm9wcyl7XG5cdFx0XHRcdHZhciB6aXA9bmV3IEpTWmlwKCksaGFzSW1hZ2U9ZmFsc2U7XG5cdFx0XHRcdHZhciBmPXppcC5mb2xkZXIoJ2ltYWdlcycpXG5cdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMuaW1hZ2VzKS5mb3JFYWNoKGZ1bmN0aW9uKGEpe1xuXHRcdFx0XHRcdGhhc0ltYWdlPXRydWVcblx0XHRcdFx0XHRmLmZpbGUoYS5zcGxpdCgnLycpLnBvcCgpLHRoaXNbYV0pXG5cdFx0XHRcdH0sdGhpcy5pbWFnZXMpXG5cdFx0XHRcdHppcC5maWxlKCdwcm9wcy5qc29uJyxKU09OLnN0cmluZ2lmeShwcm9wcykpO1xuXHRcdFx0XHR6aXAuZmlsZSgnbWFpbi5odG1sJyxoYXNJbWFnZSA/IHRoaXMudG9TdHJpbmcob3B0KS5yZXBsYWNlKFByb3RvX0Jsb2IsJ2ltYWdlcycpIDogdGhpcy50b1N0cmluZygpKVxuXHRcdFx0XHRyZXR1cm4gemlwXG5cdFx0XHR9LFxuXHRcdFx0ZG93bmxvYWQob3B0LCBwcm9wcyl7XG5cdFx0XHRcdHZhciBhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSlcblx0XHRcdFx0YS5ocmVmPVVSTC5jcmVhdGVPYmplY3RVUkwodGhpcy5hc1ppcChvcHQscHJvcHMpLmdlbmVyYXRlKHt0eXBlOidibG9iJ30pKVxuXHRcdFx0XHRhLmRvd25sb2FkPShwcm9wcy5uYW1lfHxcImRvY3VtZW50XCIpKycuemlwJ1xuXHRcdFx0XHRhLmNsaWNrKClcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChhLmhyZWYpXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSlcblx0XHRcdH0sXG5cdFx0XHRzYXZlKG9wdCwgcHJvcHMpe1xuXHRcdFx0XHR2YXIgaGFzSW1hZ2U9ZmFsc2UsIGltYWdlcz17fSwgbWU9dGhpcztcblx0XHRcdFx0cmV0dXJuICQuRGVmZXJyZWQud2hlbigodGhpcy5pbWFnZXMgJiYgT2JqZWN0LmtleXModGhpcy5pbWFnZXMpfHxbXSkubWFwKGZ1bmN0aW9uKGEpe1xuXHRcdFx0XHRcdGhhc0ltYWdlPXRydWVcblx0XHRcdFx0XHRyZXR1cm4gb3B0LnNhdmVJbWFnZSh0aGlzW2FdLHByb3BzKVxuXHRcdFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24odXJsKXtyZXR1cm4gaW1hZ2VzW2FdPXVybH0pXG5cdFx0XHRcdH0sdGhpcy5pbWFnZXMpKVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHZhciBodG1sPW1lLnRvU3RyaW5nKG9wdCwgcHJvcHMpO1xuXHRcdFx0XHRcdGlmKGhhc0ltYWdlKVxuXHRcdFx0XHRcdFx0aHRtbD1odG1sLnJlcGxhY2UoUmVnX1Byb3RvX0Jsb2IsZnVuY3Rpb24oYSxpZCl7cmV0dXJuIGltYWdlc1thXX0pO1xuXHRcdFx0XHRcdHJldHVybiBvcHQuc2F2ZUh0bWwoaHRtbCwgcHJvcHMpXG5cdFx0XHRcdH0pXG5cdFx0XHR9LFxuXHRcdFx0aW1hZ2VzOnt9LFxuXHRcdFx0YXNJbWFnZVVSTChhcnJheUJ1ZmZlcil7XG5cdFx0XHRcdHZhciB1cmw9VVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbYXJyYXlCdWZmZXJdLFxuXHRcdFx0XHRcdHt0eXBlOlwiaW1hZ2UvXCIrKHR5cGVvZihhcnJheUJ1ZmZlcik9PSdzdHJpbmcnID8gJ3N2Zyt4bWwnIDogJyonKX0pKTtcblx0XHRcdFx0dGhpcy5pbWFnZXNbdXJsXT1hcnJheUJ1ZmZlclxuXHRcdFx0XHRyZXR1cm4gdXJsXG5cdFx0XHR9LFxuXHRcdFx0X3JlbGVhc2UoKXtcblx0XHRcdFx0T2JqZWN0LmtleXModGhpcy5pbWFnZXMpLmZvckVhY2goZnVuY3Rpb24oYil7XG5cdFx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChiKVxuXHRcdFx0XHR9KVxuXHRcdFx0XHRkZWxldGUgdGhpcy5pbWFnZXNcblx0XHRcdH1cblx0XHR9KVxuXHR9XG59XG5cbihmdW5jdGlvbihpc05vZGUsIG0pe1xuXHRpZighaXNOb2RlKVx0cmV0dXJuO1xuXG5cdGNyZWF0ZURvY3VtZW50PXJlcXVpcmUobSkuanNkb21cblx0bGV0IHdpbmRvdz1jcmVhdGVEb2N1bWVudCgpLmRlZmF1bHRWaWV3XG5cblx0Z2xvYmFsLmJ0b2E9d2luZG93LmJ0b2Fcblx0Q1NTU3R5bGVEZWNsYXJhdGlvbj13aW5kb3cuQ1NTU3R5bGVEZWNsYXJhdGlvblxufSkoJC5pc05vZGUsIFwianNkb21cIilcbiJdfQ==