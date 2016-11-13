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
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkb2N4Mmh0bWwiLCJmaWxlIiwib3B0IiwibG9hZCIsInRoZW4iLCJkb2N4IiwicGFyc2UiLCJjcmVhdGVWaXNpdG9yRmFjdG9yeSIsInBhcnNlciIsImNvbnZlcnRlcnMiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUd3QkEsUzs7QUFIeEI7Ozs7QUFDQTs7Ozs7O0FBRWUsU0FBU0EsU0FBVCxDQUFtQkMsSUFBbkIsRUFBeUJDLEdBQXpCLEVBQTZCO0FBQzNDLFFBQU8sa0JBQVFDLElBQVIsQ0FBYUYsSUFBYixFQUNMRyxJQURLLENBQ0E7QUFBQSxTQUFNQyxLQUFLQyxLQUFMLENBQVcsa0JBQVFDLG9CQUFSLG9CQUF3Q0wsR0FBeEMsQ0FBWCxDQUFOO0FBQUEsRUFEQSxDQUFQO0FBRUE7O0FBRURGLFVBQVVRLE1BQVY7QUFDQVIsVUFBVVMsVUFBViIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb2N4NGpzIGZyb20gXCJkb2N4NGpzXCJcbmltcG9ydCBjb252ZXJ0ZXJzIGZyb20gXCIuL2RvY3gvaHRtbC9mYWN0b3J5XCJcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZG9jeDJodG1sKGZpbGUsIG9wdCl7XG5cdHJldHVybiBkb2N4NGpzLmxvYWQoZmlsZSlcblx0XHQudGhlbihkb2N4PT5kb2N4LnBhcnNlKGRvY3g0anMuY3JlYXRlVmlzaXRvckZhY3RvcnkoY29udmVydGVycyxvcHQpKSlcbn1cblxuZG9jeDJodG1sLnBhcnNlcj1kb2N4NGpzXG5kb2N4Mmh0bWwuY29udmVydGVycz1jb252ZXJ0ZXJzXG4iXX0=