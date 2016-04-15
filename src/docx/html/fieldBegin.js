import Converter from './converter'	

export default class FieldBegin extends Converter{
	get tag(){return 'span'}
	
	convert(wordField, endConverter){
		if(!wordField)
			return super.convert(...arguments)
		var converter=this.constructor.factory(wordField, this)
		converter && converter.convert(endConverter && endConverter.content)
	}
	
	static factory(wordField, parent){
		try{
			var Model=require('./factory')[wordField.type]
			return new Model(wordField, parent)
		}catch(e){
		}
	}
}