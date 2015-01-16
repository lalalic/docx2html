var Docx4JS=require("docx4js"),
	Converters=require("./converter/docx/html/factory"),
	factory=Docx4JS.createVisitorFactory(Converters);
	
function docx2html(file){
	return Docx4JS.load(file)
	.then(function(docx){
		return docx.parse(factory)
	})
}

docx2html.parser=Docx4JS
docx2html.converters=Converters

module.exports=docx2html