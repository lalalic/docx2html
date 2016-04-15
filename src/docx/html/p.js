import Converter from './converter'
import Style from './style/paragraph'

export default class Paragraph extends Converter{
	get tag(){return 'p'}
	
	convertStyle(el){
		super.convertStyle(...arguments)
		var style=this.wordModel.getDirectStyle()
		style && style.parse([new Style.Properties(el.style)])
	}
}