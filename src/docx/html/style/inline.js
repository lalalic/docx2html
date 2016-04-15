import Style from './converter'

export default class Inline extends Style{
	constructor(){
		super(...arguments)
		this.style=this.wordModel.id ? this.doc.createStyle('.'+Style.asCssID(this.wordModel.id)) : this.doc.createStyle('span')
		this.inline=new this.constructor.Properties(this.style)
	}
	_getPropertiesConverter(){
		return this.inline
	}
}

Inline.Properties=class Properties extends Style.Properties{
	rFonts(x){
		x.ascii && (this.style.fontFamily=x.ascii)
	}
	b(x){
		this.style.fontWeight=700
	}
	sz(x){
		this.style.fontSize=x+'pt'
	}
	color(x){
		this.style.color=x
	}
	i(x){
		this.style.fontStyle='italics'
	}
	u(x){
		this.style.textDecoration='underline'
	}
	bdr(x){
		this.style.border=this._border(x)
	}
	lang(x){
		
	}
	vertAlign(x){
		switch(x){
		case 'superscript':
			this.style.verticalAlign='super'
		break
		case 'subscript':
			this.style.verticalAlign='sub'
		break
		}
	}
	highlight(x){
		this.style.backgroundColor=x
	}
}