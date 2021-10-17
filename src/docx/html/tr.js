import Converter from './converter'
import Style from './style/table'

export default class Tr extends Converter{
	get tag(){return 'tr'}

	convertStyle(el){
		super.convertStyle(...arguments)
		var style=this.wordModel.getDirectStyle()
		style && style.parse([new this.constructor.Properties(el.style, this)])
	}
}

class Properties extends Style.RowProperties{
	cnfStyle(names){
		if(names.length==0)
			return 

		const PrioritiziedStyles=Style.prototype.PrioritiziedStyles
		names=names.sort((a,b)=>PrioritiziedStyles.indexOf(a)-PrioritiziedStyles.indexOf(b))
		const level=PrioritiziedStyles.indexOf(names[names.length-1])
		
		Tr.addClass(this.parent.content,names.join(' '));
		for(var i=0;i<level;i++)
			this.parent.content.setAttribute('x'+i,1)
	}
}

Tr.Properties=Properties