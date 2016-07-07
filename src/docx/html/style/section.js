import Style from './converter'

export default class Section extends Style.Properties{
	size(x){
		this.style.width=x.width+'px'
		this.style.minHeight=x.height+'px'
	}
	margin(x){
		this.style.paddingLeft=x.left+'px'
		this.style.paddingRight=x.right+'px'
		this.style.paddingTop=x.top+'px'
		this.style.paddingBottom=x.bottom+'px'
		
		x.gutter && (this.style['padding'+(x.gutterAtRight ? 'Right' : 'Left')]=x[(x.gutterAtRight ? 'right' : 'left')]+x.gutter+'px')
	}
	cols(x){
		this.styless('column-count',x.num)
		x.space && this.styless('column-gap',x.space+'px');
		x.sep && this.styless('column-rule','1px solid black');
	}
}