define(['./converter', './style/inline'], function(Super, Style){
	return Super.extend({
		wordType:'inline',
		tag:'span',
		convertStyle: function(el){
			Super.prototype.convertStyle.apply(this,arguments)
			var style=this.wordModel.getDirectStyle()
			style && style.parse([new Style.Properties(el.style)])
		},
		_shouldIgnore: function(){
			return this.wordModel.isWebHidden() || this.wordModel.isHidden()
		}
	})
})