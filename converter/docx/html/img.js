define(['./graphic'], function(Super){
	return Super.extend({
		wordType:'image',
		tag:'img',
		convertStyle: function(el){
			el.src=this.wordModel.asLink()||''
			Super.prototype.convertStyle.apply(this,arguments)
		}
	})
})