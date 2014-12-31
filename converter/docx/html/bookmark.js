define(['./converter'], function(Super){
	return Super.extend({
		wordType:'bookmarkStart',
		tag:'i',
		convert: function(){
			if(this.parent.content.childNodes.length==0 && !this.parent.content.id){
				this.parent.content.id=this.wordModel.getName()
			}else{
				Super.prototype.convert.apply(this,arguments)
				this.content.id=this.wordModel.getName()
			}
		}
	})
})