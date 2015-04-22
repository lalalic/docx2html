define(['./converter','./style/table'], function(Super, Style){
	return Super.extend({
		wordType:'row',
		tag:'tr',
		convertStyle: function(el){
			Super.prototype.convertStyle.apply(this,arguments)
			var style=this.wordModel.getDirectStyle()
			style && style.parse([new this.constructor.Properties(el.style, this)])
		}
	},{
		Properties: Style.RowProperties.extend({
			cnfStyle: function(x){
				var names=[], PrioritiziedStyles=Style.prototype.PrioritiziedStyles, level=-1, t
				for(var i=0;i<12;i++){
					if(x.charAt(i)=='1'){
						names.push(t=Style.TableStyles[i])
						if((t=PrioritiziedStyles.indexOf(t))>level)
							level=t
					}
				}
				names.length && Super.addClass(this.parent.content,names.join(' '));
				for(var i=0;i<level;i++)
					this.parent.content.setAttribute('x'+i,1)
			}
		})
	})
})