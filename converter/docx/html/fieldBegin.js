define(['./converter','require', './field/hyperlink'], function(Super, require){
	return Super.extend({
		wordType:'fieldBegin',
		tag:'span',
		convert: function(wordField, endConverter){
			if(!wordField)
				return Super.prototype.convert.apply(this,arguments)
			var converter=this.constructor.factory(wordField, this)
			converter && converter.convert(endConverter && endConverter.content)
		}
	},{
		factory: function(wordField, parent){
			var type=wordField.type.split('.').pop()
			try{
				var Model=require('./field/'+type)
				return new Model(wordField, parent)
			}catch(e){
				
			}
		}
	})
})