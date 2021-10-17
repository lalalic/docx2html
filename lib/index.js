"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

exports.default = docx2html;

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _factory = require("./docx/html/factory");

var _factory2 = _interopRequireDefault(_factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 * @param {*} file 
 * @param {*} options {
 * 	container: optional, default is document.body, a HTMLElement to contain converted html
 * 	asImageURL: only nodejs required, a function to convert image data to url
 * }
 * @returns 
 */
function docx2html(file, opt) {
	return _docx4js2.default.load(file).then(function (docx) {
		var html = docx.parse(_docx4js2.default.createVisitorFactory(_factory2.default, opt));
		return (0, _create2.default)({
			toString: function toString() {
				return html.toString.apply(html, arguments);
			},
			asZip: function asZip() {
				return html.asZip.apply(html, arguments);
			},
			download: function download() {
				return html.download.apply(html, arguments);
			},
			save: function save() {
				return html.save.apply(html, arguments);
			},
			release: function release() {
				html.release();
			}
		});
	});
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkb2N4Mmh0bWwiLCJmaWxlIiwib3B0IiwiZG9jeDRqcyIsImxvYWQiLCJ0aGVuIiwiaHRtbCIsImRvY3giLCJwYXJzZSIsImNyZWF0ZVZpc2l0b3JGYWN0b3J5IiwiY29udmVydGVycyIsInRvU3RyaW5nIiwiYXJndW1lbnRzIiwiYXNaaXAiLCJkb3dubG9hZCIsInNhdmUiLCJyZWxlYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O2tCQVl3QkEsUzs7QUFaeEI7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7Ozs7OztBQVNlLFNBQVNBLFNBQVQsQ0FBbUJDLElBQW5CLEVBQXlCQyxHQUF6QixFQUE2QjtBQUMzQyxRQUFPQyxrQkFBUUMsSUFBUixDQUFhSCxJQUFiLEVBQ0xJLElBREssQ0FDQSxnQkFBTTtBQUNYLE1BQU1DLE9BQUtDLEtBQUtDLEtBQUwsQ0FBV0wsa0JBQVFNLG9CQUFSLENBQTZCQyxpQkFBN0IsRUFBd0NSLEdBQXhDLENBQVgsQ0FBWDtBQUNBLFNBQU8sc0JBQWM7QUFDcEJTLFdBRG9CLHNCQUNWO0FBQ1QsV0FBT0wsS0FBS0ssUUFBTCxhQUFpQkMsU0FBakIsQ0FBUDtBQUNBLElBSG1CO0FBSXBCQyxRQUpvQixtQkFJYjtBQUNOLFdBQU9QLEtBQUtPLEtBQUwsYUFBY0QsU0FBZCxDQUFQO0FBQ0EsSUFObUI7QUFPcEJFLFdBUG9CLHNCQU9WO0FBQ1QsV0FBT1IsS0FBS1EsUUFBTCxhQUFpQkYsU0FBakIsQ0FBUDtBQUNBLElBVG1CO0FBVXBCRyxPQVZvQixrQkFVZDtBQUNMLFdBQU9ULEtBQUtTLElBQUwsYUFBYUgsU0FBYixDQUFQO0FBQ0EsSUFabUI7QUFhcEJJLFVBYm9CLHFCQWFYO0FBQ1JWLFNBQUtVLE9BQUw7QUFDQTtBQWZtQixHQUFkLENBQVA7QUFpQkEsRUFwQkssQ0FBUDtBQXFCQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb2N4NGpzIGZyb20gXCJkb2N4NGpzXCJcbmltcG9ydCBjb252ZXJ0ZXJzIGZyb20gXCIuL2RvY3gvaHRtbC9mYWN0b3J5XCJcblxuLyoqXG4gKiBcbiAqIEBwYXJhbSB7Kn0gZmlsZSBcbiAqIEBwYXJhbSB7Kn0gb3B0aW9ucyB7XG4gKiBcdGNvbnRhaW5lcjogb3B0aW9uYWwsIGRlZmF1bHQgaXMgZG9jdW1lbnQuYm9keSwgYSBIVE1MRWxlbWVudCB0byBjb250YWluIGNvbnZlcnRlZCBodG1sXG4gKiBcdGFzSW1hZ2VVUkw6IG9ubHkgbm9kZWpzIHJlcXVpcmVkLCBhIGZ1bmN0aW9uIHRvIGNvbnZlcnQgaW1hZ2UgZGF0YSB0byB1cmxcbiAqIH1cbiAqIEByZXR1cm5zIFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkb2N4Mmh0bWwoZmlsZSwgb3B0KXtcblx0cmV0dXJuIGRvY3g0anMubG9hZChmaWxlKVxuXHRcdC50aGVuKGRvY3g9Pntcblx0XHRcdGNvbnN0IGh0bWw9ZG9jeC5wYXJzZShkb2N4NGpzLmNyZWF0ZVZpc2l0b3JGYWN0b3J5KGNvbnZlcnRlcnMsb3B0KSlcblx0XHRcdHJldHVybiBPYmplY3QuY3JlYXRlKHtcblx0XHRcdFx0dG9TdHJpbmcoKXtcblx0XHRcdFx0XHRyZXR1cm4gaHRtbC50b1N0cmluZyguLi5hcmd1bWVudHMpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFzWmlwKCl7XG5cdFx0XHRcdFx0cmV0dXJuIGh0bWwuYXNaaXAoLi4uYXJndW1lbnRzKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRkb3dubG9hZCgpe1xuXHRcdFx0XHRcdHJldHVybiBodG1sLmRvd25sb2FkKC4uLmFyZ3VtZW50cylcblx0XHRcdFx0fSxcblx0XHRcdFx0c2F2ZSgpe1xuXHRcdFx0XHRcdHJldHVybiBodG1sLnNhdmUoLi4uYXJndW1lbnRzKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRyZWxlYXNlKCl7XG5cdFx0XHRcdFx0aHRtbC5yZWxlYXNlKClcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9KVxufSJdfQ==