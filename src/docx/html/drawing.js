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
		this.style.width=x.width+'pt'
		this.style.height=x.height+'pt'
	}
	distL(x){
		x && (this.style.marginLeft=x+'pt')
	}
	distT(x){
		x && (this.style.marginTop=x+'pt')
	}
	distB(x){
		x && (this.style.marginBottom=x+'pt')
	}
	distR(x){
		x && (this.style.marginRight=x+'pt')
	}
}

Drawing.Properties=Properties