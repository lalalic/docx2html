define(['./converter'], function(Converter){
	return Converter.extend({
		wordType:'hyperlink',
		tag:'a',
		convert: function(){
			Converter.prototype.convert.apply(this,arguments)
			var link=this.wordModel.getLink();
			link && (this.content.href=link)
		}
	})
})