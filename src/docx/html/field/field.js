import Converter from '../converter'

export default class Field extends Converter{
	constructor(wordModel, parent){
		super(...arguments)
		this.elStart=parent.content;
	}
	get wordType(){return 'field'}

	convert(elEnd){}
}