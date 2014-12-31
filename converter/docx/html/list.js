define(['./p'], function(Super){
	return Super.extend({
		wordType:'list',
		convert: function(){
			var elParent=this.parent.content, ul=elParent.lastElementChild;
			var listStyle=this.wordModel.getNumberingStyle()
			var numId=listStyle.id, level=this.wordModel.getLevel()
			
			var makeStructure=function(parent){
				ul=this.doc.createElement('ul')
				ul.id=listStyle.id
				ul.attr('level',level)
				ul.classList.add(listStyle.getParentStyle().id)
				parent.appendChild(ul)
			}.bind(this)
			
			if(!ul || ul.localName!='ul' || ul.id!=numId){
				makeStructure(elParent)
			}else if(ul.attr('level')!=level){
				var possibleParent=ul.$1('[level="'+level+'"]')
				if(!possibleParent){
					makeStructure(ul.$1('[level="'+(parseInt(level)-1)+'"]') || ul)
				}else 
					ul=possibleParent
			}
			var li=this.doc.createElement('li')
			ul.appendChild(li)
			li.appendChild(this.content=this.doc.createElement(this.tag))
			var marker=this.doc.createElement('span')
			marker.classList.add('marker')
			this.content.appendChild(marker)//as marker
			this.convertStyle(this.content)
		}
	})
})