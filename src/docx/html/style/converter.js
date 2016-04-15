import Converter from '../converter'

var Lines='dotted,dashed,inset,outset,solid'.split()
var browsers=',-webkit-,-moz-'.split(','), cssID=Converter.asCssID;

export default class StyleConverter extends Converter{
	constructor(){
		super(...arguments)
		var parentStyle=this.wordModel.getParentStyle();
		parentStyle && this.doc.stylePath(cssID(this.wordModel.id), cssID(parentStyle.id))
	}
	convert(value,name,category){
		var converter=this._getPropertiesConverter(category);
		converter && converter[name] && converter[name](value)
	}
	_getPropertiesConverter(){
		
	}
}

StyleConverter.Properties=class Properties{
	constructor(style,parent){
		this.style=style
		this.parent=parent
		parent && (this.doc=parent.doc)
	}
	visit(){
		this.convert(...arguments)
	}
	
	convert(value, name){
		this[name] && this[name](value)
	}
	
	_border(border){
		if(border.val=='none' || border.val=='nil')
			return '0'
		else
			return (border.sz<1 && border.sz>0 ? 1 : border.sz)+'pt '+(Lines.indexOf(border.val.toLowerCase())!=-1 ? border.val : 'solid')+' '+(border.color||'')
	}
	equalObj(a,b){
		var keys=Object.keys(a)
		if(!b || keys.length!=Object.keys(b).length)
			return false
		if(keys.length!=0){					
			for(var i=0,len=keys.length;i<len;i++){
				if(a[keys[i]]!=b[keys[i]])
					return false
			}
		}
		
		for(var i=2,len=arguments.length;i<len;i++)
			if(!this.equalObj(a,arguments[i]))
				return false
		return true
	}
	upperFirst(type){
		return type[0].toUpperCase() + type.slice(1)
	}
	styless(name,value, style){
		browsers.forEach(function(a){
			this[a+name]=value
		}.bind(style||this.style))
	}
	lineStyle(x){
		if(!x)
			return 'solid'
		x=x.toLowerCase()
		if(x.indexOf('dot')!=-1)
			return 'dotted'
		else if(x.indexOf('dash')!=-1)
			return 'dashed'
		else if(x.indexOf('double')!=-1 || x.indexOf('gap')!=-1)
			return 'double'
		else if(x.indexOf('emboss')!=-1)
			return 'ridge'
		else if(x.indexOf('grave')!=-1)
			return 'groove'
		else if(x.indexOf('outset')!=-1)
			return 'outset'
		else if(x.indexOf('inset')!=-1)
			return 'inset'
		else
			return 'solid'
	}
}

