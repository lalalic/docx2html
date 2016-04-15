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
	'style.line': require('./style/inline'),
	'style.numbering.definition': require('./style/list'),
	'style.numbering': require('./style/numbering'),
	'style.paragraph': require('./style/paragraph'),
	'style.table': require('./style/table')
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZmFjdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztrQkFBZTtBQUNiLE1BQVMsUUFBUSxhQUFSLENBQVQ7QUFDQSxhQUFhLFFBQVEsWUFBUixDQUFiO0FBQ0EsY0FBZSxRQUFRLEtBQVIsQ0FBZjtBQUNBLGtCQUFrQixRQUFRLFlBQVIsQ0FBbEI7QUFDQSxtQkFBa0IsUUFBUSxpQkFBUixDQUFsQjtBQUNBLGVBQWUsUUFBUSxjQUFSLENBQWY7QUFDQSxhQUFhLFFBQVEsWUFBUixDQUFiO0FBQ0EsV0FBWSxRQUFRLFVBQVIsQ0FBWjtBQUNBLG1CQUFrQixRQUFRLFdBQVIsQ0FBbEI7QUFDQSxZQUFhLFFBQVEsS0FBUixDQUFiO0FBQ0EsV0FBWSxRQUFRLFVBQVIsQ0FBWjtBQUNBLFVBQVcsUUFBUSxPQUFSLENBQVg7QUFDQSxTQUFVLFFBQVEsUUFBUixDQUFWO0FBQ0EsY0FBYyxRQUFRLEtBQVIsQ0FBZDtBQUNBLFlBQWEsUUFBUSxXQUFSLENBQWI7QUFDQSxVQUFXLFFBQVEsU0FBUixDQUFYO0FBQ0EsV0FBWSxRQUFRLFFBQVIsQ0FBWjtBQUNBLFVBQVcsUUFBUSxTQUFSLENBQVg7QUFDQSxTQUFVLFFBQVEsTUFBUixDQUFWO0FBQ0EsU0FBVSxRQUFRLFFBQVIsQ0FBVjtBQUNBLFlBQWEsUUFBUSxXQUFSLENBQWI7QUFDQSxRQUFVLFFBQVEsTUFBUixDQUFWOztBQUVBLG9CQUFtQixRQUFRLG1CQUFSLENBQW5COztBQUVBLG1CQUFrQixRQUFRLGtCQUFSLENBQWxCO0FBQ0EsZUFBZSxRQUFRLGdCQUFSLENBQWY7QUFDQSwrQkFBOEIsUUFBUSxjQUFSLENBQTlCO0FBQ0Esb0JBQW1CLFFBQVEsbUJBQVIsQ0FBbkI7QUFDQSxvQkFBbUIsUUFBUSxtQkFBUixDQUFuQjtBQUNBLGdCQUFnQixRQUFRLGVBQVIsQ0FBaEIiLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcblx0ICcqJzogXHRcdFx0XHRyZXF1aXJlKCcuL2NvbnZlcnRlcicpXG5cdCwnZG9jdW1lbnQnOlx0XHRyZXF1aXJlKCcuL2RvY3VtZW50Jylcblx0LCdoeXBlcmxpbmsnOiBcdFx0cmVxdWlyZSgnLi9hJylcblx0LCdib29rbWFya1N0YXJ0JzogXHRyZXF1aXJlKCcuL2Jvb2ttYXJrJylcblx0LCdkcmF3aW5nLmFuY2hvcic6XHRyZXF1aXJlKFwiLi9kcmF3aW5nQW5jaG9yXCIpXG5cdCwnZmllbGRCZWdpbic6XHRcdHJlcXVpcmUoJy4vZmllbGRCZWdpbicpXG5cdCwnZmllbGRFbmQnOlx0XHRyZXF1aXJlKCcuL2ZpZWxkRW5kJylcblx0LCdmb290ZXInOlx0XHRcdHJlcXVpcmUoJy4vZm9vdGVyJylcblx0LCdkcmF3aW5nLmlubGluZSc6XHRyZXF1aXJlKCcuL2dyYXBoaWMnKVxuXHQsJ2hlYWRpbmcnOlx0XHRcdHJlcXVpcmUoJy4vaCcpXG5cdCwnaGVhZGVyJzpcdFx0XHRyZXF1aXJlKCcuL2hlYWRlcicpXG5cdCwnaW1hZ2UnOlx0XHRcdHJlcXVpcmUoJy4vaW1nJylcblx0LCdsaXN0JzpcdFx0XHRyZXF1aXJlKCcuL2xpc3QnKVxuXHQsJ3BhcmFncmFwaCc6XHRcdHJlcXVpcmUoJy4vcCcpXG5cdCwnc2VjdGlvbic6XHRcdFx0cmVxdWlyZSgnLi9zZWN0aW9uJylcblx0LCdzaGFwZSc6XHRcdFx0cmVxdWlyZSgnLi9zaGFwZScpXG5cdCwnaW5saW5lJzpcdFx0XHRyZXF1aXJlKCcuL3NwYW4nKVxuXHQsJ3RhYmxlJzpcdFx0XHRyZXF1aXJlKCcuL3RhYmxlJylcblx0LCdjZWxsJzpcdFx0XHRyZXF1aXJlKCcuL3RkJylcblx0LCd0ZXh0JzpcdFx0XHRyZXF1aXJlKCcuL3RleHQnKVxuXHQsJ3RleHRib3gnOlx0XHRcdHJlcXVpcmUoJy4vdGV4dGJveCcpXG5cdCwncm93JzpcdFx0XHRcdHJlcXVpcmUoJy4vdHInKVxuXHRcblx0LCdmaWVsZC5oeXBlcmxpbmsnOlx0cmVxdWlyZSgnLi9maWVsZC9oeXBlcmxpbmsnKVxuXHRcblx0LCdzdHlsZS5kb2N1bWVudCc6XHRyZXF1aXJlKCcuL3N0eWxlL2RvY3VtZW50Jylcblx0LCdzdHlsZS5saW5lJzpcdFx0cmVxdWlyZSgnLi9zdHlsZS9pbmxpbmUnKVxuXHQsJ3N0eWxlLm51bWJlcmluZy5kZWZpbml0aW9uJzpcdHJlcXVpcmUoJy4vc3R5bGUvbGlzdCcpXG5cdCwnc3R5bGUubnVtYmVyaW5nJzogcmVxdWlyZSgnLi9zdHlsZS9udW1iZXJpbmcnKVxuXHQsJ3N0eWxlLnBhcmFncmFwaCc6XHRyZXF1aXJlKCcuL3N0eWxlL3BhcmFncmFwaCcpXG5cdCwnc3R5bGUudGFibGUnOlx0XHRyZXF1aXJlKCcuL3N0eWxlL3RhYmxlJylcbn0iXX0=