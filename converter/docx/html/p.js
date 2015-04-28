define(['./converter','./style/paragraph'], function(Super, Style){
	return Super.extend({
		wordType:'paragraph',
		createElement: function(){
			var p=this.doc.createElement('div')
			p.setAttribute('class','p')
			return p
		},
		convertStyle: function(el){
			Super.prototype.convertStyle.apply(this,arguments)
			var style=this.wordModel.getDirectStyle()
			style && style.parse([new Style.Properties(el.style)])
		}
	},{
		P:'div.p'
	})
})