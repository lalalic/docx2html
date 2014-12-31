define(['require'],function(require){
	return $.newClass(function(wModel,htmlDoc, parentConverter){
		this.wordModel=wModel
		this.doc=htmlDoc
		this.parent=parentConverter
		this.content=null;
	},{
		wordType:null,
		tag:null,
		/**interface API: happen when just word model identified, without children appended yet*/
		visit: function(){
			if(!this.parent || this.parent.content)
				return this.convert.apply(this,arguments)
		},
		convert: function(){
			if(this.tag){
				this.content=this.doc.createElement($.isFunction(this.tag) ? this.tag() : this.tag)
				this.parent.content.appendChild(this.content)
			}else
				this.content=this.parent && this.parent.content || null
			this.convertStyle(this.content)
		},
		convertStyle: function(el, a){
			this.wordModel.getStyleId && (a=this.wordModel.getStyleId()) && el.attr('class', this.doc.stylePath(a));
		},
		_shouldIgnore: function(){
			return false
		}
	})
})