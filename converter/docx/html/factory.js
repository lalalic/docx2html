define(['./converter', 
	'./document','./section','./p','./list','./span','./a','./bookmark','./text','./h',
	'./table','./tr','./td','./header','./footer','./fieldBegin','./fieldEnd',
	'./drawingAnchor','./shape','./img','./textbox',
	'./style/document','./style/paragraph','./style/inline','./style/numbering','./style/table','./style/list'],function(Any){
	var CONVERTERS={}, t;
	for(var i=0,model; i<arguments.length; i++){
		model=arguments[i]
		model.prototype.wordType && (CONVERTERS[model.prototype.wordType]=model)
	}
	
	function factory(wModel, doc, parent){
		var converter, Type=CONVERTERS[wModel.type], t
		if(!wModel.type)
			;
		else if(Type)
			converter=new Type(wModel, doc, parent)
		else if((t=wModel.type.split('.')).length>1){
			do{
				t.pop()
				if((Type=CONVERTERS[t.join('.')])){
					converter=new Type(wModel, doc, parent)
					break
				}
			}while(t.length>1)
		}
		
		if(!converter)
			converter=new Any(wModel, doc, parent);
			
		if(!converter._shouldIgnore())
			return converter
	}
	
	factory.with=function(parent){
		function paramizedFactory(wModel){
			return factory(wModel, parent.doc, parent)
		}
		paramizedFactory.with=factory.with
		return paramizedFactory
	}
	
	return factory
})