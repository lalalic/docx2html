import Drawing from './drawing'	

export default class Graphic extends Drawing{
	get tag(){return 'span'}
}

class Properties extends Drawing.Properties{
	solidFill(x){
		this.style.backgroundColor=x
	}
	gradFill(x){
		
	}
	noFill(x){
		this.style.background='transparent'
	}
	fillRef(x){
		switch(typeof(x)){
		case 'string':
			return this.solidFill(x)
		case 'object':
			return this.gradFill(x)
		case 'number':
			return this.noFill(x)
		}
	}
	ln(x){
		x.color && (this.style.borderColor=x.color);
		x.width && (this.style.borderWidth=x.width+'pt', this.style.borderStyle='solid');
		x.dash && (this.style.borderStyle=this.lineStyle(x.dash));
		x.cap==='rnd' && (this.style.borderRadius=x.width*2+'pt')
	}
	xfrm(x){
		this.style.width=x.width+'pt'
		this.style.height=x.height+'pt'
		x.x && (this.style.left=x.x+'pt')
		x.y && (this.style.top=x.y+'pt')
	}
}

Graphic.Properties=Properties