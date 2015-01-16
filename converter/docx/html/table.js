define(['./converter','./style/table'], function(Converter, Style){
	return Converter.extend({
		wordType:'table',
		tag:'table',
		convertStyle: function(el){
			Converter.prototype.convertStyle.apply(this,arguments)
			var width=this.wordModel.getColWidth(), html=['<colgroup>']
			for(var i=0,cols=width.cols,sum=width.sum,len=cols.length;i<len;i++)
				html.push('<col style="width:'+(cols[i]*100/sum)+'%"/>')
			html.push('</colgroup>')
			el.innerHTML=html.join('')
			var style=this.wordModel.getDirectStyle()
			style && style.parse([new this.constructor.Properties(el.style, this)])
			var tbody=this.doc.createElement('tbody')
			this.content.appendChild(tbody)
			this.content=tbody
		},
		getTableSelector: function(){
			var selector='#'+(this.content.id ? this.content.id : (this.content.id=this.doc.uid())),
				level=Style.prototype.PrioritiziedStyles.length;
			for(var i=0;i<level;i++){
				this.content.attr('x'+i,1)
				selector+=('[x'+i+']')
			}
			return selector+">tbody"
		}
	},{
		Properties: Style.Properties.extend({})
	})
})