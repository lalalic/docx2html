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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFBZTtBQUNaLFFBQWFBLFFBQVEsYUFBUixDQUREO0FBRVosZUFBZUEsUUFBUSxZQUFSLENBRkg7QUFHWixnQkFBaUJBLFFBQVEsS0FBUixDQUhMO0FBSVosb0JBQW1CQSxRQUFRLFlBQVIsQ0FKUDtBQUtaLHFCQUFtQkEsUUFBUSxpQkFBUixDQUxQO0FBTVosaUJBQWlCQSxRQUFRLGNBQVIsQ0FOTDtBQU9aLGVBQWVBLFFBQVEsWUFBUixDQVBIO0FBUVosYUFBZUEsUUFBUSxVQUFSLENBUkg7QUFTWixxQkFBbUJBLFFBQVEsV0FBUixDQVRQO0FBVVosY0FBZUEsUUFBUSxLQUFSLENBVkg7QUFXWixhQUFlQSxRQUFRLFVBQVIsQ0FYSDtBQVlaLFlBQWFBLFFBQVEsT0FBUixDQVpEO0FBYVosV0FBYUEsUUFBUSxRQUFSLENBYkQ7QUFjWixnQkFBZUEsUUFBUSxLQUFSLENBZEg7QUFlWixjQUFlQSxRQUFRLFdBQVIsQ0FmSDtBQWdCWixZQUFhQSxRQUFRLFNBQVIsQ0FoQkQ7QUFpQlosYUFBZUEsUUFBUSxRQUFSLENBakJIO0FBa0JaLFlBQWFBLFFBQVEsU0FBUixDQWxCRDtBQW1CWixXQUFhQSxRQUFRLE1BQVIsQ0FuQkQ7QUFvQlosV0FBYUEsUUFBUSxRQUFSLENBcEJEO0FBcUJaLGNBQWVBLFFBQVEsV0FBUixDQXJCSDtBQXNCWixVQUFhQSxRQUFRLE1BQVIsQ0F0QkQ7O0FBd0JaLHNCQUFtQkEsUUFBUSxtQkFBUixDQXhCUDs7QUEwQloscUJBQW1CQSxRQUFRLGtCQUFSLENBMUJQO0FBMkJaLG1CQUFtQkEsUUFBUSxnQkFBUixDQTNCUDtBQTRCWixpQ0FBK0JBLFFBQVEsY0FBUixDQTVCbkI7QUE2Qlosc0JBQW1CQSxRQUFRLG1CQUFSLENBN0JQO0FBOEJaLGtCQUFpQkEsUUFBUSxlQUFSO0FBOUJMLEMiLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IHtcbiAgICcqJzogICAgICAgICByZXF1aXJlKCcuL2NvbnZlcnRlcicpXG4gICwnZG9jdW1lbnQnOiAgICByZXF1aXJlKCcuL2RvY3VtZW50JylcbiAgLCdoeXBlcmxpbmsnOiAgICAgcmVxdWlyZSgnLi9hJylcbiAgLCdib29rbWFya1N0YXJ0JzogICByZXF1aXJlKCcuL2Jvb2ttYXJrJylcbiAgLCdkcmF3aW5nLmFuY2hvcic6ICByZXF1aXJlKFwiLi9kcmF3aW5nQW5jaG9yXCIpXG4gICwnZmllbGRCZWdpbic6ICAgIHJlcXVpcmUoJy4vZmllbGRCZWdpbicpXG4gICwnZmllbGRFbmQnOiAgICByZXF1aXJlKCcuL2ZpZWxkRW5kJylcbiAgLCdmb290ZXInOiAgICAgIHJlcXVpcmUoJy4vZm9vdGVyJylcbiAgLCdkcmF3aW5nLmlubGluZSc6ICByZXF1aXJlKCcuL2dyYXBoaWMnKVxuICAsJ2hlYWRpbmcnOiAgICAgcmVxdWlyZSgnLi9oJylcbiAgLCdoZWFkZXInOiAgICAgIHJlcXVpcmUoJy4vaGVhZGVyJylcbiAgLCdpbWFnZSc6ICAgICByZXF1aXJlKCcuL2ltZycpXG4gICwnbGlzdCc6ICAgICAgcmVxdWlyZSgnLi9saXN0JylcbiAgLCdwYXJhZ3JhcGgnOiAgIHJlcXVpcmUoJy4vcCcpXG4gICwnc2VjdGlvbic6ICAgICByZXF1aXJlKCcuL3NlY3Rpb24nKVxuICAsJ3NoYXBlJzogICAgIHJlcXVpcmUoJy4vc2hhcGUnKVxuICAsJ2lubGluZSc6ICAgICAgcmVxdWlyZSgnLi9zcGFuJylcbiAgLCd0YWJsZSc6ICAgICByZXF1aXJlKCcuL3RhYmxlJylcbiAgLCdjZWxsJzogICAgICByZXF1aXJlKCcuL3RkJylcbiAgLCd0ZXh0JzogICAgICByZXF1aXJlKCcuL3RleHQnKVxuICAsJ3RleHRib3gnOiAgICAgcmVxdWlyZSgnLi90ZXh0Ym94JylcbiAgLCdyb3cnOiAgICAgICByZXF1aXJlKCcuL3RyJylcbiAgXG4gICwnZmllbGQuaHlwZXJsaW5rJzogcmVxdWlyZSgnLi9maWVsZC9oeXBlcmxpbmsnKVxuICBcbiAgLCdzdHlsZS5kb2N1bWVudCc6ICByZXF1aXJlKCcuL3N0eWxlL2RvY3VtZW50JylcbiAgLCdzdHlsZS5pbmxpbmUnOiAgICByZXF1aXJlKCcuL3N0eWxlL2lubGluZScpXG4gICwnc3R5bGUubnVtYmVyaW5nLmRlZmluaXRpb24nOiAgcmVxdWlyZSgnLi9zdHlsZS9saXN0JylcbiAgLCdzdHlsZS5wYXJhZ3JhcGgnOiByZXF1aXJlKCcuL3N0eWxlL3BhcmFncmFwaCcpXG4gICwnc3R5bGUudGFibGUnOiAgIHJlcXVpcmUoJy4vc3R5bGUvdGFibGUnKVxufSJdfQ==