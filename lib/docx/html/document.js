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

function isNodejs() {
	return $.isNode;
}

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
			return function (opt, document) {
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
				}(opt);

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
			}(opt, function () {
				if (!$.isNode) return document;else if (typeof this.createDocument != 'undefined') return this.createDocument();

				var mdl = 'jsdom-nogyp',
				    jsdom = require(mdl),
				    createDocument = jsdom.jsdom;

				var CSSStyleDeclaration = require(mdl + '/lib/jsdom/level2/style').dom.level2.core.CSSStyleDeclaration;
				function prop(name) {
					return {
						set: function set(x) {
							this._setProperty(name, x);
						},
						get: function get() {
							return this.getPropertyValue(name);
						},

						enumerable: true,
						configurable: true
					};
				}

				var props = {};
				',-webkit-,-moz-'.split(',').forEach(function (browser) {
					'count,gap,rule'.split(',').forEach(function (a) {
						props[browser + 'column-' + a] = prop(browser + 'column-' + a);
					});
					'transform'.split(',').forEach(function (a) {
						props[browser + a] = prop(browser + a);
					});
				});

				props.backgroundColor = prop('background-color');
				props.color = prop('color');
				props.width = prop('width');
				props.height = prop('height');

				Object.defineProperties(CSSStyleDeclaration.prototype, props);

				global.btoa = function (s) {
					return new Buffer(s).toString('base64');
				};

				this.createDocument = createDocument;
				return createDocument();
			}());
		}
	}, {
		key: 'nodefy',
		value: function nodefy(doc, stylesheet, opt) {
			var mdl = 'jsdom-nogyp',
			    CSSStyleDeclaration = require(mdl + '/lib/jsdom/level2/style').dom.level2.core.CSSStyleDeclaration;

			var _insertRule = stylesheet.insertRule;
			stylesheet.insertRule = function (css, len) {
				_insertRule.apply(this, arguments);
				this.cssRules[len].style = new CSSStyleDeclaration();
			};

			return $.extend(doc, {
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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFHQSxTQUFTLFFBQVQsR0FBbUI7QUFDbEIsUUFBTyxFQUFFLE1BQUYsQ0FEVztDQUFuQjs7SUFJcUI7Ozs7Ozs7Ozs7OzRCQUdYO0FBQ1IsUUFBSyxHQUFMLEdBQVMsS0FBSyxXQUFMLENBQWlCLE1BQWpCLENBQXdCLEtBQUssT0FBTCxDQUFqQyxDQURRO0FBRVIsUUFBSyxPQUFMLEdBQWEsS0FBSyxHQUFMLENBRkw7QUFHUixPQUFJLGVBQWEsS0FBSyxPQUFMLENBQWEsS0FBYixDQUhUO0FBSVIsZ0JBQWEsZUFBYixHQUE2QixhQUE3QixDQUpRO0FBS1IsZ0JBQWEsU0FBYixHQUF1QixRQUF2QixDQUxRO0FBTVIsZ0JBQWEsS0FBYixHQUFtQixNQUFuQixDQU5RO0FBT1IsZ0JBQWEsVUFBYixHQUF3QixNQUF4QixDQVBRO0FBUVIsZ0JBQWEsUUFBYixHQUFzQixNQUF0QixDQVJROztBQVVSLE9BQUksUUFBTSxLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLEdBQXJCLENBQU4sQ0FWSTtBQVdSLFNBQU0sTUFBTixHQUFhLEdBQWIsQ0FYUTtBQVlSLFNBQU0sTUFBTixHQUFhLEdBQWIsQ0FaUTtBQWFSLFNBQU0sT0FBTixHQUFjLEdBQWQsQ0FiUTtBQWNSLFNBQU0sU0FBTixHQUFnQixZQUFoQixDQWRROztBQWdCUixXQUFNLEtBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsT0FBckIsQ0FBTixDQWhCUTtBQWlCUixTQUFNLEtBQU4sR0FBWSxNQUFaLENBakJRO0FBa0JSLFNBQU0sY0FBTixHQUFxQixVQUFyQixDQWxCUTtBQW1CUixTQUFNLFNBQU4sR0FBZ0IsWUFBaEIsQ0FuQlE7O0FBcUJSLFdBQU0sS0FBSyxHQUFMLENBQVMsV0FBVCxDQUFxQixTQUFyQixDQUFOLENBckJRO0FBc0JSLFNB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LElBQVUsR0FBVixDQUFSO09BQWIsQ0FEUCxDQUZtRjtNQUFYLEVBSXZFLEtBQUssTUFBTCxDQUpLLEVBS04sSUFMTSxDQUtELFlBQVU7QUFDZixVQUFJLE9BQUssR0FBRyxRQUFILENBQVksR0FBWixFQUFpQixLQUFqQixDQUFMLENBRFc7QUFFZixVQUFHLFFBQUgsRUFDQyxPQUFLLEtBQUssT0FBTCxDQUFhLGNBQWIsRUFBNEIsVUFBUyxDQUFULEVBQVcsRUFBWCxFQUFjO0FBQUMsY0FBTyxPQUFPLENBQVAsQ0FBUCxDQUFEO09BQWQsQ0FBakMsQ0FERDtBQUVBLGFBQU8sSUFBSSxRQUFKLENBQWEsSUFBYixFQUFtQixLQUFuQixDQUFQLENBSmU7TUFBVixDQUxOLENBRmU7S0FyQlE7O0FBbUN4QixZQUFPLEVBQVA7QUFDQSxvQ0FBVyxhQUFZO0FBQ3RCLFNBQUksTUFBSSxJQUFJLGVBQUosQ0FBb0IsSUFBSSxJQUFKLENBQVMsQ0FBQyxXQUFELENBQVQsRUFDM0IsRUFBQyxNQUFLLFlBQVUsT0FBTyxXQUFQLElBQXFCLFFBQXJCLEdBQWdDLFNBQWhDLEdBQTRDLEdBQTVDLENBQVYsRUFEcUIsQ0FBcEIsQ0FBSixDQURrQjtBQUd0QixVQUFLLE1BQUwsQ0FBWSxHQUFaLElBQWlCLFdBQWpCLENBSHNCO0FBSXRCLFlBQU8sR0FBUCxDQUpzQjtLQXBDQztBQTBDeEIsa0NBQVU7QUFDVCxZQUFPLElBQVAsQ0FBWSxLQUFLLE1BQUwsQ0FBWixDQUF5QixPQUF6QixDQUFpQyxVQUFTLENBQVQsRUFBVztBQUMzQyxVQUFJLGVBQUosQ0FBb0IsQ0FBcEIsRUFEMkM7TUFBWCxDQUFqQyxDQURTO0FBSVQsWUFBTyxLQUFLLE1BQUwsQ0FKRTtLQTFDYztJQUFsQixDQUFQLENBUnNDOzs7O1FBOVJuQiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi9jb252ZXJ0ZXInXG5pbXBvcnQgSlNaaXAgZnJvbSAnanN6aXAnXG5cblxuZnVuY3Rpb24gaXNOb2RlanMoKXtcblx0cmV0dXJuICQuaXNOb2RlXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgQ29udmVydGVye1xuXHRnZXQgdGFnKCl7cmV0dXJuICdodG1sJ31cblx0XG5cdGNvbnZlcnQoKXtcblx0XHR0aGlzLmRvYz10aGlzLmNvbnN0cnVjdG9yLmNyZWF0ZSh0aGlzLm9wdGlvbnMpXG5cdFx0dGhpcy5jb250ZW50PXRoaXMuZG9jXG5cdFx0bGV0IGNvbnRlbnRTdHlsZT10aGlzLmNvbnRlbnQuc3R5bGVcblx0XHRjb250ZW50U3R5bGUuYmFja2dyb3VuZENvbG9yPSd0cmFuc3BhcmVudCdcblx0XHRjb250ZW50U3R5bGUubWluSGVpZ2h0PScxMDAwcHgnXG5cdFx0Y29udGVudFN0eWxlLndpZHRoPScxMDAlJ1xuXHRcdGNvbnRlbnRTdHlsZS5wYWRkaW5nVG9wPScyMHB4J1xuXHRcdGNvbnRlbnRTdHlsZS5vdmVyZmxvdz0nYXV0bydcblxuXHRcdHZhciBzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnKicpXG5cdFx0c3R5bGUubWFyZ2luPScwJ1xuXHRcdHN0eWxlLmJvcmRlcj0nMCdcblx0XHRzdHlsZS5wYWRkaW5nPScwJ1xuXHRcdHN0eWxlLmJveFNpemluZz0nYm9yZGVyLWJveCdcblxuXHRcdHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCd0YWJsZScpXG5cdFx0c3R5bGUud2lkdGg9JzEwMCUnXG5cdFx0c3R5bGUuYm9yZGVyQ29sbGFwc2U9J2NvbGxhcHNlJ1xuXHRcdHN0eWxlLndvcmRCcmVhaz0nYnJlYWstd29yZCdcblxuXHRcdHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCdzZWN0aW9uJylcblx0XHRzdHlsZS5tYXJnaW49J2F1dG8nXG5cdFx0c3R5bGUuYmFja2dyb3VuZENvbG9yPSd3aGl0ZSdcblx0XHRzdHlsZS5jb2xvcj0nYmxhY2snXG5cdFx0c3R5bGUucG9zaXRpb249J3JlbGF0aXZlJ1xuXHRcdHN0eWxlLnpJbmRleD0wXG5cblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgncDplbXB0eTpiZWZvcmUnKVxuXHRcdHN0eWxlLmNvbnRlbnQ9J1wiXCInXG5cdFx0c3R5bGUuZGlzcGxheT0naW5saW5lLWJsb2NrJ1xuXG5cdFx0c3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3VsJylcblx0XHRzdHlsZS5saXN0U3R5bGU9XCJub25lXCJcblxuXHRcdHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCd1bD5saT5wJylcblx0XHRzdHlsZS5wb3NpdGlvbj0ncmVsYXRpdmUnXG5cblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgndWwgLm1hcmtlcicpXG5cdFx0c3R5bGUucG9zaXRpb249J2Fic29sdXRlJ1xuXG5cdFx0c3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ2EnKVxuXHRcdHN0eWxlLnRleHREZWNvcmF0aW9uPSdub25lJ1xuXG5cdFx0c3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJy51bnN1cHBvcnRlZCcpXG5cdFx0c3R5bGUub3V0bGluZT1cIjJweCByZWQgc29saWRcIlxuXG5cdFx0c3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJy53YXJuaW5nJylcblx0XHRzdHlsZS5vdXRsaW5lPVwiMXB4IHllbGxvdyBzb2xpZFwiXG5cdH1cblx0LyoqXG5cdCogb3B0OiB7XG5cdCogXHR0ZW1wbGF0ZTogZnVuY3Rpb24oc3R5bGUsIGh0bWwsIHByb3BzKXsgcmV0dXJuIChodG1sKX0sXG5cdFx0ZXh0ZW5kU2NyaXB0OiBcImh0dHA6Ly9hLmNvbS9hLmpzXCJcblx0XHR9XG5cdCovXG5cdHRvU3RyaW5nKG9wdCl7XG5cdFx0cmV0dXJuIHRoaXMuZG9jLnRvU3RyaW5nKG9wdCx0aGlzLnByb3BzKVxuXHR9XG5cdHJlbGVhc2UoKXtcblx0XHR0aGlzLmRvYy5yZWxlYXNlKClcblx0fVxuXHRhc1ppcChvcHQpe1xuXHRcdHJldHVybiB0aGlzLmRvYy5hc1ppcChvcHQsdGhpcy5wcm9wcylcblx0fVxuXHRkb3dubG9hZChvcHQpe1xuXHRcdHJldHVybiB0aGlzLmRvYy5kb3dubG9hZChvcHQsIHRoaXMucHJvcHMpXG5cdH1cblx0LyoqXG5cdCogb3B0PWV4dGVuZCh0b1N0cmluZy5vcHQse1xuXHRcdHNhdmVJbWFnZTogZnVuY3Rpb24oYXJyYXlCdWZmZXIsIGRvYy5wcm9wcyk6IHByb21pc2UodXJsKSB7fSxcblx0XHRzYXZlSHRtbDogZnVuY3Rpb24oKXt9XG5cdH0pXG5cdCovXG5cdHNhdmUgKG9wdCl7XG5cdFx0cmV0dXJuIHRoaXMuZG9jLnNhdmUob3B0LCB0aGlzLnByb3BzKVxuXHR9XG5cdCBcblx0c3RhdGljIGNyZWF0ZShvcHQpe1xuXHRcdHZhciBzZWxmQ29udmVydGVyPXRoaXNcblx0XHRyZXR1cm4gKGZ1bmN0aW9uKG9wdCxkb2N1bWVudCl7XG5cdFx0XHR2YXIgZG9jPShmdW5jdGlvbiBicm93c2VyRG9jKCl7XG5cdFx0XHRcdHZhciB1aWQ9MDtcblx0XHRcdFx0dmFyIHJvb3Q9T2JqZWN0LmFzc2lnbihkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSx7XG5cdFx0XHRcdFx0aWQgOiBcIkFcIixcblx0XHRcdFx0XHRzZWN0aW9uOiBudWxsLFxuXHRcdFx0XHRcdGNyZWF0ZUVsZW1lbnQ6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQuYmluZChkb2N1bWVudCksXG5cdFx0XHRcdFx0Y3JlYXRlVGV4dE5vZGU6IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlLmJpbmQoZG9jdW1lbnQpLFxuXHRcdFx0XHRcdGNyZWF0ZVN0eWxlU2hlZXQoKXtcblx0XHRcdFx0XHRcdGlmKHRoaXMuc3R5bGVzaGVldClcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc3R5bGVzaGVldDtcblx0XHRcdFx0XHRcdHZhciBlbFN0eWxlPXRoaXMuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuXHRcdFx0XHRcdFx0dGhpcy5ib2R5LmFwcGVuZENoaWxkKGVsU3R5bGUsbnVsbCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zdHlsZXNoZWV0PWVsU3R5bGUuc2hlZXRcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGdldFN0eWxlVGV4dCgpe1xuXHRcdFx0XHRcdFx0dmFyIHN0eWxlcz1bXVxuXHRcdFx0XHRcdFx0Zm9yKHZhciBpPTAsIHJ1bGVzPXRoaXMuc3R5bGVzaGVldC5jc3NSdWxlcywgbGVuPXJ1bGVzLmxlbmd0aDtpPGxlbjtpKyspXG5cdFx0XHRcdFx0XHRcdHN0eWxlcy5wdXNoKHJ1bGVzW2ldLmNzc1RleHQpXG5cdFx0XHRcdFx0XHRyZXR1cm4gc3R5bGVzLmpvaW4oJ1xcclxcbicpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR1aWQoKXtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmlkKyh1aWQrKylcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHRvU3RyaW5nKG9wdCwgcHJvcHMpe1xuXHRcdFx0XHRcdFx0aWYob3B0ICYmIHR5cGVvZiBvcHQudGVtcGxhdGUhPVwidW5kZWZpbmVkXCIgJiYgJC5pc0Z1bmN0aW9uKG9wdC50ZW1wbGF0ZSkpXG5cdFx0XHRcdFx0XHRcdHJldHVybiBvcHQudGVtcGxhdGUodGhpcy5nZXRTdHlsZVRleHQoKSwgdGhpcy5faHRtbCgpLCBwcm9wcylcblx0XHRcdFx0XHRcdHZhciBodG1sPVsnPCFkb2N0eXBlIGh0bWw+XFxyXFxuPGh0bWw+PGhlYWQ+PG1ldGEgY2hhcnNldD11dGYtOD48bWV0YSBrZXk9XCJnZW5lcmF0b3JcIiB2YWx1ZT1cImRvY3gyaHRtbFwiPjx0aXRsZT4nKyhwcm9wcy5uYW1lfHwnJykrJzwvdGl0bGU+PHN0eWxlPiddXG5cdFx0XHRcdFx0XHRodG1sLnB1c2godGhpcy5nZXRTdHlsZVRleHQoKSlcblx0XHRcdFx0XHRcdGh0bWwucHVzaCgnPC9zdHlsZT48L2hlYWQ+PGJvZHk+Jylcblx0XHRcdFx0XHRcdGh0bWwucHVzaCh0aGlzLl9odG1sKCkpXG5cdFx0XHRcdFx0XHRvcHQgJiYgb3B0LmV4dGVuZFNjcmlwdCAmJiBodG1sLnB1c2goJzxzY3JpcHQgc3JjPVwiJytvcHQuZXh0ZW5kU2NyaXB0KydcIj48L3NjcmlwdD4nKVxuXHRcdFx0XHRcdFx0aHRtbC5wdXNoKCc8L2JvZHk+PGh0bWw+Jylcblx0XHRcdFx0XHRcdHJldHVybiBodG1sLmpvaW4oJ1xcclxcbicpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRfaHRtbCgpe1xuXHRcdFx0XHRcdFx0dmFyIGRpdnM9dGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdwPmRpdiwgc3Bhbj5kaXYnKVxuXHRcdFx0XHRcdFx0aWYoZGl2cy5sZW5ndGg9PTApXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLm91dGVySFRNTFxuXG5cdFx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHRcdCogaWxsZWdhbCA8cD4gPGRpdi8+IDwvcD5cblx0XHRcdFx0XHRcdCogRE9NIG9wZXJhdGlvbiBkaXJlY3RseSBpbiBvbmxvYWRcblx0XHRcdFx0XHRcdCovXG5cdFx0XHRcdFx0XHR2YXIgZGl2Y29udGFpbmVyPWRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKSwgdWlkPTBcblx0XHRcdFx0XHRcdGRpdmNvbnRhaW5lci5pZD0nZGl2Y29udGFpbmVyJ1xuXHRcdFx0XHRcdFx0ZGl2Y29udGFpbmVyLnN0eWxlLmRpc3BsYXk9XCJub25lXCJcblx0XHRcdFx0XHRcdHRoaXMuYXBwZW5kQ2hpbGQoZGl2Y29udGFpbmVyKVxuXHRcdFx0XHRcdFx0Zm9yKHZhciBpPWRpdnMubGVuZ3RoLTE7aT4tMTtpLS0pe1xuXHRcdFx0XHRcdFx0XHR2YXIgZGl2PWRpdnNbaV0sXG5cdFx0XHRcdFx0XHRcdFx0cGFyZW50PWRpdi5wYXJlbnROb2RlO1xuXG5cdFx0XHRcdFx0XHRcdGlmKCFkaXYuaWQpXG5cdFx0XHRcdFx0XHRcdFx0ZGl2LmlkPSdfeicrKCsrdWlkKVxuXG5cdFx0XHRcdFx0XHRcdGlmKCFwYXJlbnQuaWQpXG5cdFx0XHRcdFx0XHRcdFx0cGFyZW50LmlkPSdfeScrdWlkXG5cblx0XHRcdFx0XHRcdFx0ZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1wYXJlbnQnLHBhcmVudC5pZClcblx0XHRcdFx0XHRcdFx0ZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsaW5kZXhPZihkaXYscGFyZW50LmNoaWxkTm9kZXMpKVxuXG5cdFx0XHRcdFx0XHRcdGRpdmNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXZzW2ldKVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR2YXIgaHRtbD10aGlzLm91dGVySFRNTCsnXFxuXFxyPHNjcmlwdD4oJyt0aGlzLl90cmFuc2Zvcm1lci50b1N0cmluZygpKycpKCk7PC9zY3JpcHQ+J1xuXHRcdFx0XHRcdFx0dGhpcy5fdHJhbnNmb3JtZXIoKTtcblx0XHRcdFx0XHRcdHJldHVybiBodG1sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRfdHJhbnNmb3JtZXIoKXtcblx0XHRcdFx0XHRcdHZhciBhPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaXZjb250YWluZXInKVxuXHRcdFx0XHRcdFx0Zm9yKHZhciBkaXZzPWEuY2hpbGROb2RlcywgaT1kaXZzLmxlbmd0aC0xO2k+LTE7aS0tKXtcblx0XHRcdFx0XHRcdFx0dmFyIGRpdj1kaXZzW2ldLFxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudElkPWRpdi5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50JyksXG5cdFx0XHRcdFx0XHRcdFx0aW5kZXg9cGFyc2VJbnQoZGl2LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpKSxcblx0XHRcdFx0XHRcdFx0XHRwYXJlbnQ9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycrcGFyZW50SWQpO1xuXHRcdFx0XHRcdFx0XHRwYXJlbnQuaW5zZXJ0QmVmb3JlKGRpdixwYXJlbnQuY2hpbGROb2Rlc1tpbmRleF0pXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRhLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGZ1bmN0aW9uIGluZGV4T2YoZWwsIGVscyl7XG5cdFx0XHRcdFx0Zm9yKHZhciBpPWVscy5sZW5ndGgtMTtpPjA7aS0tKVxuXHRcdFx0XHRcdFx0aWYoZWw9PWVsc1tpXSlcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGlcblx0XHRcdFx0XHRyZXR1cm4gMFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0KG9wdCAmJiBvcHQuY29udGFpbmVyIHx8IGRvY3VtZW50LmJvZHkpLmFwcGVuZENoaWxkKHJvb3QpO1xuXHRcdFx0XHRyb290LmJvZHk9cm9vdFxuXHRcdFx0XHRyZXR1cm4gcm9vdFxuXHRcdFx0fSkob3B0KTtcblxuXHRcdFx0cmV0dXJuIChmdW5jdGlvbiBtaXhpbihkb2Mpe1xuXHRcdFx0XHR2YXIgc3R5bGVzaGVldD1kb2MuY3JlYXRlU3R5bGVTaGVldCgpXG5cdFx0XHRcdHZhciByZWxTdHlsZXM9e30sIHN0eWxlcz17fVxuXG5cdFx0XHRcdHJldHVybiBPYmplY3QuYXNzaWduKHNlbGZDb252ZXJ0ZXJbJC5pc05vZGUgPyAnbm9kZWZ5JyA6ICdicm93c2VyaWZ5J10oZG9jLHN0eWxlc2hlZXQsIG9wdCkse1xuXHRcdFx0XHRcdGNyZWF0ZVN0eWxlKHNlbGVjdG9yKXtcblx0XHRcdFx0XHRcdGlmKHN0eWxlc1tzZWxlY3Rvcl0pXG5cdFx0XHRcdFx0XHRcdHJldHVybiBzdHlsZXNbc2VsZWN0b3JdXG5cdFx0XHRcdFx0XHR2YXIgcnVsZXM9c3R5bGVzaGVldC5jc3NSdWxlcyxsZW49cnVsZXMubGVuZ3RoXG5cdFx0XHRcdFx0XHRzdHlsZXNoZWV0Lmluc2VydFJ1bGUoc2VsZWN0b3Iuc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24oYSl7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGEudHJpbSgpWzBdPT0nIycgPyBhIDogJyMnK3RoaXMuaWQrJyAnK2Fcblx0XHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKS5qb2luKCcsJykrJ3t9JyxsZW4pXG5cdFx0XHRcdFx0XHRyZXR1cm4gIHN0eWxlc1tzZWxlY3Rvcl09c3R5bGVzaGVldC5jc3NSdWxlc1tsZW5dLnN0eWxlXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzdHlsZVBhdGgoYSwgcGFyZW50KXtcblx0XHRcdFx0XHRcdGlmKHBhcmVudClcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJlbFN0eWxlc1thXT1wYXJlbnRcblx0XHRcdFx0XHRcdHZhciBwYXRocz1bYV0scGFyZW50PWFcblx0XHRcdFx0XHRcdHdoaWxlKHBhcmVudD1yZWxTdHlsZXNbcGFyZW50XSlcblx0XHRcdFx0XHRcdFx0cGF0aHMudW5zaGlmdChwYXJlbnQpXG5cdFx0XHRcdFx0XHRyZXR1cm4gcGF0aHMuam9pbignICcpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRyZWxlYXNlKCl7XG5cdFx0XHRcdFx0XHRkZWxldGUgdGhpcy5zZWN0aW9uXG5cdFx0XHRcdFx0XHR0aGlzLl9yZWxlYXNlKClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9KShkb2MpXG5cdFx0fSkob3B0LCAoZnVuY3Rpb24oKXtcblx0XHRcdFx0aWYoISQuaXNOb2RlKVxuXHRcdFx0XHRcdHJldHVybiBkb2N1bWVudFxuXHRcdFx0XHRlbHNlIGlmKHR5cGVvZih0aGlzLmNyZWF0ZURvY3VtZW50KSE9J3VuZGVmaW5lZCcpXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuY3JlYXRlRG9jdW1lbnQoKVxuXG5cdFx0XHRcdHZhciBtZGw9J2pzZG9tLW5vZ3lwJyxcblx0XHRcdFx0XHRqc2RvbT1yZXF1aXJlKG1kbCksXG5cdFx0XHRcdFx0Y3JlYXRlRG9jdW1lbnQ9anNkb20uanNkb207XG5cblx0XHRcdFx0dmFyIENTU1N0eWxlRGVjbGFyYXRpb249cmVxdWlyZShtZGwrJy9saWIvanNkb20vbGV2ZWwyL3N0eWxlJykuZG9tLmxldmVsMi5jb3JlLkNTU1N0eWxlRGVjbGFyYXRpb25cblx0XHRcdFx0ZnVuY3Rpb24gcHJvcChuYW1lKXtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0c2V0KHgpe1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9zZXRQcm9wZXJ0eShuYW1lLCB4KVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGdldCgpe1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBwcm9wcz17fVxuXHRcdFx0XHQnLC13ZWJraXQtLC1tb3otJy5zcGxpdCgnLCcpLmZvckVhY2goZnVuY3Rpb24oYnJvd3Nlcil7XG5cdFx0XHRcdFx0J2NvdW50LGdhcCxydWxlJy5zcGxpdCgnLCcpLmZvckVhY2goZnVuY3Rpb24oYSl7XG5cdFx0XHRcdFx0XHRwcm9wc1ticm93c2VyKydjb2x1bW4tJythXT1wcm9wKGJyb3dzZXIrJ2NvbHVtbi0nK2EpXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQndHJhbnNmb3JtJy5zcGxpdCgnLCcpLmZvckVhY2goZnVuY3Rpb24oYSl7XG5cdFx0XHRcdFx0XHRwcm9wc1ticm93c2VyK2FdPXByb3AoYnJvd3NlcithKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH0pXG5cblx0XHRcdFx0cHJvcHMuYmFja2dyb3VuZENvbG9yPXByb3AoJ2JhY2tncm91bmQtY29sb3InKVxuXHRcdFx0XHRwcm9wcy5jb2xvcj1wcm9wKCdjb2xvcicpXG5cdFx0XHRcdHByb3BzLndpZHRoPXByb3AoJ3dpZHRoJylcblx0XHRcdFx0cHJvcHMuaGVpZ2h0PXByb3AoJ2hlaWdodCcpXG5cblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQ1NTU3R5bGVEZWNsYXJhdGlvbi5wcm90b3R5cGUscHJvcHMpXG5cblx0XHRcdFx0Z2xvYmFsLmJ0b2E9ZnVuY3Rpb24ocyl7XG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBCdWZmZXIocykudG9TdHJpbmcoJ2Jhc2U2NCcpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmNyZWF0ZURvY3VtZW50PWNyZWF0ZURvY3VtZW50XG5cdFx0XHRcdHJldHVybiBjcmVhdGVEb2N1bWVudCgpXG5cdFx0XHR9KSgpKVxuXHR9XG5cdFxuXHRzdGF0aWMgbm9kZWZ5KGRvYywgc3R5bGVzaGVldCwgb3B0KXtcblx0XHR2YXIgbWRsPSdqc2RvbS1ub2d5cCcsXG5cdFx0XHRDU1NTdHlsZURlY2xhcmF0aW9uPXJlcXVpcmUobWRsKycvbGliL2pzZG9tL2xldmVsMi9zdHlsZScpLmRvbS5sZXZlbDIuY29yZS5DU1NTdHlsZURlY2xhcmF0aW9uO1xuXG5cblx0XHR2YXIgX2luc2VydFJ1bGU9c3R5bGVzaGVldC5pbnNlcnRSdWxlXG5cdFx0c3R5bGVzaGVldC5pbnNlcnRSdWxlPWZ1bmN0aW9uKGNzcywgbGVuKXtcblx0XHRcdF9pbnNlcnRSdWxlLmFwcGx5KHRoaXMsYXJndW1lbnRzKVxuXHRcdFx0dGhpcy5jc3NSdWxlc1tsZW5dLnN0eWxlPW5ldyBDU1NTdHlsZURlY2xhcmF0aW9uKClcblx0XHR9XG5cblx0XHRyZXR1cm4gJC5leHRlbmQoZG9jLHtcblx0XHRcdF9yZWxlYXNlKCl7XG5cdFx0XHRcdFxuXHRcdFx0fSxcblx0XHRcdGFzSW1hZ2VVUkwoYnVmZmVyKXtcblx0XHRcdFx0aWYob3B0ICYmIHR5cGVvZihvcHQuYXNJbWFnZVVSTCkhPSd1bmRlZmluZWQnKVxuXHRcdFx0XHRcdHJldHVybiBvcHQuYXNJbWFnZVVSTChidWZmZXIpXG5cdFx0XHRcdHJldHVybiBcImltYWdlOi8vbm90c3VwcG9ydFwiXG5cdFx0XHR9LFxuXHRcdFx0YXNaaXAoKXtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCcpXG5cdFx0XHR9LFxuXHRcdFx0ZG93bmxvYWQoKXtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCcpXG5cdFx0XHR9LFxuXHRcdFx0c2F2ZSgpe1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0Jylcblx0XHRcdH1cblx0XHR9KVxuXHR9XG5cdFxuXHRzdGF0aWMgYnJvd3NlcmlmeShkb2MsIHN0eWxlc2hlZXQsIG9wdCl7XG5cdFx0dmFyIFByb3RvX0Jsb2I9KGZ1bmN0aW9uKGEpe1xuXHRcdFx0XHRhPVVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoKSkuc3BsaXQoJy8nKTtcblx0XHRcdFx0YS5wb3AoKTtcblx0XHRcdFx0cmV0dXJuIGEuam9pbignLycpXG5cdFx0XHR9KSgpLFxuXHRcdFx0UmVnX1Byb3RvX0Jsb2I9bmV3IFJlZ0V4cChQcm90b19CbG9iK1wiLyhbXFxcXHdcXFxcZC1dKylcIixcImdpXCIpO1xuXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oZG9jLHtcblx0XHRcdGFzWmlwKG9wdCwgcHJvcHMpe1xuXHRcdFx0XHR2YXIgemlwPW5ldyBKU1ppcCgpLGhhc0ltYWdlPWZhbHNlO1xuXHRcdFx0XHR2YXIgZj16aXAuZm9sZGVyKCdpbWFnZXMnKVxuXHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLmltYWdlcykuZm9yRWFjaChmdW5jdGlvbihhKXtcblx0XHRcdFx0XHRoYXNJbWFnZT10cnVlXG5cdFx0XHRcdFx0Zi5maWxlKGEuc3BsaXQoJy8nKS5wb3AoKSx0aGlzW2FdKVxuXHRcdFx0XHR9LHRoaXMuaW1hZ2VzKVxuXHRcdFx0XHR6aXAuZmlsZSgncHJvcHMuanNvbicsSlNPTi5zdHJpbmdpZnkocHJvcHMpKTtcblx0XHRcdFx0emlwLmZpbGUoJ21haW4uaHRtbCcsaGFzSW1hZ2UgPyB0aGlzLnRvU3RyaW5nKG9wdCkucmVwbGFjZShQcm90b19CbG9iLCdpbWFnZXMnKSA6IHRoaXMudG9TdHJpbmcoKSlcblx0XHRcdFx0cmV0dXJuIHppcFxuXHRcdFx0fSxcblx0XHRcdGRvd25sb2FkKG9wdCwgcHJvcHMpe1xuXHRcdFx0XHR2YXIgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKVxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpXG5cdFx0XHRcdGEuaHJlZj1VUkwuY3JlYXRlT2JqZWN0VVJMKHRoaXMuYXNaaXAob3B0LHByb3BzKS5nZW5lcmF0ZSh7dHlwZTonYmxvYid9KSlcblx0XHRcdFx0YS5kb3dubG9hZD0ocHJvcHMubmFtZXx8XCJkb2N1bWVudFwiKSsnLnppcCdcblx0XHRcdFx0YS5jbGljaygpXG5cdFx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwoYS5ocmVmKVxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpXG5cdFx0XHR9LFxuXHRcdFx0c2F2ZShvcHQsIHByb3BzKXtcblx0XHRcdFx0dmFyIGhhc0ltYWdlPWZhbHNlLCBpbWFnZXM9e30sIG1lPXRoaXM7XG5cdFx0XHRcdHJldHVybiAkLkRlZmVycmVkLndoZW4oKHRoaXMuaW1hZ2VzICYmIE9iamVjdC5rZXlzKHRoaXMuaW1hZ2VzKXx8W10pLm1hcChmdW5jdGlvbihhKXtcblx0XHRcdFx0XHRoYXNJbWFnZT10cnVlXG5cdFx0XHRcdFx0cmV0dXJuIG9wdC5zYXZlSW1hZ2UodGhpc1thXSxwcm9wcylcblx0XHRcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKHVybCl7cmV0dXJuIGltYWdlc1thXT11cmx9KVxuXHRcdFx0XHR9LHRoaXMuaW1hZ2VzKSlcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKXtcblx0XHRcdFx0XHR2YXIgaHRtbD1tZS50b1N0cmluZyhvcHQsIHByb3BzKTtcblx0XHRcdFx0XHRpZihoYXNJbWFnZSlcblx0XHRcdFx0XHRcdGh0bWw9aHRtbC5yZXBsYWNlKFJlZ19Qcm90b19CbG9iLGZ1bmN0aW9uKGEsaWQpe3JldHVybiBpbWFnZXNbYV19KTtcblx0XHRcdFx0XHRyZXR1cm4gb3B0LnNhdmVIdG1sKGh0bWwsIHByb3BzKVxuXHRcdFx0XHR9KVxuXHRcdFx0fSxcblx0XHRcdGltYWdlczp7fSxcblx0XHRcdGFzSW1hZ2VVUkwoYXJyYXlCdWZmZXIpe1xuXHRcdFx0XHR2YXIgdXJsPVVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW2FycmF5QnVmZmVyXSxcblx0XHRcdFx0XHR7dHlwZTpcImltYWdlL1wiKyh0eXBlb2YoYXJyYXlCdWZmZXIpPT0nc3RyaW5nJyA/ICdzdmcreG1sJyA6ICcqJyl9KSk7XG5cdFx0XHRcdHRoaXMuaW1hZ2VzW3VybF09YXJyYXlCdWZmZXJcblx0XHRcdFx0cmV0dXJuIHVybFxuXHRcdFx0fSxcblx0XHRcdF9yZWxlYXNlKCl7XG5cdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMuaW1hZ2VzKS5mb3JFYWNoKGZ1bmN0aW9uKGIpe1xuXHRcdFx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwoYilcblx0XHRcdFx0fSlcblx0XHRcdFx0ZGVsZXRlIHRoaXMuaW1hZ2VzXG5cdFx0XHR9XG5cdFx0fSlcblx0fVxufSJdfQ==