define(['./converter'], function(Style){
	return Style.extend(function(){
		Style.apply(this,arguments)
		this.style=this.wordModel.id ? this.doc.createStyle('.'+Style.asCssID(this.wordModel.id)) : this.doc.createStyle('span')
		this.inline=new this.constructor.Properties(this.style)
	},{
		wordType:'style.inline',
		_getPropertiesConverter: function(){
			return this.inline
		}
	},{
		Properties:Style.Properties.extend({
			rFonts:function(x){
				x.ascii && (this.style.fontFamily=x.ascii)
			},
			b:function(x){
				this.style.fontWeight=700
			},
			sz: function(x){
				this.style.fontSize=x+'pt'
			},
			color: function(x){
				this.style.color=x
			},
			i:function(x){
				this.style.fontStyle='italics'
			},
			u: function(x){
				this.style.textDecoration='underline'
			},
			bdr: function(x){
				this.style.border=this._border(x)
			},
			lang: function(x){
				
			},
			vertAlign: function(x){
				switch(x){
				case 'superscript':
					this.style.verticalAlign='super'
				break
				case 'subscript':
					this.style.verticalAlign='sub'
				break
				}
			},
			highlight: function(x){
				this.style.backgroundColor=x
			}
		})
	})
})