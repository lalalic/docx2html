import Paragraph from './p'	

export default class H extends Paragraph{
	get tag(){
		return `h${this.wordModel.getOutlineLevel()+1}`
	}
}