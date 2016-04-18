import Converter from './converter'
import JSZip from 'jszip'

var createDocument, CSSStyleDeclaration

export default class Document extends Converter{
	get tag(){return 'html'}

	convert(){
		this.doc=this.constructor.create(this.options)
		this.content=this.doc
		let contentStyle=this.content.style
		contentStyle.backgroundColor='transparent'
		contentStyle.minHeight='1000px'
		contentStyle.width='100%'
		contentStyle.paddingTop='20px'
		contentStyle.overflow='auto'

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
		this.convertStyle()
	}
	
	convertStyle(){
		var bgStyle=this.wordModel.getBackgroundStyle()
		if(!bgStyle)
			return
		
		var style=this.doc.createStyle('section')
		switch(typeof bgStyle){
		case 'object':// fill
			console.warn('not support fill color on document background yet')
		break
		default:
			style.backgroundColor=bgStyle
		break
		}
	}
	/**
	* opt: {
	* 	template: function(style, html, props){ return (html)},
		extendScript: "http://a.com/a.js"
		}
	*/
	toString(opt){
		return this.doc.toString(opt,this.props)
	}
	release(){
		this.doc.release()
	}
	asZip(opt){
		return this.doc.asZip(opt,this.props)
	}
	download(opt){
		return this.doc.download(opt, this.props)
	}
	/**
	* opt=extend(toString.opt,{
		saveImage: function(arrayBuffer, doc.props): promise(url) {},
		saveHtml: function(){}
	})
	*/
	save (opt){
		return this.doc.save(opt, this.props)
	}

	static create(opt){
		var selfConverter=this
		return (function(document){
			var doc=(function browserDoc(){
				var uid=0;
				var root=Object.assign(document.createElement('div'),{
					id : "A",
					section: null,
					createElement: document.createElement.bind(document),
					createTextNode: document.createTextNode.bind(document),
					createStyleSheet(){
						if(this.stylesheet)
							return this.stylesheet;
						var elStyle=this.createElement('style')
						this.body.appendChild(elStyle,null);
						return this.stylesheet=elStyle.sheet
					},
					getStyleText(){
						var styles=[]
						for(var i=0, rules=this.stylesheet.cssRules, len=rules.length;i<len;i++)
							styles.push(rules[i].cssText)
						return styles.join('\r\n')
					},
					uid(){
						return this.id+(uid++)
					},
					toString(opt, props){
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
					_html(){
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
					_transformer(){
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
			})();

			return (function mixin(doc){
				var stylesheet=doc.createStyleSheet()
				var relStyles={}, styles={}

				return Object.assign(selfConverter[$.isNode ? 'nodefy' : 'browserify'](doc,stylesheet, opt),{
					createStyle(selector){
						if(styles[selector])
							return styles[selector]
						var rules=stylesheet.cssRules,len=rules.length
						stylesheet.insertRule(selector.split(',').map(function(a){
								return a.trim()[0]=='#' ? a : '#'+this.id+' '+a
							}.bind(this)).join(',')+'{}',len)
						return  styles[selector]=stylesheet.cssRules[len].style
					},
					stylePath(a, parent){
						if(parent)
							return relStyles[a]=parent
						var paths=[a],parent=a
						while(parent=relStyles[parent])
							paths.unshift(parent)
						return paths.join(' ')
					},
					release(){
						delete this.section
						this._release()
					}
				})
			})(doc)
		})($.isNode ? createDocument() : document)
	}

	static nodefy(doc, stylesheet, opt){
		return Object.assign(doc,{
			_release(){

			},
			asImageURL(buffer){
				if(opt && typeof(opt.asImageURL)!='undefined')
					return opt.asImageURL(buffer)
				return "image://notsupport"
			},
			asZip(){
				throw new Error('not support')
			},
			download(){
				throw new Error('not support')
			},
			save(){
				throw new Error('not support')
			}
		})
	}

	static browserify(doc, stylesheet, opt){
		var Proto_Blob=(function(a){
				a=URL.createObjectURL(new Blob()).split('/');
				a.pop();
				return a.join('/')
			})(),
			Reg_Proto_Blob=new RegExp(Proto_Blob+"/([\\w\\d-]+)","gi");

		return Object.assign(doc,{
			asZip(opt, props){
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
			download(opt, props){
				var a=document.createElement("a")
				document.body.appendChild(a)
				a.href=URL.createObjectURL(this.asZip(opt,props).generate({type:'blob'}))
				a.download=(props.name||"document")+'.zip'
				a.click()
				URL.revokeObjectURL(a.href)
				document.body.removeChild(a)
			},
			save(opt, props){
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
			asImageURL(arrayBuffer){
				var url=URL.createObjectURL(new Blob([arrayBuffer],
					{type:"image/"+(typeof(arrayBuffer)=='string' ? 'svg+xml' : '*')}));
				this.images[url]=arrayBuffer
				return url
			},
			_release(){
				Object.keys(this.images).forEach(function(b){
					URL.revokeObjectURL(b)
				})
				delete this.images
			}
		})
	}
}

(function(isNode, m){
	if(!isNode)	return;

	createDocument=require(m).jsdom
	let window=createDocument().defaultView

	global.btoa=window.btoa
	CSSStyleDeclaration=window.CSSStyleDeclaration
})($.isNode, "jsdom")
