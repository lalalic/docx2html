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
    *   template: function(style, html, props){ return (html)},
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
              if (opt && typeof opt.template != "undefined" && $tool.isFunction(opt.template)) return opt.template(this.getStyleText(), this._html(), props);
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

          return (0, _assign2.default)(selfConverter[$tool.isNode ? 'nodefy' : 'browserify'](doc, stylesheet, opt), {
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
      }($tool.isNode ? createDocument() : document);
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
          return $tool.Deferred.when((this.images && (0, _keys2.default)(this.images) || []).map(function (a) {
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
})($tool.isNode, "jsdom");
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiY3JlYXRlRG9jdW1lbnQiLCJDU1NTdHlsZURlY2xhcmF0aW9uIiwiRG9jdW1lbnQiLCJkb2MiLCJjb25zdHJ1Y3RvciIsImNyZWF0ZSIsIm9wdGlvbnMiLCJjb250ZW50IiwiY29udGVudFN0eWxlIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJtaW5IZWlnaHQiLCJ3aWR0aCIsInBhZGRpbmdUb3AiLCJvdmVyZmxvdyIsImNyZWF0ZVN0eWxlIiwibWFyZ2luIiwiYm9yZGVyIiwicGFkZGluZyIsImJveFNpemluZyIsImJvcmRlckNvbGxhcHNlIiwid29yZEJyZWFrIiwiY29sb3IiLCJwb3NpdGlvbiIsInpJbmRleCIsImRpc3BsYXkiLCJsaXN0U3R5bGUiLCJ0ZXh0RGVjb3JhdGlvbiIsIm91dGxpbmUiLCJjb252ZXJ0U3R5bGUiLCJiZ1N0eWxlIiwid29yZE1vZGVsIiwiZ2V0QmFja2dyb3VuZFN0eWxlIiwiY29uc29sZSIsIndhcm4iLCJvcHQiLCJ0b1N0cmluZyIsInByb3BzIiwicmVsZWFzZSIsImFzWmlwIiwiZG93bmxvYWQiLCJzYXZlIiwic2VsZkNvbnZlcnRlciIsImRvY3VtZW50IiwiYnJvd3NlckRvYyIsInVpZCIsInJvb3QiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJzZWN0aW9uIiwiYmluZCIsImNyZWF0ZVRleHROb2RlIiwiY3JlYXRlU3R5bGVTaGVldCIsInN0eWxlc2hlZXQiLCJlbFN0eWxlIiwiYm9keSIsImFwcGVuZENoaWxkIiwic2hlZXQiLCJnZXRTdHlsZVRleHQiLCJzdHlsZXMiLCJpIiwicnVsZXMiLCJjc3NSdWxlcyIsImxlbiIsImxlbmd0aCIsInB1c2giLCJjc3NUZXh0Iiwiam9pbiIsInRlbXBsYXRlIiwiJHRvb2wiLCJpc0Z1bmN0aW9uIiwiX2h0bWwiLCJodG1sIiwibmFtZSIsImV4dGVuZFNjcmlwdCIsImRpdnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwib3V0ZXJIVE1MIiwiZGl2Y29udGFpbmVyIiwiZGl2IiwicGFyZW50IiwicGFyZW50Tm9kZSIsInNldEF0dHJpYnV0ZSIsImluZGV4T2YiLCJjaGlsZE5vZGVzIiwiX3RyYW5zZm9ybWVyIiwiYSIsInF1ZXJ5U2VsZWN0b3IiLCJwYXJlbnRJZCIsImdldEF0dHJpYnV0ZSIsImluZGV4IiwicGFyc2VJbnQiLCJpbnNlcnRCZWZvcmUiLCJyZW1vdmVDaGlsZCIsImVsIiwiZWxzIiwiY29udGFpbmVyIiwibWl4aW4iLCJyZWxTdHlsZXMiLCJpc05vZGUiLCJzZWxlY3RvciIsImluc2VydFJ1bGUiLCJzcGxpdCIsIm1hcCIsInRyaW0iLCJzdHlsZVBhdGgiLCJwYXRocyIsInVuc2hpZnQiLCJfcmVsZWFzZSIsImFzSW1hZ2VVUkwiLCJidWZmZXIiLCJFcnJvciIsIlByb3RvX0Jsb2IiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJCbG9iIiwicG9wIiwiUmVnX1Byb3RvX0Jsb2IiLCJSZWdFeHAiLCJ6aXAiLCJKU1ppcCIsImhhc0ltYWdlIiwiZiIsImZvbGRlciIsImltYWdlcyIsImZvckVhY2giLCJmaWxlIiwicmVwbGFjZSIsImhyZWYiLCJnZW5lcmF0ZSIsInR5cGUiLCJjbGljayIsInJldm9rZU9iamVjdFVSTCIsIm1lIiwiRGVmZXJyZWQiLCJ3aGVuIiwic2F2ZUltYWdlIiwidGhlbiIsInVybCIsInNhdmVIdG1sIiwiYXJyYXlCdWZmZXIiLCJiIiwiQ29udmVydGVyIiwibSIsInJlcXVpcmUiLCJqc2RvbSIsIndpbmRvdyIsImRlZmF1bHRWaWV3IiwiZ2xvYmFsIiwiYnRvYSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSUEsY0FBSixFQUFvQkMsbUJBQXBCOztJQUVxQkMsUTs7Ozs7Ozs7Ozs4QkFHVjtBQUNQLFdBQUtDLEdBQUwsR0FBUyxLQUFLQyxXQUFMLENBQWlCQyxN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cnRlcidcbmltcG9ydCBKU1ppcCBmcm9tICdqc3ppcCdcblxudmFyIGNyZWF0ZURvY3VtZW50LCBDU1NTdHlsZURlY2xhcmF0aW9uXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgQ29udmVydGVye1xuICBnZXQgdGFnKCl7cmV0dXJuICdodG1sJ31cblxuICBjb252ZXJ0KCl7XG4gICAgdGhpcy5kb2M9dGhpcy5jb25zdHJ1Y3Rvci5jcmVhdGUodGhpcy5vcHRpb25zKVxuICAgIHRoaXMuY29udGVudD10aGlzLmRvY1xuICAgIGxldCBjb250ZW50U3R5bGU9dGhpcy5jb250ZW50LnN0eWxlXG4gICAgY29udGVudFN0eWxlLmJhY2tncm91bmRDb2xvcj0ndHJhbnNwYXJlbnQnXG4gICAgY29udGVudFN0eWxlLm1pbkhlaWdodD0nMTAwMHB4J1xuICAgIGNvbnRlbnRTdHlsZS53aWR0aD0nMTAwJSdcbiAgICBjb250ZW50U3R5bGUucGFkZGluZ1RvcD0nMjBweCdcbiAgICBjb250ZW50U3R5bGUub3ZlcmZsb3c9J2F1dG8nXG5cbiAgICB2YXIgc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJyonKVxuICAgIHN0eWxlLm1hcmdpbj0nMCdcbiAgICBzdHlsZS5ib3JkZXI9JzAnXG4gICAgc3R5bGUucGFkZGluZz0nMCdcbiAgICBzdHlsZS5ib3hTaXppbmc9J2JvcmRlci1ib3gnXG5cbiAgICBzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgndGFibGUnKVxuICAgIHN0eWxlLndpZHRoPScxMDAlJ1xuICAgIHN0eWxlLmJvcmRlckNvbGxhcHNlPSdjb2xsYXBzZSdcbiAgICBzdHlsZS53b3JkQnJlYWs9J2JyZWFrLXdvcmQnXG5cbiAgICBzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnc2VjdGlvbicpXG4gICAgc3R5bGUubWFyZ2luPSdhdXRvJ1xuICAgIHN0eWxlLmJhY2tncm91bmRDb2xvcj0nd2hpdGUnXG4gICAgc3R5bGUuY29sb3I9J2JsYWNrJ1xuICAgIHN0eWxlLnBvc2l0aW9uPSdyZWxhdGl2ZSdcbiAgICBzdHlsZS56SW5kZXg9MFxuXG4gICAgc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3A6ZW1wdHk6YmVmb3JlJylcbiAgICBzdHlsZS5jb250ZW50PSdcIlwiJ1xuICAgIHN0eWxlLmRpc3BsYXk9J2lubGluZS1ibG9jaydcblxuICAgIHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCd1bCcpXG4gICAgc3R5bGUubGlzdFN0eWxlPVwibm9uZVwiXG5cbiAgICBzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgndWw+bGk+cCcpXG4gICAgc3R5bGUucG9zaXRpb249J3JlbGF0aXZlJ1xuXG4gICAgc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3VsIC5tYXJrZXInKVxuICAgIHN0eWxlLnBvc2l0aW9uPSdhYnNvbHV0ZSdcblxuICAgIHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCdhJylcbiAgICBzdHlsZS50ZXh0RGVjb3JhdGlvbj0nbm9uZSdcblxuICAgIHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCcudW5zdXBwb3J0ZWQnKVxuICAgIHN0eWxlLm91dGxpbmU9XCIycHggcmVkIHNvbGlkXCJcblxuICAgIHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCcud2FybmluZycpXG4gICAgc3R5bGUub3V0bGluZT1cIjFweCB5ZWxsb3cgc29saWRcIlxuICAgIHRoaXMuY29udmVydFN0eWxlKClcbiAgfVxuICBcbiAgY29udmVydFN0eWxlKCl7XG4gICAgdmFyIGJnU3R5bGU9dGhpcy53b3JkTW9kZWwuZ2V0QmFja2dyb3VuZFN0eWxlKClcbiAgICBpZighYmdTdHlsZSlcbiAgICAgIHJldHVyblxuICAgIFxuICAgIHZhciBzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnc2VjdGlvbicpXG4gICAgc3dpdGNoKHR5cGVvZiBiZ1N0eWxlKXtcbiAgICBjYXNlICdvYmplY3QnOi8vIGZpbGxcbiAgICAgIGNvbnNvbGUud2Fybignbm90IHN1cHBvcnQgZmlsbCBjb2xvciBvbiBkb2N1bWVudCBiYWNrZ3JvdW5kIHlldCcpXG4gICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgc3R5bGUuYmFja2dyb3VuZENvbG9yPWJnU3R5bGVcbiAgICBicmVha1xuICAgIH1cbiAgfVxuICAvKipcbiAgKiBvcHQ6IHtcbiAgKiAgIHRlbXBsYXRlOiBmdW5jdGlvbihzdHlsZSwgaHRtbCwgcHJvcHMpeyByZXR1cm4gKGh0bWwpfSxcbiAgICBleHRlbmRTY3JpcHQ6IFwiaHR0cDovL2EuY29tL2EuanNcIlxuICAgIH1cbiAgKi9cbiAgdG9TdHJpbmcob3B0KXtcbiAgICByZXR1cm4gdGhpcy5kb2MudG9TdHJpbmcob3B0LHRoaXMucHJvcHMpXG4gIH1cbiAgcmVsZWFzZSgpe1xuICAgIHRoaXMuZG9jLnJlbGVhc2UoKVxuICB9XG4gIGFzWmlwKG9wdCl7XG4gICAgcmV0dXJuIHRoaXMuZG9jLmFzWmlwKG9wdCx0aGlzLnByb3BzKVxuICB9XG4gIGRvd25sb2FkKG9wdCl7XG4gICAgcmV0dXJuIHRoaXMuZG9jLmRvd25sb2FkKG9wdCwgdGhpcy5wcm9wcylcbiAgfVxuICAvKipcbiAgKiBvcHQ9ZXh0ZW5kKHRvU3RyaW5nLm9wdCx7XG4gICAgc2F2ZUltYWdlOiBmdW5jdGlvbihhcnJheUJ1ZmZlciwgZG9jLnByb3BzKTogcHJvbWlzZSh1cmwpIHt9LFxuICAgIHNhdmVIdG1sOiBmdW5jdGlvbigpe31cbiAgfSlcbiAgKi9cbiAgc2F2ZSAob3B0KXtcbiAgICByZXR1cm4gdGhpcy5kb2Muc2F2ZShvcHQsIHRoaXMucHJvcHMpXG4gIH1cblxuICBzdGF0aWMgY3JlYXRlKG9wdCl7XG4gICAgdmFyIHNlbGZDb252ZXJ0ZXI9dGhpc1xuICAgIHJldHVybiAoZnVuY3Rpb24oZG9jdW1lbnQpe1xuICAgICAgdmFyIGRvYz0oZnVuY3Rpb24gYnJvd3NlckRvYygpe1xuICAgICAgICB2YXIgdWlkPTA7XG4gICAgICAgIHZhciByb290PU9iamVjdC5hc3NpZ24oZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jykse1xuICAgICAgICAgIGlkIDogXCJBXCIsXG4gICAgICAgICAgc2VjdGlvbjogbnVsbCxcbiAgICAgICAgICBjcmVhdGVFbGVtZW50OiBkb2N1bWVudC5jcmVhdGVFbGVtZW50LmJpbmQoZG9jdW1lbnQpLFxuICAgICAgICAgIGNyZWF0ZVRleHROb2RlOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZS5iaW5kKGRvY3VtZW50KSxcbiAgICAgICAgICBjcmVhdGVTdHlsZVNoZWV0KCl7XG4gICAgICAgICAgICBpZih0aGlzLnN0eWxlc2hlZXQpXG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0eWxlc2hlZXQ7XG4gICAgICAgICAgICB2YXIgZWxTdHlsZT10aGlzLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcbiAgICAgICAgICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZChlbFN0eWxlLG51bGwpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3R5bGVzaGVldD1lbFN0eWxlLnNoZWV0XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRTdHlsZVRleHQoKXtcbiAgICAgICAgICAgIHZhciBzdHlsZXM9W11cbiAgICAgICAgICAgIGZvcih2YXIgaT0wLCBydWxlcz10aGlzLnN0eWxlc2hlZXQuY3NzUnVsZXMsIGxlbj1ydWxlcy5sZW5ndGg7aTxsZW47aSsrKVxuICAgICAgICAgICAgICBzdHlsZXMucHVzaChydWxlc1tpXS5jc3NUZXh0KVxuICAgICAgICAgICAgcmV0dXJuIHN0eWxlcy5qb2luKCdcXHJcXG4nKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdWlkKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pZCsodWlkKyspXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0b1N0cmluZyhvcHQsIHByb3BzKXtcbiAgICAgICAgICAgIGlmKG9wdCAmJiB0eXBlb2Ygb3B0LnRlbXBsYXRlIT1cInVuZGVmaW5lZFwiICYmICR0b29sLmlzRnVuY3Rpb24ob3B0LnRlbXBsYXRlKSlcbiAgICAgICAgICAgICAgcmV0dXJuIG9wdC50ZW1wbGF0ZSh0aGlzLmdldFN0eWxlVGV4dCgpLCB0aGlzLl9odG1sKCksIHByb3BzKVxuICAgICAgICAgICAgdmFyIGh0bWw9Wyc8IWRvY3R5cGUgaHRtbD5cXHJcXG48aHRtbD48aGVhZD48bWV0YSBjaGFyc2V0PXV0Zi04PjxtZXRhIGtleT1cImdlbmVyYXRvclwiIHZhbHVlPVwiZG9jeDJodG1sXCI+PHRpdGxlPicrKHByb3BzLm5hbWV8fCcnKSsnPC90aXRsZT48c3R5bGU+J11cbiAgICAgICAgICAgIGh0bWwucHVzaCh0aGlzLmdldFN0eWxlVGV4dCgpKVxuICAgICAgICAgICAgaHRtbC5wdXNoKCc8L3N0eWxlPjwvaGVhZD48Ym9keT4nKVxuICAgICAgICAgICAgaHRtbC5wdXNoKHRoaXMuX2h0bWwoKSlcbiAgICAgICAgICAgIG9wdCAmJiBvcHQuZXh0ZW5kU2NyaXB0ICYmIGh0bWwucHVzaCgnPHNjcmlwdCBzcmM9XCInK29wdC5leHRlbmRTY3JpcHQrJ1wiPjwvc2NyaXB0PicpXG4gICAgICAgICAgICBodG1sLnB1c2goJzwvYm9keT48aHRtbD4nKVxuICAgICAgICAgICAgcmV0dXJuIGh0bWwuam9pbignXFxyXFxuJylcbiAgICAgICAgICB9LFxuICAgICAgICAgIF9odG1sKCl7XG4gICAgICAgICAgICB2YXIgZGl2cz10aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ3A+ZGl2LCBzcGFuPmRpdicpXG4gICAgICAgICAgICBpZihkaXZzLmxlbmd0aD09MClcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3V0ZXJIVE1MXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgKiBpbGxlZ2FsIDxwPiA8ZGl2Lz4gPC9wPlxuICAgICAgICAgICAgKiBET00gb3BlcmF0aW9uIGRpcmVjdGx5IGluIG9ubG9hZFxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHZhciBkaXZjb250YWluZXI9ZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLCB1aWQ9MFxuICAgICAgICAgICAgZGl2Y29udGFpbmVyLmlkPSdkaXZjb250YWluZXInXG4gICAgICAgICAgICBkaXZjb250YWluZXIuc3R5bGUuZGlzcGxheT1cIm5vbmVcIlxuICAgICAgICAgICAgdGhpcy5hcHBlbmRDaGlsZChkaXZjb250YWluZXIpXG4gICAgICAgICAgICBmb3IodmFyIGk9ZGl2cy5sZW5ndGgtMTtpPi0xO2ktLSl7XG4gICAgICAgICAgICAgIHZhciBkaXY9ZGl2c1tpXSxcbiAgICAgICAgICAgICAgICBwYXJlbnQ9ZGl2LnBhcmVudE5vZGU7XG5cbiAgICAgICAgICAgICAgaWYoIWRpdi5pZClcbiAgICAgICAgICAgICAgICBkaXYuaWQ9J196JysoKyt1aWQpXG5cbiAgICAgICAgICAgICAgaWYoIXBhcmVudC5pZClcbiAgICAgICAgICAgICAgICBwYXJlbnQuaWQ9J195Jyt1aWRcblxuICAgICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLXBhcmVudCcscGFyZW50LmlkKVxuICAgICAgICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JyxpbmRleE9mKGRpdixwYXJlbnQuY2hpbGROb2RlcykpXG5cbiAgICAgICAgICAgICAgZGl2Y29udGFpbmVyLmFwcGVuZENoaWxkKGRpdnNbaV0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBodG1sPXRoaXMub3V0ZXJIVE1MKydcXG5cXHI8c2NyaXB0PignK3RoaXMuX3RyYW5zZm9ybWVyLnRvU3RyaW5nKCkrJykoKTs8L3NjcmlwdD4nXG4gICAgICAgICAgICB0aGlzLl90cmFuc2Zvcm1lcigpO1xuICAgICAgICAgICAgcmV0dXJuIGh0bWxcbiAgICAgICAgICB9LFxuICAgICAgICAgIF90cmFuc2Zvcm1lcigpe1xuICAgICAgICAgICAgdmFyIGE9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2RpdmNvbnRhaW5lcicpXG4gICAgICAgICAgICBmb3IodmFyIGRpdnM9YS5jaGlsZE5vZGVzLCBpPWRpdnMubGVuZ3RoLTE7aT4tMTtpLS0pe1xuICAgICAgICAgICAgICB2YXIgZGl2PWRpdnNbaV0sXG4gICAgICAgICAgICAgICAgcGFyZW50SWQ9ZGl2LmdldEF0dHJpYnV0ZSgnZGF0YS1wYXJlbnQnKSxcbiAgICAgICAgICAgICAgICBpbmRleD1wYXJzZUludChkaXYuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykpLFxuICAgICAgICAgICAgICAgIHBhcmVudD1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJytwYXJlbnRJZCk7XG4gICAgICAgICAgICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoZGl2LHBhcmVudC5jaGlsZE5vZGVzW2luZGV4XSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGEucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChhKVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gaW5kZXhPZihlbCwgZWxzKXtcbiAgICAgICAgICBmb3IodmFyIGk9ZWxzLmxlbmd0aC0xO2k+MDtpLS0pXG4gICAgICAgICAgICBpZihlbD09ZWxzW2ldKVxuICAgICAgICAgICAgICByZXR1cm4gaVxuICAgICAgICAgIHJldHVybiAwXG4gICAgICAgIH1cblxuICAgICAgICAob3B0ICYmIG9wdC5jb250YWluZXIgfHwgZG9jdW1lbnQuYm9keSkuYXBwZW5kQ2hpbGQocm9vdCk7XG4gICAgICAgIHJvb3QuYm9keT1yb290XG4gICAgICAgIHJldHVybiByb290XG4gICAgICB9KSgpO1xuXG4gICAgICByZXR1cm4gKGZ1bmN0aW9uIG1peGluKGRvYyl7XG4gICAgICAgIHZhciBzdHlsZXNoZWV0PWRvYy5jcmVhdGVTdHlsZVNoZWV0KClcbiAgICAgICAgdmFyIHJlbFN0eWxlcz17fSwgc3R5bGVzPXt9XG5cbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oc2VsZkNvbnZlcnRlclskdG9vbC5pc05vZGUgPyAnbm9kZWZ5JyA6ICdicm93c2VyaWZ5J10oZG9jLHN0eWxlc2hlZXQsIG9wdCkse1xuICAgICAgICAgIGNyZWF0ZVN0eWxlKHNlbGVjdG9yKXtcbiAgICAgICAgICAgIGlmKHN0eWxlc1tzZWxlY3Rvcl0pXG4gICAgICAgICAgICAgIHJldHVybiBzdHlsZXNbc2VsZWN0b3JdXG4gICAgICAgICAgICB2YXIgcnVsZXM9c3R5bGVzaGVldC5jc3NSdWxlcyxsZW49cnVsZXMubGVuZ3RoXG4gICAgICAgICAgICBzdHlsZXNoZWV0Lmluc2VydFJ1bGUoc2VsZWN0b3Iuc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24oYSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEudHJpbSgpWzBdPT0nIycgPyBhIDogJyMnK3RoaXMuaWQrJyAnK2FcbiAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKS5qb2luKCcsJykrJ3t9JyxsZW4pXG4gICAgICAgICAgICByZXR1cm4gIHN0eWxlc1tzZWxlY3Rvcl09c3R5bGVzaGVldC5jc3NSdWxlc1tsZW5dLnN0eWxlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdHlsZVBhdGgoYSwgcGFyZW50KXtcbiAgICAgICAgICAgIGlmKHBhcmVudClcbiAgICAgICAgICAgICAgcmV0dXJuIHJlbFN0eWxlc1thXT1wYXJlbnRcbiAgICAgICAgICAgIHZhciBwYXRocz1bYV0scGFyZW50PWFcbiAgICAgICAgICAgIHdoaWxlKHBhcmVudD1yZWxTdHlsZXNbcGFyZW50XSlcbiAgICAgICAgICAgICAgcGF0aHMudW5zaGlmdChwYXJlbnQpXG4gICAgICAgICAgICByZXR1cm4gcGF0aHMuam9pbignICcpXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZWxlYXNlKCl7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5zZWN0aW9uXG4gICAgICAgICAgICB0aGlzLl9yZWxlYXNlKClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KShkb2MpXG4gICAgfSkoJHRvb2wuaXNOb2RlID8gY3JlYXRlRG9jdW1lbnQoKSA6IGRvY3VtZW50KVxuICB9XG5cbiAgc3RhdGljIG5vZGVmeShkb2MsIHN0eWxlc2hlZXQsIG9wdCl7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZG9jLHtcbiAgICAgIF9yZWxlYXNlKCl7XG5cbiAgICAgIH0sXG4gICAgICBhc0ltYWdlVVJMKGJ1ZmZlcil7XG4gICAgICAgIGlmKG9wdCAmJiB0eXBlb2Yob3B0LmFzSW1hZ2VVUkwpIT0ndW5kZWZpbmVkJylcbiAgICAgICAgICByZXR1cm4gb3B0LmFzSW1hZ2VVUkwoYnVmZmVyKVxuICAgICAgICByZXR1cm4gXCJpbWFnZTovL25vdHN1cHBvcnRcIlxuICAgICAgfSxcbiAgICAgIGFzWmlwKCl7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnQnKVxuICAgICAgfSxcbiAgICAgIGRvd25sb2FkKCl7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbm90IHN1cHBvcnQnKVxuICAgICAgfSxcbiAgICAgIHNhdmUoKXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCcpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBicm93c2VyaWZ5KGRvYywgc3R5bGVzaGVldCwgb3B0KXtcbiAgICB2YXIgUHJvdG9fQmxvYj0oZnVuY3Rpb24oYSl7XG4gICAgICAgIGE9VVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYigpKS5zcGxpdCgnLycpO1xuICAgICAgICBhLnBvcCgpO1xuICAgICAgICByZXR1cm4gYS5qb2luKCcvJylcbiAgICAgIH0pKCksXG4gICAgICBSZWdfUHJvdG9fQmxvYj1uZXcgUmVnRXhwKFByb3RvX0Jsb2IrXCIvKFtcXFxcd1xcXFxkLV0rKVwiLFwiZ2lcIik7XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihkb2Mse1xuICAgICAgYXNaaXAob3B0LCBwcm9wcyl7XG4gICAgICAgIHZhciB6aXA9bmV3IEpTWmlwKCksaGFzSW1hZ2U9ZmFsc2U7XG4gICAgICAgIHZhciBmPXppcC5mb2xkZXIoJ2ltYWdlcycpXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuaW1hZ2VzKS5mb3JFYWNoKGZ1bmN0aW9uKGEpe1xuICAgICAgICAgIGhhc0ltYWdlPXRydWVcbiAgICAgICAgICBmLmZpbGUoYS5zcGxpdCgnLycpLnBvcCgpLHRoaXNbYV0pXG4gICAgICAgIH0sdGhpcy5pbWFnZXMpXG4gICAgICAgIHppcC5maWxlKCdwcm9wcy5qc29uJyxKU09OLnN0cmluZ2lmeShwcm9wcykpO1xuICAgICAgICB6aXAuZmlsZSgnbWFpbi5odG1sJyxoYXNJbWFnZSA/IHRoaXMudG9TdHJpbmcob3B0KS5yZXBsYWNlKFByb3RvX0Jsb2IsJ2ltYWdlcycpIDogdGhpcy50b1N0cmluZygpKVxuICAgICAgICByZXR1cm4gemlwXG4gICAgICB9LFxuICAgICAgZG93bmxvYWQob3B0LCBwcm9wcyl7XG4gICAgICAgIHZhciBhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSlcbiAgICAgICAgYS5ocmVmPVVSTC5jcmVhdGVPYmplY3RVUkwodGhpcy5hc1ppcChvcHQscHJvcHMpLmdlbmVyYXRlKHt0eXBlOidibG9iJ30pKVxuICAgICAgICBhLmRvd25sb2FkPShwcm9wcy5uYW1lfHxcImRvY3VtZW50XCIpKycuemlwJ1xuICAgICAgICBhLmNsaWNrKClcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChhLmhyZWYpXG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSlcbiAgICAgIH0sXG4gICAgICBzYXZlKG9wdCwgcHJvcHMpe1xuICAgICAgICB2YXIgaGFzSW1hZ2U9ZmFsc2UsIGltYWdlcz17fSwgbWU9dGhpcztcbiAgICAgICAgcmV0dXJuICR0b29sLkRlZmVycmVkLndoZW4oKHRoaXMuaW1hZ2VzICYmIE9iamVjdC5rZXlzKHRoaXMuaW1hZ2VzKXx8W10pLm1hcChmdW5jdGlvbihhKXtcbiAgICAgICAgICBoYXNJbWFnZT10cnVlXG4gICAgICAgICAgcmV0dXJuIG9wdC5zYXZlSW1hZ2UodGhpc1thXSxwcm9wcylcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHVybCl7cmV0dXJuIGltYWdlc1thXT11cmx9KVxuICAgICAgICB9LHRoaXMuaW1hZ2VzKSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcbiAgICAgICAgICB2YXIgaHRtbD1tZS50b1N0cmluZyhvcHQsIHByb3BzKTtcbiAgICAgICAgICBpZihoYXNJbWFnZSlcbiAgICAgICAgICAgIGh0bWw9aHRtbC5yZXBsYWNlKFJlZ19Qcm90b19CbG9iLGZ1bmN0aW9uKGEsaWQpe3JldHVybiBpbWFnZXNbYV19KTtcbiAgICAgICAgICByZXR1cm4gb3B0LnNhdmVIdG1sKGh0bWwsIHByb3BzKVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGltYWdlczp7fSxcbiAgICAgIGFzSW1hZ2VVUkwoYXJyYXlCdWZmZXIpe1xuICAgICAgICB2YXIgdXJsPVVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW2FycmF5QnVmZmVyXSxcbiAgICAgICAgICB7dHlwZTpcImltYWdlL1wiKyh0eXBlb2YoYXJyYXlCdWZmZXIpPT0nc3RyaW5nJyA/ICdzdmcreG1sJyA6ICcqJyl9KSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzW3VybF09YXJyYXlCdWZmZXJcbiAgICAgICAgcmV0dXJuIHVybFxuICAgICAgfSxcbiAgICAgIF9yZWxlYXNlKCl7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuaW1hZ2VzKS5mb3JFYWNoKGZ1bmN0aW9uKGIpe1xuICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoYilcbiAgICAgICAgfSlcbiAgICAgICAgZGVsZXRlIHRoaXMuaW1hZ2VzXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG4oZnVuY3Rpb24oaXNOb2RlLCBtKXtcbiAgaWYoIWlzTm9kZSkgcmV0dXJuO1xuXG4gIGNyZWF0ZURvY3VtZW50PXJlcXVpcmUobSkuanNkb21cbiAgbGV0IHdpbmRvdz1jcmVhdGVEb2N1bWVudCgpLmRlZmF1bHRWaWV3XG5cbiAgZ2xvYmFsLmJ0b2E9d2luZG93LmJ0b2FcbiAgQ1NTU3R5bGVEZWNsYXJhdGlvbj13aW5kb3cuQ1NTU3R5bGVEZWNsYXJhdGlvblxufSkoJHRvb2wuaXNOb2RlLCBcImpzZG9tXCIpXG4iXX0=