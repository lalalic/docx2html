import Drawing from './drawing'

var unit=/[a-zA-Z]+$/g
function asNum(a){
	return parseFloat(a.replace(unit,''))
}

export default class Anchor extends Drawing{
	get tag(){return 'div'}
	
	convertStyle(el){
		el.style.display='inline-block'
		el.style.position='relative'
		
		super.convertStyle(...arguments)
	}

}

var PositionH={
	page(x){
		var style=this.style, t;
		switch(x.align){
		case 'left':
			if((t=this.world.width-asNum(this.doc.section.style.paddingLeft))>=0)
				style.left=0
			else
				style.left=-t+'pt'
			break
		case 'center':
			style.left=(asNum(this.doc.section.style.width)-this.world.width)/2+'pt'
			break
		case 'right': 
			if((t=this.world.width-asNum(this.doc.section.style.paddingRight))>=0)
				style.right=0
			else
				style.right=-t+'pt'
			break
		case 'inside': 
			style.left=0
			break
		case 'outside': 
			style.right=0
			break
		default:
			style.left=x.posOffset+'pt'
			break
		}
	},
	margin(x){
		var sect=this.doc.section.style
		switch(x.align){
		case 'inside': 
		case 'left':
			this.style.left=sect.paddingLeft
			break
		case 'center':
			this.style.left=(asNum(sect.width)-asNum(sect.paddingRight)+asNum(sect.paddingLeft)-this.world.width)/2+'pt'
			break
		case 'outside': 
		case 'right': 
			this.style.right=sect.paddingRight
			break
		default:
			this.style.left=(x.posOffset+asNum(sect.paddingLeft))+'pt'
			break
		}
	},
	column(x){
		Anchor.addClass(this.parent.content,'warning warning-positionH-column')
		PositionH.margin.call(this,x)
	},
	character(x){
		Anchor.addClass(this.parent.content,'unsupported unsupported-positionH-character')
	},
	leftMargin(x){
		Anchor.addClass(this.parent.content,'unsupported unsupported-positionH-leftMargin')
	},
	rightMargin(x){
		Anchor.addClass(this.parent.content,'unsupported unsupported-positionH-rightMargin')
	},
	insideMargin(x){
		Anchor.addClass(this.parent.content,'unsupported unsupported-positionH-insideMargin')
	},
	outsideMargin(x){
		Anchor.addClass(this.parent.content,'unsupported unsupported-positionH-outsideMargin')
	}
}
var PositionV={
	page(x){
		var style=this.style, sect=this.doc.section.style;
		switch(x.align){
		case 'top':
			style.top=0
			break
		case 'bottom':
			style.bottom=0
			break
		case 'center':
		case 'outside':
		case 'inside':
			Anchor.addClass(this.parent.content,'unsupported unsupported-positionV-page-'+x.align)
		break
		default:
			style.top=x.posOffset+'pt'
		break
		}
	},
	margin(x){
		var style=this.style,sect=this.doc.section.style
		switch(x.align){
		case 'top':
			style.top=sect.paddingTop
		break
		case 'bottom':
			style.bottom=sect.paddingBottom
		break
		case 'center':
		case 'outside':
		case 'inside':
			Anchor.addClass(this.parent.content,'unsupported unsupported-positionV-margin-'+x.align)
		break
		default:
			style.top=asNum(sect.paddingTop)+x.posOffset+'pt'
		break
		}
	},
	line(x){
		Anchor.addClass(this.parent.content,'unsupported unsupported-positionV-line')
	},
	topMargin(x){
		Anchor.addClass(this.parent.content,'unsupported unsupported-positionV-topMargin')
	},
	bottomMargin(x){
		Anchor.addClass(this.parent.content,'unsupported unsupported-positionV-bottomMargin')
	},
	insideMargin(x){
		Anchor.addClass(this.parent.content,'unsupported unsupported-positionV-insideMargin')
	},
	outsideMargin(x){
		Anchor.addClass(this.parent.content,'unsupported unsupported-positionV-outsideMargin')
	},
	paragraph(x){//only offset
		Anchor.addClass(this.parent.content,'unsupported unsupported-positionV-paragraph')
	}
}
	
//only support absolute page offset
class Properties extends Drawing.Properties{
	getParagraphPaddingLeft(){
		return '0pt'
	}
	positionH(x){
		PositionH[x.relativeFrom].call(this,x)
	}
	positionV(x){
		PositionV[x.relativeFrom].call(this,x)
	}
	wrap(x){
		switch(x){
		case 'tight':
		case 'through':
		case 'square':
		case 'topAndBottom':
			Anchor.addClass(this.parent.content,'unsupported unsupported-wrap-'+x)
			break
		default:
			this.style.position='absolute'
		}
	}
	behindDoc(x){
		this.style.zIndex=-1
	}
}

Anchor.Properties=Properties
