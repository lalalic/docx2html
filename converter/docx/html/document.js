define(['./converter','jszip'],function(Converter, JSZip){
	var Proto_Blob=(function(a){a=URL.createObjectURL(new Blob()).split('/');a.pop();return a.join('/')})();
	var Reg_Proto_Blob=new RegExp(Proto_Blob+"/([\\w\\d-]+)","gi")
	return Converter.extend({
		wordType:'document',
		tag:'html',
		convert: function(){
			this.content=this.doc=this.constructor.create(this.options)
			with(this.doc.style){
				backgroundColor='transparent'
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
		},
		toString: function(opt){
			if(opt && typeof opt.template!="undefined" && $.isFunction(opt.template))
				return opt.template(this.doc.getStyleText(), this.doc.outerHTML, this.props)
			var html=['<!doctype html>\r\n<html><head><meta key="generator" value="docx2html"><title>'+(this.props.name||'')+'</title><style>']
			html.push(this.doc.getStyleText())
			html.push('</style></head><body>')
			html.push(this.doc.outerHTML)
			opt && opt.extendScript && html.push('<script src="'+opt.extendScript+'"></script>')
			html.push('</body><html>')
			return html.join('\r\n')
		},
		release: function(){
			this.doc.release()
		},
		asZip: function(opt){
			var zip=new JSZip(),hasImage=false;
			var f=zip.folder('images')
			Object.keys(this.doc.images).forEach(function(a){
				hasImage=true
				f.file(a.split('/').pop(),this[a])
			},this.doc.images)
			zip.file('props.json',JSON.stringify(this.props));
			zip.file('main.html',hasImage ? this.toString().replace(Proto_Blob,'images') : this.toString())
			return zip
		},
		download:function(opt){
			var a=document.createElement("a")
			document.body.appendChild(a)
			a.href=URL.createObjectURL(this.asZip().generate({type:'blob'}))
			a.download=(this.props.name||"document")+'.zip'
			a.click()
			URL.revokeObjectURL(a.href)
			document.body.removeChild(a)
		},
		save : function(opt){
			var hasImage=false, images={}, me=this;
			return $.Deferred.when((this.doc.images && Object.keys(this.doc.images)||[]).map(function(a){
				hasImage=true
				return opt.saveImage(this[a],me.props)
					.then(function(url){return images[a]=url})
			},this.doc.images))
			.then(function(){
				var html=me.toString(opt);
				if(hasImage)
					html=html.replace(Reg_Proto_Blob,function(a,id){return images[a]});
				return opt.saveHtml(html,me.props)
			})
		}
		
	},{
		create: function(opt){
			var doc=(function browserDoc(){
				var uid=0;
				var root=$.extend(document.createElement('div'),{
					id : "A",
					section: null,
					createElement: document.createElement.bind(document),
					createTextNode: document.createTextNode.bind(document),
					createStyleSheet: function(){
						if(this.stylesheet)
							return this.stylesheet;
						var elStyle=this.createElement('style')
						this.appendChild(elStyle,null);
						return this.stylesheet=elStyle.sheet
					},
					getStyleText: function(){
						var styles=[]
						for(var i=0, rules=this.stylesheet.rules, len=rules.length;i<len;i++)
							styles.push(rules[i].cssText)
						return styles.join('\r\n')
					},
					uid: function(){return 'A'+(uid++)}
				});
				(opt && opt.container || document.body).appendChild(root);
				return root
			})(opt);
			
			return (function mixin(doc){
				var stylesheet=doc.createStyleSheet()
				var relStyles={}, styles={}
				var blobs=[];
				return $.extend(doc,{
					createStyle: function(selector){
						if(styles[selector])
							return styles[selector]
						var rules=stylesheet.rules,len=rules.length
						stylesheet.addRule(selector.split(',').map(function(a){
								return a.trim()[0]=='#' ? a : '#'+this.id+' '+a
							}.bind(this)).join(','),'{}')
						return  styles[selector]=stylesheet.rules.item(len).style
					},
					stylePath:function(a, parent){
						if(parent)
							return relStyles[a]=parent
						var paths=[a],parent=a
						while(parent=relStyles[parent])
							paths.unshift(parent)
						return paths.join(' ')
					},
					release:function(){
						Object.keys(this.images).forEach(function(b){
							URL.revokeObjectURL(b)
						})
						delete this.images
						delete relStyles
						delete styles
						delete this.section
					},
					asImageURL: function(arrayBuffer){
						var url=URL.createObjectURL(new Blob([arrayBuffer],{type:"image/*"}));
						(this.images || (this.images={}))[url]=arrayBuffer
						return url
					}
				})
			})(doc);
		}
	})
})