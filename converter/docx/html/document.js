define(['./converter','jszip'],function(Converter, JSZip){
	function isNodejs(){
		return typeof(__dirname)!=='undefined'
	}
	return Converter.extend({
		wordType:'document',
		tag:'html',
		convert: function(){
			this.doc=this.constructor.create(this.options)
			this.content=this.doc
			with(this.content.style){
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
			style.wordBreak='break-word'
			
			style=this.doc.createStyle('section')
			style.margin='auto'
			style.backgroundColor='white'
			style.color='black'
			style.position='relative'
			style.zIndex=0
			
			style=this.doc.createStyle('p:empty:before')
			style.content='""'
			style.display='inline-block'
			
			style=this.doc.createStyle('ul')
			style.listStyle="none"
			
			style=this.doc.createStyle('ul>li>p')
			style.position='relative'
			
			style=this.doc.createStyle('ul .marker')
			style.position='absolute'
			
			style=this.doc.createStyle('a')
			style.textDecoration='none'
			
			style=this.doc.createStyle('.unsupported')
			style.outline="2px red solid"
			
			style=this.doc.createStyle('.warning')
			style.outline="1px yellow solid"
		},
		/**
		* opt: {
		* 	template: function(style, html, props){ return (html)},
			extendScript: "http://a.com/a.js"
			}
		*/
		toString: function(opt){
			return this.doc.toString(opt,this.props)
		},
		release: function(){
			this.doc.release()
		},
		asZip: function(opt){
			return this.doc.asZip(opt,this.props)
		},
		download:function(opt){
			return this.doc.download(opt, this.props)
		},
		/**
		* opt=extend(toString.opt,{
			saveImage: function(arrayBuffer, doc.props): promise(url) {},
			saveHtml: function(){}
		})
		*/
		save : function(opt){
			return this.doc.save(opt, this.props)
		}
	},{
		create: function(opt){
			var selfConverter=this
			return (function(opt,document){
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
							this.body.appendChild(elStyle,null);
							return this.stylesheet=elStyle.sheet
						},
						getStyleText: function(){
							var styles=[]
							for(var i=0, rules=this.stylesheet.cssRules, len=rules.length;i<len;i++)
								styles.push(rules[i].cssText)
							return styles.join('\r\n')
						},
						uid: function(){return this.id+(uid++)},
						toString: function(opt, props){
							if(opt && typeof opt.template!="undefined" && $.isFunction(opt.template))
								return opt.template(this.getStyleText(), this._html(), props)
							var html=['<!doctype html>\r\n<html><head><meta charset=utf-8><meta key="generator" value="docx2html"><title>'+(props.name||'')+'</title><style>']
							html.push(this.getStyleText())
							html.push('</style></head><body>')
							html.push(this._html())
							opt && opt.extendScript && html.push('<script src="'+opt.extendScript+'"></script>')
							html.push('</body><html>')
							return html.join('\r\n')
						},
						_html: function(){
							var divs=this.querySelectorAll('p>div, span>div')
							if(divs.length==0)
								return this.outerHTML
							
							/**
							* illegal <p> <div/> </p>
							* DOM operation directly in onload
							*/
							var divcontainer=doc.createElement('div'), uid=0
							divcontainer.id='divcontainer'
							divcontainer.style.display="none"
							this.appendChild(divcontainer)
							for(var i=divs.length-1;i>-1;i--){
								var div=divs[i],
									parent=div.parentNode;
									
								if(!div.id)
									div.id='_z'+(++uid)
								
								if(!parent.id)
									parent.id='_y'+uid
									
								div.setAttribute('data-parent',parent.id)
								div.setAttribute('data-index',indexOf(div,parent.childNodes))
									
								divcontainer.appendChild(divs[i])
							}
							
							var html=this.outerHTML+'\n\r<script>('+this._transformer.toString()+')();</script>'
							this._transformer();
							return html
						},
						_transformer: function(){
							var a=document.querySelector('#divcontainer')
							for(var divs=a.childNodes, i=divs.length-1;i>-1;i--){
								var div=divs[i], 
									parentId=div.getAttribute('data-parent'),
									index=parseInt(div.getAttribute('data-index')),
									parent=document.querySelector('#'+parentId);
								parent.insertBefore(div,parent.childNodes[index])
							}
							a.parentNode.removeChild(a)
						}
					});
					
					function indexOf(el, els){
						for(var i=els.length-1;i>0;i--)
							if(el==els[i])
								return i
						return 0
					}
					
					(opt && opt.container || document.body).appendChild(root);
					root.body=root
					return root
				})(opt);
				
				return (function mixin(doc){
					var stylesheet=doc.createStyleSheet()
					var relStyles={}, styles={}
					
					return $.extend(selfConverter[isNodejs() ? 'nodefy' : 'browserify'](doc,stylesheet, opt),{
						createStyle: function(selector){
							if(styles[selector])
								return styles[selector]
							var rules=stylesheet.cssRules,len=rules.length
							stylesheet.insertRule(selector.split(',').map(function(a){
									return a.trim()[0]=='#' ? a : '#'+this.id+' '+a
								}.bind(this)).join(',')+'{}',len)
							return  styles[selector]=stylesheet.cssRules[len].style
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
							delete relStyles
							delete styles
							delete this.section
							this._release()
						}
					})
				})(doc)
			})(opt, (function(){
					if(!isNodejs()) 
						return document
					else if(typeof(this.createDocument)!='undefined')
						return this.createDocument()
					
					var mdl='jsdom-nogyp',
						jsdom=require(mdl),
						createDocument=jsdom.jsdom;
						
					var CSSStyleDeclaration=require(mdl+'/lib/jsdom/level2/style').dom.level2.core.CSSStyleDeclaration
					function prop(name){
						return {
							set:function(x){
								this._setProperty(name, x)
							},
							get: function(){
								return this.getPropertyValue(name)
							},
							enumerable: true,
							configurable: true
						}
					}
					
					var props={}
					',-webkit-,-moz-'.split(',').forEach(function(browser){
						'count,gap,rule'.split(',').forEach(function(a){
							props[browser+'column-'+a]=prop(browser+'column-'+a)
						})
						'transform'.split(',').forEach(function(a){
							props[browser+a]=prop(browser+a)
						})
					})
					
					props.backgroundColor=prop('background-color')
					props.color=prop('color')
					props.width=prop('width')
					props.height=prop('height')
					
					Object.defineProperties(CSSStyleDeclaration.prototype,props)

					global.btoa=function(s){
						return new Buffer(s).toString('base64')
					}	
					
					this.createDocument=createDocument
					return createDocument()
				})())
		},
		nodefy: function(doc, stylesheet, opt){
			var mdl='jsdom-nogyp',
				CSSStyleDeclaration=require(mdl+'/lib/jsdom/level2/style').dom.level2.core.CSSStyleDeclaration;
			
			
			var _insertRule=stylesheet.insertRule
			stylesheet.insertRule=function(css, len){
				_insertRule.apply(this,arguments)
				this.cssRules[len].style=new CSSStyleDeclaration()
			}
			
			return $.extend(doc,{
				_release: function(){},
				asImageURL: function(buffer){
					if(opt && typeof(opt.asImageURL)!='undefined')
						return opt.asImageURL(buffer)
					return "image://notsupport"
				},
				asZip: function(){
					throw new Error('not support')
				},
				download: function(){
					throw new Error('not support')
				},
				save: function(){
					throw new Error('not support')
				}
			})
		},
		browserify: function(doc, stylesheet, opt){
			var Proto_Blob=(function(a){
					a=URL.createObjectURL(new Blob()).split('/');
					a.pop();
					return a.join('/')
				})(),
				Reg_Proto_Blob=new RegExp(Proto_Blob+"/([\\w\\d-]+)","gi");
			
			return $.extend(doc,{
				asZip: function(opt, props){
					var zip=new JSZip(),hasImage=false;
					var f=zip.folder('images')
					Object.keys(this.images).forEach(function(a){
						hasImage=true
						f.file(a.split('/').pop(),this[a])
					},this.images)
					zip.file('props.json',JSON.stringify(props));
					zip.file('main.html',hasImage ? this.toString(opt).replace(Proto_Blob,'images') : this.toString())
					return zip
				},
				download:function(opt, props){
					var a=document.createElement("a")
					document.body.appendChild(a)
					a.href=URL.createObjectURL(this.asZip(opt,props).generate({type:'blob'}))
					a.download=(props.name||"document")+'.zip'
					a.click()
					URL.revokeObjectURL(a.href)
					document.body.removeChild(a)
				},
				save : function(opt, props){
					var hasImage=false, images={}, me=this;
					return $.Deferred.when((this.images && Object.keys(this.images)||[]).map(function(a){
						hasImage=true
						return opt.saveImage(this[a],props)
							.then(function(url){return images[a]=url})
					},this.images))
					.then(function(){
						var html=me.toString(opt, props);
						if(hasImage)
							html=html.replace(Reg_Proto_Blob,function(a,id){return images[a]});
						return opt.saveHtml(html, props)
					})
				},
				images:{},
				asImageURL: function(arrayBuffer){
					var url=URL.createObjectURL(new Blob([arrayBuffer],
						{type:"image/"+(typeof(arrayBuffer)=='string' ? 'svg+xml' : '*')}));
					this.images[url]=arrayBuffer
					return url
				},
				_release: function(){
					Object.keys(this.images).forEach(function(b){
						URL.revokeObjectURL(b)
					})
					delete this.images
				}
			})
		}
	})
})