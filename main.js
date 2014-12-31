var converter=require("./converter/docx/html/factory")
var Docx4JS=require("docx4js")
module.exports=function(file){
	Dox4JS.load(file)
	.then(function(docx){
		docx.parse(converter)
	})
}