var Docx4JS=require("docx4js"),
	Converters=require("./converter/docx/html/factory"),
	factory=Docx4JS.createVisitorFactory(Converters);
module.exports=function(file){
	return Docx4JS.load(file)
	.then(function(docx){
		return docx.parse(factory)
	})
};