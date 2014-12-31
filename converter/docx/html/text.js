define(['./converter'], function(Converter){
	return Converter.extend({
		wordType:'text',
		convert: function(){
			this.parent.content.appendChild(this.doc.createTextNode(this.wordModel.getText()))
		}
	})
})