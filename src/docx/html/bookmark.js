import Converter from './converter'

export default class Bookmark extends Converter{
	get tag(){return 'i'}

	convert(){
		if(this.parent.content.childNodes.length==0 && !this.parent.content.id){
			this.parent.content.id=this.wordModel.getName()
		}else{
			super.convert(...arguments)
			this.content.id=this.wordModel.getName()
		}
	}

}