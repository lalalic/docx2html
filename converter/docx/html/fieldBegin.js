define(['./converter','require', './field/hyperlink'], function(Super, require){
	return Super.extend({
		wordType:'fieldBegin',
		tag:'span',
		convert: function(wordField, endConverter){
			if(!wordField)
				return Super.prototype.convert.apply(this,arguments)
			var converter=this.constructor.factory(wordField, this.doc, this)
			converter && converter.convert(endConverter && endConverter.content)
		}
	},{
		factory: function(wordField, doc, parent){
			var type=wordField.type.split('.').pop()
			var Model=require.defined('./field/'+type) && require('./field/'+type)
			if(Model)
				return new Model(wordField, doc, parent)
		}
	})
})