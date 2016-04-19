'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	'*': require('./converter'),
	'document': require('./document'),
	'hyperlink': require('./a'),
	'bookmarkStart': require('./bookmark'),
	'drawing.anchor': require("./drawingAnchor"),
	'fieldBegin': require('./fieldBegin'),
	'fieldEnd': require('./fieldEnd'),
	'footer': require('./footer'),
	'drawing.inline': require('./graphic'),
	'heading': require('./h'),
	'header': require('./header'),
	'image': require('./img'),
	'list': require('./list'),
	'paragraph': require('./p'),
	'section': require('./section'),
	'shape': require('./shape'),
	'inline': require('./span'),
	'table': require('./table'),
	'cell': require('./td'),
	'text': require('./text'),
	'textbox': require('./textbox'),
	'row': require('./tr'),

	'field.hyperlink': require('./field/hyperlink'),

	'style.document': require('./style/document'),
	'style.inline': require('./style/inline'),
	'style.numbering.definition': require('./style/list'),
	'style.paragraph': require('./style/paragraph'),
	'style.table': require('./style/table')
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZmFjdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkFBZTtBQUNiLE1BQVMsUUFBUSxhQUFSLENBQVQ7QUFDQSxhQUFhLFFBQVEsWUFBUixDQUFiO0FBQ0EsY0FBZSxRQUFRLEtBQVIsQ0FBZjtBQUNBLGtCQUFrQixRQUFRLFlBQVIsQ0FBbEI7QUFDQSxtQkFBa0IsUUFBUSxpQkFBUixDQUFsQjtBQUNBLGVBQWUsUUFBUSxjQUFSLENBQWY7QUFDQSxhQUFhLFFBQVEsWUFBUixDQUFiO0FBQ0EsV0FBWSxRQUFRLFVBQVIsQ0FBWjtBQUNBLG1CQUFrQixRQUFRLFdBQVIsQ0FBbEI7QUFDQSxZQUFhLFFBQVEsS0FBUixDQUFiO0FBQ0EsV0FBWSxRQUFRLFVBQVIsQ0FBWjtBQUNBLFVBQVcsUUFBUSxPQUFSLENBQVg7QUFDQSxTQUFVLFFBQVEsUUFBUixDQUFWO0FBQ0EsY0FBYyxRQUFRLEtBQVIsQ0FBZDtBQUNBLFlBQWEsUUFBUSxXQUFSLENBQWI7QUFDQSxVQUFXLFFBQVEsU0FBUixDQUFYO0FBQ0EsV0FBWSxRQUFRLFFBQVIsQ0FBWjtBQUNBLFVBQVcsUUFBUSxTQUFSLENBQVg7QUFDQSxTQUFVLFFBQVEsTUFBUixDQUFWO0FBQ0EsU0FBVSxRQUFRLFFBQVIsQ0FBVjtBQUNBLFlBQWEsUUFBUSxXQUFSLENBQWI7QUFDQSxRQUFVLFFBQVEsTUFBUixDQUFWOztBQUVBLG9CQUFtQixRQUFRLG1CQUFSLENBQW5COztBQUVBLG1CQUFrQixRQUFRLGtCQUFSLENBQWxCO0FBQ0EsaUJBQWlCLFFBQVEsZ0JBQVIsQ0FBakI7QUFDQSwrQkFBOEIsUUFBUSxjQUFSLENBQTlCO0FBQ0Esb0JBQW1CLFFBQVEsbUJBQVIsQ0FBbkI7QUFDQSxnQkFBZ0IsUUFBUSxlQUFSLENBQWhCIiwiZmlsZSI6ImZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG5cdCAnKic6IFx0XHRcdFx0cmVxdWlyZSgnLi9jb252ZXJ0ZXInKVxuXHQsJ2RvY3VtZW50JzpcdFx0cmVxdWlyZSgnLi9kb2N1bWVudCcpXG5cdCwnaHlwZXJsaW5rJzogXHRcdHJlcXVpcmUoJy4vYScpXG5cdCwnYm9va21hcmtTdGFydCc6IFx0cmVxdWlyZSgnLi9ib29rbWFyaycpXG5cdCwnZHJhd2luZy5hbmNob3InOlx0cmVxdWlyZShcIi4vZHJhd2luZ0FuY2hvclwiKVxuXHQsJ2ZpZWxkQmVnaW4nOlx0XHRyZXF1aXJlKCcuL2ZpZWxkQmVnaW4nKVxuXHQsJ2ZpZWxkRW5kJzpcdFx0cmVxdWlyZSgnLi9maWVsZEVuZCcpXG5cdCwnZm9vdGVyJzpcdFx0XHRyZXF1aXJlKCcuL2Zvb3RlcicpXG5cdCwnZHJhd2luZy5pbmxpbmUnOlx0cmVxdWlyZSgnLi9ncmFwaGljJylcblx0LCdoZWFkaW5nJzpcdFx0XHRyZXF1aXJlKCcuL2gnKVxuXHQsJ2hlYWRlcic6XHRcdFx0cmVxdWlyZSgnLi9oZWFkZXInKVxuXHQsJ2ltYWdlJzpcdFx0XHRyZXF1aXJlKCcuL2ltZycpXG5cdCwnbGlzdCc6XHRcdFx0cmVxdWlyZSgnLi9saXN0Jylcblx0LCdwYXJhZ3JhcGgnOlx0XHRyZXF1aXJlKCcuL3AnKVxuXHQsJ3NlY3Rpb24nOlx0XHRcdHJlcXVpcmUoJy4vc2VjdGlvbicpXG5cdCwnc2hhcGUnOlx0XHRcdHJlcXVpcmUoJy4vc2hhcGUnKVxuXHQsJ2lubGluZSc6XHRcdFx0cmVxdWlyZSgnLi9zcGFuJylcblx0LCd0YWJsZSc6XHRcdFx0cmVxdWlyZSgnLi90YWJsZScpXG5cdCwnY2VsbCc6XHRcdFx0cmVxdWlyZSgnLi90ZCcpXG5cdCwndGV4dCc6XHRcdFx0cmVxdWlyZSgnLi90ZXh0Jylcblx0LCd0ZXh0Ym94JzpcdFx0XHRyZXF1aXJlKCcuL3RleHRib3gnKVxuXHQsJ3Jvdyc6XHRcdFx0XHRyZXF1aXJlKCcuL3RyJylcblx0XG5cdCwnZmllbGQuaHlwZXJsaW5rJzpcdHJlcXVpcmUoJy4vZmllbGQvaHlwZXJsaW5rJylcblx0XG5cdCwnc3R5bGUuZG9jdW1lbnQnOlx0cmVxdWlyZSgnLi9zdHlsZS9kb2N1bWVudCcpXG5cdCwnc3R5bGUuaW5saW5lJzpcdFx0cmVxdWlyZSgnLi9zdHlsZS9pbmxpbmUnKVxuXHQsJ3N0eWxlLm51bWJlcmluZy5kZWZpbml0aW9uJzpcdHJlcXVpcmUoJy4vc3R5bGUvbGlzdCcpXG5cdCwnc3R5bGUucGFyYWdyYXBoJzpcdHJlcXVpcmUoJy4vc3R5bGUvcGFyYWdyYXBoJylcblx0LCdzdHlsZS50YWJsZSc6XHRcdHJlcXVpcmUoJy4vc3R5bGUvdGFibGUnKVxufSJdfQ==