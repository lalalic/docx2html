define(['./converter', 
	'./document','./section','./p','./list','./span','./a','./bookmark','./text','./h',
	'./table','./tr','./td','./header','./footer','./fieldBegin','./fieldEnd',
	'./drawingAnchor','./shape','./img','./textbox',
	'./style/document','./style/paragraph','./style/inline','./style/numbering','./style/table','./style/list'],function(Any){
	var converters={'*': Any}
	for(var i=0,model; i<arguments.length; i++){
		model=arguments[i]
		model.prototype.wordType && (converters[model.prototype.wordType]=model)
	}
	
	return converters
})