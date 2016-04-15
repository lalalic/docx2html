import Style from './converter'
import Inline from './inline'
import Paragraph from './paragraph'

var ListStyleType={lowerLetter:'lower-latin',upperLetter:'upper-latin',lowerRoman:'lower-roman',upperRoman:'upper-roman'}
var cssID=Style.asCssID
	
export default class List extends Style{
	constructor(){
		super(...arguments)
		this.levelStyles={}
	}
	
	_getPropertiesConverter(category){
		if(!category)
			return null
		var info=category.split(' '),
			level=parseInt(info[0]),
			type=info.length==1 ? 'list' : info[1],
			style=this.levelStyles[level],
			levelSelector='.'+cssID(this.wordModel.id)+'[level="'+level+'"]';
		
		if(!style)
			style=this.levelStyles[level]={}
			
		if(style[type])
			return style[type];
			
		switch(type){
		case 'inline':
			style.inline=new Inline.Properties(this.doc.createStyle(levelSelector+'>li>p>.marker:before'))
			break
		case 'paragraph':
			style.paragraph=new this.constructor.Pr(this.doc.createStyle(levelSelector+'>li>p'), this, levelSelector)
			break
		case 'list':
			style.list=new this.constructor.Properties(this.doc.createStyle(levelSelector+'>li>p>.marker:before'), this, levelSelector, cssID(this.wordModel.id)+'_'+level, level);
			break
		}
		return style[type]
	}
}
	
List.Pr=class Pr extends Paragraph.Properties{
	constructor(style,parent, levelSelector){
		super(...arguments)
		this.doc=parent.doc
		this.levelSelector=levelSelector
	}
	ind(x){
		var hanging=x.hanging
		delete x.hanging
		Paragraph.Properties.prototype.ind.call(this,x)
		x.hanging=hanging
		x.hanging && (this.doc.createStyle(this.levelSelector+'>li>p>.marker').left=-x.hanging+'pt')
	}
}
		
List.Properties=class Properties extends Style.Properties{
	constructor(style, parent, levelSelector, counter, level){
		super(...arguments)
		this.doc=parent.doc
		this.levelSelector=levelSelector
		this.level=level
		this.counter=counter
		this.doc.createStyle(levelSelector).counterReset=counter
		this.doc.createStyle(levelSelector+'>li').counterIncrement=counter
	}
	start(x){
		this.doc.createStyle(this.levelSelector).counterReset=this.counter+' '+(x-1)
	}
	numFmt(x){
		this.type=ListStyleType[x]||x
	}
	lvlText(x){
		this.style.content='"'+x.replace('%'+(this.level+1),'" counter('+this.counter+(!this.type ? '' : ','+this.type)+') "')+'"'
	}
	lvlJc(x){
		
	}
	lvlPicBulletId(x){
		
	}
}