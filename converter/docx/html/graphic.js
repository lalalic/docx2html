define(['./drawing'], function(Super){
	return Super.extend({
		wordType:'drawing.inline'
	},{
		Properties: Super.Properties.extend({
			solidFill: function(x){
				this.style.backgroundColor=x
			},
			gradFill: function(x){
				
			},
			noFill: function(x){
				this.style.background='transparent'
			},
			fillRef: function(x){
				switch(typeof(x)){
				case 'string':
					return this.solidFill(x)
				case 'object':
					return this.gradFill(x)
				case 'number':
					return this.noFill(x)
				}
			},
			ln: function(x){
				x.color && (this.style.borderColor=x.color);
				x.width && (this.style.borderWidth=x.width+'pt', this.style.borderStyle='solid');
				x.dash && (this.style.borderStyle=this.lineStyle(x.dash));
				x.cap==='rnd' && (this.style.borderRadius=x.width*2+'pt')
			}
		})
	})
})