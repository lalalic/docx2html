import Converter from './converter'
import Style from './style/table'

export default class Table extends Converter{
	get tag(){return 'table'}

	convertStyle(el){
		super.convertStyle(...arguments)
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
	}
	
	getTableSelector(){
		var selector='#'+(this.content.id ? this.content.id : (this.content.id=this.doc.uid())),
			level=Style.prototype.PrioritiziedStyles.length;
		for(var i=0;i<level;i++){
			this.content.setAttribute('x'+i,1)
			selector+=('[x'+i+']')
		}
		return selector+">tbody"
	}
}

Table.Properties=class Properties extends Style.Properties{
	
}