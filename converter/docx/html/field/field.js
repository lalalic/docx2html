define(['../converter'],function(Super){
	return Super.extend(function(wordModel, doc, parent){
		Super.apply(this,arguments)
		this.elStart=parent.content;
	},{
		wordType:'field',
		convert: function(elEnd){}
	})
})