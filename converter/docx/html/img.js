define(['./graphic'], function(Super){
	return Super.extend({
		wordType:'image',
		tag:'img',
		convertStyle: function(el){
			Super.prototype.convertStyle.apply(this,arguments)
			var blob=this.wordModel.getImage();
			blob && (el.src=this.doc.asImageURL(blob));
		}
	})
})