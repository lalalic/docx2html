import Style from './converter'

export default class Section extends Style.Properties{
	size(x){
		this.style.width=x.width+'pt'
		this.style.minHeight=x.height+'pt'
	}
	margin(x){
		this.style.paddingLeft=x.left+'pt'
		this.style.paddingRight=x.right+'pt'
		this.style.paddingTop=x.top+'pt'
		this.style.paddingBottom=x.bottom+'pt'
		
		x.gutter && (this.style['padding'+(x.gutterAtRight ? 'Right' : 'Left')]=x[(x.gutterAtRight ? 'right' : 'left')]+x.gutter+'pt')
	}
	cols(x){
		this.styless('column-count',x.num)
		x.space && this.styless('column-gap',x.space+'pt');
		x.sep && this.styless('column-rule','1px solid black');
	}
}