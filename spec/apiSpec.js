var docx2html=require("../lib")

describe("docx2html",()=>{
	it("docx2html",()=>{
		expect(!!docx2html).toBe(true)
	})

	it("parser",()=>{
		expect(!!docx2html.parser).toBe(true)
	})

	it("converters",()=>{
		expect(!!docx2html.converters).toBe(true)
	})
})
