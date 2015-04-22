var Docx4JS=require("docx4js"),
	Converters=require("./converter/docx/html/factory"),
	defaultFactory=Docx4JS.createVisitorFactory(Converters);
	
function docx2html(file, opt){
	return Docx4JS.load(file)
	.then(function(docx){
		return docx.parse(opt ? Docx4JS.createVisitorFactory(Converters,opt) : defaultFactory)
	})
}

docx2html.parser=Docx4JS
docx2html.converters=Converters

module.exports=docx2html