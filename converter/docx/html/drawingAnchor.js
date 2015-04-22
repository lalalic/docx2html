define(['./drawing'], function(Super){
	var unit=/[a-zA-Z]+$/g
	function asNum(a){
		return parseFloat(a.replace(unit,''))
	}
	var PositionH={
		page:function(x){
			var style=this.style, t;
			switch(x.align){
			case 'left':
				if((t=asNum(this.style.width)-asNum(this.doc.section.style.paddingLeft))>=0)
					style.left=0
				else
					style.left=-t+'pt'
				break
			case 'center':
				style.left=(asNum(this.doc.section.style.width)-asNum(this.style.width))/2+'pt'
				break
			case 'right': 
				if((t=asNum(this.style.width)-asNum(this.doc.section.style.paddingRight))>=0)
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
		margin: function(x){
			var sect=this.doc.section.style
			switch(x.align){
			case 'inside': 
			case 'left':
				this.style.left=sect.paddingLeft
				break
			case 'center':
				this.style.left=(asNum(sect.width)-asNum(sect.paddingRight)+asNum(sect.paddingLeft)-asNum(this.style.width))/2+'pt'
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
		column: function(x){
			return PositionH['margin'].call(this,x)
		},
		character: function(x){
			return PositionH['margin'].call(this,x)
		},
		leftMargin:function(x){
			switch(x.align){
			case 'left': 
				this.style.left=0
				break
			case 'center': 
				this.style.left=(asNum(this.doc.section.style.paddingLeft)-asNum(this.style.width))/2+'pt'
				break
			case 'right':
				this.style.left=asNum(this.doc.section.style.paddingLeft)-asNum(this.style.width)+'pt'
				break
			default:
				this.style.left=x.posOffset+'pt'	
				break	
			}
		},
		rightMargin:function(x){
			var sect=this.doc.section.style
			switch(x.align){
			case 'left': 
				this.style.right=asNum(sect.paddingRight)-asNum(this.style.width)+'pt'
				break
			case 'center': 
				this.style.right=(asNum(sect.paddingRight)-asNum(this.style.width))/2+'pt'
				break
			case 'right':
				this.style.right=0
				break
			default:
				this.style.left=asNum(sect.width)-asNum(sect.paddingRight)+x.posOffset+'pt'
				break	
			}
		},
		insideMargin:function(x){
			return PositionH['leftMargin'].call(this,x)
		},
		outsideMargin:function(x){
			return PositionH['rightMargin'].call(this,x)
		}
	},
	PositionV={
		margin: function(x){
			var style=this.style,sect=this.doc.section.style
			switch(x.align){
			case 'top':
				style.top=sect.paddingTop
			break
			case 'center':
				style.top=(asNum(sect.minHeight)-asNum(sect.paddingBottom)+asNum(sect.paddingTop)-asNum(style.height))/2+'pt'
			break
			case 'bottom':
				style.bottom=sect.paddingBottom
			break
			case 'outside':
			break
			case 'inside':
			break
			default:
				style.top=asNum(sect.paddingTop)+x.posOffset+'pt'
			break
			}
		},
		page: function(x){
			var style=this.style, sect=this.doc.section.style;
			switch(x.align){
			case 'top':
				style.top=0
				break
			case 'bottom':
				style.bottom=0
				break
			case 'center':
				style.top=(asNum(sect.minHeight)-asNum(style.width))/2+'pt'
				break
			case 'outside':
				break
			case 'inside':
			break
			default:
				style.top=x.posOffset+'pt'
			break
			}
		},
		line: function(x){
			switch(x.align){
			case 'top':
			break
			case 'center':
			break
			case 'bottom':
			break
			case 'outside':
			break
			case 'inside':
			break
			default:
			break
			}
		},
		topMargin: function(x){
			switch(x.align){
			case 'top':
			break
			case 'center':
			break
			case 'bottom':
			break
			case 'outside':
			break
			case 'inside':
			break
			default:
			break
			}
		},
		bottomMargin: function(x){
			switch(x.align){
			case 'top':
			break
			case 'center':
			break
			case 'bottom':
			break
			case 'outside':
			break
			case 'inside':
			break
			default:
			break
			}
		},
		insideMargin: function(x){
			switch(x.align){
			case 'top':
			break
			case 'center':
			break
			case 'bottom':
			break
			case 'outside':
			break
			case 'inside':
			break
			default:
			break
			}
		},
		outsideMargin: function(x){
			switch(x.align){
			case 'top':
			break
			case 'center':
			break
			case 'bottom':
			break
			case 'outside':
			break
			case 'inside':
			break
			default:
			break
			}
		},
		paragraph: function(x){//only offset
			
		}
	};
	
	return Super.extend({
		wordType:'drawing.anchor',
		tag:'div',
		convertStyle: function(el){
			el.style.display='inline-block'
			Super.prototype.convertStyle.apply(this,arguments)
		}
	},{//only support absolute page offset
		Properties: Super.Properties.extend({
			getParagraphPaddingLeft: function(){
				return '0pt'
			},
			positionH: function(x){
				PositionH[x.relativeFrom].call(this,x)
			},
			positionV: function(x){
				PositionV[x.relativeFrom].call(this,x)
			},
			wrap: function(x){
				switch(x){
				case 'tight':
				case 'through':
				case 'square':
					this.style.float='left'
					break
				case 'topAndBottom':
					this.style.clear='both'
					break
				default:
					this.style.position='absolute'
					//avoid empty paragraph
					//this.parent.content.parentNode.appendChild(this.doc.createTextNode("\u00a0"))
				}
			},
			behindDoc: function(x){
				this.style.zIndex=-1
			}
		})
	})
})