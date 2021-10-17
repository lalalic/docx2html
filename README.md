docx2html
===
**docx2html** is a javascript converter from docx to html on **nodejs** and **browser**.

installation
===
<code>npm install docx2html</code>

example
===
```js
const docx2html=require("docx2html")
docx2html(input.files[0])
/** you can do further with utilities in converted html
	.then(html=>{
		//html.toString()
		//html.asZip/download/save
	})
*/
```

api
===
* docx2html(docx, options), return a promise object, options support
  * container: a HTMLElement to append converted html, default value is document.body
  * asImageURL(data): to convert image data to url, only required for nodejs

* the promise object resolved with an object with following functions
  * content: the converted dom
  * toString(/*options:{template(style,body,props), extendScript:}*/)
  * asZip(options)
  * download(options)
  * save(options)
  * release(): to release image resources



It is based on [docx4js 1.x](/docx4js) to parse docx, and utilize docx4js api to traverse docx models and convert docx models to html elements.

Ideally, each docx model should have a specific converter to create accordingly html elements, so the design is simply to map from type of docx model to html element constructor.

While, the difficulty is that some docx models are difficult to be expressed in html. It's luckly that we have CSS3 that make some rich styles possible in html, such as numbering, all(12) kinds of table styles.

Word shape utilizes SVG to draw lines, rects, and etc, but so far it only supports limited shapes, while the left job is time.

P of html, according to HTML specification, is restricted not to include any block container, such as div, so there's no p tag, but all div with paragraph styles, and then do some arrangement when dom is ready with a small javascript code.  

It keeps header and footer for every section, but there's no conditional consideration, such as odd and even header/footer.

Word Field is kept, while so far only link is supported.

Feature
===
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

## ToDo
* more shapes
* word art
* chart