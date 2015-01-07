define(['./converter'],function(Converter){
	return Converter.extend({
		wordType:'document',
		tag:'html',
		convert: function(){
			this.doc=this.constructor.create(this.constructor.defaults.container)
			this.content=this.doc
			with(this.doc.bgStyle){
				backgroundColor='lightgray'
				minHeight='1000px'
				width='100%'
				paddingTop='20px'
				overflow='auto'
			}
			
			var style=this.doc.createStyle('*')
			style.margin='0'
			style.border='0'
			style.padding='0'
			style.boxSizing='border-box'
			
			style=this.doc.createStyle('table')
			style.width='100%'
			style.borderCollapse='collapse'
			
			style=this.doc.createStyle('section')
			style.margin='auto'
			style.backgroundColor='white'
			style.color='black'
			style.position='relative'
			style.zIndex=0
			
			style=this.doc.createStyle('p:empty')
			style.display='inline-block'
			
			style=this.doc.createStyle('ul')
			style.listStyle="none"
			
			style=this.doc.createStyle('ul>li>p')
			style.position='relative'
			
			style=this.doc.createStyle('ul .marker')
			style.position='absolute'
			
			style=this.doc.createStyle('a')
			style.textDecoration='none'
		}
	},{
		create: function(container){
			var root=container||document.createElement('div')
			root.id="A"+new Date().getTime()
			document.body.appendChild(root)
			
			root.section=null
			
			root.bgStyle=root.style
			
			root.createElement=document.createElement.bind(document)
			root.createTextNode=document.createTextNode.bind(document)
			
			var elStyle=document.createElement('style')
			elStyle.appendChild(document.createTextNode(""));
			document.$1('head').insertBefore(elStyle,null)
			root.stylesheet=elStyle.sheet
			
			var relStyles={}, styles={}
			root.createStyle=function(selector){
				if(styles[selector])
					return styles[selector]
				var rules=this.stylesheet.rules,len=rules.length
				this.stylesheet.addRule('#'+this.id+" "+selector.split(',').join(', #'+this.id+' '),'{}')
				return  styles[selector]=this.stylesheet.rules.item(len).style
			}
			root.stylePath=function(a, parent){
				if(parent)
					return relStyles[a]=parent
				var paths=[a],parent=a
				while(parent=relStyles[parent])
					paths.unshift(parent)
				return paths.join(' ')
			}
			root.release=function(){
				delete relStyles
				delete styles
				delete this.section
			}
			return root
		},
		defaults:{
			container:false
		}
	})
})