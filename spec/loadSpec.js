describe("character features",function(){
	var docx2Html,
		testDir=__dirname+"/../node_modules/docx4js/test/";
	
	function error(e){
		expect(e).toBeUndefined()
	}
	
	it("able to load from node", function(){
		try{
			docx2Html=require('../main')
			expect(docx2Html.parser).toBeDefined()
			expect(docx2Html.converters).toBeDefined()
		}catch(e){
			error(e)
		}
	})
	
	it("convert simple docx", function(done){
		docx2Html(testDir+"fs.docx")
			.then(function(doc){
				expect(doc).toBeDefined()
				console.log(doc.toString())
				done()
			},error)
	})
})