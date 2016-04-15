import Converter from './converter'
import Style from './style/inline'

export default class Span extends Converter{
	get tag(){return 'span'}
	
	convertStyle(el){
		super.convertStyle(...arguments)
		var style=this.wordModel.getDirectStyle()
		style && style.parse([new Style.Properties(el.style)])
	}
	_shouldIgnore(){
		return this.wordModel.isWebHidden() || this.wordModel.isHidden()
	}
}