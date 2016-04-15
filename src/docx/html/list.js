import Paragraph from './p'

export default class List extends Paragraph{
	convert(){
		var elParent=this.parent.content, ul=elParent.lastElementChild;
		var listStyle=this.wordModel.getNumberingStyle()
		var numId=listStyle.id, level=this.wordModel.getLevel()
		
		var makeStructure=function(parent){
			ul=this.doc.createElement('ul')
			ul.id=listStyle.id
			ul.setAttribute('level',level)
			this.constructor.addClass(ul,listStyle.getParentStyle().id)
			parent.appendChild(ul)
		}.bind(this)
		
		if(!ul || ul.localName!='ul' || ul.id!=numId){
			makeStructure(elParent)
		}else if(ul.getAttribute('level')!=level){
			var possibleParent=ul.querySelector('[level="'+level+'"]')
			if(!possibleParent){
				makeStructure(ul.querySelector('[level="'+(parseInt(level)-1)+'"]') || ul)
			}else 
				ul=possibleParent
		}
		var li=this.doc.createElement('li')
		ul.appendChild(li)
		li.appendChild(this.content=this.createElement())
		var marker=this.doc.createElement('span')
		this.constructor.addClass(marker, 'marker')
		this.content.appendChild(marker)//as marker
		this.convertStyle(this.content)
	}
}