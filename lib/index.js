"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = docx2html;

var _docx4js = require("docx4js");

var _docx4js2 = _interopRequireDefault(_docx4js);

var _factory = require("./docx/html/factory");

var _factory2 = _interopRequireDefault(_factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function docx2html(file, opt) {
	return _docx4js2.default.load(file).then(function (docx) {
		return docx.parse(_docx4js2.default.createVisitorFactory(_factory2.default, opt));
	});
}

docx2html.parser = _docx4js2.default;
docx2html.converters = _factory2.default;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkFHd0I7O0FBSHhCOzs7O0FBQ0E7Ozs7OztBQUVlLFNBQVMsU0FBVCxDQUFtQixJQUFuQixFQUF5QixHQUF6QixFQUE2QjtBQUMzQyxRQUFPLGtCQUFRLElBQVIsQ0FBYSxJQUFiLEVBQ04sSUFETSxDQUNELFVBQVMsSUFBVCxFQUFjO0FBQ25CLFNBQU8sS0FBSyxLQUFMLENBQVcsa0JBQVEsb0JBQVIsb0JBQXdDLEdBQXhDLENBQVgsQ0FBUCxDQURtQjtFQUFkLENBRE4sQ0FEMkM7Q0FBN0I7O0FBT2YsVUFBVSxNQUFWO0FBQ0EsVUFBVSxVQUFWIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxuaW1wb3J0IGNvbnZlcnRlcnMgZnJvbSBcIi4vZG9jeC9odG1sL2ZhY3RvcnlcIlxuXHRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRvY3gyaHRtbChmaWxlLCBvcHQpe1xuXHRyZXR1cm4gZG9jeDRqcy5sb2FkKGZpbGUpXG5cdC50aGVuKGZ1bmN0aW9uKGRvY3gpe1xuXHRcdHJldHVybiBkb2N4LnBhcnNlKGRvY3g0anMuY3JlYXRlVmlzaXRvckZhY3RvcnkoY29udmVydGVycyxvcHQpKVxuXHR9KVxufVxuXG5kb2N4Mmh0bWwucGFyc2VyPWRvY3g0anNcbmRvY3gyaHRtbC5jb252ZXJ0ZXJzPWNvbnZlcnRlcnNcbiJdfQ==