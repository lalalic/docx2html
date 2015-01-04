docx2html
=========
a javascript converter from docx to html

#install
	$ npm install docx2html

#API
It will convert into a div in body with following code.

```html
<head>
	<script src="../dist/docx2html.js"></script>
</head>
<body>
	<input type="file" style="position:absolute;top:0" onchange="require('docx2html')(this.files[0])">
</body>
```

