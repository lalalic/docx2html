import Converter from './converter'
import Style from './style/converter'

export default class Drawing extends Converter{
	convertStyle(el){
		super.convertStyle(...arguments)
		var style=this.wordModel.getDirectStyle()
		style && style.parse([new this.constructor.Properties(el.style,this)])
	}

}

class Properties extends Style.Properties{
	extent(x){
		this.world=x
		this.style.width=x.width+'px'
		this.style.height=x.height+'px'
	}
	distL(x){
		x && (this.style.marginLeft=x+'px')
	}
	distT(x){
		x && (this.style.marginTop=x+'px')
	}
	distB(x){
		x && (this.style.marginBottom=x+'px')
	}
	distR(x){
		x && (this.style.marginRight=x+'px')
	}
}

Drawing.Properties=Properties