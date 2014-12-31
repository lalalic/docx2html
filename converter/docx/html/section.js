define(['./converter','./style/section'],function(Converter, Style){
	return Converter.extend({
		wordType:'section',
		tag:'section',
		convertStyle: function(el){
			this.doc.section=el
			var style=this.wordModel.getDirectStyle()
			style && style.parse([new Style(el.style)])
		}
	})
})