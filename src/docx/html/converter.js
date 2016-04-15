var divContainers='SECTION,DIV,TD'.split(',');

export default class Converter{
	constructor(wModel, parentConverter){
		this.wordModel=wModel
		this.parent=parentConverter
		this.doc= parentConverter && parentConverter.doc
		this.content=null;
	}
	get wordType(){return null}
	get tag(){return null}
	/**interface API: happen when just word model identified, without children appended yet*/
	visit(){
		if(!this.parent || this.parent.content)
			return this.convert(...arguments)
	}
	convert(){
		this.content=this.createElement()
		if(this.content){
			this.parent.content.appendChild(this.content)
		}else
			this.content=this.parent && this.parent.content || null
			
		this.convertStyle(this.content)
	}
	createElement(){
		switch(typeof(this.tag)){
		case 'string':
			return this.doc.createElement(this.tag)
		case 'function':
			var el=this.tag()
			return this.doc.createElement(el)
		default:
			return null
		}
	}
	convertStyle(el, a){
		this.wordModel.getStyleId 
			&& (a=this.wordModel.getStyleId()) 
			&& this.constructor.addClass(el,this.doc.stylePath(this.constructor.asCssID(a)));
	}
	_shouldIgnore(){
		return false
	}
	release(){}

	static asCssID(a){
		return a.replace(/\s+/g,'_')
	}
	static addClass(el, classes){
		el.setAttribute('class', (el.getAttribute('class')||'')+' '+classes)
	}
}
