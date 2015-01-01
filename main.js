var Docx4JS=require("docx4js")
module.exports=function(file){
	return Docx4JS.load(file)
	.then(function(docx){
		docx.parse(require("./converter/docx/html/factory"))
	})
};

global.docx2html=module.exports