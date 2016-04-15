import Converter from './converter'

export default class A extends Converter{
	get tag(){return 'a'}
	
	convert(){
		super.convert(...arguments)
		var link=this.wordModel.getLink();
		link && (this.content.href=link)
	}

}