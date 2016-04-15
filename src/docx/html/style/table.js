import Style from './converter'
import Paragraph from './paragraph'
import Inline from './inline'

/*
the priority of css rule should be aligned with word
*/

var gRow=/row|horz/i
export default class Table extends Style{
	constructor(){
		super(...arguments)
		this.target=this.wordModel.getTarget()
	}
	get PrioritiziedStyles(){
		return 'nwCell,neCell,swCell,seCell,firstRow,lastRow,firstCol,lastCol,band1Vert,band2Vert,band1Horz,band2Horz'.split(',').reverse()
	}
	
	_getPropertiesConverter(category){
		if(this[category])
			return this[category]
		
		var selector=this.getTableSelector()+'>'+(gRow.test(this.target) ? '.'+this.getPrioritizedSelector()+'>td' : 'tr>.'+this.getPrioritizedSelector())	
		switch(category){
		case 'table':
			return this[category]=new this.constructor.Properties(this.doc.createStyle(this.getTableSelector().replace(/\>\s*tbody$/i,'')), this)
		case 'inline'://0012
			return this[category]=new Inline.Properties(this.doc.createStyle(selector+' span'))
		case 'paragraph'://0012
			return this[category]=new Paragraph.Properties(this.doc.createStyle(selector+' p'))
		case 'cell'://0011
			return this[category]=new this.constructor.CellProperties(this.doc.createStyle(selector),this)
		}
	}
	
	getTableSelector(){
		return '.'+Style.asCssID(this.wordModel.id)+'>tbody'
	}
	
	getPrioritizedSelector(){
		var selector=this.target
		for(var level=this.PrioritiziedStyles.indexOf(this.target),i=0;i<level;i++)
			selector=selector+'[x'+i+']';
		return selector
	}
}
	
Table.Properties=class Properties extends Style.Properties{
	constructor(style, parent){
		super(...arguments)
		this.parent=parent
		this.doc=parent.doc
		this.tableSelector=parent.getTableSelector()
	}
	tblBorders(x){
		x.left && (this.doc.createStyle(this.tableSelector+'>tr>td:first-child').borderLeft=this._border(x.left)) //0012
		x.right && (this.doc.createStyle(this.tableSelector+'>tr>td:last-child').borderRight=this._border(x.right))//0012
		x.top && (this.doc.createStyle(this.tableSelector+'>tr:first-of-type>td').borderTop=this._border(x.top))//0012
		x.bottom && (this.doc.createStyle(this.tableSelector+'>tr:last-of-type>td').borderBottom=this._border(x.bottom))//0012
		
		if(x.insideV){
			var css=this._border(x.insideV)
			var style=this.doc.createStyle(this.tableSelector+'>tr>td:not(:first-child):not(:last-child)')//0022
			style.borderRight=style.borderLeft=css
			this.doc.createStyle(this.tableSelector+'>tr>td:last-child').borderLeft=css//0012
			this.doc.createStyle(this.tableSelector+'>tr>td:first-child').borderRight=css//0012
		}
		
		if(x.insideH){
			var css=this._border(x.insideH)
			var style=this.doc.createStyle(this.tableSelector+'>tr:not(:first-of-type):not(:last-of-type)>td')//0022
			style.borderTop=style.borderBottom=css
			this.doc.createStyle(this.tableSelector+'>tr:last-of-type>td').borderTop=css//0012
			this.doc.createStyle(this.tableSelector+'>tr:first-of-type>td').borderBottom=css//0012
		}
	}
	tblCellMar(x){
		for(var i in x)
			this.doc.createStyle(this.tableSelector+'>tr>td')['padding'+this.upperFirst(i)]=(x[i]<1 && x[i]>0 ? 1 : x[i])+'pt'//0002
	}
	tblInd(x){
		x && (this.style.marginLeft=x+'pt')
	}
	tblW(x){
		x && x!='auto' && (this.style.width=x)
	}
}
		

Table.RowProperties=class RowProperties extends Style.Properties{
	constructor(style,parent){
		super(...arguments)
		this.parent=parent
		this.doc=parent.doc
	}
}

Table.CellProperties=class CellProperties extends Style.Properties{
	constructor(style,parent){
		super(...arguments)
		this.parent=parent
		this.doc=parent.doc
	}
	tcBorders(x){
		var tableSelector=this.parent.getTableSelector(), selector=this.parent.getPrioritizedSelector()
		switch(this.parent.target){
			case 'firstRow':
			case 'lastRow':
			case 'band1Horz':
			case 'band2Horz':
				var style;
				x.left && (this.doc.createStyle(tableSelector+'>.'+selector+'>td:first-child').borderLeft=this._border(x.left));//0021
				x.right && (this.doc.createStyle(tableSelector+'>.'+selector+'>td:last-child').borderRight=this._border(x.right));//0021
				x.top && (this.doc.createStyle(tableSelector+'>.'+selector+'>td').borderTop=this._border(x.top));//0011
				x.bottom && (this.doc.createStyle(tableSelector+'>.'+selector+'>td').borderBottom=this._border(x.bottom));////0011
				x.insideV && ((style=this.doc.createStyle(tableSelector+'>.'+selector+'>td:not(:first-child):not(:last-child)')).borderRight=style.borderLeft=this._border(x.insideV));//0031
				break
			case 'firstCol':
			case 'lastCol':
			case 'band2Vert':
			case 'band1Vert':
				x.top && (this.doc.createStyle(tableSelector+'>tr:first-of-type>.'+selector).borderTop=this._border(x.top));//0021
				x.left && (this.doc.createStyle(tableSelector+'>tr:first-of-type>.'+selector).borderLeft=this._border(x.left));//0021
				x.right && (this.doc.createStyle(tableSelector+'>tr:first-of-type>.'+selector).borderRight=this._border(x.right));//0021
				
				x.bottom && (this.doc.createStyle(tableSelector+'>tr:last-of-type>.'+selector).borderBottom=this._border(x.bottom));//0021
				x.left && (this.doc.createStyle(tableSelector+'>tr:last-of-type>.'+selector).borderLeft=this._border(x.left));//0021
				x.right && (this.doc.createStyle(tableSelector+'>tr:last-of-type>.'+selector).borderRight=this._border(x.right));//0021
				
				
				x.left && (this.doc.createStyle(tableSelector+'>tr:not(:first-of-type):not(:last-of-type)>.'+selector).borderLeft=this._border(x.left));//0031
				x.right && (this.doc.createStyle(tableSelector+'>tr:not(:first-of-type):not(:last-of-type)>.'+selector).borderRight=this._border(x.right));//0031
				break
			default:
				x.left && (this.doc.createStyle(tableSelector+'>tr>.'+selector).borderLeft=this._border(x.left))//0011
				x.right && (this.doc.createStyle(tableSelector+'>tr>.'+selector).borderRight=this._border(x.right))//0011
				x.top && (this.doc.createStyle(tableSelector+'>tr>.'+selector).borderTop=this._border(x.top))//0011
				x.bottom && (this.doc.createStyle(tableSelector+'>tr>.'+selector).borderBottom=this._border(x.bottom))//0011
		}
	}
	shd(x){
		this.style.backgroundColor=x
	}
	gridSpan(x){
		this.parent.content.setAttribute('colspan',x)
	}
}
		
Table.TableStyles='firstRow,lastRow,firstCol,lastCol,band1Vert,band2Vert,band1Horz,band2Horz,neCell,nwCell,seCell,swCell'.split(',')