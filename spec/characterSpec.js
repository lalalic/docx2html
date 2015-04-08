describe("character features",function(){
	var Docx2Html=require('../main')
	it("has parser and converters", function(){
		expect(Docx2Html.parser).toBeDefined()
		expect(Doc22Html.converters).toBeDefined()
	})
})