define(['./converter','./inline','./numbering'], function(Style, Inline, Numbering){
	return Style.extend({
		wordType:'style.paragraph',
		_getPropertiesConverter: function(category){
			if(this[category])
				return this[category]
			switch(category){
			case 'inline':
				this.inlineStyle=this.doc.createStyle('.'+Style.asCssID(this.wordModel.id)+' span')
				return this[category]=new Inline.Properties(this.inlineStyle)
			case 'paragraph':
				this.paragraphStyle=this.doc.createStyle('.'+Style.asCssID(this.wordModel.id))
				return this[category]=new this.constructor.Properties(this.paragraphStyle)
			case 'frame':
				this._getPropertiesConverter('paragraph')
				return this[category]=new this.constructor.FrameProperties(this.paragraphStyle)
			case 'numbering':
				this._getPropertiesConverter('paragraph')
				return this[category]=new Numbering.Properties(this.paragraphStyle)
			}
		}
	},{
		Properties: Style.Properties.extend({
			jc: function(x){
				this.style.textAlign=x
			},
			ind: function(x){
				x.left && (this.style.marginLeft=x.left+'pt')
				x.right && (this.style.marginRight=x.right+'pt')
				x.firstLine && (this.style.textIndent=x.firstLine+'pt')
				x.hanging && (this.style.textIndent='-'+x.hanging+'pt')
			},
			spacing: function(x){
				x.bottom && (this.style.marginBottom=x.bottom+'pt')
				x.top && (this.style.marginTop=x.top+'pt')
				
				x.lineHeight && (this.style.lineHeight=x.lineHeight)
			}
		}),
		FrameProperties: Style.Properties.extend({
		
		})
	})
})