define(['./converter','./style/paragraph'], function(Super, Style){
	return Super.extend({
		wordType:'paragraph',
		tag:'p',
		convertStyle: function(el){
			Super.prototype.convertStyle.apply(this,arguments)
			var style=this.wordModel.getDirectStyle()
			style && style.parse([new Style.Properties(el.style)])
		}
	})
})