var newDocx=require("docx4js/spec/newDocx")
var docx2html=require("../lib")

describe("docx2html",()=>{
	describe("basic model converting", ()=>{
		it("document, and section", (done)=>{
			docx2html(newDocx())
			.then(html=>{
				expect(html.tag).toBe("html")
				expect(!!html.content).toBe(true)
				expect(html.content.querySelectorAll('section').length).toBe(1)
				done()
			}).catch(e=>{fail(e);done()})
		})

		it("paragraph,span,text", done=>{
			docx2html(newDocx()).then(html=>{
				expect(html.content.querySelectorAll('p,span').length).toBe(2)
				done()
			}).catch(e=>{fail(e);done()})
		})

		describe("table",()=>{
			it("1 cell", done=>{
				docx2html(newDocx("<w:tbl><w:tr><w:tc><w:p><w:r><w:t>hello</w:t></w:r></w:p></w:tc></w:tr></w:tbl>")).catch(e=>{fail(e);done()})
				.then(html=>{
					expect(html.content.querySelector('table').textContent).toMatch(/hello/)
					expect(html.content.querySelector('tr').textContent).toMatch(/hello/)
					expect(html.content.querySelector('td').textContent).toMatch(/hello/)
					expect(html.content.querySelector('p').textContent).toMatch(/hello/)
					expect(html.content.querySelector('span').textContent).toMatch(/hello/)
					done()
				})
			})

			it("4 cell 2 row", done=>{
				docx2html(newDocx(`<w:tbl>
					<w:tr>
						<w:tc>
							<w:p><w:r><w:t>hello</w:t></w:r></w:p>
						</w:tc>
						<w:tc>
							<w:p><w:r><w:t>hello</w:t></w:r></w:p>
						</w:tc>
					</w:tr>
					<w:tr>
						<w:tc>
							<w:p><w:r><w:t>hello</w:t></w:r></w:p>
						</w:tc>
						<w:tc>
							<w:p><w:r><w:t>hello</w:t></w:r></w:p>
						</w:tc>
					</w:tr>
					</w:tbl>`)).catch(e=>{fail(e);done()})
				.then(html=>{
					expect(html.content.querySelectorAll('tr').length).toBe(2)
					expect(html.content.querySelectorAll('td').length).toBe(4)
					done()
				})
			})
		})

		describe("list", ()=>{

		})


		it("br")

		it("hyperlink")

		it("tab")

		it("symbol")

		it("softHyphen")

		it("noBreakHyphen")

		it("range")

		it("equation")

		it("heading")

		it("headingInline")

		describe("shapes", function(){
			it("image")

			it("line")

			it("rect")

			it("chart")

			it("diagram")

			describe("group", function(){

			})
		})
	})
})
