define(['./converter','./style/converter'], function(Super, Style){
	return Super.extend({
		convertStyle: function(el){
			Super.prototype.convertStyle.apply(this,arguments)
			var style=this.wordModel.getDirectStyle()
			style && style.parse([new this.constructor.Properties(el.style,this)])
		}
	},{
		Properties: Style.Properties.extend({
			extent: function(x){
				this.style.width=x.width+'pt'
				this.style.height=x.height+'pt'
			},
			distL: function(x){
				x && (this.style.marginLeft=x+'pt')
			},
			distT: function(x){
				x && (this.style.marginTop=x+'pt')
			},
			distB: function(x){
				x && (this.style.marginBottom=x+'pt')
			},
			distR: function(x){
				x && (this.style.marginRight=x+'pt')
			}
		})
	})
})