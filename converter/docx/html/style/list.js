define(['./converter','./inline','./paragraph'], function(Style, Inline, Paragraph){
	var ListStyleType={lowerLetter:'lower-latin',upperLetter:'upper-latin',lowerRoman:'lower-roman',upperRoman:'upper-roman'}
	var cssID=Style.asCssID
	return Style.extend(function(){
		Style.apply(this,arguments)
		this.levelStyles={}
	},{
		wordType:'style.numbering.definition',
		_getPropertiesConverter: function(category){
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
	},{
		Pr: Paragraph.Properties.extend(function(style,parent, levelSelector){
			Paragraph.Properties.apply(this,arguments)
			this.doc=parent.doc
			this.levelSelector=levelSelector
		},{
			ind: function(x){
				var hanging=x.hanging
				delete x.hanging
				Paragraph.Properties.prototype.ind.call(this,x)
				x.hanging=hanging
				x.hanging && (this.doc.createStyle(this.levelSelector+'>li>p>.marker').left=-x.hanging+'pt')
			}
		}),
		Properties:Style.Properties.extend(function(style, parent, levelSelector, counter, level){
			Style.Properties.apply(this,arguments)
			this.doc=parent.doc
			this.levelSelector=levelSelector
			this.level=level
			this.counter=counter
			this.doc.createStyle(levelSelector).counterReset=counter
			this.doc.createStyle(levelSelector+'>li').counterIncrement=counter
		},{
			start: function(x){
				this.doc.createStyle(this.levelSelector).counterReset=this.counter+' '+(x-1)
			},
			numFmt: function(x){
				this.type=ListStyleType[x]||x
			},
			lvlText: function(x){
				this.style.content='"'+x.replace('%'+(this.level+1),'" counter('+this.counter+(!this.type ? '' : ','+this.type)+') "')+'"'
			},
			lvlJc: function(x){
				
			},
			lvlPicBulletId: function(x){
				
			}
		})
	})
})