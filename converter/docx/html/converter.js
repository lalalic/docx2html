define([],function(){
	var divContainers='SECTION,DIV,TD'.split(',');
	return $.newClass(function(wModel, parentConverter){
		this.wordModel=wModel
		this.parent=parentConverter
		this.doc= parentConverter && parentConverter.doc
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
				if(this.content.tagName.toUpperCase()=='DIV'){
					/*
					* illegal structure: <p>..<div/>...</p>
					*/
					var container=this.parent.content
					while(container && divContainers.indexOf(container.tagName.toUpperCase())==-1)
						container=container.parentNode;
					container.appendChild(this.content)
				}else
					this.parent.content.appendChild(this.content)
			}else
				this.content=this.parent && this.parent.content || null
			this.convertStyle(this.content)
		},
		convertStyle: function(el, a){
			this.wordModel.getStyleId 
				&& (a=this.wordModel.getStyleId()) 
				&& this.constructor.addClass(el,this.doc.stylePath(this.constructor.asCssID(a)));
		},
		_shouldIgnore: function(){
			return false
		},
		release: function(){}
	},{
		asCssID: function(a){
			return a.replace(/\s+/g,'_')
		},
		addClass: function(el, classes){
			el.setAttribute('class', (el.getAttribute('class')||'')+' '+classes)
		}
	})
})