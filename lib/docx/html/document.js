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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiY3JlYXRlRG9jdW1lbnQiLCJDU1NTdHlsZURlY2xhcmF0aW9uIiwiRG9jdW1lbnQiLCJkb2MiLCJjb25zdHJ1Y3RvciIsImNyZWF0ZSIsIm9wdGlvbnMiLCJjb250ZW50IiwiY29udGVudFN0eWxlIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJtaW5IZWlnaHQiLCJ3aWR0aCIsInBhZGRpbmdUb3AiLCJvdmVyZmxvdyIsImNyZWF0ZVN0eWxlIiwibWFyZ2luIiwiYm9yZGVyIiwicGFkZGluZyIsImJveFNpemluZyIsImJvcmRlckNvbGxhcHNlIiwid29yZEJyZWFrIiwiY29sb3IiLCJwb3NpdGlvbiIsInpJbmRleCIsImRpc3BsYXkiLCJsaXN0U3R5bGUiLCJ0ZXh0RGVjb3JhdGlvbiIsIm91dGxpbmUiLCJjb252ZXJ0U3R5bGUiLCJiZ1N0eWxlIiwid29yZE1vZGVsIiwiZ2V0QmFja2dyb3VuZFN0eWxlIiwiY29uc29sZSIsIndhcm4iLCJvcHQiLCJ0b1N0cmluZyIsInByb3BzIiwicmVsZWFzZSIsImFzWmlwIiwiZG93bmxvYWQiLCJzYXZlIiwic2VsZkNvbnZlcnRlciIsImRvY3VtZW50IiwiYnJvd3NlckRvYyIsInVpZCIsInJvb3QiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJzZWN0aW9uIiwiYmluZCIsImNyZWF0ZVRleHROb2RlIiwiY3JlYXRlU3R5bGVTaGVldCIsInN0eWxlc2hlZXQiLCJlbFN0eWxlIiwiYm9keSIsImFwcGVuZENoaWxkIiwic2hlZXQiLCJnZXRTdHlsZVRleHQiLCJzdHlsZXMiLCJpIiwicnVsZXMiLCJjc3NSdWxlcyIsImxlbiIsImxlbmd0aCIsInB1c2giLCJjc3NUZXh0Iiwiam9pbiIsInRlbXBsYXRlIiwiJCIsImlzRnVuY3Rpb24iLCJfaHRtbCIsImh0bWwiLCJuYW1lIiwiZXh0ZW5kU2NyaXB0IiwiZGl2cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJvdXRlckhUTUwiLCJkaXZjb250YWluZXIiLCJkaXYiLCJwYXJlbnQiLCJwYXJlbnROb2RlIiwic2V0QXR0cmlidXRlIiwiaW5kZXhPZiIsImNoaWxkTm9kZXMiLCJfdHJhbnNmb3JtZXIiLCJhIiwicXVlcnlTZWxlY3RvciIsInBhcmVudElkIiwiZ2V0QXR0cmlidXRlIiwiaW5kZXgiLCJwYXJzZUludCIsImluc2VydEJlZm9yZSIsInJlbW92ZUNoaWxkIiwiZWwiLCJlbHMiLCJjb250YWluZXIiLCJtaXhpbiIsInJlbFN0eWxlcyIsImlzTm9kZSIsInNlbGVjdG9yIiwiaW5zZXJ0UnVsZSIsInNwbGl0IiwibWFwIiwidHJpbSIsInN0eWxlUGF0aCIsInBhdGhzIiwidW5zaGlmdCIsIl9yZWxlYXNlIiwiYXNJbWFnZVVSTCIsImJ1ZmZlciIsIkVycm9yIiwiUHJvdG9fQmxvYiIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsIkJsb2IiLCJwb3AiLCJSZWdfUHJvdG9fQmxvYiIsIlJlZ0V4cCIsInppcCIsIkpTWmlwIiwiaGFzSW1hZ2UiLCJmIiwiZm9sZGVyIiwiaW1hZ2VzIiwiZm9yRWFjaCIsImZpbGUiLCJyZXBsYWNlIiwiaHJlZiIsImdlbmVyYXRlIiwidHlwZSIsImNsaWNrIiwicmV2b2tlT2JqZWN0VVJMIiwibWUiLCJEZWZlcnJlZCIsIndoZW4iLCJzYXZlSW1hZ2UiLCJ0aGVuIiwidXJsIiwic2F2ZUh0bWwiLCJhcnJheUJ1ZmZlciIsImIiLCJDb252ZXJ0ZXIiLCJtIiwicmVxdWlyZSIsImpzZG9tIiwid2luZG93IiwiZGVmYXVsdFZpZXciLCJnbG9iYWwiLCJidG9hIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJQSxjQUFKLEVBQW9CQyxtQkFBcEI7O0lBRXFCQyxROzs7Ozs7Ozs7OzhCQUdWO0FBQ1AsV0FBS0MsR0FBTCxHQUFTLEtBQUtDLFdBQUwsQ0FBaUJDLE1BQWpC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QU9uRCxJQUFJd0csUUFBSixDQUFhbkUsSUFBYixFQUFtQm5DLEtBQW5CLENBQVA7QUFDRCxXQVZNLENBQVA7QUFXRCxTQWxDc0I7O0FBbUN2QnVGLGdCQUFPLEVBbkNnQjtBQW9DdkJmLGtCQXBDdUIsc0JBb0NaK0IsV0FwQ1ksRUFvQ0E7QUFDckIsY0FBSUYsTUFBSXpCLElBQUlDLGVBQUosQ0FBb0IsSUFBSUMsSUFBSixDQUFTLENBQUN5QixXQUFELENBQVQsRUFDMUIsRUFBQ1YsTUFBSyxZQUFVLE9BQU9VLFdBQVAsSUFBcUIsUUFBckIsR0FBZ0MsU0FBaEMsR0FBNEMsR0FBdEQsQ0FBTixFQUQwQixDQUFwQixDQUFSO0FBRUEsZUFBS2hCLE1BQUwsQ0FBWWMsR0FBWixJQUFpQkUsV0FBakI7QUFDQSxpQkFBT0YsR0FBUDtBQUNELFNBekNzQjtBQTBDdkI5QixnQkExQ3VCLHNCQTBDYjtBQUNSLDhCQUFZLEtBQUtnQixNQUFqQixFQUF5QkMsT0FBekIsQ0FBaUMsVUFBU2dCLENBQVQsRUFBVztBQUMxQzVCLGdCQUFJbUIsZUFBSixDQUFvQlMsQ0FBcEI7QUFDRCxXQUZEO0FBR0EsaUJBQU8sS0FBS2pCLE1BQVo7QUFDRDtBQS9Dc0IsT0FBbEIsQ0FBUDtBQWlERDs7O0VBL1NtQ2tCLG1COztrQkFBakI1SSxROzs7QUFrVHJCLENBQUMsVUFBU2lHLE1BQVQsRUFBaUI0QyxDQUFqQixFQUFtQjtBQUNsQixNQUFHLENBQUM1QyxNQUFKLEVBQVk7O0FBRVpuRyxtQkFBZWdKLFFBQVFELENBQVIsRUFBV0UsS0FBMUI7QUFDQSxNQUFJQyxTQUFPbEosaUJBQWlCbUosV0FBNUI7O0FBRUFDLFNBQU9DLElBQVAsR0FBWUgsT0FBT0csSUFBbkI7QUFDQXBKLHdCQUFvQmlKLE9BQU9qSixtQkFBM0I7QUFDRCxDQVJELEVBUUdvRSxFQUFFOEIsTUFSTCxFQVFhLE9BUmIiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJ1xuaW1wb3J0IEpTWmlwIGZyb20gJ2pzemlwJ1xuXG52YXIgY3JlYXRlRG9jdW1lbnQsIENTU1N0eWxlRGVjbGFyYXRpb25cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyBDb252ZXJ0ZXJ7XG4gIGdldCB0YWcoKXtyZXR1cm4gJ2h0bWwnfVxuXG4gIGNvbnZlcnQoKXtcbiAgICB0aGlzLmRvYz10aGlzLmNvbnN0cnVjdG9yLmNyZWF0ZSh0aGlzLm9wdGlvbnMpXG4gICAgdGhpcy5jb250ZW50PXRoaXMuZG9jXG4gICAgbGV0IGNvbnRlbnRTdHlsZT10aGlzLmNvbnRlbnQuc3R5bGVcbiAgICBjb250ZW50U3R5bGUuYmFja2dyb3VuZENvbG9yPSd0cmFuc3BhcmVudCdcbiAgICBjb250ZW50U3R5bGUubWluSGVpZ2h0PScxMDAwcHgnXG4gICAgY29udGVudFN0eWxlLndpZHRoPScxMDAlJ1xuICAgIGNvbnRlbnRTdHlsZS5wYWRkaW5nVG9wPScyMHB4J1xuICAgIGNvbnRlbnRTdHlsZS5vdmVyZmxvdz0nYXV0bydcblxuICAgIHZhciBzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnKicpXG4gICAgc3R5bGUubWFyZ2luPScwJ1xuICAgIHN0eWxlLmJvcmRlcj0nMCdcbiAgICBzdHlsZS5wYWRkaW5nPScwJ1xuICAgIHN0eWxlLmJveFNpemluZz0nYm9yZGVyLWJveCdcblxuICAgIHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCd0YWJsZScpXG4gICAgc3R5bGUud2lkdGg9JzEwMCUnXG4gICAgc3R5bGUuYm9yZGVyQ29sbGFwc2U9J2NvbGxhcHNlJ1xuICAgIHN0eWxlLndvcmRCcmVhaz0nYnJlYWstd29yZCdcblxuICAgIHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCdzZWN0aW9uJylcbiAgICBzdHlsZS5tYXJnaW49J2F1dG8nXG4gICAgc3R5bGUuYmFja2dyb3VuZENvbG9yPSd3aGl0ZSdcbiAgICBzdHlsZS5jb2xvcj0nYmxhY2snXG4gICAgc3R5bGUucG9zaXRpb249J3JlbGF0aXZlJ1xuICAgIHN0eWxlLnpJbmRleD0wXG5cbiAgICBzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgncDplbXB0eTpiZWZvcmUnKVxuICAgIHN0eWxlLmNvbnRlbnQ9J1wiXCInXG4gICAgc3R5bGUuZGlzcGxheT0naW5saW5lLWJsb2NrJ1xuXG4gICAgc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3VsJylcbiAgICBzdHlsZS5saXN0U3R5bGU9XCJub25lXCJcblxuICAgIHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCd1bD5saT5wJylcbiAgICBzdHlsZS5wb3NpdGlvbj0ncmVsYXRpdmUnXG5cbiAgICBzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgndWwgLm1hcmtlcicpXG4gICAgc3R5bGUucG9zaXRpb249J2Fic29sdXRlJ1xuXG4gICAgc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ2EnKVxuICAgIHN0eWxlLnRleHREZWNvcmF0aW9uPSdub25lJ1xuXG4gICAgc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJy51bnN1cHBvcnRlZCcpXG4gICAgc3R5bGUub3V0bGluZT1cIjJweCByZWQgc29saWRcIlxuXG4gICAgc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJy53YXJuaW5nJylcbiAgICBzdHlsZS5vdXRsaW5lPVwiMXB4IHllbGxvdyBzb2xpZFwiXG4gICAgdGhpcy5jb252ZXJ0U3R5bGUoKVxuICB9XG4gIFxuICBjb252ZXJ0U3R5bGUoKXtcbiAgICB2YXIgYmdTdHlsZT10aGlzLndvcmRNb2RlbC5nZXRCYWNrZ3JvdW5kU3R5bGUoKVxuICAgIGlmKCFiZ1N0eWxlKVxuICAgICAgcmV0dXJuXG4gICAgXG4gICAgdmFyIHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCdzZWN0aW9uJylcbiAgICBzd2l0Y2godHlwZW9mIGJnU3R5bGUpe1xuICAgIGNhc2UgJ29iamVjdCc6Ly8gZmlsbFxuICAgICAgY29uc29sZS53YXJuKCdub3Qgc3VwcG9ydCBmaWxsIGNvbG9yIG9uIGRvY3VtZW50IGJhY2tncm91bmQgeWV0JylcbiAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBzdHlsZS5iYWNrZ3JvdW5kQ29sb3I9YmdTdHlsZVxuICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIC8qKlxuICAqIG9wdDoge1xuICAqICAgdGVtcGxhdGU6IGZ1bmN0aW9uKHN0eWxlLCBodG1sLCBwcm9wcyl7IHJldHVybiAoaHRtbCl9LFxuICAgIGV4dGVuZFNjcmlwdDogXCJodHRwOi8vYS5jb20vYS5qc1wiXG4gICAgfVxuICAqL1xuICB0b1N0cmluZyhvcHQpe1xuICAgIHJldHVybiB0aGlzLmRvYy50b1N0cmluZyhvcHQsdGhpcy5wcm9wcylcbiAgfVxuICByZWxlYXNlKCl7XG4gICAgdGhpcy5kb2MucmVsZWFzZSgpXG4gIH1cbiAgYXNaaXAob3B0KXtcbiAgICByZXR1cm4gdGhpcy5kb2MuYXNaaXAob3B0LHRoaXMucHJvcHMpXG4gIH1cbiAgZG93bmxvYWQob3B0KXtcbiAgICByZXR1cm4gdGhpcy5kb2MuZG93bmxvYWQob3B0LCB0aGlzLnByb3BzKVxuICB9XG4gIC8qKlxuICAqIG9wdD1leHRlbmQodG9TdHJpbmcub3B0LHtcbiAgICBzYXZlSW1hZ2U6IGZ1bmN0aW9uKGFycmF5QnVmZmVyLCBkb2MucHJvcHMpOiBwcm9taXNlKHVybCkge30sXG4gICAgc2F2ZUh0bWw6IGZ1bmN0aW9uKCl7fVxuICB9KVxuICAqL1xuICBzYXZlIChvcHQpe1xuICAgIHJldHVybiB0aGlzLmRvYy5zYXZlKG9wdCwgdGhpcy5wcm9wcylcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUob3B0KXtcbiAgICB2YXIgc2VsZkNvbnZlcnRlcj10aGlzXG4gICAgcmV0dXJuIChmdW5jdGlvbihkb2N1bWVudCl7XG4gICAgICB2YXIgZG9jPShmdW5jdGlvbiBicm93c2VyRG9jKCl7XG4gICAgICAgIHZhciB1aWQ9MDtcbiAgICAgICAgdmFyIHJvb3Q9T2JqZWN0LmFzc2lnbihkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSx7XG4gICAgICAgICAgaWQgOiBcIkFcIixcbiAgICAgICAgICBzZWN0aW9uOiBudWxsLFxuICAgICAgICAgIGNyZWF0ZUVsZW1lbnQ6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQuYmluZChkb2N1bWVudCksXG4gICAgICAgICAgY3JlYXRlVGV4dE5vZGU6IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlLmJpbmQoZG9jdW1lbnQpLFxuICAgICAgICAgIGNyZWF0ZVN0eWxlU2hlZXQoKXtcbiAgICAgICAgICAgIGlmKHRoaXMuc3R5bGVzaGVldClcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3R5bGVzaGVldDtcbiAgICAgICAgICAgIHZhciBlbFN0eWxlPXRoaXMuY3JlYXRlRWxlbWVudCgnc3R5bGUnKVxuICAgICAgICAgICAgdGhpcy5ib2R5LmFwcGVuZENoaWxkKGVsU3R5bGUsbnVsbCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdHlsZXNoZWV0PWVsU3R5bGUuc2hlZXRcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldFN0eWxlVGV4dCgpe1xuICAgICAgICAgICAgdmFyIHN0eWxlcz1bXVxuICAgICAgICAgICAgZm9yKHZhciBpPTAsIHJ1bGVzPXRoaXMuc3R5bGVzaGVldC5jc3NSdWxlcywgbGVuPXJ1bGVzLmxlbmd0aDtpPGxlbjtpKyspXG4gICAgICAgICAgICAgIHN0eWxlcy5wdXNoKHJ1bGVzW2ldLmNzc1RleHQpXG4gICAgICAgICAgICByZXR1cm4gc3R5bGVzLmpvaW4oJ1xcclxcbicpXG4gICAgICAgICAgfSxcbiAgICAgICAgICB1aWQoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlkKyh1aWQrKylcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRvU3RyaW5nKG9wdCwgcHJvcHMpe1xuICAgICAgICAgICAgaWYob3B0ICYmIHR5cGVvZiBvcHQudGVtcGxhdGUhPVwidW5kZWZpbmVkXCIgJiYgJC5pc0Z1bmN0aW9uKG9wdC50ZW1wbGF0ZSkpXG4gICAgICAgICAgICAgIHJldHVybiBvcHQudGVtcGxhdGUodGhpcy5nZXRTdHlsZVRleHQoKSwgdGhpcy5faHRtbCgpLCBwcm9wcylcbiAgICAgICAgICAgIHZhciBodG1sPVsnPCFkb2N0eXBlIGh0bWw+XFxyXFxuPGh0bWw+PGhlYWQ+PG1ldGEgY2hhcnNldD11dGYtOD48bWV0YSBrZXk9XCJnZW5lcmF0b3JcIiB2YWx1ZT1cImRvY3gyaHRtbFwiPjx0aXRsZT4nKyhwcm9wcy5uYW1lfHwnJykrJzwvdGl0bGU+PHN0eWxlPiddXG4gICAgICAgICAgICBodG1sLnB1c2godGhpcy5nZXRTdHlsZVRleHQoKSlcbiAgICAgICAgICAgIGh0bWwucHVzaCgnPC9zdHlsZT48L2hlYWQ+PGJvZHk+JylcbiAgICAgICAgICAgIGh0bWwucHVzaCh0aGlzLl9odG1sKCkpXG4gICAgICAgICAgICBvcHQgJiYgb3B0LmV4dGVuZFNjcmlwdCAmJiBodG1sLnB1c2goJzxzY3JpcHQgc3JjPVwiJytvcHQuZXh0ZW5kU2NyaXB0KydcIj48L3NjcmlwdD4nKVxuICAgICAgICAgICAgaHRtbC5wdXNoKCc8L2JvZHk+PGh0bWw+JylcbiAgICAgICAgICAgIHJldHVybiBodG1sLmpvaW4oJ1xcclxcbicpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBfaHRtbCgpe1xuICAgICAgICAgICAgdmFyIGRpdnM9dGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdwPmRpdiwgc3Bhbj5kaXYnKVxuICAgICAgICAgICAgaWYoZGl2cy5sZW5ndGg9PTApXG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLm91dGVySFRNTFxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICogaWxsZWdhbCA8cD4gPGRpdi8+IDwvcD5cbiAgICAgICAgICAgICogRE9NIG9wZXJhdGlvbiBkaXJlY3RseSBpbiBvbmxvYWRcbiAgICAgICAgICAgICovXG4gICAgICAgICAgICB2YXIgZGl2Y29udGFpbmVyPWRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKSwgdWlkPTBcbiAgICAgICAgICAgIGRpdmNvbnRhaW5lci5pZD0nZGl2Y29udGFpbmVyJ1xuICAgICAgICAgICAgZGl2Y29udGFpbmVyLnN0eWxlLmRpc3BsYXk9XCJub25lXCJcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoZGl2Y29udGFpbmVyKVxuICAgICAgICAgICAgZm9yKHZhciBpPWRpdnMubGVuZ3RoLTE7aT4tMTtpLS0pe1xuICAgICAgICAgICAgICB2YXIgZGl2PWRpdnNbaV0sXG4gICAgICAgICAgICAgICAgcGFyZW50PWRpdi5wYXJlbnROb2RlO1xuXG4gICAgICAgICAgICAgIGlmKCFkaXYuaWQpXG4gICAgICAgICAgICAgICAgZGl2LmlkPSdfeicrKCsrdWlkKVxuXG4gICAgICAgICAgICAgIGlmKCFwYXJlbnQuaWQpXG4gICAgICAgICAgICAgICAgcGFyZW50LmlkPSdfeScrdWlkXG5cbiAgICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1wYXJlbnQnLHBhcmVudC5pZClcbiAgICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsaW5kZXhPZihkaXYscGFyZW50LmNoaWxkTm9kZXMpKVxuXG4gICAgICAgICAgICAgIGRpdmNvbnRhaW5lci5hcHBlbmRDaGlsZChkaXZzW2ldKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaHRtbD10aGlzLm91dGVySFRNTCsnXFxuXFxyPHNjcmlwdD4oJyt0aGlzLl90cmFuc2Zvcm1lci50b1N0cmluZygpKycpKCk7PC9zY3JpcHQ+J1xuICAgICAgICAgICAgdGhpcy5fdHJhbnNmb3JtZXIoKTtcbiAgICAgICAgICAgIHJldHVybiBodG1sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBfdHJhbnNmb3JtZXIoKXtcbiAgICAgICAgICAgIHZhciBhPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaXZjb250YWluZXInKVxuICAgICAgICAgICAgZm9yKHZhciBkaXZzPWEuY2hpbGROb2RlcywgaT1kaXZzLmxlbmd0aC0xO2k+LTE7aS0tKXtcbiAgICAgICAgICAgICAgdmFyIGRpdj1kaXZzW2ldLFxuICAgICAgICAgICAgICAgIHBhcmVudElkPWRpdi5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50JyksXG4gICAgICAgICAgICAgICAgaW5kZXg9cGFyc2VJbnQoZGl2LmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpKSxcbiAgICAgICAgICAgICAgICBwYXJlbnQ9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycrcGFyZW50SWQpO1xuICAgICAgICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGRpdixwYXJlbnQuY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGluZGV4T2YoZWwsIGVscyl7XG4gICAgICAgICAgZm9yKHZhciBpPWVscy5sZW5ndGgtMTtpPjA7aS0tKVxuICAgICAgICAgICAgaWYoZWw9PWVsc1tpXSlcbiAgICAgICAgICAgICAgcmV0dXJuIGlcbiAgICAgICAgICByZXR1cm4gMFxuICAgICAgICB9XG5cbiAgICAgICAgKG9wdCAmJiBvcHQuY29udGFpbmVyIHx8IGRvY3VtZW50LmJvZHkpLmFwcGVuZENoaWxkKHJvb3QpO1xuICAgICAgICByb290LmJvZHk9cm9vdFxuICAgICAgICByZXR1cm4gcm9vdFxuICAgICAgfSkoKTtcblxuICAgICAgcmV0dXJuIChmdW5jdGlvbiBtaXhpbihkb2Mpe1xuICAgICAgICB2YXIgc3R5bGVzaGVldD1kb2MuY3JlYXRlU3R5bGVTaGVldCgpXG4gICAgICAgIHZhciByZWxTdHlsZXM9e30sIHN0eWxlcz17fVxuXG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHNlbGZDb252ZXJ0ZXJbJC5pc05vZGUgPyAnbm9kZWZ5JyA6ICdicm93c2VyaWZ5J10oZG9jLHN0eWxlc2hlZXQsIG9wdCkse1xuICAgICAgICAgIGNyZWF0ZVN0eWxlKHNlbGVjdG9yKXtcbiAgICAgICAgICAgIGlmKHN0eWxlc1tzZWxlY3Rvcl0pXG4gICAgICAgICAgICAgIHJldHVybiBzdHlsZXNbc2VsZWN0b3JdXG4gICAgICAgICAgICB2YXIgcnVsZXM9c3R5bGVzaGVldC5jc3NSdWxlcyxsZW49cnVsZXMubGVuZ3RoXG4gICAgICAgICAgICBzdHlsZXNoZWV0Lmluc2VydFJ1bGUoc2VsZWN0b3Iuc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24oYSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEudHJpbSgpWzBdPT0nIycgPyBhIDogJyMnK3RoaXMuaWQrJyAnK2FcbiAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKS5qb2luKCcsJykrJ3t9JyxsZW4pXG4gICAgICAgICAgICByZXR1cm4gIHN0eWxlc1tzZWxlY3Rvcl09c3R5bGVzaGVldC5jc3NSdWxlc1tsZW5dLnN0eWxlXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdHlsZVBhdGgoYSwgcGFyZW50KXtcbiAgICAgICAgICAgIGlmKHBhcmVudClcbiAgICAgICAgICAgICAgcmV0dXJuIHJlbFN0eWxlc1thXT1wYXJlbnRcbiAgICAgICAgICAgIHZhciBwYXRocz1bYV0scGFyZW50PWFcbiAgICAgICAgICAgIHdoaWxlKHBhcmVudD1yZWxTdHlsZXNbcGFyZW50XSlcbiAgICAgICAgICAgICAgcGF0aHMudW5zaGlmdChwYXJlbnQpXG4gICAgICAgICAgICByZXR1cm4gcGF0aHMuam9pbignICcpXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZWxlYXNlKCl7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5zZWN0aW9uXG4gICAgICAgICAgICB0aGlzLl9yZWxlYXNlKClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KShkb2MpXG4gICAgfSkoJC5pc05vZGUgPyBjcmVhdGVEb2N1bWVudCgpIDogZG9jdW1lbnQpXG4gIH1cblxuICBzdGF0aWMgbm9kZWZ5KGRvYywgc3R5bGVzaGVldCwgb3B0KXtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihkb2Mse1xuICAgICAgX3JlbGVhc2UoKXtcblxuICAgICAgfSxcbiAgICAgIGFzSW1hZ2VVUkwoYnVmZmVyKXtcbiAgICAgICAgaWYob3B0ICYmIHR5cGVvZihvcHQuYXNJbWFnZVVSTCkhPSd1bmRlZmluZWQnKVxuICAgICAgICAgIHJldHVybiBvcHQuYXNJbWFnZVVSTChidWZmZXIpXG4gICAgICAgIHJldHVybiBcImltYWdlOi8vbm90c3VwcG9ydFwiXG4gICAgICB9LFxuICAgICAgYXNaaXAoKXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCcpXG4gICAgICB9LFxuICAgICAgZG93bmxvYWQoKXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCcpXG4gICAgICB9LFxuICAgICAgc2F2ZSgpe1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0JylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIGJyb3dzZXJpZnkoZG9jLCBzdHlsZXNoZWV0LCBvcHQpe1xuICAgIHZhciBQcm90b19CbG9iPShmdW5jdGlvbihhKXtcbiAgICAgICAgYT1VUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKCkpLnNwbGl0KCcvJyk7XG4gICAgICAgIGEucG9wKCk7XG4gICAgICAgIHJldHVybiBhLmpvaW4oJy8nKVxuICAgICAgfSkoKSxcbiAgICAgIFJlZ19Qcm90b19CbG9iPW5ldyBSZWdFeHAoUHJvdG9fQmxvYitcIi8oW1xcXFx3XFxcXGQtXSspXCIsXCJnaVwiKTtcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKGRvYyx7XG4gICAgICBhc1ppcChvcHQsIHByb3BzKXtcbiAgICAgICAgdmFyIHppcD1uZXcgSlNaaXAoKSxoYXNJbWFnZT1mYWxzZTtcbiAgICAgICAgdmFyIGY9emlwLmZvbGRlcignaW1hZ2VzJylcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5pbWFnZXMpLmZvckVhY2goZnVuY3Rpb24oYSl7XG4gICAgICAgICAgaGFzSW1hZ2U9dHJ1ZVxuICAgICAgICAgIGYuZmlsZShhLnNwbGl0KCcvJykucG9wKCksdGhpc1thXSlcbiAgICAgICAgfSx0aGlzLmltYWdlcylcbiAgICAgICAgemlwLmZpbGUoJ3Byb3BzLmpzb24nLEpTT04uc3RyaW5naWZ5KHByb3BzKSk7XG4gICAgICAgIHppcC5maWxlKCdtYWluLmh0bWwnLGhhc0ltYWdlID8gdGhpcy50b1N0cmluZyhvcHQpLnJlcGxhY2UoUHJvdG9fQmxvYiwnaW1hZ2VzJykgOiB0aGlzLnRvU3RyaW5nKCkpXG4gICAgICAgIHJldHVybiB6aXBcbiAgICAgIH0sXG4gICAgICBkb3dubG9hZChvcHQsIHByb3BzKXtcbiAgICAgICAgdmFyIGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIilcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKVxuICAgICAgICBhLmhyZWY9VVJMLmNyZWF0ZU9iamVjdFVSTCh0aGlzLmFzWmlwKG9wdCxwcm9wcykuZ2VuZXJhdGUoe3R5cGU6J2Jsb2InfSkpXG4gICAgICAgIGEuZG93bmxvYWQ9KHByb3BzLm5hbWV8fFwiZG9jdW1lbnRcIikrJy56aXAnXG4gICAgICAgIGEuY2xpY2soKVxuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGEuaHJlZilcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKVxuICAgICAgfSxcbiAgICAgIHNhdmUob3B0LCBwcm9wcyl7XG4gICAgICAgIHZhciBoYXNJbWFnZT1mYWxzZSwgaW1hZ2VzPXt9LCBtZT10aGlzO1xuICAgICAgICByZXR1cm4gJC5EZWZlcnJlZC53aGVuKCh0aGlzLmltYWdlcyAmJiBPYmplY3Qua2V5cyh0aGlzLmltYWdlcyl8fFtdKS5tYXAoZnVuY3Rpb24oYSl7XG4gICAgICAgICAgaGFzSW1hZ2U9dHJ1ZVxuICAgICAgICAgIHJldHVybiBvcHQuc2F2ZUltYWdlKHRoaXNbYV0scHJvcHMpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbih1cmwpe3JldHVybiBpbWFnZXNbYV09dXJsfSlcbiAgICAgICAgfSx0aGlzLmltYWdlcykpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgdmFyIGh0bWw9bWUudG9TdHJpbmcob3B0LCBwcm9wcyk7XG4gICAgICAgICAgaWYoaGFzSW1hZ2UpXG4gICAgICAgICAgICBodG1sPWh0bWwucmVwbGFjZShSZWdfUHJvdG9fQmxvYixmdW5jdGlvbihhLGlkKXtyZXR1cm4gaW1hZ2VzW2FdfSk7XG4gICAgICAgICAgcmV0dXJuIG9wdC5zYXZlSHRtbChodG1sLCBwcm9wcylcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBpbWFnZXM6e30sXG4gICAgICBhc0ltYWdlVVJMKGFycmF5QnVmZmVyKXtcbiAgICAgICAgdmFyIHVybD1VUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFthcnJheUJ1ZmZlcl0sXG4gICAgICAgICAge3R5cGU6XCJpbWFnZS9cIisodHlwZW9mKGFycmF5QnVmZmVyKT09J3N0cmluZycgPyAnc3ZnK3htbCcgOiAnKicpfSkpO1xuICAgICAgICB0aGlzLmltYWdlc1t1cmxdPWFycmF5QnVmZmVyXG4gICAgICAgIHJldHVybiB1cmxcbiAgICAgIH0sXG4gICAgICBfcmVsZWFzZSgpe1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmltYWdlcykuZm9yRWFjaChmdW5jdGlvbihiKXtcbiAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGIpXG4gICAgICAgIH0pXG4gICAgICAgIGRlbGV0ZSB0aGlzLmltYWdlc1xuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuKGZ1bmN0aW9uKGlzTm9kZSwgbSl7XG4gIGlmKCFpc05vZGUpIHJldHVybjtcblxuICBjcmVhdGVEb2N1bWVudD1yZXF1aXJlKG0pLmpzZG9tXG4gIGxldCB3aW5kb3c9Y3JlYXRlRG9jdW1lbnQoKS5kZWZhdWx0Vmlld1xuXG4gIGdsb2JhbC5idG9hPXdpbmRvdy5idG9hXG4gIENTU1N0eWxlRGVjbGFyYXRpb249d2luZG93LkNTU1N0eWxlRGVjbGFyYXRpb25cbn0pKCQuaXNOb2RlLCBcImpzZG9tXCIpXG4iXX0=