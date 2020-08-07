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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkb2N4Mmh0bWwiLCJmaWxlIiwib3B0IiwiZG9jeDRqcyIsImxvYWQiLCJ0aGVuIiwiZG9jeCIsInBhcnNlIiwiY3JlYXRlVmlzaXRvckZhY3RvcnkiLCJjb252ZXJ0ZXJzIiwicGFyc2VyIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFHd0JBLFM7O0FBSHhCOzs7O0FBQ0E7Ozs7OztBQUVlLFNBQVNBLFNBQVQsQ0FBbUJDLElBQW5CLEVBQXlCQyxHQUF6QixFQUE2QjtBQUMzQyxRQUFPQyxrQkFBUUMsSUFBUixDQUFhSCxJQUFiLEVBQ0xJLElBREssQ0FDQTtBQUFBLFNBQU1DLEtBQUtDLEtBQUwsQ0FBV0osa0JBQVFLLG9CQUFSLENBQTZCQyxpQkFBN0IsRUFBd0NQLEdBQXhDLENBQVgsQ0FBTjtBQUFBLEVBREEsQ0FBUDtBQUVBOztBQUVERixVQUFVVSxNQUFWLEdBQWlCUCxpQkFBakI7QUFDQUgsVUFBVVMsVUFBVixHQUFxQkEsaUJBQXJCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRvY3g0anMgZnJvbSBcImRvY3g0anNcIlxuaW1wb3J0IGNvbnZlcnRlcnMgZnJvbSBcIi4vZG9jeC9odG1sL2ZhY3RvcnlcIlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkb2N4Mmh0bWwoZmlsZSwgb3B0KXtcblx0cmV0dXJuIGRvY3g0anMubG9hZChmaWxlKVxuXHRcdC50aGVuKGRvY3g9PmRvY3gucGFyc2UoZG9jeDRqcy5jcmVhdGVWaXNpdG9yRmFjdG9yeShjb252ZXJ0ZXJzLG9wdCkpKVxufVxuXG5kb2N4Mmh0bWwucGFyc2VyPWRvY3g0anNcbmRvY3gyaHRtbC5jb252ZXJ0ZXJzPWNvbnZlcnRlcnNcbiJdfQ==