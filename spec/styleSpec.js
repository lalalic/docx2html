"use strict"

var newDocx=require("docx4js/spec/newDocx")
var docx2html=require("../lib")

function asPt(x){
	return `${parseInt(x)/20.0}pt`
}

function failx(done){
	return e=>{fail(e);done()}
}

describe("docx2html style", ()=>{
	let wA="<w:p><w:r><w:t>hello</w:t></w:r></w:p>"
	describe("document", ()=>{
		it("background").pend("newDocx doesn't support to put <w:background> out of w:body")
	})

	describe("section", ()=>{//ever hacked for jsdom-nogyp, but removed the code for latest jsdom
		let TargetStyle=require("../lib/docx/html/style/section")

		it("width, height, margin", done=>{
			spyOn(TargetStyle.prototype, "size").and.callThrough()
			spyOn(TargetStyle.prototype, "margin").and.callThrough()
			docx2html(newDocx()).catch(e=>{fail(e);done()})
			.then(html=>{
				expect(TargetStyle.prototype.size).toHaveBeenCalled()
				expect(TargetStyle.prototype.margin).toHaveBeenCalled()
				var style=html.content.querySelector('section').style
				expect(style.width).toBe(asPt(12240))
				expect(style.minHeight).toBe(asPt(15840))
				done()
			})
		})

		it("columns",done=>{
			spyOn(TargetStyle.prototype, "cols").and.callThrough()
			docx2html(newDocx(`${wA}
				<w:p>
					<w:pPr>
						<w:sectPr>
							<w:pgSz w:w="12240" w:h="15840"/>
							<w:pgMar w:top="1440" w:right="1800" w:bottom="1440" w:left="1800" w:header="708" w:footer="708" w:gutter="0"/>
							<w:cols w:num="2" w:space="708"/>
							<w:docGrid w:linePitch="360"/>
						</w:sectPr>
					</w:pPr>
				</w:p>${wA}`))
			.then(html=>{
				expect(TargetStyle.prototype.cols).toHaveBeenCalled()
				let style=html.content.querySelector('section').style
				expect(style['column-count']).toBe(2)
				done()
			}).catch(e=>{fail(e);done()})
		})
	})


	describe("structure", ()=>{
		describe("defalt", ()=>{
			it("document", done=>{
				let TargetStyle=require("../lib/docx/html/style/document")
				spyOn(TargetStyle.prototype,"convert").and.callThrough()

				docx2html(newDocx())
				.then(html=>{
					expect(TargetStyle.prototype.convert).toHaveBeenCalled()
					done()
				}).catch(failx(done))
			})

			it("paragraph", done=>{
				let TargetStyle=require("../lib/docx/html/style/paragraph")
				spyOn(TargetStyle.prototype,"convert").and.callThrough()

				docx2html(newDocx())
				.then(html=>{
					expect(TargetStyle.prototype.convert).toHaveBeenCalled()
					done()
				}).catch(failx(done))
			})

			it("character", done=>{
				let TargetStyle=require("../lib/docx/html/style/inline")
				spyOn(TargetStyle.prototype,"convert").and.callThrough()

				docx2html(newDocx({"word/styles.xml":`
					<w:style w:type="character" w:default="1" w:styleId="DefaultParagraphFont">
						<w:name w:val="Default Paragraph Font"/>
						<w:uiPriority w:val="1"/>
						<w:semiHidden/>
						<w:unhideWhenUsed/>
					</w:style>`}))
				.then(html=>{
					expect(TargetStyle.prototype.convert).toHaveBeenCalled()
					done()
				}).catch(failx(done))
			})

			it("table", done=>{
				let TargetStyle=require("../lib/docx/html/style/table")
				spyOn(TargetStyle.prototype,"convert").and.callThrough()

				docx2html(newDocx({"word/styles.xml":`
						<w:style w:type="table" w:default="1" w:styleId="TableNormal">
							<w:name w:val="Normal Table"/>
							<w:uiPriority w:val="99"/>
							<w:semiHidden/>
							<w:unhideWhenUsed/>
							<w:tblPr>
								<w:tblInd w:w="0" w:type="dxa"/>
								<w:tblCellMar>
									<w:top w:w="0" w:type="dxa"/>
									<w:left w:w="108" w:type="dxa"/>
									<w:bottom w:w="0" w:type="dxa"/>
									<w:right w:w="108" w:type="dxa"/>
								</w:tblCellMar>
							</w:tblPr>
						</w:style>`}))
				.then(html=>{
					expect(TargetStyle.prototype.convert).toHaveBeenCalled()
					done()
				}).catch(failx(done))
			})

			xit("list", done=>{
				let TargetStyle=require("../lib/docx/html/style/list")
				spyOn(TargetStyle.prototype,"convert").and.callThrough()

				docx2html(newDocx({"word/styles.xml":`
						<w:style w:type="numbering" w:default="1" w:styleId="NoList">
							<w:name w:val="No List"/>
							<w:uiPriority w:val="99"/>
							<w:semiHidden/>
							<w:unhideWhenUsed/>
						</w:style>`}))
				.then(html=>{
					expect(TargetStyle.prototype.convert).toHaveBeenCalled()
					done()
				}).catch(failx(done))
			})
		})

		describe("named style", ()=>{
			it("paragraph")

			it("character")

			it("table")

			it("list")
		})

		describe("inherit", ()=>{
			it("paragraph")

			it("character")

			it("table")

			it("list")
		})


		describe("direct style",()=>{
			it("paragraph", done=>{
				let TargetStyle=require("../lib/docx/html/style/paragraph").Properties
				spyOn(TargetStyle.prototype,"convert").and.callThrough()
				spyOn(TargetStyle.prototype,"jc").and.callThrough()
				docx2html(newDocx(`
					<w:p>
						<w:pPr>
							<w:jc w:val="center"/>
						</w:pPr><w:r><w:t>hello</w:t></w:r></w:p>`))
				.then(html=>{
					expect(TargetStyle.prototype.convert).toHaveBeenCalled()
					expect(TargetStyle.prototype.jc).toHaveBeenCalled()
					done()
				}).catch(failx(done))
			})

			it("character", done=>{
				let TargetStyle=require("../lib/docx/html/style/inline").Properties
				spyOn(TargetStyle.prototype,"convert").and.callThrough()
				spyOn(TargetStyle.prototype,"b").and.callThrough()
				docx2html(newDocx(`<w:p><w:r><w:rPr><w:b/></w:rPr><w:t>hello</w:t></w:r></w:p>`))
				.then(html=>{
					expect(TargetStyle.prototype.convert).toHaveBeenCalled()
					expect(TargetStyle.prototype.b).toHaveBeenCalled()
					done()
				}).catch(failx(done))
			})

			it("table", done=>{
				let TargetStyle=require("../lib/docx/html/style/table").Properties
				spyOn(TargetStyle.prototype,"convert").and.callThrough()
				spyOn(TargetStyle.prototype,"tblW").and.callThrough()
				docx2html(newDocx(`
					<w:tbl>
						<w:tblPr>
							<w:tblStyle w:val="TableGrid"/>
							<w:tblW w:w="0" w:type="auto"/>
							<w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/>
						</w:tblPr>
						<w:tblGrid>
							<w:gridCol w:w="1394"/>
							<w:gridCol w:w="1394"/>
							<w:gridCol w:w="1394"/>
						</w:tblGrid>
						<w:tr w:rsidR="00876FC6" w:rsidTr="00876FC6">
							<w:trPr>
								<w:trHeight w:hRule="exact" w:val="227"/>
							</w:trPr>
							<w:tc>
								<w:tcPr>
									<w:tcW w:w="1394" w:type="dxa"/>
								</w:tcPr>
								<w:p w:rsidR="00876FC6" w:rsidRDefault="00876FC6"/>
							</w:tc>
							<w:tc>
								<w:tcPr>
									<w:tcW w:w="1394" w:type="dxa"/>
								</w:tcPr>
								<w:p w:rsidR="00876FC6" w:rsidRDefault="00876FC6"/>
							</w:tc>
							<w:tc>
								<w:tcPr>
									<w:tcW w:w="1394" w:type="dxa"/>
								</w:tcPr>
								<w:p w:rsidR="00876FC6" w:rsidRDefault="00876FC6"/>
							</w:tc>
						</w:tr>
					</w:tbl>`))
				.then(html=>{
					expect(TargetStyle.prototype.convert).toHaveBeenCalled()
					expect(TargetStyle.prototype.tblW).toHaveBeenCalled()
					done()
				}).catch(failx(done))
			})

			it("list")
		})

		describe("mixed named and direct style",()=>{
			it("paragraph")

			it("character")

			it("table")

			it("list")
		})
	})

	describe("table", ()=>{

	})

	describe("shape", ()=>{

	})
})
