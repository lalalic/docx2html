**docx2html** is a javascript converter from docx to html on **nodejs** and **browser**.

It is based on [docx4js](/docx4js) to parse docx, and utilize docx4js api to traverse docx models and convert docx models to html elements.

Ideally, each docx model should have a specific converter to create accordingly html elements, so the design is simply to map from type of docx model to html element constructor.

While, the difficulty is that some docx models are difficult to be expressed in html. It's luckly that we have CSS3 that make some rich styles possible in html, such as numbering, all(12) kinds of table styles.

Word shape utilizes SVG to draw lines, rects, and etc, but so far it only supports limited shapes, while the left job is time.

P of html, according to HTML specification, is restricted not to include any block container, such as div, so there's no p tag, but all div with paragraph styles, and then do some arrangement when dom is ready with a small javascript code.  

It keeps header and footer for every section, but there's no conditional consideration, such as odd and even header/footer.

Word Field is kept, while so far only link is supported.

##Feature
**environment**

* nodejs
* browser
	* IE9+
	* firefox
	* chrome

**model**

* section
* header
* footer
* paragraph
* link
* numbering
	* many
* shape
	* rect
	* circle
	* round rect
* table
* textbox
* inline content
* heading
	* h1 ~ h6
* Field
	* hyperlink
* img

**style**

* document default
* named style
* section style
	* page layout
	* columns
	* column style
* paragraph style
* inline style
* style inheriance
* table style
	* all(12) word built in styles
	* styles on first/last/even/odd row/column
	* styles on 4 cornor cells
* numbering style
* bullet style
* shape
	* rotate
	* text direction
	* positioning
	 	* vertical
		 	* page/margin - top/bottom/absolute
	 	* horizontal
			* page
				* left/right/center/inside/outside/absolute
			* margin/leftMargin/RightMargin/inMargin/outMargin/column
				* left/right/center/absolute

##ToDo
* more shapes
* word art
* chart

##API
require('docx2html') directly return the function, docx2html

###docx2html(file, option) : return Promise
**option** will pass to every converter, supports:

* container: only for browser, the container of converted content, default body
* asImageURL: function(image buffer), return image url.

Result of returned promise with following interface, toString support nodejs and browser, and all others are only for browser.

* toString(option), option supports following
 * template: function(style, html, props){ /**/}, if it's set, toString returns this function's return. otherwise, the return is a html file content.

 * extendScript: such as "http://a.com/a.js". valid only when template is not set. the extended script will be inserted right before </html>
* asZip(option) : option is same with that of toString
* download(option) : option is same with that of toString
* save(option): return Promise resolved by option.saveHtml's return value, option supports following
	* template : function(style, html, props), same with option of toString,
	* extendScript: same with option of toString,
	* saveImage: function(arrayBuffer, doc.props): promise(url) {},
	* saveHtml: function(html, doc.props){}

**nodejs**

	var docx2html=require('docx2html')
	docx2html("c:/temp/test.docx").then(function(html){
		html.toString()
	})

**browser**

	var docx2html=require('docx2html')
	docx2html(fileInput.files[0],{container:document.getElementById('a')}).then(function(html){
		html.toString()
	})
