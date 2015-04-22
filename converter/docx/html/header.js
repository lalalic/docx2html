define(['./converter'], function(Converter){
	return Converter.extend({
		wordType:'header',
		tag: 'header',
		_shouldIgnore:function(){
			return this.wordModel.location!='default'
		}
	})
})