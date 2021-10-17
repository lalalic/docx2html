import Converter from './converter'
import Style from './style/table'

export default class Td extends Converter{
	get tag(){return 'td'}
	
	convertStyle(el){
		super.convertStyle(...arguments)
		var style=this.wordModel.getDirectStyle()
		style && style.parse([new this.constructor.Properties(el.style,this)])
	}

}

class Properties extends Style.CellProperties{
	tcBorders(x){
		x.left && (this.style.borderLeft=this._border(x.left))
		x.right && (this.style.borderRight=this._border(x.right))
		x.top && (this.style.borderTop=this._border(x.top))
		x.bottom && (this.style.borderBottom=this._border(x.bottom))
	}
	cnfStyle(names){
		if(names.length==0)
			return 

		const PrioritiziedStyles=Style.prototype.PrioritiziedStyles
		names=names.sort((a,b)=>PrioritiziedStyles.indexOf(a)-PrioritiziedStyles.indexOf(b))
		const level=PrioritiziedStyles.indexOf(names[names.length-1])
		
		Td.addClass(this.parent.content,names.join(' '));
		for(var i=0;i<level;i++)
			this.parent.content.setAttribute('x'+i,1)
	}
}

Td.Properties=Properties



