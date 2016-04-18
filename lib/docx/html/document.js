'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
			this.convertStyle();
		}
	}, {
		key: 'convertStyle',
		value: function convertStyle() {
			var bgStyle = this.wordModel.getBackgroundStyle();
			if (!bgStyle) return;

			var style = this.doc.createStyle('section');
			switch (typeof bgStyle === 'undefined' ? 'undefined' : _typeof(bgStyle)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQUksY0FBSixFQUFvQixtQkFBcEI7O0lBRXFCOzs7Ozs7Ozs7Ozs0QkFHWDtBQUNSLFFBQUssR0FBTCxHQUFTLEtBQUssV0FBTCxDQUFpQixNQUFqQixDQUF3QixLQUFLLE9BQUwsQ0FBakMsQ0FEUTtBQUVSLFFBQUssT0FBTCxHQUFhLEtBQUssR0FBTCxDQUZMO0FBR1IsT0FBSSxlQUFhLEtBQUssT0FBTCxDQUFhLEtBQWIsQ0FIVDtBQUlSLGdCQUFhLGVBQWIsR0FBNkIsYUFBN0IsQ0FKUTtBQUtSLGdCQUFhLFNBQWIsR0FBdUIsUUFBdkIsQ0FMUTtBQU1SLGdCQUFhLEtBQWIsR0FBbUIsTUFBbkIsQ0FOUTtBQU9SLGdCQUFhLFVBQWIsR0FBd0IsTUFBeEIsQ0FQUTtBQVFSLGdCQUFhLFFBQWIsR0FBc0IsTUFBdEIsQ0FSUTs7QUFVUixPQUFJLFFBQU0sS0FBSyxHQUFMLENBQVMsV0FBVCxDQUFxQixHQUFyQixDQUFOLENBVkk7QUFXUixTQUFNLE1BQU4sR0FBYSxHQUFiLENBWFE7QUFZUixTQUFNLE1BQU4sR0FBYSxHQUFiLENBWlE7QUFhUixTQUFNLE9BQU4sR0FBYyxHQUFkLENBYlE7QUFjUixTQUFNLFNBQU4sR0FBZ0IsWUFBaEIsQ0FkUTs7QUFnQlIsV0FBTSxLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLE9BQXJCLENBQU4sQ0FoQlE7QUFpQlIsU0FBTSxLQUFOLEdBQVksTUFBWixDQWpCUTtBQWtCUixTQUFNLGNBQU4sR0FBcUIsVUFBckIsQ0FsQlE7QUFtQlIsU0FBTSxTQUFOLEdBQWdCLFlBQWhCLENBbkJROztBQXFCUixXQUFNLEtBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsU0FBckIsQ0FBTixDQXJCUTtBQXNCUixTQUFNLE1BQU4sR0FBYSxNQUFiLENBdEJRO0FBdUJSLFNBQU0sZUFBTixHQUFzQixPQUF0QixDQXZCUTtBQXdCUixTQUFNLEtBQU4sR0FBWSxPQUFaLENBeEJRO0FBeUJSLFNBQU0sUUFBTixHQUFlLFVBQWYsQ0F6QlE7QUEwQlIsU0FBTSxNQUFOLEdBQWEsQ0FBYixDQTFCUTs7QUE0QlIsV0FBTSxLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLGdCQUFyQixDQUFOLENBNUJRO0FBNkJSLFNBQU0sT0FBTixHQUFjLElBQWQsQ0E3QlE7QUE4QlIsU0FBTSxPQUFOLEdBQWMsY0FBZCxDQTlCUTs7QUFnQ1IsV0FBTSxLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLElBQXJCLENBQU4sQ0FoQ1E7QUFpQ1IsU0FBTSxTQUFOLEdBQWdCLE1BQWhCLENBakNROztBQW1DUixXQUFNLEtBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsU0FBckIsQ0FBTixDQW5DUTtBQW9DUixTQUFNLFFBQU4sR0FBZSxVQUFmLENBcENROztBQXNDUixXQUFNLEtBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsWUFBckIsQ0FBTixDQXRDUTtBQXVDUixTQUFNLFFBQU4sR0FBZSxVQUFmLENBdkNROztBQXlDUixXQUFNLEtBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsR0FBckIsQ0FBTixDQXpDUTtBQTBDUixTQUFNLGNBQU4sR0FBcUIsTUFBckIsQ0ExQ1E7O0FBNENSLFdBQU0sS0FBSyxHQUFMLENBQVMsV0FBVCxDQUFxQixjQUFyQixDQUFOLENBNUNRO0FBNkNSLFNBQU0sT0FBTixHQUFjLGVBQWQsQ0E3Q1E7O0FBK0NSLFdBQU0sS0FBSyxHQUFMLENBQVMsV0FBVCxDQUFxQixVQUFyQixDQUFOLENBL0NRO0FBZ0RSLFNBQU0sT0FBTixHQUFjLGtCQUFkLENBaERRO0FBaURSLFFBQUssWUFBTCxHQWpEUTs7OztpQ0FvREs7QUFDYixPQUFJLFVBQVEsS0FBSyxTQUFMLENBQWUsa0JBQWYsRUFBUixDQURTO0FBRWIsT0FBRyxDQUFDLE9BQUQsRUFDRixPQUREOztBQUdBLE9BQUksUUFBTSxLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLFNBQXJCLENBQU4sQ0FMUztBQU1iLGtCQUFjLHdEQUFkO0FBQ0EsU0FBSyxRQUFMOztBQUNDLGFBQVEsSUFBUixDQUFhLG1EQUFiLEVBREQ7QUFFQSxXQUZBO0FBREE7QUFLQyxXQUFNLGVBQU4sR0FBc0IsT0FBdEIsQ0FERDtBQUVBLFdBRkE7QUFKQSxJQU5hOzs7Ozs7Ozs7OzsyQkFxQkwsS0FBSTtBQUNaLFVBQU8sS0FBSyxHQUFMLENBQVMsUUFBVCxDQUFrQixHQUFsQixFQUFzQixLQUFLLEtBQUwsQ0FBN0IsQ0FEWTs7Ozs0QkFHSjtBQUNSLFFBQUssR0FBTCxDQUFTLE9BQVQsR0FEUTs7Ozt3QkFHSCxLQUFJO0FBQ1QsVUFBTyxLQUFLLEdBQUwsQ0FBUyxLQUFULENBQWUsR0FBZixFQUFtQixLQUFLLEtBQUwsQ0FBMUIsQ0FEUzs7OzsyQkFHRCxLQUFJO0FBQ1osVUFBTyxLQUFLLEdBQUwsQ0FBUyxRQUFULENBQWtCLEdBQWxCLEVBQXVCLEtBQUssS0FBTCxDQUE5QixDQURZOzs7Ozs7Ozs7Ozt1QkFTUCxLQUFJO0FBQ1QsVUFBTyxLQUFLLEdBQUwsQ0FBUyxJQUFULENBQWMsR0FBZCxFQUFtQixLQUFLLEtBQUwsQ0FBMUIsQ0FEUzs7OztzQkE3RkQ7QUFBQyxVQUFPLE1BQVAsQ0FBRDs7Ozt5QkFpR0ssS0FBSTtBQUNqQixPQUFJLGdCQUFjLElBQWQsQ0FEYTtBQUVqQixVQUFPLFVBQVUsUUFBVCxFQUFrQjtBQUN6QixRQUFJLE1BQUksU0FBVSxVQUFULEdBQXFCO0FBQzdCLFNBQUksT0FBSSxDQUFKLENBRHlCO0FBRTdCLFNBQUksT0FBSyxPQUFPLE1BQVAsQ0FBYyxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBZCxFQUE0QztBQUNwRCxVQUFLLEdBQUw7QUFDQSxlQUFTLElBQVQ7QUFDQSxxQkFBZSxTQUFTLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBNEIsUUFBNUIsQ0FBZjtBQUNBLHNCQUFnQixTQUFTLGNBQVQsQ0FBd0IsSUFBeEIsQ0FBNkIsUUFBN0IsQ0FBaEI7QUFDQSxvREFBa0I7QUFDakIsV0FBRyxLQUFLLFVBQUwsRUFDRixPQUFPLEtBQUssVUFBTCxDQURSO0FBRUEsV0FBSSxVQUFRLEtBQUssYUFBTCxDQUFtQixPQUFuQixDQUFSLENBSGE7QUFJakIsWUFBSyxJQUFMLENBQVUsV0FBVixDQUFzQixPQUF0QixFQUE4QixJQUE5QixFQUppQjtBQUtqQixjQUFPLEtBQUssVUFBTCxHQUFnQixRQUFRLEtBQVIsQ0FMTjtPQUxrQztBQVlwRCw0Q0FBYztBQUNiLFdBQUksU0FBTyxFQUFQLENBRFM7QUFFYixZQUFJLElBQUksSUFBRSxDQUFGLEVBQUssUUFBTSxLQUFLLFVBQUwsQ0FBZ0IsUUFBaEIsRUFBMEIsTUFBSSxNQUFNLE1BQU4sRUFBYSxJQUFFLEdBQUYsRUFBTSxHQUFwRTtBQUNDLGVBQU8sSUFBUCxDQUFZLE1BQU0sQ0FBTixFQUFTLE9BQVQsQ0FBWjtRQURELE9BRU8sT0FBTyxJQUFQLENBQVksTUFBWixDQUFQLENBSmE7T0Fac0M7QUFrQnBELDBCQUFLO0FBQ0osY0FBTyxLQUFLLEVBQUwsR0FBUyxNQUFULENBREg7T0FsQitDO0FBcUJwRCxrQ0FBUyxLQUFLLE9BQU07QUFDbkIsV0FBRyxPQUFPLE9BQU8sSUFBSSxRQUFKLElBQWMsV0FBckIsSUFBb0MsRUFBRSxVQUFGLENBQWEsSUFBSSxRQUFKLENBQXhELEVBQ0YsT0FBTyxJQUFJLFFBQUosQ0FBYSxLQUFLLFlBQUwsRUFBYixFQUFrQyxLQUFLLEtBQUwsRUFBbEMsRUFBZ0QsS0FBaEQsQ0FBUCxDQUREO0FBRUEsV0FBSSxPQUFLLENBQUMsd0dBQXNHLE1BQU0sSUFBTixJQUFZLEVBQVosQ0FBdEcsR0FBc0gsaUJBQXRILENBQU4sQ0FIZTtBQUluQixZQUFLLElBQUwsQ0FBVSxLQUFLLFlBQUwsRUFBVixFQUptQjtBQUtuQixZQUFLLElBQUwsQ0FBVSx1QkFBVixFQUxtQjtBQU1uQixZQUFLLElBQUwsQ0FBVSxLQUFLLEtBQUwsRUFBVixFQU5tQjtBQU9uQixjQUFPLElBQUksWUFBSixJQUFvQixLQUFLLElBQUwsQ0FBVSxrQkFBZ0IsSUFBSSxZQUFKLEdBQWlCLGFBQWpDLENBQXJDLENBUG1CO0FBUW5CLFlBQUssSUFBTCxDQUFVLGVBQVYsRUFSbUI7QUFTbkIsY0FBTyxLQUFLLElBQUwsQ0FBVSxNQUFWLENBQVAsQ0FUbUI7T0FyQmdDO0FBZ0NwRCw4QkFBTztBQUNOLFdBQUksT0FBSyxLQUFLLGdCQUFMLENBQXNCLGlCQUF0QixDQUFMLENBREU7QUFFTixXQUFHLEtBQUssTUFBTCxJQUFhLENBQWIsRUFDRixPQUFPLEtBQUssU0FBTCxDQURSOzs7Ozs7QUFGTSxXQVNGLGVBQWEsSUFBSSxhQUFKLENBQWtCLEtBQWxCLENBQWI7V0FBdUMsTUFBSSxDQUFKLENBVHJDO0FBVU4sb0JBQWEsRUFBYixHQUFnQixjQUFoQixDQVZNO0FBV04sb0JBQWEsS0FBYixDQUFtQixPQUFuQixHQUEyQixNQUEzQixDQVhNO0FBWU4sWUFBSyxXQUFMLENBQWlCLFlBQWpCLEVBWk07QUFhTixZQUFJLElBQUksSUFBRSxLQUFLLE1BQUwsR0FBWSxDQUFaLEVBQWMsSUFBRSxDQUFDLENBQUQsRUFBRyxHQUE3QixFQUFpQztBQUNoQyxZQUFJLE1BQUksS0FBSyxDQUFMLENBQUo7WUFDSCxTQUFPLElBQUksVUFBSixDQUZ3Qjs7QUFJaEMsWUFBRyxDQUFDLElBQUksRUFBSixFQUNILElBQUksRUFBSixHQUFPLE9BQU0sRUFBRSxHQUFGLENBRGQ7O0FBR0EsWUFBRyxDQUFDLE9BQU8sRUFBUCxFQUNILE9BQU8sRUFBUCxHQUFVLE9BQUssR0FBTCxDQURYOztBQUdBLFlBQUksWUFBSixDQUFpQixhQUFqQixFQUErQixPQUFPLEVBQVAsQ0FBL0IsQ0FWZ0M7QUFXaEMsWUFBSSxZQUFKLENBQWlCLFlBQWpCLEVBQThCLFFBQVEsR0FBUixFQUFZLE9BQU8sVUFBUCxDQUExQyxFQVhnQzs7QUFhaEMscUJBQWEsV0FBYixDQUF5QixLQUFLLENBQUwsQ0FBekIsRUFiZ0M7UUFBakM7O0FBZ0JBLFdBQUksT0FBSyxLQUFLLFNBQUwsR0FBZSxlQUFmLEdBQStCLEtBQUssWUFBTCxDQUFrQixRQUFsQixFQUEvQixHQUE0RCxlQUE1RCxDQTdCSDtBQThCTixZQUFLLFlBQUwsR0E5Qk07QUErQk4sY0FBTyxJQUFQLENBL0JNO09BaEM2QztBQWlFcEQsNENBQWM7QUFDYixXQUFJLElBQUUsU0FBUyxhQUFULENBQXVCLGVBQXZCLENBQUYsQ0FEUztBQUViLFlBQUksSUFBSSxPQUFLLEVBQUUsVUFBRixFQUFjLElBQUUsS0FBSyxNQUFMLEdBQVksQ0FBWixFQUFjLElBQUUsQ0FBQyxDQUFELEVBQUcsR0FBaEQsRUFBb0Q7QUFDbkQsWUFBSSxNQUFJLEtBQUssQ0FBTCxDQUFKO1lBQ0gsV0FBUyxJQUFJLFlBQUosQ0FBaUIsYUFBakIsQ0FBVDtZQUNBLFFBQU0sU0FBUyxJQUFJLFlBQUosQ0FBaUIsWUFBakIsQ0FBVCxDQUFOO1lBQ0EsU0FBTyxTQUFTLGFBQVQsQ0FBdUIsTUFBSSxRQUFKLENBQTlCLENBSmtEO0FBS25ELGVBQU8sWUFBUCxDQUFvQixHQUFwQixFQUF3QixPQUFPLFVBQVAsQ0FBa0IsS0FBbEIsQ0FBeEIsRUFMbUQ7UUFBcEQ7QUFPQSxTQUFFLFVBQUYsQ0FBYSxXQUFiLENBQXlCLENBQXpCLEVBVGE7T0FqRXNDO01BQTVDLENBQUwsQ0FGeUI7O0FBZ0Y3QixjQUFTLE9BQVQsQ0FBaUIsRUFBakIsRUFBcUIsR0FBckIsRUFBeUI7QUFDeEIsV0FBSSxJQUFJLElBQUUsSUFBSSxNQUFKLEdBQVcsQ0FBWCxFQUFhLElBQUUsQ0FBRixFQUFJLEdBQTNCO0FBQ0MsV0FBRyxNQUFJLElBQUksQ0FBSixDQUFKLEVBQ0YsT0FBTyxDQUFQLENBREQ7T0FERCxPQUdPLENBQVAsQ0FKd0I7TUFBekI7O0FBT0EsTUFBQyxPQUFPLElBQUksU0FBSixJQUFpQixTQUFTLElBQVQsQ0FBekIsQ0FBd0MsV0FBeEMsQ0FBb0QsSUFBcEQsRUF2RjZCO0FBd0Y3QixVQUFLLElBQUwsR0FBVSxJQUFWLENBeEY2QjtBQXlGN0IsWUFBTyxJQUFQLENBekY2QjtLQUFyQixFQUFMLENBRHFCOztBQTZGekIsV0FBTyxTQUFVLEtBQVQsQ0FBZSxHQUFmLEVBQW1CO0FBQzFCLFNBQUksYUFBVyxJQUFJLGdCQUFKLEVBQVgsQ0FEc0I7QUFFMUIsU0FBSSxZQUFVLEVBQVY7U0FBYyxTQUFPLEVBQVAsQ0FGUTs7QUFJMUIsWUFBTyxPQUFPLE1BQVAsQ0FBYyxjQUFjLEVBQUUsTUFBRixHQUFXLFFBQVgsR0FBc0IsWUFBdEIsQ0FBZCxDQUFrRCxHQUFsRCxFQUFzRCxVQUF0RCxFQUFrRSxHQUFsRSxDQUFkLEVBQXFGO0FBQzNGLHdDQUFZLFVBQVM7QUFDcEIsV0FBRyxPQUFPLFFBQVAsQ0FBSCxFQUNDLE9BQU8sT0FBTyxRQUFQLENBQVAsQ0FERDtBQUVBLFdBQUksUUFBTSxXQUFXLFFBQVg7V0FBb0IsTUFBSSxNQUFNLE1BQU4sQ0FIZDtBQUlwQixrQkFBVyxVQUFYLENBQXNCLFNBQVMsS0FBVCxDQUFlLEdBQWYsRUFBb0IsR0FBcEIsQ0FBd0IsVUFBUyxDQUFULEVBQVc7QUFDdkQsZUFBTyxFQUFFLElBQUYsR0FBUyxDQUFULEtBQWEsR0FBYixHQUFtQixDQUFuQixHQUF1QixNQUFJLEtBQUssRUFBTCxHQUFRLEdBQVosR0FBZ0IsQ0FBaEIsQ0FEeUI7UUFBWCxDQUUzQyxJQUYyQyxDQUV0QyxJQUZzQyxDQUF4QixFQUVQLElBRk8sQ0FFRixHQUZFLElBRUcsSUFGSCxFQUVRLEdBRjlCLEVBSm9CO0FBT3BCLGNBQVEsT0FBTyxRQUFQLElBQWlCLFdBQVcsUUFBWCxDQUFvQixHQUFwQixFQUF5QixLQUF6QixDQVBMO09BRHNFO0FBVTNGLG9DQUFVLEdBQUcsUUFBTztBQUNuQixXQUFHLE1BQUgsRUFDQyxPQUFPLFVBQVUsQ0FBVixJQUFhLE1BQWIsQ0FEUjtBQUVBLFdBQUksUUFBTSxDQUFDLENBQUQsQ0FBTjtXQUFVLFNBQU8sQ0FBUCxDQUhLO0FBSW5CLGNBQU0sU0FBTyxVQUFVLE1BQVYsQ0FBUDtBQUNMLGNBQU0sT0FBTixDQUFjLE1BQWQ7UUFERCxPQUVPLE1BQU0sSUFBTixDQUFXLEdBQVgsQ0FBUCxDQU5tQjtPQVZ1RTtBQWtCM0Ysa0NBQVM7QUFDUixjQUFPLEtBQUssT0FBTCxDQURDO0FBRVIsWUFBSyxRQUFMLEdBRlE7T0FsQmtGO01BQXJGLENBQVAsQ0FKMEI7S0FBbkIsQ0EyQkwsR0EzQkksQ0FBUCxDQTdGeUI7SUFBbEIsQ0F5SEwsRUFBRSxNQUFGLEdBQVcsZ0JBQVgsR0FBOEIsUUFBOUIsQ0F6SEgsQ0FGaUI7Ozs7eUJBOEhKLEtBQUssWUFBWSxLQUFJO0FBQ2xDLFVBQU8sT0FBTyxNQUFQLENBQWMsR0FBZCxFQUFrQjtBQUN4QixrQ0FBVSxFQURjO0FBSXhCLG9DQUFXLFFBQU87QUFDakIsU0FBRyxPQUFPLE9BQU8sSUFBSSxVQUFKLElBQWlCLFdBQXhCLEVBQ1QsT0FBTyxJQUFJLFVBQUosQ0FBZSxNQUFmLENBQVAsQ0FERDtBQUVBLFlBQU8sb0JBQVAsQ0FIaUI7S0FKTTtBQVN4Qiw0QkFBTztBQUNOLFdBQU0sSUFBSSxLQUFKLENBQVUsYUFBVixDQUFOLENBRE07S0FUaUI7QUFZeEIsa0NBQVU7QUFDVCxXQUFNLElBQUksS0FBSixDQUFVLGFBQVYsQ0FBTixDQURTO0tBWmM7QUFleEIsMEJBQU07QUFDTCxXQUFNLElBQUksS0FBSixDQUFVLGFBQVYsQ0FBTixDQURLO0tBZmtCO0lBQWxCLENBQVAsQ0FEa0M7Ozs7NkJBc0JqQixLQUFLLFlBQVksS0FBSTtBQUN0QyxPQUFJLGFBQVcsVUFBVSxDQUFULEVBQVc7QUFDekIsUUFBRSxJQUFJLGVBQUosQ0FBb0IsSUFBSSxJQUFKLEVBQXBCLEVBQWdDLEtBQWhDLENBQXNDLEdBQXRDLENBQUYsQ0FEeUI7QUFFekIsTUFBRSxHQUFGLEdBRnlCO0FBR3pCLFdBQU8sRUFBRSxJQUFGLENBQU8sR0FBUCxDQUFQLENBSHlCO0lBQVgsRUFBWjtPQUtILGlCQUFlLElBQUksTUFBSixDQUFXLGFBQVcsZUFBWCxFQUEyQixJQUF0QyxDQUFmLENBTnFDOztBQVF0QyxVQUFPLE9BQU8sTUFBUCxDQUFjLEdBQWQsRUFBa0I7QUFDeEIsMEJBQU0sS0FBSyxPQUFNO0FBQ2hCLFNBQUksTUFBSSxxQkFBSjtTQUFnQixXQUFTLEtBQVQsQ0FESjtBQUVoQixTQUFJLElBQUUsSUFBSSxNQUFKLENBQVcsUUFBWCxDQUFGLENBRlk7QUFHaEIsWUFBTyxJQUFQLENBQVksS0FBSyxNQUFMLENBQVosQ0FBeUIsT0FBekIsQ0FBaUMsVUFBUyxDQUFULEVBQVc7QUFDM0MsaUJBQVMsSUFBVCxDQUQyQztBQUUzQyxRQUFFLElBQUYsQ0FBTyxFQUFFLEtBQUYsQ0FBUSxHQUFSLEVBQWEsR0FBYixFQUFQLEVBQTBCLEtBQUssQ0FBTCxDQUExQixFQUYyQztNQUFYLEVBRy9CLEtBQUssTUFBTCxDQUhGLENBSGdCO0FBT2hCLFNBQUksSUFBSixDQUFTLFlBQVQsRUFBc0IsS0FBSyxTQUFMLENBQWUsS0FBZixDQUF0QixFQVBnQjtBQVFoQixTQUFJLElBQUosQ0FBUyxXQUFULEVBQXFCLFdBQVcsS0FBSyxRQUFMLENBQWMsR0FBZCxFQUFtQixPQUFuQixDQUEyQixVQUEzQixFQUFzQyxRQUF0QyxDQUFYLEdBQTZELEtBQUssUUFBTCxFQUE3RCxDQUFyQixDQVJnQjtBQVNoQixZQUFPLEdBQVAsQ0FUZ0I7S0FETztBQVl4QixnQ0FBUyxLQUFLLE9BQU07QUFDbkIsU0FBSSxJQUFFLFNBQVMsYUFBVCxDQUF1QixHQUF2QixDQUFGLENBRGU7QUFFbkIsY0FBUyxJQUFULENBQWMsV0FBZCxDQUEwQixDQUExQixFQUZtQjtBQUduQixPQUFFLElBQUYsR0FBTyxJQUFJLGVBQUosQ0FBb0IsS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFlLEtBQWYsRUFBc0IsUUFBdEIsQ0FBK0IsRUFBQyxNQUFLLE1BQUwsRUFBaEMsQ0FBcEIsQ0FBUCxDQUhtQjtBQUluQixPQUFFLFFBQUYsR0FBVyxDQUFDLE1BQU0sSUFBTixJQUFZLFVBQVosQ0FBRCxHQUF5QixNQUF6QixDQUpRO0FBS25CLE9BQUUsS0FBRixHQUxtQjtBQU1uQixTQUFJLGVBQUosQ0FBb0IsRUFBRSxJQUFGLENBQXBCLENBTm1CO0FBT25CLGNBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsQ0FBMUIsRUFQbUI7S0FaSTtBQXFCeEIsd0JBQUssS0FBSyxPQUFNO0FBQ2YsU0FBSSxXQUFTLEtBQVQ7U0FBZ0IsU0FBTyxFQUFQO1NBQVcsS0FBRyxJQUFILENBRGhCO0FBRWYsWUFBTyxFQUFFLFFBQUYsQ0FBVyxJQUFYLENBQWdCLENBQUMsS0FBSyxNQUFMLElBQWUsT0FBTyxJQUFQLENBQVksS0FBSyxNQUFMLENBQTNCLElBQXlDLEVBQXpDLENBQUQsQ0FBOEMsR0FBOUMsQ0FBa0QsVUFBUyxDQUFULEVBQVc7QUFDbkYsaUJBQVMsSUFBVCxDQURtRjtBQUVuRixhQUFPLElBQUksU0FBSixDQUFjLEtBQUssQ0FBTCxDQUFkLEVBQXNCLEtBQXRCLEVBQ0wsSUFESyxDQUNBLFVBQVMsR0FBVCxFQUFhO0FBQUMsY0FBTyxPQUFPLENBQVAsSUFBVSxHQUFWLENBQVI7T0FBYixDQURQLENBRm1GO01BQVgsRUFJdkUsS0FBSyxNQUFMLENBSkssRUFLTixJQUxNLENBS0QsWUFBVTtBQUNmLFVBQUksT0FBSyxHQUFHLFFBQUgsQ0FBWSxHQUFaLEVBQWlCLEtBQWpCLENBQUwsQ0FEVztBQUVmLFVBQUcsUUFBSCxFQUNDLE9BQUssS0FBSyxPQUFMLENBQWEsY0FBYixFQUE0QixVQUFTLENBQVQsRUFBVyxFQUFYLEVBQWM7QUFBQyxjQUFPLE9BQU8sQ0FBUCxDQUFQLENBQUQ7T0FBZCxDQUFqQyxDQUREO0FBRUEsYUFBTyxJQUFJLFFBQUosQ0FBYSxJQUFiLEVBQW1CLEtBQW5CLENBQVAsQ0FKZTtNQUFWLENBTE4sQ0FGZTtLQXJCUTs7QUFtQ3hCLFlBQU8sRUFBUDtBQUNBLG9DQUFXLGFBQVk7QUFDdEIsU0FBSSxNQUFJLElBQUksZUFBSixDQUFvQixJQUFJLElBQUosQ0FBUyxDQUFDLFdBQUQsQ0FBVCxFQUMzQixFQUFDLE1BQUssWUFBVSxPQUFPLFdBQVAsSUFBcUIsUUFBckIsR0FBZ0MsU0FBaEMsR0FBNEMsR0FBNUMsQ0FBVixFQURxQixDQUFwQixDQUFKLENBRGtCO0FBR3RCLFVBQUssTUFBTCxDQUFZLEdBQVosSUFBaUIsV0FBakIsQ0FIc0I7QUFJdEIsWUFBTyxHQUFQLENBSnNCO0tBcENDO0FBMEN4QixrQ0FBVTtBQUNULFlBQU8sSUFBUCxDQUFZLEtBQUssTUFBTCxDQUFaLENBQXlCLE9BQXpCLENBQWlDLFVBQVMsQ0FBVCxFQUFXO0FBQzNDLFVBQUksZUFBSixDQUFvQixDQUFwQixFQUQyQztNQUFYLENBQWpDLENBRFM7QUFJVCxZQUFPLEtBQUssTUFBTCxDQUpFO0tBMUNjO0lBQWxCLENBQVAsQ0FSc0M7Ozs7UUF0UG5COzs7Ozs7QUFrVHJCLENBQUMsVUFBUyxNQUFULEVBQWlCLENBQWpCLEVBQW1CO0FBQ25CLEtBQUcsQ0FBQyxNQUFELEVBQVMsT0FBWjs7QUFFQSxrQkFBZSxRQUFRLENBQVIsRUFBVyxLQUFYLENBSEk7QUFJbkIsS0FBSSxTQUFPLGlCQUFpQixXQUFqQixDQUpROztBQU1uQixRQUFPLElBQVAsR0FBWSxPQUFPLElBQVAsQ0FOTztBQU9uQix1QkFBb0IsT0FBTyxtQkFBUCxDQVBEO0NBQW5CLENBQUQsQ0FRRyxFQUFFLE1BQUYsRUFBVSxPQVJiIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcidcbmltcG9ydCBKU1ppcCBmcm9tICdqc3ppcCdcblxudmFyIGNyZWF0ZURvY3VtZW50LCBDU1NTdHlsZURlY2xhcmF0aW9uXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgQ29udmVydGVye1xuXHRnZXQgdGFnKCl7cmV0dXJuICdodG1sJ31cblxuXHRjb252ZXJ0KCl7XG5cdFx0dGhpcy5kb2M9dGhpcy5jb25zdHJ1Y3Rvci5jcmVhdGUodGhpcy5vcHRpb25zKVxuXHRcdHRoaXMuY29udGVudD10aGlzLmRvY1xuXHRcdGxldCBjb250ZW50U3R5bGU9dGhpcy5jb250ZW50LnN0eWxlXG5cdFx0Y29udGVudFN0eWxlLmJhY2tncm91bmRDb2xvcj0ndHJhbnNwYXJlbnQnXG5cdFx0Y29udGVudFN0eWxlLm1pbkhlaWdodD0nMTAwMHB4J1xuXHRcdGNvbnRlbnRTdHlsZS53aWR0aD0nMTAwJSdcblx0XHRjb250ZW50U3R5bGUucGFkZGluZ1RvcD0nMjBweCdcblx0XHRjb250ZW50U3R5bGUub3ZlcmZsb3c9J2F1dG8nXG5cblx0XHR2YXIgc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJyonKVxuXHRcdHN0eWxlLm1hcmdpbj0nMCdcblx0XHRzdHlsZS5ib3JkZXI9JzAnXG5cdFx0c3R5bGUucGFkZGluZz0nMCdcblx0XHRzdHlsZS5ib3hTaXppbmc9J2JvcmRlci1ib3gnXG5cblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgndGFibGUnKVxuXHRcdHN0eWxlLndpZHRoPScxMDAlJ1xuXHRcdHN0eWxlLmJvcmRlckNvbGxhcHNlPSdjb2xsYXBzZSdcblx0XHRzdHlsZS53b3JkQnJlYWs9J2JyZWFrLXdvcmQnXG5cblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnc2VjdGlvbicpXG5cdFx0c3R5bGUubWFyZ2luPSdhdXRvJ1xuXHRcdHN0eWxlLmJhY2tncm91bmRDb2xvcj0nd2hpdGUnXG5cdFx0c3R5bGUuY29sb3I9J2JsYWNrJ1xuXHRcdHN0eWxlLnBvc2l0aW9uPSdyZWxhdGl2ZSdcblx0XHRzdHlsZS56SW5kZXg9MFxuXG5cdFx0c3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3A6ZW1wdHk6YmVmb3JlJylcblx0XHRzdHlsZS5jb250ZW50PSdcIlwiJ1xuXHRcdHN0eWxlLmRpc3BsYXk9J2lubGluZS1ibG9jaydcblxuXHRcdHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCd1bCcpXG5cdFx0c3R5bGUubGlzdFN0eWxlPVwibm9uZVwiXG5cblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgndWw+bGk+cCcpXG5cdFx0c3R5bGUucG9zaXRpb249J3JlbGF0aXZlJ1xuXG5cdFx0c3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3VsIC5tYXJrZXInKVxuXHRcdHN0eWxlLnBvc2l0aW9uPSdhYnNvbHV0ZSdcblxuXHRcdHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCdhJylcblx0XHRzdHlsZS50ZXh0RGVjb3JhdGlvbj0nbm9uZSdcblxuXHRcdHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCcudW5zdXBwb3J0ZWQnKVxuXHRcdHN0eWxlLm91dGxpbmU9XCIycHggcmVkIHNvbGlkXCJcblxuXHRcdHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCcud2FybmluZycpXG5cdFx0c3R5bGUub3V0bGluZT1cIjFweCB5ZWxsb3cgc29saWRcIlxuXHRcdHRoaXMuY29udmVydFN0eWxlKClcblx0fVxuXHRcblx0Y29udmVydFN0eWxlKCl7XG5cdFx0dmFyIGJnU3R5bGU9dGhpcy53b3JkTW9kZWwuZ2V0QmFja2dyb3VuZFN0eWxlKClcblx0XHRpZighYmdTdHlsZSlcblx0XHRcdHJldHVyblxuXHRcdFxuXHRcdHZhciBzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnc2VjdGlvbicpXG5cdFx0c3dpdGNoKHR5cGVvZiBiZ1N0eWxlKXtcblx0XHRjYXNlICdvYmplY3QnOi8vIGZpbGxcblx0XHRcdGNvbnNvbGUud2Fybignbm90IHN1cHBvcnQgZmlsbCBjb2xvciBvbiBkb2N1bWVudCBiYWNrZ3JvdW5kIHlldCcpXG5cdFx0YnJlYWtcblx0XHRkZWZhdWx0OlxuXHRcdFx0c3R5bGUuYmFja2dyb3VuZENvbG9yPWJnU3R5bGVcblx0XHRicmVha1xuXHRcdH1cblx0fVxuXHQvKipcblx0KiBvcHQ6IHtcblx0KiBcdHRlbXBsYXRlOiBmdW5jdGlvbihzdHlsZSwgaHRtbCwgcHJvcHMpeyByZXR1cm4gKGh0bWwpfSxcblx0XHRleHRlbmRTY3JpcHQ6IFwiaHR0cDovL2EuY29tL2EuanNcIlxuXHRcdH1cblx0Ki9cblx0dG9TdHJpbmcob3B0KXtcblx0XHRyZXR1cm4gdGhpcy5kb2MudG9TdHJpbmcob3B0LHRoaXMucHJvcHMpXG5cdH1cblx0cmVsZWFzZSgpe1xuXHRcdHRoaXMuZG9jLnJlbGVhc2UoKVxuXHR9XG5cdGFzWmlwKG9wdCl7XG5cdFx0cmV0dXJuIHRoaXMuZG9jLmFzWmlwKG9wdCx0aGlzLnByb3BzKVxuXHR9XG5cdGRvd25sb2FkKG9wdCl7XG5cdFx0cmV0dXJuIHRoaXMuZG9jLmRvd25sb2FkKG9wdCwgdGhpcy5wcm9wcylcblx0fVxuXHQvKipcblx0KiBvcHQ9ZXh0ZW5kKHRvU3RyaW5nLm9wdCx7XG5cdFx0c2F2ZUltYWdlOiBmdW5jdGlvbihhcnJheUJ1ZmZlciwgZG9jLnByb3BzKTogcHJvbWlzZSh1cmwpIHt9LFxuXHRcdHNhdmVIdG1sOiBmdW5jdGlvbigpe31cblx0fSlcblx0Ki9cblx0c2F2ZSAob3B0KXtcblx0XHRyZXR1cm4gdGhpcy5kb2Muc2F2ZShvcHQsIHRoaXMucHJvcHMpXG5cdH1cblxuXHRzdGF0aWMgY3JlYXRlKG9wdCl7XG5cdFx0dmFyIHNlbGZDb252ZXJ0ZXI9dGhpc1xuXHRcdHJldHVybiAoZnVuY3Rpb24oZG9jdW1lbnQpe1xuXHRcdFx0dmFyIGRvYz0oZnVuY3Rpb24gYnJvd3NlckRvYygpe1xuXHRcdFx0XHR2YXIgdWlkPTA7XG5cdFx0XHRcdHZhciByb290PU9iamVjdC5hc3NpZ24oZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jykse1xuXHRcdFx0XHRcdGlkIDogXCJBXCIsXG5cdFx0XHRcdFx0c2VjdGlvbjogbnVsbCxcblx0XHRcdFx0XHRjcmVhdGVFbGVtZW50OiBkb2N1bWVudC5jcmVhdGVFbGVtZW50LmJpbmQoZG9jdW1lbnQpLFxuXHRcdFx0XHRcdGNyZWF0ZVRleHROb2RlOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZS5iaW5kKGRvY3VtZW50KSxcblx0XHRcdFx0XHRjcmVhdGVTdHlsZVNoZWV0KCl7XG5cdFx0XHRcdFx0XHRpZih0aGlzLnN0eWxlc2hlZXQpXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnN0eWxlc2hlZXQ7XG5cdFx0XHRcdFx0XHR2YXIgZWxTdHlsZT10aGlzLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcblx0XHRcdFx0XHRcdHRoaXMuYm9keS5hcHBlbmRDaGlsZChlbFN0eWxlLG51bGwpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuc3R5bGVzaGVldD1lbFN0eWxlLnNoZWV0XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRnZXRTdHlsZVRleHQoKXtcblx0XHRcdFx0XHRcdHZhciBzdHlsZXM9W11cblx0XHRcdFx0XHRcdGZvcih2YXIgaT0wLCBydWxlcz10aGlzLnN0eWxlc2hlZXQuY3NzUnVsZXMsIGxlbj1ydWxlcy5sZW5ndGg7aTxsZW47aSsrKVxuXHRcdFx0XHRcdFx0XHRzdHlsZXMucHVzaChydWxlc1tpXS5jc3NUZXh0KVxuXHRcdFx0XHRcdFx0cmV0dXJuIHN0eWxlcy5qb2luKCdcXHJcXG4nKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0dWlkKCl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5pZCsodWlkKyspXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR0b1N0cmluZyhvcHQsIHByb3BzKXtcblx0XHRcdFx0XHRcdGlmKG9wdCAmJiB0eXBlb2Ygb3B0LnRlbXBsYXRlIT1cInVuZGVmaW5lZFwiICYmICQuaXNGdW5jdGlvbihvcHQudGVtcGxhdGUpKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gb3B0LnRlbXBsYXRlKHRoaXMuZ2V0U3R5bGVUZXh0KCksIHRoaXMuX2h0bWwoKSwgcHJvcHMpXG5cdFx0XHRcdFx0XHR2YXIgaHRtbD1bJzwhZG9jdHlwZSBodG1sPlxcclxcbjxodG1sPjxoZWFkPjxtZXRhIGNoYXJzZXQ9dXRmLTg+PG1ldGEga2V5PVwiZ2VuZXJhdG9yXCIgdmFsdWU9XCJkb2N4Mmh0bWxcIj48dGl0bGU+JysocHJvcHMubmFtZXx8JycpKyc8L3RpdGxlPjxzdHlsZT4nXVxuXHRcdFx0XHRcdFx0aHRtbC5wdXNoKHRoaXMuZ2V0U3R5bGVUZXh0KCkpXG5cdFx0XHRcdFx0XHRodG1sLnB1c2goJzwvc3R5bGU+PC9oZWFkPjxib2R5PicpXG5cdFx0XHRcdFx0XHRodG1sLnB1c2godGhpcy5faHRtbCgpKVxuXHRcdFx0XHRcdFx0b3B0ICYmIG9wdC5leHRlbmRTY3JpcHQgJiYgaHRtbC5wdXNoKCc8c2NyaXB0IHNyYz1cIicrb3B0LmV4dGVuZFNjcmlwdCsnXCI+PC9zY3JpcHQ+Jylcblx0XHRcdFx0XHRcdGh0bWwucHVzaCgnPC9ib2R5PjxodG1sPicpXG5cdFx0XHRcdFx0XHRyZXR1cm4gaHRtbC5qb2luKCdcXHJcXG4nKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0X2h0bWwoKXtcblx0XHRcdFx0XHRcdHZhciBkaXZzPXRoaXMucXVlcnlTZWxlY3RvckFsbCgncD5kaXYsIHNwYW4+ZGl2Jylcblx0XHRcdFx0XHRcdGlmKGRpdnMubGVuZ3RoPT0wKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vdXRlckhUTUxcblxuXHRcdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0XHQqIGlsbGVnYWwgPHA+IDxkaXYvPiA8L3A+XG5cdFx0XHRcdFx0XHQqIERPTSBvcGVyYXRpb24gZGlyZWN0bHkgaW4gb25sb2FkXG5cdFx0XHRcdFx0XHQqL1xuXHRcdFx0XHRcdFx0dmFyIGRpdmNvbnRhaW5lcj1kb2MuY3JlYXRlRWxlbWVudCgnZGl2JyksIHVpZD0wXG5cdFx0XHRcdFx0XHRkaXZjb250YWluZXIuaWQ9J2RpdmNvbnRhaW5lcidcblx0XHRcdFx0XHRcdGRpdmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5PVwibm9uZVwiXG5cdFx0XHRcdFx0XHR0aGlzLmFwcGVuZENoaWxkKGRpdmNvbnRhaW5lcilcblx0XHRcdFx0XHRcdGZvcih2YXIgaT1kaXZzLmxlbmd0aC0xO2k+LTE7aS0tKXtcblx0XHRcdFx0XHRcdFx0dmFyIGRpdj1kaXZzW2ldLFxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudD1kaXYucGFyZW50Tm9kZTtcblxuXHRcdFx0XHRcdFx0XHRpZighZGl2LmlkKVxuXHRcdFx0XHRcdFx0XHRcdGRpdi5pZD0nX3onKygrK3VpZClcblxuXHRcdFx0XHRcdFx0XHRpZighcGFyZW50LmlkKVxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudC5pZD0nX3knK3VpZFxuXG5cdFx0XHRcdFx0XHRcdGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50JyxwYXJlbnQuaWQpXG5cdFx0XHRcdFx0XHRcdGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLGluZGV4T2YoZGl2LHBhcmVudC5jaGlsZE5vZGVzKSlcblxuXHRcdFx0XHRcdFx0XHRkaXZjb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2c1tpXSlcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIGh0bWw9dGhpcy5vdXRlckhUTUwrJ1xcblxccjxzY3JpcHQ+KCcrdGhpcy5fdHJhbnNmb3JtZXIudG9TdHJpbmcoKSsnKSgpOzwvc2NyaXB0Pidcblx0XHRcdFx0XHRcdHRoaXMuX3RyYW5zZm9ybWVyKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaHRtbFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0X3RyYW5zZm9ybWVyKCl7XG5cdFx0XHRcdFx0XHR2YXIgYT1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGl2Y29udGFpbmVyJylcblx0XHRcdFx0XHRcdGZvcih2YXIgZGl2cz1hLmNoaWxkTm9kZXMsIGk9ZGl2cy5sZW5ndGgtMTtpPi0xO2ktLSl7XG5cdFx0XHRcdFx0XHRcdHZhciBkaXY9ZGl2c1tpXSxcblx0XHRcdFx0XHRcdFx0XHRwYXJlbnRJZD1kaXYuZ2V0QXR0cmlidXRlKCdkYXRhLXBhcmVudCcpLFxuXHRcdFx0XHRcdFx0XHRcdGluZGV4PXBhcnNlSW50KGRpdi5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSksXG5cdFx0XHRcdFx0XHRcdFx0cGFyZW50PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnK3BhcmVudElkKTtcblx0XHRcdFx0XHRcdFx0cGFyZW50Lmluc2VydEJlZm9yZShkaXYscGFyZW50LmNoaWxkTm9kZXNbaW5kZXhdKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGEpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRmdW5jdGlvbiBpbmRleE9mKGVsLCBlbHMpe1xuXHRcdFx0XHRcdGZvcih2YXIgaT1lbHMubGVuZ3RoLTE7aT4wO2ktLSlcblx0XHRcdFx0XHRcdGlmKGVsPT1lbHNbaV0pXG5cdFx0XHRcdFx0XHRcdHJldHVybiBpXG5cdFx0XHRcdFx0cmV0dXJuIDBcblx0XHRcdFx0fVxuXG5cdFx0XHRcdChvcHQgJiYgb3B0LmNvbnRhaW5lciB8fCBkb2N1bWVudC5ib2R5KS5hcHBlbmRDaGlsZChyb290KTtcblx0XHRcdFx0cm9vdC5ib2R5PXJvb3Rcblx0XHRcdFx0cmV0dXJuIHJvb3Rcblx0XHRcdH0pKCk7XG5cblx0XHRcdHJldHVybiAoZnVuY3Rpb24gbWl4aW4oZG9jKXtcblx0XHRcdFx0dmFyIHN0eWxlc2hlZXQ9ZG9jLmNyZWF0ZVN0eWxlU2hlZXQoKVxuXHRcdFx0XHR2YXIgcmVsU3R5bGVzPXt9LCBzdHlsZXM9e31cblxuXHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihzZWxmQ29udmVydGVyWyQuaXNOb2RlID8gJ25vZGVmeScgOiAnYnJvd3NlcmlmeSddKGRvYyxzdHlsZXNoZWV0LCBvcHQpLHtcblx0XHRcdFx0XHRjcmVhdGVTdHlsZShzZWxlY3Rvcil7XG5cdFx0XHRcdFx0XHRpZihzdHlsZXNbc2VsZWN0b3JdKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gc3R5bGVzW3NlbGVjdG9yXVxuXHRcdFx0XHRcdFx0dmFyIHJ1bGVzPXN0eWxlc2hlZXQuY3NzUnVsZXMsbGVuPXJ1bGVzLmxlbmd0aFxuXHRcdFx0XHRcdFx0c3R5bGVzaGVldC5pbnNlcnRSdWxlKHNlbGVjdG9yLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uKGEpe1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBhLnRyaW0oKVswXT09JyMnID8gYSA6ICcjJyt0aGlzLmlkKycgJythXG5cdFx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSkuam9pbignLCcpKyd7fScsbGVuKVxuXHRcdFx0XHRcdFx0cmV0dXJuICBzdHlsZXNbc2VsZWN0b3JdPXN0eWxlc2hlZXQuY3NzUnVsZXNbbGVuXS5zdHlsZVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0c3R5bGVQYXRoKGEsIHBhcmVudCl7XG5cdFx0XHRcdFx0XHRpZihwYXJlbnQpXG5cdFx0XHRcdFx0XHRcdHJldHVybiByZWxTdHlsZXNbYV09cGFyZW50XG5cdFx0XHRcdFx0XHR2YXIgcGF0aHM9W2FdLHBhcmVudD1hXG5cdFx0XHRcdFx0XHR3aGlsZShwYXJlbnQ9cmVsU3R5bGVzW3BhcmVudF0pXG5cdFx0XHRcdFx0XHRcdHBhdGhzLnVuc2hpZnQocGFyZW50KVxuXHRcdFx0XHRcdFx0cmV0dXJuIHBhdGhzLmpvaW4oJyAnKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cmVsZWFzZSgpe1xuXHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXMuc2VjdGlvblxuXHRcdFx0XHRcdFx0dGhpcy5fcmVsZWFzZSgpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fSkoZG9jKVxuXHRcdH0pKCQuaXNOb2RlID8gY3JlYXRlRG9jdW1lbnQoKSA6IGRvY3VtZW50KVxuXHR9XG5cblx0c3RhdGljIG5vZGVmeShkb2MsIHN0eWxlc2hlZXQsIG9wdCl7XG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oZG9jLHtcblx0XHRcdF9yZWxlYXNlKCl7XG5cblx0XHRcdH0sXG5cdFx0XHRhc0ltYWdlVVJMKGJ1ZmZlcil7XG5cdFx0XHRcdGlmKG9wdCAmJiB0eXBlb2Yob3B0LmFzSW1hZ2VVUkwpIT0ndW5kZWZpbmVkJylcblx0XHRcdFx0XHRyZXR1cm4gb3B0LmFzSW1hZ2VVUkwoYnVmZmVyKVxuXHRcdFx0XHRyZXR1cm4gXCJpbWFnZTovL25vdHN1cHBvcnRcIlxuXHRcdFx0fSxcblx0XHRcdGFzWmlwKCl7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnQnKVxuXHRcdFx0fSxcblx0XHRcdGRvd25sb2FkKCl7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnQnKVxuXHRcdFx0fSxcblx0XHRcdHNhdmUoKXtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCcpXG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG5cdHN0YXRpYyBicm93c2VyaWZ5KGRvYywgc3R5bGVzaGVldCwgb3B0KXtcblx0XHR2YXIgUHJvdG9fQmxvYj0oZnVuY3Rpb24oYSl7XG5cdFx0XHRcdGE9VVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYigpKS5zcGxpdCgnLycpO1xuXHRcdFx0XHRhLnBvcCgpO1xuXHRcdFx0XHRyZXR1cm4gYS5qb2luKCcvJylcblx0XHRcdH0pKCksXG5cdFx0XHRSZWdfUHJvdG9fQmxvYj1uZXcgUmVnRXhwKFByb3RvX0Jsb2IrXCIvKFtcXFxcd1xcXFxkLV0rKVwiLFwiZ2lcIik7XG5cblx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihkb2Mse1xuXHRcdFx0YXNaaXAob3B0LCBwcm9wcyl7XG5cdFx0XHRcdHZhciB6aXA9bmV3IEpTWmlwKCksaGFzSW1hZ2U9ZmFsc2U7XG5cdFx0XHRcdHZhciBmPXppcC5mb2xkZXIoJ2ltYWdlcycpXG5cdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMuaW1hZ2VzKS5mb3JFYWNoKGZ1bmN0aW9uKGEpe1xuXHRcdFx0XHRcdGhhc0ltYWdlPXRydWVcblx0XHRcdFx0XHRmLmZpbGUoYS5zcGxpdCgnLycpLnBvcCgpLHRoaXNbYV0pXG5cdFx0XHRcdH0sdGhpcy5pbWFnZXMpXG5cdFx0XHRcdHppcC5maWxlKCdwcm9wcy5qc29uJyxKU09OLnN0cmluZ2lmeShwcm9wcykpO1xuXHRcdFx0XHR6aXAuZmlsZSgnbWFpbi5odG1sJyxoYXNJbWFnZSA/IHRoaXMudG9TdHJpbmcob3B0KS5yZXBsYWNlKFByb3RvX0Jsb2IsJ2ltYWdlcycpIDogdGhpcy50b1N0cmluZygpKVxuXHRcdFx0XHRyZXR1cm4gemlwXG5cdFx0XHR9LFxuXHRcdFx0ZG93bmxvYWQob3B0LCBwcm9wcyl7XG5cdFx0XHRcdHZhciBhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSlcblx0XHRcdFx0YS5ocmVmPVVSTC5jcmVhdGVPYmplY3RVUkwodGhpcy5hc1ppcChvcHQscHJvcHMpLmdlbmVyYXRlKHt0eXBlOidibG9iJ30pKVxuXHRcdFx0XHRhLmRvd25sb2FkPShwcm9wcy5uYW1lfHxcImRvY3VtZW50XCIpKycuemlwJ1xuXHRcdFx0XHRhLmNsaWNrKClcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChhLmhyZWYpXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSlcblx0XHRcdH0sXG5cdFx0XHRzYXZlKG9wdCwgcHJvcHMpe1xuXHRcdFx0XHR2YXIgaGFzSW1hZ2U9ZmFsc2UsIGltYWdlcz17fSwgbWU9dGhpcztcblx0XHRcdFx0cmV0dXJuICQuRGVmZXJyZWQud2hlbigodGhpcy5pbWFnZXMgJiYgT2JqZWN0LmtleXModGhpcy5pbWFnZXMpfHxbXSkubWFwKGZ1bmN0aW9uKGEpe1xuXHRcdFx0XHRcdGhhc0ltYWdlPXRydWVcblx0XHRcdFx0XHRyZXR1cm4gb3B0LnNhdmVJbWFnZSh0aGlzW2FdLHByb3BzKVxuXHRcdFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24odXJsKXtyZXR1cm4gaW1hZ2VzW2FdPXVybH0pXG5cdFx0XHRcdH0sdGhpcy5pbWFnZXMpKVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbigpe1xuXHRcdFx0XHRcdHZhciBodG1sPW1lLnRvU3RyaW5nKG9wdCwgcHJvcHMpO1xuXHRcdFx0XHRcdGlmKGhhc0ltYWdlKVxuXHRcdFx0XHRcdFx0aHRtbD1odG1sLnJlcGxhY2UoUmVnX1Byb3RvX0Jsb2IsZnVuY3Rpb24oYSxpZCl7cmV0dXJuIGltYWdlc1thXX0pO1xuXHRcdFx0XHRcdHJldHVybiBvcHQuc2F2ZUh0bWwoaHRtbCwgcHJvcHMpXG5cdFx0XHRcdH0pXG5cdFx0XHR9LFxuXHRcdFx0aW1hZ2VzOnt9LFxuXHRcdFx0YXNJbWFnZVVSTChhcnJheUJ1ZmZlcil7XG5cdFx0XHRcdHZhciB1cmw9VVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbYXJyYXlCdWZmZXJdLFxuXHRcdFx0XHRcdHt0eXBlOlwiaW1hZ2UvXCIrKHR5cGVvZihhcnJheUJ1ZmZlcik9PSdzdHJpbmcnID8gJ3N2Zyt4bWwnIDogJyonKX0pKTtcblx0XHRcdFx0dGhpcy5pbWFnZXNbdXJsXT1hcnJheUJ1ZmZlclxuXHRcdFx0XHRyZXR1cm4gdXJsXG5cdFx0XHR9LFxuXHRcdFx0X3JlbGVhc2UoKXtcblx0XHRcdFx0T2JqZWN0LmtleXModGhpcy5pbWFnZXMpLmZvckVhY2goZnVuY3Rpb24oYil7XG5cdFx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChiKVxuXHRcdFx0XHR9KVxuXHRcdFx0XHRkZWxldGUgdGhpcy5pbWFnZXNcblx0XHRcdH1cblx0XHR9KVxuXHR9XG59XG5cbihmdW5jdGlvbihpc05vZGUsIG0pe1xuXHRpZighaXNOb2RlKVx0cmV0dXJuO1xuXG5cdGNyZWF0ZURvY3VtZW50PXJlcXVpcmUobSkuanNkb21cblx0bGV0IHdpbmRvdz1jcmVhdGVEb2N1bWVudCgpLmRlZmF1bHRWaWV3XG5cblx0Z2xvYmFsLmJ0b2E9d2luZG93LmJ0b2Fcblx0Q1NTU3R5bGVEZWNsYXJhdGlvbj13aW5kb3cuQ1NTU3R5bGVEZWNsYXJhdGlvblxufSkoJC5pc05vZGUsIFwianNkb21cIilcbiJdfQ==