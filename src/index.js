import docx4js from "docx4js"
import converters from "./docx/html/factory"

export default function docx2html(file, opt){
	return docx4js.load(file)
		.then(docx=>docx.parse(docx4js.createVisitorFactory(converters,opt)))
}

docx2html.parser=docx4js
docx2html.converters=converters
