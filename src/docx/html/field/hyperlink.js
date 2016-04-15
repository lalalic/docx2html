import Field from './field'

function uptrim(el){
	var parent=el.parentNode
	parent.removeChild(el)
	if(parent.childNodes.length==0)
		uptrim(parent)
}
export default class Hyperlink extends Field{
	convert(elEnd){
		var a=this.doc.createElement('a')
		a.href=this.wordModel.getLink()
		elEnd.id=this.doc.uid()
		
		var current=this.elStart, parent=current.parentNode
		while(!parent.querySelector('#'+elEnd.id)){
			current=parent
			parent=current.parentNode
		}
		parent.insertBefore(a, current)
		while(a.nextSibling)
			a.appendChild(a.nextSibling)
		
		uptrim(this.elStart)
		uptrim(elEnd)
	}
}