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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFBZTtBQUNiLE1BQVNBLFFBQVEsYUFBUixDQURJO0FBRWIsYUFBYUEsUUFBUSxZQUFSLENBRkE7QUFHYixjQUFlQSxRQUFRLEtBQVIsQ0FIRjtBQUliLGtCQUFrQkEsUUFBUSxZQUFSLENBSkw7QUFLYixtQkFBa0JBLFFBQVEsaUJBQVIsQ0FMTDtBQU1iLGVBQWVBLFFBQVEsY0FBUixDQU5GO0FBT2IsYUFBYUEsUUFBUSxZQUFSLENBUEE7QUFRYixXQUFZQSxRQUFRLFVBQVIsQ0FSQztBQVNiLG1CQUFrQkEsUUFBUSxXQUFSLENBVEw7QUFVYixZQUFhQSxRQUFRLEtBQVIsQ0FWQTtBQVdiLFdBQVlBLFFBQVEsVUFBUixDQVhDO0FBWWIsVUFBV0EsUUFBUSxPQUFSLENBWkU7QUFhYixTQUFVQSxRQUFRLFFBQVIsQ0FiRztBQWNiLGNBQWNBLFFBQVEsS0FBUixDQWREO0FBZWIsWUFBYUEsUUFBUSxXQUFSLENBZkE7QUFnQmIsVUFBV0EsUUFBUSxTQUFSLENBaEJFO0FBaUJiLFdBQVlBLFFBQVEsUUFBUixDQWpCQztBQWtCYixVQUFXQSxRQUFRLFNBQVIsQ0FsQkU7QUFtQmIsU0FBVUEsUUFBUSxNQUFSLENBbkJHO0FBb0JiLFNBQVVBLFFBQVEsUUFBUixDQXBCRztBQXFCYixZQUFhQSxRQUFRLFdBQVIsQ0FyQkE7QUFzQmIsUUFBVUEsUUFBUSxNQUFSLENBdEJHOztBQXdCYixvQkFBbUJBLFFBQVEsbUJBQVIsQ0F4Qk47O0FBMEJiLG1CQUFrQkEsUUFBUSxrQkFBUixDQTFCTDtBQTJCYixpQkFBaUJBLFFBQVEsZ0JBQVIsQ0EzQko7QUE0QmIsK0JBQThCQSxRQUFRLGNBQVIsQ0E1QmpCO0FBNkJiLG9CQUFtQkEsUUFBUSxtQkFBUixDQTdCTjtBQThCYixnQkFBZ0JBLFFBQVEsZUFBUjtBQTlCSCxDIiwiZmlsZSI6ImZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG5cdCAnKic6IFx0XHRcdFx0cmVxdWlyZSgnLi9jb252ZXJ0ZXInKVxuXHQsJ2RvY3VtZW50JzpcdFx0cmVxdWlyZSgnLi9kb2N1bWVudCcpXG5cdCwnaHlwZXJsaW5rJzogXHRcdHJlcXVpcmUoJy4vYScpXG5cdCwnYm9va21hcmtTdGFydCc6IFx0cmVxdWlyZSgnLi9ib29rbWFyaycpXG5cdCwnZHJhd2luZy5hbmNob3InOlx0cmVxdWlyZShcIi4vZHJhd2luZ0FuY2hvclwiKVxuXHQsJ2ZpZWxkQmVnaW4nOlx0XHRyZXF1aXJlKCcuL2ZpZWxkQmVnaW4nKVxuXHQsJ2ZpZWxkRW5kJzpcdFx0cmVxdWlyZSgnLi9maWVsZEVuZCcpXG5cdCwnZm9vdGVyJzpcdFx0XHRyZXF1aXJlKCcuL2Zvb3RlcicpXG5cdCwnZHJhd2luZy5pbmxpbmUnOlx0cmVxdWlyZSgnLi9ncmFwaGljJylcblx0LCdoZWFkaW5nJzpcdFx0XHRyZXF1aXJlKCcuL2gnKVxuXHQsJ2hlYWRlcic6XHRcdFx0cmVxdWlyZSgnLi9oZWFkZXInKVxuXHQsJ2ltYWdlJzpcdFx0XHRyZXF1aXJlKCcuL2ltZycpXG5cdCwnbGlzdCc6XHRcdFx0cmVxdWlyZSgnLi9saXN0Jylcblx0LCdwYXJhZ3JhcGgnOlx0XHRyZXF1aXJlKCcuL3AnKVxuXHQsJ3NlY3Rpb24nOlx0XHRcdHJlcXVpcmUoJy4vc2VjdGlvbicpXG5cdCwnc2hhcGUnOlx0XHRcdHJlcXVpcmUoJy4vc2hhcGUnKVxuXHQsJ2lubGluZSc6XHRcdFx0cmVxdWlyZSgnLi9zcGFuJylcblx0LCd0YWJsZSc6XHRcdFx0cmVxdWlyZSgnLi90YWJsZScpXG5cdCwnY2VsbCc6XHRcdFx0cmVxdWlyZSgnLi90ZCcpXG5cdCwndGV4dCc6XHRcdFx0cmVxdWlyZSgnLi90ZXh0Jylcblx0LCd0ZXh0Ym94JzpcdFx0XHRyZXF1aXJlKCcuL3RleHRib3gnKVxuXHQsJ3Jvdyc6XHRcdFx0XHRyZXF1aXJlKCcuL3RyJylcblx0XG5cdCwnZmllbGQuaHlwZXJsaW5rJzpcdHJlcXVpcmUoJy4vZmllbGQvaHlwZXJsaW5rJylcblx0XG5cdCwnc3R5bGUuZG9jdW1lbnQnOlx0cmVxdWlyZSgnLi9zdHlsZS9kb2N1bWVudCcpXG5cdCwnc3R5bGUuaW5saW5lJzpcdFx0cmVxdWlyZSgnLi9zdHlsZS9pbmxpbmUnKVxuXHQsJ3N0eWxlLm51bWJlcmluZy5kZWZpbml0aW9uJzpcdHJlcXVpcmUoJy4vc3R5bGUvbGlzdCcpXG5cdCwnc3R5bGUucGFyYWdyYXBoJzpcdHJlcXVpcmUoJy4vc3R5bGUvcGFyYWdyYXBoJylcblx0LCdzdHlsZS50YWJsZSc6XHRcdHJlcXVpcmUoJy4vc3R5bGUvdGFibGUnKVxufSJdfQ==