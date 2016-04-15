import Converter from './converter'

export default class Text extends Converter{
	convert(){
		this.parent.content.appendChild(this.doc.createTextNode(this.wordModel.getText()))
	}
}