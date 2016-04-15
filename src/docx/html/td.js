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
	cnfStyle(x){
		var names=[], PrioritiziedStyles=Style.prototype.PrioritiziedStyles, level=-1, t
		for(var i=0;i<12;i++){
			if(x.charAt(i)=='1'){
				names.push(t=Style.TableStyles[i])
				if((t=PrioritiziedStyles.indexOf(t))>level)
					level=t
			}
		}
		names.length && Td.addClass(this.parent.content,names.join(' '));
		for(var i=0;i<level;i++)
			this.parent.content.setAttribute('x'+i,1)
	}
}

Td.Properties=Properties



