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
			content: html.content,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkb2N4Mmh0bWwiLCJmaWxlIiwib3B0IiwiZG9jeDRqcyIsImxvYWQiLCJ0aGVuIiwiaHRtbCIsImRvY3giLCJwYXJzZSIsImNyZWF0ZVZpc2l0b3JGYWN0b3J5IiwiY29udmVydGVycyIsImNvbnRlbnQiLCJ0b1N0cmluZyIsImFyZ3VtZW50cyIsImFzWmlwIiwiZG93bmxvYWQiLCJzYXZlIiwicmVsZWFzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztrQkFZd0JBLFM7O0FBWnhCOzs7O0FBQ0E7Ozs7OztBQUVBOzs7Ozs7Ozs7QUFTZSxTQUFTQSxTQUFULENBQW1CQyxJQUFuQixFQUF5QkMsR0FBekIsRUFBNkI7QUFDM0MsUUFBT0Msa0JBQVFDLElBQVIsQ0FBYUgsSUFBYixFQUNMSSxJQURLLENBQ0EsZ0JBQU07QUFDWCxNQUFNQyxPQUFLQyxLQUFLQyxLQUFMLENBQVdMLGtCQUFRTSxvQkFBUixDQUE2QkMsaUJBQTdCLEVBQXdDUixHQUF4QyxDQUFYLENBQVg7QUFDQSxTQUFPLHNCQUFjO0FBQ3BCUyxZQUFTTCxLQUFLSyxPQURNO0FBRXBCQyxXQUZvQixzQkFFVjtBQUNULFdBQU9OLEtBQUtNLFFBQUwsYUFBaUJDLFNBQWpCLENBQVA7QUFDQSxJQUptQjtBQUtwQkMsUUFMb0IsbUJBS2I7QUFDTixXQUFPUixLQUFLUSxLQUFMLGFBQWNELFNBQWQsQ0FBUDtBQUNBLElBUG1CO0FBUXBCRSxXQVJvQixzQkFRVjtBQUNULFdBQU9ULEtBQUtTLFFBQUwsYUFBaUJGLFNBQWpCLENBQVA7QUFDQSxJQVZtQjtBQVdwQkcsT0FYb0Isa0JBV2Q7QUFDTCxXQUFPVixLQUFLVSxJQUFMLGFBQWFILFNBQWIsQ0FBUDtBQUNBLElBYm1CO0FBY3BCSSxVQWRvQixxQkFjWDtBQUNSWCxTQUFLVyxPQUFMO0FBQ0E7QUFoQm1CLEdBQWQsQ0FBUDtBQWtCQSxFQXJCSyxDQUFQO0FBc0JBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxuaW1wb3J0IGNvbnZlcnRlcnMgZnJvbSBcIi4vZG9jeC9odG1sL2ZhY3RvcnlcIlxuXG4vKipcbiAqIFxuICogQHBhcmFtIHsqfSBmaWxlIFxuICogQHBhcmFtIHsqfSBvcHRpb25zIHtcbiAqIFx0Y29udGFpbmVyOiBvcHRpb25hbCwgZGVmYXVsdCBpcyBkb2N1bWVudC5ib2R5LCBhIEhUTUxFbGVtZW50IHRvIGNvbnRhaW4gY29udmVydGVkIGh0bWxcbiAqIFx0YXNJbWFnZVVSTDogb25seSBub2RlanMgcmVxdWlyZWQsIGEgZnVuY3Rpb24gdG8gY29udmVydCBpbWFnZSBkYXRhIHRvIHVybFxuICogfVxuICogQHJldHVybnMgXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRvY3gyaHRtbChmaWxlLCBvcHQpe1xuXHRyZXR1cm4gZG9jeDRqcy5sb2FkKGZpbGUpXG5cdFx0LnRoZW4oZG9jeD0+e1xuXHRcdFx0Y29uc3QgaHRtbD1kb2N4LnBhcnNlKGRvY3g0anMuY3JlYXRlVmlzaXRvckZhY3RvcnkoY29udmVydGVycyxvcHQpKVxuXHRcdFx0cmV0dXJuIE9iamVjdC5jcmVhdGUoe1xuXHRcdFx0XHRjb250ZW50OiBodG1sLmNvbnRlbnQsIFxuXHRcdFx0XHR0b1N0cmluZygpe1xuXHRcdFx0XHRcdHJldHVybiBodG1sLnRvU3RyaW5nKC4uLmFyZ3VtZW50cylcblx0XHRcdFx0fSxcblx0XHRcdFx0YXNaaXAoKXtcblx0XHRcdFx0XHRyZXR1cm4gaHRtbC5hc1ppcCguLi5hcmd1bWVudHMpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRvd25sb2FkKCl7XG5cdFx0XHRcdFx0cmV0dXJuIGh0bWwuZG93bmxvYWQoLi4uYXJndW1lbnRzKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzYXZlKCl7XG5cdFx0XHRcdFx0cmV0dXJuIGh0bWwuc2F2ZSguLi5hcmd1bWVudHMpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHJlbGVhc2UoKXtcblx0XHRcdFx0XHRodG1sLnJlbGVhc2UoKVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH0pXG59Il19