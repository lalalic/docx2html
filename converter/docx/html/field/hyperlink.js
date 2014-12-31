define(['./field'],function(Super){
	return Super.extend({
		wordType: 'field.hyperlink',
		convert: function(elEnd){
			var a=this.doc.createElement('a')
			a.href=this.wordModel.getLink()
			elEnd.id='a'+(new Date().getTime())
			
			var current=this.elStart, parent=current.parentNode
			while(!parent.$1('#'+elEnd.id)){
				current=parent
				parent=current.parentNode
			}
			parent.insertBefore(a, current)
			while(a.nextSibling)
				a.appendChild(a.nextSibling)
			
			this.elStart.uptrim()
			elEnd.uptrim()
		}
	})
})