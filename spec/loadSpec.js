describe("character features",function(){
	var docx2Html,
		fs=require('fs'),
		jsdom=require('jsdom-nogyp').jsdom,
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
	
	function should(docx, expects){
		//if(docx=='word/models.docx')
		it(docx, function(done){
			docx2Html(testDir+docx, {asImageURL:function(buffer){
					var path=__dirname+"/images/"
					path+=(typeof(buffer.crc32)=='undefined' ? require('jszip/lib/crc32')(buffer) : buffer.crc32)
					switch(typeof(buffer)){
					case 'string':
						path+='.svg';
						break
					default:
						path+='.jpg';
					}
					fs.writeFile(path, buffer)
					return path.replace(/\\/g,'/')
				}}).then(function(doc){
					console.log(docx)
					expect(doc).toBeDefined()
					var html=doc.toString()
					fs.writeFile(testDir+docx+".html",html)
					var converted=jsdom(html)
					expect(converted.documentElement.tagName).toBe('HTML')
					
					//must have container
					var container=converted.querySelector('#A')
					expect(container).toBeDefined()
					expect(container.style.width).toBe('100%')
					
					//must have at least 1 section
					var section=converted.querySelector('section')
					expect(section).toBeDefined()
					expect(section.style.width).toBeDefined()
					expect(section.style.minHeight).toBeDefined()
					
					
					expects(converted)
					done()
				},error)
		},1000000)
	}
	
	should("fs.docx",function(doc, done){
		var section=doc.querySelector('section'),
			style=section.style,
			content=section.querySelector('span');
		expect(style.width).toBe('612pt')
		expect(style.minHeight).toBe('792pt')
		
		expect(content.textContent).toMatch("that are designed to coordinate with the overall look of")
	})
	
	should("word/table.docx",function(doc,done){
		var tables=doc.querySelectorAll('table')
		expect(tables.length).toBeGreaterThan(5)
		
		var table=tables[0], 
			cols=cols=table.querySelectorAll('col');
			
		expect(table.getAttribute('x11')).toBe('1')
		for(var len=cols.len,i=0;i<len;i++)
			expect(cols[i].style.width).toBe('12.5%')
	})
	
	should("word/models.docx", function(doc){
		
	})
	
	
	should("word/styles.docx", function(doc){
	
	})
	
	should("word/std.docx", function(doc){
	
	})
	
	should("word/image.docx", function(doc){
	
	})
	
	should("word/header-footer.docx", function(doc){
	
	})
	
	
	should("word/color.docx", function(doc){
	
	})
	
	should("word/columns.docx", function(doc){
	
	})
	
	should("word/shape/textbox.docx", function(doc){
	
	})

	should("word/shape/group.docx", function(doc){
	
	})
	
	should("word/shape/inlineDrawing.docx", function(doc){
	
	})
	
	should("word/shape/positionH.docx", function(doc){
	
	})
	
	should("word/shape/positionV.docx", function(doc){
	
	})
	
	should("word/shape/rotate.docx", function(doc){
	
	})
	
	should("word/shape/wrap.docx", function(doc){
	
	})
	
	should("word/shape/positionV - Paragraph.docx", function(doc){
	
	})
})